// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosHeaders } from "./CosmosHeaders";
import type { NonStreamingOrderByResult } from "./nonStreamingOrderByResult";

export interface NonStreamingOrderByResponse {
  result: NonStreamingOrderByResult;
  headers: CosmosHeaders;
}
