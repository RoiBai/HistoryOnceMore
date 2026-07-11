const app = document.querySelector("#app");

const backgrounds = {
  opening: "./assets/backgrounds/opening-map.png",
  command: "./assets/backgrounds/shu-command.png",
  pass: "./assets/backgrounds/jieting-pass.png",
  mountain: "./assets/backgrounds/mountain-camp.png",
  wei: "./assets/backgrounds/wei-command.png",
  court: "./assets/backgrounds/hanzhong-hall.png"
};

const artifacts = {
  command: {
    src: "./assets/artifacts/jieting-command.png",
    label: "街亭军令",
    note: "节度、令牌与封印"
  },
  terrain: {
    src: "./assets/artifacts/jieting-map.png",
    label: "街亭舆图",
    note: "山、道与汲水处"
  }
};

const characters = {
  zhuge: {
    name: "诸葛亮",
    courtesy: "孔明",
    faction: "蜀汉丞相",
    avatar: "./assets/characters/zhuge-liang.png",
    expressions: { command: "./assets/expressions/zhuge-command.png" },
    playable: true,
    stats: { patience: 88, force: 36, intellect: 96, obedience: 94 },
    traits: ["谨慎持重", "重军法", "善筹全局"],
    brief:
      "北伐主帅。你要决定谁守街亭、军令写到多细，以及前线违令时是否临阵换将。任何一次迟疑都可能影响整条粮道。"
  },
  masu: {
    name: "马谡",
    courtesy: "幼常",
    faction: "蜀汉参军",
    avatar: "./assets/characters/ma-su.png",
    expressions: { insist: "./assets/expressions/masu-insist.png" },
    playable: true,
    stats: { patience: 46, force: 42, intellect: 88, obedience: 40 },
    traits: ["善谈兵略", "自负求胜", "急于证明"],
    brief:
      "你以才论见重，却缺少独领大军的经历。刘备那句“言过其实”始终跟着你；守街亭是第一次真正证明自己的机会。"
  },
  wangping: {
    name: "王平",
    courtesy: "子均",
    faction: "蜀汉将领",
    avatar: "./assets/characters/wang-ping.png",
    playable: true,
    stats: { patience: 82, force: 72, intellect: 74, obedience: 91 },
    traits: ["熟悉军伍", "稳守纪律", "能收残兵"],
    brief:
      "你以副将身份随马谡守街亭。你熟悉营伍，认为大军不可离开水道；若规谏无效，还要决定是否越级告急或另屯自守。"
  },
  zhanghe: {
    name: "张郃",
    courtesy: "儁乂",
    faction: "曹魏名将",
    avatar: "./assets/characters/zhang-he.png",
    playable: true,
    stats: { patience: 76, force: 88, intellect: 84, obedience: 82 },
    traits: ["老于战阵", "善抓破绽", "行军果断"],
    brief:
      "你奉魏明帝之命驰援陇右。到达街亭后，需要先查明蜀军营地与水路，再决定强攻、围困，还是避开王平本部直取马谡。"
  },
  weiyan: {
    name: "魏延",
    courtesy: "文长",
    faction: "蜀汉前军将领",
    avatar: "./assets/characters/wei-yan.png",
    playable: false,
    stats: { patience: 38, force: 90, intellect: 72, obedience: 52 },
    traits: ["敢战", "好奇策", "不喜迟疑"],
    brief: "蜀汉前军名将，主张趁陇右响应迅速进兵，对过分谨慎的部署常有异议。"
  },
  liushan: {
    name: "刘禅",
    courtesy: "公嗣",
    faction: "蜀汉皇帝",
    avatar: "./assets/characters/liu-shan.png",
    playable: false,
    stats: { patience: 70, force: 20, intellect: 55, obedience: 68 },
    traits: ["少主临朝", "倚重丞相", "需守礼制"],
    brief: "蜀汉皇帝，倚重诸葛亮。战后由他裁定赏罚，并回应诸葛亮的自贬请求。"
  },
  jiangwan: {
    name: "蒋琬",
    courtesy: "公琰",
    faction: "蜀汉文臣",
    avatar: "./assets/characters/jiang-wan.png",
    playable: false,
    stats: { patience: 86, force: 28, intellect: 85, obedience: 88 },
    traits: ["沉稳", "重法度", "善补败局"],
    brief: "丞相府属官，参与整理战后军报，核定马谡、王平与中军各自的功过。"
  }
};

const statLabels = {
  patience: "耐心",
  force: "战力",
  intellect: "智谋",
  obedience: "服从"
};

const openingCopy = [
  "建兴六年春，诸葛亮出祁山。南安、天水、安定三郡响应，捷报接连送到汉中。北伐第一次有了向前铺开的样子，军中上下都在等下一道命令。",
  "越往陇右走，粮道就越长。街亭不是什么大城，却压着关中通往陇右的要路。守住它，前军还有粮、有退路；失了它，已经响应蜀军的三郡也很难再守。",
  "派谁去，怎样守，帐中没有一句话能轻易定下来。魏延主张抢战机，马谡认为可以凭高制敌，王平一再问水道和扎营的地方。诸葛亮必须在他们之间作出取舍。",
  "史书已经写下结局：马谡违背节度，舍水上山，张郃断其汲道，蜀军大败。可在军令发出以前，谁都还不知道结局。"
];

const sources = [
  {
    title: "《三国志·蜀书·诸葛亮传》",
    url: "https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%9C%8B%E5%BF%97/%E5%8D%B735",
    note: "北伐出祁山、街亭失利、退还汉中以及自贬等史实骨架。"
  },
  {
    title: "《三国志·蜀书·马良传》附马谡",
    url: "https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%9C%8B%E5%BF%97/%E5%8D%B739",
    note: "刘备评价马谡、诸葛亮违众拔马谡、马谡违节度而败等关键线索。"
  },
  {
    title: "《三国志·蜀书·王平传》",
    url: "https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%9C%8B%E5%BF%97/%E5%8D%B743",
    note: "王平规谏马谡、败后鸣鼓自守、张郃疑伏不逼等角色依据。"
  },
  {
    title: "《三国志·魏书·张郃传》",
    url: "https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%9C%8B%E5%BF%97/%E5%8D%B717",
    note: "张郃击破马谡于街亭的魏军侧记录。"
  },
  {
    title: "《资治通鉴·魏纪》",
    url: "https://zh.wikisource.org/zh-hant/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7071",
    note: "把街亭放入曹魏驰援陇右、蜀军退兵的连续战局中理解。"
  }
];

const routeStarts = {
  zhuge: "zhuge-council",
  masu: "masu-arrival",
  wangping: "wangping-warning",
  zhanghe: "zhanghe-scout"
};

