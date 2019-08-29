// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as xml2js from "xml2js";

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

export function parseAtomXmlDataToJson(body: any): any {
  var parsed;
  var parser = new xml2js.Parser(_getDefaultSettingsForAtomXmlOperations());
  parser.parseString(_removeBOM(body.toString()), function(err: any, parsedBody: any) {
    if (err) {
      throw err;
    } else {
      parsed = parsedBody;
    }
  });
  return parsed;
}

/**
 * Gets the default xml2js settings applicable for Atom based XML operations.
 * @ignore
 * @return {object} The default settings
 */
function _getDefaultSettingsForAtomXmlOperations(): any {
  var xml2jsSettings = xml2js.defaults["0.2"];
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
