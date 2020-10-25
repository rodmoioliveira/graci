const {
  fromEvent,
  interval,
  operators: { filter },
} = rxjs;

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const quotes = [
  'linda',
  'foda',
  'maravilhosa',
  'inteligente',
  'descolada',
  'carinhosa',
  'guerreira',
  'um mulherão da porra',
  'determinada',
  'valorosa',
  'especial',
  'viciada em biscoitos',
];
const initialState = quotes.map((_, i) => i);
let idx = [...initialState];
let shuffle = true;
const qDom = document.getElementById('quotes');
const toogleShuffle = () => {
  shuffle = !shuffle;
};

const handle = () => {
  console.log(idx);
  if (!idx.length) {
    idx = [...initialState];
  }
  const i = random(0, idx.length - 1);
  const int = idx[i];
  idx = [...idx.slice(0, i), ...idx.slice(i + 1)];

  const q = quotes[int];
  qDom.innerHTML = `${q}!`;
};

const interaction = () => {
  interval(300)
    .pipe(filter(() => shuffle))
    .subscribe(handle);
  fromEvent(document, 'click').subscribe(toogleShuffle);
};

interaction();
