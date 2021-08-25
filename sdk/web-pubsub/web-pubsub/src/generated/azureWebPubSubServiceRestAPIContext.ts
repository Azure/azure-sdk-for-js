import * as coreClient from "@azure/core-client";
import { AzureWebPubSubServiceRestAPIOptionalParams } from "./models";

export class AzureWebPubSubServiceRestAPIContext extends coreClient.ServiceClient {
  $host: string;
  apiVersion?: string;

  /**
   * Initializes a new instance of the AzureWebPubSubServiceRestAPIContext class.
   * @param $host server parameter
   * @param options The parameter options
   */
  constructor(
    $host: string,
    options?: AzureWebPubSubServiceRestAPIOptionalParams
  ) {
    if ($host === undefined) {
      throw new Error("'$host' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: AzureWebPubSubServiceRestAPIOptionalParams = {
      requestContentType: "application/json; charset=utf-8"
    };

    const packageDetails = `azsdk-js-azureWebPubSubServiceRestAPI/1.0.0-beta.1`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      baseUri: options.endpoint || "{$host}"
    };
    super(optionsWithDefaults);
    // Parameter assignments
    this.$host = $host;

    // Assigning values to Constant parameters
    this.apiVersion = options.apiVersion || "2021-08-01-preview";
  }
}
