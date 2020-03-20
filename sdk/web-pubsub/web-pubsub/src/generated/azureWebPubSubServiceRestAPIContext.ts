import * as coreHttp from "@azure/core-http";
import { AzureWebPubSubServiceRestAPIOptionalParams } from "./models";

const packageName = "WebPubSub";
const packageVersion = "1.0.0";

export class AzureWebPubSubServiceRestAPIContext extends coreHttp.ServiceClient {
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

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(undefined, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "{$host}";

    // Parameter assignments
    this.$host = $host;

    // Assigning values to Constant parameters
    this.apiVersion = options.apiVersion || "2020-10-01";
  }
}