const scenes = {
  "zhuge-council": {
    bg: "command",
    title: "帐中未定",
    chapter: "诸葛亮视角 · 一",
    focus: "masu",
    entries: [
      n("汉中军帐里，陇右三郡的军报摊在案上。诸将已经争了半个时辰，话题始终绕不开街亭。", { artifact: "terrain" }),
      s("weiyan", "丞相，三郡既然肯应，就该趁魏军还没站稳打进去。再等他们援兵到了，今日的便宜就没了。"),
      s("masu", "魏将远来，必求速战。街亭有山可凭，我军若占其高，敌人仰攻，自乱其阵。"),
      s("wangping", "末将看过舆图。山下有道，也有水。若把大营搬上去，几千人每日取水，瞒不过魏军斥候。"),
      s("zhuge", "文长，你说进。幼常，你说守在高处。可街亭一失，前军粮道便断。谁去守，先把营扎在哪里说清楚。"),
      s("weiyan", "若只求不失，随便派个守将便是。丞相既然要用马参军，总该让他临阵应变。"),
      s("zhuge", "临阵可以变，所守之地不能丢。今日议的就是这条。")
    ],
    choices: [
      c("先听马谡完整陈说", "让他具体说明营地、水路和应敌次序。", "zhuge-masu-private", "军议中，诸葛亮先让马谡陈明守街亭之法。"),
      c("让王平逐条质问地势", "先把水路、营地和退路问清楚。", "zhuge-wangping", "诸葛亮让王平以一线将领身份质问营地细节。"),
      c("压住魏延的奇进之议", "先定街亭守法；魏延可能因此不满。", "zhuge-edict", "诸葛亮暂压魏延，要求先定街亭守法。")
    ]
  },
  "zhuge-masu-private": {
    bg: "command",
    title: "夜召幼常",
    chapter: "诸葛亮视角 · 二",
    focus: "masu",
    entries: [
      n("军议散后，诸葛亮把马谡单独留了下来。帐外已经换过一班卫士，两人都没有坐下。"),
      s("zhuge", "幼常，先帝临终曾说你言过其实。此话我记得，你也该记得。"),
      s("masu", "臣记得。这些年旁人也没少拿这句话看臣。丞相若仍不放心，为何还要问臣街亭之策？"),
      s("zhuge", "因为你有才，我才要问得更细。街亭若失，坏的是整路军势，不是你一人的声名。"),
      s("masu", "臣愿领军令。魏兵若到，绝不容他越街亭。"),
      s("zhuge", "先别说绝不。你到街亭，第一件事看什么？"),
      s("masu", "先看山，后看路。山可制敌，路可通退。"),
      s("zhuge", "水呢？数千人马，一日要用多少水，你算过没有？")
    ],
    choices: [
      c("仍任马谡主将，但把水路写入军令", "准他领兵，明令大营不得离水。", "zhuge-edict", "诸葛亮决定任马谡为先锋，并把据水守道写入节度。"),
      c("改令王平为主，马谡参谋", "由王平领兵，马谡留在军中参画。", "zhuge-wangping", "诸葛亮开始考虑让王平主守，马谡参画。"),
      c("以马谡求胜之心激励他", "把街亭交给马谡独当，要求他立下军令。", "zhuge-edict", "诸葛亮以重任激励马谡，使其自请当先。")
    ]
  },
  "zhuge-wangping": {
    bg: "command",
    title: "副将之权",
    chapter: "诸葛亮视角 · 三",
    focus: "wangping",
    entries: [
      s("wangping", "丞相若用马参军，末将不敢争。但请给末将一句明令。"),
      s("zhuge", "你要什么明令？"),
      s("wangping", "请明令大营不得离水。若马参军坚持上山，容末将把原令当众再宣一遍。"),
      s("zhuge", "你怕他不听。"),
      s("wangping", "是。马参军善论兵，到了阵前也未必肯听末将。没有丞相明令，末将拦不住他。"),
      s("zhuge", "副将当众顶撞主将，军令也会乱。"),
      s("wangping", "那就请丞相定个章程。真到了那一步，末将照章办，不与他争口舌。")
    ],
    choices: [
      c("给王平封驳权", "副将可以当场阻止明显违令的布营。", "zhuge-edict", "诸葛亮授王平封驳之权，命其守住水路底线。"),
      c("只许王平密报，不许当众相争", "避免主副将当众争令；中军收到消息会更晚。", "zhuge-edict", "诸葛亮许王平密报，不许帐前折损主将威信。"),
      c("改派王平主守街亭", "由王平负责布营，马谡只参与议策。", "zhuge-courier", "诸葛亮转向以王平为主守，马谡辅之。")
    ]
  },
  "zhuge-edict": {
    bg: "command",
    title: "一纸节度",
    chapter: "诸葛亮视角 · 四",
    focus: "masu",
    entries: [
      n("军令写成时，天还没亮。诸葛亮命人把节度当着马谡、王平两人的面念了一遍。", { artifact: "command" }),
      s("zhuge", "街亭当道下寨，不得舍水登高。敌若逼近，先固营，再求战。", { expression: "command" }),
      s("masu", "丞相言明如此，臣自当奉令。只是若临机有可乘之势，是否可变？"),
      s("zhuge", "阵形可以变。大营不能离水，街亭道路不能让给魏军。这两条不许变。"),
      s("wangping", "末将愿随前军，日夜检视汲道。"),
      s("zhuge", "子均管汲道，也管退路。幼常，你是主将，但王平拿我的节度来谏时，你须听完，不得以犯上治他。")
    ],
    choices: [
      c("派快马每日复命营地位置", "中军每日核对营地、水路和魏军动向。", "zhuge-courier", "诸葛亮要求街亭每日复命营地与水路。"),
      c("让马谡拥有临机专断权", "前线不必事事请示，主将也更难被中军约束。", "zhuge-courier", "诸葛亮给马谡较大的临机之权。"),
      c("命王平独掌汲道守备", "水路和退路由王平直接负责。", "zhuge-courier", "诸葛亮命王平独掌汲道与退路守备。")
    ]
  },
  "zhuge-courier": {
    bg: "pass",
    title: "街亭回报",
    chapter: "诸葛亮视角 · 五",
    focus: "wangping",
    entries: [
      n("第三日傍晚，街亭快马入营。马背上的尘未落，信使已跪在阶下。"),
      s("wangping", "前军已至街亭。马将军欲移营高处，称可临下制敌。末将再谏，请丞相速断。"),
      s("zhuge", "他已经上山了吗？"),
      s("wangping", "半数辎重已动。水道仍在下方，魏军斥候出没甚密。"),
      s("zhuge", "军令写得明白，他为何还要上山？"),
      s("wangping", "马将军说敌军仰攻，我军可胜。末将已经劝不动了，请丞相即刻下令。")
    ],
    choices: [
      c("立刻召回马谡，改王平接手", "临阵换将，命王平立即停止搬营。", "zhuge-final-good", "诸葛亮急令召回马谡，改王平接手街亭。"),
      c("严令马谡下山，据水重营", "保留马谡主将之职，限他当日移营。", "zhuge-final-mixed", "诸葛亮严令马谡下山重营。"),
      c("相信马谡能稳住高营", "不再改动前线部署，只催他严守。", "zhuge-final-history", "诸葛亮没有及时撤换马谡，只加急催其谨守。")
    ]
  },
  "zhuge-final-good": {
    bg: "court",
    title: "战后奏对",
    chapter: "诸葛亮视角 · 六",
    focus: "liushan",
    entries: [
      n("街亭没有大捷，但守住了。张郃数次试探，都没能把蜀军从水路和道路上拔开。"),
      s("liushan", "相父，诸将皆言街亭险。幸而未失，朕心稍安。"),
      s("zhuge", "是臣险些用错了人。若急令再晚半日，街亭已经守不住。"),
      s("jiangwan", "临阵撤换主将，军中难免议论。马谡本人也未必心服。"),
      s("zhuge", "不服可以申辩，街亭不能拿来试才。幼常仍可议兵，不可再独领这一军。"),
      s("liushan", "照相父的意思办。王平该赏，马谡也把这次的事写清楚。")
    ],
    choices: [
      c("呈上守住街亭的复盘", "结束本章。", null, "街亭因及时纠偏得守，王平记功，马谡留任参谋。", "steady-throat")
    ]
  },
  "zhuge-final-mixed": {
    bg: "court",
    title: "半步之迟",
    chapter: "诸葛亮视角 · 六",
    focus: "jiangwan",
    entries: [
      n("严令赶到时，魏军已经贴近汲道。马谡下山太迟，街亭虽未彻底崩坏，前军还是折损了锐气。"),
      s("jiangwan", "快马若早一日到，前军不至于折损这些人。"),
      s("zhuge", "不是快马慢，是中军问得晚了。这个过失在我。"),
      s("liushan", "马谡可罪，然未至大败。相父何以处之？"),
      s("zhuge", "违令者降其任，能改者留其身。王平能守乱中之序，当赏。"),
      s("jiangwan", "往后前军日报，营在何处、水道何在、退路通不通，都该一并画明。只报一句无事，什么也查不出来。")
    ],
    choices: [
      c("写入军令复命之法", "结束本章。", null, "诸葛亮以迟改为戒，增设前军复命之法。", "late-correction")
    ]
  },
  "zhuge-final-history": {
    bg: "court",
    title: "败报入帐",
    chapter: "诸葛亮视角 · 六",
    focus: "liushan",
    entries: [
      n("败报到汉中时，帐中安静得能听见竹简相碰。马谡失街亭，张郃破前军，北伐只得退还。"),
      s("zhuge", "臣任人不明，训令不密，使前军失据。"),
      s("liushan", "相父，马谡既败，依法处置便是。何必自责至此？"),
      s("zhuge", "人是臣越过众议所拔，军令也是臣所授。马谡有罪，臣不能因此便说自己无过。"),
      s("jiangwan", "丞相若上表自贬，朝中自会处置。王平收住残军的功，也请另列。"),
      s("zhuge", "分别具报。马谡违令，依法论；王平有功，照功赏；臣用人失当，也请陛下降责。")
    ],
    choices: [
      c("上表自贬，依法问责", "结束本章。", null, "诸葛亮退还汉中，上表自贬，并依法处置马谡。", "history-jieting")
    ]
  },

  "masu-arrival": {
    bg: "pass",
    title: "街亭在望",
    chapter: "马谡视角 · 一",
    focus: "wangping",
    entries: [
      n("马谡到街亭后，先带人上山看了一遍。王平留在山下，沿着道路和水边走完一圈，回来时天已经擦黑。", { artifact: "terrain" }),
      s("masu", "这里若只当道下寨，便是等魏军来撞。占高处，才有主动。", { expression: "insist" }),
      s("wangping", "将军，高处可望敌，却不能养兵。今日粮车能上山，明日水囊也要上山吗？"),
      s("masu", "王将军，我知道你久在行伍。可张郃不是来同我们耗粮的，只在道旁结寨，未必挡得住他。"),
      s("wangping", "正因为来的是张郃，才不能把水和路都让在山下。末将请将军再看一次地势。"),
      s("masu", "不必再看。丞相命我守街亭，我总要有自己的处置。")
    ],
    choices: [
      c("先当道近水立主寨", "依照中军节度，先控制道路和水源。", "masu-camp", "马谡先按节度近水立寨。"),
      c("上山设主寨，山下只留小营", "主力占据高处，只留少数兵马保护汲道。", "masu-hill-plan", "马谡决定舍水上山，以高制下。"),
      c("请王平画出每日汲水路线", "先核算各营取水人数，再决定是否上山。", "masu-camp", "马谡让王平先画水路和退路。")
    ]
  },
  "masu-camp": {
    bg: "pass",
    title: "营地之争",
    chapter: "马谡视角 · 二",
    focus: "wangping",
    entries: [
      s("wangping", "主寨放在这里，左边临水，后边通道。魏军来攻，前后两营可以相救。"),
      s("masu", "地势太低。张郃把兵排开压过来，我们只能在营门前硬接。"),
      s("wangping", "我军奉命守道，不必在这里同他分胜负。拖住他，等中军调度，就是守住了。"),
      s("masu", "若只会拖延，丞相何必派我？换一个寻常守将也做得到。"),
      s("wangping", "将军，先把营扎稳。魏军真到了，再找他的破绽不迟。"),
      s("masu", "你说得容易。我若一仗也不敢打，回去以后，那句‘言过其实’便算坐实了。")
    ],
    choices: [
      c("承认自己怕被轻看", "告诉王平，你为何执意求战。", "masu-scouts", "马谡承认自己急于证明。"),
      c("把山上改为望楼，不改主寨", "主寨仍在水边，山上只留警戒和弩兵。", "masu-scouts", "马谡决定主寨近水，山上只设望楼。"),
      c("临时改令全军上山", "以高处为主寨，承担断水风险。", "masu-hill-plan", "马谡临时改令全军上山。")
    ]
  },
  "masu-hill-plan": {
    bg: "mountain",
    title: "高处不安",
    chapter: "马谡视角 · 二",
    focus: "wangping",
    entries: [
      n("各营奉命往山上搬。坡路窄，辎重堵成一线。到黄昏时，还有两队士卒在山下等着运水。"),
      s("wangping", "将军，辎重上山已经慢了。若魏军明日先到谷口，我们下山取水便要列队受击。"),
      s("masu", "搬营费些力气，总好过明日让魏军压在低处打。"),
      s("wangping", "张郃未必仰攻。他若先断水，我们站得越高，越像被自己困住。"),
      s("masu", "我军居高，士卒自然知道没有退路，临敌才肯死战。"),
      s("wangping", "他们不是没有退路，是取水的路在敌军眼皮底下。这个不能算死战之志。"),
      s("masu", "够了。大营已经上山，再说这些只会乱众心。你若继续劝阻，我按违令处置。")
    ],
    choices: [
      c("允许王平另屯山下，守住水路", "主力仍在山上，另留一部守水。", "masu-scouts", "马谡许王平分屯山下守水。"),
      c("命王平随主力上山，不得分兵", "全军集中高处，山下不另设守军。", "masu-water-cut", "马谡命王平随主力上山。"),
      c("夜里重新勘地，暂缓全军上山", "停止搬运辎重，重新查看水道和谷口。", "masu-scouts", "马谡夜里重新勘察营地。")
    ]
  },
  "masu-scouts": {
    bg: "pass",
    title: "魏骑已近",
    chapter: "马谡视角 · 三",
    focus: "zhanghe",
    entries: [
      n("午后，魏军斥候出现在对面山脊。几骑停下来朝营地张望片刻，随即折回谷口。"),
      s("zhanghe", "蜀军新至，营还未稳。若其离水，先取其水；若其近水，先扰其心。"),
      s("masu", "张郃来得比我想得快。"),
      s("wangping", "他们刚才看的不是山顶，是取水的队伍。"),
      s("masu", "若他绕水路，我便以高处弩兵压之。"),
      s("wangping", "弩兵能压一阵，不能替全军挑水。将军，请把预备队给末将。"),
      s("masu", "预备队交给你，我这里有变怎么办？")
    ],
    choices: [
      c("把预备队交给王平", "由王平随时增援水路和退路。", "masu-water-cut", "马谡把预备队交给王平。"),
      c("自己握住预备队", "预备队留在主阵，水路有警时再由你调兵。", "masu-water-cut", "马谡仍自掌预备队。"),
      c("派人急报诸葛亮，请求复核", "承认布营有争议，请中军立即裁定。", "masu-water-cut", "马谡派快马向诸葛亮复命请示。")
    ]
  },
  "masu-water-cut": {
    bg: "mountain",
    title: "水道被逼",
    chapter: "马谡视角 · 四",
    focus: "wangping",
    entries: [
      n("第二日午后，取水队在山腰被魏骑逼了回来。魏军主力没有攻山，只派骑兵守住谷口和水边。"),
      s("wangping", "汲道受逼，取水队退回来了。士卒已经开始传空囊。"),
      s("masu", "传令各营约束士卒，不得抢水。张郃迟迟不攻，未必敢上来。"),
      s("wangping", "他用不着上来。再过半日，各营自己就要争水。"),
      s("masu", "现在下山，魏军趁乱掩杀，伤亡只会更大。"),
      s("wangping", "趁各营还有水，末将带一部守住山口，主力分队下撤。再晚就走不成了。"),
      s("masu", "全军刚奉我的命令上山，转眼又撤。以后还有谁肯信主将号令？")
    ],
    choices: [
      c("亲自下令移营近水", "承认误判，保住军队。", "masu-final-save", "马谡亲自下令移营近水。"),
      c("让王平鸣鼓断后，主力撤下", "王平守住下山道路，主力分队撤营。", "masu-final-cover", "马谡令王平鸣鼓断后。"),
      c("继续守山，等张郃仰攻", "维持高处阵地，不派兵争夺水道。", "masu-final-fail", "马谡继续守山，汲道被断。")
    ]
  },
  "masu-final-save": {
    bg: "court",
    title: "归帐请罪",
    chapter: "马谡视角 · 五",
    focus: "zhuge",
    entries: [
      n("前军撤回汉中时少了近三成。马谡在帐外候了很久，等伤兵和军簿都报完，才进去请罪。"),
      s("masu", "丞相，臣误判地势，几陷全军。虽得改营，罪不可掩。"),
      s("zhuge", "王平第一日便劝你，军令也写明不得离水。为何等魏军截了汲道才改？"),
      s("masu", "臣想凭此战证明所学可用。营一搬上山，便更不肯承认自己错了。"),
      s("zhuge", "你领的不是一场清谈。你迟疑的每一个时辰，都有人替你受伤送命。"),
      s("masu", "臣愿降职，留军中听用。")
    ],
    choices: [
      c("接受降职，重新从参谋做起", "结束本章。", null, "马谡因迟改而降职，保留参谋之任。", "masu-saves-face-late")
    ]
  },
  "masu-final-cover": {
    bg: "court",
    title: "败中有人",
    chapter: "马谡视角 · 五",
    focus: "wangping",
    entries: [
      n("山上各营溃散后，王平率本部鸣鼓自守，又沿途收拢逃兵。前军虽然失了街亭，到底还有一部分人列队退回。"),
      s("wangping", "将军，残兵已收。可街亭不能算守住。"),
      s("masu", "我知道。若没有你的本部，今日回来的还要更少。"),
      s("wangping", "末将只能收住这些人。山上的主阵，已经救不回来了。"),
      s("masu", "是我没听你的。回到中军，我会当面说清。"),
      s("zhuge", "幼常，功是王平的，责是你的。你可认？"),
      s("masu", "臣认。")
    ],
    choices: [
      c("认罪，并为王平请功", "结束本章。", null, "马谡认罪，并为王平收军请功。", "wangping-covers")
    ]
  },
  "masu-final-fail": {
    bg: "court",
    title: "纸上与山上",
    chapter: "马谡视角 · 五",
    focus: "zhuge",
    entries: [
      n("断水后第二日，山上各营开始争抢存水。魏军趁乱进攻，蜀军号令不行，街亭终于失守。"),
      s("masu", "臣败了。"),
      s("zhuge", "我给你的节度写得明白，王平也数次劝止。你为何舍水上山？"),
      s("masu", "臣以为居高可以制敌，也以为张郃必来攻山。是臣自用，不听副将。"),
      s("zhuge", "因你违令，街亭失守，大军退还。幼常，我不能因为素来器重你便废军法。"),
      s("masu", "臣无辞。")
    ],
    choices: [
      c("伏地受军法", "结束本章。", null, "马谡违节度而败，伏罪受军法。", "history-jieting")
    ]
  },

  "wangping-warning": {
    bg: "pass",
    title: "话要怎么说",
    chapter: "王平视角 · 一",
    focus: "masu",
    entries: [
      n("到街亭的第一日，马谡便命人往山上运辎重。你只是副将，手里没有改令的权，却知道这道命令不能不劝。", { artifact: "terrain" }),
      s("wangping", "将军欲用高势，末将明白。只是主寨不可离水。"),
      s("masu", "你从进谷便一直说不可。魏军还没来，你先要本军守在低处不动？"),
      s("wangping", "末将不是怕战。大营若离水，敌军来了，我们连在哪里接战都由不得自己。"),
      s("masu", "当着各营将校这样说，是怕他们不知道你反对我？"),
      s("wangping", "末将可以私下说。可搬营的命令已经传下去了，再迟便来不及。"),
      s("masu", "主将之令朝发夕改，军心一样要乱。")
    ],
    choices: [
      c("放低姿态，给马谡留台阶", "提议山上设望楼，主寨仍留在水边。", "wangping-ladder", "王平用折中说法规劝马谡。"),
      c("直引丞相军令", "当众宣读节度，要求立即停止搬营。", "wangping-order", "王平直引诸葛亮节度相争。"),
      c("先暗派亲兵复命诸葛亮", "暂不公开争执，派快马向中军告急。", "wangping-letter", "王平暗派亲兵向诸葛亮复命。")
    ]
  },
  "wangping-ladder": {
    bg: "pass",
    title: "给人回头路",
    chapter: "王平视角 · 二",
    focus: "masu",
    entries: [
      s("wangping", "山上可以设望楼，留弩兵两百。主寨还在水边。敌军一到，山上报信，营中也有工夫列阵。"),
      s("masu", "说到底，你还是不要主力上山。"),
      s("wangping", "是。主力上去容易，几千人马再下来就难。"),
      s("masu", "若张郃来得急，山上望楼能不能撑住？"),
      s("wangping", "两百人可轮换取水。全军都在上面，汲道一天要走不知多少趟。"),
      s("masu", "好。先如此扎营。但若错失战机，你也要同担。"),
      s("wangping", "能守住街亭，末将愿担。")
    ],
    choices: [
      c("趁势请求掌管水路", "由你直接安排汲水、警戒和撤退路线。", "wangping-drums", "王平请求掌管汲道与退路。"),
      c("退一步，不再继续争", "接受马谡的安排，不另设水路守军。", "wangping-letter", "王平暂退，不再继续争执。"),
      c("请马谡写入军簿", "把主寨、望楼和水路安排正式记下。", "wangping-drums", "王平请马谡将营地安排写入军簿。")
    ]
  },
  "wangping-order": {
    bg: "mountain",
    title: "直言刺耳",
    chapter: "王平视角 · 二",
    focus: "masu",
    entries: [
      s("wangping", "丞相节度写明，当道下寨，不得舍水。将军若上山，便是违令。"),
      s("masu", "王平，你竟以副将之身压主将？"),
      s("wangping", "末将不敢压将军，只敢把军令摆出来。"),
      s("masu", "军令写在出兵以前，未见得料到眼前地势。主将在阵前总要有处置。"),
      s("wangping", "阵前可以处置，但军令特意写了不得舍水。将军不能只挑准许临机的那一句。"),
      s("masu", "你若再扰众，我便分你别屯，免得军心被你拖住。"),
      s("wangping", "别屯也好。至少有人守住下方。")
    ],
    choices: [
      c("接受别屯，守水守路", "率本部留在山下，控制汲道和退路。", "wangping-drums", "王平别屯山下，守住水路。"),
      c("继续当众争执", "坚持要求主力下山；主副将号令可能因此冲突。", "wangping-letter", "王平继续当众争执，军中气氛紧绷。"),
      c("转而安抚士卒", "停止争令，先整顿队伍并标明退路。", "wangping-drums", "王平转去安抚士卒并整理退路。")
    ]
  },
  "wangping-letter": {
    bg: "pass",
    title: "一封急报",
    chapter: "王平视角 · 三",
    focus: "zhuge",
    entries: [
      n("夜里巡营回来，你让亲兵备马，写了一封只有数行的急报。若马谡知道，你很可能先背上越级告急的罪名。"),
      s("wangping", "前军欲上山，水路在下。臣再三规谏，未能尽止。请丞相速断。"),
      s("zhuge", "王平报得这样急，搬营之事恐怕已经开始。立刻备令。"),
      s("wangping", "你带两匹马，路上换着骑。若遇魏军斥候，军报毁掉，人一定要回中军。"),
      s("masu", "王平，你夜里巡营巡到哪里去了？"),
      s("wangping", "看了汲道。魏军一到，这里必是先争的地方。")
    ],
    choices: [
      c("公开承认已复命中军", "告诉马谡军报已经发出，并承担越级告急之责。", "wangping-drums", "王平公开承认已复命中军。"),
      c("不说急报，只继续布置退路", "隐瞒快马之事，继续安排本部接应。", "wangping-drums", "王平不再争口，暗中布置退路。"),
      c("请马谡共同署名补报", "由主副将共同把布营变化报给中军。", "wangping-drums", "王平请马谡共同补报营地安排。")
    ]
  },
  "wangping-drums": {
    bg: "mountain",
    title: "鼓声不能乱",
    chapter: "王平视角 · 四",
    focus: "zhanghe",
    entries: [
      n("魏军没有攻山。骑兵先赶走取水队，又占住几处下山的缓坡。到午后，山上的号令已经一阵紧过一阵。"),
      s("zhanghe", "蜀军山上有乱，山下有一部不乱。那鼓声，是个懂兵的人。"),
      s("wangping", "传令，鼓不许停。旗不许倒。各什伍照旧取列，不许奔走。"),
      s("masu", "王平，主阵已乱，你为何不来救？"),
      s("wangping", "末将一动，这条退路就没了。请将军带能收住的人往鼓声处撤。"),
      s("zhanghe", "先破其主阵。那部鼓阵，不可轻近。"),
      s("wangping", "前队举盾，弩手候令。敌不来，我们不动；敌若近，再放一轮。")
    ],
    choices: [
      c("鸣鼓自守，掩护残兵归队", "保持本部阵形，沿途收拢溃散士卒。", "wangping-final-cover", "王平鸣鼓自守，收束残兵。"),
      c("强行下山救主阵", "调本部离开退路，直接接应马谡主阵。", "wangping-final-hard", "王平试图强行下山救主阵。"),
      c("护住退路，放弃救主阵", "留守山下通道，不再向主阵增援。", "wangping-final-cover", "王平护住退路，放弃救主阵。")
    ]
  },
  "wangping-final-cover": {
    bg: "court",
    title: "败中收军",
    chapter: "王平视角 · 五",
    focus: "zhuge",
    entries: [
      n("退回汉中时，你带回数百残兵。有人丢了甲，有人带着伤，但各队名册还在，沿途也没有再溃散。"),
      s("zhuge", "子均，街亭已失，你为何还能收得这些人？"),
      s("wangping", "山上号令已经听不清。末将便让各队只认本部鼓声，退一段，列一段，再收沿途散兵。"),
      s("jiangwan", "各营都散了，你还能按队报回人数，这份军簿很要紧。"),
      s("wangping", "末将未能劝回主将，请罪。"),
      s("zhuge", "你已再三规谏，败后又收住诸营。先记功。未能救回街亭之责，待诸将口供齐了再议。")
    ],
    choices: [
      c("请先论马谡违令，再论自己失职", "结束本章。", null, "王平败中收军，请功罪分书。", "wangping-covers")
    ]
  },
  "wangping-final-hard": {
    bg: "court",
    title: "抗命救兵",
    chapter: "王平视角 · 五",
    focus: "zhuge",
    entries: [
      n("你没有等马谡回令，带本部下山接应溃兵。人救回了一些，军簿上也明明白白记着你擅自移营。"),
      s("zhuge", "你未经主将许可移军，可知军法？"),
      s("wangping", "知。可若不移，士卒便困死山上。"),
      s("zhuge", "救人是功，抗命是罪。你要我如何服众？"),
      s("wangping", "功罪分开写。末将不求免罪，只求以后副将遇此情形，有明法可依。"),
      s("jiangwan", "可把今日情形写成成例：主将失去号令、全军将溃时，副将可先救军，事后另受审问。")
    ],
    choices: [
      c("领罪，同时请定副将急变之法", "结束本章。", null, "王平抗命救兵，战后请定急变之法。", "hard-retreat")
    ]
  },

  "zhanghe-scout": {
    bg: "wei",
    title: "尘里看营",
    chapter: "张郃视角 · 一",
    focus: "masu",
    entries: [
      n("魏军赶到街亭时，天色尚早。张郃在山口换了三处地方观察蜀营，始终没有下令攻山。", { artifact: "terrain" }),
      s("zhanghe", "蜀军主力在山上，炊烟却在山下。问斥候，他们的水从哪里取。"),
      s("masu", "魏军到了。传令各营，依高处列阵。"),
      s("wangping", "将军，敌不急攻，恐怕是看水路。"),
      s("zhanghe", "山高路窄，仰攻要折人。传骑兵绕到汲道，不许取水队往返。"),
      s("zhanghe", "今日不攻山。先看他们能带多少水上去。")
    ],
    choices: [
      c("先断汲道，不急攻山", "骑兵控制水边，主力暂不仰攻。", "zhanghe-water", "张郃决定先断蜀军汲道。"),
      c("试探山下王平部", "派小队接近鼓阵，查明对方兵力和弩箭。", "zhanghe-wangping", "张郃先试探王平部。"),
      c("正面压迫马谡主阵", "步卒与弓弩同时推进，迫使山上提前应战。", "zhanghe-pressure", "张郃正面压迫马谡主阵。")
    ]
  },
  "zhanghe-water": {
    bg: "wei",
    title: "不攻其高",
    chapter: "张郃视角 · 二",
    focus: "wangping",
    entries: [
      s("zhanghe", "取水队必走这条沟。不要杀得太急，逼回去便可。"),
      s("wangping", "魏军不攻山，果然先逼水。将军，再迟就难下来了。"),
      s("masu", "张郃不攻，是惧我。"),
      s("zhanghe", "让他这样想。各部只守住水边，不得擅自上山求功。"),
      s("zhanghe", "传令，骑兵绕谷口，不许蜀军安稳往返。"),
      s("wangping", "鼓手上前。敌越稳，我们越不能乱。")
    ],
    choices: [
      c("继续围水，等待蜀军自乱", "维持封锁，让山上存水继续减少。", "zhanghe-drums", "张郃继续围水，等待蜀军自乱。"),
      c("趁取水队混乱立刻总攻", "立即攻山，可能遭遇仍有秩序的弩兵。", "zhanghe-pressure", "张郃趁取水混乱发起总攻。"),
      c("分兵绕后，截其退路", "抽调一部绕向蜀军后方，完成合围需要时间。", "zhanghe-drums", "张郃分兵绕后，截断蜀军退路。")
    ]
  },
  "zhanghe-wangping": {
    bg: "wei",
    title: "鼓声那边",
    chapter: "张郃视角 · 二",
    focus: "wangping",
    entries: [
      n("山下另有一部蜀军，人数不多，营中旗鼓却始终不乱。魏军两次靠近，对方都只列阵，不肯追出。"),
      s("zhanghe", "败军里若有一部不乱，不可当作寻常残兵。"),
      s("wangping", "鼓不停，旗不倒。敌若试探，只守不追。"),
      s("zhanghe", "领兵的是谁？查清楚。此部有人约束，不像山上。"),
      s("masu", "王平为何不来主阵？"),
      s("wangping", "末将若离此处，退路也没了。"),
      s("zhanghe", "先不碰他。破马谡，街亭自落。")
    ],
    choices: [
      c("避开王平，主攻马谡", "只监视山下本部，把主力用于攻山。", "zhanghe-drums", "张郃避开王平，主攻马谡。"),
      c("强压王平鼓阵", "先攻较稳的山下部队，主阵进攻会因此推迟。", "zhanghe-final-overreach", "张郃强压王平鼓阵。"),
      c("围住王平，逼马谡来救", "封住山下本部，迫使马谡分兵接应。", "zhanghe-pressure", "张郃围住王平部，逼马谡分心。")
    ]
  },
  "zhanghe-pressure": {
    bg: "mountain",
    title: "山上先乱",
    chapter: "张郃视角 · 三",
    focus: "masu",
    entries: [
      n("魏军步卒向山前推进。蜀军鼓声先催弩手，随后又催各营下山，几道命令撞在一起，山腰开始有人回跑。"),
      s("zhanghe", "看主旗。主旗若三动而不进，便是将令犹疑。"),
      s("masu", "各营坚守！魏军仰攻，正中我计。"),
      s("wangping", "将军，水路已危，此时不可只看山前。"),
      s("zhanghe", "他们两道军令不一。再逼近些，看山下那部动不动。"),
      s("zhanghe", "弓弩压其取水处，步卒逼其主阵。让他两头都要顾。")
    ],
    choices: [
      c("先破马谡主阵", "趁山上号令冲突，集中兵力进攻主旗。", "zhanghe-final-win", "张郃先破马谡主阵。"),
      c("转攻王平稳阵", "改攻山下本部，马谡主阵将得到喘息。", "zhanghe-final-overreach", "张郃转攻王平稳阵。"),
      c("围而不攻，等夜里崩散", "继续封锁，给蜀军中军留下增援时间。", "zhanghe-final-slow", "张郃围而不攻，等待蜀军夜里崩散。")
    ]
  },
  "zhanghe-drums": {
    bg: "wei",
    title: "胜不可贪",
    chapter: "张郃视角 · 三",
    focus: "wangping",
    entries: [
      s("zhanghe", "马谡主阵已动摇。那边鼓声仍齐。"),
      s("wangping", "各队照旧，不追，不散。谁乱跑，按军法。"),
      s("zhanghe", "那一部还有弩箭，阵脚也没动。不要拿骑兵硬撞。"),
      s("masu", "王平，救我主阵！"),
      s("wangping", "末将先保退路。"),
      s("zhanghe", "传令，先破山上主阵。山下那部只须监住，不必强攻。我们要街亭，不在今日尽杀蜀兵。")
    ],
    choices: [
      c("收束兵力，破马谡即止", "占领街亭，不再强攻王平本部。", "zhanghe-final-win", "张郃破马谡后不贸然逼王平。"),
      c("乘胜追击王平", "继续追击山下部队，可能在狭道受阻。", "zhanghe-final-overreach", "张郃乘胜追击王平。"),
      c("断路围困，等待诸葛亮退兵", "封锁道路，减少正面伤亡，也会放慢推进。", "zhanghe-final-slow", "张郃断路围困，等待蜀军自退。")
    ]
  },
  "zhanghe-final-win": {
    bg: "court",
    title: "魏营记功",
    chapter: "张郃视角 · 四",
    focus: "zhanghe",
    entries: [
      n("街亭已破，诸将入帐报功。有人请继续追击退往汉中的蜀军，张郃先问了各部伤亡。"),
      s("zhanghe", "马谡舍水上山，我军才能如此快破敌。此功要记，但不必说成什么神机。"),
      s("zhanghe", "王平那一部阵形尚全，强追未必讨得便宜。"),
      s("zhanghe", "留兵守街亭，骑兵追十里即还。先把陇右道路接起来。"),
      s("zhanghe", "诸葛亮治军严整，今日退兵，明日未必不来。不可因一胜便乱了自己的部署。")
    ],
    choices: [
      c("上报破街亭之功", "结束本章。", null, "张郃破马谡于街亭，迫使诸葛亮退兵。", "wei-historical-win")
    ]
  },
  "zhanghe-final-overreach": {
    bg: "court",
    title: "胜后多一步",
    chapter: "张郃视角 · 四",
    focus: "wangping",
    entries: [
      n("魏军追上王平部时，对方已经在狭道重新列阵。前队几次冲击都被弩箭挡回，追兵反而堵在山路上。"),
      s("wangping", "鼓不停。敌若近，弩手再放。"),
      s("zhanghe", "停。前队不要再挤。王平是故意在这里等我们。"),
      s("zhanghe", "收兵。街亭已经拿下，不必再耗前军。"),
      s("zhanghe", "告诉诸将，街亭已得。为多杀几百人把前军堵在狭道，不值。")
    ],
    choices: [
      c("承认追击过深，收束战果", "结束本章。", null, "张郃一度追击过深，被王平稳阵拖慢。", "wei-overreach")
    ]
  },
  "zhanghe-final-slow": {
    bg: "court",
    title: "稳胜不尽",
    chapter: "张郃视角 · 四",
    focus: "zhanghe",
    entries: [
      n("围困让魏军损失很少，却也给蜀军留下了整理退路的时间。街亭还是落入魏军手里，只是不如原本那样干脆。"),
      s("zhanghe", "伤亡是少，蜀军也多撤走了两营。"),
      s("zhanghe", "若诸葛亮的中军再近些，我们围得这半日，便够他派援兵赶到。"),
      s("zhanghe", "下次遇见已经动摇的敌军，该进就进。谨慎不是停在原地等万全。")
    ],
    choices: [
      c("以稳胜复命", "结束本章。", null, "张郃围困取胜，但未能扩大战果。", "wei-envelopment")
    ]
  }
};

