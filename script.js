let selectedAnswers = [];

const analyzedData = {
    'park': {
        recent: { total: 6282, top: [['어으', 43], ['ㄷㄷ', 32], ['우우', 28]] },
        allTime: { total: 63043, top: [['이거', 273], ['ㅠㅠ', 250], ['ㄷㄷ', 220]] }
    },
    'kim': {
        recent: { total: 3646, top: [['내가', 33], ['그냥', 32], ['나도', 30]] },
        allTime: { total: 33400, top: [['그냥', 286], ['내가', 261], ['나도', 239]] }
    },
    'ryu': {
        recent: { total: 7245, top: [['그냥', 88], ['나도', 62], ['내가', 58]] },
        allTime: { total: 59410, top: [['그냥', 727], ['아니', 383], ['너무', 340]] }
    },
    'hwang': {
        recent: { total: 4517, top: [['내가', 41], ['이거', 37], ['아니', 35]] },
        allTime: { total: 74768, top: [['아니', 726], ['ㅋㅋㅋㅋㅋㅋㅋㅋㅋ', 688], ['그냥', 677]] }
    },
    'shin': {
        recent: { total: 322, top: [['나는', 6], ['좋다', 4], ['그래서', 4]] },
        allTime: { total: 14674, top: [['그냥', 163], ['아니', 156], ['ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ', 139]] }
    },
    'no': {
        recent: { total: 518, top: [['ㄷㄷ', 17], ['일단', 5], ['이거', 4]] },
        allTime: { total: 3004, top: [['ㄷㄷ', 37], ['나도', 22], ['그냥', 15]] }
    },
    'jang': {
        recent: { total: 792, top: [['그냥', 14], ['내가', 8], ['많이', 8]] },
        allTime: { total: 9085, top: [['나도', 112], ['그냥', 107], ['ㄷㄷ', 85]] }
    },
    'lee': {
        recent: { total: 2272, top: [['아니', 26], ['내가', 23], ['지흠아', 23]] },
        allTime: { total: 21141, top: [['지흠아', 308], ['아니', 181], ['ㄷㄷ', 150]] }
    },
    'jung': {
        recent: { total: 1192, top: [['월즈', 14], ['이게', 12], ['젠지', 11]] },
        allTime: { total: 12401, top: [['이거', 153], ['젠지', 149], ['역시', 94]] }
    },
    'lim': {
        recent: { total: 194, top: [['내가', 5], ['그래서', 4], ['나도', 4]] },
        allTime: { total: 3579, top: [['내가', 47], ['나도', 43], ['ㄷㄷ', 33]] }
    }
};

