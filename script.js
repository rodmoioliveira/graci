const {
  fromEvent,
  interval,
  operators: { filter },
} = rxjs;

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const [init_st_soy, init_st_ser, init_st_images] = [
  quotes_yo_soy,
  quotes_quiero_ser,
  quotes_images,
].map((arr) => arr.map((_, i) => i));

let [idx_soy, idx_ser, idx_images] = [
  [...init_st_soy],
  [...init_st_ser],
  [...init_st_images],
];
let shuffle = true;
const dom_soy = document.getElementById('soy');
const dom_ser = document.getElementById('ser');
const dom_images = document.getElementById('images');
const toogleShuffle = () => {
  shuffle = !shuffle;
};

const get_index = (idx, initial_state) => {
  if (!idx.length) {
    idx.splice(0, 0, ...initial_state);
  }
  const i = random(0, idx.length - 1);
  const int = idx[i];
  idx.splice(i, 1);
  return int;
};

const handle = () => {
  const int_soy = get_index(idx_soy, init_st_soy);
  const int_ser = get_index(idx_ser, init_st_ser);
  const int_images = get_index(idx_images, init_st_images);

  dom_soy.innerText = `${quotes_yo_soy[int_soy]}`;
  dom_ser.innerText = `${quotes_quiero_ser[int_ser]}`;
  dom_images.src = `./images/${quotes_images[int_images]}`;
};

const interaction = () => {
  interval(400)
    .pipe(filter(() => shuffle))
    .subscribe(handle);
  fromEvent(document, 'click').subscribe(toogleShuffle);
};

interaction();
