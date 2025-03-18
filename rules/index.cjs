/**
 * MDMerge
 * rulesフォルダ内のMarkdownファイルを結合して、MDCファイルとして出力するツール
 */

const fs = require('fs-extra');
const path = require('path');

// 定数定義
const CONSTANTS = {
  MARKDOWN_EXTENSION: '.md',
  MDC_EXTENSION: '.mdc',
  OUTPUT_DIR: '.cursor/rules',
  HEADING1_PREFIX: '# ',
  HEADING2_PREFIX: '## ',
};

/**
 * 既存のMDCファイルからYAMLフロントマターを抽出する
 * @param {string} filePath - MDCファイルのパス
 * @returns {Promise<string>} YAMLフロントマター（存在しない場合は空文字）
 */
async function extractFrontMatter(filePath) {
  try {
    // ファイルが存在するか確認
    if (!(await fs.pathExists(filePath))) {
      return '';
    }
    
    // ファイルの内容を読み込む
    const content = await fs.readFile(filePath, 'utf8');
    
    // YAMLフロントマターを抽出（より堅牢な正規表現パターン）
    const frontMatterRegex = /^\s*---\s*\n([\s\S]*?)\n\s*---\s*(\n|$)/;
    const match = content.match(frontMatterRegex);
    
    if (match) {
      const frontMatter = match[1];
      return `---\n${frontMatter}\n---\n\n`;
    }
    
    return '';
  } catch (error) {
    console.error(`[エラー] フロントマターの抽出中にエラーが発生しました: ${filePath}`, error);
    return ''; // エラーが発生した場合は空文字を返す
  }
}

/**
 * ファイルが Markdown ファイルかどうかを確認する
 * @param {string} fileName - ファイル名
 * @returns {boolean} Markdownファイルの場合はtrue
 */
function isValidMarkdownFile(fileName) {
  return fileName.endsWith(CONSTANTS.MARKDOWN_EXTENSION);
}

/**
 * 指定されたディレクトリ内のMarkdownファイルを再帰的に探索する
 * @param {string} dir - 探索するディレクトリのパス
 * @param {Array} fileList - 見つかったファイルを格納する配列
 * @returns {Array} Markdownファイルのリスト
 * @throws {Error} ディレクトリ読み取りエラー
 */
function findMarkdownFiles(dir, fileList = []) {
  try {
    // ディレクトリ内のファイルとフォルダの一覧を取得
    const files = fs.readdirSync(dir);
    
    // 各ファイル/フォルダに対して処理
    for (const file of files) {
      const filePath = path.join(dir, file);
      
      try {
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // サブディレクトリの場合は再帰的に探索
          findMarkdownFiles(filePath, fileList);
        } else if (isValidMarkdownFile(file)) {
          // 有効なMarkdownファイルの場合はリストに追加
          fileList.push(filePath);
        }
      } catch (fileError) {
        console.error(`[エラー] ファイル情報の取得中にエラーが発生しました: ${filePath}`, fileError);
        throw fileError;
      }
    }
    
    return fileList;
  } catch (dirError) {
    console.error(`[エラー] ディレクトリの読み取り中にエラーが発生しました: ${dir}`, dirError);
    throw dirError;
  }
}

/**
 * ディレクトリが処理対象のサブディレクトリかどうかを判定する
 * @param {string} dirPath - ディレクトリのパス
 * @returns {boolean} 処理対象の場合はtrue
 */
function isTargetSubDirectory(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory() && !path.basename(dirPath).startsWith('@');
  } catch (statError) {
    console.error(`[エラー] ディレクトリ情報の取得中にエラーが発生しました: ${dirPath}`, statError);
    return false;
  }
}

/**
 * 指定されたディレクトリの直下にあるフォルダを取得する
 * @param {string} dir - 探索するディレクトリのパス
 * @returns {Array} フォルダのリスト
 * @throws {Error} ディレクトリ読み取りエラー
 */