const RES = {
    'park': {
        family: '박', name: "돌아온 탕아 '박문식'", emoji: "🥂", bg: "#3a1c1c",
        tags: ["#어으..", "#우우ㅠ", "#T1우승기원"],
        desc: "🍷 <b>성격</b>: 최근 3개월간 '어으'라는 앓는 소리를 가장 많이 낸 사나이. 삶의 무게가 어깨를 짓누를 때마다 톡방에서 곡소리를 내지만, 그 안에는 친구들을 향한 깊은 정과 의리가 숨어있습니다. 인생의 희로애락을 T1의 경기 결과와 함께하며, 팀이 승리할 때만큼은 세상 누구보다 밝은 미소를 짓는 열혈 팬입니다. 겉으로는 지쳐 보여도 결정적인 순간엔 친구들 곁을 지키는 톡방의 든든한 맏형 같은 존재입니다.<br><br>💬 <b>채팅 스타일</b>: 과거의 활기찬 리액션은 점차 '어으..', '우우..' 같은 의성어로 대체되고 있습니다. 하지만 여전히 친구들이 무언가를 공유하면 가장 먼저 'ㄷㄷ'이나 '이거'를 연발하며 호응해주는 리액션 장인입니다. 종종 맥락 없는 이모티콘으로 분위기를 띄우거나, 한숨 섞인 한마디로 모두의 공감을 자아내는 묘한 매력이 있습니다."
    },
    'kim': {
        family: '김', name: "생존형 락스타 '김우일'", emoji: "🎙️", bg: "#2c3e50",
        tags: ["#내가..", "#락앤롤", "#T1분석"],
        desc: "👑 <b>성격</b>: 겉으로는 '내가', '나도'를 외치며 자신감을 보이지만, 실제로는 주변의 반응에 누구보다 민감하게 반응하는 섬세한 영혼의 소유자입니다. 가슴 속에 뜨거운 락 음악(Rock)에 대한 열정을 품고 살며, T1의 모든 경기를 나노 단위로 분석하며 응원하는 진정한 서포터이기도 합니다. 본인의 확고한 취향(특히 미식과 락)을 어필하는 것을 즐기지만, 분위기가 살짝이라도 어긋나면 금세 쭈굴해지는 귀여운 반전 매력을 지녔습니다.<br><br>💬 <b>채팅 스타일</b>: 어떤 대화 주제든 자연스럽게 본인의 이야기로 끌어오는 능력이 탁월합니다. 하지만 분위기가 조금이라도 싸늘해지면 즉시 '미안하다'며 납작 엎드리는 생존형 대화법을 구사합니다. '그냥'이라는 추임새를 섞어가며 본인의 뇌피셜을 설파하다가도, 좋아하는 락 밴드나 T1 선수 이야기가 나오면 키보드 속도가 광속으로 변하는 열정적인 모습을 보여줍니다."
    },
    'ryu': {
        family: '류', name: "그냥무새 '류지흠'", emoji: "🌟", bg: "#1a1a2e",
        tags: ["#그냥무새", "#압도적1위", "#은근다정"],
        desc: "✨ <b>성격</b>: 최근 3개월간 톡방 총 메세지 수 7,000건 이상을 기록하며 압도적인 지분율 1위를 차지한 톡방의 주인. '그냥...', '아니...'라며 시큰둥한 척 츤츤대지만, 실은 누구보다 열정적으로 친구들에게 게임을 제안하고 판을 벌이는 타고난 행동대장이자 리더입니다. 겉으론 냉소적으로 보일 수 있어도 친구들의 소소한 일상을 챙기고 재미있는 정보를 끊임없이 공유하는, 알고 보면 누구보다 정이 많은 스타일입니다.<br><br>💬 <b>채팅 스타일</b>: 그의 문장은 보통 부정의 '아니'로 시작해서 원인 불명의 '그냥'으로 끝나는 독특한 리듬을 가집니다. 궁금한 것이 생기면 샵(#) 검색 기능을 활용해 끊임없이 정보를 투척하며, 톡방에 활력을 넘치게 합니다. 리액션 또한 '너무', '진짜' 같은 강조 부사를 적절히 섞어 풍부하게 표현하며, 대화의 끊김을 용납하지 않는 톡방의 엔진 역할을 수행합니다."
    },
    'hwang': {
        family: '황', name: "프로불만러 '황지호'", emoji: "🗡️", bg: "#2d3436",
        tags: ["#아니..", "#T1수호신", "#팩트폭격"],
        desc: "🗡️ <b>성격</b>: 세상을 향한 날카로운 비판 의식과 통찰력을 지닌 톡방의 브레인. '아니'로 시작하는 특유의 부정 화법은 여전하지만, 그 안에는 상황을 객관적으로 분석하려는 논리가 들어있습니다. 특히 T1에 대한 애정은 타의 추종을 불허하며, 팀의 패배에는 가장 거친 독설을 내뱉으면서도 결코 응원을 멈추지 않는 츤데레 찐팬입니다. 남들이 보지 못하는 허점을 짚어내어 팩트로 폭격하는 것이 그의 가장 큰 즐거움입니다.<br><br>💬 <b>채팅 스타일</b>: 친구들의 의견에 일단 '아니'라고 반박부터 하고 보는 것이 일상입니다. 하지만 그 뒤에는 대개 수십 개의 'ㅋㅋㅋㅋ'를 붙여 독설의 날카로움을 유머로 승화시키는 세련된 대화 스킬을 보유하고 있습니다. 거친 단어를 구사하며 야생적인 분위기를 주도하는 듯 보이지만, 데이터상으로는 누구보다 톡방에서의 대화를 즐기며 가장 많이 웃는 활발한 참여자입니다."
    },
    'shin': {
        family: '신', name: "웃음사냥꾼 '신용준'", emoji: "💸", bg: "#12343d",
        tags: ["#ㅋㅋㅋㅋ", "#에반게리온", "#인생역전"],
        desc: "🏗️ <b>성격</b>: 로또 1등의 대박을 꿈꾸는 낙천주의자이자, 마음 한구석엔 '에반게리온'을 향한 깊은 조예를 간직한 매니아입니다. 최근 업무로 출현 빈도가 줄었지만, 나타날 때마다 긴 웃음소리를 전파합니다. 힘든 상황도 허허실실 웃어넘기는 대인배이며, 언젠가 찾아올 대박과 좋아하는 작품 속 평화로운 세계(LCL 바다)를 꿈꾸는 엉뚱하고 미스터리한 천재 스타일입니다.<br><br>💬 <b>채팅 스타일</b>: 말수는 적지만 리액션의 길이는 타의 추종을 불허합니다. 톡방이 정적일 때쯤 불쑥 나타나 '어서와라', '어서오고' 같은 짧은 인사와 함께 수십 줄의 'ㅋㅋㅋㅋㅋㅋㅋㅋ'를 투척하며 대화의 즐거움을 극대화하는 웃음 메이커입니다."
    },
    'no': {
        family: '노', name: "침묵의 암살자 '노태성'", emoji: "🎮", bg: "#1c1c1c",
        tags: ["#ㄷㄷ봇", "#과묵함", "#게임신"],
        desc: "🎮 <b>성격</b>: 현실에서는 과묵하고 신중한 관찰자이지만, 협곡(롤)에 발을 들이는 순간 화려한 피지컬과 뇌지컬을 뽐내는 진정한 게임의 신(God). 친구들이 시끄럽게 떠들 때도 한발 물러서서 조용히 상황을 지켜보다가, 모두가 방심한 찰나 핵심을 찌르는 한마디로 상황을 정리해버리는 카리스마를 보유하고 있습니다. 불필요한 말로 자신을 드러내기보다 실력과 결과로 증명하는 것을 선호하는, 남자들의 로망 같은 캐릭터입니다.<br><br>💬 <b>채팅 스타일</b>: 극강의 가성비를 추구하는 채팅을 합니다. 굳이 긴 문장을 쓰지 않아도 'ㄷㄷ', 'ㅁㅊ', 'ㅋㅋ' 같은 단답형 리액션만으로도 그의 감정을 충분히 전달합니다. 드물게 본인의 의견을 낼 때는 평소의 침묵이 무색할 만큼 묵직한 타격감을 선사하며, 게임 초청이나 드립을 날리는 타이밍은 가히 예술적인 수준입니다."
    },
    'jang': {
        family: '장', name: "워커홀릭 공감요정 '장현수'", emoji: "🥘", bg: "#34495e",
        tags: ["#워커홀릭", "#프로공감러", "#나도", "#그냥"],
        desc: "🥘 <b>성격</b>: 퇴근 후에도 일 생각이 머리를 떠나지 않는 이 시대의 진정한 워커홀릭. 산적한 업무에 치여 톡방 출현 빈도는 줄었지만, 친구들의 말엔 언제나 '나도', '그냥'이라며 즉각 공감해주는 의리파입니다. 일을 완벽하게 처리해야 직성이 풀리는 꼼꼼한 성격 탓에 늘 피곤을 달고 살지만, 친구들 사이에서는 갈등을 중재하고 부드럽게 융화되는 평화주의자입니다.<br><br>💬 <b>채팅 스타일</b>: 멘트 하나하나에 업무의 고단함이 서려 있습니다. '요즘', '아직', '회사' 같은 단어를 주로 사용하여 본인의 치열한 생존 현장을 은밀히 어필합니다. 누군가 무언가를 제안하면 피곤을 무릅쓰고 즉시 탑승하는 '예스맨' 기질이 있어, 톡방의 대화가 원활하게 흘러가도록 돕는 든든한 조력자입니다."
    },
    'lee': {
        family: '이', name: "지흠바라기 '이재환'", emoji: "🎸", bg: "#420808",
        tags: ["#오직지흠만오직지흠만오직지흠만오직지흠만오직지흠만", "#락스타", "#집착남"],
        desc: "🎸 <b>성격</b>: 가슴 속에 타오르는 락 스피릿(Rock Spirit)을 품고 사는 이 구역 최고의 상남자. 감정이 풍부하여 기쁠 땐 누구보다 열정적으로 환호하지만, 무엇보다 친구 '류지흠'을 향한 애정이 거의 종교적인 수준에 도달해 있습니다. 그의 한마디 한마디에 일희일비하며 광기 어린 집착(?)을 보여주는 순정파이기도 합니다. 류지흠이 없는 세상은 상상조차 할 수 없는, 이 시대 마지막 남은 지흠바라기입니다.<br><br>💬 <b>채팅 스타일</b>: 그의 대화는 '지흠아'로 시작해서 '지흠아'로 끝납니다. 톡방 검색 결과 '지흠' 언급 횟수 부동의 1위를 차지할 만큼 모든 관심이 지흠이에게 쏠려 있습니다. 감정이 격해지면 거침없는 표현이 튀어나오기도 하지만, 그 기저에는 항상 친구를 향한 무한한 신뢰와 광기 서린 애정이 깔려있습니다. 락스타답게 대화에서도 아주 강렬한 임팩트를 줍니다."
    },
    'jung': {
        family: '정', name: "독실한 젠지맘 '정규민'", emoji: "🙏", bg: "#273c75",
        tags: ["#교회오빠", "#씹덕", "#커뮤니티중독"],
        desc: "🙏 <b>성격</b>: 주일에는 정결한 마음으로 성경을 묵상하는 '교회 오빠'이지만, 톡방에서는 젠지의 승리를 위해 기도하고 애니메이션 속 가상의 세계에 심취하는 반전 매력의 소유자입니다. 각종 인터넷 커뮤니티의 트렌드와 드립에 매우 해박하며, 관심 분야인 LCK 분석이나 애니 신작 이야기가 나오면 성직자의 차분함은 온데간데없이 열띤 토론을 벌이는 오타쿠적인 열정을 지니고 있습니다. 냉철한 분석과 독실한 신앙, 그리고 젠지를 향한 일편단심이 공존하는 복합적인 캐릭터입니다.<br><br>💬 <b>채팅 스타일</b>: 평소에는 'ㅇㅇ', '니가' 같은 짧은 단답이나 점잖은 교회 말투를 쓰며 평정심을 유지합니다. 하지만 젠지의 경기 결과나 애니 정보가 올라오는 순간, 커뮤니티 용어를 자유자재로 구사하며 해설위원 빙의된 듯한 장문의 설교(분석)를 쏟아냅니다. 전문적인 용어와 논리적인 근거를 들이밀며 친구들을 설득하려 하는 키보드 위의 전략가입니다."
    },
    'lim': {
        family: '임', name: "퇴근무새 '임재창'", emoji: "🏃", bg: "#353b48",
        tags: ["#퇴근", "#ㄹㅈㄷ", "#정산왕"],
        desc: "🏃 <b>성격</b>: 매일 아침 출근하는 순간부터 퇴근을 향한 초읽기를 시작하는 K-직장인의 자화상. '당직'과 '생존'이라는 키워드로 점철된 치열한 삶을 살고 있으며, 현실의 팍팍함을 'ㄹㅈㄷ(레전드)'라는 한마디로 해탈하듯 웃어넘기는 경지에 도달해 있습니다. 하지만 돈 계산이나 회비 정산 등 숫자가 개입되는 순간만큼은 누구보다 날카롭고 번뜩이는 눈빛으로 꼼꼼하게 일을 처리하는 의외의 에이스 면모를 가지고 있습니다.<br><br>💬 <b>채팅 스타일</b>: 톡방에서의 그의 존재 목적은 명확합니다. 퇴근 갈망, 상사 험담, 그리고 정확한 n분의 1 정산입니다. 짧고 굵게 '시발' 또는 '집 가고 싶다'를 외쳐 모두의 눈시울을 적시다가도, 정산 공지가 뜰 때면 무서울 정도의 정확도와 속도로 톡을 남깁니다. 감정 표현이 담백하면서도 현실에 발을 딱 붙인 대화 패턴을 보여줍니다."
    }
};

