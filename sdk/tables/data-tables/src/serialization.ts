// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { base64Encode, base64Decode } from "./utils/bufferSerializer";
import { EdmTypes, SignedIdentifier } from "./models";
import { truncatedISO8061Date } from "./utils/truncateISO8061Date";
import { SignedIdentifier as GeneratedSignedIdentifier } from "./generated/models";

const propertyCaseMap: Map<string, string> = new Map<string, string>([
  ["PartitionKey", "partitionKey"],
  ["RowKey", "rowKey"],
  ["odata.etag", "etag"],
  ["Timestamp", "timestamp"]
]);

const Edm = {
  Binary: "Edm.Binary",
  Boolean: "Edm.Boolean",
  DateTime: "Edm.DateTime",
  Double: "Edm.Double",
  Guid: "Edm.Guid",
  Int32: "Edm.Int32",
  Int64: "Edm.Int64",
  String: "Edm.String"
} as const;

type supportedTypes = boolean | string | number | Date | Uint8Array | bigint;

type serializedType = {
  value: supportedTypes;
  type?: string;
};

function serializePrimitive(value: any): serializedType {
  const serializedValue: serializedType = { value };
  if (
    value === undefined ||
    value === null ||
    typeof value === "boolean" ||
    typeof value === "string" ||
    typeof value === "number"
  ) {
    serializedValue.value = value;
  } else if (typeof value === "bigint") {
    serializedValue.value = value.toString();
    serializedValue.type = Edm.Int64;
  } else if (value instanceof Date) {
    serializedValue.value = value;
    serializedValue.type = Edm.DateTime;
  } else if (value instanceof Uint8Array) {
    serializedValue.value = base64Encode(value);
    serializedValue.type = Edm.Binary;
  } else {
    throw new Error(`Unknown EDM type ${typeof value}`);
  }

  return serializedValue;
}

function serializeObject(obj: { value: any; type: EdmTypes }): serializedType {
  const serializedValue: serializedType = { value: obj.value };
  if (
    obj.type === "Boolean" ||
    obj.type === "DateTime" ||
    obj.type === "Double" ||
    obj.type === "Guid" ||
    obj.type === "Int32" ||
    obj.type === "Int64" ||
    obj.type === "String"
  ) {
    serializedValue.value = obj.value;
    serializedValue.type = Edm[obj.type];
  } else if (obj.type === "Binary") {
    serializedValue.value = base64Encode(obj.value);
    serializedValue.type = Edm.Binary;
  } else {
    throw new Error(`Unknown EDM type ${typeof obj.value}`);
  }

  return serializedValue;
}

function getSerializedValue(value: any): serializedType {
  if (typeof value === "object" && value?.value && value?.type) {
    return serializeObject(value);
  } else {
    return serializePrimitive(value);
  }
}

function translatePropertyNameForSerialization(propertyName: string): string {
  for (const [original, internal] of propertyCaseMap) {
    if (internal === propertyName) {
      return original;
    }
  }

  return propertyName;
}

export function serialize(obj: object): Record<string, Record<string, unknown>> {
  const serialized: any = {};
  for (const [propertyName, propertyValue] of Object.entries(obj)) {
    const transformedKey = translatePropertyNameForSerialization(propertyName);
    const serializedVal = getSerializedValue(propertyValue);
    serialized[transformedKey] = serializedVal.value;
    if (serializedVal.type) {
      serialized[`${transformedKey}@odata.type`] = serializedVal.type;
    }
  }
  return serialized;
}

function getTypedObject(value: any, type: string, disableTypeConversion: boolean): any {
  switch (type) {
    case Edm.Boolean:
      return disableTypeConversion ? { value, type: "Boolean" } : value;
    case Edm.Double:
      return disableTypeConversion ? { value, type: "Double" } : value;
    case Edm.Int32:
      return disableTypeConversion ? { value, type: "Int32" } : value;
    case Edm.String:
      return disableTypeConversion ? { value, type: "String" } : value;
    case Edm.DateTime:
      return disableTypeConversion ? { value, type: "DateTime" } : new Date(value);
    case Edm.Int64:
      return disableTypeConversion ? { value, type: "Int64" } : BigInt(value);
    case Edm.Guid:
      return { value, type: "Guid" };
    case Edm.Binary:
      return disableTypeConversion ? { value, type: "Binary" } : base64Decode(value);
    default:
      throw new Error(`Unknown EDM type ${type}`);
  }
}

