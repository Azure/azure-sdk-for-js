import storageBlob, { configureFallback } from "@azure/storage-blob";
import { DOMParser, XMLSerializer, DOMImplementation, Node } from "xmldom";
import { parseXML, stringifyXML } from "@azure/core-http";

configureFallback(
  DOMParser,
  XMLSerializer,
  {
    implementation: new DOMImplementation()
  },
  Node
);

console.log("hello from worker!", storageBlob);

const x = parseXML("<a><b x='f'>5</b></a>");
console.log("x", x);

const y = stringifyXML(x);
console.log("y", y);
