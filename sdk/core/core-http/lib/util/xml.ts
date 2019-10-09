// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as xml2js from "xml2js";
import { Constants } from "./constants";
const xmlbuilder: any = require("xmlbuilder");

// Note: The reason we re-define all of the xml2js default settings (version 2.0) here is because the default settings object exposed
// by the xm2js library is mutable. See https://github.com/Leonidas-from-XIV/node-xml2js/issues/536
// By creating a new copy of the settings each time we instantiate the parser,
// we are safeguarding against the possibility of the default settings being mutated elsewhere unintentionally.
const xml2jsDefaults = {
  explicitCharkey: false,
  trim: false,
  normalize: false,
  normalizeTags: false,
  attrkey: "$",
  charkey: "_",
  explicitArray: true,
  ignoreAttrs: false,
  mergeAttrs: false,
  explicitRoot: true,
  validator: null,
  xmlns: false,
  explicitChildren: false,
  preserveChildrenOrder: false,
  childkey: "$$",
  charsAsChildren: false,
  includeWhiteChars: false,
  async: false,
  strict: true,
  attrNameProcessors: null,
  attrValueProcessors: null,
  tagNameProcessors: null,
  valueProcessors: null,
  rootName: "root",
  xmldec: {
    version: "1.0",
    encoding: "UTF-8",
    standalone: true
  },
  doctype: null,
  renderOpts: {
    pretty: true,
    indent: "  ",
    newline: "\n"
  },
  headless: false,
  chunkSize: 10000,
  emptyTag: "",
  cdata: false
};

export function stringifyXML(obj: any, opts?: { rootName?: string }) {
  const builder = new xml2js.Builder({
    explicitArray: false,
    explicitCharkey: false,
    rootName: (opts || {}).rootName,
    renderOpts: {
      pretty: false
    }
  });
  return builder.buildObject(obj);
}

export function parseXML(str: string): Promise<any> {
  const xmlParser = new xml2js.Parser(getDefaultSettings());
  const result = new Promise((resolve, reject) => {
    if (!str) {
      reject(new Error("Document is empty"));
    } else {
      xmlParser.parseString(str, (err?: Error, res?: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    }
  });
  return result;
}

/**
 * The XML body to convert to JSON
 * @param body
 */
export async function convertAtomXmlToJson(body: string): Promise<any> {
  const parser = new xml2js.Parser(getDefaultSettingsForAtomXmlOperations());
  const result = await new Promise((resolve, reject) => {
    parser.parseString(removeBOM(body.toString()), function(err: any, parsedBody: any) {
      if (err) {
        reject(err);
      } else {
        resolve(parsedBody);
      }
    });
  });
  return result;
}

/**
 * @param content The content as it is to be serialized. It should include any root node(s).
 */
export function convertJsonToAtomXml(content: any): string {
  content[Constants.XML_METADATA_MARKER] = { type: "application/xml" };

  let doc = xmlbuilder.create();

  doc = doc
    .begin("entry", { version: "1.0", encoding: "utf-8", standalone: "yes" })
    .att("xmlns", "http://www.w3.org/2005/Atom");

  doc = doc.ele("updated", new Date().toISOString()).up();

  doc = writeElementValue(doc, "content", content);
  return doc.doc().toString();
}

/**
 * @ignore
 * Gets the default xml2js settings applicable for Atom based XML operations.
 */
function getDefaultSettingsForAtomXmlOperations(): any {
  const xml2jsSettings = Object.assign({}, xml2jsDefaults);
  xml2jsSettings.normalize = false;
  xml2jsSettings.trim = false;
  xml2jsSettings.attrkey = "$";
  xml2jsSettings.charkey = "_";
  xml2jsSettings.explicitCharkey = false;
  xml2jsSettings.explicitArray = false;
  return xml2jsSettings;
}

/**
 * @ignore
 * Gets the default settings applicable for general XML operations.
 */
function getDefaultSettings(): any {
  const xml2jsSettings = Object.assign({}, xml2jsDefaults);
  xml2jsSettings.explicitArray = false;
  xml2jsSettings.explicitCharkey = false;
  xml2jsSettings.explicitRoot = false;
  return xml2jsSettings;
}

/**
 * @ignore
 * Helper utility to clean up unintended characters that get appended by OS.
 * @param str
 */
function removeBOM(str: string) {
  if (str.charCodeAt(0) === 0xfeff || str.charCodeAt(0) === 0xffef) {
    str = str.substring(1);
  }

  return str;
}

/**
 *
 * @ignore
 * Writes a single property for an entry or complex type.
 *
 * @param {object} parentElement         Parent DOM element under which the property should be added.
 * @param {string} name                  Property name.
 * @param {object} value                 Property value.
 * @return {object} The current DOM element.
 *
 */
function writeElementValue(parentElement: any, name: any, value: any): any {
  let ignored = false;
  const propertyTagName = name;

  if (
    typeof value !== "string" &&
    typeof value === "object" &&
    Object.prototype.toString.call(value) !== "[object Date]"
  ) {
    if (Array.isArray(value) && value.length > 0) {
      // Example:
      // JSON: element: [ { property1: 'hi there' }, { property2: 'hello there' } ]
      // XML: <element><property1>hi there</property1></element><element><property2>hello there</property2></element>

      Object.keys(value).forEach(function(i: any) {
        parentElement = writeElementValue(parentElement, name, value[i]);
      });

      // For an array no element was actually added at this level, so skip uping level.
      ignored = true;
    } else if (
      value[Constants.XML_METADATA_MARKER] !== undefined &&
      value[Constants.XML_VALUE_MARKER] !== undefined
    ) {
      // Example:
      // JSON: element: { '$': { 'm:type' = 'Edm.String' }, '_': 'hi there' }
      // XML: <element m:type="Edm.String">hi there</element>

      parentElement = parentElement.ele(propertyTagName);
      if (value[Constants.XML_VALUE_MARKER]) {
        parentElement = parentElement.raw(value[Constants.XML_VALUE_MARKER]);
      }
    } else {
      // Example:
      // JSON: element: { '$': { 'metadata' = 'value' }, 'property1': 'hi there', 'property2': 'hello there' }
      // XML: <element metadata="value"><property1>hi there</property1><property2>hello there</property2></element>

      parentElement = parentElement.ele(propertyTagName);
      Object.keys(value).forEach((propertyName: string) => {
        if (propertyName !== Constants.XML_METADATA_MARKER && value.hasOwnProperty(propertyName)) {
          parentElement = writeElementValue(parentElement, propertyName, value[propertyName]);
        }
      });
    }
  } else {
    if (value != undefined) {
      parentElement = parentElement.ele(propertyTagName);
      parentElement = parentElement.raw(value.toString());
    } else {
      parentElement = parentElement.ele(propertyTagName, {}, undefined);
    }
  }

  if (value != undefined && value[Constants.XML_METADATA_MARKER]) {
    // include the metadata
    const attributeList = value[Constants.XML_METADATA_MARKER];
    Object.keys(attributeList).forEach(function(attribute) {
      parentElement = parentElement.att(attribute, attributeList[attribute]);
    });
  }

  if (!ignored) {
    parentElement = parentElement.up();
  }

  return parentElement;
}