const endings = {
  "history-jieting": {
    tone: "史实线",
    title: "街亭失守，北伐顿挫",
    result:
      "马谡违背诸葛亮节度，舍水上山，被张郃抓住汲道与退路的破绽而败。王平虽能收束一部，仍无法挽回街亭。诸葛亮退还汉中，上表自贬。",
    historical:
      "《三国志》记马谡“违亮节度，举动失宜”，又记张郃破马谡于街亭。王平传中保存了他规谏与收军的线索。",
    court:
      "史实里，马谡违令是直接败因；诸葛亮越过众议用马谡，也因此上表自贬。王平的规谏与收军之功，则被另行记载。"
  },
  "steady-throat": {
    tone: "改写线",
    title: "街亭得守，咽喉未断",
    result:
      "前线及时纠偏，王平守住水路与道路，马谡的谋划退回参谋位置。蜀军未必能一举吞下陇右，却没有被迫立刻退回汉中。",
    historical:
      "这是从史实反推的假设：王平在败局中表现出更强的执行稳定性，若关键底线被制度保护，街亭风险会明显降低。",
    court:
      "这条改写线没有替蜀军增加兵力，只让中军更早发现违令，并及时把主将换下。街亭因此仍有守住的可能。"
  },
  "late-correction": {
    tone: "补救线",
    title: "改得太迟，仍救一半",
    result:
      "纠偏命令赶到时，魏军已经压近汲道。蜀军损失不轻，但没有演成彻底崩盘。战后，军中开始把营地、水道、退路写入复命制度。",
    historical:
      "此线强调战场反馈。主帅的正确判断如果来得太晚，只能从败势里抢回一部分人。",
    court:
      "这条路线保留了马谡舍水上山的错误，只把中军的纠正提前。命令赶到时，能挽回多少取决于魏军是否已经控制汲道。"
  },
  "masu-saves-face-late": {
    tone: "悔改线",
    title: "认错救军，仍须问责",
    result:
      "马谡承认误判并移营，救回部分主动。可临阵违令已使士气受损，战后他被降任，不再独领大军。",
    historical:
      "这是对史实的温和改写：错误越早承认，代价越小；但军事责任不会因为悔改而消失。",
    court:
      "马谡主动改令可以减少伤亡，却不能取消此前违背节度的责任。战后降职，符合这条改写线的处置逻辑。"
  },
  "wangping-covers": {
    tone: "止损线",
    title: "败中有阵，王平收军",
    result:
      "王平鸣鼓自守，张郃疑其有伏，不贸然逼近。街亭仍败，但蜀军没有彻底溃散，撤退时保住了更多人。",
    historical:
      "王平传中最珍贵的不是神奇逆转，而是在败局里保持秩序。这种能力在游戏里被做成止损结局。",
    court:
      "《王平传》明确记载他在众军尽败后鸣鼓自持，并收合诸营遗迸。这里没有把他写成反败为胜，只保留了他能够止住溃散的能力。"
  },
  "hard-retreat": {
    tone: "抗命线",
    title: "救兵有功，抗命有罪",
    result:
      "王平强行引兵下山，救回一部分士卒，却破坏主将号令。战后诸葛亮不能只赏他的判断，也不能忽略军法的裂口。",
    historical:
      "此线让判断变得不舒服：组织靠纪律活着，但纪律若绑定错误命令，也会拖死军队。",
    court:
      "此线属于虚构推演。王平若擅自移军救援，结果可能有功，程序上仍是抗命；战后需要分别核定，不能只按成败论处。"
  },
  "wei-historical-win": {
    tone: "魏胜线",
    title: "张郃破街亭，胜在不贪",
    result:
      "张郃先断汲道，再破马谡主阵，对王平稳阵不作无谓追逼。魏军赢得关键节点，迫使诸葛亮退兵。",
    historical:
      "史实中的张郃不是靠夸张勇武取胜，而是抓住马谡离水的结构性错误。",
    court:
      "张郃没有强攻高处，而是切断汲道，再乘蜀军混乱进击。这一处理来自史书所记的战役结果与地势关系。"
  },
  "wei-overreach": {
    tone: "贪胜线",
    title: "追击过深，胜势被拖慢",
    result:
      "魏军试图尽歼王平部，反被稳阵与山道拖住。马谡仍败，但蜀军撤退更从容，魏军错过扩大战果的时机。",
    historical:
      "王平能让张郃不敢逼近，说明败局里仍有局部威慑。胜者若贪，就可能把优势还回去。",
    court:
      "这条推演让魏军在取胜后强攻王平本部。由于史载张郃曾疑王平设伏而不敢逼近，追击受阻有相应的材料依据。"
  },
  "wei-envelopment": {
    tone: "稳胜线",
    title: "围困取胜，战果不尽",
    result:
      "魏军围困蜀军，最终取得街亭，却因推进过慢给蜀军留下整理退路的时间。胜利稳妥，但不够锋利。",
    historical:
      "迂回与围困并不天然高级。它们必须跑赢对手的补救速度。",
    court:
      "围困能够减少正面攻山的损失，也给蜀军留下撤退时间。魏军仍可取得街亭，但未必能像史实那样迅速迫使蜀军全线退还。"
  }
};

const sarhuBackgrounds = {
  opening: "./assets/ming/backgrounds/sarhu-map.png",
  command: "./assets/ming/backgrounds/ming-command.png",
  river: "./assets/ming/backgrounds/hun-river.png",
  forest: "./assets/ming/backgrounds/sarhu-forest.png",
  jinCamp: "./assets/ming/backgrounds/jin-camp.png",
  court: "./assets/ming/backgrounds/ming-court.png"
};

const sarhuArtifacts = {
  routes: {
    src: "./assets/artifacts/sarhu-routes.png",
    label: "四路进兵图",
    note: "诸路相距，远过一道军令"
  },
  dispatch: {
    src: "./assets/artifacts/sarhu-dispatch.png",
    label: "辽东急报",
    note: "军书、令箭与封印"
  }
};

const sarhuCharacters = {
  yanghao: {
    name: "杨镐",
    courtesy: "京甫",
    faction: "明军经略",
    avatar: "./assets/ming/characters/yang-hao.png",
    expressions: { urgent: "./assets/expressions/yanghao-urgent.png" },
    playable: true,
    stats: { patience: 74, force: 32, intellect: 78, obedience: 82 },
    traits: ["总揽诸路", "压力沉重", "重奏报"],
    brief:
      "你是辽东经略，负责四路出师的日期、接应与奏报。朝廷催战，诸将各有行程；你必须让命令在各路接敌前真正送到。"
  },
  dusong: {
    name: "杜松",
    courtesy: "来清",
    faction: "山海关总兵",
    avatar: "./assets/ming/characters/du-song.png",
    playable: true,
    stats: { patience: 34, force: 90, intellect: 62, obedience: 50 },
    traits: ["急进敢战", "轻视迟疑", "锋芒过盛"],
    brief:
      "你是明军前锋，以敢战著称。渡过浑河后，是就地等待马林接应，还是追击后金小队，将直接决定前军是否陷入孤立。"
  },
  liuting: {
    name: "刘綎",
    courtesy: "省吾",
    faction: "明军老将",
    avatar: "./assets/ming/characters/liu-ting.png",
    playable: true,
    stats: { patience: 68, force: 92, intellect: 76, obedience: 70 },
    traits: ["宿将威名", "远路孤军", "重军纪"],
    brief:
      "你久经战阵，所领南路距离最远，军中还有朝鲜援兵。途中军报稀少，你要判断收到的催进命令是否可信。"
  },
  nurhaci: {
    name: "努尔哈赤",
    courtesy: "淑勒贝勒",
    faction: "后金大汗",
    avatar: "./assets/ming/characters/nurhaci.png",
    expressions: { command: "./assets/expressions/nurhaci-command.png" },
    playable: true,
    stats: { patience: 82, force: 88, intellect: 90, obedience: 78 },
    traits: ["集中兵力", "侦察敏锐", "决断迅速"],
    brief:
      "你面对兵力占优的明军四路进攻。斥候已经查明各路先后不一，你要决定主力先往哪里集结，以及取胜后是否继续分兵追击。"
  },
  malin: {
    name: "马林",
    courtesy: "不详",
    faction: "明军总兵",
    avatar: "./assets/ming/characters/ma-lin.png",
    playable: false,
    stats: { patience: 66, force: 74, intellect: 62, obedience: 76 },
    traits: ["谨慎", "守势", "易受牵动"],
    brief: "北路总兵。杜松急进时，他负责侧翼接应；杜松败讯传来后，他必须判断继续靠拢还是先稳住本营。"
  },
  lirubai: {
    name: "李如柏",
    courtesy: "子贞",
    faction: "明军将门",
    avatar: "./assets/ming/characters/li-rubai.png",
    playable: false,
    stats: { patience: 58, force: 70, intellect: 64, obedience: 62 },
    traits: ["将门余威", "迟疑保存", "惧失名声"],
    brief: "率西路出鸦鹘关。史实中闻败撤还，战后因未战而退受到弹劾。"
  },
  wanli: {
    name: "万历",
    courtesy: "朱翊钧",
    faction: "明朝皇帝",
    avatar: "./assets/ming/characters/wanli.png",
    playable: false,
    stats: { patience: 62, force: 18, intellect: 66, obedience: 45 },
    traits: ["深宫裁断", "边事沉重", "问责迟缓"],
    brief: "明朝皇帝。战前面对军饷与出师压力，战后须裁定杨镐等人的责任并重整辽东防务。"
  },
  hongtaiji: {
    name: "皇太极",
    courtesy: "四贝勒",
    faction: "后金贝勒",
    avatar: "./assets/ming/characters/hong-taiji.png",
    playable: false,
    stats: { patience: 76, force: 78, intellect: 84, obedience: 86 },
    traits: ["年轻敏锐", "善观敌势", "谨慎进言"],
    brief: "后金四贝勒，参与军议与转战，负责向努尔哈赤回报各旗位置和明军动向。"
  }
};

const sarhuOpeningCopy = [
  "万历四十七年，朝廷决定大举进兵辽东。抚顺已经失陷，后金势力渐强；京师催着出兵，辽东各镇却还在筹粮、点兵、等火器。经略杨镐接到的期限很紧。",
  "明军分为四路：杜松由抚顺方向进军，马林由开原进军，刘綎从宽甸一路深入，李如柏出鸦鹘关。另有叶赫与朝鲜兵马参战。按军议，诸路须同时逼近赫图阿拉，使后金无法兼顾。",
  "真正开拔后，四路之间隔着山林、河流和积雪。快马送一封军报要走很久，各路所见的敌情也不一样。有人怕误期，有人急着抢功，还有人直到交战前都不知道别路已经败了。",
  "努尔哈赤没有分兵守住每一处。他集结主力，先攻击已经脱离援军的明军，再迅速转向下一路。史实的结局是明军大败；这一卷从命令发出以前开始。"
];

const sarhuSources = [
  {
    title: "《明史·卷二百五十九·杨镐传》",
    url: "https://zh.wikisource.org/zh-hans/%E6%98%8E%E5%8F%B2/%E5%8D%B7259",
    note: "杨镐经略辽东、四路出师、败后问责等主线依据。"
  },
  {
    title: "《明史·卷二百四十七·刘綎传》",
    url: "https://zh.wikisource.org/wiki/%E6%98%8E%E5%8F%B2/%E5%8D%B7247",
    note: "刘綎生平、宿将性格与辽东战死线索。"
  },
  {
    title: "《明史·卷二百三十八·李成梁传》附李如柏",
    url: "https://zh.wikisource.org/wiki/%E6%98%8E%E5%8F%B2/%E5%8D%B7238",
    note: "李如柏出鸦鹘关、闻败撤还、战后被劾等线索。"
  },
  {
    title: "《明史·卷三百二十·外国一·朝鲜》",
    url: "https://zh.wikisource.org/wiki/%E6%98%8E%E5%8F%B2/%E5%8D%B7320",
    note: "朝鲜助战兵将或降或战死、辽东战局牵动朝鲜边防。"
  },
  {
    title: "《清史稿·卷一·太祖本纪》",
    url: "https://zh.wikisource.org/wiki/%E6%B8%85%E5%8F%B2%E7%A8%BF/%E5%8D%B71",
    note: "努尔哈赤侧的兴起与后金叙事背景。"
  }
];

const sarhuRouteStarts = {
  yanghao: "yanghao-council",
  dusong: "dusong-march",
  liuting: "liuting-road",
  nurhaci: "nurhaci-scout"
};

