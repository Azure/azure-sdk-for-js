// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as xml2js from "xml2js";
import { Constants } from "./constants";
import { isDate, isObject } from "./utils";
const xmlbuilder: any = require("xmlbuilder");

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
  const xmlParser = new xml2js.Parser({
    explicitArray: false,
    explicitCharkey: false,
    explicitRoot: false
  });
  return new Promise((resolve, reject) => {
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
}

export async function deserializeAtomXmlToJson(body: string): Promise<any> {
  let parsed;
  const parser = new xml2js.Parser(_getDefaultSettingsForAtomXmlOperations());
  await parser.parseString(_removeBOM(body.toString()), function(err: any, parsedBody: any) {
    if (err) {
      throw err;
    } else {
      parsed = parsedBody;
    }
  });
  return parsed;
}

/**
 * @param {object} content The content payload as it is to be serialized. It should include any root node(s).
 */
export function serializeJsonToAtomXml(content: any): string {
  content[Constants.XML_METADATA_MARKER] = { type: "application/xml" };

  let doc = xmlbuilder.create();

  doc = doc
    .begin("entry", { version: "1.0", encoding: "utf-8", standalone: "yes" })
    .att("xmlns", "http://www.w3.org/2005/Atom");

  doc = doc.ele("updated", new Date().toISOString()).up();

  doc = _writeElementValue(doc, "content", content);
  return doc.doc().toString();
}

/**
 * Gets the default xml2js settings applicable for Atom based XML operations.
 * @ignore
 * @return {object} The default settings
 */
function _getDefaultSettingsForAtomXmlOperations(): any {
  const xml2jsSettings = xml2js.defaults["0.2"];
  xml2jsSettings.normalize = false;
  xml2jsSettings.trim = false;
  xml2jsSettings.attrkey = "$";
  xml2jsSettings.charkey = "_";
  xml2jsSettings.explicitArray = false;
  xml2jsSettings.ignoreAttrs = true;

  return xml2jsSettings;
}

/**
 *
 * @param str Helper utility to clean up unintended characters that get appended by OS.
 */
function _removeBOM(str: any) {
  if (str.charCodeAt(0) === 0xfeff || str.charCodeAt(0) === 0xffef) {
    str = str.substring(1);
  }

  return str;
}

/*
 * Writes a single property for an entry or complex type.
 *
 * @param {object} parentElement         Parent DOM element under which the property should be added.
 * @param {string} name                  Property name.
 * @param {object} value                 Property value.
 * @return {object} The current DOM element.
 *
 * {Deprecated}
 */
function _writeElementValue(parentElement: any, name: any, value: any): any {
  let ignored = false;
  const propertyTagName = name;

  if (!contentIsUndefinedOrEmpty(value) && isObject(value) && !isDate(value)) {
    if (Array.isArray(value) && value.length > 0) {
      // Example:
      // JSON: element: [ { property1: 'hi there' }, { property2: 'hello there' } ]
      // XML: <element><property1>hi there</property1></element><element><property2>hello there</property2></element>

      Object.keys(value).forEach(function(i: any) {
        parentElement = _writeElementValue(parentElement, name, value[i]);
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
      if (!contentIsUndefinedOrEmpty(value[Constants.XML_VALUE_MARKER])) {
        if (new String(value[Constants.XML_VALUE_MARKER]).startsWith("<![CDATA[")) {
          parentElement = parentElement.raw(value[Constants.XML_VALUE_MARKER]);
        } else {
          parentElement = parentElement.txt(value[Constants.XML_VALUE_MARKER]);
        }
      }
    } else {
      // Example:
      // JSON: element: { '$': { 'metadata' = 'value' }, 'property1': 'hi there', 'property2': 'hello there' }
      // XML: <element metadata="value"><property1>hi there</property1><property2>hello there</property2></element>

      parentElement = parentElement.ele(propertyTagName);
      Object.keys(value).forEach((propertyName: string) => {
        if (propertyName !== Constants.XML_METADATA_MARKER && value.hasOwnProperty(propertyName)) {
          parentElement = _writeElementValue(parentElement, propertyName, value[propertyName]);
        }
      });
    }
  } else {
    parentElement = parentElement.ele(propertyTagName);
    if (!contentIsUndefinedOrEmpty(value)) {
      if (new String(value.toString().trim()).startsWith("<![CDATA[")) {
        parentElement = parentElement.raw(value.toString());
      } else {
        parentElement = parentElement.txt(value.toString());
      }
    }
  }

  if (value && value[Constants.XML_METADATA_MARKER]) {
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

/**
 * Determines whether the given `content` is an empty string or not.
 * @param {any} value Any entity
 * @return {boolean} - true if it is equivalent to an empty string, false otherwise.
 */
function contentIsUndefinedOrEmpty(content: any): boolean {
  return content == null || content === "";
}
