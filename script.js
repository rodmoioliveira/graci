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

const allImages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const mapQuotesImages = liner_map(
  0,
  quotes_yo_soy.length,
  0,
  allImages.length
);

const [init_st_soy, init_st_ser] = [
  quotes_yo_soy,
  quotes_quiero_ser,
].map((arr) => arr.map((_, i) => i));

let [idx] = [[...init_st_soy], [...init_st_ser]];
let shuffle = true;
const dom_soy = document.getElementById('soy');
const dom_ser = document.getElementById('ser');
const dom_images = document.getElementById('images');
const toogleShuffle = () => {
  shuffle = !shuffle;
};

const aa = () => {
  if (!idx.length) {
    idx = [...init_st_soy];
  }
  const i = random(0, idx.length - 1);
  const int = idx[i];
  idx = [...idx.slice(0, i), ...idx.slice(i + 1)];
  return int;
};

const handle = () => {
  const int = aa();

  const q = quotes_yo_soy[int];
  const img = `./images/${mapQuotesImages(int)}.jpg`;
  dom_soy.innerHTML = `${q}`;
  dom_images.src = img;
};

const interaction = () => {
  interval(400)
    .pipe(filter(() => shuffle))
    .subscribe(handle);
  fromEvent(document, 'click').subscribe(toogleShuffle);
};

interaction();
