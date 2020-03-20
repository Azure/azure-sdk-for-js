import { HealthApi, WebPubSubApi } from "./operations";
import { AzureWebPubSubServiceRestAPIContext } from "./azureWebPubSubServiceRestAPIContext";
import { AzureWebPubSubServiceRestAPIOptionalParams } from "./models";

export class AzureWebPubSubServiceRestAPI extends AzureWebPubSubServiceRestAPIContext {
  /**
   * Initializes a new instance of the AzureWebPubSubServiceRestAPI class.
   * @param $host server parameter
   * @param options The parameter options
   */
  constructor(
    $host: string,
    options?: AzureWebPubSubServiceRestAPIOptionalParams
  ) {
    super($host, options);
    this.healthApi = new HealthApi(this);
    this.webPubSubApi = new WebPubSubApi(this);
  }

  healthApi: HealthApi;
  webPubSubApi: WebPubSubApi;
}
