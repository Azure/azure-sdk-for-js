import { JSDOM } from "jsdom";

let { window } = new JSDOM();
self.document = window.document;
self.DOMParser = window.DOMParser;
self.XMLSerializer = window.XMLSerializer;
self.Node = window.Node;
