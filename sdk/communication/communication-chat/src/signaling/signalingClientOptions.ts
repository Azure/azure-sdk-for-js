// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChatClientOptions } from "../models/options.js";

export interface SignalingClientOptions extends ChatClientOptions {
  resourceEndpoint?: string;
  gatewayApiVersion?: string;
}
