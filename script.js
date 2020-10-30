const {
  fromEvent,
  interval,
  operators: { filter },
} = rxjs;

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const liner_map = (in_min, in_max, out_min, out_max) => (num) =>
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
const allImages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const mapQuotesImages = liner_map(
  0,
  quotes.length,
  0,
  allImages.length
);
const initialState = quotes.map((_, i) => i);
let idx = [...initialState];
let shuffle = true;
const dom_soy = document.getElementById('soy');
const dom_ser = document.getElementById('ser');
const dom_images = document.getElementById('images');
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
  dom_soy.innerHTML = `${q}!`;
  dom_images.src = img;
};

const interaction = () => {
  interval(400)
    .pipe(filter(() => shuffle))
    .subscribe(handle);
  fromEvent(document, 'click').subscribe(toogleShuffle);
};

interaction();
