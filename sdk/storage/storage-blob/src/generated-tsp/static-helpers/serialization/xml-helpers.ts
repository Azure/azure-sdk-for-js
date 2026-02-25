// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { XMLBuilder, XMLParser, XmlBuilderOptions } from "fast-xml-parser";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/**
 * XML serialization options for a property or model
 */
export interface XmlSerializationOptions {
  /** Element or attribute name */
  name: string;
  /** If true, serialize as XML attribute instead of element */
  attribute?: boolean;
  /** XML namespace for this element/attribute */
  ns?: {
    namespace: string;
    prefix: string;
  };
  /** For arrays - if true, items are inline without wrapper element */
  unwrapped?: boolean;
  /** For arrays - name of each item element */
  itemsName?: string;
  /** For arrays - namespace for item elements */
  itemsNs?: {
    namespace: string;
    prefix: string;
  };
}

/**
 * Metadata for serializing a model property to XML
 */
export interface XmlPropertyMetadata {
  /** Client-side property name */
  propertyName: string;
  /** XML serialization options */
  xmlOptions: XmlSerializationOptions;
  /** Serializer function for complex types */
  serializer?: (value: any) => XmlSerializedValue;
  /** Type of the property for special handling */
  type?: "array" | "object" | "primitive" | "date" | "bytes" | "dict";
  /** Date encoding format */
  dateEncoding?: "rfc3339" | "rfc7231" | "unixTimestamp";
  /** Bytes encoding format (base64 or base64url) */
  bytesEncoding?: "base64" | "base64url";
  /** For arrays - type of each item for special handling */
  itemType?: "primitive" | "date" | "bytes";
}

/**
 * Metadata for deserializing XML to a model property
 */
export interface XmlPropertyDeserializeMetadata {
  /** Client-side property name */
  propertyName: string;
  /** XML serialization options */
  xmlOptions: XmlSerializationOptions;
  /** Deserializer function for complex types */
  deserializer?: (value: any) => any;
  /** Type of the property for special handling */
  type?: "array" | "object" | "primitive" | "date" | "bytes" | "dict";
  /** Subtype for primitive properties to drive type conversion from raw XML strings */
  primitiveSubtype?: "string" | "number" | "boolean";
  /** Date encoding format */
  dateEncoding?: "rfc3339" | "rfc7231" | "unixTimestamp";
  /** Bytes encoding format (base64 or base64url) */
  bytesEncoding?: "base64" | "base64url";
  /** For arrays - type of each item for special handling */
  itemType?: "primitive" | "date" | "bytes";
}

/**
 * Configuration for collecting additional (undeclared) XML elements
 * into a Record property on the deserialized model.
 */
export interface XmlAdditionalPropertiesConfig {
  /** Client-side property name to assign the collected record to */
  propertyName: string;
  /** XML element names of declared properties to exclude from collection */
  excludeNames: string[];
  /** Optional deserializer for complex value types */
  deserializer?: (value: any) => any;
}

/**
 * Result of XML serialization - either a primitive value or structured XML object
 */
export type XmlSerializedValue = string | number | boolean | null | undefined | XmlSerializedObject;

export interface XmlSerializedObject {
  [key: string]: XmlSerializedValue | XmlSerializedValue[];
}

// Default XML parser/builder options
const defaultParserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  parseTagValue: false,
  parseAttributeValue: false,
  trimValues: false, // Preserve whitespace in text content
  isArray: (_name: string, _jpath: string, isLeafNode: boolean, isAttribute: boolean) => {
    // Don't auto-detect arrays for attributes or leaf nodes by default
    // Let the metadata drive array detection
    return !isAttribute && !isLeafNode;
  },
};

const defaultBuilderOptions: Partial<XmlBuilderOptions> = {
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  format: false,
  suppressEmptyNode: true,
};

/**
 * Creates an XML element name with optional namespace prefix
 */
function getElementName(name: string, ns?: { namespace: string; prefix: string }): string {
  if (ns?.prefix) {
    return `${ns.prefix}:${name}`;
  }
  return name;
}

/**
 * Creates namespace declaration attributes for the root element
 */