export function deserialize<T extends object = Record<string, any>>(
  obj: object,
  disableTypeConversion: boolean = false
): T {
  const deserialized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key.indexOf("@odata.type") === -1) {
      const transformedKey = propertyCaseMap.get(key) ?? key;
      let typedValue = value;
      if (`${key}@odata.type` in obj) {
        const type = (obj as any)[`${key}@odata.type`];
        typedValue = getTypedObject(value, type, disableTypeConversion);
      } else if (disableTypeConversion && ["number", "string", "boolean"].includes(typeof value)) {
        // The service, doesn't return type metadata for number, strings or booleans
        // if automatic type conversion is disabled we'll infer the EDM object
        typedValue = inferTypedObject(key, value);
      }

      deserialized[transformedKey] = typedValue;
    }
  }
  return deserialized;
}

function inferTypedObject(propertyName: string, value: number | string | boolean) {
  // We need to skip service metadata fields such as partitionKey and rowKey and use the same value returned by the service
  if (propertyCaseMap.has(propertyName)) {
    return value;
  }

  switch (typeof value) {
    case "boolean":
      return { value: String(value), type: "Boolean" };
    case "number":
      return getTypedNumber(value);
    case "string":
      return { value, type: "String" };
    default:
      return value;
  }
}

/**
 * Returns the number when typeConversion is enabled or the EDM object with the correct number format Double or Int32 if disabled
 */
function getTypedNumber(value: number): { value: string; type: "Int32" | "Double" } {
  const valueStr = String(value);
  if (Number.isInteger(value)) {
    return { value: valueStr, type: "Int32" };
  } else {
    return { value: valueStr, type: "Double" };
  }
}

export function deserializeObjectsArray<T extends object>(
  objArray: object[],
  disableTypeConversion: boolean
): T[] {
  return objArray.map((obj) => deserialize<T>(obj, disableTypeConversion));
}

/**
 * For ACL endpoints the Tables Service takes an ISO Date without decimals however
 * serializing a JavaScript date gives us a date with decimals 2021-07-08T09:10:09.000Z
 * which makes the XML request body invalid, these 2 functions serialize and deserialize the
 * dates so that they are in the expected format
 */
export function serializeSignedIdentifiers(
  signedIdentifiers: SignedIdentifier[]
): GeneratedSignedIdentifier[] {
  return signedIdentifiers.map((acl) => {
    const { id, accessPolicy } = acl;
    const { start, expiry, ...rest } = accessPolicy ?? {};
    const serializedStart = start
      ? truncatedISO8061Date(start, false /** withMilliseconds */)
      : undefined;
    const serializedExpiry = expiry
      ? truncatedISO8061Date(expiry, false /** withMilliseconds */)
      : undefined;

    return {
      id,
      accessPolicy: {
        ...(serializedExpiry && { expiry: serializedExpiry }),
        ...(serializedStart && { start: serializedStart }),
        ...rest
      }
    };
  });
}

export function deserializeSignedIdentifier(
  signedIdentifiers: GeneratedSignedIdentifier[]
): SignedIdentifier[] {
  return signedIdentifiers.map((si) => {
    const { id, accessPolicy } = si;
    const { start, expiry, ...restAcl } = accessPolicy ?? {};
    const deserializedStart = start ? new Date(start) : undefined;
    const deserializedExpiry = expiry ? new Date(expiry) : undefined;

    return {
      id,
      accessPolicy: {
        ...(deserializedExpiry && { expiry: deserializedExpiry }),
        ...(deserializedStart && { start: deserializedStart }),
        ...restAcl
      }
    };
  });
}
