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

let shuffle = true;

const interaction = () => {
  const qDom = document.getElementById("quality");
  interval(300).pipe(filter(() => shuffle)).subscribe(() => {
    const int = random(0, quality.length - 1);
    const q = quality[int];
    qDom.innerHTML = `${q}!`;
  });
  fromEvent(document, "click").subscribe(() => {
    shuffle = !shuffle;
  })
}

interaction();