function getSubDirectories(dir) {
  try {
    // ディレクトリ内のファイルとフォルダの一覧を取得
    const items = fs.readdirSync(dir);
    
    // フォルダのみをフィルタリング（先頭に@がついているフォルダは除外）
    return items
      .map(item => path.join(dir, item))
      .filter(isTargetSubDirectory)
      .map(fullPath => path.basename(fullPath));
  } catch (error) {
    console.error(`[エラー] ディレクトリの読み取り中にエラーが発生しました: ${dir}`, error);
    throw error;
  }
}

/**
 * Markdownファイルの内容を読み取る
 * @param {string} filePath - ファイルのパス
 * @returns {string} ファイルの内容
 * @throws {Error} ファイル読み取りエラー
 */
function readMarkdownFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`[エラー] ファイルの読み取り中にエラーが発生しました: ${filePath}`, error);
    throw error; // エラーが発生した時点で処理を終了するため、エラーをスローする
  }
}

/**
 * 見出し1(#)と見出し2(##)の間の改行を処理する
 * @param {Array} lines - Markdownの行の配列
 * @param {number} startIndex - 開始インデックス
 * @returns {Object} 処理結果と次の処理開始インデックス
 */
function processHeadingsSpacing(lines, startIndex) {
  const resultLines = [];
  const currentLine = lines[startIndex];
  
  resultLines.push(currentLine); // 見出し1を追加
  
  // 見出し1の後の内容を処理
  let nextLineIndex = startIndex + 1;
  let foundHeading2 = false;
  const contentAfterHeading1 = [];
  
  // 見出し2を探す
  while (nextLineIndex < lines.length) {
    const nextLine = lines[nextLineIndex];
    if (nextLine.trim().startsWith(CONSTANTS.HEADING2_PREFIX)) {
      foundHeading2 = true;
      break;
    }
    if (nextLine.trim() !== '') {
      contentAfterHeading1.push(nextLine);
    }
    nextLineIndex++;
  }
  
  // 見出し1と見出し2の間に内容がある場合
  if (contentAfterHeading1.length > 0) {
    resultLines.push(''); // 見出し1の後に1行の改行
    resultLines.push(...contentAfterHeading1); // 内容を追加
    
    if (foundHeading2) {
      resultLines.push(''); // 内容と見出し2の間に1行の改行
    }
  } else if (foundHeading2) {
    // 見出し1と見出し2の間に内容がない場合
    resultLines.push(''); // 見出し1と見出し2の間に1行だけ改行
  }
  
  return { 
    resultLines,
    nextIndex: foundHeading2 ? nextLineIndex : startIndex + 1
  };
}

/**
 * MDCファイルの内容を整える
 * @param {string} mdcContent - 整える前のMDCファイルの内容
 * @returns {string} 整えた後のMDCファイルの内容
 */
function formatMdcContent(mdcContent) {
  // 行単位で処理するために行に分割
  const lines = mdcContent.split('\n');
  const resultLines = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // 見出し1(# で始まる行)を見つけた場合
    if (line.trim().startsWith(CONSTANTS.HEADING1_PREFIX)) {
      const { resultLines: headingLines, nextIndex } = processHeadingsSpacing(lines, i);
      resultLines.push(...headingLines);
      i = nextIndex;
    } else {
      // 通常の行の処理
      resultLines.push(line);
      i++;
    }
  }
  
  return resultLines.join('\n');
}

/**
 * Markdownファイルの内容を結合する
 * @param {Array} files - Markdownファイルのパスの配列
 * @returns {string} 結合されたMarkdownの内容
 * @throws {Error} ファイル結合エラー
 */
function combineMarkdownFiles(files) {
  try {
    // ファイルの内容を読み取って空でないものだけ結合
    const fileContents = files
      .map(file => readMarkdownFile(file))
      .filter(content => content.trim() !== '');
    
    return fileContents.join('\n\n');
  } catch (error) {
    // 処理中にエラーが発生した場合は、処理を終了する
    console.error('[エラー] ファイル結合中にエラーが発生しました:', error);
    throw error;
  }
}

