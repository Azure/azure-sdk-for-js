import { HttpClient as IHttpClient, HttpPipelineLogger as IHttpPipelineLogger, ServiceClientOptions as Pipeline, ServiceClientCredentials, RequestPolicyFactory, deserializationPolicy, signingPolicy, RequestOptionsBase, exponentialRetryPolicy } from "@azure/ms-rest-js";
import { IRetryOptions, RetryPolicyFactory } from "./RetryPolicyFactory";
import {
  ITelemetryOptions,
  TelemetryPolicyFactory
} from "./TelemetryPolicyFactory";
import { KeyVaultClient } from "./keyVaultClient";
import * as Models from "./models";
import { Secrets } from './secrets';

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


export class SecretsClient {
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
    const retryOptions = pipelineOptions.retryOptions || {};
    const requestPolicyFactories: RequestPolicyFactory[] = [
      new TelemetryPolicyFactory(pipelineOptions.telemetry),
      // TODO: new UniqueRequestIDPolicyFactory(),
      // TODO: new BrowserPolicyFactory(),
      // TODO deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
      // new RetryPolicyFactory(retryOptions),
      // TODO: or use the one from ms-rest-js?
      exponentialRetryPolicy(retryOptions.maxTries, retryOptions.retryDelayInMs, retryOptions.retryDelayInMs, retryOptions.maxRetryDelayInMs),
      // TODO: new LoggingPolicyFactory(),
      // TODO: the KeyVaultClient constructor already takes a credential.
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

  protected readonly client: Secrets;

  constructor(url: string, credential: ServiceClientCredentials, pipeline?: Pipeline) {
    this.vaultBaseUrl = url; // TODO: escape url path?
    this.pipeline = pipeline || SecretsClient.getDefaultPipeline(credential);
    this.client = new KeyVaultClient(
      credential,
      {
        // TODO: use plain KeyVaultClient for now.  Uncomment after figuring out authentication
        // httpClient: this.pipeline.httpClient,
        // httpPipelineLogger: this.pipeline.httpPipelineLogger,
        // requestPolicyFactories: this.pipeline.requestPolicyFactories
      }
    );
  }

  // TODO: return something more meaningful other than the response.
  // TODO: do we want Aborter as well?
  public setSecret(secretName: string, value: string, options: Models.KeyVaultClientSetSecretOptionalParams = {}): Promise<Models.SetSecretResponse> {
    return this.client.setSecret(
        this.vaultBaseUrl,
        secretName,
        value,
        options
    );
  }

  public async getSecret(secretName: string, version: string, options: RequestOptionsBase = {}): Promise<string | undefined> {
    const response = await this.client.getSecret(
      this.vaultBaseUrl,
      secretName,
      version
    );
    return response.value;
  }

  public getSecretVersions(secretName: string, options: Models.KeyVaultClientGetSecretVersionsOptionalParams = {}) {
    return this.client.getSecretVersions(
      this.vaultBaseUrl,
      secretName,
      options
    );
  }
}