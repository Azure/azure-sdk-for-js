import { HttpOperationResponse, ServiceClient, ServiceClientCredentials, ServiceClientOptions, TokenCredential } from "@azure/core-http";
import { Poller, PollerOptionalParameters } from "../../src"
import { FakePoller } from "./fakePoller";

export class FakeClient extends ServiceClient {
  public responses: HttpOperationResponse[];
  public credentials: TokenCredential | ServiceClientCredentials;

  constructor(credentials: TokenCredential | ServiceClientCredentials, options?: ServiceClientOptions) {
    super(credentials, options);
    this.responses = [];
    this.credentials = credentials;
  }

  public setResponses(responses: HttpOperationResponse[]): void {
    this.responses = responses;
  }

  // Normally we would call client.sendRequest.
  public async sendRequest(): Promise<HttpOperationResponse> {
    return this.responses.shift()!;
  }

  public async startLRO(options?: PollerOptionalParameters): Promise<Poller> {
    const poller = new FakePoller(
      this,
      {
        automatic: true,
        millisecondInterval: 10,
        ...options,
      }
    );
    await poller.startPolling();
    return poller;
  } 
}
