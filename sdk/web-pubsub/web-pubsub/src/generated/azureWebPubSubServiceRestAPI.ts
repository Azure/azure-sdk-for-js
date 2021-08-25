import { HealthApiImpl, WebPubSubImpl } from "./operations";
import { HealthApi, WebPubSub } from "./operationsInterfaces";
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
    this.healthApi = new HealthApiImpl(this);
    this.webPubSub = new WebPubSubImpl(this);
  }

  healthApi: HealthApi;
  webPubSub: WebPubSub;
}
