// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SerializerOptions, XML_ATTRKEY, XML_CHARKEY } from "./serializer.common";

if (!self.document || !self.DOMParser || !self.Node || !self.XMLSerializer) {
  throw new Error(
    `This library depends on the following DOM objects: ["document", "DOMParser", "Node", "XMLSerializer"] to parse XML, but some of these are undefined. You may provide a polyfill to make these globally available in order to support your environment. For more information, please refer to https://aka.ms/azsdk/js/web-workers. `
  );
}

let cachedDoc: Document | undefined;
function getDoc(): Document {
  if (!cachedDoc) {
    cachedDoc = document.implementation.createDocument(null, null, null);
  }
  return cachedDoc;
}

let cachedParser: DOMParser | undefined;
function getParser(): DOMParser {
  if (!cachedParser) {
    cachedParser = new DOMParser();
  }
  return cachedParser;
}

let cachedSerializer: XMLSerializer | undefined;
function getSerializer(): XMLSerializer {
  if (!cachedSerializer) {
    cachedSerializer = new XMLSerializer();
  }
  return cachedSerializer;
}

export function parseXML(str: string, opts: SerializerOptions = {}): Promise<any> {
  try {
    const updatedOptions: Required<SerializerOptions> = {
      rootName: opts.rootName ?? "",
      includeRoot: opts.includeRoot ?? false,
      xmlCharKey: opts.xmlCharKey ?? XML_CHARKEY,
    };
    const dom = getParser().parseFromString(str, "application/xml");
    throwIfError(dom);

    let obj;
    if (updatedOptions.includeRoot) {
      obj = domToObject(dom, updatedOptions);
    } else {
      obj = domToObject(dom.childNodes[0], updatedOptions);
    }

    return Promise.resolve(obj);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

let errorNS: string | undefined;

function getErrorNamespace(): string {
  if (errorNS === undefined) {
    try {
      errorNS =
        getParser().parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0]
          .namespaceURI! ?? "";
    } catch (ignored: any) {
      // Most browsers will return a document containing <parsererror>, but IE will throw.
      errorNS = "";
    }
  }
  return errorNS;
}

function throwIfError(dom: Document): void {
  const parserErrors = dom.getElementsByTagName("parsererror");
  if (parserErrors.length > 0 && getErrorNamespace()) {
    for (let i = 0; i < parserErrors.length; i++) {
      if (parserErrors[i].namespaceURI === errorNS) {
        throw new Error(parserErrors[i].innerHTML);
      }
    }
  }
}

function isElement(node: Node): node is Element {
  return !!(node as Element).attributes;
}

/**
 * Get the Element-typed version of the provided Node if the provided node is an element with
 * attributes. If it isn't, then undefined is returned.
 */
function asElementWithAttributes(node: Node): Element | undefined {
  return isElement(node) && node.hasAttributes() ? node : undefined;
}

function domToObject(node: Node, options: Required<SerializerOptions>): any {
  let result: any = {};

  const childNodeCount: number = node.childNodes.length;

  const firstChildNode: Node = node.childNodes[0];
  const onlyChildTextValue: string | undefined =
    (firstChildNode &&
      childNodeCount === 1 &&
      firstChildNode.nodeType === Node.TEXT_NODE &&
      firstChildNode.nodeValue) ||
    undefined;

  const elementWithAttributes: Element | undefined = asElementWithAttributes(node);
  if (elementWithAttributes) {
    result[XML_ATTRKEY] = {};

    for (let i = 0; i < elementWithAttributes.attributes.length; i++) {
      const attr = elementWithAttributes.attributes[i];
      result[XML_ATTRKEY][attr.nodeName] = attr.nodeValue;
    }

    if (onlyChildTextValue) {
      result[options.xmlCharKey] = onlyChildTextValue;
    }
  } else if (childNodeCount === 0) {
    result = "";
  } else if (onlyChildTextValue) {
    result = onlyChildTextValue;
  }

  if (!onlyChildTextValue) {
    for (let i = 0; i < childNodeCount; i++) {
      const child = node.childNodes[i];
      // Ignore leading/trailing whitespace nodes
      if (child.nodeType !== Node.TEXT_NODE) {
        const childObject: any = domToObject(child, options);
        if (!result[child.nodeName]) {
          result[child.nodeName] = childObject;
        } else if (Array.isArray(result[child.nodeName])) {
          result[child.nodeName].push(childObject);
        } else {
          result[child.nodeName] = [result[child.nodeName], childObject];
        }
      }
    }
  }

  return result;
}

export function stringifyXML(content: unknown, opts: SerializerOptions = {}): string {
  const updatedOptions: Required<SerializerOptions> = {
    rootName: opts.rootName ?? "root",
    includeRoot: opts.includeRoot ?? false,
    xmlCharKey: opts.xmlCharKey ?? XML_CHARKEY,
  };
  const dom = buildNode(content, updatedOptions.rootName, updatedOptions)[0];
  return (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    getSerializer().serializeToString(dom)
  );
}

function buildAttributes(attrs: { [key: string]: { toString(): string } }): Attr[] {
  const result = [];
  for (const key of Object.keys(attrs)) {
    const attr = getDoc().createAttribute(key);
    attr.value = attrs[key].toString();
    result.push(attr);
  }
  return result;
}

function buildNode(obj: any, elementName: string, options: Required<SerializerOptions>): Node[] {
  if (
    obj === undefined ||
    obj === null ||
    typeof obj === "string" ||
    typeof obj === "number" ||
    typeof obj === "boolean"
  ) {
    const elem = getDoc().createElement(elementName);
    elem.textContent = obj === undefined || obj === null ? "" : obj.toString();
    return [elem];
  } else if (Array.isArray(obj)) {
    const result = [];
    for (const arrayElem of obj) {
      for (const child of buildNode(arrayElem, elementName, options)) {
        result.push(child);
      }
    }
    return result;
  } else if (typeof obj === "object") {
    const elem = getDoc().createElement(elementName);
    for (const key of Object.keys(obj)) {
      if (key === XML_ATTRKEY) {
        for (const attr of buildAttributes(obj[key])) {
          elem.attributes.setNamedItem(attr);
        }
      } else if (key === options.xmlCharKey) {
        elem.textContent = obj[key].toString();
      } else {
        for (const child of buildNode(obj[key], key, options)) {
          elem.appendChild(child);
        }
      }
    }
    return [elem];
  } else {
    throw new Error(`Illegal value passed to buildObject: ${obj}`);
  }
}
