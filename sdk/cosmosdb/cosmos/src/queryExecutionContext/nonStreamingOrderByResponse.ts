// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CosmosHeaders } from "./CosmosHeaders";
import { NonStreamingOrderByResult } from "./nonStreamingOrderByResult";

export interface NonStreamingOrderByResponse {
  result: NonStreamingOrderByResult;
  headers: CosmosHeaders;
}
