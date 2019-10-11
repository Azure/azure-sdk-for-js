// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as xml2js from "xml2js";
import { Constants } from "./constants";

// Note: The reason we re-define all of the xml2js default settings (version 2.0) here is because the default settings object exposed
// by the xm2js library is mutable. See https://github.com/Leonidas-from-XIV/node-xml2js/issues/536
// By creating a new copy of the settings each time we instantiate the parser,
// we are safeguarding against the possibility of the default settings being mutated elsewhere unintentionally.
const xml2jsDefaultOptionsV2 = {
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

// The xml2js settings for general XML parsing operations.
const xml2jsParserSettings: any = Object.assign({}, xml2jsDefaultOptionsV2);
xml2jsParserSettings.explicitArray = false;
xml2jsParserSettings.explicitRoot = false;

// The xml2js settings for ATOM XML parsing operations.
const xml2jsParserSettingsForAtomXml: any = Object.assign({}, xml2jsDefaultOptionsV2);
xml2jsParserSettingsForAtomXml.explicitArray = false;

// The xml2js settings for general XML building operations.
const xml2jsBuilderSettings: any = Object.assign({}, xml2jsDefaultOptionsV2);
xml2jsBuilderSettings.explicitArray = false;
xml2jsBuilderSettings.renderOpts = {
  pretty: false
};

// The xml2js settings for ATOM XML building operations.
const xml2jsBuilderSettingsForAtomXML: any = Object.assign({}, xml2jsDefaultOptionsV2);
xml2jsBuilderSettingsForAtomXML.explicitRoot = false;
xml2jsBuilderSettingsForAtomXML.renderOpts = {
  pretty: false
};
xml2jsBuilderSettingsForAtomXML.xmldec = {
  version: "1.0",
  encoding: "utf-8",
  standalone: true
};

export function stringifyXML(obj: any, opts?: { rootName?: string }) {
  xml2jsBuilderSettings.rootName = (opts || {}).rootName;
  const builder = new xml2js.Builder(xml2jsBuilderSettings);
  return builder.buildObject(obj);
}

export function parseXML(str: string): Promise<any> {
  const xmlParser = new xml2js.Parser(xml2jsParserSettings);
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
  const parser = new xml2js.Parser(xml2jsParserSettingsForAtomXml);
  return await new Promise((resolve, reject) => {
    parser.parseString(removeBOM(body.toString()), function(err: any, parsedBody: any) {
      if (err) {
        reject(err);
      } else {
        resolve(parsedBody);
      }
    });
  });
}

/**
 * @param content The content as it is to be serialized. It should include any root node(s).
 */
export function convertJsonToAtomXml(content: any): string {
  content[Constants.XML_METADATA_MARKER] = { type: "application/xml" };
  const builder = new xml2js.Builder(xml2jsBuilderSettingsForAtomXML);
  return builder.buildObject(content);
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