function createNamespaceDeclarations(namespaces: Map<string, string>): Record<string, string> {
  const declarations: Record<string, string> = {};
  for (const [prefix, namespace] of namespaces) {
    if (prefix) {
      declarations[`@_xmlns:${prefix}`] = namespace;
    } else {
      declarations["@_xmlns"] = namespace;
    }
  }
  return declarations;
}

/**
 * Collects all namespaces from property metadata
 */
function collectNamespaces(
  properties: XmlPropertyMetadata[],
  rootNs?: { namespace: string; prefix: string },
): Map<string, string> {
  const namespaces = new Map<string, string>();

  if (rootNs) {
    namespaces.set(rootNs.prefix, rootNs.namespace);
  }

  for (const prop of properties) {
    if (prop.xmlOptions.ns) {
      namespaces.set(prop.xmlOptions.ns.prefix, prop.xmlOptions.ns.namespace);
    }
    if (prop.xmlOptions.itemsNs) {
      namespaces.set(prop.xmlOptions.itemsNs.prefix, prop.xmlOptions.itemsNs.namespace);
    }
  }

  return namespaces;
}

/**
 * Serializes a primitive value for XML
 */
function serializePrimitiveValue(
  value: any,
  type?: "array" | "object" | "primitive" | "date" | "bytes" | "dict",
  dateEncoding?: "rfc3339" | "rfc7231" | "unixTimestamp",
  bytesEncoding?: "base64" | "base64url",
): string | number | boolean {
  if (value === null || value === undefined) {
    return "";
  }

  if (type === "date" && value instanceof Date) {
    switch (dateEncoding) {
      case "rfc7231":
        return value.toUTCString();
      case "unixTimestamp":
        return Math.floor(value.getTime() / 1000);
      case "rfc3339":
      default:
        return value.toISOString();
    }
  }

  if (type === "bytes" && value instanceof Uint8Array) {
    return uint8ArrayToString(value, bytesEncoding ?? "base64");
  }

  if (typeof value === "boolean" || typeof value === "number") {
    return value;
  }

  return String(value);
}

/**
 * Serializes an array property to XML format
 */
function serializeArrayProperty(
  value: any[],
  metadata: XmlPropertyMetadata,
): XmlSerializedObject | XmlSerializedValue[] {
  const { xmlOptions, serializer } = metadata;
  const itemName = getElementName(
    xmlOptions.itemsName || xmlOptions.name,
    xmlOptions.itemsNs || xmlOptions.ns,
  );

  const serializedItems = value.map((item) => {
    if (serializer) {
      return serializer(item);
    }
    return serializePrimitiveValue(
      item,
      metadata.itemType ?? metadata.type,
      metadata.dateEncoding,
      metadata.bytesEncoding,
    );
  });

  if (xmlOptions.unwrapped) {
    // Unwrapped: return items directly (they'll be siblings)
    return serializedItems;
  } else {
    // Wrapped: items are nested under a wrapper element, which contains item elements
    const wrapperName = getElementName(xmlOptions.name, xmlOptions.ns);
    return {
      [wrapperName]: {
        [itemName]: serializedItems,
      },
    } as XmlSerializedObject;
  }
}

/**
 * Serializes a model to XML object structure
 */
