import {
  BaseRequestPolicy,
  HttpClient as IHTTPClient,
  HttpHeaders,
  HttpOperationResponse,
  HttpPipelineLogger as IHTTPPipelineLogger,
  HttpPipelineLogLevel,
  RequestPolicyFactory,
  ServiceClientOptions,
  WebResource
} from "ms-rest-js";

// Export following interfaces and types for customers who want to implement their
// own RequestPolicy or HTTPClient
export {
  IHTTPClient,
  IHTTPPipelineLogger,
  HttpHeaders,
  HttpPipelineLogLevel,
  HttpOperationResponse,
  WebResource,
  BaseRequestPolicy
};

/**
 * Option interface for Pipeline constructor.
 *
 * @export
 * @interface IPipelineOptions
 */
export interface IPipelineOptions {
  logger?: IHTTPPipelineLogger;
  HTTPClient?: IHTTPClient;
}

/**
 * A Pipeline class containing HTTP request policies.
 *
 * @export
 * @class Pipeline
 */
export class Pipeline {
  public factories: RequestPolicyFactory[];
  public options: IPipelineOptions;

  constructor(
    factories: RequestPolicyFactory[],
    options: IPipelineOptions = {}
  ) {
    this.factories = factories;
    this.options = options;
  }

  /**
   * Transfer Pipeline object to ServiceClientOptions object which required by
   * ServiceClient constructor.
   *
   * @returns {ServiceClientOptions}
   * @memberof Pipeline
   */
  public toServiceClientOptions(): ServiceClientOptions {
    return {
      httpClient: this.options.HTTPClient,
      httpPipelineLogger: this.options.logger,
      requestPolicyFactories: this.factories
    };
  }
}
