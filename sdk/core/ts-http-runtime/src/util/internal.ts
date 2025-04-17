// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

declare global {
  interface Blob {}
  interface File {}
  interface ReadableStream<R = any> {}
}

export { calculateRetryDelay } from "./delay.js";
export { getRandomIntegerInclusive } from "./random.js";
export { isObject, type UnknownObject } from "./object.js";
export { isError } from "./error.js";
export { computeSha256Hash, computeSha256Hmac } from "./sha256.js";
export { randomUUID } from "./uuidUtils.js";
export {
  isBrowser,
  isBun,
  isNodeLike,
  isNodeRuntime,
  isDeno,
  isReactNative,
  isWebWorker,
} from "./checkEnvironment.js";
export { stringToUint8Array, uint8ArrayToString, type EncodingType } from "./bytesEncoding.js";
export {
  createFile,
  createFileFromStream,
  getRawContent,
  type CreateFileOptions,
  type CreateFileFromStreamOptions,
} from "./file.js";
export { Sanitizer, type SanitizerOptions } from "./sanitizer.js";
