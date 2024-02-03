// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { XMLBuilder, XMLParser, XMLValidator } from "fast-xml-parser";
import { XML_ATTRKEY, XML_CHARKEY, type XmlOptions } from "./xml.common.js";

function getCommonOptions(options: XmlOptions): {
  attributesGroupName: string;
  textNodeName: string;
  ignoreAttributes: boolean;
  suppressBooleanAttributes: boolean;
} {
  return {
    attributesGroupName: XML_ATTRKEY,
    textNodeName: options.xmlCharKey ?? XML_CHARKEY,
    ignoreAttributes: false,
    suppressBooleanAttributes: false,
  };
}

function getSerializerOptions(options: XmlOptions = {}): {
  attributesGroupName: string;
  textNodeName: string;
  ignoreAttributes: boolean;
  suppressBooleanAttributes: boolean;
  attributeNamePrefix: string;
  format: boolean;
  suppressEmptyNode: boolean;
  indentBy: string;
  rootNodeName: string;
  cdataPropName: string;
} {
  return {
    ...getCommonOptions(options),
    attributeNamePrefix: "@_",
    format: true,
    suppressEmptyNode: true,
    indentBy: "",
    rootNodeName: options.rootName ?? "root",
    cdataPropName: options.cdataPropName ?? "__cdata",
  };
}

function getParserOptions(options: XmlOptions = {}): {
  attributesGroupName: string;
  textNodeName: string;
  ignoreAttributes: boolean;
  suppressBooleanAttributes: boolean;
  parseAttributeValue: boolean;
  parseTagValue: boolean;
  attributeNamePrefix: string;
  stopNodes?: string[];
  processEntities: boolean;
} {
  return {
    ...getCommonOptions(options),
    parseAttributeValue: false,
    parseTagValue: false,
    attributeNamePrefix: "",
    stopNodes: options.stopNodes,
    processEntities: true,
  };
}
/**
 * Converts given JSON object to XML string
 * @param obj - JSON object to be converted into XML string
 * @param opts - Options that govern the XML building of given JSON object
 * `rootName` indicates the name of the root element in the resulting XML
 */
export function stringifyXML(obj: unknown, opts: XmlOptions = {}): string {
  const parserOptions = getSerializerOptions(opts);
  const j2x = new XMLBuilder(parserOptions);

  const node = { [parserOptions.rootNodeName]: obj };

  const xmlData: string = j2x.build(node);
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${xmlData}`.replace(/\n/g, "");
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

  const validation = XMLValidator.validate(str);

  if (validation !== true) {
    throw validation;
  }

  const parser = new XMLParser(getParserOptions(opts));
  const parsedXml = parser.parse(str);

  // Remove the <?xml version="..." ?> node.
  // This is a change in behavior on fxp v4. Issue #424
  if (parsedXml["?xml"]) {
    delete parsedXml["?xml"];
  }

  if (!opts.includeRoot) {
    for (const key of Object.keys(parsedXml)) {
      const value = parsedXml[key];
      return typeof value === "object" ? { ...value } : value;
    }
  }

  return parsedXml;
}
