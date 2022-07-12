const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

tryThis().then(() => {

});
;


// expected output: "two"
async function tryThis() {
  const [p, q, t, r] = await Promise.race([promise1, promise2]);
  console.log("p", p)
  console.log("q", q);
  console.log("t", t)
  console.log("r", r);
}
