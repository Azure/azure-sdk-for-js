// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, ServiceClient } from "@azure/core-client";
import {
  createHttpHeaders,
  createPipelineRequest,
  HttpHeaders,
  HttpMethods,
  PipelineRequest,
  PipelineResponse,
  RestError,
} from "@azure/core-rest-pipeline";
import { logger } from "./logger";
import { Fetcher } from "./fetcherAbstract";
import { DTDL } from "./psuedoDtdl";

/**
 * The HTTP Fetcher implements the Fetcher interface to
 * retrieve models through HTTP calls.
 *
 * @internal
 */
export class HttpFetcher implements Fetcher {
  private _client: ServiceClient;
  private _baseURL: string;

  constructor(baseURL: string, client: ServiceClient) {
    this._client = client;
    this._baseURL = baseURL;
  }

  async fetch(path: string, options?: OperationOptions): Promise<DTDL | DTDL[]> {
    logger.info(`Fetching ${path} from remote endpoint`);
    if (!options) {
      options = {};
    }
    const myURL = this._baseURL + "/" + path;
    const requestMethod: HttpMethods = "GET";
    const requestHeader: HttpHeaders = createHttpHeaders(options.requestOptions?.customHeaders);
    const requestOptions = {
      url: myURL,
      method: requestMethod,
      headers: requestHeader,
      timeout: options.requestOptions?.timeout,
      abortSignal: options.abortSignal,
      tracingOptions: options.tracingOptions,
      allowInsecureConnection: true,
    };
    const request: PipelineRequest = createPipelineRequest(requestOptions);
    const res: PipelineResponse = await this._client.sendRequest(request);

    if (res.status >= 200 && res.status < 400) {
      const dtdlAsString = res.bodyAsText || "";
      const parsedDtdl: DTDL | DTDL[] = JSON.parse(dtdlAsString);
      return parsedDtdl;
    } else {
      throw new RestError("Error on HTTP Request in remote model fetcher", {
        code: "ResourceNotFound",
        statusCode: res.status,
        response: res,
        request: request,
      });
    }
  }
}
