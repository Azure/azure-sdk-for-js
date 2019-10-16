// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as xml2js from "xml2js";

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

// The xml2js settings for general XML building operations.
const xml2jsBuilderSettings: any = Object.assign({}, xml2jsDefaultOptionsV2);
xml2jsBuilderSettings.explicitArray = false;
xml2jsBuilderSettings.renderOpts = {
  pretty: false
};

/**
 * Converts given JSON object to XML string
 * @param obj JSON object to be converted into XML string
 * @param opts Options that govern the parsing of given JSON object
 * `rootName` indicates the name of the root element in the resulting XML
 */
export function stringifyXML(obj: any, opts?: { rootName?: string }) {
  xml2jsBuilderSettings.rootName = (opts || {}).rootName;
  const builder = new xml2js.Builder(xml2jsBuilderSettings);
  return builder.buildObject(obj);
}

/**
 * Converts given XML string into JSON
 * @param str String containing the XML content to be parsed into JSON
 * @param opts Options that govern the parsing of given xml string
 * `includeRoot` indicates whether the root element is to be included or not in the output
 */
export function parseXML(str: string, opts?: { includeRoot?: boolean }): Promise<any> {
  xml2jsParserSettings.explicitRoot = !!(opts && opts.includeRoot);
  const xmlParser = new xml2js.Parser(xml2jsParserSettings);
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
