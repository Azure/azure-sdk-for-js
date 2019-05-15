import {
  HttpClient as IHttpClient,
  HttpPipelineLogger as IHttpPipelineLogger,
  ServiceClientCredentials,
  RequestPolicyFactory,
  deserializationPolicy,
  signingPolicy,
  RequestOptionsBase,
  exponentialRetryPolicy,
  redirectPolicy,
  systemErrorRetryPolicy,
  generateClientRequestIdPolicy,
  proxyPolicy,
  throttlingRetryPolicy,
  getDefaultProxySettings,
  userAgentPolicy
} from "@azure/ms-rest-js";
  
import {GetAllCertificatesOptions, CertificateAttributes, Certificate, DeletedCertificate} from "./certificatesModels";
import { AzureServiceClientOptions as Pipeline, getDefaultUserAgentValue } from "@azure/ms-rest-azure-js";
import { NewPipelineOptions, isNewPipelineOptions } from "./pipeline";
import { TelemetryOptions } from ".";
import { CertificateBundle } from "./models";
import { KeyVaultClient } from "./keyVaultClient";
import { RetryConstants, SDK_VERSION } from "./utils/constants";
import { parseKeyvaultIdentifier as parseKeyvaultEntityIdentifier } from "./utils";

export class CertificatesClient {
  /**
   * A static method used to create a new Pipeline object with the provided Credential.
   *
   * @static
   * @param {ServiceClientCredentials} credential that implements signRequet().
   * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
   * @returns {Pipeline} A new Pipeline object.
   * @memberof CertificatesClient
   */
  public static getDefaultPipeline(
    credential: ServiceClientCredentials,
    pipelineOptions: NewPipelineOptions = {}
  ): Pipeline {
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    const retryOptions = pipelineOptions.retryOptions || {};

    const userAgentString: string = CertificatesClient.getUserAgentString(pipelineOptions.telemetry);

    const requestPolicyFactories: RequestPolicyFactory[] = [
      proxyPolicy(getDefaultProxySettings((pipelineOptions.proxyOptions || {}).proxySettings)),
      userAgentPolicy({ value: userAgentString }),
      generateClientRequestIdPolicy(),
      deserializationPolicy(), // Default deserializationPolicy is provided by protocol layer
      throttlingRetryPolicy(),
      systemErrorRetryPolicy(),
      exponentialRetryPolicy(
        retryOptions.retryCount,
        retryOptions.retryIntervalInMS,
        RetryConstants.MIN_RETRY_INTERVAL_MS, // Minimum retry interval to prevent frequent retries
        retryOptions.maxRetryDelayInMs
      ),
      redirectPolicy(),
      signingPolicy(credential)
    ];

    return {
      httpClient: pipelineOptions.HTTPClient,
      httpPipelineLogger: pipelineOptions.logger,
      requestPolicyFactories
    };
  }

  public readonly vaultBaseUrl: string;

  public readonly pipeline: Pipeline;

  protected readonly credential: ServiceClientCredentials;
  private readonly client: KeyVaultClient;

  /**
   * Creates an instance of CertificatesClient.
   * @param {string} url the base url to the key vault.
   * @param {ServiceClientCredentials} credential credential.
   * @param {(Pipeline | NewPipelineOptions)} [pipelineOrOptions={}] Optional. A Pipeline, or options to create a default Pipeline instance.
   *                                                                 Omitting this parameter to create the default Pipeline instance.
   * @memberof CertificatesClient
   */
  constructor(
    url: string,
    credential: ServiceClientCredentials,
    pipelineOrOptions: Pipeline | NewPipelineOptions = {}
  ) {
    this.vaultBaseUrl = url;
    this.credential = credential;
    if (isNewPipelineOptions(pipelineOrOptions)) {
      this.pipeline = CertificatesClient.getDefaultPipeline(
        credential as ServiceClientCredentials,
        pipelineOrOptions
      );
    } else {
      this.pipeline = pipelineOrOptions;
    }

    this.client = new KeyVaultClient(credential, this.pipeline);
  }

  private static getUserAgentString(telemetry?: TelemetryOptions) {
    const userAgentInfo: string[] = [];
    if (telemetry) {
      if (userAgentInfo.indexOf(telemetry.value) === -1) {
        userAgentInfo.push(telemetry.value);
      }
    }
    const libInfo = `Azure-KeyVault-Certificates/${SDK_VERSION}`;
    if (userAgentInfo.indexOf(libInfo) === -1) {
      userAgentInfo.push(libInfo);
    }
    const defaultUserAgentInfo = getDefaultUserAgentValue();
    if (userAgentInfo.indexOf(defaultUserAgentInfo) === -1) {
      userAgentInfo.push(defaultUserAgentInfo);
    }
    return userAgentInfo.join(" ");
  }

  /**
   * Iterates the latest version of all certificates in the vault.  The full certificate identifier and attributes are provided
   * in the response. No values are returned for the certificates. This operations requires the certificates/list permission.
   * @summary List all versions of the specified certificate.
   * @param [options] The optional parameters
   * @returns AsyncIterableIterator<Certificate>
   */
  public async *getAllCertificates(options?: GetAllCertificatesOptions): AsyncIterableIterator<CertificateAttributes> {
    let currentSetResponse = await this.client.getCertificates(
      this.vaultBaseUrl,
      {
        maxresults: options ? options.maxPageSize : undefined,
        maxPageSize: options ? options.maxPageSize : undefined,
        ...(options && options.requestOptions ? options.requestOptions : {})
      }
    );
    yield* currentSetResponse.map(this.getCertificateFromCertificateBundle);

    while (currentSetResponse.nextLink) {
      currentSetResponse = await this.client.getCertificatesNext(
        currentSetResponse.nextLink,
        options
      );
      yield* currentSetResponse.map(this.getCertificateFromCertificateBundle);
    }
  }

  /**
   * The DELETE operation applies to any certificate stored in Azure Key Vault. DELETE cannot be applied
   * to an individual version of a certificate. This operation requires the certificates/delete permission.
   * @summary Deletes a certificate from a specified key vault.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param certificateName The name of the c.
   * @param [options] The optional parameters
   * @returns Promise<DeletedCertificate>
   */
  public async deleteCertificate(
    certificateName: string,
    options?: RequestOptionsBase
  ): Promise<DeletedCertificate> {
    const response = await this.client.deleteCertificate(this.vaultBaseUrl, certificateName, options);
    return this.getCertificateFromCertificateBundle(response);
  }

  private getCertificateFromCertificateBundle(certificateBundle: CertificateBundle): Certificate {
    const parsedId = parseKeyvaultEntityIdentifier("certificates", certificateBundle.id);

    let resultObject;
    if (certificateBundle.attributes) {
      resultObject = {
        ...certificateBundle,
        ...parsedId,
        ...certificateBundle.attributes
      }
      delete (resultObject.attributes);
    } else {
      resultObject = {
        ...certificateBundle,
        ...parsedId
      }
    }

    return resultObject;
  }
}