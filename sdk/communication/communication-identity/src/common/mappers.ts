// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse, HttpResponse } from "@azure/core-http";
import { WithResponse } from "..";

/**
 * Attach http response to a model
 */
export const attachHttpResponse = <T>(
  model: T,
  httpResponse: (HttpResponse & { bodyAsText: string; parsedBody: any }) | HttpOperationResponse
): WithResponse<T> => {
  const { parsedBody, bodyAsText, ...r } = httpResponse;
  return Object.defineProperty(model, "_response", {
    value: r
  });
};
