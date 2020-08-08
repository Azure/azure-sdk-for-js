// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { base64Encode, base64Decode } from "./utils/bufferSerializer";
import { EdmTypes } from "./models";

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

type supportedTypes = boolean | string | number | Date | Uint8Array;

type serializedType = {
  value: supportedTypes;
  type?: string;
};

function serializePrimitive(value: any): serializedType {
  const serializedValue: serializedType = { value };
  if (typeof value === "boolean" || typeof value === "string" || typeof value === "number") {
    serializedValue.value = value;
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
  if (typeof value === "object" && value.value && value.type) {
    return serializeObject(value);
  } else {
    return serializePrimitive(value);
  }
}

export function serialize(obj: object): object {
  const serialized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const serializedVal = getSerializedValue(value);
    serialized[key] = serializedVal.value;
    if (serializedVal.type) {
      serialized[`${key}@odata.type`] = serializedVal.type;
    }
  }
  return serialized;
}

function getTypedObject(value: any, type: string): any {
  switch (type) {
    case Edm.Boolean:
    case Edm.Double:
    case Edm.Int32:
    case Edm.String:
      return value;
    case Edm.DateTime:
      return new Date(value);
    case Edm.Int64:
      return { value, type: "Int64" };
    case Edm.Guid:
      return { value, type: "Guid" };
    case Edm.Binary:
      return base64Decode(value);
    default:
      throw new Error(`Unknown EDM type ${type}`);
  }
}

export function deserialize<T extends object>(obj: object): T {
  const deserialized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key.indexOf("@odata.type") === -1) {
      let typedValue = value;
      if (`${key}@odata.type` in obj) {
        const type = (obj as any)[`${key}@odata.type`];
        typedValue = getTypedObject(value, type);
      }
      deserialized[key] = typedValue;
    }
  }
  return deserialized;
}

export function deserializeObjectsArray<T extends object>(objArray: object[]): T[] {
  return objArray.map((obj) => deserialize<T>(obj));
}
