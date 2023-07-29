const data: { date: Date; close: number }[] = [];

let prev = 100;
const prevTimeStamp = new Date().getTime();
for (let i = 0; i < 1_000; i++) {
  prev += 5 - Math.random() * 10;
  if (prev < 0) prev = 0;
  data.push({ date: new Date(i * 10000 + prevTimeStamp), close: prev });
}
export const refined = data.slice();
