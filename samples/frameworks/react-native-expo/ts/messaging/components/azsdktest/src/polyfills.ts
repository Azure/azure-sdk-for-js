import { Buffer } from "buffer";
import * as crypto from "crypto";

global.Buffer = Buffer;

// @ts-expect-error
global.crypto = crypto;

if (typeof process.nextTick == "undefined") {
  process.nextTick = setImmediate;
}