let scores = {
    'park': 0, 'kim': 0, 'ryu': 0, 'hwang': 0, 'shin': 0,
    'no': 0, 'jang': 0, 'lee': 0, 'jung': 0, 'lim': 0
};

const questions = [
    {
        q: "🗣️ 대화를 시작할 때, 당신의 말버릇은?",
        a: [
            { text: "'아니' 일단 부정하고 본다.", score: { 'hwang': 3, 'ryu': 2, 'lee': 1 } },
            { text: "'그냥' 뭐... 딱히 이유는 없어.", score: { 'ryu': 3, 'kim': 2, 'jang': 2 } },
            { text: "'ㅠㅠ' 또는 'ㄷㄷ' (리액션봇)", score: { 'park': 3, 'no': 3, 'jang': 2 } },
            { text: "'(샵검색)' 뉴스나 짤부터 올린다.", score: { 'park': 3, 'shin': 3, 'jung': 2 } }
        ]
    },
    {
        q: "🎮 퇴근 후 불금! 뭐 하고 놀까?",
        a: [
            { text: "'롤(칼바람) 하실?' 게임 팟 모집.", score: { 'ryu': 3, 'hwang': 3, 'park': 1, 'kim': 1, 'no': 2 } },
            { text: "조용히 솔랭 돌리거나 다른 게임 함.", score: { 'no': 3, 'jung': 3, 'shin': 2 } },
            { text: "술이지! 적셔!", score: { 'park': 3, 'lee': 3, 'ryu': 2 } },
            { text: "집이 최고다. 넷플릭스나 봄.", score: { 'lim': 3, 'jang': 3, 'shin': 3 } }
        ]
    },
    {
        q: "🏆 응원하던 LCK 팀이 졌다. 당신의 반응은?",
        a: [
            { text: "밴픽 분석 시작. '아니 밴픽이 에바네'", score: { 'jung': 3, 'no': 2, 'hwang': 2, 'kim': 1 } },
            { text: "'대 황 젠'을 외치며 다음을 기약한다.", score: { 'jung': 8 } },
            { text: "'어차피 우승은 T1' 무한 신뢰와 찬양.", score: { 'kim': 3, 'park': 3, 'hwang': 2, 'lee': 1, 'ryu': 1 } },
            { text: "'아 시발!!' 화가 나서 욕부터 나옴.", score: { 'lee': 3, 'park': 2, 'hwang': 1 } },
            { text: "롤 안 봄. 롤이 뭔데? (관심 없음)", score: { 'shin': 8, 'jang': 8, 'lim': 8 } }
        ]
    },
    {
        q: "👥 누군가를 급하게 불러야 한다. 어떻게 부를까?",
        a: [
            { text: "'지흠아!!' (광기 섞인 부름)", score: { 'lee': 4, 'jang': 1, 'kim': 1 } },
            { text: "'님들', '형' (존칭 사용)", score: { 'park': 3, 'jung': 2, 'lim': 2 } },
            { text: "'야', '어이' (거칠게 부름)", score: { 'hwang': 2, 'no': 2, 'lee': 2 } },
            { text: "@태그해서 바로 소환", score: { 'kim': 3, 'lim': 3, 'ryu': 2 } }
        ]
    },
    {
        q: "💸 로또 살 때 드는 생각은?",
        a: [
            { text: "연금복권도 같이 사야지. 1등 가자!", score: { 'shin': 4, 'kim': 2, 'lim': 1 } },
            { text: "당첨되면 바로 조용히 퇴사한다.", score: { 'lim': 6, 'jang': 6, 'shin': 2 } },
            { text: "친구들한테 한턱 쏴야지!", score: { 'no': 3, 'ryu': 2, 'park': 2 } },
            { text: "로또 살 돈으로 맛있는 거나 사 먹자.", score: { 'park': 2, 'lee': 2, 'hwang': 1 } }
        ]
    },
    {
        q: "🤬 친구가 말도 안 되는 주장을 한다. 대처법은?",
        a: [
            { text: "'아니 그게 말이 되냐?' 논리 반박.", score: { 'hwang': 3, 'ryu': 2, 'jung': 3, 'kim': 1 } },
            { text: "'미안하다.. 내가 잘못했다' 일단 사과.", score: { 'kim': 4, 'park': 2, 'jang': 2 } },
            { text: "'ㅋㅋㅋㅋ' 비웃거나 무시한다.", score: { 'shin': 3, 'no': 3, 'hwang': 1 } },
            { text: "'시발' 욕설로 참교육.", score: { 'lee': 4, 'hwang': 1 } }
        ]
    },
    {
        q: "⏰ 내일은 월요일이다. 현재 심경은?",
        a: [
            { text: "출근하기 싫다.. 퇴근 마렵다..", score: { 'lim': 8, 'jang': 4, 'shin': 2, 'park': 1 } },
            { text: "월요병엔 술이지. 오늘 마셔!", score: { 'ryu': 3, 'park': 3, 'lee': 2 } },
            { text: "하.. 회사 가서 눈치 볼 생각하니 끔찍.", score: { 'kim': 3, 'jung': 2, 'jang': 2 } },
            { text: "아무 생각 없다. 롤이나 한 판?", score: { 'hwang': 3, 'no': 2, 'ryu': 1 } }
        ]
    },
    {
        q: "🎤 노래방에 갔다. 당신의 선곡 스타일은?",
        a: [
            { text: "나도 유행 따라! 걸그룹 노래!", score: { 'shin': 4, 'ryu': 1, 'kim': 1 } },
            { text: "감성 발라드나 힙합.", score: { 'ryu': 4, 'no': 2, 'jang': 1 } },
            { text: "일본 애니 노래 (J-POP)", score: { 'jung': 4, 'hwang': 2, 'shin': 2 } },
            { text: "락이지! 소리 질러! (Rock Spirit)", score: { 'lee': 4, 'kim': 4, 'park': 1 } }
        ]
    }
];

