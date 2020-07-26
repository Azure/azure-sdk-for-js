// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EdmGuid } from "./EdmGuid";
import { EdmInt64 } from "./EdmInt64";
import { encodeByteArray, decodeString } from "./utils/bufferSerializer";

const Edm = {
  Boolean: "Edm.Boolean",
  String: "Edm.String",
  Int32: "Edm.Int32",
  Int64: "Edm.Int64",
  Double: "Edm.Double",
  DateTime: "Edm.DateTime",
  Binary: "Edm.Binary",
  Guid: "Edm.Guid"
};

export function serialize(obj: any): object {
  const serialized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (
      value instanceof String ||
      typeof value === "string" ||
      value instanceof Number ||
      typeof value === "number" ||
      value instanceof Boolean ||
      typeof value === "boolean"
    ) {
      serialized[key] = value;
    } else if (value instanceof Date) {
      serialized[key] = value;
      serialized[`${key}@odata.type`] = Edm.DateTime;
    } else if (value instanceof EdmInt64) {
      serialized[key] = value.value;
      serialized[`${key}@odata.type`] = Edm.Int64;
    } else if (value instanceof EdmGuid) {
      serialized[key] = value.value;
      serialized[`${key}@odata.type`] = Edm.Guid;
    } else if (value instanceof Uint8Array) {
      serialized[key] = encodeByteArray(value);
      serialized[`${key}@odata.type`] = Edm.Binary;
    } else {
      throw new Error(`Unknown EDM type ${typeof value}`);
    }
  }
  return serialized;
}

function getTypedObject(value: any, type: string): any {
  switch (type) {
    case Edm.Boolean:
    case Edm.String:
    case Edm.Int32:
    case Edm.Double:
      return value;
    case Edm.DateTime:
      return new Date(value);
    case Edm.Int64:
      return new EdmInt64(value);
    case Edm.Guid:
      return new EdmGuid(value);
    case Edm.Binary:
      return decodeString(value);
    default:
      throw new Error(`Unknown EDM type ${type}`);
  }
}

export function deserialize(obj?: object): object {
  if (obj === undefined) return {};
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

export function deserializeObjectsArray(objArray: object[] = []): object[] {
  return objArray.map(deserialize);
}
