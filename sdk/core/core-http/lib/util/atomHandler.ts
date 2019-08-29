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
import { isArray, each, stringIsEmpty, stringStartsWith, isDate, isObject, isNode } from "./utils";
let xmlbuilder: any;
if (isNode) {
  xmlbuilder = require("xmlbuilder");
}

export class AtomHandler {
  /**
   * Utility to deserialize the given content even further based on
   * if it's a single `entry` or `feed`
   * @param {object} xmlInJson
   * */
  parse(xmlInJson: any): any {
    var self = this;
    if (!xmlInJson) {
      return;
    }

    if (xmlInJson.feed) {
      return self.parseFeedResult(xmlInJson.feed);
    }

    if (xmlInJson.entry) {
      return self.parseEntryResult(xmlInJson.entry);
    }

    throw new Error("Unrecognized result: " + xmlInJson);
  }

  /**
   * @param {object} content     The content payload as it is to be serialized. It should include any root node(s).
   * @param {array}  namespaces  An array of top level namespaces to be defined.
   */
  serializeEntry(content: any, namespaces?: any, properties?: any): any {
    content[Constants.XML_METADATA_MARKER] = { type: "application/xml" };

    if (isNode) {
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

      doc = this._writeElementValue(doc, "content", content);
      return doc.doc().toString();
    }

    const serializer = new XMLSerializer();
    const dom = this.buildNode(content, "content")[0];
    const result =
      `<?xml version="1.0" encoding="utf-8" standalone="yes"?><entry xmlns="http://www.w3.org/2005/Atom"><updated>${new Date().toISOString()}</updated>` +
      serializer.serializeToString(dom) +
      `</entry>`;
    console.log(result);
    return result;
  }

  buildNode(obj: any, elementName: string): Node[] {
    // tslint:disable-next-line:no-null-keyword

    const doc = document.implementation.createDocument(null, "entry", null);
    if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
      const elem = doc.createElement(elementName);
      elem.textContent = obj.toString();
      return [elem];
    } else if (Array.isArray(obj)) {
      const result = [];
      for (const arrayElem of obj) {
        for (const child of this.buildNode(arrayElem, elementName)) {
          result.push(child);
        }
      }
      return result;
    } else if (typeof obj === "object") {
      const elem = doc.createElement(elementName);
      for (const key of Object.keys(obj)) {
        if (key === "$") {
          for (const attr of this.buildAttributes(doc, obj[key])) {
            elem.attributes.setNamedItem(attr);
          }
        } else {
          for (const child of this.buildNode(obj[key], key)) {
            elem.appendChild(child);
          }
        }
      }
      return [elem];
    } else {
      throw new Error(`Illegal value passed to buildObject: ${obj}`);
    }
  }

  buildAttributes(doc: any, attrs: { [key: string]: { toString(): string } }): Attr[] {
    const result = [];
    for (const key of Object.keys(attrs)) {
      const attr = doc.createAttribute(key);
      attr.value = attrs[key].toString();
      result.push(attr);
    }
    return result;
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
  private _writeElementValue(parentElement: any, name: any, value: any): any {
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

  private parseEntryResult(entry: any): any {
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

  private parseFeedResult(feed: any): any {
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
}
