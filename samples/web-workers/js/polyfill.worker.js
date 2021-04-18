const { JSDOM } = require("jsdom");

const { window } = new JSDOM();

if (!globalThis.document) {
  globalThis.document = window.document;
}

if (!globalThis.DOMParser) {
  globalThis.DOMParser = window.DOMParser;
}

if (!globalThis.XMLSerializer) {
  globalThis.XMLSerializer = window.XMLSerializer;
}

if (!globalThis.Node) {
  globalThis.Node = window.Node;
}