let currentStep = 0;
let scoreHistory = []; // 점수 기록 보관 (뒤로가기용)

function startTest() {
    questions.sort(() => Math.random() - 0.5);
    document.getElementById('intro').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    nextQuestion();
}

function nextQuestion() {
    if (currentStep >= questions.length) {
        showResult();
        return;
    }

    // 버튼 표시 여부 제어
    const homeBtn = document.getElementById('home-btn');
    const prevBtn = document.getElementById('prev-btn');

    if (currentStep === 0) {
        homeBtn.style.display = 'inline-block';
        prevBtn.style.display = 'none';
    } else {
        homeBtn.style.display = 'none';
        prevBtn.style.display = 'inline-block';
    }

    const q = questions[currentStep];
    const shuffledAnswers = [...q.a].sort(() => Math.random() - 0.5);

    const progress = ((currentStep + 1) / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('question').innerText = q.q;

    const answerBox = document.getElementById('answers');
    answerBox.innerHTML = '';

    shuffledAnswers.forEach(answer => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerText = answer.text;
        btn.onclick = () => {
            // 현재 상태 저장 (깊은 복사)
            scoreHistory.push(JSON.parse(JSON.stringify(scores)));

            if (answer.score) {
                for (const [char, point] of Object.entries(answer.score)) {
                    scores[char] += point;
                }
            }

            if (answer.text.includes("지흠아!!") && Math.random() < 0.66) {
                showResult('lee', true, true);
                return;
            }

            selectedAnswers.push(answer.text);
            currentStep++;
            nextQuestion();
        };
        answerBox.appendChild(btn);
    });
}

