import { writeNumberForBinaryEncoding, doubleToByteArray } from "./encoding/number";
import { writeStringForBinaryEncoding } from "./encoding/string";
const MurmurHash = require("./murmurHash").default;

type v1Key = string | number | null | {} | undefined;

export function hashV1PartitionKey(partitionKey: v1Key): string {
  const toHash = prefixKeyByType(partitionKey);
  const hash = MurmurHash.x86.hash32(toHash);
  const encodedHash = writeNumberForBinaryEncoding(hash);
  const encodedValue = encodeByType(partitionKey);
  return Buffer.concat([encodedHash, encodedValue])
    .toString("hex")
    .toUpperCase();
}

function prefixKeyByType(key: v1Key) {
  let bytes: Buffer;
  switch (typeof key) {
    case "string":
      const truncated = key.substr(0, 100);
      bytes = Buffer.concat([
        Buffer.from("08", "hex"),
        Buffer.from(truncated),
        Buffer.from("00", "hex")
      ]);
      return bytes;
    case "number":
      const numberBytes = doubleToByteArray(key);
      bytes = Buffer.concat([Buffer.from("05", "hex"), numberBytes]);
      return bytes;
    case "boolean":
      const prefix = key ? "03" : "02";
      return Buffer.from(prefix, "hex");
    case "object":
      if (key === null) {
        return Buffer.from("01", "hex");
      }
      return Buffer.from("00", "hex");
    case "undefined":
      return Buffer.from("00", "hex");
  }
}

function encodeByType(key: v1Key) {
  switch (typeof key) {
    case "string":
      const truncated = key.substr(0, 100);
      return writeStringForBinaryEncoding(truncated);
    case "number":
      return writeNumberForBinaryEncoding(key);
    case "boolean":
      const prefix = key ? "03" : "02";
      return Buffer.from(prefix, "hex");
    case "object":
      if (key === null) {
        return Buffer.from("01", "hex");
      }
      return Buffer.from("00", "hex");
    case "undefined":
      return Buffer.from("00", "hex");
  }
}
