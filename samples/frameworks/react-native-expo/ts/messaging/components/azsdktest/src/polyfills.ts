import { Buffer } from "buffer";

import * as crypto from "crypto";

(async () => {
  // Only needed for crypto.getRandomValues
  // but only wait once, future calls are secure
  await crypto.ensureSecure();

  Object.defineProperty(global, "crypto", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: crypto,
  });
})();

global.Buffer = Buffer;

if (typeof process.nextTick == "undefined") {
  process.nextTick = setImmediate;
}
