import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import { PipelineOptions } from "@azure/core-rest-pipeline";
import { createDefaultPipeline } from "./clientHelpers";
import { HttpResponse } from "./common";
import { RequestParameters } from "./pathClientTypes";
import { sendRequest } from "./sendRequest";
import { buildRequestUrl } from "./urlHelpers";

/**
 * Type to use with pathUnchecked, overrides the body type to any to allow flexibility
 */
export type PathUncheckedResponse = HttpResponse & { body: any };

/**
 * Shape of a Rest Level Client
 */
export interface Client {
  /**
   * This method will be used to send request that would check the path to provide
   * strong types
   */
  path: (
    path: string,
    ...args: Array<any>
  ) => {
    get: (options?: RequestParameters) => Promise<HttpResponse>;
    post: (options?: RequestParameters) => Promise<HttpResponse>;
    put: (options?: RequestParameters) => Promise<HttpResponse>;
    patch: (options?: RequestParameters) => Promise<HttpResponse>;
    delete: (options?: RequestParameters) => Promise<HttpResponse>;
    head: (options?: RequestParameters) => Promise<HttpResponse>;
    options: (options?: RequestParameters) => Promise<HttpResponse>;
    trace: (options?: RequestParameters) => Promise<HttpResponse>;
  };
  /**
   * This method allows arbitrary paths and doesn't provide strong types
   */
  pathUnchecked: (
    path: string,
    ...args: Array<any>
  ) => {
    get: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    post: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    put: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    patch: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    delete: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    head: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    options: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    trace: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
  };
}

/**
 * Creates a client with a default pipeline
 * @param baseUrl Base endpoint for the client
 * @param options Client options
 */
export function getClient(baseUrl: string, options?: PipelineOptions): Client;
/**
 * Creates a client with a default pipeline
 * @param baseUrl Base endpoint for the client
 * @param credentials Credentials to authenticate the requests
 * @param options Client options
 */
export function getClient(
  baseUrl: string,
  credentials?: TokenCredential | KeyCredential,
  options?: PipelineOptions
): Client;
export function getClient(
  baseUrl: string,
  credentialsOrPipelineOptions?: (TokenCredential | KeyCredential) | PipelineOptions,
  opts: PipelineOptions = {}
): Client {
  let credentials: TokenCredential | KeyCredential | undefined;
  let options = opts;

  if (credentialsOrPipelineOptions) {
    if (isCredential(credentialsOrPipelineOptions)) {
      credentials = credentialsOrPipelineOptions;
      options = opts;
    } else {
      options = credentialsOrPipelineOptions || {};
    }
  }

  const pipeline = createDefaultPipeline(baseUrl, credentials, options);
  pipeline.removePolicy({ name: "exponentialRetryPolicy" });
  const client = (path: string, ...args: Array<any>) => {
    return {
      get: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("GET", url, pipeline, options);
      },
      post: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("POST", url, pipeline, options);
      },
      put: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("PUT", url, pipeline, options);
      },
      patch: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("PATCH", url, pipeline, options);
      },
      delete: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("DELETE", url, pipeline, options);
      },
      head: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("HEAD", url, pipeline, options);
      },
      options: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("OPTIONS", url, pipeline, options);
      },
      trace: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("TRACE", url, pipeline, options);
      },
    };
  };

  return {
    path: client,
    pathUnchecked: client,
  };
}

function isCredential(
  param: (TokenCredential | KeyCredential) | PipelineOptions
): param is TokenCredential | KeyCredential {
  if ((param as any).key || isTokenCredential(param)) {
    return true;
  }

  return false;
}
