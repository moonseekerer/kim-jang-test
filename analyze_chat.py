# -*- coding: utf-8 -*-
import re
import json
from collections import Counter
import sys

def analyze_chat(file_path):
    # Try different encodings
    encodings = ['utf-8', 'cp949', 'euc-kr']
    lines = []
    
    for enc in encodings:
        try:
            with open(file_path, 'r', encoding=enc) as f:
                lines = f.readlines()
            print(f"Successfully read with encoding: {enc}")
            break
        except UnicodeDecodeError:
            continue
            
    if not lines:
        print("Failed to read file with standard encodings.")
        return

    # Regex for KakaoTalk export: [Name] [Time] Message
    # Example: [기무우일] [오후 6:03] 그니까 ...
    pattern = re.compile(r'\[(.*?)\] \[(.*?)\] (.*)')
    
    user_counts = Counter()
    user_words = {}
    time_counts = Counter()
    game_suggestion_counts = Counter()
    
    # Simple stopwords (expand as needed)
    stopwords = {'이모티콘', '사진', '동영상', '샵검색', '샵검색:', '삭제된 메시지입니다.', '보이스톡', '페이스톡', 'ㅋ', 'ㅋㅋ', 'ㅋㅋㅋ', 'ㅋㅋㅋㅋ', 'ㅋㅋㅋㅋㅋ', 'ㅋㅋㅋㅋㅋㅋ', 'ㅋㅋㅋㅋㅋㅋㅋ', 'ㅎ', 'ㅎㅎ', '그', '나', '내', '너', '난', '넌', '좀', '잘', '야', '안', '왜', '이', '저', '뭐', '수', '것', '들', '등', '때', '도', '다', '를', '을', '가', '이', '은', '는', '에', '의', '와', '과', '아', '휴', '아이고', '오늘', '내일', '어제', '지금', '이제', '근데', '다시', '계속', '진짜', '정말', '존나', '시발', 'ㅅㅂ', '개', 'ㅇㅇ', 'ㄹㅇ', 'ㄴㄴ', 'ㅇㅎ', '머', '더', '또', '걍', '와', '헐', '음', '오', '네', '예', '아요', '어요', '임', '함' }

    total_lines_parsed = 0
    current_date = None
    target_start_date = 20251101 # Integer comparison for simplicity YYYYMMDD

    for line in lines:
        line = line.strip()

        # Date checking: --------------- 2026년 1월 3일 토요일 ---------------
        date_match = re.search(r'(\d{4})년 (\d{1,2})월 (\d{1,2})일', line)
        if date_match:
            year, month, day = map(int, date_match.groups())
            # Create integer date for comparison (e.g., 20251101)
            current_date = year * 10000 + month * 100 + day
            continue
        
        # Message parsing
        match = pattern.match(line)
        if match:
            # Check date filter (Commented out to get ALL TIME data)
            # if current_date is None or current_date < target_start_date:
            #     continue

            name = match.group(1)
            time_str = match.group(2)
            message = match.group(3)
            
            total_lines_parsed += 1
            user_counts[name] += 1
            
            # Extract words
            words = message.split()
            if name not in user_words:
                user_words[name] = Counter()
            
            for word in words:
                clean_word = re.sub(r'[^\w\s]', '', word)
                if len(clean_word) > 1 and clean_word not in stopwords and clean_word not in ['이모티콘', '사진']:
                    if not clean_word.isdigit():
                         user_words[name][clean_word] += 1

            # Game suggestion analysis
            game_keywords = [r'롤', r'랄', r'증칼', r'칼바람', r'ㄹ\?', r'ㅀㅅ', r'롤하실']
            if any(re.search(k, message) for k in game_keywords):
                game_suggestion_counts[name] += 1

            # Time analysis
            try:
                ampm = time_str.split()[0]
                hour_minute = time_str.split()[1]
                hour = int(hour_minute.split(':')[0])
                if ampm == '오후' and hour != 12:
                    hour += 12
                elif ampm == '오전' and hour == 12:
                    hour = 0
                time_counts[hour] += 1
            except:
                pass

    print(f"Total parsed messages: {total_lines_parsed}")
    
    # Prepare result
    result = {
        "message_counts": dict(user_counts.most_common()),
        "top_keywords_per_user": {},
        "peak_activity_hours": dict(time_counts.most_common(5)),
        "game_suggestions": dict(game_suggestion_counts.most_common())
    }
    
    for user, counter in user_words.items():
        # Get top 20 words for each user
        result["top_keywords_per_user"][user] = dict(counter.most_common(20))

    with open('chat_analysis.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print("Analysis saved to chat_analysis.json")

if __name__ == "__main__":
    analyze_chat(sys.argv[1])
