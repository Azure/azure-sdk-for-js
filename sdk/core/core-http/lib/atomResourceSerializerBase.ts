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

import { stringIsEmpty, stringStartsWith } from "./util/utils";
import { Constants } from "./util/constants";
import { AtomHandler } from "./util/atomHandler";
import { each, isUndefined, isArray, isObject, isDate } from "./util/utils";
const url = require("url");
const xmlbuilder = require("xmlbuilder");

const atomHandler = new AtomHandler();

export class AtomResourceSerializerBase {
  static setName(entry: any, nameProperty: any): any {
    var parsedUrl: any = url.parse(entry[Constants.ATOM_METADATA_MARKER].id);
    var parts = parsedUrl.pathname!.split("/");

    for (var i = 0; i * 2 < parts.length - 1; i++) {
      entry[nameProperty[i]] = parts[i * 2 + 1];
    }
  }

  static _serialize(resourceName: any, resource: any, properties: any): any {
    var content: any = {};
    content[resourceName] = {
      $: {
        xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect"
      }
    };

    if (resource) {
      // Sort properties according to what is allowed by the service
      each(properties, function(property: any): any {
        if (!isUndefined(resource[property])) {
          content[resourceName][property] = resource[property];
        }
      });
    }

    return atomHandler.serializeEntry(content);
  }

  static _parse(nameProperty: any, xml: any): any {
    var result = atomHandler.parse(xml);

    if (!result) {
      return undefined;
    }
    if (isArray(result)) {
      each(result, function(entry: any): any {
        AtomResourceSerializerBase.setName(entry, nameProperty);
      });
    } else {
      AtomResourceSerializerBase.setName(result, nameProperty);
    }
    return result;
  }

  static serializeEntry(content: any, namespaces?: any, properties?: any): any {
    var doc = xmlbuilder.create("entry").att("xmlns", "http://www.w3.org/2005/Atom");

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

    doc = AtomResourceSerializerBase._writeElementValue(doc, "content", content);

    return doc.doc().toString();
  }

  static _writeElementValue(parentElement: any, name: any, value: any): any {
    var ignored = false;
    var propertyTagName = name;

    if (!stringIsEmpty(value) && isObject(value) && !isDate(value)) {
      if (Array.isArray(value) && value.length > 0) {
        // Example:
        // JSON: element: [ { property1: 'hi there' }, { property2: 'hello there' } ]
        // XML: <element><property1>hi there</property1></element><element><property2>hello there</property2></element>

        Object.keys(value).forEach(function(i: any) {
          parentElement = AtomResourceSerializerBase._writeElementValue(
            parentElement,
            name,
            value[i]
          );
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
            parentElement = AtomResourceSerializerBase._writeElementValue(
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