function prevQuestion() {
    if (currentStep > 0) {
        currentStep--;
        scores = scoreHistory.pop();
        selectedAnswers.pop();
        nextQuestion();
    }
}

function goToIntro() {
    // 모든 상태 초기화 후 메인으로
    currentStep = 0;
    scoreHistory = [];
    selectedAnswers = [];
    scores = {
        'park': 0, 'kim': 0, 'ryu': 0, 'hwang': 0, 'shin': 0,
        'no': 0, 'jang': 0, 'lee': 0, 'jung': 0, 'lim': 0
    };
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
    document.body.classList.remove('horror-mode'); // 혹시 모를 공포 모드 제거
}

function showResult(forcedKey = null, forceHorror = false, isSpecial = false) {
    let eggStatus = "None";

    if (isSpecial) {
        eggStatus = "특별 공포 엔딩 (지흠아!!)";
        const wall = document.getElementById('horror-text-wall');
        let text = '';
        for (let i = 0; i < 1000; i++) text += '오직류지흠만 ';
        wall.innerText = text;

        document.querySelector('.container').style.display = 'none';
        document.getElementById('special-horror').style.display = 'flex';
        document.body.style.backgroundColor = '#000';

        sendDataToSheet(RES['lee'].name, eggStatus);
        return;
    }

    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    let keys = Object.keys(scores).sort(() => Math.random() - 0.5);
    let maxScore = -1;
    let calculatedKey = 'park';

    for (let key of keys) {
        if (scores[key] > maxScore) {
            maxScore = scores[key];
            calculatedKey = key;
        }
    }

    let resultKey = forcedKey || calculatedKey;
    const d = RES[resultKey];
    document.getElementById('result-family-bg').innerText = d.family;
    document.getElementById('result-title').innerText = d.family + "씨 가문";
    document.getElementById('result-subtitle').innerText = d.name;
    document.getElementById('result-emoji').innerText = d.emoji;
    document.getElementById('result-desc').innerHTML = d.desc;

    document.documentElement.style.setProperty('--bg-color', d.bg);
    document.getElementById('result-emoji').style.borderColor = 'rgba(255, 255, 255, 0.3)'; // 반투명 테두리로 변경
    document.getElementById('result-emoji').style.boxShadow = `0 0 15px ${d.bg}88`; // 광채 강도를 낮추고 투명도 추가

    let tagsHtml = '';
    d.tags.forEach(tag => tagsHtml += `<span class="tag">${tag}</span>`);
    document.getElementById('result-tags').innerHTML = tagsHtml;

    if (resultKey === 'lee' && (forceHorror || Math.random() < 0.66)) {
        document.body.classList.add('horror-mode');
        eggStatus = "이재환 공포 모드 (확률형)";
    } else {
        document.body.classList.remove('horror-mode');
    }

    let statsHtml = '<h4 style="margin:0 0 15px 0; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px; color:#fab1a0;">📊 캐릭터 싱크로율</h4>';
    let sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const medals = ['🥇', '🥈', '🥉'];
    for (let i = 0; i < 3; i++) {
        let [key, score] = sortedScores[i];
        let percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
        let charInfo = RES[key];
        let displayName = charInfo.family + "씨";
        let rankEmoji = medals[i];

        // 너무 쨍하지 않게 그라데이션과 그림자 톤 조절
        statsHtml += `
            <div class="stat-row">
                <div class="stat-name">${rankEmoji} ${displayName}</div>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill" style="width: ${percent}%; background: linear-gradient(90deg, ${charInfo.bg}, ${charInfo.bg}aa); border: 1px solid rgba(255,255,255,0.2);"></div>
                </div>
                <div class="stat-score">${score}</div>
            </div>
        `;
    }

    const statsBox = document.getElementById('result-stats');
    statsBox.innerHTML = statsHtml;
    statsBox.style.display = 'block';

    const aData = analyzedData[resultKey];
    if (aData) {
        const analysisBox = document.getElementById('analysis-detail');
        analysisBox.style.background = `rgba(0, 0, 0, 0.4)`; // 고정된 어두운 배경으로 가독성 확보
        analysisBox.style.borderLeft = `5px solid ${d.bg}`; // 테두리만 캐릭터 색상으로 강조
        analysisBox.style.borderColor = `rgba(255, 255, 255, 0.1)`;

        let recentRank = 1;
        Object.values(analyzedData).forEach(obj => { if (obj.recent.total > aData.recent.total) recentRank++; });
        let allTimeRank = 1;
        Object.values(analyzedData).forEach(obj => { if (obj.allTime.total > aData.allTime.total) allTimeRank++; });

        let recentKeywords = aData.recent.top.map(k => `<span class="tag" style="background:${d.bg}; color:white; font-weight:bold; border:none;">${k[0]} (${k[1]})</span>`).join(' ');
        let allTimeKeywords = aData.allTime.top.map(k => `<span class="tag" style="border: 1px solid ${d.bg}; background:rgba(255,255,255,0.05); color:white; font-size:0.75rem;">${k[0]} (${k[1]})</span>`).join(' ');

        analysisBox.innerHTML = `
            <h4 style="margin:0 0 15px 0; color:#fab1a0; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px;">📊 대화 데이터 분석 팩트</h4>
            <div style="margin-bottom:15px;">
                <p style="margin:0 0 5px 0; font-size:0.9rem; color:#fff;">📅 <b>최근 3개월</b> (전체 ${recentRank}위)</p>
                <p style="margin:0 0 8px 0; font-size:0.85rem; opacity:0.8;">총 메시지: ${aData.recent.total.toLocaleString()}회</p>
                <div style="display:flex; gap:5px; flex-wrap:wrap;">${recentKeywords}</div>
            </div>
            <div>
                <p style="margin:0 0 5px 0; font-size:0.9rem; color:#fff;">🌎 <b>전체 기간</b> (전체 ${allTimeRank}위)</p>
                <p style="margin:0 0 8px 0; font-size:0.85rem; opacity:0.8;">총 메시지: ${aData.allTime.total.toLocaleString()}회</p>
                <div style="display:flex; gap:5px; flex-wrap:wrap;">${allTimeKeywords}</div>
            </div>
        `;
        analysisBox.style.display = 'block';
    }
    sendDataToSheet(d.name, eggStatus);
}

