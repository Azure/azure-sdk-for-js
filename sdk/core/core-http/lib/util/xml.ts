// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as xml2js from "xml2js";
import { Constants } from "./constants";

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

// The default xml2js settings applicable for Atom based XML operations.
const xml2jsSettingsForAtomXmlOperations: any = Object.assign({}, xml2jsDefaults);
xml2jsSettingsForAtomXmlOperations.explicitCharkey = false;
xml2jsSettingsForAtomXmlOperations.explicitArray = false;

// The default settings applicable for general XML operations.
const xml2jsSettingsForXmlOperations: any = Object.assign({}, xml2jsDefaults);
xml2jsSettingsForXmlOperations.explicitArray = false;
xml2jsSettingsForXmlOperations.explicitCharkey = false;
xml2jsSettingsForXmlOperations.explicitRoot = false;

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
  const xmlParser = new xml2js.Parser(xml2jsSettingsForXmlOperations);
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
  const parser = new xml2js.Parser(xml2jsSettingsForAtomXmlOperations);
  return new Promise((resolve, reject) => {
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
  const builder = new xml2js.Builder({
    explicitRoot: false,
    renderOpts: {
      pretty: false
    }
  });

  content = {
    entry: {
      $: {
        xmlns: "http://www.w3.org/2005/Atom"
      },
      updated: new Date().toISOString(),
      content: content
    }
  };

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
