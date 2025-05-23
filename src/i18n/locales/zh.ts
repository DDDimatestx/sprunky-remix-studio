
export const zhTranslations = {
  common: {
    back: "返回",
    play: "开始游戏",
    loading: "加载中...",
    notFound: "未找到",
    login: "登录",
    logout: "登出",
    logoutSuccess: "成功登出！",
    copyright: "© {year} 加密英雄 | CoinMarketCap前100名加密货币角色"
  },
  home: {
    title: "加密英雄",
    cryptoDuel: "加密决斗",
    vsComputer: "对战电脑",
    leaderboard: "排行榜",
    instructions: "游戏说明",
    characterDetails: "角色详情",
    selectCharacter: "选择角色",
    characterSelected: "{name} 已选择!",
    characterSelectedDesc: "您选择了 {symbol} - 排名 #{rank}",
    bannerTitle: "欢迎来到加密英雄!",
    bannerDescription: "与您喜爱的加密货币进行战斗，看看谁能胜出！在游戏说明部分了解规则。",
    projectNews: "项目新闻",
    newsItem1Title: "游戏更新 2.0",
    newsItem1Date: "2025年5月10日",
    newsItem1Text: "新角色已添加！10种新加密货币加入战斗。",
    newsItem2Title: "周末锦标赛",
    newsItem2Date: "2025年5月5日",
    newsItem2Text: "参加我们的周末锦标赛并赢取独家奖品！",
    newsItem3Title: "社区挑战",
    newsItem3Date: "2025年5月1日",
    newsItem3Text: "共同达成10,000场战斗以解锁特殊角色。"
  },
  battle: {
    title: "加密决斗",
    selectFirst: "选择第一个角色",
    selectSecond: "选择第二个角色",
    startBattle: "开始决斗",
    winner: "{name} 获胜!",
    draw: "平局!",
    roundNumber: "第 {round} 回合",
    statComparison: "{stat} 比较",
    battleResult: "决斗结果",
    playAgain: "再玩一次",
    battleInProgress: "决斗进行中...",
    preparingBattle: "准备决斗...",
    matchHistory: "比赛历史"
  },
  vsComputer: {
    title: "对战电脑",
    selectYourCharacter: "选择您的角色",
    computerWillSelect: "电脑将随机选择",
    yourCharacter: "您的角色",
    computerCharacter: "电脑的角色",
    yourWin: "您赢了!",
    computerWin: "电脑赢了!",
    draw: "平局!",
    startBattle: "开始决斗",
    playAgain: "再玩一次"
  },
  leaderboard: {
    title: "排行榜",
    topPlayers: "顶尖玩家",
    player: "玩家",
    wins: "胜利",
    losses: "失败",
    draws: "平局",
    score: "得分",
    favoriteCharacter: "最喜爱的角色",
    lastPlayed: "最后游戏",
    searchPlaceholder: "按名称或角色搜索",
    noPlayersFound: "未找到玩家",
    howToJoin: "如何加入排行榜?",
    howToJoinDesc: [
      "在对战电脑模式中赢得更多比赛",
      "每次胜利获得3分",
      "每次平局获得1分",
      "排行榜实时更新",
      "月底前3名玩家将获得特殊奖励"
    ]
  },
  auth: {
    title: "认证",
    login: "登录",
    signup: "注册",
    email: "电子邮件",
    password: "密码",
    confirmPassword: "确认密码",
    verificationCode: "验证码",
    sendCode: "发送验证码",
    verify: "验证",
    submit: "提交",
    alreadyAccount: "已有账户?",
    noAccount: "没有账户?",
    enterEmail: "输入您的电子邮件",
    enterPassword: "输入您的密码",
    enterVerificationCode: "输入验证码",
    codeSent: "验证码已发送至您的邮箱",
    invalidCode: "验证码无效",
    loginSuccess: "登录成功",
    signupSuccess: "注册成功"
  },
  stats: {
    strength: "力量",
    speed: "速度",
    intelligence: "智能",
    charisma: "魅力",
    strengthDesc: "市值和稳定性",
    speedDesc: "交易速度和网络吞吐量",
    intelligenceDesc: "智能合约、功能和技术复杂性",
    charismaDesc: "社区规模、社交媒体存在和采用情况"
  },
  guide: {
    title: "管理员指南",
    addCharacters: "添加角色",
    addSounds: "添加音效",
    deployment: "部署",
    characterStructure: "角色结构示例",
    soundImplementation: "音效实现",
    deploymentSteps: "部署步骤"
  },
  instructions: {
    title: "游戏说明",
    gameRules: "游戏规则",
    gameModes: "游戏模式",
    charactersInfo: "角色信息",
    gameDescription: "加密英雄是一款战略卡牌对战游戏，您可以让喜爱的加密货币在激动人心的决斗中相互对抗。每个加密货币角色都有独特的属性，决定其战斗表现。",
    howToPlay: "如何游戏",
    rule1: "选择一个加密货币角色进行战斗",
    rule2: "在加密决斗模式中，选择两个角色进行一对一对战",
    rule3: "在对战电脑模式中，选择您的角色，电脑将选择对手",
    rule4: "战斗由四个回合组成，分别对应四种属性：力量、速度、智能和魅力",
    rule5: "赢得最多回合的角色为总体胜者",
    battleMechanics: "战斗机制",
    mechanics1: "每个回合比较两个角色之间的特定属性",
    mechanics2: "属性值更高的角色赢得该回合",
    mechanics3: "如果属性相等，回合以平局结束",
    mechanics4: "总体胜者由赢得最多回合的一方决定",
    tip: "专业提示",
    tipText: "仔细研究每个角色的属性。某些加密货币在特定领域表现出色，使其更适合某些对战！",
    cryptoDuelMode: "加密决斗模式",
    vsComputerMode: "对战电脑模式",
    leaderboardMode: "排行榜",
    cryptoDuelDescription: "在此模式下，您可以选择任意两个加密货币角色，看看谁能在一对一对战中获胜。",
    cryptoDuelFeature1: "选择任意两个角色战斗",
    cryptoDuelFeature2: "每回合详细的战斗可视化",
    cryptoDuelFeature3: "非常适合了解角色的优势和弱点",
    vsComputerDescription: "测试您的战略，与电脑随机选择的加密货币角色对战。",
    vsComputerFeature1: "战斗结果计入您的排行榜得分",
    vsComputerFeature2: "电脑每次随机选择对手",
    vsComputerFeature3: "学习游戏机制的绝佳方式",
    leaderboardDescription: "查看您在加密英雄玩家中的排名。",
    leaderboardFeature1: "根据战斗得分显示顶尖玩家",
    leaderboardFeature2: "赢得更多游戏以提高排名",
    leaderboardFeature3: "达到顶级位置可获得特殊奖励",
    charactersDescription: "加密英雄的角色基于CoinMarketCap前100名的真实加密货币。每个角色的属性都源于其代表的加密货币的真实数据和特性。",
    characterStats: "角色属性解释",
    strategy: "战斗策略",
    strategyDescription: "在加密英雄中制定获胜策略需要了解每个角色的优势和弱点：",
    strategyTip1: "高力量角色通常是最稳定和成熟的加密货币",
    strategyTip2: "高智能角色在技术创新和智能合约功能方面表现出色",
    strategyTip3: "平衡是关键 - 各方面属性均衡的角色通常比具有极端值的角色表现更好"
  }
};
