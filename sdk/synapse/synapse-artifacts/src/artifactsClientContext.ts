import * as coreHttp from "@azure/core-http";
import { ArtifactsClientOptionalParams } from "./models";
import { lroPolicy } from "./lro";

const packageName = "@azure/synapse-artifacts";
const packageVersion = "1.0.0";

export class ArtifactsClientContext extends coreHttp.ServiceClient {
  endpoint: string;
  apiVersion: string;

  /**
   * Initializes a new instance of the ArtifactsClientContext class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint The workspace development endpoint, for example
   *                 https://myworkspace.dev.azuresynapse.net.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    endpoint: string,
    options?: ArtifactsClientOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (endpoint === undefined) {
      throw new Error("'endpoint' cannot be null");
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

    this.baseUri = options.endpoint || "{endpoint}";

    // Parameter assignments
    this.endpoint = endpoint;

    // Assigning values to Constant parameters
    this.apiVersion = options.apiVersion || "2019-06-01-preview";
  }
}
