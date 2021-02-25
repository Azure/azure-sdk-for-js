// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { XML_ATTRKEY, XML_CHARKEY, SerializerOptions } from "./serializer.common";

/**
 * Simple Lazy that allows for deferred value creation.
 * In the event of race conditions the last write wins.
 */
export class Lazy<T> {
  private valueFactory: () => T;
  private _value?: T;
  private valueFactoryCalled: boolean = false;

  /**
   * Creates a new instance of the Lazy.
   * @param valueFactory - The function that will be called to produce the value.
   */
  constructor(valueFactory: () => T) {
    this.valueFactory = valueFactory;
  }

  /**
   * Gets the value that was created, possibly invoking the valueFactory to create the value.
   */
  get value(): T {
    if (!this.valueFactoryCalled) {
      this._value = this.valueFactory();
      this.valueFactoryCalled = true;
    }
    return this._value!;
  }
}

export function parseXML(str: string, opts: SerializerOptions = {}): Promise<any> {
  try {
    const updatedOptions: Required<SerializerOptions> = {
      rootName: opts.rootName ?? "",
      includeRoot: opts.includeRoot ?? false,
      xmlCharKey: opts.xmlCharKey ?? XML_CHARKEY
    };
    const dom = parser.value.parseFromString(str, "application/xml");
    throwIfError(dom);

    let obj;
    if (updatedOptions.includeRoot) {
      obj = domToObject(dom, updatedOptions);
    } else {
      obj = domToObject(dom.childNodes[0], updatedOptions);
    }

    return Promise.resolve(obj);
  } catch (err) {
    return Promise.reject(err);
  }
}

let doc = new Lazy(() => {
  return document.implementation.createDocument(null, null, null);
});

let parser = new Lazy(() => new DOMParser());

let errorNS = new Lazy(() => {
  try {
    return (
      parser.value.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0]
        .namespaceURI! ?? ""
    );
  } catch (ignored) {
    // Most browsers will return a document containing <parsererror>, but IE will throw.
    return "";
  }
});

function throwIfError(dom: Document): void {
  const parserErrors = dom.getElementsByTagName("parsererror");
  if (parserErrors.length > 0 && errorNS.value) {
    for (let i = 0; i < parserErrors.length; i++) {
      if (parserErrors[i].namespaceURI === errorNS.value) {
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
      firstChildNode.nodeType === 3 &&
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
      if (child.nodeType !== 3) {
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
    xmlCharKey: opts.xmlCharKey ?? XML_CHARKEY
  };
  const dom = buildNode(content, updatedOptions.rootName, updatedOptions)[0];
  const serializer = new XMLSerializer();
  return (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + serializer.serializeToString(dom)
  );
}

function buildAttributes(attrs: { [key: string]: { toString(): string } }): Attr[] {
  const result = [];
  for (const key of Object.keys(attrs)) {
    const attr = doc.value.createAttribute(key);
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
    const elem = doc.value.createElement(elementName);
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
    const elem = doc.value.createElement(elementName);
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
