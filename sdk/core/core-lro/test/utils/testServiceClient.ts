import { HttpOperationResponse, ServiceClient, ServiceClientCredentials, ServiceClientOptions, TokenCredential, RequestOptionsBase } from "@azure/core-http";

export class TestServiceClient extends ServiceClient {
  private responses: HttpOperationResponse[] = [];
  private initialResponse?: HttpOperationResponse;
  private finalResponse?: HttpOperationResponse;
  public credentials: TokenCredential | ServiceClientCredentials;

  constructor(credentials: TokenCredential | ServiceClientCredentials, options?: ServiceClientOptions) {
    super(credentials, options);
    this.credentials = credentials;
  }

  public setResponses(responses: HttpOperationResponse[]): void {
    this.initialResponse = responses[0];
    this.responses = responses.slice(1, -1);
    this.finalResponse = responses[responses.length - 1];
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
