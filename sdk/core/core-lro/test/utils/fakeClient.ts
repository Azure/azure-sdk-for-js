import { HttpOperationResponse, ServiceClient, ServiceClientCredentials, ServiceClientOptions, TokenCredential, RequestOptionsBase } from "@azure/core-http";
import { PollerOptionalParameters } from "../../src"
import { FakePoller } from "./fakePoller";
import { FakeNonCancellablePoller } from "./fakeNonCancellablePoller";

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

  // Normally we would call this.client.sendRequest, from the ServiceClient class.
  public async sendRequest(options?: RequestOptionsBase): Promise<HttpOperationResponse> {
    if (options && options.abortSignal && options.abortSignal.aborted) {
      throw new Error("The request was aborted");
    }
    return this.responses.shift()!;
  }

  public async startLRO(options?: PollerOptionalParameters): Promise<FakePoller> {
    const poller = new FakePoller(
      this,
      {
        manual: false,
        intervalInMs: 10,
        ...options,
      }
    );
    return poller;
  } 

  public async startNonCancellableLRO(options?: PollerOptionalParameters): Promise<FakeNonCancellablePoller> {
    const poller = new FakeNonCancellablePoller(
      this,
      {
        manual: false,
        intervalInMs: 10,
        ...options,
      }
    );
    return poller;
  }
}