const sarhuScenes = {
  "yanghao-council": {
    bg: "command",
    title: "四路未合",
    chapter: "杨镐视角 · 一",
    focus: "dusong",
    entries: [
      n("辽东总帐里，四路进兵的日期已经核过两遍。杜松、马林、刘綎仍有话要说，杨镐却还等着向京师回报出师之期。", { artifact: "routes" }),
      s("yanghao", "杜松出抚顺，马林趋开原，刘綎从宽甸，李如柏出鸦鹘关。四路同进，后金首尾难顾。", { expression: "urgent" }),
      s("dusong", "经略若要合围，便不可一日三催又一日三等。前锋一慢，军气先泄。"),
      s("liuting", "我这一路最远。若前路有变，军报来回就是数日。经略只定会师日期，还须定清楚多久不见友军便可停进。"),
      s("malin", "后金骑兵来去快。杜总兵若先接敌，我未必赶得上；我这里若先遇敌，他也未必知情。"),
      s("yanghao", "期限是朝廷定下的，我改不得太多。今日先把传报和接应定死，免得到时各走各的。")
    ],
    choices: [
      c("严定合期，迟者以军法论", "保证诸路依期前进，也可能逼人冒险赶路。", "yanghao-orders", "杨镐严定四路合期，迟者军法从事。"),
      c("给各路遇变自停之权", "敌情不明时可停营复报，会师日期可能延后。", "yanghao-courier", "杨镐允许各路遇敌情不明时自停复命。"),
      c("先集两路稳进，再催后两路", "先保证相邻两路能够接应，再令远路推进。", "yanghao-delay", "杨镐改为两路先稳进，后路接应。")
    ]
  },
  "yanghao-orders": {
    bg: "command",
    title: "令出如铁",
    chapter: "杨镐视角 · 二",
    focus: "dusong",
    entries: [
      s("dusong", "经略既按军法定期，末将便照期走。只请后路不要见我先行，又在原地观望。"),
      s("yanghao", "你按期到是本分。若早到了两日，便在约定处等，不许越过接应地。"),
      s("dusong", "战机不等人。若敌营在前，难道因马林、刘綎未至，便看着他走？"),
      s("liuting", "你追过去容易。后路收到消息、再赶来接应，至少晚一两日。"),
      s("yanghao", "所以快马必须不断。各路每日至少两报，见敌不得私战。"),
      s("dusong", "敌军若就在眼前，还等快马往返，战机早没了。经略这条令，末将未必做得到。")
    ],
    choices: [
      c("派监军随杜松，强制复命", "杜松遇敌前必须先报中军，临阵处置会变慢。", "yanghao-courier", "杨镐派监军随杜松，要求遇敌复命。"),
      c("信任杜松先声夺人", "准许前锋见机接战，不必等待旁路靠拢。", "yanghao-bad-news", "杨镐放杜松先行求战。"),
      c("命马林靠近杜松侧翼", "马林改变行程接应前锋，北路原定部署会延后。", "yanghao-courier", "杨镐命马林向杜松侧翼靠拢。")
    ]
  },
  "yanghao-delay": {
    bg: "command",
    title: "慢令难服",
    chapter: "杨镐视角 · 二",
    focus: "dusong",
    entries: [
      s("dusong", "四路大军出关，却还要两路并着走。消息传回京师，言官先要说我们畏敌。"),
      s("yanghao", "言官的奏疏我来受。你若走得太远，谁能在阵前把你接回来？"),
      s("liuting", "缓进可以，军令须说清楚。各营若只听见改期，便会以为中军也拿不定主意。"),
      s("lirubai", "若大军未齐而敌先动，我路当进还是当守？"),
      s("yanghao", "守住可互援之距。谁先见敌，谁先报，不得贪首功。"),
      s("dusong", "军中人人都等着第一场胜仗。若遇小股敌兵也不许打，这口气怎么提起来？")
    ],
    choices: [
      c("公开说明互援之距", "各路不得越过约定的接应范围。", "yanghao-courier", "杨镐公开说明各路互援距离。"),
      c("私下安抚杜松，许其小胜立功", "准许攻击小股敌军，但追击范围难以控制。", "yanghao-bad-news", "杨镐私许杜松临机求小胜。"),
      c("请求朝廷延后战期", "请宽十日重整接应，承担朝廷问责。", "yanghao-court", "杨镐拟请朝廷延缓大举进兵。")
    ]
  },
  "yanghao-courier": {
    bg: "river",
    title: "浑河急报",
    chapter: "杨镐视角 · 三",
    focus: "malin",
    entries: [
      n("浑河方向的信使在午后赶到，衣甲还滴着水。杜松已经渡河，并未在预定的接应处停营。", { artifact: "dispatch" }),
      s("yanghao", "杜松到了哪里？"),
      s("malin", "前锋已近萨尔浒山口。马林军尚未能与之并肩。"),
      s("yanghao", "前一封军报还说在渡河，怎么半日便到了山口？沿途见敌没有？"),
      s("malin", "斥候说后金兵未全出，只见小股诱敌。"),
      s("liuting", "小股兵马若总在他前面退，多半是在引路。杜松性急，见了不会不追。"),
      s("yanghao", "用我的令箭，叫杜松就地扎营。再发一骑去催马林，把两路相距多少里报回来。")
    ],
    choices: [
      c("急令杜松停营待援", "派多路快马追令，仍可能赶不上前锋。", "yanghao-bad-news", "杨镐急令杜松停营待援。"),
      c("令马林强行靠拢杜松", "马林立即转向接应，北路营伍可能因此混乱。", "yanghao-bad-news", "杨镐令马林强行靠拢杜松。"),
      c("召各路回撤重组", "停止四路合围，先把仍未接战的兵马撤出山林。", "yanghao-court", "杨镐召各路回撤重组。")
    ]
  },
  "yanghao-bad-news": {
    bg: "court",
    title: "败报入京",
    chapter: "杨镐视角 · 四",
    focus: "wanli",
    entries: [
      n("败报陆续送进京师：先报杜松军覆没，随后是马林败退，再后来，刘綎一路也失了消息。杨镐被召问时，兵部已经把四路军报抄齐。"),
      s("wanli", "四路大军，何以一日之间相继失利？"),
      s("yanghao", "臣调度失期，诸将进退不一，敌以整击散。"),
      s("wanli", "杨镐，朕问的不是一句失期。四路号称四十余万，为何杜松接战时，旁路没有一兵相救？"),
      s("yanghao", "臣定期太迫，又未能掌握各路行程。杜松越过接应地，臣的止进令也送晚了。调度之罪，臣无可推。"),
      s("wanli", "把各路何日出关、何日接报、你的军令何时发出，一件件具来。兵部议罪，辽东也要马上补防。")
    ],
    choices: [
      c("承担调度之责", "结束本卷。", null, "杨镐承担四路失调之责，战局按史实走向大败。", "sarhu-history"),
      c("奏请重整辽东防线", "结束本卷。", null, "杨镐败后仍请求重整防线，朝廷问责与防务并行。", "sarhu-delayed-retreat")
    ]
  },
  "yanghao-court": {
    bg: "court",
    title: "未战先难",
    chapter: "杨镐视角 · 四",
    focus: "wanli",
    entries: [
      s("wanli", "你要缓期？朝中已议大举，辽东军饷日费万金。"),
      s("yanghao", "各路粮秣尚未齐，快马驿站也没有布完。此时按四路齐进，臣无法保证他们彼此接应。"),
      s("wanli", "若缓而敌势更张，罪又在谁？"),
      s("yanghao", "仍由臣领罪。请宽十日，先让杜松、马林两路接得上，再令刘綎、李如柏依期牵制。"),
      s("liuting", "十日够各路互换一次斥候，也够把遇变停进的信号定下来。"),
      s("wanli", "兵部催饷，朝议催战，辽东又日日告急。朕准十日。十日之后，你拿可以执行的军令来复奏。")
    ],
    choices: [
      c("以缓师换重组", "结束本卷。", null, "杨镐冒着朝议压力缓师重组，避免最惨烈的分路崩盘。", "sarhu-coordinated"),
      c("仍按期出兵", "结束本卷。", null, "杨镐最终仍按期出兵，四路风险未能解除。", "sarhu-history")
    ]
  },

  "dusong-march": {
    bg: "river",
    title: "先渡者",
    chapter: "杜松视角 · 一",
    focus: "yanghao",
    entries: [
      n("杜松的前锋到了浑河边。河水挟着碎冰，临时搭起的桥只够两骑并行，后队还在数里之外。", { artifact: "routes" }),
      s("dusong", "让步兵先渡，骑兵随后。辎重过桥慢，留一营接应，不必等齐。"),
      s("yanghao", "杜总兵，军期要合。你若越得太快，侧翼跟不上。"),
      s("dusong", "敌人也知道侧翼未到。等他把各处关口封住，再渡就迟了。"),
      s("malin", "你先渡可以，至少在对岸立营。越过山口，我这里便看不见你的旗。"),
      s("dusong", "你按军期跟上便看得见。前锋若等后军齐了才走，还叫什么前锋？")
    ],
    choices: [
      c("立刻渡河急进", "前锋不等辎重与侧翼，直接越过浑河。", "dusong-sarhu", "杜松立刻渡河急进。"),
      c("渡河后立营等侧翼", "在对岸设营，等马林进入接应距离。", "dusong-camp", "杜松渡河后立营等待侧翼。"),
      c("派人回催杨镐明确接应", "暂缓前进，要求中军说明马林何时靠拢。", "dusong-camp", "杜松回催杨镐明确接应。")
    ]
  },
  "dusong-camp": {
    bg: "forest",
    title: "山口前夜",
    chapter: "杜松视角 · 二",
    focus: "malin",
    entries: [
      s("malin", "前营已经立好。今夜等一等北路军报，明早再过山口。"),
      s("dusong", "天还没黑。后金小股兵就在前面，这时停下，士卒会以为主将不敢追。"),
      s("malin", "他们退得整齐，也不丢器械，不像败走。先让斥候看清林后有没有大队。"),
      s("dusong", "每次见敌都等斥候来回，这仗还打不打？"),
      s("malin", "至少等守桥的一营跟上。真有变，我们还有路可退。"),
      s("dusong", "若敌军今夜撤尽，明日经略问我为何不追，你替我回话吗？")
    ],
    choices: [
      c("夜里派斥候探林，不急攻", "先查明林后兵力，明早再定进退。", "dusong-contact", "杜松夜派斥候探林。"),
      c("趁夜夺山口", "在后金集结前抢占山口，风险很高。", "dusong-contact", "杜松趁夜夺山口。"),
      c("等马林靠拢再动", "前锋留在营内，待两路可以互援后再进。", "dusong-final-save", "杜松等待马林靠拢。")
    ]
  },
  "dusong-sarhu": {
    bg: "forest",
    title: "林中诱影",
    chapter: "杜松视角 · 二",
    focus: "nurhaci",
    entries: [
      n("明军过河后，前方林中出现数十名后金骑兵。双方一接触，对方便退入山道，队形并没有散。"),
      s("dusong", "看见没有？敌怯了。"),
      s("malin", "退得太整，不像溃兵。"),
      s("nurhaci", "杜松已经过河。前队继续退，不可同他缠斗。等他离渡口再报。"),
      s("dusong", "传令追击。咬住这队骑兵，别让他们回去合兵。"),
      s("malin", "将军，守桥营还在后面。至少留一队沿路设旗，让后军知道我们走到哪里。")
    ],
    choices: [
      c("追击诱敌小队", "全军越过山口，试图在对方回营前追上。", "dusong-contact", "杜松追击后金诱敌小队。"),
      c("止追，先占高地列阵", "停止追击，在山口附近建立可守阵地。", "dusong-final-save", "杜松止追，占高地列阵。"),
      c("分兵一半追击，一半守桥", "追兵与守桥营各留一半兵力，双方都难以互援。", "dusong-contact", "杜松分兵追击并守桥。")
    ]
  },
  "dusong-contact": {
    bg: "forest",
    title: "孤势已成",
    chapter: "杜松视角 · 三",
    focus: "nurhaci",
    entries: [
      s("nurhaci", "明前锋已离河。传令诸贝勒，合兵击之。"),
      s("dusong", "敌忽然多了。"),
      s("malin", "先前退的只是前队，主力一直藏在林后。我们离渡口太远了。"),
      s("dusong", "现在转身，敌骑从后追来，队伍马上就散。"),
      s("malin", "那便结方阵缓退。守桥营若还在，能接我们一程。"),
      s("dusong", "前军看着我。此刻一下退令，谁还肯回头迎敌？先把正面顶住！")
    ],
    choices: [
      c("结阵死战", "停止后撤，集中前军迎击后金主力。", "dusong-final-fall", "杜松结阵死战。"),
      c("边战边退回渡口", "结阵缓退，争取与守桥营会合。", "dusong-final-save", "杜松边战边退回渡口。"),
      c("派死士突围求援", "抽调精骑寻找马林，主阵留在原地防守。", "dusong-final-mixed", "杜松派死士突围求援。")
    ]
  },
  "dusong-final-fall": {
    bg: "court",
    title: "前锋不归",
    chapter: "杜松视角 · 四",
    focus: "wanli",
    entries: [
      n("杜松战死、前锋覆没的军报送回后，朝廷依例议恤，也命杨镐逐条说明杜松为何脱离接应。"),
      s("wanli", "杜松战死，朝中该以忠勇论。"),
      s("yanghao", "忠勇不可没，孤进亦不可掩。"),
      s("malin", "杜总兵接敌时，我军相距尚远。他几次遣人催进，我这里也确实没有赶到。"),
      s("wanli", "恤典照给。兵部另查军令与行程，不能只用忠勇二字把这一路败因盖过去。")
    ],
    choices: [
      c("以杜松战死入史", "结束本卷。", null, "杜松孤军急进，战死萨尔浒。", "sarhu-du-song-fall")
    ]
  },
  "dusong-final-save": {
    bg: "court",
    title: "前锋未折",
    chapter: "杜松视角 · 四",
    focus: "yanghao",
    entries: [
      n("杜松边战边退，终于在渡口与接应兵会合。回到总帐时，他的甲上还有箭痕，第一句话便问军中如何议论这次退兵。"),
      s("yanghao", "你若再进一里，便未必回得来。"),
      s("dusong", "末将退了，军中会说我怯。"),
      s("yanghao", "你擅越接应地，先记一过；能把前军带回来，也记一功。旁人说什么，等战后再算。"),
      s("malin", "我路明日可到。两军合营以后，再往前探，不必让你一军独当。")
    ],
    choices: [
      c("接受退兵重组", "结束本卷。", null, "杜松收住急进，明军得以重组互援。", "sarhu-coordinated")
    ]
  },
  "dusong-final-mixed": {
    bg: "court",
    title: "半军得脱",
    chapter: "杜松视角 · 四",
    focus: "yanghao",
    entries: [
      n("求援的骑兵找到守桥营，接应来得仍然太晚。杜松部折损过半，余军从渡口撤回。"),
      s("dusong", "末将误入孤势，请罪。"),
      s("yanghao", "你越过山口时便已失了接应。到了合围才遣人求援，守桥营如何赶得及？"),
      s("wanli", "杜松擅进要问罪，杨镐的接应为何隔得这样远，也一并查明。不能把半军得脱当作无事。")
    ],
    choices: [
      c("以迟救为戒", "结束本卷。", null, "杜松迟救半军，明军仍遭重创。", "sarhu-delayed-retreat")
    ]
  },

  "liuting-road": {
    bg: "river",
    title: "远路孤军",
    chapter: "刘綎视角 · 一",
    focus: "yanghao",
    entries: [
      n("刘綎一路由宽甸深入，路程最远。军中既有明军，也有朝鲜援兵；各营号令不同，沿途驿站又少，行程比原定慢了两日。", { artifact: "routes" }),
      s("liuting", "上一封中军令是三日前发的，杜松、马林都没有新报。再往前走，连回信的人都未必找得到我们。"),
      s("yanghao", "刘总兵仍须依期进抵。你一路若停，四路合围便缺了一面。"),
      s("liuting", "臣可以依期走。但请经略明示，若五日不见旁路旗号，是继续深入，还是停营等报？"),
      s("hongtaiji", "父汗，南路明军还不知道杜松一军的消息。"),
      s("nurhaci", "先不惊动他。把通往中军的几条路看住，再择人送一道催进的假令。")
    ],
    choices: [
      c("按原期深入", "依照中军期限推进，不再等待旁路军报。", "liuting-message", "刘綎按原期深入。"),
      c("放慢，等待友军声息", "在山口停营，可能因此被问迟误。", "liuting-wait", "刘綎放慢等待友军声息。"),
      c("派多路斥候核实杜松、马林消息", "分三路查探友军位置，行程至少延后一日。", "liuting-wait", "刘綎派多路斥候核实友军。")
    ]
  },
  "liuting-message": {
    bg: "forest",
    title: "假令与真险",
    chapter: "刘綎视角 · 二",
    focus: "nurhaci",
    entries: [
      n("傍晚，一名使者带来杨镐急令，声称杜松已经得手，催刘綎连夜进兵。令上的关防像是真的，使者却答不出上一处换马的驿站。"),
      s("liuting", "符验拿来。"),
      s("nurhaci", "关防照缴来的军书刻。使者只须咬定杜松已胜，杨镐催他接应。"),
      s("liuting", "关防无错，行文却不像中军旧例。你从哪座驿站来的？同行几人？"),
      s("liuting", "把使者看住。各营照原次序行军，没有我的令，不许连夜赶路。"),
      s("hongtaiji", "他扣下使者了。是否立刻出兵？")
    ],
    choices: [
      c("相信急令，加速前进", "连夜赶路接应杜松，不再核查使者来历。", "liuting-ambush", "刘綎相信急令加速前进。"),
      c("扣下使者，原地核验", "停营查验关防与驿路，承担误期责任。", "liuting-final-save", "刘綎扣下使者原地核验。"),
      c("分前锋试探，主力缓行", "小股兵马先行探路，主力保持原有队列。", "liuting-ambush", "刘綎分前锋试探，主力缓行。")
    ]
  },
  "liuting-wait": {
    bg: "forest",
    title: "等来的不是友军",
    chapter: "刘綎视角 · 二",
    focus: "nurhaci",
    entries: [
      s("liuting", "杜松无报，马林也无报。中军三日前还催得这样急，如今反倒一封信没有。前面必定出了事。"),
      s("nurhaci", "刘綎停在山口，没有再追使者的令。这个人比杜松难引。"),
      s("hongtaiji", "是否绕其后路？"),
      s("nurhaci", "放一个杜松败兵过去。消息真了，他反而要在救援和退兵之间犹豫。"),
      s("liuting", "若杜松确已败，我军再进便是独军；可只凭一个逃兵便撤，中军追问起来，谁能作证？"),
      s("liuting", "再派两队人，分走东西两路查探。今夜扎营，不许离开水源。")
    ],
    choices: [
      c("转为接应残军", "停止深入，沿原路寻找杜松、马林败兵。", "liuting-final-save", "刘綎转为接应残军。"),
      c("继续按令进攻", "维持原定行程，可能独自接触后金主力。", "liuting-ambush", "刘綎继续按令进攻。"),
      c("筑营固守，等待杨镐新令", "控制水源和山口，等中军重新确认军情。", "liuting-final-save", "刘綎筑营固守等待新令。")
    ]
  },
  "liuting-ambush": {
    bg: "forest",
    title: "阿布达里冈",
    chapter: "刘綎视角 · 三",
    focus: "nurhaci",
    entries: [
      n("队伍进入阿布达里冈后，山路只容数骑并行。前锋忽报两侧林中都有敌骑，后队也已听见号角。"),
      s("liuting", "结阵。朝鲜兵居中，火器在前，后队不得乱。"),
      s("nurhaci", "他的前队已经结阵。不要正面冲火器，先截住后队，把明军和朝鲜兵隔开。"),
      s("liuting", "告诉各营，刘綎还在，旗便不可倒。"),
      s("hongtaiji", "父汗，他若死战，损耗不会小。"),
      s("nurhaci", "围住两头，留一面叫他看见退路。等阵形一动，再从侧面压上去。")
    ],
    choices: [
      c("死战突围", "亲自领前队冲开包围，伤亡可能极大。", "liuting-final-fall", "刘綎死战突围。"),
      c("收缩阵形，护朝鲜兵撤出", "放弃继续进攻，分队掩护各营退回山口。", "liuting-final-save", "刘綎收缩阵形护人撤出。"),
      c("分兵诱敌，主力转入山道", "一部留阵吸引敌军，主力另寻山路撤离。", "liuting-final-fall", "刘綎分兵诱敌。")
    ]
  },
  "liuting-final-fall": {
    bg: "court",
    title: "老将不归",
    chapter: "刘綎视角 · 四",
    focus: "wanli",
    entries: [
      n("刘綎战死的军报由辽东转送入京。随军朝鲜将领的口供也一并送到兵部，其中记着南路数日不知其他三路胜败。"),
      s("wanli", "刘綎老将，死于王事。"),
      s("yanghao", "臣不能使诸路相闻，使宿将独入深险。"),
      s("wanli", "照阵亡总兵的例子议恤。再把南路收到的每一道军令抄来，朕要知道他到死前究竟听见了什么消息。")
    ],
    choices: [
      c("以忠壮与失调并书", "结束本卷。", null, "刘綎孤军深入，战死山道。", "sarhu-liu-ting-ambush")
    ]
  },
  "liuting-final-save": {
    bg: "court",
    title: "老将缓归",
    chapter: "刘綎视角 · 四",
    focus: "yanghao",
    entries: [
      n("刘綎停止深入，转而接应溃兵，随后带各营退回宽甸。回到辽东后，兵部先问的不是救回多少人，而是为何没有按期进抵。"),
      s("liuting", "臣宁受迟误之责，不愿把远路兵马送进无报之地。"),
      s("yanghao", "你停进时中军尚未发撤令，依军法确有迟误。只是杜松已败，你再入山也无人接应。"),
      s("wanli", "若人人都以敌情不明为由停兵，四路之令还有何用？"),
      s("liuting", "臣请受迟误之罪。南路兵马尚在，可立即移守宽甸；若尽没山中，那里便只能另调新军。")
    ],
    choices: [
      c("以迟进保军复命", "结束本卷。", null, "刘綎缓进保军，未能大胜但避免全军陷没。", "sarhu-delayed-retreat")
    ]
  },

  "nurhaci-scout": {
    bg: "jinCamp",
    title: "四路来兵",
    chapter: "努尔哈赤视角 · 一",
    focus: "hongtaiji",
    entries: [
      n("赫图阿拉营中，斥候从南北各路陆续回报。明军人数远多于后金，但四路前锋相距数日路程，最早渡河的是杜松。", { artifact: "routes" }),
      s("hongtaiji", "父汗，明军四路并进。若我军分守，处处都薄。"),
      s("nurhaci", "四路不是同一日到。若分兵去守四处，我们处处都少；若先放近处进来，便可以合兵打他一处。"),
      s("hongtaiji", "先击哪一路？"),
      s("nurhaci", "杜松已经渡河，马林还在后面。先盯住杜松，等他离开渡口。"),
      s("nurhaci", "传各旗，不许各守一方。除监视明军的轻骑外，主力都向萨尔浒集结。", { expression: "command" })
    ],
    choices: [
      c("先盯杜松前锋", "主力转向萨尔浒，等杜松远离渡口。", "nurhaci-du-song", "努尔哈赤决定先盯杜松前锋。"),
      c("诱刘綎远路深入", "封锁南路军报，并准备催进假令。", "nurhaci-liu-ting", "努尔哈赤布置诱刘綎深入。"),
      c("佯动扰马林、李如柏", "用轻骑牵制北、西两路，主力暂不接战。", "nurhaci-ma-lin", "努尔哈赤佯动扰乱马林、李如柏。")
    ]
  },
  "nurhaci-du-song": {
    bg: "forest",
    title: "先破其锐",
    chapter: "努尔哈赤视角 · 二",
    focus: "dusong",
    entries: [
      s("dusong", "敌小队退入林中。追。"),
      s("hongtaiji", "杜松果然离河。"),
      s("nurhaci", "前队继续退。等他的后军也过山口，再截渡口。"),
      s("hongtaiji", "若马林靠近呢？"),
      s("nurhaci", "马林若已靠近，留一旗挡住他。主力仍先打杜松，不可两面分兵。"),
      s("nurhaci", "杜松一败，俘虏和逃兵自然会把消息带给别路。我们不必替他送信。")
    ],
    choices: [
      c("集中主力击杜松", "各旗合兵进攻已经离河的明军前锋。", "nurhaci-after-first", "努尔哈赤集中主力击杜松。"),
      c("分兵同时压马林", "抽调部分主力北上，攻击杜松的兵力会减少。", "nurhaci-overreach", "努尔哈赤分兵同时压马林。"),
      c("只诱不战，继续拖深", "继续后撤前队，明军旁路可能在此期间靠拢。", "nurhaci-after-first", "努尔哈赤继续诱杜松深入。")
    ]
  },
  "nurhaci-liu-ting": {
    bg: "forest",
    title: "远路可欺",
    chapter: "努尔哈赤视角 · 二",
    focus: "liuting",
    entries: [
      s("hongtaiji", "刘綎老将，不像杜松好激。"),
      s("nurhaci", "刘綎不肯追小队，便用杨镐的名义催他。关防、纸张都照明军缴来的旧令做。"),
      s("liuting", "符验有异。此令从何处来？"),
      s("hongtaiji", "他起疑了。"),
      s("nurhaci", "起疑便会停下来查。让轻骑绕过他，先断回宽甸的报路。"),
      s("nurhaci", "等他确认杜松已败时，我们的主力也该从北面转过来了。")
    ],
    choices: [
      c("继续用假令牵引", "催刘綎深入，并封锁他核验军令的报路。", "nurhaci-after-first", "努尔哈赤继续用假令牵引刘綎。"),
      c("先回头破杜松", "放弃立即进攻南路，先集中各旗打杜松。", "nurhaci-du-song", "努尔哈赤回头先破杜松。"),
      c("分兵夹击刘綎", "南北同时用兵，各处都无法保持全部主力。", "nurhaci-overreach", "努尔哈赤分兵夹击刘綎。")
    ]
  },
  "nurhaci-ma-lin": {
    bg: "forest",
    title: "让旁路先怕",
    chapter: "努尔哈赤视角 · 二",
    focus: "malin",
    entries: [
      s("malin", "杜松军无报，林中敌影又多。"),
      s("lirubai", "若前路已败，我路再进，便是添败。"),
      s("nurhaci", "马林没有急进。派轻骑在营外轮番出现，叫他弄不清我们有多少人，主力仍不要动。"),
      s("hongtaiji", "父汗，若他们收拢呢？"),
      s("nurhaci", "他们若收拢，我们便退回险地，不同大队明军硬拼。"),
      s("nurhaci", "先截军报，再惊营门。只要马林不敢去救杜松，这一路兵就算牵住了。")
    ],
    choices: [
      c("散骑扰其军心", "轻骑轮番出现在营外，主力仍保持集结。", "nurhaci-after-first", "努尔哈赤以散骑扰明军旁路。"),
      c("集中转击杜松", "撤回牵制兵力，把各旗调往萨尔浒。", "nurhaci-du-song", "努尔哈赤转击杜松。"),
      c("追击李如柏撤路", "分兵进入西路山道，主力集结会被打乱。", "nurhaci-overreach", "努尔哈赤追击李如柏撤路。")
    ]
  },
  "nurhaci-after-first": {
    bg: "jinCamp",
    title: "一胜之后",
    chapter: "努尔哈赤视角 · 三",
    focus: "hongtaiji",
    entries: [
      n("杜松军败后，各旗都来请命追击。与此同时，斥候报马林已经得知败讯，南路刘綎仍在继续深入。"),
      s("hongtaiji", "诸贝勒请分兵追击。"),
      s("nurhaci", "追兵分出去，下一战便来不及收拢。先清点各旗，负伤多的留守，能战的随我转向尚间崖。"),
      s("hongtaiji", "那下一处？"),
      s("nurhaci", "马林就在近处，军心已动，先打他。刘綎离得远，等北面战事结束再回军。"),
      s("nurhaci", "传令各旗随主力转进。谁擅自追俘掠物，按军法处置。")
    ],
    choices: [
      c("继续集中，逐路击破", "各旗仍随主力转战，不准自行追俘。", "nurhaci-final-win", "努尔哈赤坚持集中兵力逐路击破。"),
      c("分兵追击残部", "争取更多俘获，但下一战可用的主力会减少。", "nurhaci-overreach", "努尔哈赤分兵追击残部。"),
      c("停止追击，固守赫图阿拉", "撤回各旗防守关口，允许明军残部收拢。", "nurhaci-final-slow", "努尔哈赤停止追击，固守赫图阿拉。")
    ]
  },
  "nurhaci-overreach": {
    bg: "forest",
    title: "胜也会散",
    chapter: "努尔哈赤视角 · 三",
    focus: "hongtaiji",
    entries: [
      s("hongtaiji", "父汗，诸路追兵已经拉开。"),
      s("nurhaci", "离主力最远的是哪一旗？派人叫回来。"),
      s("hongtaiji", "若明军此时重组反击，我们反成几路。"),
      s("nurhaci", "杜松已破，各旗都只看见眼前的俘获。再这样追下去，明军若合一处，我们反而来不及列阵。"),
      s("nurhaci", "鸣金收兵。日落前不到集结地的，军功不录。")
    ],
    choices: [
      c("收束兵力，保住胜果", "结束本卷。", null, "努尔哈赤一度追深，及时收束。", "sarhu-jin-overreach")
    ]
  },
  "nurhaci-final-win": {
    bg: "court",
    title: "辽东易势",
    chapter: "努尔哈赤视角 · 四",
    focus: "nurhaci",
    entries: [
      n("萨尔浒诸战结束后，明军各路先后退走。后金诸贝勒入帐报俘获、伤亡和各旗所在，努尔哈赤又追问明军是否已经全部出山。"),
      s("nurhaci", "杜松、马林两路已破，刘綎也败。李如柏撤得快，不必越过险地强追。"),
      s("hongtaiji", "此战之后，诸部会重新看我们。"),
      s("nurhaci", "这一战赢在各旗听令，没有被四路明军分开。把伤兵安置好，俘虏分营看守，先防明军再来。"),
      s("nurhaci", "杨镐这次败了，明朝仍能再调兵。各路关口不可因胜撤守。")
    ],
    choices: [
      c("以萨尔浒大胜收束", "结束本卷。", null, "努尔哈赤集中兵力，逐路击破明军。", "sarhu-jin-decisive")
    ]
  },
  "nurhaci-final-slow": {
    bg: "court",
    title: "胜而未尽",
    chapter: "努尔哈赤视角 · 四",
    focus: "hongtaiji",
    entries: [
      n("后金停止追击后，明军残部得以收拢撤退。战果不如诸将预想，却也没有给明军反击的机会。"),
      s("hongtaiji", "父汗，若继续追，也许战果更大。"),
      s("nurhaci", "继续追，最远的旗要到明日才能回来。马林若在途中接住败兵，我们便要用散兵打他的整营。"),
      s("hongtaiji", "那此战如何记？"),
      s("nurhaci", "如实记各旗斩获，也记明军尚有多少撤走。今日收兵是我的令，不必替诸将遮掩，也不必夸大。")
    ],
    choices: [
      c("保存胜利，缓取辽东", "结束本卷。", null, "努尔哈赤稳守胜果，未尽追击。", "sarhu-jin-overreach")
    ]
  }
};

