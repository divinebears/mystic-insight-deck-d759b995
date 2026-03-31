const BASE = 'https://img1.wsimg.com/isteam/ip/5d9ea9ac-1316-46e6-9fc9-1799679168d0';
export const CARD_BACK = `${BASE}/RGL_back.jpg`;

export interface LenormandCard {
  id: number;
  number: number;
  name: string;
  image: string;
  keywords: string[];
  narrative: string;
}

export const DECK: LenormandCard[] = [
  { id:1, number:1, name:'Rider', image:`${BASE}/RGL_1_Rider.jpg`, keywords:['news','visitor','speed'], narrative:'A message arrives swiftly.' },
  { id:2, number:2, name:'Clover', image:`${BASE}/RGL_2_Clover.jpg`, keywords:['luck','opportunity','small joy'], narrative:'Fortune smiles briefly.' },
  { id:3, number:3, name:'Ship', image:`${BASE}/RGL_3_Ship.jpg`, keywords:['journey','commerce','distance'], narrative:'A voyage beckons.' },
  { id:4, number:4, name:'House', image:`${BASE}/RGL_4_House.jpg`, keywords:['home','family','stability'], narrative:'The hearth provides answers.' },
  { id:5, number:5, name:'Tree', image:`${BASE}/RGL_5_Tree.jpg`, keywords:['health','growth','roots'], narrative:'Deep roots reveal truth.' },
  { id:6, number:6, name:'Clouds', image:`${BASE}/RGL_6_Clouds.jpg`, keywords:['confusion','doubt','uncertainty'], narrative:'Fog obscures the path.' },
  { id:7, number:7, name:'Snake', image:`${BASE}/RGL_7_Snake.jpg`, keywords:['betrayal','deception','complexity'], narrative:'Treachery slithers near.' },
  { id:8, number:8, name:'Coffin', image:`${BASE}/RGL_8_Coffin.jpg`, keywords:['ending','transformation','loss'], narrative:'Something must end.' },
  { id:9, number:9, name:'Bouquet', image:`${BASE}/RGL_9_Bouquet.jpg`, keywords:['gift','beauty','invitation'], narrative:'Beauty reveals kindness.' },
  { id:10, number:10, name:'Scythe', image:`${BASE}/RGL_10_Scythe.jpg`, keywords:['danger','sudden change','decision'], narrative:'A swift cut changes fate.' },
  { id:11, number:11, name:'Whip', image:`${BASE}/RGL_11_Whip.jpg`, keywords:['conflict','repetition','debate'], narrative:'Tensions rise in argument.' },
  { id:12, number:12, name:'Birds', image:`${BASE}/RGL_12_Birds.jpg`, keywords:['communication','gossip','anxiety'], narrative:'Whispers carry secrets.' },
  { id:13, number:13, name:'Child', image:`${BASE}/RGL_13_Child.jpg`, keywords:['innocence','new beginning','small'], narrative:'A fresh start emerges.' },
  { id:14, number:14, name:'Fox', image:`${BASE}/RGL_14_Fox.jpg`, keywords:['cunning','deception','employment'], narrative:'Cleverness masks true intent.' },
  { id:15, number:15, name:'Bear', image:`${BASE}/RGL_15_Bear.jpg`, keywords:['power','authority','protection'], narrative:'Strength guards the way.' },
  { id:16, number:16, name:'Stars', image:`${BASE}/RGL_16_Stars.jpg`, keywords:['hope','guidance','spirituality'], narrative:'The stars illuminate truth.' },
  { id:17, number:17, name:'Stork', image:`${BASE}/RGL_17_Stork.jpg`, keywords:['change','relocation','improvement'], narrative:'Winds of change blow.' },
  { id:18, number:18, name:'Dog', image:`${BASE}/RGL_18_Dog.jpg`, keywords:['loyalty','friendship','trust'], narrative:'A loyal ally appears.' },
  { id:19, number:19, name:'Tower', image:`${BASE}/RGL_19_Tower.jpg`, keywords:['authority','institution','isolation'], narrative:'The tower holds secrets.' },
  { id:20, number:20, name:'Garden', image:`${BASE}/RGL_20_Garden.jpg`, keywords:['society','gathering','public'], narrative:'The public square reveals.' },
  { id:21, number:21, name:'Mountain', image:`${BASE}/RGL_21_Mountain.jpg`, keywords:['obstacle','delay','challenge'], narrative:'An obstacle blocks progress.' },
  { id:22, number:22, name:'Crossroads', image:`${BASE}/RGL_22_Crossroads.jpg`, keywords:['choice','options','decision'], narrative:'The path divides before you.' },
  { id:23, number:23, name:'Mice', image:`${BASE}/RGL_23_Mice.jpg`, keywords:['loss','worry','theft'], narrative:'Something precious diminishes.' },
  { id:24, number:24, name:'Heart', image:`${BASE}/RGL_24_Heart.jpg`, keywords:['love','passion','romance'], narrative:'The heart speaks loudly.' },
  { id:25, number:25, name:'Ring', image:`${BASE}/RGL_25_Ring.jpg`, keywords:['commitment','contract','cycle'], narrative:'A bond is sealed.' },
  { id:26, number:26, name:'Book', image:`${BASE}/RGL_26_Book.jpg`, keywords:['secret','knowledge','education'], narrative:'Hidden knowledge surfaces.' },
  { id:27, number:27, name:'Letter', image:`${BASE}/RGL_27_Letter.jpg`, keywords:['message','document','news'], narrative:'A document holds the key.' },
  { id:28, number:28, name:'Gentleman', image:`${BASE}/RGL_28_Man1-dca916b.jpg`, keywords:['male querent','significant man'], narrative:'A man of importance enters.' },
  { id:29, number:29, name:'Lady', image:`${BASE}/RGL_29_Woman1.jpg`, keywords:['female querent','significant woman'], narrative:'A woman of power arrives.' },
  { id:30, number:30, name:'Lilies', image:`${BASE}/RGL_30_Lilies.jpg`, keywords:['maturity','wisdom','sensuality'], narrative:'Wisdom blooms with age.' },
  { id:31, number:31, name:'Sun', image:`${BASE}/RGL_31_Sun.jpg`, keywords:['success','happiness','vitality'], narrative:'Light banishes shadow.' },
  { id:32, number:32, name:'Moon', image:`${BASE}/RGL_32_Moon.jpg`, keywords:['emotions','intuition','recognition'], narrative:'The moon reveals what is hidden.' },
  { id:33, number:33, name:'Key', image:`${BASE}/RGL_33_Key.jpg`, keywords:['solution','certainty','achievement'], narrative:'The answer unlocks itself.' },
  { id:34, number:34, name:'Fish', image:`${BASE}/RGL_34_Fish.jpg`, keywords:['finances','abundance','independence'], narrative:'Resources flow freely.' },
  { id:35, number:35, name:'Anchor', image:`${BASE}/RGL_35_Anchor.jpg`, keywords:['stability','perseverance','work'], narrative:'Steadfast determination prevails.' },
  { id:36, number:36, name:'Cross', image:`${BASE}/RGL_36_Cross.jpg`, keywords:['burden','faith','destiny'], narrative:'Fate weighs heavily.' },
  { id:37, number:37, name:'Spirit', image:`${BASE}/RGL_37_Spirit.jpg`, keywords:['spirit','supernatural','guidance'], narrative:'The spirit world reaches out.' },
  { id:38, number:38, name:'Incense Burner', image:`${BASE}/RGL_38_Incense%20Burner.jpg`, keywords:['ritual','prayer','purification'], narrative:'Sacred smoke carries prayers.' },
  { id:39, number:39, name:'Bed', image:`${BASE}/RGL_39_Bed.jpg`, keywords:['rest','intimacy','dreams'], narrative:'Dreams reveal hidden truths.' },
  { id:40, number:40, name:'Market', image:`${BASE}/RGL_40_Market.jpg`, keywords:['trade','exchange','abundance'], narrative:'The marketplace buzzes with secrets.' },
];

export function shuffleDeck(): LenormandCard[] {
  const d = [...DECK];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

export function drawCards(count: number, excludeIds: number[] = []): LenormandCard[] {
  const available = DECK.filter(c => !excludeIds.includes(c.id));
  const shuffled = [...available];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export function getCardByName(name: string): LenormandCard | undefined {
  return DECK.find(c => c.name.toLowerCase() === name.toLowerCase());
}
