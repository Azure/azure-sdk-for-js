// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { OperationOptions, ServiceClient } from "@azure/core-client";
import { createHttpHeaders, createPipelineRequest, HttpHeaders, HttpMethods, PipelineRequest, PipelineResponse, RestError } from "@azure/core-rest-pipeline";
import { logger } from "./logger";
import { Fetcher } from "./fetcherAbstract";

/**
 * @internal
 */
export class HttpFetcher implements Fetcher {
  private _client: ServiceClient;
  private _baseURL: string;

  constructor(baseURL: string, client: ServiceClient) {
    this._client = client;
    this._baseURL = baseURL;
  }

  async fetch(path: string, options: OperationOptions) {
    logger.info(`Fetching ${path} from remote endpoint`);
    const myURL = this._baseURL + '/' + path;
    const requestMethod: HttpMethods = "GET";
    const requestHeader: HttpHeaders = createHttpHeaders(options.requestOptions?.customHeaders);
    const requestOptions = {
      url: myURL,
      method: requestMethod,
      headers: requestHeader,  
      timeout: options.requestOptions?.timeout,
      abortSignal: options.abortSignal,
      tracingOptions: options.tracingOptions,
      allowInsecureConnection: true
    }
    const request: PipelineRequest = createPipelineRequest(requestOptions);
    const res: PipelineResponse = await this._client.sendRequest(request);

    if (res.status >= 200 && res.status < 400) {
      const dtdlAsString = res.bodyAsText || "";
      const parsedDtdl = JSON.parse(dtdlAsString);
      return parsedDtdl;
    } else {
      throw new RestError("Error on HTTP Request in remote model fetcher", {code: 'ResourceNotFound',statusCode: res.status, response: res, request: request});
    }
  }
}

// options for PipelineRequestOptions as of 5/13/2021
// {
//   url: string;
//   method?: HttpMethods;
//   headers?: HttpHeaders;
//   timeout?: number;
//   withCredentials?: boolean;
//   requestId?: string;
//   body?: RequestBodyType;
//   formData?: FormDataMap;
//   streamResponseStatusCodes?: Set<number>;
//   proxySettings?: ProxySettings;
//   disableKeepAlive?: boolean;
//   abortSignal?: AbortSignalLike;
//   tracingOptions?: OperationTracingOptions;
//   onUploadProgress?: (progress: TransferProgressEvent) => void;
//   /** Callback which fires upon download progress. */
//   onDownloadProgress?: (progress: TransferProgressEvent) => void;
//   /** Set to true if the request is sent over HTTP instead of HTTPS */
//   allowInsecureConnection?: boolean;
// }
