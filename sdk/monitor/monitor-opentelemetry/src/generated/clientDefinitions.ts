// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IsSubscribedParameters, PublishParameters } from "./parameters.js";
import type {
  IsSubscribed200Response,
  IsSubscribedDefaultResponse,
  Publish200Response,
  PublishDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface IsSubscribed {
  /** Determine whether there is any subscription to the metrics and documents. */
  post(
    options: IsSubscribedParameters,
  ): StreamableMethod<IsSubscribed200Response | IsSubscribedDefaultResponse>;
}

export interface Publish {
  /** Publish live metrics to the Live Metrics service when there is an active subscription to the metrics. */
  post(options: PublishParameters): StreamableMethod<Publish200Response | PublishDefaultResponse>;
}

export interface Routes {
  /** Resource for '/QuickPulseService.svc/ping' has methods for the following verbs: post */
  (path: "/QuickPulseService.svc/ping"): IsSubscribed;
  /** Resource for '/QuickPulseService.svc/post' has methods for the following verbs: post */
  (path: "/QuickPulseService.svc/post"): Publish;
}

export type LiveMetricsClient = Client & {
  path: Routes;
};