const sarhuEndings = {
  "sarhu-history": {
    tone: "史实线",
    title: "萨尔浒大败，辽东易势",
    result:
      "明军四路进兵，未能真正合为一体。杜松、马林、刘綎等路相继失利，努尔哈赤集中兵力逐路击破。此战后，辽东攻守之势明显改变。",
    historical:
      "《明史·杨镐传》记四路出师与败后问责，《明史·朝鲜传》亦记朝鲜助战兵将或降或战死，显示此战牵动范围甚广。",
    court:
      "明军并非没有作战计划。问题在于四路行程、传报与接应无法按计划同步；杜松先败后，其他各路仍不能及时得知完整军情。"
  },
  "sarhu-coordinated": {
    tone: "改写线",
    title: "合兵未胜，败局得缓",
    result:
      "明军放弃急于四路齐压，转而保持互援距离。战果不华丽，却避免了最惨烈的逐路崩盘。",
    historical:
      "这是基于史实问题的反推：萨尔浒的核心教训之一，是分进需要可靠通信与互援，否则声势越大，断裂越多。",
    court:
      "此线让明军缩短各路之间的距离，代价是推进更慢，也可能失去合围效果。它不能保证取胜，但可减少被逐路击破的风险。"
  },
  "sarhu-delayed-retreat": {
    tone: "止损线",
    title: "迟进保军，辽东仍危",
    result:
      "部分将领放慢或撤回，保住了兵力，却无法改变明军整体失势。朝廷在问责与防线重整之间摇摆。",
    historical:
      "李如柏、刘綎等路线都显示出“进退难判”的困境：迟可能被劾，进可能被歼。",
    court:
      "停止深入可以保存兵力，仍可能构成违期或擅退。战后应同时核对中军命令送达时间、友军位置与前线所见敌情。"
  },
  "sarhu-du-song-fall": {
    tone: "急进线",
    title: "杜松先折，前锋成孤",
    result:
      "杜松急进，前锋脱离互援，被后金集中兵力击破。勇名留下了，战局也因此先断一环。",
    historical:
      "杜松战死是萨尔浒败局中极关键的一环，前锋急进使明军分路弱点迅速暴露。",
    court:
      "杜松作战勇猛，但前锋越过接应位置后，马林等路无法及时靠拢。后金集中主力进攻时，这支前锋已无近援。"
  },
  "sarhu-liu-ting-ambush": {
    tone: "远路线",
    title: "刘綎孤入，老将不归",
    result:
      "刘綎远路深入，消息迟滞，终被后金抓住孤势。老将战死，朝鲜助战兵也卷入惨败。",
    historical:
      "《明史·刘綎传》与《明史·朝鲜传》共同提示了刘綎战死与朝鲜助战线索。",
    court:
      "刘綎一路距离最远，且有朝鲜援兵同行。信息迟滞、可疑军令与各部协同困难，共同构成了这一路的危险。"
  },
  "sarhu-jin-decisive": {
    tone: "后金胜线",
    title: "集中击散，后金转强",
    result:
      "努尔哈赤没有平均防守四路，而是合兵先击最孤、最快的一路，再以胜势震动其余明军。后金由此取得决定性声望。",
    historical:
      "后金侧叙事强调努尔哈赤的决断与集中兵力。无论从明、清材料看，明军分路与后金集中之间的反差都是核心。",
    court:
      "后金没有同时迎战四路，而是在局部保持兵力优势。杜松一路覆没后，败讯又影响马林等部，明军原定的合围由此失去条件。"
  },
  "sarhu-jin-overreach": {
    tone: "克制线",
    title: "胜而能收，未尽其锋",
    result:
      "后金一度想扩大战果，但及时收束兵力。战果可能不如史实猛烈，却避免了胜后分散的风险。",
    historical:
      "此线用来反衬萨尔浒胜因：集中优势可以破敌，胜后若贪追，也可能重复对方的分散错误。",
    court:
      "这条路线假设后金在追击中过早分兵。及时收兵仍能保住已有战果，但无法取得史实中那样彻底的逐路击破。"
  }
};

const tongguanBackgrounds = {
  opening: "./assets/tang/backgrounds/tongguan-map.png",
  command: "./assets/tang/backgrounds/tongguan-rampart.png",
  court: "./assets/tang/backgrounds/tang-court.png",
  defile: "./assets/tang/backgrounds/lingbao-defile.png",
  yanCamp: "./assets/tang/backgrounds/yan-camp.png",
  changan: "./assets/tang/backgrounds/changan-gate.png"
};

const tongguanArtifacts = {
  edict: {
    src: "./assets/artifacts/tongguan-edict.png",
    label: "出关诏令",
    note: "诏书、鱼符与朱印"
  },
  northernPlan: {
    src: "./assets/artifacts/tongguan-northern-plan.png",
    label: "河北方略",
    note: "绕河趋范阳的进军图"
  }
};

const tongguanCharacters = {
  geshuhan: {
    name: "哥舒翰",
    courtesy: "名将守关",
    faction: "唐军元帅",
    avatar: "./assets/tang/characters/geshu-han.png",
    expressions: { refuse: "./assets/expressions/geshuhan-refuse.png" },
    playable: true,
    stats: { patience: 86, force: 82, intellect: 84, obedience: 66 },
    traits: ["久经边战", "据险慎战", "病中领军"],
    brief:
      "你奉命接掌潼关。关外叛军急于求战，关内朝廷又不断催促；你必须决定还能把“固守”二字坚持多久。"
  },
  xuanzong: {
    name: "唐玄宗",
    courtesy: "李隆基",
    faction: "大唐皇帝",
    avatar: "./assets/tang/characters/tang-xuanzong.png",
    expressions: { edict: "./assets/expressions/xuanzong-edict.png" },
    playable: true,
    stats: { patience: 54, force: 30, intellect: 76, obedience: 42 },
    traits: ["晚年多疑", "急复两京", "倚重近臣"],
    brief:
      "洛阳已经失守，潼关前线却数月不进。你收到互相冲突的军报，必须判断哥舒翰是在等待战机，还是已经不肯奉诏。"
  },
  yangguozhong: {
    name: "杨国忠",
    courtesy: "本名钊",
    faction: "大唐宰相",
    avatar: "./assets/tang/characters/yang-guozhong.png",
    playable: true,
    stats: { patience: 38, force: 22, intellect: 72, obedience: 58 },
    traits: ["擅权自保", "惧军权外移", "急于定局"],
    brief:
      "安禄山以诛你为起兵名义，潼关重兵又尽在哥舒翰手中。你要防叛军，也要防前线兵权转回长安。"
  },
  cuiqianyou: {
    name: "崔乾祐",
    courtesy: "燕军骁将",
    faction: "燕军将领",
    avatar: "./assets/tang/characters/cui-qianyou.png",
    playable: true,
    stats: { patience: 80, force: 84, intellect: 88, obedience: 78 },
    traits: ["善设伏兵", "示弱诱敌", "熟悉险道"],
    brief:
      "你奉安禄山之命守陕郡。唐军据潼关不出，你需要让长安相信眼前只有一支可以轻取的弱军。"
  },
  wangsili: {
    name: "王思礼",
    courtesy: "哥舒部将",
    faction: "唐军前将",
    avatar: "./assets/tang/characters/wang-sili.png",
    playable: false,
    stats: { patience: 58, force: 86, intellect: 78, obedience: 74 },
    traits: ["敢于直谏", "熟悉前军", "厌恶国忠"],
    brief: "哥舒翰部将。他主张继续固守，也曾建议上表揭发杨国忠，以免前线受朝中猜疑牵制。"
  },
  guoziyi: {
    name: "郭子仪",
    courtesy: "子仪",
    faction: "朔方将领",
    avatar: "./assets/tang/characters/guo-ziyi.png",
    playable: false,
    stats: { patience: 84, force: 88, intellect: 90, obedience: 90 },
    traits: ["河北转战", "主张捣巢", "持重守正"],
    brief: "他与李光弼在河北取胜，并上奏请求直取范阳，认为潼关大军只须坚守，不应轻易出战。"
  },
  anlushan: {
    name: "安禄山",
    courtesy: "燕帝",
    faction: "燕军主帅",
    avatar: "./assets/tang/characters/an-lushan.png",
    playable: false,
    stats: { patience: 44, force: 82, intellect: 78, obedience: 20 },
    traits: ["起兵范阳", "善用胡骑", "急破潼关"],
    brief: "潼关久攻不下、河北归路又受威胁时，他一度考虑放弃洛阳退回范阳。"
  },
  gaoxianzhi: {
    name: "高仙芝",
    courtesy: "安西名将",
    faction: "唐军前元帅",
    avatar: "./assets/tang/characters/gao-xianzhi.png",
    playable: false,
    stats: { patience: 72, force: 90, intellect: 84, obedience: 80 },
    traits: ["安西宿将", "退保潼关", "含冤被诛"],
    brief: "安禄山起兵后，他与封常清退守潼关并修整关防，却因监军诬奏被处死。哥舒翰接手的是他们留下的关城。"
  }
};

const tongguanOpeningCopy = [
  "天宝十四载冬，安禄山自范阳起兵。封常清在洛阳仓促募兵，高仙芝率军东援，两人战败后退守潼关，把叛军挡在关外。随后，一道诏书在关前处死了这两名边将。",
  "年老多病的哥舒翰被召来接掌潼关。朝廷号称给了他二十万兵马，其中许多是新募之卒。哥舒翰没有出关决战，而是依山河之险坚守；安禄山在洛阳数月不能西进。",
  "与此同时，郭子仪、李光弼在河北连战得胜，请求直取范阳，迫使安禄山回救。可长安收到另一封军报：燕将崔乾祐在陕郡只有数千羸兵，似乎一战便可收复陕、洛。",
  "哥舒翰认定那是诱兵之计。杨国忠却担心潼关重兵久握在一名不肯奉诏的将领手中。玄宗接连遣使催战。史书写下的结局，是唐军出关后在灵宝西原遭伏击，潼关失守，长安随即陷入撤离。"
];

const tongguanSources = [
  {
    title: "《资治通鉴·卷二百一十八》",
    url: "https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7218",
    note: "哥舒翰主张固守、郭子仪与李光弼上奏、杨国忠疑惧、玄宗连遣中使催战及灵宝败局的主要依据。"
  },
  {
    title: "《旧唐书·卷一百零四》",
    url: "https://zh.wikisource.org/zh-hans/%E8%88%8A%E5%94%90%E6%9B%B8/%E5%8D%B7104",
    note: "高仙芝、封常清退保潼关及被诛，哥舒翰生平与潼关战败等人物材料。"
  },
  {
    title: "《旧唐书·卷一百零六·杨国忠传》",
    url: "https://zh.wikisource.org/zh-hans/%E8%88%8A%E5%94%90%E6%9B%B8/%E5%8D%B7106",
    note: "杨国忠的政治处境、用事风格以及安史之乱中的责任线索。"
  },
  {
    title: "《旧唐书·卷十·肃宗本纪》",
    url: "https://zh.wikisource.org/wiki/%E8%88%8A%E5%94%90%E6%9B%B8/%E5%8D%B710",
    note: "潼关失守、玄宗幸蜀及长安局势变化的本纪记录。"
  }
];

const tongguanRouteStarts = {
  geshuhan: "geshu-wall",
  xuanzong: "xuanzong-court",
  yangguozhong: "yang-fear",
  cuiqianyou: "cui-camp"
};

