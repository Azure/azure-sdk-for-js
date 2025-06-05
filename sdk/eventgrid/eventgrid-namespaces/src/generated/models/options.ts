// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type { ReleaseDelay } from "./models.js";

export interface PublishCloudEventOptionalParams extends OperationOptions {
  /** content type */
  contentType?: string;
}

export interface PublishCloudEventsOptionalParams extends OperationOptions {
  /** content type */
  contentType?: string;
}

export interface ReceiveCloudEventsOptionalParams extends OperationOptions {
  /** Max Events count to be received. Minimum value is 1, while maximum value is 100 events. If not specified, the default value is 1. */
  maxEvents?: number;
  /** Max wait time value for receive operation in Seconds. It is the time in seconds that the server approximately waits for the availability of an event and responds to the request. If an event is available, the broker responds immediately to the client. Minimum value is 10 seconds, while maximum value is 120 seconds. If not specified, the default value is 60 seconds. */
  maxWaitTime?: number;
}

export interface AcknowledgeCloudEventsOptionalParams extends OperationOptions {}

export interface ReleaseCloudEventsOptionalParams extends OperationOptions {
  /** Release cloud events with the specified delay in seconds. */
  releaseDelayInSeconds?: ReleaseDelay;
}

export interface RejectCloudEventsOptionalParams extends OperationOptions {}

export interface RenewCloudEventLocksOptionalParams extends OperationOptions {}
