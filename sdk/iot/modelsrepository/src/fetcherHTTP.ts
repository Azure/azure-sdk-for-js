// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { OperationOptions, ServiceClient } from "@azure/core-client";
import { createHttpHeaders, createPipelineRequest, HttpHeaders, HttpMethods, PipelineRequest, PipelineResponse, RestError } from "@azure/core-rest-pipeline";
import { logger } from "./logger";
import { Fetcher } from "./fetcherAbstract";

export class HttpFetcher extends Fetcher {
  private _client: ServiceClient;
  private _baseURL: string;

  constructor(baseURL: string, client: ServiceClient) {
    super();
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
      // TODO: Validate with API Review Board that this is an accurate way to raise an error.
      throw new RestError("Error on HTTP Request in remote model fetcher", {statusCode: res.status, response: res, request: request});
    }
  }
}

// Argument of type '
// { 
//   url: string; 
//   method: string; 
//   headers: { [key: string]: string; } | undefined; 
//   timeout: number | undefined;
//   abortSignal: AbortSignalLike | undefined; 
//   tracingOptions: OperationTracingOptions | undefined; 
// }
// ' is not assignable to parameter of type 'PipelineRequestOptions'.
//   Types of property 'method' are incompatible.

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