export function serializeModelToXml(
  item: Record<string, any>,
  properties: XmlPropertyMetadata[],
  rootName: string,
  rootNs?: { namespace: string; prefix: string },
  additionalPropertiesConfig?: XmlAdditionalPropertiesConfig,
): XmlSerializedObject {
  if (item === null || item === undefined) {
    return {};
  }

  const result: XmlSerializedObject = {};
  const attributes: Record<string, any> = {};

  // Collect and add namespace declarations
  const namespaces = collectNamespaces(properties, rootNs);
  const nsDeclarations = createNamespaceDeclarations(namespaces);
  Object.assign(attributes, nsDeclarations);

  for (const prop of properties) {
    const value = item[prop.propertyName];

    if (value === undefined) {
      continue;
    }

    const { xmlOptions, serializer, type } = prop;
    const elementName = getElementName(xmlOptions.name, xmlOptions.ns);

    if (xmlOptions.attribute) {
      // Serialize as attribute
      const attrName = xmlOptions.ns?.prefix
        ? `@_${xmlOptions.ns.prefix}:${xmlOptions.name}`
        : `@_${xmlOptions.name}`;
      attributes[attrName] = serializePrimitiveValue(
        value,
        type,
        prop.dateEncoding,
        prop.bytesEncoding,
      );
    } else if (type === "dict" && value !== null && typeof value === "object") {
      // Serialize dictionary - each key-value pair becomes an element
      const dictContent: Record<string, XmlSerializedValue> = {};
      for (const [key, val] of Object.entries(value)) {
        dictContent[key] = String(val);
      }
      result[elementName] = dictContent;
    } else if (Array.isArray(value)) {
      // Serialize array
      const arrayResult = serializeArrayProperty(value, prop);
      if (xmlOptions.unwrapped && Array.isArray(arrayResult)) {
        // For unwrapped arrays, add each item as a separate element
        const itemName = getElementName(
          xmlOptions.itemsName || xmlOptions.name,
          xmlOptions.itemsNs || xmlOptions.ns,
        );
        result[itemName] = arrayResult as XmlSerializedValue[];
      } else {
        Object.assign(result, arrayResult);
      }
    } else if (value !== null && typeof value === "object" && serializer) {
      // Serialize nested object
      result[elementName] = serializer(value);
    } else if (xmlOptions.unwrapped && !Array.isArray(value)) {
      // Unwrapped primitive - this becomes the text content of the parent element
      result["#text"] = serializePrimitiveValue(value, type, prop.dateEncoding, prop.bytesEncoding);
    } else {
      // Serialize primitive
      result[elementName] = serializePrimitiveValue(
        value,
        type,
        prop.dateEncoding,
        prop.bytesEncoding,
      );
    }
  }

  // Serialize additionalProperties entries as sibling XML elements
  if (additionalPropertiesConfig) {
    const apValue = item[additionalPropertiesConfig.propertyName];
    if (apValue && typeof apValue === "object") {
      for (const [key, val] of Object.entries(apValue)) {
        result[key] = additionalPropertiesConfig.deserializer
          ? additionalPropertiesConfig.deserializer(val)
          : String(val);
      }
    }
  }

  // Merge attributes into result
  Object.assign(result, attributes);

  // Wrap in root element
  const rootElementName = getElementName(rootName, rootNs);
  return {
    [rootElementName]: result,
  };
}

/**
 * Converts an XML object structure to XML string
 */
