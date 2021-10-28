// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import { HttpMethods, Pipeline, PipelineOptions } from "@azure/core-rest-pipeline";
import { isCertificateCredential } from "../certificateCredential";
import { ClientOptions, HttpResponse } from "../common";
import { InternalRequestParameters, sendRequest, sendRequestForAsStream } from "../sendRequest";
import { buildRequestUrl } from "../urlHelpers";

export function isCredential(
  param: (TokenCredential | KeyCredential) | PipelineOptions
): param is TokenCredential | KeyCredential {
  if (
    (param as KeyCredential).key !== undefined ||
    isTokenCredential(param) ||
    isCertificateCredential(param)
  ) {
    return true;
  }

  return false;
}

export function buildSendRequest(
  method: HttpMethods,
  clientOptions: ClientOptions,
  baseUrl: string,
  path: string,
  pipeline: Pipeline,
  requestOptions: InternalRequestParameters = {},
  args: string[] = []
): Promise<HttpResponse> {
  addApiVersionHeader(requestOptions, clientOptions);
  const url = buildRequestUrl(baseUrl, path, args, requestOptions);
  return sendRequest(method, url, pipeline, requestOptions);
}

export function buildSendRequestForStream(
  method: HttpMethods,
  clientOptions: ClientOptions,
  baseUrl: string,
  path: string,
  pipeline: Pipeline,
  requestOptions: InternalRequestParameters = {},
  args: string[] = []
): Promise<HttpResponse> {
  addApiVersionHeader(requestOptions, clientOptions);
  const url = buildRequestUrl(baseUrl, path, args, requestOptions);
  return sendRequestForAsStream(method, url, pipeline, requestOptions);
}

function addApiVersionHeader(
  requestOptions: InternalRequestParameters,
  clientOptions: ClientOptions
) {
  // If the client has an api-version and the request doesn't specify one, inject the one in the client options
  if (!requestOptions.queryParameters?.["api-version"] && clientOptions.apiVersion) {
    if (!requestOptions.queryParameters) {
      requestOptions.queryParameters = {};
    }

    requestOptions.queryParameters["api-version"] = clientOptions.apiVersion;
  }
}