const tongguanScenes = {
  "geshu-wall": {
    bg: "command",
    title: "关门以内",
    chapter: "哥舒翰视角 · 一",
    focus: "wangsili",
    entries: [
      n("潼关城上每天都能看见燕军斥候。对方不攻，只在远处换旗、扬尘。关内的唐军也没有闲着，修垒、操练、清点新到的粮车。", { artifact: "northernPlan" }),
      s("wangsili", "大帅，崔乾祐今日又退了十里。斥候说陕郡营中炊烟不多。"),
      s("geshuhan", "他若真只有几千人，早该退回洛阳，不会天天等我们去看。"),
      s("wangsili", "长安来的使者却只问一件事：何日出关。"),
      s("geshuhan", "关在我军手中，叛军便进不了长安。郭子仪、李光弼正在河北断他的后路，我们没有替安禄山解围的道理。"),
      s("wangsili", "末将怕的不是关外，是朝中把不出战当成抗命。"),
      s("geshuhan", "那就把军情写得再明白些。关可以守，话也要有人送到陛下面前。", { expression: "refuse" })
    ],
    choices: [
      c("上表请求继续固守", "列明关外地形与河北战况，请朝廷暂缓催战。", "geshu-letter", "哥舒翰再次上表，主张据潼关等待河北战局。"),
      c("请郭子仪联名陈奏", "让河北前线说明直取范阳的机会，军报往返需要时间。", "geshu-north", "哥舒翰请求郭子仪、李光弼共同陈明固守之利。"),
      c("秘密清查灞上新军", "先查杨国忠另募兵马的用途，可能加重朝中猜疑。", "geshu-suspicion", "哥舒翰派人查探灞上新军。")
    ]
  },
  "geshu-letter": {
    bg: "command",
    title: "一封守关表",
    chapter: "哥舒翰视角 · 二",
    focus: "wangsili",
    entries: [
      s("geshuhan", "写：崔乾祐示弱在前，山河狭道在后。出关之后，大军无处展开。"),
      s("wangsili", "还要写新募之兵未经大战。军数虽多，真正能在险道列阵的没有那么多。"),
      s("geshuhan", "写上。再附郭、李二将河北捷报，说明叛军归路将断。"),
      s("wangsili", "大帅，若朝廷仍以逗留问罪呢？"),
      s("geshuhan", "守关之责在我。问罪时我去长安受，不能先拿二十万人的命证明自己忠心。"),
      s("wangsili", "这句话不宜写进奏表。"),
      s("geshuhan", "我知道。奏表只写地形、兵数、粮期，不写怨气。")
    ],
    choices: [
      c("奏表只陈军事", "避免与杨国忠正面冲突，朝廷也可能继续怀疑你在拖延。", "geshu-edict", "哥舒翰只陈守关利害，不谈朝中猜疑。"),
      c("请求当面入朝陈奏", "把判断直接交给玄宗，但离关期间军心可能不稳。", "geshu-edict", "哥舒翰请求入朝面陈守关之策。"),
      c("附上辞帅请罪之表", "以交出兵权证明无异心，潼关将临阵换帅。", "geshu-withdraw", "哥舒翰请辞兵权，以免朝廷疑惧。")
    ]
  },
  "geshu-north": {
    bg: "command",
    title: "河北来书",
    chapter: "哥舒翰视角 · 二",
    focus: "guoziyi",
    entries: [
      n("三日后，河北军书送到潼关。郭子仪、李光弼已破史思明，常山一带重新响应唐军。", { artifact: "northernPlan" }),
      s("guoziyi", "奏疏：请潼关坚壁勿出。臣等愿引兵北取范阳，使安禄山首尾不能相救。"),
      s("wangsili", "这封奏疏若送到长安，陛下总该明白关外这一仗不必急。"),
      s("geshuhan", "军报到了御前，还要看谁先解释。杨国忠会说河北是远功，陕、洛是眼前。"),
      s("wangsili", "那便遣可靠的人随表入京，等陛下亲问。"),
      s("geshuhan", "可以。告诉来使，不得在驿站议论宰相，也不要把军中怨言带进长安。"),
      s("wangsili", "大帅仍想给朝中留余地。"),
      s("geshuhan", "我只想让关门多关几日。")
    ],
    choices: [
      c("急送河北奏疏入京", "把固守与北线攻势一起呈报，等待玄宗裁断。", "geshu-edict", "哥舒翰急送郭子仪等人的固守奏疏。"),
      c("派兵向河东接应郭子仪", "加强北线联系，但会抽走部分守关兵力。", "geshu-edict", "哥舒翰抽调兵马接应河北唐军。"),
      c("不再请示，闭关坚守", "拒绝继续讨论出关日期，可能被朝廷认作逗留抗命。", "geshu-suspicion", "哥舒翰决定闭关不出，等待河北战果。")
    ]
  },
  "geshu-suspicion": {
    bg: "command",
    title: "灞上的兵",
    chapter: "哥舒翰视角 · 二",
    focus: "wangsili",
    entries: [
      n("探马回报，杨国忠在灞上另募新军，由亲信杜乾运统领。名义上是京师后备，营门却日夜盯着潼关方向。"),
      s("wangsili", "大帅，宰相防的不是燕军。他怕我们回旗向西。"),
      s("geshuhan", "安禄山以诛国忠为名，他怕也是常情。可在守关军后另置一营，军令便有两处。"),
      s("wangsili", "末将请大帅上表列国忠之罪。只要陛下罢了他，军中猜疑自解。"),
      s("geshuhan", "叛军也说要诛杨国忠。我今日率军回长安，天下会说谁在反？"),
      s("wangsili", "那便请灞上军归潼关节制，至少不让他在背后牵制。"),
      s("geshuhan", "此请一上，国忠只会更怕。可两军不能这样隔着猜。")
    ],
    choices: [
      c("请灞上军归潼关节制", "统一关中兵权，也会触及杨国忠最担心的事。", "geshu-edict", "哥舒翰上表请求统领灞上军。"),
      c("上表弹劾杨国忠", "把朝中猜疑公开化，潼关可能先发生内争。", "geshu-accuse", "哥舒翰决定上表弹劾杨国忠。"),
      c("不理灞上军，继续守关", "避免立即冲突，但杨国忠仍会推动朝廷换帅或催战。", "geshu-edict", "哥舒翰暂不处理灞上新军。")
    ]
  },
  "geshu-accuse": {
    bg: "court",
    title: "先问谁的罪",
    chapter: "哥舒翰视角 · 三",
    focus: "xuanzong",
    entries: [
      s("xuanzong", "哥舒翰上表，不谈关外之敌，先论宰相。潼关军中到底出了什么事？"),
      s("geshuhan", "臣不敢以兵入争。臣只请陛下撤灞上疑军，使潼关号令出于一处。"),
      s("yangguozhong", "陛下，哥舒翰拥众不出，又要尽收京畿兵权。臣若不设后备，长安交给谁守？"),
      s("geshuhan", "臣守的是潼关。关不失，长安不必另防潼关军。"),
      s("xuanzong", "你二人各说为国，朕却看见前后两军互不相安。"),
      s("geshuhan", "请陛下另择元帅。臣病重，愿交兵权后在阙下待罪。"),
      s("yangguozhong", "临敌换帅，正中安禄山之计。臣请陛下命哥舒翰出关立功，以明其心。")
    ],
    choices: [
      c("坚持辞帅，不带兵回京", "交出兵权以免内战，潼关必须在战前更换统帅。", "geshu-withdraw", "哥舒翰坚持辞帅，拒绝以出战自证。"),
      c("收回弹劾，返回潼关", "暂时压下内争，仍要面对即将到关的催战诏令。", "geshu-edict", "哥舒翰收回弹劾，继续守关。"),
      c("请求拘押杨国忠后再领兵", "逼玄宗在宰相与元帅之间选择，朝局立即决裂。", "geshu-final-fracture", "哥舒翰请求先罢杨国忠再谈军令。")
    ]
  },
  "geshu-edict": {
    bg: "command",
    title: "中使相望",
    chapter: "哥舒翰视角 · 三",
    focus: "xuanzong",
    entries: [
      n("第一名中使带来出关诏书后，第二名已经在路上。第三名抵关时，前两人的马还没有喂完。", { artifact: "edict" }),
      s("xuanzong", "诏曰：崔乾祐兵少无备，命哥舒翰进兵收复陕、洛，不得迁延。", { expression: "edict" }),
      s("geshuhan", "回奏陛下：敌兵示弱，必有伏备。关外南山北河，大军无法展开，请容臣坚守。", { expression: "refuse" }),
      s("wangsili", "大帅，第四道诏书到了。使者说，若再不出关，便以逗留失机论罪。"),
      s("geshuhan", "地图拿来。既然一定要出，至少先定退路和粮队，不许诸军一齐挤进狭道。"),
      s("wangsili", "大帅真要奉诏？"),
      s("geshuhan", "我可以抗一封军令，抗不了天下人都以为关外无兵。再不动，军中也会先疑。")
    ],
    choices: [
      c("伏阙抗诏，继续闭关", "承担抗旨罪名，潼关仍由你掌握。", "geshu-final-hold", "哥舒翰拒绝出关，愿以抗诏受罪。"),
      c("分兵试探，不令主力出关", "只派精骑侦察敌阵，可能再次违背朝廷要求。", "geshu-battle", "哥舒翰先派小部试探灵宝敌军。"),
      c("奉诏全军出关", "按史实方向进军灵宝，主力将进入狭长西原。", "geshu-battle", "哥舒翰在连番催促下率主力出关。")
    ]
  },
  "geshu-battle": {
    bg: "defile",
    title: "灵宝西原",
    chapter: "哥舒翰视角 · 四",
    focus: "cuiqianyou",
    entries: [
      n("唐军出关后沿黄河西原前进。南面是山，北面是河，十余万人的队伍被拉成很长一线。燕军在前方散乱列阵，看上去不足万人。"),
      s("wangsili", "敌阵疏密不一，后队看不清。请停军到高处再探。"),
      s("geshuhan", "前锋已经接敌。此时全军停下，后队仍会向前挤。传令各部拉开间距。"),
      s("cuiqianyou", "唐军已入隘道。前队退，伏兵等旗。没有号令，不许先放箭。"),
      s("wangsili", "东风起来了。敌军把草车推到毡车前面，恐怕要放火。"),
      s("geshuhan", "前队弃车，步兵靠山列阵。后军不得再进！"),
      n("烟火很快遮住道路。后队听不清号令，只看见前方人马回奔。山上的木石也在此时落下。")
    ],
    choices: [
      c("集中精兵抢占南山", "放弃继续推进，先争取高处压住燕军伏兵。", "geshu-final-retreat", "哥舒翰转兵争夺南山，组织撤退。"),
      c("令后军退回潼关", "前军留下断后，尽量避免整支大军堵死在狭道。", "geshu-final-retreat", "哥舒翰急令后军退回潼关。"),
      c("继续催前军冲阵", "在烟火与狭道中维持进攻，败势将迅速扩大。", "geshu-final-history", "哥舒翰继续督军向前，唐军大败。")
    ]
  },
  "geshu-withdraw": {
    bg: "court",
    title: "交出兵符",
    chapter: "哥舒翰视角 · 四",
    focus: "xuanzong",
    entries: [
      n("哥舒翰将兵符交还中使，没有率兵回长安。潼关军暂由王思礼等将分守，朝廷必须另定元帅。"),
      s("xuanzong", "临敌辞帅，朝中必有人说你畏战。"),
      s("geshuhan", "臣受得畏战之名。只请新帅到关以前，不要令诸军出险。"),
      s("yangguozhong", "潼关若仍坚守，陕、洛何日可复？"),
      s("geshuhan", "待河北军逼近范阳，安禄山自会回顾。到时出关，比今日容易。"),
      s("xuanzong", "朕准你解兵权，留京待问。潼关暂守，另议主帅。")
    ],
    choices: [
      c("以辞帅止住出关令", "结束本卷。", null, "哥舒翰交出兵权，朝廷暂未强令潼关军出战。", "tongguan-command-change")
    ]
  },
  "geshu-final-hold": {
    bg: "changan",
    title: "关门仍闭",
    chapter: "哥舒翰视角 · 四",
    focus: "guoziyi",
    entries: [
      n("哥舒翰拒绝最后一道出关诏令，潼关军没有进入灵宝狭道。长安随即派人查问抗旨之罪，但关门仍在唐军手中。"),
      s("guoziyi", "河北诸军已再逼史思明。请潼关再守数旬，臣等当尽力北取范阳。"),
      s("geshuhan", "回报郭将军：关还在。请他只按河北军情进兵，不必替我求情。"),
      s("wangsili", "朝廷若遣人夺帅呢？"),
      s("geshuhan", "把兵符备好。谁来接，我便交。只要接令的人肯先看一眼关外地形。")
    ],
    choices: [
      c("守关待罪", "结束本卷。", null, "哥舒翰抗诏固守，为河北攻势争取时间。", "tongguan-held")
    ]
  },
  "geshu-final-retreat": {
    bg: "changan",
    title: "败军入关",
    chapter: "哥舒翰视角 · 五",
    focus: "wangsili",
    entries: [
      n("前军伤亡惨重，但后队收到退令较早，没有全部挤入灵宝狭道。王思礼收拢残部，赶在燕军之前退回潼关。"),
      s("wangsili", "关门已闭，回来的兵不足出关时一半。"),
      s("geshuhan", "先点粮械，不要先点罪。燕军若追到，今日还要守一次。"),
      s("wangsili", "长安会问为何败，亦会问为何擅退。"),
      s("geshuhan", "如实报：臣奉诏出关，见伏后撤。出关之责与退兵之责，都由臣领。"),
      s("wangsili", "只要关还在，朝廷还有时间问。")
    ],
    choices: [
      c("闭关整顿残军", "结束本卷。", null, "哥舒翰在灵宝受挫后及时撤回，潼关暂未失守。", "tongguan-bloody-retreat")
    ]
  },
  "geshu-final-history": {
    bg: "changan",
    title: "关门失守",
    chapter: "哥舒翰视角 · 五",
    focus: "xuanzong",
    entries: [
      n("唐军在灵宝西原崩溃。士卒争渡黄河，死伤不可计。哥舒翰被部将挟持出降，潼关随即落入燕军手中。"),
      s("xuanzong", "潼关败报到了。长安已无险可守。"),
      s("yangguozhong", "请陛下即刻幸蜀，六军今夜出城。再迟，燕骑便到。"),
      s("xuanzong", "朕连遣使者催他出关。如今要走，也须先告诉太子与百官。"),
      s("yangguozhong", "消息一泄，城门便乱。只能先动。"),
      n("次日清晨，皇帝车驾离开长安。许多百官直到宫门关闭后，才知道朝廷已经西去。")
    ],
    choices: [
      c("随史实撤离长安", "结束本卷。", null, "灵宝大败，潼关失守，玄宗仓促西幸。", "tongguan-history")
    ]
  },
  "geshu-final-fracture": {
    bg: "court",
    title: "未战先裂",
    chapter: "哥舒翰视角 · 四",
    focus: "yangguozhong",
    entries: [
      n("哥舒翰坚持先罢杨国忠。奏议泄出后，潼关与灞上两军都开始戒备，朝廷再也无法把争端压在军报里。"),
      s("xuanzong", "叛军尚在陕郡，朕的元帅与宰相却先要分罪。"),
      s("yangguozhong", "臣请收哥舒翰兵权，否则京师不能安。"),
      s("geshuhan", "臣愿交兵权。请陛下先命两军不得相攻，潼关仍须有人守。"),
      s("xuanzong", "二人都停职待问。以王思礼暂摄关防，灞上军不得东进。")
    ],
    choices: [
      c("交权待罪", "结束本卷。", null, "朝廷在战前更换宰相与元帅，潼关暂守却陷入政局震荡。", "tongguan-fracture")
    ]
  },
  "xuanzong-court": {
    bg: "court",
    title: "两份军报",
    chapter: "唐玄宗视角 · 一",
    focus: "yangguozhong",
    entries: [
      n("长安送来的晨报里，一封说郭子仪、李光弼在河北大胜；另一封说崔乾祐在陕郡兵不满四千，营伍松散。两封都请皇帝立即决断。", { artifact: "northernPlan" }),
      s("xuanzong", "河北既胜，安禄山归路将断。若陕郡守军又少，正可东西夹击。"),
      s("yangguozhong", "陛下圣断。哥舒翰拥大军数月，今日再不进，叛军便有时间补守陕郡。"),
      s("xuanzong", "哥舒翰的奏表却说羸兵是诱饵。"),
      s("yangguozhong", "将领临阵总会多报敌情，免得战败受责。可斥候不止一人，都说燕军无备。"),
      s("guoziyi", "奏疏：请潼关勿出。臣等愿乘河北新胜，直捣范阳，迫贼自退。"),
      s("xuanzong", "一个要朕等，一个要朕进。先查清楚，这几封军报各自走了几日。")
    ],
    choices: [
      c("召集兵部复核军报", "核对斥候来源、送达日期与敌军调动，出关命令暂缓。", "xuanzong-intel", "玄宗命兵部复核陕郡与河北军报。"),
      c("先问哥舒翰为何不进", "让潼关主帅当面解释敌情，杨国忠会继续催促。", "xuanzong-ministers", "玄宗再次诘问哥舒翰逗留缘由。"),
      c("采信陕郡兵弱之报", "准备下诏出关，先夺回陕州与洛阳。", "xuanzong-decision", "玄宗倾向采信崔乾祐兵弱的军报。")
    ]
  },
  "xuanzong-intel": {
    bg: "court",
    title: "军报从哪里来",
    chapter: "唐玄宗视角 · 二",
    focus: "guoziyi",
    entries: [
      s("xuanzong", "兵部查得如何？"),
      s("yangguozhong", "陕郡消息来自三批斥候，所见燕军确实不多。河北捷报较晚，郭、李二军距离范阳尚远。"),
      s("guoziyi", "奏疏：史思明新败，河北十余郡响应。此时若潼关出兵失败，臣等亦失归路。"),
      s("xuanzong", "郭子仪远在河北，却知道潼关不可出；哥舒翰就在关上，也这样说。两边口径相同。"),
      s("yangguozhong", "也可能是诸将彼此照应，都不肯担先战之责。"),
      s("xuanzong", "那封‘兵不满四千’的军报，是谁最先送来的？"),
      s("yangguozhong", "陕郡乡民转告官军斥候。身份还在查。")
    ],
    choices: [
      c("暂停催战，继续查验", "潼关维持固守，允许河北军再推进一段。", "xuanzong-delay", "玄宗因情报来源不明，暂缓出关诏令。"),
      c("遣御史亲赴潼关", "让朝廷官员查看敌阵与关防，决断会延后数日。", "xuanzong-ministers", "玄宗派御史赴潼关核验军情。"),
      c("认为诸将相互推诿", "采纳杨国忠判断，下令哥舒翰立即进兵。", "xuanzong-decision", "玄宗认定前线有意夸大敌情。")
    ]
  },
  "xuanzong-ministers": {
    bg: "court",
    title: "宰相与元帅",
    chapter: "唐玄宗视角 · 二",
    focus: "yangguozhong",
    entries: [
      s("xuanzong", "哥舒翰说关外有伏，杨卿说他拥兵逗留。你们之间究竟有何嫌隙？"),
      s("yangguozhong", "臣只忧京师。潼关大军尽归一帅，灞上若无后备，万一关军有变，陛下身边无兵可用。"),
      s("geshuhan", "臣病中受命，只知守关。若陛下疑臣，请即遣人代领，不必逼臣以败仗自证。"),
      s("xuanzong", "朕没有说你要反。朕问的是何时能复陕、洛。"),
      s("geshuhan", "待郭、李逼近范阳，或待崔乾祐真阵显露。今日出关，臣不能报胜期。"),
      s("yangguozhong", "若人人都等万全，洛阳永无收复之日。"),
      s("xuanzong", "朕要的是可执行的日期，不是你们互相猜心。")
    ],
    choices: [
      c("命哥舒翰继续守关一月", "给河北战场时间，也规定一个重新议战的期限。", "xuanzong-delay", "玄宗准潼关再守一月，等待河北战果。"),
      c("撤杨国忠的灞上新军", "解除前后两军猜疑，宰相将失去京师后备。", "xuanzong-delay", "玄宗撤销灞上疑军，要求潼关专心守敌。"),
      c("下最后一道出关诏", "要求哥舒翰立即复陕、洛，不许再以敌情推迟。", "xuanzong-decision", "玄宗决定以严诏催哥舒翰出关。")
    ]
  },
  "xuanzong-decision": {
    bg: "court",
    title: "诏书出长安",
    chapter: "唐玄宗视角 · 三",
    focus: "yangguozhong",
    entries: [
      n("诏书写好后，玄宗又看了一遍哥舒翰的奏表。中使已经在殿外候马，杨国忠请求当天连发数骑，免得前线继续拖延。", { artifact: "edict" }),
      s("xuanzong", "诏中写‘不得迁延’，是否太重？", { expression: "edict" }),
      s("yangguozhong", "前诏已经说过进兵，他仍不动。若不用重语，潼关只会再来一封守关表。"),
      s("xuanzong", "高仙芝、封常清退守潼关时，朕听信边令诚而诛之。如今哥舒翰也说敌不可轻。"),
      s("yangguozhong", "二将是败后退关，哥舒翰却坐拥大军。情形不同。"),
      s("xuanzong", "把郭子仪的奏疏也附给哥舒翰，让他知道河北局势。"),
      s("yangguozhong", "若仍让他自断进退，这道诏书便等于没有。请陛下只发军令。")
    ],
    choices: [
      c("发严诏，限期出关", "连续遣使催战，军令不再给哥舒翰自行判断的余地。", "geshu-final-history", "玄宗严令哥舒翰出关，战局走向灵宝大败。"),
      c("在诏书中保留临机停军权", "允许哥舒翰见敌阵有异便撤回，可能减少败损。", "geshu-final-retreat", "玄宗准哥舒翰在敌情有变时停军撤回。"),
      c("追回诏书，改为固守", "承认陕郡军报不足采信，等待河北军继续推进。", "xuanzong-final-hold", "玄宗在诏书发出前改令潼关固守。")
    ]
  },
  "xuanzong-delay": {
    bg: "court",
    title: "再等一个月",
    chapter: "唐玄宗视角 · 三",
    focus: "guoziyi",
    entries: [
      n("朝廷暂缓出关。一个月里，潼关没有大战，河北军继续攻取州县；安禄山也增兵陕郡，原先所谓数千羸兵不再有人提起。"),
      s("guoziyi", "奏疏：请陛下仍令潼关固守。臣等将再进博陵，逼近范阳。"),
      s("yangguozhong", "陛下，崔乾祐已经增兵。再拖下去，收复陕、洛只会更难。"),
      s("xuanzong", "至少如今知道所谓无备并不可信。若当日出兵，正撞上他的伏兵。"),
      s("yangguozhong", "哥舒翰因此声望更重，军中只知元帅之令。"),
      s("xuanzong", "守住关是他的功。功高是否难制，是战后再议的事。")
    ],
    choices: [
      c("继续支持河北攻势", "结束本卷。", null, "玄宗维持潼关固守，把主攻方向转向范阳。", "tongguan-northern-plan"),
      c("一个月后重新议战", "结束本卷。", null, "朝廷避免立即大败，但潼关与长安的猜疑并未消失。", "tongguan-delay")
    ]
  },
  "xuanzong-final-hold": {
    bg: "changan",
    title: "诏书追回",
    chapter: "唐玄宗视角 · 四",
    focus: "yangguozhong",
    entries: [
      n("追骑在华州赶上中使，出关诏书被带回长安。潼关继续固守，宫中却很快传出皇帝朝令夕改的议论。"),
      s("yangguozhong", "陛下既已改令，臣请再遣一使说明缘由，免得关军以为朝廷无断。"),
      s("xuanzong", "就说军报未实，令元帅照旧守关。判断错了便改，不必替朕遮。"),
      s("yangguozhong", "那陕、洛百姓仍要等。"),
      s("xuanzong", "朕记得。但不能为了让一封诏书显得英明，再发十万兵去证明。")
    ],
    choices: [
      c("改令固守", "结束本卷。", null, "玄宗追回催战诏书，潼关避免史实中的仓促出击。", "tongguan-held")
    ]
  },

  "yang-fear": {
    bg: "court",
    title: "谁守长安",
    chapter: "杨国忠视角 · 一",
    focus: "xuanzong",
    entries: [
      n("安禄山起兵时声称要清君侧，所指的人就是杨国忠。如今朝廷最强的一支兵马又握在哥舒翰手里，驻在距长安不远的潼关。", { artifact: "northernPlan" }),
      s("yangguozhong", "陛下，潼关虽有大军，京师却没有成建制的后备。一旦关上有变，六军来不及集结。"),
      s("xuanzong", "哥舒翰是朕亲自任命的元帅。你所谓有变，是叛军破关，还是关军西来？"),
      s("yangguozhong", "臣不敢疑大帅。只是安禄山正以诛臣为名，若军中有人借此煽动，不可不防。"),
      s("xuanzong", "你要多少兵？"),
      s("yangguozhong", "先取苑中子弟三千操练，再募万人屯灞上。名为接应潼关，也可守京师东面。"),
      s("xuanzong", "不要让哥舒翰以为朝廷在他背后另设一关。")
    ],
    choices: [
      c("坚持设立灞上军", "建立京师后备，也会使哥舒翰认为自己受到监视。", "yang-bashang", "杨国忠募军屯灞上，防备潼关方向。"),
      c("只整顿禁军，不另设营", "减少前后猜疑，长安可立即调用的兵力较少。", "yang-court", "杨国忠放弃灞上独立军，只整顿禁军。"),
      c("请求撤换哥舒翰", "提前更换元帅，必须找到能接掌二十万新军的人。", "yang-court", "杨国忠试图在战前撤换哥舒翰。")
    ]
  },
  "yang-bashang": {
    bg: "changan",
    title: "灞上另营",
    chapter: "杨国忠视角 · 二",
    focus: "geshuhan",
    entries: [
      n("灞上新军成营不久，哥舒翰便上表请求这支军队归潼关节制。紧接着，杜乾运被召入关中问罪，杨国忠意识到自己的后备已经失去作用。"),
      s("yangguozhong", "哥舒翰先要我的兵，后杀我的将。他还说只想守关？"),
      s("xuanzong", "杜乾运是否违军法，兵部尚未核实。你不要先把此事说成谋反。"),
      s("yangguozhong", "臣若等到关军西指再说，便没有开口的机会了。"),
      s("geshuhan", "奏表：潼关之后另置疑军，士卒不知该听关令还是灞上令。请归一节制。"),
      s("yangguozhong", "陛下，他要的从来不只是守关。他要朝廷承认，关中兵马都须听他。"),
      s("xuanzong", "那你拿出他将反的证据。没有证据，便只议如何对敌。")
    ],
    choices: [
      c("以逗留失机催促出战", "不直接指控谋反，改以军期逼哥舒翰离开关城。", "yang-urge", "杨国忠以逗留失机为由催促潼关出战。"),
      c("上奏收回哥舒翰兵权", "公开处理兵权争议，朝廷可能临阵失去主帅。", "yang-court", "杨国忠正式请求撤换哥舒翰。"),
      c("撤掉灞上军并向哥舒翰释疑", "交出京师后备，换取潼关主帅继续固守。", "yang-final-delay", "杨国忠撤销灞上新军，暂解前后猜疑。")
    ]
  },
  "yang-court": {
    bg: "court",
    title: "换帅容易吗",
    chapter: "杨国忠视角 · 二",
    focus: "xuanzong",
    entries: [
      s("xuanzong", "你要撤哥舒翰，谁去接潼关？"),
      s("yangguozhong", "可命王思礼暂领，再从朔方召将。"),
      s("xuanzong", "王思礼是哥舒翰部将。换一个名字，兵仍是原来的兵。郭子仪又正在河北，不能骤离。"),
      s("yangguozhong", "那便令哥舒翰进兵。离了关城，他若忠，自会破敌；若有异，也不能再据险。"),
      s("xuanzong", "你这是拿一场仗试他的心。"),
      s("yangguozhong", "陛下，臣也在拿一家性命担这个判断。安禄山一日不平，臣便一日是他起兵的借口。"),
      s("xuanzong", "国事不能只按谁更害怕来定。把陕郡军报拿来，朕再看。")
    ],
    choices: [
      c("集中证明崔乾祐兵弱", "搜集所有支持出战的斥候报告，忽略来源不明的疑点。", "yang-urge", "杨国忠集中呈报崔乾祐兵弱的消息。"),
      c("承认没有谋反证据", "停止推动换帅，转而支持一段时间的固守。", "yang-final-delay", "杨国忠承认无证据指控哥舒翰。"),
      c("请求亲赴潼关查军", "亲自面对哥舒翰与关军，风险很高但可直接核验。", "yang-final-reconcile", "杨国忠请求赴潼关核查军情。")
    ]
  },
  "yang-urge": {
    bg: "court",
    title: "让他离开关城",
    chapter: "杨国忠视角 · 三",
    focus: "xuanzong",
    entries: [
      s("yangguozhong", "陛下，三批斥候都报崔乾祐兵少。哥舒翰若再不进，便不是谨慎，是失机。"),
      s("xuanzong", "他奏称敌军必有伏兵，郭子仪也请关军勿出。"),
      s("yangguozhong", "郭子仪只知河北，不知陕郡。哥舒翰若守到秋后，叛军补齐关外营垒，仍要出战。"),
      s("xuanzong", "你真正想要的是收复洛阳，还是让哥舒翰离开潼关？"),
      s("yangguozhong", "两件事并不相悖。出关若胜，洛阳可复；若他拒诏，陛下也可依法换帅。"),
      s("xuanzong", "若出关败了呢？"),
      s("yangguozhong", "潼关仍在身后，可收兵再守。臣以为不至全败。")
    ],
    choices: [
      c("请玄宗连遣中使督战", "不给前线等待与撤回的空间，战局走向史实。", "yang-final-history", "杨国忠推动玄宗连续催促哥舒翰出关。"),
      c("只令小部试探敌阵", "先确认羸兵军报，哥舒翰仍掌握主力。", "yang-final-delay", "杨国忠同意先以小部查探崔乾祐。"),
      c("要求哥舒翰交权而非出战", "临阵换帅，避免把主力直接送入关外。", "yang-final-reconcile", "杨国忠改为请求和平移交潼关兵权。")
    ]
  },
  "yang-final-history": {
    bg: "changan",
    title: "败报之后",
    chapter: "杨国忠视角 · 四",
    focus: "xuanzong",
    entries: [
      n("灵宝败报入京，潼关随即失守。杨国忠此前关于‘关可退守’的判断已经没有意义，朝廷只剩下连夜离开长安一途。"),
      s("xuanzong", "是你反复说崔乾祐无备。"),
      s("yangguozhong", "臣误信军报，罪无可辞。请陛下先出幸剑南，到了安全处再治臣罪。"),
      s("xuanzong", "百官与太子怎么办？"),
      s("yangguozhong", "人多则消息泄。先以六军护驾，余事沿途再定。"),
      s("xuanzong", "潼关失守时，长安连一日准备也没有。你所谓京师后备，究竟备了什么？"),
      s("yangguozhong", "臣现在只能备车马。")
    ],
    choices: [
      c("护驾西行", "结束本卷。", null, "杨国忠误判敌情并推动出战，败后促玄宗仓促离京。", "tongguan-history")
    ]
  },
  "yang-final-delay": {
    bg: "court",
    title: "暂时不催",
    chapter: "杨国忠视角 · 四",
    focus: "geshuhan",
    entries: [
      n("杨国忠停止推动全军出关，只要求哥舒翰每日具报关外敌情。潼关与灞上的敌意稍缓，但宰相仍不肯完全撤去京师戒备。"),
      s("geshuhan", "宰相若只问军报，我每日都报。若再问何日必胜，我仍答不出。"),
      s("yangguozhong", "我会向陛下说明，不以无期为抗命。但你也要让朝廷知道关军仍听诏。"),
      s("geshuhan", "可遣御史常驻关上，查验兵籍与军令。不要再另募一军盯着关门。"),
      s("yangguozhong", "灞上军可以裁半。余部守长安，不归潼关。"),
      s("geshuhan", "如此便可。关外若真有隙，我自会报请出战。")
    ],
    choices: [
      c("维持有限互信", "结束本卷。", null, "杨国忠与哥舒翰暂时释疑，潼关继续固守。", "tongguan-delay")
    ]
  },
  "yang-final-reconcile": {
    bg: "command",
    title: "关上见面",
    chapter: "杨国忠视角 · 四",
    focus: "geshuhan",
    entries: [
      n("杨国忠没有带灞上兵，只与御史、中使入潼关查军。哥舒翰把斥候口供、关外地形与新募士卒名册一并摆在案上。"),
      s("yangguozhong", "我在长安看到的只有‘二十万众’。到了关上，才知道能列阵的兵没有这么多。"),
      s("geshuhan", "朝廷报的是总数。守城能轮班，出关却要人人同时听令。"),
      s("yangguozhong", "我仍怕你兵权太重。"),
      s("geshuhan", "可以换帅。只请先找一个看过这条路的人，不要用出战来验我忠逆。"),
      s("yangguozhong", "我会请陛下另议节度，不再催你全军出关。")
    ],
    choices: [
      c("带实情回长安", "结束本卷。", null, "杨国忠亲赴潼关核验军情，出关诏令被暂缓。", "tongguan-command-change")
    ]
  },

  "cui-camp": {
    bg: "yanCamp",
    title: "关外不战",
    chapter: "崔乾祐视角 · 一",
    focus: "anlushan",
    entries: [
      n("燕军占据陕郡后，潼关始终没有出兵。关城之前地势险固，强攻数次都占不到便宜，安禄山从洛阳派人来问破关之期。"),
      s("anlushan", "潼关数月不下，河北又有十余郡反正。若再拖，范阳归路便要断。"),
      s("cuiqianyou", "唐军守关不出，我军强攻只会损兵。要破关，须先让长安替我们把哥舒翰叫出来。"),
      s("anlushan", "玄宗为何肯听你的？"),
      s("cuiqianyou", "他急着收复洛阳，杨国忠又怕哥舒翰拥兵。我们只须让斥候看见一支弱军。"),
      s("anlushan", "若哥舒翰不信呢？"),
      s("cuiqianyou", "他信不信不重要。长安信了，诏书自会到关上。", { artifact: "edict" })
    ],
    choices: [
      c("撤去大营，只留羸兵示形", "主力藏入陕郡东侧，营外只保留少量旗火。", "cui-deception", "崔乾祐撤藏精兵，以羸弱部队示敌。"),
      c("散布燕军将退洛阳的消息", "利用乡民与俘虏传言，真假较难控制。", "cui-deception", "崔乾祐散布兵少欲退的消息。"),
      c("继续试攻潼关", "直接查探关防，可能促使唐军更加谨慎。", "cui-probe", "崔乾祐再次试探潼关守军。")
    ]
  },
  "cui-probe": {
    bg: "command",
    title: "城下一试",
    chapter: "崔乾祐视角 · 二",
    focus: "geshuhan",
    entries: [
      n("燕军小队逼近关门，唐军没有追出，只用强弩封住几处坡道。两次试探都在日落前收兵。"),
      s("cuiqianyou", "哥舒翰的号令很稳。城上每换一队，后面都有人接。"),
      s("geshuhan", "敌军今日只是看关防。各部不许追，夜里再查山道。"),
      s("anlushan", "既然攻不得，为何还把兵耗在关前？"),
      s("cuiqianyou", "正因为他不追，才要从长安下手。再攻只会让他更有理由守。"),
      s("anlushan", "给你十日。十日内若仍无动静，便另议退守洛阳。"),
      s("cuiqianyou", "十日足够一封假军报走到长安。")
    ],
    choices: [
      c("立即转为示弱诱敌", "停止攻关，把主力撤到灵宝险道设伏。", "cui-deception", "崔乾祐停止试攻，转而示弱诱敌。"),
      c("派降卒向长安报军数", "让唐军俘虏带回夸小后的兵力数字。", "cui-deception", "崔乾祐利用降卒传递虚假军情。"),
      c("请求增兵正面攻关", "不再等待唐军出关，燕军将承担强攻险关的伤亡。", "cui-final-fail", "崔乾祐请求增兵强攻潼关。")
    ]
  },
  "cui-deception": {
    bg: "yanCamp",
    title: "四千羸兵",
    chapter: "崔乾祐视角 · 二",
    focus: "anlushan",
    entries: [
      n("燕军拆去大营，精兵夜间转入灵宝一带。白日留在陕郡的部队故意旗帜不整，马匹也只放在营外少数几匹。"),
      s("cuiqianyou", "让老弱在外营生火。精骑不许白日出林。"),
      s("anlushan", "斥候若走得太近，会看见营后车辙。"),
      s("cuiqianyou", "车辙往东做，像是主力撤回洛阳。真正伏兵走南山小路。"),
      s("anlushan", "长安已经有人传你兵不满四千。"),
      s("cuiqianyou", "再放两名乡人过关，说军中缺粮。消息太整齐反而像假，要留些说不清的地方。"),
      s("anlushan", "若唐军只派小队来探？"),
      s("cuiqianyou", "让小队看见我们退。主力不露，直到哥舒翰的大旗出关。")
    ],
    choices: [
      c("把伏兵集中在灵宝西原", "利用南山、黄河与狭道限制唐军展开。", "cui-ambush", "崔乾祐把主力伏于灵宝西原。"),
      c("分一部绕到唐军退路", "增强合围，但会减少正面伏兵。", "cui-ambush", "崔乾祐分兵准备截断潼关退路。"),
      c("继续后退，引唐军更深", "可能扩大纵深，也可能让唐军察觉并停步。", "cui-ambush", "崔乾祐计划继续诱唐军深入。")
    ]
  },
  "cui-ambush": {
    bg: "defile",
    title: "旗到西原",
    chapter: "崔乾祐视角 · 三",
    focus: "geshuhan",
    entries: [
      n("唐军主旗终于出现在灵宝西原。长列沿河道推进，前锋已经接近燕军羸兵，后军仍有许多未走出关门。"),
      s("cuiqianyou", "前队照原令散开，不要一接战便全退。要让他们以为我们只是阵形不整。"),
      s("geshuhan", "敌阵看似散，后方却听不见杂声。王思礼，先停前锋。"),
      s("cuiqianyou", "唐军慢了。山上伏兵不许动，先用退兵把前队再带进来。"),
      s("anlushan", "东风已起，草车可用。"),
      s("cuiqianyou", "等唐军毡车进隘口再点火。烟往西吹，正压他们后队。"),
      s("geshuhan", "传令后队停步！前军不要追！"),
      n("鼓声在狭道里层层传递，到了后军已经听不清是进还是停。燕军草车开始向唐军毡车靠近。")
    ],
    choices: [
      c("立即纵火并发伏兵", "趁唐军队列拥挤发动主攻，史实方向。", "cui-pursuit", "崔乾祐纵火发伏，唐军开始崩溃。"),
      c("再等后军进入狭道", "争取全歼，但哥舒翰可能先令前军撤退。", "cui-pursuit", "崔乾祐继续等待唐军深入。"),
      c("只击前锋，不暴露全部伏兵", "保留主力，却可能让唐军有序退回潼关。", "cui-final-slow", "崔乾祐只出一部攻击唐军前锋。")
    ]
  },
  "cui-pursuit": {
    bg: "defile",
    title: "烟里追到哪里",
    chapter: "崔乾祐视角 · 四",
    focus: "anlushan",
    entries: [
      n("唐军前后相撞，许多人弃甲奔向河边。燕军各部从山上压下，已经有人请求不等号令直追潼关。"),
      s("anlushan", "唐军大溃。乘势夺关，长安就在关后。"),
      s("cuiqianyou", "先收住伏兵。狭道里都是自己人，追得太急会互相践踏。"),
      s("anlushan", "哥舒翰若先回关，城门一闭，今日的胜仗便只赢了野战。"),
      s("cuiqianyou", "派精骑沿河追主旗，步兵清道后再进。不要让各营都去抢俘获。"),
      s("anlushan", "能否在天黑前取潼关？"),
      s("cuiqianyou", "要看唐军后队是否收到退令。若关门已有整兵，今日便不强攻。")
    ],
    choices: [
      c("精骑直追哥舒翰主旗", "夺取主帅并冲击关门，战果可能迅速扩大。", "cui-final-win", "崔乾祐以精骑追击哥舒翰并乘胜取关。"),
      c("收拢各部后再向潼关推进", "减少追击混乱，可能给唐军关闭关门的时间。", "cui-final-slow", "崔乾祐先整顿伏兵，再进逼潼关。"),
      c("分兵沿三路追击溃兵", "扩大俘获范围，主力也会在胜后分散。", "cui-final-overreach", "崔乾祐分兵多路追击唐军。")
    ]
  },
  "cui-final-win": {
    bg: "changan",
    title: "西望长安",
    chapter: "崔乾祐视角 · 五",
    focus: "anlushan",
    entries: [
      n("燕军精骑追上哥舒翰主旗，唐军后队没有来得及重整关防。潼关在败兵与追骑之间失守，通往长安的道路被打开。"),
      s("anlushan", "数月不下的关城，一日便开了。"),
      s("cuiqianyou", "不是关弱，是唐军自己出了关。"),
      s("anlushan", "立即遣骑西进，不给玄宗调兵的时间。"),
      s("cuiqianyou", "可先夺华州驿路，截断败报。长安若来不及知道，城中准备更少。"),
      s("anlushan", "照办。潼关留兵，不许只顾入城取物。")
    ],
    choices: [
      c("乘胜西进", "结束本卷。", null, "崔乾祐以示弱、伏击与追击攻破潼关。", "tongguan-yan-victory")
    ]
  },
  "cui-final-slow": {
    bg: "command",
    title: "胜而关未开",
    chapter: "崔乾祐视角 · 五",
    focus: "anlushan",
    entries: [
      n("燕军击溃唐军前锋，却没有立刻压到潼关。王思礼收回部分后队，赶在追兵之前关闭关门。"),
      s("anlushan", "唐军败了，关却还在。"),
      s("cuiqianyou", "前锋已折，关中粮械也丢了许多。再围数日，守军未必还有原来的胆气。"),
      s("anlushan", "河北的郭子仪不会等我们数日。"),
      s("cuiqianyou", "那便留兵围关，主力回救河北。至少今日没有把各部全耗在关城下。"),
      s("anlushan", "照此分兵。灵宝之胜有了，潼关之胜还没有。")
    ],
    choices: [
      c("围关而止", "结束本卷。", null, "燕军伏击得胜，却未能立即夺取潼关。", "tongguan-bloody-retreat")
    ]
  },
  "cui-final-overreach": {
    bg: "defile",
    title: "追兵散入山道",
    chapter: "崔乾祐视角 · 五",
    focus: "anlushan",
    entries: [
      n("燕军各部争相追俘，沿山道与河岸拉开。唐军后队在王思礼约束下重整，反而在几处窄路截住了追兵。"),
      s("anlushan", "你布伏时要诸军听一面旗，取胜后为何让他们各走各的？"),
      s("cuiqianyou", "末将贪了全歼之功。现在只能召各路回来，先保灵宝。"),
      s("anlushan", "潼关还能取吗？"),
      s("cuiqianyou", "今日不能。唐军已经关门，再逼只会用散兵撞城。"),
      s("anlushan", "收兵。军功按归营人数核，不按各自报的首级核。")
    ],
    choices: [
      c("停止追击", "结束本卷。", null, "燕军胜后分散，未能把灵宝胜势转成潼关失守。", "tongguan-yan-overreach")
    ]
  },
  "cui-final-fail": {
    bg: "command",
    title: "强攻不下",
    chapter: "崔乾祐视角 · 三",
    focus: "geshuhan",
    entries: [
      n("燕军增兵后强攻潼关。唐军依关城与山河固守，数日间轮换弩手，始终没有追出。燕军伤亡渐增，河北败讯却不断送到洛阳。"),
      s("geshuhan", "敌军今日攻西坡。仍按昨日次序换防，不许开关追击。"),
      s("cuiqianyou", "唐军不出，强攻没有便宜。"),
      s("anlushan", "范阳方向已经告急。再攻三日，若仍不下，便撤回洛阳议兵。"),
      s("cuiqianyou", "末将请停攻。留一部牵制潼关，主力应先救河北。"),
      s("anlushan", "准。此战是我催得太急，不以你一人领罪。")
    ],
    choices: [
      c("撤兵救河北", "结束本卷。", null, "崔乾祐放弃诱敌改为强攻，未能攻破潼关。", "tongguan-northern-plan")
    ]
  }
};

