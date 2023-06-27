// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { createHttpPoller } from "./http/poller.js";
export {
  CancelOnProgress,
  OperationState,
  OperationStatus,
  SimplePollerLike,
} from "./poller/models.js";
export { CreateHttpPollerOptions } from "./http/models.js";
export {
  LroResourceLocationConfig,
  LongRunningOperation,
  LroResponse,
  RawResponse,
} from "./http/models.js";

/**
 * This can be uncommented to expose the protocol-agnostic poller
 */
// export {
//   BuildCreatePollerOptions,
//   Operation,
//   CreatePollerOptions,
//   OperationConfig,
//   RestorableOperationState,
// } from "./poller/models";
// export { buildCreatePoller } from "./poller/poller";

/** legacy */
export * from "./legacy/lroEngine/index.js";
export * from "./legacy/poller.js";
export * from "./legacy/pollOperation.js";
export { PollerLike } from "./legacy/models.js";
