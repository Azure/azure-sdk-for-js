import { HttpClient as IHttpClient, HttpPipelineLogger as IHttpPipelineLogger, ServiceClientOptions as Pipeline, ServiceClientCredentials, RequestPolicyFactory, deserializationPolicy, signingPolicy } from "@azure/ms-rest-js";
import { IRetryOptions, RetryPolicyFactory } from "./RetryPolicyFactory";
import {
  ITelemetryOptions,
  TelemetryPolicyFactory
} from "./TelemetryPolicyFactory";
import { KeyVaultClient } from "./keyVaultClient";
import * as Models from "./models";

/**
 * Option interface for Pipeline.newPipeline method.
 *
 * @export
 * @interface INewPipelineOptions
 */
export interface INewPipelineOptions {
    /**
     * Telemetry configures the built-in telemetry policy behavior.
     *
     * @type {ITelemetryOptions}
     * @memberof INewPipelineOptions
     */
    telemetry?: ITelemetryOptions;
    retryOptions?: IRetryOptions;

    logger?: IHttpPipelineLogger;
    httpClient?: IHttpClient;
  }


export class SecretClient {
  /**
   * A static method used to create a new Pipeline object with Credential provided.
   *
   * @static
   * @param {Credential} credential Such as AnonymousCredential, SharedKeyCredential.
   * @param {INewPipelineOptions} [pipelineOptions] Optional. Options.
   * @returns {Pipeline} A new Pipeline object.
   * @memberof StorageURL
   */
  public static getDefaultPipeline(
    credential: ServiceClientCredentials,
    pipelineOptions: INewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const requestPolicyFactories: RequestPolicyFactory[] = [
      new TelemetryPolicyFactory(pipelineOptions.telemetry),
      // TODO: new UniqueRequestIDPolicyFactory(),
      // TODO: new BrowserPolicyFactory(),
      deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
      new RetryPolicyFactory(pipelineOptions.retryOptions),
      // TODO: new LoggingPolicyFactory(),
      signingPolicy(credential)
    ];

    return  {
      httpClient: pipelineOptions.httpClient,
      httpPipelineLogger: pipelineOptions.logger,
      requestPolicyFactories
    };
  }

  public readonly vaultBaseUrl: string;

  public readonly pipeline: Pipeline;

  protected readonly client: KeyVaultClient;

  constructor(url: string, credential: ServiceClientCredentials, pipeline: Pipeline) {
    this.vaultBaseUrl = url; // TODO: escape url path?
    this.pipeline = pipeline;
    this.client = new KeyVaultClient(
      credential,
      {
        httpClient: pipeline.httpClient,
        httpPipelineLogger: pipeline.httpPipelineLogger,
        requestPolicyFactories: pipeline.requestPolicyFactories
      }
    );
  }

  // TODO: do we want Aborter as well?
  setSecret(secretName: string, value: string, options: Models.KeyVaultClientSetSecretOptionalParams = {}): Promise<Models.SetSecretResponse> {
    return this.client.setSecret(
        this.vaultBaseUrl,
        secretName,
        value,
        options
    )
  }
}