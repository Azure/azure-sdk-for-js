import { HttpClient as IHttpClient, HttpPipelineLogger as IHttpPipelineLogger, ServiceClientOptions as Pipeline, ServiceClientCredentials, RequestPolicyFactory, deserializationPolicy, signingPolicy, RequestOptionsBase, exponentialRetryPolicy, ServiceClient } from "@azure/ms-rest-js";
import { IRetryOptions, RetryPolicyFactory } from "./RetryPolicyFactory";
import {
  ITelemetryOptions,
  TelemetryPolicyFactory
} from "./TelemetryPolicyFactory";
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
   * @param {ServiceClientCredentials} credential that implements signRequet().
   * @param {INewPipelineOptions} [pipelineOptions] Optional. Options.
   * @returns {Pipeline} A new Pipeline object.
   * @memberof SecretsClient
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
      deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
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

  protected readonly credential: ServiceClientCredentials;
  protected readonly client: Secrets;

  constructor(
    url: string,
    credential: ServiceClientCredentials,
    pipelineOptions: INewPipelineOptions = {}
  ) {

    this.vaultBaseUrl = url; // TODO: escape url path?
    this.credential = credential;
    this.pipeline = SecretsClient.getDefaultPipeline(credential as ServiceClientCredentials, pipelineOptions)

    this.client = new Secrets(credential, this.pipeline);
  }

  // TODO: do we want Aborter as well?
  public async setSecret(secretName: string, value: string, options: Models.KeyVaultClientSetSecretOptionalParams = {}) {
    const response = await this.client.setSecret(
        this.vaultBaseUrl,
        secretName,
        value,
        options
    );

    return { name: secretName, value: value, version: this.secretIdToVersion(response.id) };
  }

  public async getSecret(secretName: string, version: string, options: RequestOptionsBase = {}): Promise<string | undefined> {
    const response = await this.client.getSecret(
      this.vaultBaseUrl,
      secretName,
      version
    );
    return response.value;
  }

  public async getSecretVersions(secretName: string, options: Models.KeyVaultClientGetSecretVersionsOptionalParams = {}) {
    const response = await this.client.getSecretVersions(
      this.vaultBaseUrl,
      secretName,
      options
    );

    return response.map((secret) => this.secretIdToVersion(secret.id));
  }

  private secretIdToVersion(id: string | undefined) {
    if (!id) {
      return undefined;
    }
    const lastIndex = id.lastIndexOf("/");
    return lastIndex > 0 && lastIndex < id.length - 1
      ? id.substring(lastIndex + 1)
      : undefined
  }
}