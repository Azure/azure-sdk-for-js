import { HttpOperationResponse, WebResource, ServiceClient, RequestOptionsBase } from "@azure/core-http";
import { LongRunningOperationStates, Poller, PollerOptionalParameters } from "../../src"

export class FakePoller extends Poller {
  private client?: ServiceClient;
  public totalSentRequests: number = 0;

  constructor(client: ServiceClient, options: PollerOptionalParameters) {
    super({
      ...options,
      noInitialRequest: true,
    });
    this.client = client;
    // Got to call this again, because I can't set the client before super()
    if (this.manual) return;
    this.initialRequest().then(() => this.loop());
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
      case 205:
        result = "Cancelled";
        break;
      default:
        result = "Failed";
        break;
    }
    return result;
  }

  // Ignoring options?: RequestOptionsBase since we won't do a real API call here.
  public async cancel(_?: RequestOptionsBase): Promise<void> {
    this.processResponse({
      status: 205
    } as HttpOperationResponse);
    return;
  }

  protected async initialRequest(): Promise<void> {
    return this.sendRequest();
  };

  protected async sendRequest(): Promise<void> {
    if (!this.client) return;
    this.totalSentRequests++;
    const response = await this.client.sendRequest(new WebResource());
    this.processResponse(response);
  }
}
