// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosHeaders } from "./CosmosHeaders.js";
import type { NonStreamingOrderByResult } from "./nonStreamingOrderByResult.js";

export interface NonStreamingOrderByResponse {
  result: NonStreamingOrderByResult;
  headers: CosmosHeaders;
}
