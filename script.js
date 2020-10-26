const {
  fromEvent,
  interval,
  operators: { filter },
} = rxjs;

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const linearMap = (in_min, in_max, out_min, out_max) => (num) =>
  Math.floor(
    ((num - in_min) * (out_max - out_min)) / (in_max - in_min) +
      out_min
  );

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
const images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const mapQuotesImages = linearMap(0, quotes.length, 0, images.length);
const initialState = quotes.map((_, i) => i);
let idx = [...initialState];
let shuffle = true;
const qDom = document.getElementById('quotes');
const iDom = document.getElementById('images');
const toogleShuffle = () => {
  shuffle = !shuffle;
};

const handle = () => {
  if (!idx.length) {
    idx = [...initialState];
  }
  const i = random(0, idx.length - 1);
  const int = idx[i];
  idx = [...idx.slice(0, i), ...idx.slice(i + 1)];

  const q = quotes[int];
  const img = `./images/${mapQuotesImages(int)}.jpg`;
  qDom.innerHTML = `${q}!`;
  iDom.src = img;
};

const interaction = () => {
  interval(400)
    .pipe(filter(() => shuffle))
    .subscribe(handle);
  fromEvent(document, 'click').subscribe(toogleShuffle);
};

interaction();
