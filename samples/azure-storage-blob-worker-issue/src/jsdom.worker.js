import { XMLSerializer, Node, DOMParser, DOMImplementation } from "xmldom";
import { JSDOM } from "jsdom";

var dom = new JSDOM();
["document", "DOMParser", "XMLSerializer", "Node"].forEach((key) => {
  global[key] = dom.window[key];
});
