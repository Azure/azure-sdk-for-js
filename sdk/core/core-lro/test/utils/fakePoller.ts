import { HttpOperationResponse, WebResource, ServiceClient } from "@azure/core-http";
import { LongRunningOperationStates, Poller, PollerOptionalParameters } from "../../src"

export class FakePoller extends Poller {
  private client: ServiceClient;

  constructor(client: ServiceClient, options: PollerOptionalParameters) {
    super(options);
    this.client = client;
  } 

  protected getStateFromResponse(response: HttpOperationResponse): LongRunningOperationStates {
    let result: LongRunningOperationStates;
    switch (response.status) {
      case 202:
        result = "InProgress";
        break;
      case 204:
        result = "Succeeded";
        break;
      default:
        result = "Failed";
        break;
    }
    return result;
  }

  protected getMillisecondInterval(): number {
    return 100;
  }

  public async sendPollRequest(): Promise<void> {
    const response = await this.client.sendRequest(new WebResource());
    this.processResponse(response);
  }
}
