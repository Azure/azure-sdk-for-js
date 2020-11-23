import * as coreHttp from "@azure/core-http";
import { DnsManagementClientOptionalParams } from "./models";
import { lroPolicy } from "./lro";

const packageName = "@azure/arm-dns";
const packageVersion = "1.0.0";

export class DnsManagementClientContext extends coreHttp.ServiceClient {
  $host: string;
  apiVersion: string;
  subscriptionId: string;

  /**
   * Initializes a new instance of the DnsManagementClientContext class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Specifies the Azure subscription ID, which uniquely identifies the Microsoft
   *                       Azure subscription.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: DnsManagementClientOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (subscriptionId === undefined) {
      throw new Error("'subscriptionId' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    const defaultPipelines = Array.isArray(options.requestPolicyFactories)
      ? options.requestPolicyFactories
      : (coreHttp.createPipelineFromOptions(options)
          .requestPolicyFactories as coreHttp.RequestPolicyFactory[]);

    options = {
      ...options,
      requestPolicyFactories: [lroPolicy(), ...defaultPipelines]
    };

    super(credentials, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "https://management.azure.com";

    // Parameter assignments
    this.subscriptionId = subscriptionId;

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://management.azure.com";
    this.apiVersion = options.apiVersion || "2018-05-01";
  }
}