const tongguanEndings = {
  "tongguan-history": {
    tone: "史实线",
    title: "灵宝大败，潼关失守",
    result:
      "哥舒翰在朝廷连续催促下率大军出关，于灵宝西原遭崔乾祐伏击。唐军在山河狭道与烟火中崩溃，潼关随即失守，玄宗仓促离开长安。",
    historical:
      "《资治通鉴》详载哥舒翰关于羸兵诱敌的判断、郭子仪与李光弼的固守建议、连续中使催战以及灵宝伏击经过。",
    court:
      "此战并非前线没有识破诱敌。真正改变结局的，是前线判断无法压过朝廷对军期与兵权的担忧。"
  },
  "tongguan-held": {
    tone: "固守线",
    title: "潼关未出，关门仍在",
    result:
      "哥舒翰继续依险固守，承担抗诏或逗留的政治责任。燕军无法迅速西进，郭子仪、李光弼在河北获得更多行动时间。",
    historical:
      "这是依据郭子仪、李光弼奏疏所作的反事实推演：潼关守军牵制正面，河北军进逼范阳，两线可以共同压迫安禄山。",
    court:
      "固守不保证叛乱立刻结束，但避免了把唐军主力送入崔乾祐预设的狭道。"
  },
  "tongguan-northern-plan": {
    tone: "河北线",
    title: "关中固守，北取范阳",
    result:
      "朝廷接受郭子仪、李光弼建议，把主要进攻放在河北与范阳方向。潼关不求速胜，只负责阻止燕军进入关中。",
    historical:
      "通鉴记安禄山因潼关不下、河北道路再绝而十分恐惧，一度议弃洛阳回范阳；此线据此展开。",
    court:
      "这条路线把战役目标从立即收复洛阳，改为先破坏叛军的后方与军心。"
  },
  "tongguan-delay": {
    tone: "缓令线",
    title: "疑军暂解，战机后移",
    result:
      "杨国忠与哥舒翰暂时维持有限互信，朝廷不再依据来源不明的军报催全军出关。潼关仍守，但两人的兵权矛盾没有彻底解决。",
    historical:
      "史实中，杨国忠设置灞上军与哥舒翰请求统辖、处置杜乾运，使双方疑惧加深；本线假设朝廷提前约束这场内耗。",
    court:
      "避免一次错误出战，不等于解决了朝廷与边帅之间长期存在的信任问题。"
  },
  "tongguan-command-change": {
    tone: "换帅线",
    title: "交出兵权，临关换帅",
    result:
      "哥舒翰以辞帅或主动核验军情的方式停止政治对抗。潼关没有立即出战，却必须承担临阵更换统帅带来的混乱。",
    historical:
      "这是一条制度性改写：用交接兵权代替以出战验证忠诚，代价是新帅能否约束二十万新募兵仍不可知。",
    court:
      "交权可以暂时解除谋反猜疑，却不能自动产生一名熟悉关防、又能让朝廷放心的新元帅。"
  },
  "tongguan-bloody-retreat": {
    tone: "止损线",
    title: "灵宝受挫，退守潼关",
    result:
      "唐军在灵宝遭到伏击后较早发出退令，保住部分后军并重新关闭潼关。伤亡仍重，但长安没有立刻失去最后一道关门。",
    historical:
      "此线保留崔乾祐伏击成功的条件，只改变唐军撤退命令的时机与后队是否全部进入狭道。",
    court:
      "识破得晚仍可能止损。关键不在把败仗说成胜仗，而在败军是否还有人能够传令、列队和关门。"
  },
  "tongguan-fracture": {
    tone: "内争线",
    title: "宰相元帅同时去职",
    result:
      "哥舒翰与杨国忠的猜疑公开化，玄宗被迫同时处置两人。潼关暂由部将守住，朝廷却在战事最紧迫时陷入权力重组。",
    historical:
      "通鉴记王思礼曾劝哥舒翰上表诛杨国忠，哥舒翰拒绝以避免被视作反叛；此线推演了他若接受建议的后果。",
    court:
      "清除猜疑的对象不等于清除猜疑本身。前线、宰相与皇帝之间的授权仍须重新建立。"
  },
  "tongguan-yan-victory": {
    tone: "燕胜线",
    title: "示弱设伏，一日破关",
    result:
      "崔乾祐以羸兵示形，把精兵伏于灵宝险道，再以草车纵火、山上伏兵与精骑追击击溃唐军，乘势夺取潼关。",
    historical:
      "此线采用通鉴所记的核心战术经过：散阵诱敌、险地伏兵、木石与火烟共同压迫拥挤的唐军队列。",
    court:
      "燕军的胜利建立在唐军必须出关这一前提上。只要哥舒翰仍据关不出，崔乾祐的伏兵便没有目标。"
  },
  "tongguan-yan-overreach": {
    tone: "追深线",
    title: "伏击得胜，追兵失序",
    result:
      "燕军赢得灵宝伏击，却在多路追击中失去集中。唐军后队重新关闭潼关，崔乾祐未能把野战胜利立刻转为关中通路。",
    historical:
      "这是对胜后行动的反事实推演，用以区分‘击溃出关军’与‘及时夺取关门’两个不同目标。",
    court:
      "设伏时统一的号令，到了争俘与追亡时最容易松动；战果因此可能停在关外。"
  }
};

