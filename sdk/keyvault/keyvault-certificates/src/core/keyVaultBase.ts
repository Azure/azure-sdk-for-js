import { AzureServiceClientOptions as Pipeline } from "@azure/ms-rest-azure-js";
import {
  HttpClient as IHttpClient,
  HttpPipelineLogger as IHttpPipelineLogger
} from "@azure/ms-rest-js";

import { RetryOptions, ProxyOptions, TelemetryOptions } from ".";

export { Pipeline }

export interface ParsedKeyVaultEntityIdentifier {
  /** 
   * @member {string} [vaultUrl] The vault URI.
   */
  vaultUrl: string;
  /** 
   * @member {string} [version] The version of key/secret/certificate. May be undefined.
   */
  version?: string;
  /** 
   * @member {string} [name] The name of key/secret/certificate.
   */
  name: string;
}

/**
* Option interface for Pipeline.newPipeline method.
*
* Properties of this interface should not overlap with properties of {@link Pipeline}
* as we use them to differentiate instances of NewPipelineOptions from instances of Pipeline.
* If this interface is modified, the method isNewPipelineOptions() should also be updated
* to adapt the changes.
*
* @export
* @interface NewPipelineOptions
*/
export interface NewPipelineOptions {
  /**
   * Telemetry configures the built-in telemetry policy behavior.
   *
   * @type {TelemetryOptions}
   * @memberof NewPipelineOptions
   */
  telemetry?: TelemetryOptions;
  retryOptions?: RetryOptions;
  proxyOptions?: ProxyOptions;

  logger?: IHttpPipelineLogger;
  HTTPClient?: IHttpClient;
}

export function isNewPipelineOptions(
  pipelineOrOptions: Pipeline | NewPipelineOptions
): pipelineOrOptions is NewPipelineOptions {
  // An empty object is consider options
  function isEmptyObject(obj: Pipeline | NewPipelineOptions) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  const options = pipelineOrOptions as NewPipelineOptions;
  return (
    isEmptyObject(pipelineOrOptions) ||
    !!(options.retryOptions || options.proxyOptions || options.logger || options.HTTPClient)
  );
}
