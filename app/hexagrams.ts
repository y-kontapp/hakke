export type LineType = "oldYin" | "youngYang" | "youngYin" | "oldYang";

export interface Hexagram {
  no: number;
  name: string;
  reading: string;
  symbol: string;
  upper: string;
  lower: string;
  judgement: string;
  interpretation: string;
  binary: string;
}

export const HEXAGRAMS: Hexagram[] = [
  { no: 1, name: "乾為天", reading: "けんいてん", symbol: "䷀", upper: "天", lower: "天", binary: "111111", judgement: "元亨利貞。大いに通じる、貞しきに利あり。", interpretation: "純粋な陽の極み。創造・主導・前進の最盛期。剛健に進めば道は開きますが、傲りには注意が必要です。" },
  { no: 2, name: "坤為地", reading: "こんいち", symbol: "䷁", upper: "地", lower: "地", binary: "000000", judgement: "元亨、牝馬の貞に利あり。柔順にして大いに亨る。", interpretation: "純粋な陰の徳。受容・育成・支える力。自ら先頭に立つより、人を支えることで大成する局面です。" },
  { no: 3, name: "水雷屯", reading: "すいらいちゅん", symbol: "䷂", upper: "水", lower: "雷", binary: "010001", judgement: "元亨利貞。往く所あるに用うる勿れ。侯を建つるに利あり。", interpretation: "産みの苦しみ。物事の始まりで難渋する時。焦って動かず、協力者を立て基盤を整えるべきです。" },
  { no: 4, name: "山水蒙", reading: "さんすいもう", symbol: "䷃", upper: "山", lower: "水", binary: "100010", judgement: "亨る。我より童蒙を求めず、童蒙より我を求む。", interpretation: "未熟・蒙昧の時。素直に学ぶ姿勢が運を開きます。指導者の言葉を真摯に受け止めるべき時です。" },
  { no: 5, name: "水天需", reading: "すいてんじゅ", symbol: "䷄", upper: "水", lower: "天", binary: "010111", judgement: "孚あり、光いに亨る。貞しくして吉。大川を渉るに利あり。", interpretation: "待つ時。実力はあるが時機が満ちていません。焦らず誠を保ち、機を待つことで成就します。" },
  { no: 6, name: "天水訟", reading: "てんすいしょう", symbol: "䷅", upper: "天", lower: "水", binary: "111010", judgement: "孚ありて窒がる。惕れて中すれば吉、終わりは凶。", interpretation: "争いごとの卦。訴訟・対立は和解で収めるのが上策。深追いすれば双方に害が及びます。" },
  { no: 7, name: "地水師", reading: "ちすいし", symbol: "䷆", upper: "地", lower: "水", binary: "000010", judgement: "貞しきなり。丈人なれば吉、咎なし。", interpretation: "軍を率いる卦。組織を動かす時。徳のあるリーダーが規律を保てば大事を成せます。" },
  { no: 8, name: "水地比", reading: "すいちひ", symbol: "䷇", upper: "水", lower: "地", binary: "010000", judgement: "吉。原筮するに元永貞。咎なし。不寧の方来たる。", interpretation: "親しみ集まる卦。仲間・協調の時。早く加わる者には利あり、遅れる者は不利となります。" },
  { no: 9, name: "風天小畜", reading: "ふうてんしょうちく", symbol: "䷈", upper: "風", lower: "天", binary: "110111", judgement: "亨る。密雲ありて雨ふらず、我が西郊より。", interpretation: "小さく蓄える時。大きく動けず、力を内に蓄える局面。今は実力を養う準備期間です。" },
  { no: 10, name: "天沢履", reading: "てんたくり", symbol: "䷉", upper: "天", lower: "沢", binary: "111011", judgement: "虎の尾を履むも、人を咥わず、亨る。", interpretation: "礼を踏み行う卦。危うい立場でも、礼節を守れば災いを免れます。慎重な行動が吉。" },
  { no: 11, name: "地天泰", reading: "ちてんたい", symbol: "䷊", upper: "地", lower: "天", binary: "000111", judgement: "小往き大来たる。吉、亨る。", interpretation: "天地交わり通ずる大吉の卦。上下心を通わせ、すべて順調。今こそ大事を成すべき時です。" },
  { no: 12, name: "天地否", reading: "てんちひ", symbol: "䷋", upper: "天", lower: "地", binary: "111000", judgement: "之を匪人とす。君子の貞に利あらず。大往き小来たる。", interpretation: "塞がりの時。上下通ぜず、意思疎通が滞ります。雌伏して君子の道を守るべき時。" },
  { no: 13, name: "天火同人", reading: "てんかどうじん", symbol: "䷌", upper: "天", lower: "火", binary: "111101", judgement: "人を同じくするに野に於いてす、亨る。大川を渉るに利あり。", interpretation: "人と志を同じくする卦。広く公明正大に協力者を募れば、大きな事業も成し遂げられます。" },
  { no: 14, name: "火天大有", reading: "かてんたいゆう", symbol: "䷍", upper: "火", lower: "天", binary: "101111", judgement: "元いに亨る。", interpretation: "大いに有する時。実力・財・人望すべてが集まる豊穣の卦。謙虚さを忘れずに享受すべきです。" },
  { no: 15, name: "地山謙", reading: "ちさんけん", symbol: "䷎", upper: "地", lower: "山", binary: "000100", judgement: "亨る。君子終わりあり。", interpretation: "謙遜・控えめの徳。高い実力を低く構える美徳。すべての爻が吉となる珍しい卦です。" },
  { no: 16, name: "雷地予", reading: "らいちよ", symbol: "䷏", upper: "雷", lower: "地", binary: "001000", judgement: "侯を建て師を行うに利あり。", interpretation: "悦び備える卦。準備が整い、いよいよ動き出す時。仲間と志を共有し、勢いに乗るべきです。" },
  { no: 17, name: "沢雷随", reading: "たくらいずい", symbol: "䷐", upper: "沢", lower: "雷", binary: "011001", judgement: "元いに亨り、貞しきに利あり、咎なし。", interpretation: "随順の卦。時流・人に従って動く時。自我を抑えて流れに従えば、思わぬ成果が得られます。" },
  { no: 18, name: "山風蠱", reading: "さんぷうこ", symbol: "䷑", upper: "山", lower: "風", binary: "100110", judgement: "元いに亨る、大川を渉るに利あり。", interpretation: "腐敗を正す卦。長年の弊害を改革する時。過去の停滞を立て直せば、新たな道が拓けます。" },
  { no: 19, name: "地沢臨", reading: "ちたくりん", symbol: "䷒", upper: "地", lower: "沢", binary: "000011", judgement: "元いに亨り、貞しきに利あり。八月に至り凶あり。", interpretation: "臨み望む卦。陽が伸びる勢い、進出に好機。ただし八月（衰運期）の備えも忘れずに。" },
  { no: 20, name: "風地観", reading: "ふうちかん", symbol: "䷓", upper: "風", lower: "地", binary: "110000", judgement: "盥して薦めず、孚ありて顒若たり。", interpretation: "観る卦。動かず観察し、本質を見極める時。沈思黙考が次の行動の質を決めます。" },
  { no: 21, name: "火雷噬嗑", reading: "からいぜいごう", symbol: "䷔", upper: "火", lower: "雷", binary: "101001", judgement: "亨る。獄を用うるに利あり。", interpretation: "障害を噛み砕く卦。間に挟まる邪魔を断ち、毅然と決断すべき時。法と秩序の貫徹が吉。" },
  { no: 22, name: "山火賁", reading: "さんかひ", symbol: "䷕", upper: "山", lower: "火", binary: "100101", judgement: "亨る。往く所あるに小しく利あり。", interpretation: "飾り整える卦。外見・形式を整える時。ただし華美に過ぎず、本質を磨くことが大事です。" },
  { no: 23, name: "山地剥", reading: "さんちはく", symbol: "䷖", upper: "山", lower: "地", binary: "100000", judgement: "往く所あるに利あらず。", interpretation: "剥落の卦。物事が削られ落ちる衰運期。動かず守りに徹し、嵐が過ぎるのを待つべきです。" },
  { no: 24, name: "地雷復", reading: "ちらいふく", symbol: "䷗", upper: "地", lower: "雷", binary: "000001", judgement: "亨る。出入疾なく、朋来たりて咎なし。", interpretation: "復活の卦。陽気が一陽来復、再起の時。小さな始まりを大切に育てれば必ず実を結びます。" },
  { no: 25, name: "天雷无妄", reading: "てんらいむぼう", symbol: "䷘", upper: "天", lower: "雷", binary: "111001", judgement: "元いに亨り、貞しきに利あり。", interpretation: "天真爛漫の卦。私心なく自然に従う時。作為を捨て、誠を尽くせば道は自ずと開けます。" },
  { no: 26, name: "山天大畜", reading: "さんてんたいちく", symbol: "䷙", upper: "山", lower: "天", binary: "100111", judgement: "貞しきに利あり、家食せざれば吉、大川を渉るに利あり。", interpretation: "大いに蓄える卦。十分な力と資源が備わる時。蓄えた実力を世に活かすチャンスです。" },
  { no: 27, name: "山雷頤", reading: "さんらいい", symbol: "䷚", upper: "山", lower: "雷", binary: "100001", judgement: "貞しくして吉。頤を観て自ら口実を求む。", interpretation: "養いの卦。心身と人を養う時。何を口に入れ、何を語り、誰を養うかを慎重に選びましょう。" },
  { no: 28, name: "沢風大過", reading: "たくふうたいか", symbol: "䷛", upper: "沢", lower: "風", binary: "011110", judgement: "棟撓む。往く所あるに利あり、亨る。", interpretation: "過度・重圧の卦。屋根が撓むほどの負荷。非常手段でも踏み込まないと崩壊する局面です。" },
  { no: 29, name: "坎為水", reading: "かんいすい", symbol: "䷜", upper: "水", lower: "水", binary: "010010", judgement: "孚ありて維れ心亨る。行きて尚ばるるあり。", interpretation: "重なる険難の卦。困難が続く時。誠の心を保ち、忍耐をもって乗り越えれば必ず光が見えます。" },
  { no: 30, name: "離為火", reading: "りいか", symbol: "䷝", upper: "火", lower: "火", binary: "101101", judgement: "貞しきに利あり、亨る。牝牛を畜うに吉。", interpretation: "明智の卦。光明が重なる時。聡明さを発揮しつつ、柔順さを保てば大いに通じます。" },
  { no: 31, name: "沢山咸", reading: "たくざんかん", symbol: "䷞", upper: "沢", lower: "山", binary: "011100", judgement: "亨る。貞しきに利あり、女を取るに吉。", interpretation: "感応の卦。心通い合う時。男女・人間関係に好機。素直な感情の交流が幸運を呼びます。" },
  { no: 32, name: "雷風恒", reading: "らいふうこう", symbol: "䷟", upper: "雷", lower: "風", binary: "001110", judgement: "亨る、咎なし。貞しきに利あり、往く所あるに利あり。", interpretation: "恒久・持続の卦。長く続けることに価値ある時。地道な継続が大きな実りを生みます。" },
  { no: 33, name: "天山遯", reading: "てんざんとん", symbol: "䷠", upper: "天", lower: "山", binary: "111100", judgement: "亨る。小しく貞しきに利あり。", interpretation: "退き避ける卦。小人が勢いを得る時。君子は身を退いて時を待つのが賢明です。" },
  { no: 34, name: "雷天大壮", reading: "らいてんたいそう", symbol: "䷡", upper: "雷", lower: "天", binary: "001111", judgement: "貞しきに利あり。", interpretation: "壮んな勢いの卦。力が漲る時。ただし暴走しがちで、礼を踏まえた抑制が肝心です。" },
  { no: 35, name: "火地晋", reading: "かちしん", symbol: "䷢", upper: "火", lower: "地", binary: "101000", judgement: "康侯用て馬を錫う蕃庶、昼日三たび接す。", interpretation: "進み栄える卦。地上に太陽が昇る勢い。誠を尽くせば信頼と地位がともに高まります。" },
  { no: 36, name: "地火明夷", reading: "ちかめいい", symbol: "䷣", upper: "地", lower: "火", binary: "000101", judgement: "艱貞に利あり。", interpretation: "明智が傷つく卦。光が地に沈む時。才能を隠し、ひそかに正道を守ることで難を逃れます。" },
  { no: 37, name: "風火家人", reading: "ふうかかじん", symbol: "䷤", upper: "風", lower: "火", binary: "110101", judgement: "女の貞に利あり。", interpretation: "家庭の卦。内を整える時。家族・身内の秩序を正すことが、外の事業の基礎となります。" },
  { no: 38, name: "火沢睽", reading: "かたくけい", symbol: "䷥", upper: "火", lower: "沢", binary: "101011", judgement: "小事に吉。", interpretation: "そむき離れる卦。意見・利害の対立がある時。小事から共通点を探し、信頼を回復しましょう。" },
  { no: 39, name: "水山蹇", reading: "すいざんけん", symbol: "䷦", upper: "水", lower: "山", binary: "010100", judgement: "西南に利あり、東北に利あらず。大人を見るに利あり。", interpretation: "歩み難しの卦。進路に障害が多い時。無理せず助けを借り、迂回することで活路が開けます。" },
  { no: 40, name: "雷水解", reading: "らいすいかい", symbol: "䷧", upper: "雷", lower: "水", binary: "001010", judgement: "西南に利あり。往く所なければ、其の来復吉。", interpretation: "解き放たれる卦。困難が去り、雪解けの時。素早く動き、滞りを片付けるのが吉。" },
  { no: 41, name: "山沢損", reading: "さんたくそん", symbol: "䷨", upper: "山", lower: "沢", binary: "100011", judgement: "孚ありて元いに吉、咎なし、貞しくすべし。", interpretation: "損して益する卦。下を削り上を益す。一時的な犠牲が将来の大きな利となる時です。" },
  { no: 42, name: "風雷益", reading: "ふうらいえき", symbol: "䷩", upper: "風", lower: "雷", binary: "110001", judgement: "往く所あるに利あり、大川を渉るに利あり。", interpretation: "益する卦。上を損じて下を益す、好循環の時。攻めの一手が大きな利益を呼びます。" },
  { no: 43, name: "沢天夬", reading: "たくてんかい", symbol: "䷪", upper: "沢", lower: "天", binary: "011111", judgement: "王庭に揚ぐ、孚にして号び、厲うきあり。", interpretation: "決断・断行の卦。残った悪を断つ時。情に流されず公明正大に処断すべき局面です。" },
  { no: 44, name: "天風姤", reading: "てんぷうこう", symbol: "䷫", upper: "天", lower: "風", binary: "111110", judgement: "女壮ん、女を取るに用うる勿れ。", interpretation: "邂逅の卦。思わぬ出会い・誘惑の時。一見魅力的でも、深入りすれば災いを招くことがあります。" },
  { no: 45, name: "沢地萃", reading: "たくちすい", symbol: "䷬", upper: "沢", lower: "地", binary: "011000", judgement: "亨る。王仮ありて廟あり、大人を見るに利あり、亨る。", interpretation: "集まる卦。人・物・志が結集する時。中心となる旗印を立てれば、大事業も成せます。" },
  { no: 46, name: "地風升", reading: "ちふうしょう", symbol: "䷭", upper: "地", lower: "風", binary: "000110", judgement: "元いに亨る、大人を見るに用う、恤うる勿れ。南征して吉。", interpretation: "昇り進む卦。地中から芽が伸びるように着実に成長する時。一歩ずつ確実に進みましょう。" },
  { no: 47, name: "沢水困", reading: "たくすいこん", symbol: "䷮", upper: "沢", lower: "水", binary: "011010", judgement: "亨る。貞しき大人は吉、咎なし。言ありて信ぜられず。", interpretation: "困窮の卦。八方塞がりの苦境。言葉では伝わらず、行動と忍耐で誠を示すしかない時です。" },
  { no: 48, name: "水風井", reading: "すいふうせい", symbol: "䷯", upper: "水", lower: "風", binary: "010110", judgement: "邑を改めて井を改めず、喪うなく得るなし。", interpretation: "井戸の卦。普遍的な恵みの源。変わらぬ価値を守り、誰にも汲ませる懐の深さが運を呼びます。" },
  { no: 49, name: "沢火革", reading: "たくかかく", symbol: "䷰", upper: "沢", lower: "火", binary: "011101", judgement: "已の日にして乃ち孚あり。元いに亨る、貞しきに利あり、悔亡ぶ。", interpretation: "変革の卦。古いものを脱ぎ捨て新たに生まれ変わる時。決意を固め、機を逃さず改革を断行すべき。" },
  { no: 50, name: "火風鼎", reading: "かふうてい", symbol: "䷱", upper: "火", lower: "風", binary: "101110", judgement: "元いに吉、亨る。", interpretation: "鼎の卦。新体制の確立。革(49)で古きを去り、鼎で新しき秩序を煮込み定着させる時です。" },
  { no: 51, name: "震為雷", reading: "しんいらい", symbol: "䷲", upper: "雷", lower: "雷", binary: "001001", judgement: "亨る。震来たりて虩虩、笑い言啞啞、震百里を驚かす。", interpretation: "震動の卦。突然の衝撃や驚き。動揺せず内省し、平静を保てる者が信頼を得ます。" },
  { no: 52, name: "艮為山", reading: "ごんいさん", symbol: "䷳", upper: "山", lower: "山", binary: "100100", judgement: "其の背に艮まり、其の身を獲ず。其の庭に行きて其の人を見ず、咎なし。", interpretation: "止まる卦。動かず静止すべき時。腰を落ち着け、雑念を断ち切ることで内なる強さが養われます。" },
  { no: 53, name: "風山漸", reading: "ふうざんぜん", symbol: "䷴", upper: "風", lower: "山", binary: "110100", judgement: "女帰ぐに吉。貞しきに利あり。", interpretation: "漸進の卦。順序を踏んで進む時。一気に飛ばず、段階を踏むことで確実な成果が得られます。" },
  { no: 54, name: "雷沢帰妹", reading: "らいたくきまい", symbol: "䷵", upper: "雷", lower: "沢", binary: "001011", judgement: "征くは凶、利しき所なし。", interpretation: "順序を欠く嫁ぎの卦。立場・順序が乱れる時。性急な行動は禍を招きます。慎重に立場を見極めて。" },
  { no: 55, name: "雷火豊", reading: "らいかほう", symbol: "䷶", upper: "雷", lower: "火", binary: "001101", judgement: "亨る。王之に仮る、憂うる勿れ、日中に宜し。", interpretation: "豊かさの極み。盛運の時。ただし日中は必ず傾くので、絶頂のうちに次の備えをしておくべき。" },
  { no: 56, name: "火山旅", reading: "かざんりょ", symbol: "䷷", upper: "火", lower: "山", binary: "101100", judgement: "小しく亨る。旅は貞にして吉。", interpretation: "旅人の卦。身を寄せる場のない状況。慎ましく謙虚に振る舞えば、行く先々で助けを得られます。" },
  { no: 57, name: "巽為風", reading: "そんいふう", symbol: "䷸", upper: "風", lower: "風", binary: "110110", judgement: "小しく亨る。往く所あるに利あり、大人を見るに利あり。", interpretation: "従順・浸透の卦。風のように柔らかく入り込む時。強引でなく、徐々に影響を広げるべきです。" },
  { no: 58, name: "兌為沢", reading: "だいたく", symbol: "䷹", upper: "沢", lower: "沢", binary: "011011", judgement: "亨る、貞しきに利あり。", interpretation: "悦びの卦。喜び・交流が広がる時。ただし口先だけの調子に流されず、誠を保つことが大切です。" },
  { no: 59, name: "風水渙", reading: "ふうすいかん", symbol: "䷺", upper: "風", lower: "水", binary: "110010", judgement: "亨る。王仮ありて廟あり、大川を渉るに利あり、貞しきに利あり。", interpretation: "離散・拡散の卦。固まっていたものが散る時。組織の風通しを良くし、新たな求心力を立てる好機。" },
  { no: 60, name: "水沢節", reading: "すいたくせつ", symbol: "䷻", upper: "水", lower: "沢", binary: "010011", judgement: "亨る。苦節は貞しくす可からず。", interpretation: "節度の卦。けじめをつける時。ただし過度な節制は続かないので、ほどよい節を心がけるべき。" },
  { no: 61, name: "風沢中孚", reading: "ふうたくちゅうふ", symbol: "䷼", upper: "風", lower: "沢", binary: "110011", judgement: "豚魚にして吉。大川を渉るに利あり、貞しきに利あり。", interpretation: "誠が中に満ちる卦。真心が人を動かす時。誠実さが何よりの武器となり、難局も突破できます。" },
  { no: 62, name: "雷山小過", reading: "らいざんしょうか", symbol: "䷽", upper: "雷", lower: "山", binary: "001100", judgement: "亨る、貞しきに利あり。小事に可なり、大事に可ならず。", interpretation: "小しく過ぎる卦。控えめに少し過ぎる程度が吉。大事を企てず、小事を丁寧に処理すべき時。" },
  { no: 63, name: "水火既済", reading: "すいかきせい", symbol: "䷾", upper: "水", lower: "火", binary: "010101", judgement: "亨る、小しく貞しきに利あり。初めは吉、終わりは乱る。", interpretation: "既に成し遂げた卦。完成の時。だが安心するとほころびが生じる。終わり良ければで気を抜かないこと。" },
  { no: 64, name: "火水未済", reading: "かすいびせい", symbol: "䷿", upper: "火", lower: "水", binary: "101010", judgement: "亨る。小狐汔んど済らんとして、其の尾を濡らす、利しき所なし。", interpretation: "未だ済らずの卦。完成直前で躓きやすい時。最後の最後まで慎重に、油断せず仕上げるべきです。" },
];

export const HEXAGRAM_BY_BINARY = new Map(HEXAGRAMS.map((h) => [h.binary, h]));

export function findByLines(lines: LineType[]): Hexagram {
  const binary = lines
    .map((l) => (l === "youngYang" || l === "oldYang" ? "1" : "0"))
    .reverse()
    .join("");
  return HEXAGRAM_BY_BINARY.get(binary)!;
}

export function transformLines(lines: LineType[]): LineType[] | null {
  const hasChange = lines.some((l) => l === "oldYang" || l === "oldYin");
  if (!hasChange) return null;
  return lines.map((l) => {
    if (l === "oldYang") return "youngYin";
    if (l === "oldYin") return "youngYang";
    return l;
  });
}
