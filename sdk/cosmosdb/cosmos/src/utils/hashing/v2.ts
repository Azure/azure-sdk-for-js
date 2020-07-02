import { doubleToByteArray } from "./encoding/number";
const MurmurHash = require("./murmurHash").default;

type v1Key = string | number | null | {} | undefined;

export function hashV2PartitionKey(partitionKey: v1Key): string {
  const toHash = prefixKeyByType(partitionKey);
  const hash = MurmurHash.x64.hash128(toHash);
  const reverseBuff: Buffer = reverse(Buffer.from(hash, "hex"));
  reverseBuff[0] &= 0x3f;
  return reverseBuff.toString("hex").toUpperCase();
}

function prefixKeyByType(key: v1Key) {
  let bytes: Buffer;
  switch (typeof key) {
    case "string":
      bytes = Buffer.concat([Buffer.from("08", "hex"), Buffer.from(key), Buffer.from("FF", "hex")]);
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

export function reverse(buff: Buffer) {
  const buffer = Buffer.allocUnsafe(buff.length);

  for (let i = 0, j = buff.length - 1; i <= j; ++i, --j) {
    buffer[i] = buff[j];
    buffer[j] = buff[i];
  }
  return buffer;
}
