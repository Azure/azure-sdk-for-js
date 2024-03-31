// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { doubleToByteArrayJSBI, writeNumberForBinaryEncodingJSBI } from "./encoding/number";
import { writeStringForBinaryEncoding } from "./encoding/string";
import { BytePrefix } from "./encoding/prefix";
import MurmurHash from "./murmurHash";
import { PrimitivePartitionKeyValue } from "../../documents";

const MAX_STRING_CHARS = 100;

export function hashV1PartitionKey(partitionKey: PrimitivePartitionKeyValue[]): string {
  const key = partitionKey[0];
  const toHash = prefixKeyByType(key);
  const hash = MurmurHash.x86.hash32(toHash);
  const encodedJSBI = writeNumberForBinaryEncodingJSBI(hash);
  const encodedValue = encodeByType(key);
  const finalHash = Buffer.concat([encodedJSBI, encodedValue]).toString("hex").toUpperCase();
  return finalHash;
}

function prefixKeyByType(key: PrimitivePartitionKeyValue): Buffer {
  let bytes: Buffer;
  switch (typeof key) {
    case "string": {
      const truncated = key.substr(0, MAX_STRING_CHARS);
      bytes = Buffer.concat([
        Buffer.from(BytePrefix.String, "hex"),
        Buffer.from(truncated),
        Buffer.from(BytePrefix.Undefined, "hex"),
      ]);
      return bytes;
    }
    case "number": {
      const numberBytes = doubleToByteArrayJSBI(key);
      bytes = Buffer.concat([Buffer.from(BytePrefix.Number, "hex"), numberBytes]);
      return bytes;
    }
    case "boolean": {
      const prefix = key ? BytePrefix.True : BytePrefix.False;
      return Buffer.from(prefix, "hex");
    }
    case "object": {
      if (key === null) {
        return Buffer.from(BytePrefix.Null, "hex");
      }
      return Buffer.from(BytePrefix.Undefined, "hex");
    }
    case "undefined": {
      return Buffer.from(BytePrefix.Undefined, "hex");
    }
    default:
      throw new Error(`Unexpected type: ${typeof key}`);
  }
}

function encodeByType(key: PrimitivePartitionKeyValue): Buffer {
  switch (typeof key) {
    case "string": {
      const truncated = key.substr(0, MAX_STRING_CHARS);
      return writeStringForBinaryEncoding(truncated);
    }
    case "number": {
      const encodedJSBI = writeNumberForBinaryEncodingJSBI(key);
      return encodedJSBI;
    }
    case "boolean": {
      const prefix = key ? BytePrefix.True : BytePrefix.False;
      return Buffer.from(prefix, "hex");
    }
    case "object":
      if (key === null) {
        return Buffer.from(BytePrefix.Null, "hex");
      }
      return Buffer.from(BytePrefix.Undefined, "hex");
    case "undefined":
      return Buffer.from(BytePrefix.Undefined, "hex");
    default:
      throw new Error(`Unexpected type: ${typeof key}`);
  }
}