/**
 * MDCファイルを生成する
 * @param {string} subDir - サブディレクトリ名
 * @param {string} outputDir - 出力先ディレクトリ
 * @param {Array} markdownFiles - Markdownファイルのパスの配列
 * @returns {Promise<void>}
 * @throws {Error} MDCファイル生成エラー
 */
async function generateMdcFile(subDir, outputDir, markdownFiles) {
  try {
    // 入力ファイルが存在しない場合はスキップ
    if (markdownFiles.length === 0) {
      console.log(`[情報] ${subDir}フォルダ内にMarkdownファイルが見つかりませんでした。`);
      return;
    }
    
    // ファイルを自然順にソート
    markdownFiles.sort();
    console.log(`[情報] ${subDir}フォルダで${markdownFiles.length}個のMarkdownファイルを処理します。`);
    
    // Markdownファイルを結合
    let combinedContent = combineMarkdownFiles(markdownFiles);
    
    // MDCファイルの内容を整形
    combinedContent = formatMdcContent(combinedContent);
    
    // 出力ファイル名はフォルダ名から取得
    const mdcFileName = `${subDir}${CONSTANTS.MDC_EXTENSION}`;
    const outputPath = path.join(outputDir, mdcFileName);
    
    // 既存のMDCファイルからフロントマターを抽出
    const frontMatter = await extractFrontMatter(outputPath);
    
    // フロントマターとコンテンツを結合
    const finalContent = frontMatter + combinedContent;
    
    // MDCファイルとして出力
    await fs.writeFile(outputPath, finalContent);
    
    console.log(`[成功] MDCファイルを生成しました: ${outputPath}`);
  } catch (error) {
    console.error(`[エラー] MDCファイルの生成中にエラーが発生しました: ${subDir}`, error);
    throw error; // エラーが発生した場合は呼び出し元に伝播させる
  }
}

/**
 * メイン関数 - Markdownファイルを結合してMDCとして出力する
 */
async function main() {
  try {
    console.log('[開始] MDCファイル生成プロセスを開始します...');
    
    // プロジェクトのルートパス
    const rootDir = path.resolve(__dirname, '..');
    
    // rulesディレクトリのパス
    const rulesDir = path.join(rootDir, 'rules');
    
    // 出力先のディレクトリ
    const outputDir = path.join(rootDir, CONSTANTS.OUTPUT_DIR);
    
    console.log(`[情報] プロジェクトルート: ${rootDir}`);
    console.log(`[情報] ルールディレクトリ: ${rulesDir}`);
    console.log(`[情報] 出力ディレクトリ: ${outputDir}`);
    
    // rulesディレクトリ直下のフォルダを取得（@で始まるフォルダは除外）
    const subDirectories = getSubDirectories(rulesDir);
    
    if (subDirectories.length === 0) {
      console.log('[警告] 処理対象のフォルダが見つかりませんでした。');
      return;
    }
    
    console.log(`[情報] 処理対象のサブディレクトリ数: ${subDirectories.length}`);
    
    // 出力先のディレクトリが存在しない場合は作成
    await fs.ensureDir(outputDir);
    
    // 各サブディレクトリのMarkdownを結合してMDCファイルとして出力
    for (let i = 0; i < subDirectories.length; i++) {
      const subDir = subDirectories[i];
      console.log(`[処理] [${i + 1}/${subDirectories.length}] サブディレクトリ処理開始: ${subDir}`);
      
      try {
        const subDirPath = path.join(rulesDir, subDir);
        const markdownFiles = findMarkdownFiles(subDirPath);
        await generateMdcFile(subDir, outputDir, markdownFiles);
        console.log(`[完了] サブディレクトリ処理完了: ${subDir}`);
      } catch (dirError) {
        console.error(`[エラー] ディレクトリ処理中にエラーが発生しました: ${subDir}`, dirError);
        // エラーが発生しても他のディレクトリの処理を継続
      }
    }
    
    console.log('[完了] すべてのMDCファイルの生成が完了しました。');
  } catch (error) {
    console.error('[致命的エラー] 処理中に予期しないエラーが発生しました:', error.message);
    process.exit(1);
  }
}

// スクリプト実行
main();