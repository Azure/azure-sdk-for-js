// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { base64Encode, base64Decode } from "./utils/bufferSerializer";
import { EdmTypes } from "./models";

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

export function serialize(obj: object): object {
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
      }
      deserialized[transformedKey] = typedValue;
    }
  }
  return deserialized;
}

export function deserializeObjectsArray<T extends object>(
  objArray: object[],
  disableTypeConversion: boolean
): T[] {
  return objArray.map((obj) => deserialize<T>(obj, disableTypeConversion));
}
