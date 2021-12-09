// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { J2xOptions, j2xParser, parse, validate } from "fast-xml-parser";

import { XmlOptions } from "./xml.common";

const toXMLOptions: Partial<J2xOptions> = {
  attributeNamePrefix: "@_",
  textNodeName: "_",
  ignoreAttributes: false,
  format: true,
  supressEmptyNode: true,
  indentBy: ""
};

/**
 * Converts given JSON object to XML string
 * @param obj - JSON object to be converted into XML string
 * @param opts - Options that govern the XML building of given JSON object
 * `rootName` indicates the name of the root element in the resulting XML
 */
export function stringifyXML(obj: unknown, opts: XmlOptions = {}): string {
  const j2x = new j2xParser(toXMLOptions);
  const flattened = flattenAttributes(obj as any);
  let xml: string = j2x.parse(flattened);
  const rootName = opts?.rootName ?? "root";
  if (rootName) {
    xml = `<${rootName}>${xml}</${rootName}>`;
  }
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${xml}`.replace(/\n/g, "");
}

/**
 * Converts given XML string into JSON
 * @param str - String containing the XML content to be parsed into JSON
 * @param opts - Options that govern the parsing of given xml string
 * `includeRoot` indicates whether the root element is to be included or not in the output
 */
export async function parseXML(str: string, opts: XmlOptions = {}): Promise<any> {
  if (!str) {
    throw new Error("Document is empty");
  }

  const validation = validate(str);

  if (validation !== true) {
    throw validation;
  }

  const parsedXml = parse(str, {
    parseAttributeValue: true,
    ignoreAttributes: false,
    textNodeName: "_"
  });

  if (!opts.includeRoot) {
    for (const key of Object.keys(parsedXml)) {
      return groupAttributes(parsedXml[key]);
    }
  }

  return groupAttributes(parsedXml);
}

function flattenAttributes(obj: Record<string, any>) {
  const attributes: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === "$" && value instanceof Object) {
      for (const [attName, attValue] of Object.entries(value)) {
        attributes[`@_${attName}`] = String(attValue);
      }
      delete obj["$"];
      if (Object.keys(attributes).length) {
        obj = { ...obj, ...attributes };
      }
    } else if (value instanceof Object) {
      obj[key] = flattenAttributes(value);
    } else if (value === undefined) {
      obj[key] = null;
    }
  }

  return obj;
}

function groupAttributes(obj: Record<string, any>) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("@_")) {
      const attributeName = key.substr(2);
      if (!obj["$"]) {
        obj["$"] = {};
      }
      obj["$"][`${attributeName}`] = String(value);
      delete obj[key];
    } else if (value instanceof Object) {
      obj[key] = groupAttributes(value);
    }
  }

  return obj;
}
