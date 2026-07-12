# 兵事问策

一个横屏历史视觉小说网页原型：玩家先选择卷目，再从真实战役中的不同人物视角入局，通过背景叙事、人物对话和关键抉择走向不同结局。

在线游玩：[https://roibai.github.io/HistoryOnceMore/](https://roibai.github.io/HistoryOnceMore/)

## Run

```bash
npm start
```

打开：

```text
http://localhost:5173
```

也可以指定端口：

```bash
PORT=5177 npm start
```

## Prototype Scope

- 标题页按年代排列卷目：卷一《街亭问策》，卷二《潼关诏下》，卷三《萨尔浒风雪》。
- 卷一包含六张三国场景背景、七张透明人物立绘、四条可玩视角：诸葛亮、马谡、王平、张郃。
- 卷二包含六张唐代场景背景、八张透明人物立绘、四条可玩视角：哥舒翰、唐玄宗、杨国忠、崔乾祐。
- 卷三包含六张明朝辽东场景背景、八张透明人物立绘、四条可玩视角：杨镐、杜松、刘綎、努尔哈赤。
- 三卷新增六张史物特写与六张核心人物情绪立绘，均由具体台词触发。
- 对话采用视觉小说式逐句推进，当前说话人使用泼墨名牌显示姓名与身份。
- 结局页保留决策痕迹和史实参照，不显示数值系统。
- 二十五个结局均包含仿纪传体的年代题签、战局纪事与“史臣曰”，并明确标注史实纪要或反事实推演。

## Historical Basis

卷一主要参考：

- [《三国志·蜀书·诸葛亮传》](https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%9C%8B%E5%BF%97/%E5%8D%B735)
- [《三国志·蜀书·马良传》附马谡](https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%9C%8B%E5%BF%97/%E5%8D%B739)
- [《三国志·蜀书·王平传》](https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%9C%8B%E5%BF%97/%E5%8D%B743)
- [《三国志·魏书·张郃传》](https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%9C%8B%E5%BF%97/%E5%8D%B717)
- [《资治通鉴·卷七十一》](https://zh.wikisource.org/zh-hant/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7071)

分支剧情是基于史实约束的互动改写，不把《三国演义》的空城计等戏剧桥段混入街亭主线。

卷二主要参考：

- [《资治通鉴·卷二百一十八》](https://zh.wikisource.org/zh-hans/%E8%B3%87%E6%B2%BB%E9%80%9A%E9%91%91/%E5%8D%B7218)
- [《旧唐书·卷一百零四》](https://zh.wikisource.org/zh-hans/%E8%88%8A%E5%94%90%E6%9B%B8/%E5%8D%B7104)
- [《旧唐书·卷一百零六·杨国忠传》](https://zh.wikisource.org/zh-hans/%E8%88%8A%E5%94%90%E6%9B%B8/%E5%8D%B7106)
- [《旧唐书·卷十·肃宗本纪》](https://zh.wikisource.org/wiki/%E8%88%8A%E5%94%90%E6%9B%B8/%E5%8D%B710)

卷二选择天宝十五载潼关出战与灵宝之败作为唐朝篇章，分支围绕据险固守、河北攻势、朝廷与边帅互疑、羸兵诱敌和灵宝狭道伏击展开。

卷三主要参考：

- [《明史·杨镐传》](https://zh.wikisource.org/zh-hans/%E6%98%8E%E5%8F%B2/%E5%8D%B7259)
- [《明史·卷二百四十七·刘綎传》](https://zh.wikisource.org/wiki/%E6%98%8E%E5%8F%B2/%E5%8D%B7247)
- [《明史·卷二百三十八·李成梁传》附李如柏](https://zh.wikisource.org/wiki/%E6%98%8E%E5%8F%B2/%E5%8D%B7238)
- [《明史·卷三百二十·外国一·朝鲜》](https://zh.wikisource.org/wiki/%E6%98%8E%E5%8F%B2/%E5%8D%B7320)
- [《清史稿·太祖本纪》](https://zh.wikisource.org/wiki/%E6%B8%85%E5%8F%B2%E7%A8%BF/%E5%8D%B71)

卷三选择萨尔浒之战作为明朝篇章，分支围绕史实中的四路出师、通信失调、前锋急进、后金集中兵力逐路应敌等问题展开。
