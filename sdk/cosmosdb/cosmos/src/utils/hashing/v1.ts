// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { doubleToByteArrayBigInt, writeNumberForBinaryEncodingBigInt } from "./encoding/number.js";
import { writeStringForBinaryEncoding } from "./encoding/string.js";
import { BytePrefix } from "./encoding/prefix.js";
import MurmurHash from "./murmurHash.js";
import type { PrimitivePartitionKeyValue } from "../../documents/index.js";
import { concatUint8Arrays } from "../uint8.js";
import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

const MAX_STRING_CHARS = 100;

export function hashV1PartitionKey(partitionKey: PrimitivePartitionKeyValue[]): string {
  const key = partitionKey[0];
  const toHash = prefixKeyByType(key);
  const hash = MurmurHash.x86.hash32(toHash);
  const encodedJSBI = writeNumberForBinaryEncodingBigInt(hash);
  const encodedValue = encodeByType(key);
  const finalHash = uint8ArrayToString(concatUint8Arrays([encodedJSBI, encodedValue]), "hex").toUpperCase();
  return finalHash;
}

function prefixKeyByType(key: PrimitivePartitionKeyValue): Uint8Array {
  let bytes: Uint8Array;
  switch (typeof key) {
    case "string": {
      const truncated = key.substr(0, MAX_STRING_CHARS);
      bytes = concatUint8Arrays([
        stringToUint8Array(BytePrefix.String, "hex"),
        stringToUint8Array(truncated, "utf-8"),
        stringToUint8Array(BytePrefix.Undefined, "hex"),
      ]);
      return bytes;
    }
    case "number": {
      const numberBytes = doubleToByteArrayBigInt(key);
      bytes = concatUint8Arrays([stringToUint8Array(BytePrefix.Number, "hex"), numberBytes]);
      return bytes;
    }
    case "boolean": {
      const prefix = key ? BytePrefix.True : BytePrefix.False;
      return stringToUint8Array(prefix, "hex");
    }
    case "object": {
      if (key === null) {
        return stringToUint8Array(BytePrefix.Null, "hex");
      }
      return stringToUint8Array(BytePrefix.Undefined, "hex");
    }
    case "undefined": {
      return stringToUint8Array(BytePrefix.Undefined, "hex");
    }
    default:
      throw new Error(`Unexpected type: ${typeof key}`);
  }
}

function encodeByType(key: PrimitivePartitionKeyValue): Uint8Array {
  switch (typeof key) {
    case "string": {
      const truncated = key.substring(0, MAX_STRING_CHARS);
      return writeStringForBinaryEncoding(truncated);
    }
    case "number": {
      return writeNumberForBinaryEncodingBigInt(key);
    }
    case "boolean": {
      const prefix = key ? BytePrefix.True : BytePrefix.False;
      return stringToUint8Array(prefix, "hex");
    }
    case "object":
      if (key === null) {
        return stringToUint8Array(BytePrefix.Null, "hex");
      }
      return stringToUint8Array(BytePrefix.Undefined, "hex");
    case "undefined":
      return stringToUint8Array(BytePrefix.Undefined, "hex");
    default:
      throw new Error(`Unexpected type: ${typeof key}`);
  }
}
