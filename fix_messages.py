import re

def fix_commit_message(commit, metadata):
    # コミットメッセージを取得
    message = commit.message.decode('utf-8')
    
    # [prefix] と絵文字の間の余分な空白を削除
    # 例: [chore]   -> [chore] 
    pattern = r'\[(chore|docs|feat|fix|refactor|style|test)\]\s{2,}(.)'
    replacement = r'[\1] \2'
    corrected_message = re.sub(pattern, replacement, message)
    
    # プレフィックスの前の余分なスペースも削除
    # 例: '   [hoge]' -> '[hoge]'
    pattern2 = r'^\s+(\[(chore|docs|feat|fix|refactor|style|test)\])'
    replacement2 = r'\1'
    corrected_message = re.sub(pattern2, replacement2, corrected_message)
    
    # 修正したメッセージをコミットに設定
    commit.message = corrected_message.encode('utf-8')
