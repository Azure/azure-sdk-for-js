// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestPolicy } from "./policies/requestPolicy";

/**
 * An interface that can send HttpRequests and receive promised HttpResponses.
 */
export interface HttpClient extends RequestPolicy {}
