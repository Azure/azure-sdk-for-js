// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { calculateRetryDelay } from "./delay.js";
export { getRandomIntegerInclusive } from "./random.js";
export { isObject, type UnknownObject } from "./object.js";
export { isError } from "./error.js";
export { computeSha256Hash, computeSha256Hmac } from "#platform/sha256";
export { randomUUID } from "#platform/uuid";
export {
  isBrowser,
  isBun,
  isNodeLike,
  isNodeRuntime,
  isDeno,
  isReactNative,
  isWebWorker,
} from "#platform/env";
export { stringToUint8Array, uint8ArrayToString, type EncodingType } from "#platform/bytesEncoding";
export { Sanitizer, type SanitizerOptions } from "./sanitizer.js";
