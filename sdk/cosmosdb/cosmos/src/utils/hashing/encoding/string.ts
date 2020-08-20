import { BytePrefix } from "./prefix";

export function writeStringForBinaryEncoding(payload: string) {
  let outputStream = Buffer.from(BytePrefix.String, "hex");
  const MAX_STRING_BYTES_TO_APPEND = 100;
  const byteArray = [...Buffer.from(payload)];

  const isShortString = payload.length <= MAX_STRING_BYTES_TO_APPEND;

  for (
    let index = 0;
    index < (isShortString ? byteArray.length : MAX_STRING_BYTES_TO_APPEND + 1);
    index++
  ) {
    let charByte = byteArray[index];
    if (charByte < 0xff) {
      charByte++;
    }
    outputStream = Buffer.concat([outputStream, Buffer.from(charByte.toString(16), "hex")]);
  }

  if (isShortString) {
    outputStream = Buffer.concat([outputStream, Buffer.from(BytePrefix.Undefined, "hex")]);
  }
  return outputStream;
}
