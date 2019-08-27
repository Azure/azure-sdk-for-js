//
// Copyright (c) Microsoft and contributors.  All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import { Constants } from "./constants";
import util from "util";
import { isArray, each, stringIsEmpty, stringStartsWith, isDate, isObject } from "./utils";
const xmlbuilder = require("xmlbuilder");

export class AtomHandler {
  parseEntryResult(entry: any): any {
    var contentElementName = Object.keys(entry.content).filter(function(key) {
      return key !== Constants.XML_METADATA_MARKER;
    })[0];

    delete entry.content[contentElementName][Constants.XML_METADATA_MARKER];
    var result = entry.content[contentElementName];

    if (result) {
      if (entry[Constants.XML_METADATA_MARKER]) {
        result[Constants.ATOM_METADATA_MARKER] = entry[Constants.XML_METADATA_MARKER];
      } else {
        result[Constants.ATOM_METADATA_MARKER] = {};
      }

      result[Constants.ATOM_METADATA_MARKER]["ContentRootElement"] = contentElementName;

      for (var property in entry) {
        if (property !== "content" && property !== Constants.XML_METADATA_MARKER) {
          result[Constants.ATOM_METADATA_MARKER][property] = entry[property];
        }
      }
    }

    return result;
  }

  parseFeedResult(feed: any): any {
    var result = [];
    var self = this;
    if (feed.entry) {
      if (isArray(feed.entry)) {
        each(feed.entry, function(entry: any) {
          result.push(self.parseEntryResult(entry));
        });
      } else {
        result.push(self.parseEntryResult(feed.entry));
      }
    }
    return result;
  }

  parse(xml: any): any {
    var self = this;
    if (!xml) {
      return;
    }

    if (xml.feed) {
      return self.parseFeedResult(xml.feed);
    }

    if (xml.entry) {
      return self.parseEntryResult(xml.entry);
    }

    throw new Error("Unrecognized result " + util.inspect(xml));
  }

  /**
   * @param {object} content     The content payload as it is to be serialized. It should include any root node(s).
   * @param {array}  namespaces  An array of top level namespaces to be defined.
   */
  serializeEntry(content: any, namespaces?: any, properties?: any): any {
    var doc = xmlbuilder.create();

    doc = doc
      .begin("entry", { version: "1.0", encoding: "utf-8", standalone: "yes" })
      .att("xmlns", "http://www.w3.org/2005/Atom");

    each(namespaces, function(namespace: any): any {
      doc = doc.att("xmlns:" + namespace.key, namespace.url);
    });

    if (properties) {
      Object.keys(properties).forEach(function(property) {
        doc = doc.ele(property, properties[property]).up();
      });
    }

    doc = doc.ele("updated", new Date().toISOString()).up();

    content[Constants.XML_METADATA_MARKER] = { type: "application/xml" };

    doc = this._writeElementValue(doc, "content", content);

    return doc.doc().toString();
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
  _writeElementValue(parentElement: any, name: any, value: any): any {
    var self = this;
    var ignored = false;
    var propertyTagName = name;

    if (!stringIsEmpty(value) && isObject(value) && !isDate(value)) {
      if (Array.isArray(value) && value.length > 0) {
        // Example:
        // JSON: element: [ { property1: 'hi there' }, { property2: 'hello there' } ]
        // XML: <element><property1>hi there</property1></element><element><property2>hello there</property2></element>

        Object.keys(value).forEach(function(i: any) {
          parentElement = self._writeElementValue(parentElement, name, value[i]);
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
        if (!stringIsEmpty(value[Constants.XML_VALUE_MARKER])) {
          if (stringStartsWith(value[Constants.XML_VALUE_MARKER], "<![CDATA[")) {
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
        for (var propertyName in value) {
          if (
            propertyName !== Constants.XML_METADATA_MARKER &&
            value.hasOwnProperty(propertyName)
          ) {
            parentElement = self._writeElementValue(
              parentElement,
              propertyName,
              value[propertyName]
            );
          }
        }
      }
    } else {
      parentElement = parentElement.ele(propertyTagName);
      if (!stringIsEmpty(value)) {
        if (stringStartsWith(value.toString().trim(), "<![CDATA[")) {
          parentElement = parentElement.raw(value.toString());
        } else {
          parentElement = parentElement.txt(value.toString());
        }
      }
    }

    if (value && value[Constants.XML_METADATA_MARKER]) {
      // include the metadata
      var attributeList = value[Constants.XML_METADATA_MARKER];
      Object.keys(attributeList).forEach(function(attribute) {
        parentElement = parentElement.att(attribute, attributeList[attribute]);
      });
    }

    if (!ignored) {
      parentElement = parentElement.up();
    }

    return parentElement;
  }
}
