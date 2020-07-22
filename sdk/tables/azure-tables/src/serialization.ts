// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EdmGuid } from "./EdmGuid";
import { EdmInt64 } from "./EdmInt64";

const Edm = {
  DateTime: "Edm.DateTime",
  Int64: "Edm.Int64",
  Guid: "Edm.Guid",
  Binary: "Edm.Binary"
};

export function serialize(obj: any): object {
  const serialized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof Date) {
      serialized[`${key}@odata.type`] = Edm.DateTime;
    } else if (value instanceof EdmInt64) {
      serialized[key] = value.value;
      serialized[`${key}@odata.type`] = Edm.Int64;
    } else if (value instanceof EdmGuid) {
      serialized[key] = value.value;
      serialized[`${key}@odata.type`] = Edm.Guid;
    } else {
      serialized[key] = value;
    }
  }
  return serialized;
}

function getTypedObject(value: any, type: string): any {
  switch (type) {
    case Edm.DateTime:
      return new Date(value);
    case Edm.Int64:
      return new EdmInt64(value);
    case Edm.Guid:
      return new EdmGuid(value);
    default:
      return value;
  }
}

export function deserialize(obj: any): object {
  const deserialized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key.indexOf("@odata.type") === -1) {
      const type = obj[`${key}@odata.type`];
      const typed = getTypedObject(value, type);
      deserialized[key] = typed;
    }
  }
  return deserialized;
}
