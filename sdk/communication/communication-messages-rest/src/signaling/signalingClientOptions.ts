// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CommonClientOptions } from "@azure/core-client";

export interface SignalingClientOptions extends CommonClientOptions {
  resourceEndpoint?: string;
  gatewayApiVersion?: string;
}
