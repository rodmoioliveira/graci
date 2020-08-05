const {
  fromEvent,
  interval,
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

const interaction = () => {
  const qDom = document.getElementById("quality");
  const randomize = interval(300).subscribe(() => {
    const q = quality[random(0, quality.length - 1)];
    qDom.innerHTML = `${q}!`;
  });

  fromEvent(document, "click").subscribe(() => {
    randomize.unsubscribe();

    setTimeout(() => {
      interaction();
    }, 2000)
  });
}

interaction();
