// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse, HttpNodeStreamResponse } from "../common";

export function getNodeStreamResponse(_response: HttpResponse): HttpNodeStreamResponse {
  throw new Error("Node streams are not supported in browser environment.");
}
