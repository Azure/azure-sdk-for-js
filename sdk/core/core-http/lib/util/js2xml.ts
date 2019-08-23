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

// Module dependencies.

import { stringIsEmpty, stringStartsWith, objectFirstKey, objectKeysLength } from "./utils";
import { Constants } from "./constants";
const _ = require("underscore");
const xmlbuilder = require("xmlbuilder");

export class Js2xml extends _ {
  getElements(doc: any, parent: any, name: any, namespace: any): any {
    var self = this;

    if (!parent) {
      return [];
    }

    var elementName = self.getElementName(doc, name, namespace);
    if (!parent[elementName]) {
      return [];
    } else if (_.isArray(parent[elementName])) {
      for (var el in parent[elementName]) {
        if (
          parent[elementName][el] &&
          parent[elementName][el]["$"] &&
          parent[elementName][el]["$"]["I:NIL"] === "true"
        ) {
          parent[elementName][el] = null;
        }
      }
    }

    return parent[elementName];
  }

  getElement(doc: any, parent: any, name: any, namespace: any): any {
    var self = this;
    var element = null;

    if (!parent) {
      return null;
    }

    var elementName = self.getElementName(doc, name, namespace);
    if (parent[elementName] !== undefined) {
      element =
        parent[elementName].length === 1
          ? parent[elementName][0]
          : _.isObject(parent[elementName]) && Object.keys(parent[elementName]).length === 0
          ? null
          : parent[elementName];
    }

    if (element && element["$"] && element["$"]["I:NIL"] === "true") {
      element = null;
    }

    if (element && element["_"]) {
      element = element["_"];
    }

    return element;
  }

  getAttribute(doc: any, parent: any, name: any, namespace: any): any {
    var self = this;

    if (!parent["$"]) {
      return null;
    }

    var element = self.getElement(doc, parent["$"], name, namespace);
    if (!element) {
      return [];
    }

    return element;
  }

  getElementName(doc: any, name: any, namespace: any): any {
    var self = this;

    if (namespace) {
      var fullNamespace = self.getNamespaceAlias(doc, namespace);
      if (fullNamespace) {
        var pos = fullNamespace.indexOf(":");
        if (pos >= 0) {
          return fullNamespace.substr(pos + 1) + ":" + name;
        }
      }
    }

    return name;
  }

  getNamespaceAlias(doc: any, namespace: any): any {
    var self = this;

    for (var key in doc) {
      if (key === "$") {
        for (var attr in doc[key]) {
          if (doc[key][attr].toUpperCase() === namespace.toUpperCase()) {
            return attr;
          }
        }
      } else if (_.isObject(doc[key])) {
        var ret = self.getNamespaceAlias(doc[key], namespace);
        if (ret) {
          return ret;
        }
      }
    }

    return null;
  }

  createElement(name: any, namespace: any): any {
    return {
      name: name,
      namespace: namespace,
      attr: {},
      value: undefined
    };
  }

  setElementValue(element: any, value: any): any {
    element.value = value;
  }

  addChildElement(parentElement: any, element: any): any {
    if (parentElement.value && !_.isArray(parentElement.value)) {
      throw new Error("Element can not have child if it has a value");
    } else if (!parentElement.value) {
      parentElement.value = [];
    }

    parentElement.value.push(element);
  }

  createAttribute(name: any, namespace: any): any {
    return {
      name: name,
      namespace: namespace,
      value: undefined
    };
  }

  setAttributeValue(element: any, value: any): any {
    element.value = value;
  }

  addAttribute(element: any, attribute: any): any {
    element.attr[attribute.name] = attribute.value;
  }

  serializeDocument(element: any): any {
    var self = this;

    if (element.value && !element.name) {
      element = element.value[0];
    }

    var namespaces: any = {};
    var generatedDoc = xmlbuilder.create();
    var rootElement = generatedDoc.begin(
      self._getName(namespaces, element.name, element.namespace),
      { version: "1.0", encoding: "utf-8", standalone: "yes" }
    );
    generatedDoc = this._writeElement(rootElement, element, namespaces);

    Object.keys(namespaces).forEach(function(namespace) {
      var namespaceName = "xmlns";

      if (namespaces[namespace]) {
        namespaceName += ":" + namespaces[namespace];
      }

      rootElement.att(namespaceName, namespace);
    });

    return generatedDoc.doc().toString();
  }

  _getName(namespaces: any, name: any, namespace: any): any {
    if (namespace) {
      if (namespaces[namespace] === undefined) {
        if (Object.keys(namespaces).length === 0) {
          namespaces[namespace] = null;
        } else {
          // Letters starting with 'a' = 97
          namespaces[namespace] = String.fromCharCode(96 + Object.keys(namespaces).length);
        }
      }

      if (namespaces[namespace]) {
        return namespaces[namespace] + ":" + name;
      }
    }

    return name;
  }

  _writeElement(xmlElement: any, element: any, namespaces: any): any {
    var self = this;

    if (element.attr) {
      Object.keys(element.attr).forEach(function(metadata) {
        xmlElement = xmlElement.att(metadata, element.attr[metadata]);
      });
    }

    if (_.isArray(element.value)) {
      element.value.forEach(function(el: any) {
        xmlElement = xmlElement.ele(self._getName(namespaces, el.name, el.namespace));
        xmlElement = self._writeElement(xmlElement, el, namespaces);
        xmlElement = xmlElement.up();
      });
    } else if (element.value) {
      xmlElement.raw(element.value);
    }

    return xmlElement;
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

    if (!stringIsEmpty(value) && _.isObject(value) && !_.isDate(value)) {
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

  /*
   * {Deprecated}
   */
  serialize(entity: any): any {
    var self = this;

    if (objectKeysLength(entity) !== 1) {
      throw new Error("Invalid XML root element.");
    }

    var doc = xmlbuilder.create();

    var rootElementName = objectFirstKey(entity);

    doc = doc.begin(rootElementName, { version: "1.0", encoding: "utf-8", standalone: "yes" });

    if (rootElementName) {
      if (entity[rootElementName][Constants.XML_METADATA_MARKER]) {
        for (var metadata in entity[rootElementName][Constants.XML_METADATA_MARKER]) {
          if (entity[rootElementName][Constants.XML_METADATA_MARKER].hasOwnProperty(metadata)) {
            doc.att(metadata, entity[rootElementName][Constants.XML_METADATA_MARKER][metadata]);
          }
        }
      }

      for (var attribute in entity[rootElementName]) {
        if (
          attribute !== Constants.XML_METADATA_MARKER &&
          entity[rootElementName].hasOwnProperty(attribute)
        ) {
          doc = self._writeElementValue(doc, attribute, entity[rootElementName][attribute]);
        }
      }
    }

    doc = doc.doc();

    return doc.toString();
  }
}
