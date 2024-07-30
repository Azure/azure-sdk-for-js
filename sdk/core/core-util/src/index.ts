// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { delay, type DelayOptions, calculateExponentialDelayInterval } from "./delay.js";
export {
  type AbortOptions,
  cancelablePromiseRace,
  type AbortablePromiseBuilder,
} from "./aborterUtils.js";
export {
  createAbortablePromise,
  type CreateAbortablePromiseOptions,
} from "./createAbortablePromise.js";
export { getRandomIntegerInclusive } from "./random.js";
export { isObject, type UnknownObject } from "./object.js";
export { isError, getErrorMessage } from "./error.js";
export { computeSha256Hash, computeSha256Hmac } from "./sha256.js";
export { isDefined, isObjectWithProperties, objectHasProperty } from "./typeGuards.js";
export { randomUUID } from "./uuidUtils.js";
export {
  isBrowser,
  isBun,
  isNode,
  isNodeLike,
  isNodeRuntime,
  isDeno,
  isReactNative,
  isWebWorker,
} from "./checkEnvironment.js";
export { uint8ArrayToString, stringToUint8Array, type EncodingType } from "./bytesEncoding.js";