function sendDataToSheet(resultName, eggStatus = "None") {
    const url = "https://script.google.com/macros/s/AKfycbzOIbT575tCRtYdOK9Bn5fbBDrbCx_Re3xPK4Ka_5_dEexr5OT4x4_Jnk0XqTz-WiN0xA/exec";
    const data = { result: resultName, egg: eggStatus, answers: selectedAnswers };
    fetch(url, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(() => console.log("Data sent successfully"))
        .catch(error => console.error("Error sending data:", error));
}

const friendsData = [
    { surname: '박', emoji: '🥂' }, { surname: '김', emoji: '🎙️' }, { surname: '류', emoji: '🌟' },
    { surname: '황', emoji: '🗡️' }, { surname: '신', emoji: '💸' }, { surname: '노', emoji: '🎮' },
    { surname: '장', emoji: '🥘' }, { surname: '이', emoji: '🎸' }, { surname: '정', emoji: '🙏' },
    { surname: '임', emoji: '🏃' }
];

function initIntroShowcase() {
    const container = document.getElementById('random-showcase');
    friendsData.forEach((friend, index) => {
        const div = document.createElement('div');
        div.className = 'random-item';
        div.id = `random-item-${index}`;
        div.innerHTML = `<div class="random-surname">${friend.surname}</div><div class="random-emoji">${friend.emoji}</div>`;
        container.appendChild(div);
    });

    let currentIndex = 0;
    setInterval(() => {
        document.getElementById(`random-item-${currentIndex}`).classList.remove('active');
        let nextIndex;
        do { nextIndex = Math.floor(Math.random() * friendsData.length); } while (nextIndex === currentIndex);
        currentIndex = nextIndex;
        document.getElementById(`random-item-${currentIndex}`).classList.add('active');
    }, 1500);

    setTimeout(() => {
        currentIndex = Math.floor(Math.random() * friendsData.length);
        document.getElementById(`random-item-${currentIndex}`).classList.add('active');
    }, 100);
}

window.onload = initIntroShowcase;
