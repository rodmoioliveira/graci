const {
  fromEvent,
  interval,
  operators: { filter }
} = rxjs;

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const quality = [
  "linda",
  "foda",
  "maravilhosa",
  "inteligente",
  "descolada",
  "carinhosa",
  "guerreira",
  "um mulherão da porra",
  "determinada",
  "valorosa",
  "especial",
  "viciada em biscoitos"
];
let idx = quality.map((_, i) => i);
let display = [];
let shuffle = true;

const interaction = () => {
  const qDom = document.getElementById("quality");
  interval(300).pipe(filter(() => shuffle)).subscribe(() => {
    if (!idx.length) {
      idx = quality.map((_, i) => i);
    }
    const i = random(0, idx.length - 1);
    const int = idx[i];
    display.push(int);
    idx = [...idx.slice(0, i), ...idx.slice(i + 1)]

    const q = quality[int];
    qDom.innerHTML = `${q}!`;
  });
  fromEvent(document, "click").subscribe(() => {
    shuffle = !shuffle;
  })
}

interaction();
