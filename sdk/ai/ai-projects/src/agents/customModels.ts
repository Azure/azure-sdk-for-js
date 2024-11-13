// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client"

/** Optional request paramters support passing headers, abort signal, etc */
export type OptionalRequestParameters = Pick<RequestParameters, "headers"| "timeout"| "abortSignal"| "tracingOptions">
