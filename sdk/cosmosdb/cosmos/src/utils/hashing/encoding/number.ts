import JSBI from "jsbi";
import { BytePrefix } from "./prefix";

export function writeNumberForBinaryEncodingJSBI(hash: number) {
  let payload = encodeNumberAsUInt64JSBI(hash);
  let outputStream = Buffer.from(BytePrefix.Number, "hex");
  const firstChunk = JSBI.asUintN(64, JSBI.signedRightShift(payload, JSBI.BigInt(56)));

  outputStream = Buffer.concat([outputStream, Buffer.from(firstChunk.toString(16), "hex")]);
  payload = JSBI.asUintN(64, JSBI.leftShift(JSBI.BigInt(payload), JSBI.BigInt(0x8)));

  let byteToWrite = JSBI.BigInt(0);
  let firstIteration = false;
  let shifted: JSBI;
  let padded: string;

  do {
    if (!firstIteration) {
      // we pad because after shifting because we will produce characters like "f" or similar,
      // which cannot be encoded as hex in a buffer because they are invalid hex
      // https://github.com/nodejs/node/issues/24491
      padded = byteToWrite.toString(16).padStart(2, "0");
      if (padded !== "00") {
        outputStream = Buffer.concat([outputStream, Buffer.from(padded, "hex")]);
      }
    } else {
      firstIteration = false;
    }

    shifted = JSBI.asUintN(64, JSBI.signedRightShift(payload, JSBI.BigInt(56)));
    byteToWrite = JSBI.asUintN(64, JSBI.bitwiseOr(shifted, JSBI.BigInt(0x01)));
    payload = JSBI.asUintN(64, JSBI.leftShift(payload, JSBI.BigInt(7)));
  } while (JSBI.notEqual(payload, JSBI.BigInt(0)));

  const lastChunk = JSBI.asUintN(64, JSBI.bitwiseAnd(byteToWrite, JSBI.BigInt(0xfe)));
  // we pad because after shifting because we will produce characters like "f" or similar,
  // which cannot be encoded as hex in a buffer because they are invalid hex
  // https://github.com/nodejs/node/issues/24491
  padded = lastChunk.toString(16).padStart(2, "0");
  if (padded !== "00") {
    outputStream = Buffer.concat([outputStream, Buffer.from(padded, "hex")]);
  }

  return outputStream;
}

function encodeNumberAsUInt64JSBI(value: number) {
  const rawValueBits = getRawBitsJSBI(value);
  const mask = JSBI.BigInt(0x8000000000000000);
  const returned =
    rawValueBits < mask
      ? JSBI.bitwiseXor(rawValueBits, mask)
      : JSBI.add(JSBI.bitwiseNot(rawValueBits), JSBI.BigInt(1));
  return returned;
}

export function doubleToByteArrayJSBI(double: number) {
  const output: Buffer = Buffer.alloc(8);
  const lng = getRawBitsJSBI(double);
  for (let i = 0; i < 8; i++) {
    output[i] = JSBI.toNumber(
      JSBI.bitwiseAnd(
        JSBI.signedRightShift(lng, JSBI.multiply(JSBI.BigInt(i), JSBI.BigInt(8))),
        JSBI.BigInt(0xff)
      )
    );
  }
  return output;
}

function getRawBitsJSBI(value: number) {
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, value);
  return JSBI.BigInt(`0x${buf2hex(view.buffer)}`);
}

function buf2hex(buffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x: number) => ("00" + x.toString(16)).slice(-2))
    .join("");
}