export function xmlObjectToString(
  xmlObject: XmlSerializedObject,
  options?: Partial<XmlBuilderOptions>,
): string {
  const builder = new XMLBuilder({
    ...defaultBuilderOptions,
    ...options,
  });

  const xmlData: string = builder.build(xmlObject);
  if (!xmlData) {
    return "";
  }
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${xmlData}`;
}

/**
 * Full serialization: model to XML string
 */
export function serializeToXml(
  item: Record<string, any>,
  properties: XmlPropertyMetadata[],
  rootName: string,
  rootNs?: { namespace: string; prefix: string },
  options?: Partial<XmlBuilderOptions>,
  additionalPropertiesConfig?: XmlAdditionalPropertiesConfig,
): string {
  const xmlObject = serializeModelToXml(
    item,
    properties,
    rootName,
    rootNs,
    additionalPropertiesConfig,
  );
  return xmlObjectToString(xmlObject, options);
}

/**
 * Parses XML string to object structure
 */
export function parseXmlString(
  xmlString: string,
  options?: Partial<typeof defaultParserOptions>,
): any {
  const parser = new XMLParser({
    ...defaultParserOptions,
    ...options,
  });

  return parser.parse(xmlString);
}

/**
 * Deserializes a primitive value from XML
 */
function deserializePrimitiveValue(
  value: any,
  type?: "array" | "object" | "primitive" | "date" | "bytes" | "dict",
  dateEncoding?: "rfc3339" | "rfc7231" | "unixTimestamp",
  bytesEncoding?: "base64" | "base64url",
  primitiveSubtype?: "string" | "number" | "boolean",
): any {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (primitiveSubtype !== "string" && value === "") {
    return undefined;
  }

  if (type === "date") {
    if (dateEncoding === "unixTimestamp") {
      return new Date(Number(value) * 1000);
    }
    return new Date(value);
  }

  if (type === "bytes" && typeof value === "string") {
    return stringToUint8Array(value, bytesEncoding ?? "base64");
  }

  // Convert raw XML string to the expected JS type
  if (primitiveSubtype === "boolean") {
    return String(value).toLowerCase() === "true";
  }
  if (primitiveSubtype === "number") {
    return Number(value);
  }

  return value;
}

/**
 * Unwraps a value if it's a single-element array (parser wraps non-leaf elements in arrays)
 */
function unwrapSingleElementArray(value: any): any {
  if (Array.isArray(value) && value.length === 1) {
    return value[0];
  }
  return value;
}

/**
 * Extracts element value from parsed XML, handling namespaces
 */
function getElementValue(obj: any, xmlOptions: XmlSerializationOptions): any {
  if (!obj) {
    return undefined;
  }

  const { name, ns, attribute } = xmlOptions;

  if (attribute) {
    // Look for attribute with or without namespace prefix
    const attrName = ns?.prefix ? `@_${ns.prefix}:${name}` : `@_${name}`;
    return obj[attrName];
  }

  // Look for element with or without namespace prefix
  const elementName = ns?.prefix ? `${ns.prefix}:${name}` : name;
  const value = obj[elementName] ?? obj[name]; // Fall back to name without prefix

  // Unwrap single-element arrays (parser wraps non-leaf elements in arrays)
  return unwrapSingleElementArray(value);
}

/**
 * Deserializes an array from XML
 */
function deserializeArrayProperty(obj: any, metadata: XmlPropertyDeserializeMetadata): any[] {
  const { xmlOptions, deserializer, type, dateEncoding } = metadata;

  let arrayData: any;

  if (xmlOptions.unwrapped) {
    // Items are direct children
    const itemName = getElementName(
      xmlOptions.itemsName || xmlOptions.name,
      xmlOptions.itemsNs || xmlOptions.ns,
    );
    arrayData = obj[itemName] ?? obj[xmlOptions.itemsName || xmlOptions.name];
  } else {
    // Items are nested under wrapper element
    const wrapperName = getElementName(xmlOptions.name, xmlOptions.ns);
    let wrapper = obj[wrapperName] ?? obj[xmlOptions.name];

    if (!wrapper) {
      return [];
    }

    // Unwrap single-element array if the parser wrapped it
    wrapper = unwrapSingleElementArray(wrapper);

    const itemName = getElementName(xmlOptions.itemsName || xmlOptions.name, xmlOptions.itemsNs);
    arrayData = wrapper[itemName] ?? wrapper[xmlOptions.itemsName || xmlOptions.name] ?? wrapper;
  }

  if (!arrayData) {
    return [];
  }

  // Ensure it's an array
  const items = Array.isArray(arrayData) ? arrayData : [arrayData];

  return items.map((item) => {
    // Unwrap single-element array for each item if needed
    const unwrappedItem = unwrapSingleElementArray(item);
    if (deserializer) {
      return deserializer(unwrappedItem);
    }
    return deserializePrimitiveValue(
      unwrappedItem,
      metadata.itemType ?? type,
      dateEncoding,
      metadata.bytesEncoding,
      metadata.primitiveSubtype,
    );
  });
}

/**
 * Deserializes XML object structure to model
 */
export function deserializeXmlToModel<T = Record<string, any>>(
  xmlObject: any,
  properties: XmlPropertyDeserializeMetadata[],
  rootName: string,
  rootNs?: { namespace: string; prefix: string },
  additionalPropertiesConfig?: XmlAdditionalPropertiesConfig,
): T {
  if (!xmlObject) {
    return {} as T;
  }

  // Get root element content - unwrap if it's wrapped in an array by the parser
  const rootElementName = getElementName(rootName, rootNs);
  let content = xmlObject[rootElementName] ?? xmlObject[rootName] ?? xmlObject;
  content = unwrapSingleElementArray(content);

  return deserializeXmlObject<T>(content, properties, additionalPropertiesConfig);
}

/**
 * Full deserialization: XML string to model
 */
export function deserializeFromXml<T = Record<string, any>>(
  xmlString: string,
  properties: XmlPropertyDeserializeMetadata[],
  rootName: string,
  rootNs?: { namespace: string; prefix: string },
  parserOptions?: Partial<typeof defaultParserOptions>,
  additionalPropertiesConfig?: XmlAdditionalPropertiesConfig,
): T {
  const xmlObject = parseXmlString(xmlString, parserOptions);
  return deserializeXmlToModel<T>(
    xmlObject,
    properties,
    rootName,
    rootNs,
    additionalPropertiesConfig,
  );
}

/**
 * Deserializes a pre-parsed XML object to a model.
 * This is used for nested objects where the XML has already been parsed
 * and we have the object content directly (without a root element wrapper).
 * Unlike deserializeFromXml, this does not parse XML strings and does not
 * expect a root element to unwrap.
 */
export function deserializeXmlObject<T = Record<string, any>>(
  xmlObject: Record<string, unknown>,
  properties: XmlPropertyDeserializeMetadata[],
  additionalPropertiesConfig?: XmlAdditionalPropertiesConfig,
): T {
  if (!xmlObject) {
    return {} as T;
  }

  // Unwrap if parser wrapped in single-element array
  const content = unwrapSingleElementArray(xmlObject);

  const result: Record<string, any> = {};

  for (const prop of properties) {
    const { propertyName, xmlOptions, deserializer, type, dateEncoding, primitiveSubtype } = prop;

    if (type === "array" || xmlOptions.itemsName) {
      // Deserialize array
      result[propertyName] = deserializeArrayProperty(content, prop);
    } else if (type === "dict") {
      // Deserialize dictionary - each child element is a key-value pair
      const rawValue = getElementValue(content, xmlOptions);
      if (rawValue !== undefined && typeof rawValue === "object") {
        const dict: Record<string, string> = {};
        for (const [key, val] of Object.entries(rawValue)) {
          // Skip attributes (start with @_) and text nodes (#text)
          if (!key.startsWith("@_") && key !== "#text") {
            dict[key] = String(val);
          }
        }
        result[propertyName] = dict;
      }
    } else if (xmlOptions.unwrapped && type !== "object") {
      // Unwrapped primitive - get text content from the element
      const rawValue = content["#text"];
      if (rawValue !== undefined) {
        result[propertyName] = deserializePrimitiveValue(
          rawValue,
          type,
          dateEncoding,
          prop.bytesEncoding,
          primitiveSubtype,
        );
      }
    } else {
      // Get element or attribute value
      const rawValue = getElementValue(content, xmlOptions);

      if (rawValue === undefined) {
        continue;
      }

      if (deserializer) {
        // Deserialize nested object
        if (typeof rawValue === "object") {
          result[propertyName] = deserializer(rawValue);
        } else {
          // When the XML element only contains text content (like <Name>text</Name>),
          // the parser returns the text as a string. Wrap it in an object with #text
          // so the nested deserializer can extract unwrapped text content properly.
          result[propertyName] = deserializer({ "#text": rawValue });
        }
      } else {
        // Deserialize primitive
        result[propertyName] = deserializePrimitiveValue(
          rawValue,
          type,
          dateEncoding,
          prop.bytesEncoding,
          primitiveSubtype,
        );
      }
    }
  }

  // Collect undeclared XML elements into additionalProperties
  if (additionalPropertiesConfig) {
    const { propertyName, excludeNames, deserializer: apDeserializer } = additionalPropertiesConfig;
    const additionalProps: Record<string, any> = {};
    const excludeSet = new Set(excludeNames);
    for (const [key, val] of Object.entries(content)) {
      if (key.startsWith("@_") || key === "#text" || excludeSet.has(key)) {
        continue;
      }
      additionalProps[key] = apDeserializer ? apDeserializer(val) : String(val);
    }
    result[propertyName] = additionalProps;
  }

  return result as T;
}

/**
 * Utility to check if a content type is XML
 */
export function isXmlContentType(contentType: string): boolean {
  const normalized = contentType.toLowerCase();
  return (
    normalized.includes("application/xml") ||
    normalized.includes("text/xml") ||
    normalized.endsWith("+xml")
  );
}

/**
 * Utility to check if a content type is JSON
 */
export function isJsonContentType(contentType: string): boolean {
  const normalized = contentType.toLowerCase();
  return (
    normalized.includes("application/json") ||
    normalized.includes("text/json") ||
    normalized.endsWith("+json")
  );
}