const volumes = {
  jieting: {
    id: "jieting",
    label: "卷一",
    title: "街亭问策",
    subtitle: "建兴六年，蜀军第一次北伐。街亭守将的选择将影响整条陇右战线。",
    dynasty: "三国 · 蜀汉北伐",
    defaultRole: "zhuge",
    backgrounds,
    artifacts,
    characters,
    openingCopy,
    sources,
    routeStarts,
    scenes,
    endings
  },
  tongguan: {
    id: "tongguan",
    label: "卷二",
    title: "潼关诏下",
    subtitle: "天宝十五载，潼关守军奉诏出战。前线判断能否抵住长安接连而来的催令？",
    dynasty: "唐朝 · 安史之乱",
    defaultRole: "geshuhan",
    backgrounds: tongguanBackgrounds,
    artifacts: tongguanArtifacts,
    characters: tongguanCharacters,
    openingCopy: tongguanOpeningCopy,
    sources: tongguanSources,
    routeStarts: tongguanRouteStarts,
    scenes: tongguanScenes,
    endings: tongguanEndings
  },
  sarhu: {
    id: "sarhu",
    label: "卷三",
    title: "萨尔浒风雪",
    subtitle: "万历四十七年，明军四路进兵辽东。各路能否按期会合，决定此战走向。",
    dynasty: "明朝 · 辽东边事",
    defaultRole: "yanghao",
    backgrounds: sarhuBackgrounds,
    artifacts: sarhuArtifacts,
    characters: sarhuCharacters,
    openingCopy: sarhuOpeningCopy,
    sources: sarhuSources,
    routeStarts: sarhuRouteStarts,
    scenes: sarhuScenes,
    endings: sarhuEndings
  }
};

const state = {
  screen: "start",
  volumeId: "tongguan",
  selectedRole: "geshuhan",
  sceneId: null,
  lineIndex: 0,
  endingId: null,
  history: []
};

function s(speaker, text, options = {}) {
  return { speaker, text, ...options };
}

function n(text, options = {}) {
  return { speaker: "narrator", text, ...options };
}

function c(text, detail, next, history, ending = null) {
  return { text, detail, next, history, ending };
}

function activeVolume() {
  return volumes[state.volumeId];
}

function setBackground(key) {
  const volume = activeVolume();
  app.style.setProperty("--scene-image", `url("${volume.backgrounds[key]}")`);
}

function characterName(id) {
  const volume = activeVolume();
  if (id === "narrator") return "旁白";
  return volume.characters[id]?.name || id;
}

function render() {
  if (state.screen === "start") renderStart();
  if (state.screen === "story") renderStory();
  if (state.screen === "role") renderRoleSelect();
  if (state.screen === "play") renderScene();
  if (state.screen === "ending") renderEnding();
}

function renderStart() {
  const current = activeVolume();
  setBackground("opening");
  app.className = "game-shell screen-start";
  app.innerHTML = `
    <section class="volume-layout">
      <div class="ink-title">
        <p class="seal-label">历史视觉小说</p>
        <h1>兵事问策</h1>
        <p class="subtitle">选择一卷，从不同人物的眼睛里进入一场真实战役。</p>
      </div>
      <div class="volume-grid">
        ${Object.values(volumes)
          .map(
            (volume) => `
              <article class="volume-card ${volume.id === current.id ? "active" : ""}">
                <p>${volume.label} · ${volume.dynasty}</p>
                <h2>${volume.title}</h2>
                <span>${volume.subtitle}</span>
                <button class="ghost-btn volume-enter-btn" data-action="select-volume" data-volume="${volume.id}">
                  进入${volume.label}
                </button>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
    <aside class="rotate-hint">建议横屏游玩</aside>
  `;
}

function renderStory() {
  const volume = activeVolume();
  setBackground("opening");
  app.className = "game-shell screen-story";
  app.innerHTML = `
    <section class="story-scroll">
      <p class="seal-label">${volume.dynasty}</p>
      <h1>${volume.title}</h1>
      <div class="story-copy">
        ${volume.openingCopy.map((line) => `<p>${line}</p>`).join("")}
      </div>
      <button class="primary-btn" data-action="open-roles">询问此战，你欲扮演何人？</button>
    </section>
  `;
}

function renderRoleSelect() {
  const volume = activeVolume();
  setBackground("command");
  app.className = "game-shell screen-roles";
  const role = volume.characters[state.selectedRole] || volume.characters[volume.defaultRole];
  if (!volume.characters[state.selectedRole]) state.selectedRole = volume.defaultRole;
  const playable = Object.entries(volume.characters).filter(([, item]) => item.playable);
  const supporting = Object.entries(volume.characters).filter(([, item]) => !item.playable);

  app.innerHTML = `
    <section class="role-board">
      <header class="role-header">
        <div>
          <p class="seal-label">择一人入局</p>
          <h1>你想从谁的眼睛里看${volume.title.replace(/问策|风雪|诏下/g, "")}？</h1>
        </div>
        <button class="ghost-btn small" data-action="open-story">重看背景</button>
      </header>

      <div class="role-content">
        <nav class="role-list" aria-label="可扮演角色">
          ${playable.map(([id, item]) => roleButton(id, item)).join("")}
        </nav>

        <article class="role-detail">
          <div class="portrait-well">
            <img src="${role.avatar}" alt="${role.name}立绘" />
          </div>
          <div class="role-copy">
            <p class="seal-label">${role.faction} · ${role.courtesy}</p>
            <h2>${role.name}</h2>
            <p>${role.brief}</p>
            <div class="trait-line">
              ${role.traits.map((trait) => `<span>${trait}</span>`).join("")}
            </div>
            ${statsMarkup(role.stats)}
            <button class="primary-btn" data-action="start-route">以${role.name}入局</button>
          </div>
        </article>
      </div>

      <section class="supporting-cast" aria-label="剧情登场配角">
        <span>剧情登场</span>
        ${supporting
          .map(
            ([, item]) => `
              <div class="cast-card">
                <img src="${item.avatar}" alt="" />
                <strong>${item.name}</strong>
                <small>${item.brief}</small>
              </div>
            `
          )
          .join("")}
      </section>
    </section>
  `;
}

function roleButton(id, role) {
  return `
    <button class="role-tab ${id === state.selectedRole ? "active" : ""}" data-action="select-role" data-role="${id}">
      <span>${role.name}</span>
      <small>${role.faction}</small>
    </button>
  `;
}

function statsMarkup(stats) {
  return `
    <div class="stat-grid">
      ${Object.entries(stats)
        .map(
          ([key, value]) => `
            <div class="stat-row">
              <span>${statLabels[key]}</span>
              <div class="stat-track"><i style="width:${value}%"></i></div>
              <b>${value}</b>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function startRoute() {
  const volume = activeVolume();
  state.sceneId = volume.routeStarts[state.selectedRole];
  state.lineIndex = 0;
  state.history = [];
  state.endingId = null;
  state.screen = "play";
  render();
}

function getCurrentScene() {
  return activeVolume().scenes[state.sceneId];
}

function getCurrentPassage(scene) {
  return state.lineIndex < scene.entries.length ? scene.entries[state.lineIndex] : null;
}

function getCompanion(scene, passage) {
  const characters = activeVolume().characters;
  const speaker = passage?.speaker;
  if (speaker && speaker !== "narrator" && speaker !== state.selectedRole && characters[speaker]) return speaker;
  if (scene.focus && scene.focus !== state.selectedRole && characters[scene.focus]) return scene.focus;
  return null;
}

function renderScene() {
  const scene = getCurrentScene();
  const passage = getCurrentPassage(scene);
  const isChoiceMoment = !passage;
  const companion = getCompanion(scene, passage);
  setBackground(scene.bg);
  app.className = "game-shell screen-play";
  app.innerHTML = `
    <section class="play-layout">
      <header class="hud">
        <div>
          <p class="seal-label">${scene.chapter}</p>
          <h1>${scene.title}</h1>
        </div>
        <button class="ghost-btn small" data-action="open-roles">重选角色</button>
      </header>

      <div class="duel-layer">
        ${sideSprite(state.selectedRole, "left", passage)}
        ${companion ? sideSprite(companion, "right", passage) : ""}
      </div>

      ${artifactMarkup(passage)}

      <article class="vn-panel ${isChoiceMoment ? "choice-moment" : ""}">
        ${isChoiceMoment ? choicesMarkup(scene) : passageMarkup(scene, passage)}
      </article>
    </section>
  `;
}

function sideSprite(id, side, passage) {
  const character = activeVolume().characters[id];
  const speaker = passage?.speaker;
  const active = speaker === id;
  const quiet = speaker && speaker !== "narrator" && speaker !== id;
  const expression = active ? passage?.expression : null;
  const image = character.expressions?.[expression] || character.avatar;
  return `
    <figure class="side-sprite ${side} ${active ? "active" : quiet ? "quiet" : ""} ${expression ? "has-expression" : ""}">
      <img src="${image}" alt="${character.name}${expression ? "情绪立绘" : ""}" />
      <figcaption>${character.name}</figcaption>
    </figure>
  `;
}

function artifactMarkup(passage) {
  const artifact = activeVolume().artifacts?.[passage?.artifact];
  if (!artifact) return "";
  return `
    <figure class="story-artifact" aria-label="史物特写：${artifact.label}">
      <img src="${artifact.src}" alt="${artifact.label}" />
      <figcaption>
        <strong>${artifact.label}</strong>
        <span>${artifact.note}</span>
      </figcaption>
    </figure>
  `;
}

function passageMarkup(scene, passage) {
  const volume = activeVolume();
  const character = volume.characters[passage.speaker];
  const label = passage.speaker === "narrator" ? "旁白" : character.name;
  const sub = passage.speaker === "narrator" ? volume.dynasty : character.faction;
  return `
    <div class="speaker-splash">
      <span>${label}</span>
      <small>${sub}</small>
    </div>
    <p class="vn-text">${passage.text}</p>
    <div class="vn-controls">
      <span>${state.lineIndex + 1} / ${scene.entries.length}</span>
      <button class="primary-btn" data-action="next-line">继续</button>
    </div>
  `;
}

function choicesMarkup(scene) {
  const role = activeVolume().characters[state.selectedRole];
  return `
    <div class="speaker-splash choice-splash">
      <span>抉择</span>
      <small>你是${role.name}</small>
    </div>
    <p class="vn-text">众人都在等你的命令。</p>
    <div class="choice-grid">
      ${scene.choices
        .map(
          (choice, index) => `
            <button class="choice-btn" data-action="choose" data-index="${index}">
              <b>${index + 1}. ${choice.text}</b>
              <span>${choice.detail}</span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function nextLine() {
  const scene = getCurrentScene();
  state.lineIndex = Math.min(state.lineIndex + 1, scene.entries.length);
  render();
}

function choose(index) {
  const scene = getCurrentScene();
  const choice = scene.choices[index];
  state.history.push({
    scene: scene.title,
    choice: choice.text,
    history: choice.history
  });

  if (choice.ending) {
    state.endingId = choice.ending;
    state.screen = "ending";
  } else {
    state.sceneId = choice.next;
    state.lineIndex = 0;
  }
  render();
}

function renderEnding() {
  const volume = activeVolume();
  const ending = volume.endings[state.endingId];
  setBackground("court");
  app.className = "game-shell screen-ending";
  app.innerHTML = `
    <section class="ending-layout">
      <header class="ending-header">
        <p class="seal-label">${ending.tone}</p>
        <h1>${ending.title}</h1>
        <p>${ending.result}</p>
      </header>

      <div class="ending-grid">
        <article class="ending-card">
          <h2>你的决策痕迹</h2>
          <ol class="history-list">
            ${state.history.map((item) => `<li><span>${item.scene}</span>${item.history}</li>`).join("")}
          </ol>
        </article>

        <article class="ending-card">
          <h2>史实参照</h2>
          <p>${ending.historical}</p>
          <blockquote>${ending.court}</blockquote>
        </article>
      </div>

      <details class="source-box">
        <summary>本原型采用的史料线索</summary>
        <div>
          ${volume.sources
            .map(
              (source) => `
                <p>
                  <a href="${source.url}" target="_blank" rel="noreferrer">${source.title}</a>
                  <span>${source.note}</span>
                </p>
              `
            )
            .join("")}
        </div>
      </details>

      <div class="ending-actions">
        <button class="primary-btn" data-action="open-roles">换一个角色重来</button>
        <button class="ghost-btn" data-action="restart">回到标题</button>
      </div>
    </section>
  `;
}

app.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const action = button.dataset.action;

  if (action === "select-volume") {
    const volumeId = button.dataset.volume;
    if (!volumes[volumeId]) return;
    state.volumeId = volumeId;
    state.selectedRole = volumes[volumeId].defaultRole;
    state.sceneId = null;
    state.lineIndex = 0;
    state.endingId = null;
    state.history = [];
    state.screen = "story";
    render();
  }
  if (action === "open-story") {
    state.screen = "story";
    render();
  }
  if (action === "open-roles") {
    const volume = activeVolume();
    state.screen = "role";
    if (!volume.characters[state.selectedRole]?.playable) state.selectedRole = volume.defaultRole;
    render();
  }
  if (action === "select-role") {
    const volume = activeVolume();
    const role = button.dataset.role;
    if (!volume.characters[role]?.playable) return;
    state.selectedRole = role;
    renderRoleSelect();
  }
  if (action === "start-route") startRoute();
  if (action === "next-line") nextLine();
  if (action === "choose") choose(Number(button.dataset.index));
  if (action === "restart") {
    const volume = activeVolume();
    state.screen = "start";
    state.selectedRole = volume.defaultRole;
    state.sceneId = null;
    state.lineIndex = 0;
    state.endingId = null;
    state.history = [];
    render();
  }
});

render();
