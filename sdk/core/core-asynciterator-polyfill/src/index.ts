// Async iterator's polyfill for Node 8
if (typeof Symbol === undefined || !(Symbol as any).asyncIterator) {
  (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
}
