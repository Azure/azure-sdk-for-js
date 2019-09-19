import { HttpOperationResponse, WebResource, ServiceClient, RequestOptionsBase } from "@azure/core-http";
import { LongRunningOperationStates, Poller, PollerOptionalParameters } from "../../src"

export class FakeNonCancellablePoller extends Poller {
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
      default:
        result = "Failed";
        break;
    }
    return result;
  }

  // Ignoring options?: RequestOptionsBase since we won't do a real API call here.
  public async cancel(options?: RequestOptionsBase): Promise<void> {
    const requestOptions = options || this.requestOptions;
    if (requestOptions && requestOptions.abortSignal && requestOptions.abortSignal.aborted) {
      // This will throw
      await this.client!.sendRequest(new WebResource(
        undefined, // url?: string,
        undefined, // method?: HttpMethods,
        undefined, // body?: any,
        undefined, // query?: { [key: string]: any },
        undefined, // headers?: { [key: string]: any } | HttpHeaders,
        undefined, // streamResponseBody?: boolean,
        undefined, // withCredentials?: boolean,
        requestOptions && requestOptions.abortSignal, // abortSignal?: AbortSignalLike,
        undefined, // timeout?: number,
        undefined, // onUploadProgress?: (progress: TransferProgressEvent) => void,
        undefined, // onDownloadProgress?: (progress: TransferProgressEvent) => void,
        undefined, // proxySettings?: ProxySettings,
        undefined  // keepAlive?: boolean
      ));
    }
    throw new Error("Cancellation not supported");
  }

  protected async initialRequest(options?: RequestOptionsBase): Promise<void> {
    return this.sendRequest(options);
  };
 
  protected async sendRequest(options?: RequestOptionsBase): Promise<void> {
    if (!this.client) return;
    this.totalSentRequests++;
    const requestOptions = options || this.requestOptions;
    const response = await this.client.sendRequest(new WebResource(
      undefined, // url?: string,
      undefined, // method?: HttpMethods,
      undefined, // body?: any,
      undefined, // query?: { [key: string]: any },
      undefined, // headers?: { [key: string]: any } | HttpHeaders,
      undefined, // streamResponseBody?: boolean,
      undefined, // withCredentials?: boolean,
      requestOptions && requestOptions.abortSignal, // abortSignal?: AbortSignalLike,
      undefined, // timeout?: number,
      undefined, // onUploadProgress?: (progress: TransferProgressEvent) => void,
      undefined, // onDownloadProgress?: (progress: TransferProgressEvent) => void,
      undefined, // proxySettings?: ProxySettings,
      undefined  // keepAlive?: boolean
    ));
    this.processResponse(response);
  }
}
