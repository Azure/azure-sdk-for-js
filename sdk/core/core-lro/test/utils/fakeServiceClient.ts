import { HttpOperationResponse, ServiceClient, ServiceClientCredentials, ServiceClientOptions, TokenCredential, RequestOptionsBase } from "@azure/core-http";

export class FakeServiceClient extends ServiceClient {
  public responses: HttpOperationResponse[];
  public initialResponse?: HttpOperationResponse;
  public finalResponse?: HttpOperationResponse;
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
  public async sendInitialRequest(options?: RequestOptionsBase): Promise<HttpOperationResponse> {
    if (options && options.abortSignal && options.abortSignal.aborted) {
      throw new Error("The request was aborted");
    }
    return this.initialResponse!;
  }
  public async sendFinalRequest(options?: RequestOptionsBase): Promise<HttpOperationResponse> {
    if (options && options.abortSignal && options.abortSignal.aborted) {
      throw new Error("The request was aborted");
    }
    return this.finalResponse!;
  }
}
