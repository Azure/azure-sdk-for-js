// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { calculateRetryDelay } from "./delay.js";
export { getRandomIntegerInclusive } from "./random.js";
export { isObject, type UnknownObject } from "./object.js";
export { isError } from "./error.js";
export { computeSha256Hash, computeSha256Hmac } from "#platform/util/sha256";
export { randomUUID } from "#platform/util/uuidUtils";
export {
  isBrowser,
  isBun,
  isNodeLike,
  isNodeRuntime,
  isDeno,
  isReactNative,
  isWebWorker,
} from "./checkEnvironment.js";
export {
  stringToUint8Array,
  uint8ArrayToString,
  type EncodingType,
} from "#platform/util/bytesEncoding";
export { Sanitizer, type SanitizerOptions } from "./sanitizer.js";
