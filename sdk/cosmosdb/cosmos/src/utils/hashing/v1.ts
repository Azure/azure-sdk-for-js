import { doubleToByteArrayJSBI, writeNumberForBinaryEncodingJSBI } from "./encoding/number";
import { writeStringForBinaryEncoding } from "./encoding/string";
import { BytePrefix } from "./encoding/prefix";
import MurmurHash from "./murmurHash";

const MAX_STRING_CHARS = 100;

type v1Key = string | number | null | {} | undefined;

export function hashV1PartitionKey(partitionKey: v1Key): string {
  const toHash = prefixKeyByType(partitionKey);
  const hash = MurmurHash.x86.hash32(toHash);
  const encodedJSBI = writeNumberForBinaryEncodingJSBI(hash);
  const encodedValue = encodeByType(partitionKey);
  return Buffer.concat([encodedJSBI, encodedValue])
    .toString("hex")
    .toUpperCase();
}

function prefixKeyByType(key: v1Key) {
  let bytes: Buffer;
  switch (typeof key) {
    case "string":
      const truncated = key.substr(0, MAX_STRING_CHARS);
      bytes = Buffer.concat([
        Buffer.from(BytePrefix.String, "hex"),
        Buffer.from(truncated),
        Buffer.from(BytePrefix.Undefined, "hex")
      ]);
      return bytes;
    case "number":
      const numberBytes = doubleToByteArrayJSBI(key);
      bytes = Buffer.concat([Buffer.from(BytePrefix.Number, "hex"), numberBytes]);
      return bytes;
    case "boolean":
      const prefix = key ? BytePrefix.True : BytePrefix.False;
      return Buffer.from(prefix, "hex");
    case "object":
      if (key === null) {
        return Buffer.from(BytePrefix.Null, "hex");
      }
      return Buffer.from(BytePrefix.Undefined, "hex");
    case "undefined":
      return Buffer.from(BytePrefix.Undefined, "hex");
  }
}

function encodeByType(key: v1Key) {
  switch (typeof key) {
    case "string":
      const truncated = key.substr(0, MAX_STRING_CHARS);
      return writeStringForBinaryEncoding(truncated);
    case "number":
      const encodedJSBI = writeNumberForBinaryEncodingJSBI(key);
      return encodedJSBI;
    case "boolean":
      const prefix = key ? BytePrefix.True : BytePrefix.False;
      return Buffer.from(prefix, "hex");
    case "object":
      if (key === null) {
        return Buffer.from(BytePrefix.Null, "hex");
      }
      return Buffer.from(BytePrefix.Undefined, "hex");
    case "undefined":
      return Buffer.from(BytePrefix.Undefined, "hex");
  }
}
