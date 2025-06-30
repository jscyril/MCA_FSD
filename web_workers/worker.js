function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

self.onmessage = function (e) {
  const n = e.data;
  const result = fib(n);
  self.postMessage(result);
};
