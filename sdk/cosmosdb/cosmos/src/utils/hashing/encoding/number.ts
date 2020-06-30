export function writeNumberForBinaryEncoding(hash: number) {
  let payload: bigint = encodeNumberAsUInt64(hash);
  let outputStream = Buffer.from("05", "hex");
  const firstChunk = BigInt.asUintN(64, payload >> 56n);
  outputStream = Buffer.concat([outputStream, Buffer.from(firstChunk.toString(16), "hex")]);
  payload = BigInt.asUintN(64, BigInt(payload) << 0x8n);

  let byteToWrite = 0n;
  let firstIteration = false;
  let shifted: bigint;
  let padded: string;

  do {
    if (!firstIteration) {
      // we pad because javascrpt will produce "f" or similar for sufficiently small integers,
      // which cannot be encoded as hex in a buffer https://github.com/nodejs/node/issues/24491
      padded = byteToWrite.toString(16).padStart(2, "0");
      if (padded !== "00") {
        outputStream = Buffer.concat([outputStream, Buffer.from(padded, "hex")]);
      }
    } else {
      firstIteration = false;
    }

    shifted = BigInt.asUintN(64, payload >> 56n);
    byteToWrite = BigInt.asUintN(64, shifted | 0x01n);
    payload = BigInt.asUintN(64, payload << 7n);
  } while (payload != 0n);

  const lastChunk = BigInt.asUintN(64, byteToWrite & 0xfen);
  // we pad because javascrpt will produce "f" or similar for sufficiently small integers,
  // which cannot be encoded as hex in a buffer https://github.com/nodejs/node/issues/24491
  padded = lastChunk.toString(16).padStart(2, "0");
  if (padded !== "00") {
    outputStream = Buffer.concat([outputStream, Buffer.from(padded, "hex")]);
  }

  return outputStream;
}

function encodeNumberAsUInt64(value: number) {
  const rawValueBits = getRawBits(value);
  const mask = 0x8000000000000000n;
  const returned = rawValueBits < mask ? rawValueBits ^ mask : ~BigInt(rawValueBits) + 1n;
  return returned;
}

export function doubleToByteArray(double: number) {
  const output: Buffer = Buffer.alloc(8);
  const lng = getRawBits(double);
  for (let i = 0; i < 8; i++) {
    output[i] = Number((lng >> (BigInt(i) * 8n)) & 0xffn);
  }
  return output;
}

function getRawBits(value: number) {
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, value);
  return view.getBigInt64(0);
}
