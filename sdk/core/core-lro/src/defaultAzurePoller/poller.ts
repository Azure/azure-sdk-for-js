import {
  HttpOperationResponse,
  RestError,
  stripRequest,
  WebResource,
  ServiceClient
} from "@azure/core-http";
import {
  getAzureAsyncOperationHeaderValue,
  getProvisioningState,
  getResponseBody,
  getOperationResponse
} from "./utils";
import { Poller, PollerOptionalParameters, LongRunningOperationStates } from "../";

export class DefaultAzurePoller extends Poller {
  private client: ServiceClient;
  private initialRequest: WebResource;

  constructor(
    client: ServiceClient,
    initialRequest: WebResource,
    options: PollerOptionalParameters
  ) {
    super(options);
    this.client = client;
    this.initialRequest = initialRequest;
  }

  public async startPolling(): Promise<void> {
    const initialResponse = await this.client.sendRequest(this.initialRequest);
    const statusCode: number = initialResponse.status;

    if (getAzureAsyncOperationHeaderValue(initialResponse)) {
      this.processResponse(initialResponse);
      this.poll();
    } else if (
      statusCode !== 201 &&
      statusCode !== 202 &&
      !this.isFinished(this.getStateFromResponse(initialResponse))
    ) {
      throw new Error("Can't determine long running operation polling strategy.");
    }
  }

  protected getStateFromResponse(response: HttpOperationResponse): LongRunningOperationStates {
    const responseBody = getResponseBody(response);

    let result: LongRunningOperationStates;
    switch (response.status) {
      case 202:
        result = "InProgress";
        break;
      case 204:
        result = "Succeeded";
        break;
      case 201:
        result = getProvisioningState(responseBody) || "InProgress";
        break;
      case 200:
        const provisioningState: LongRunningOperationStates | undefined = getProvisioningState(
          responseBody
        );
        if (provisioningState) {
          result = provisioningState;
        } else if (getAzureAsyncOperationHeaderValue(response)) {
          result = "InProgress";
        } else {
          result = "Succeeded";
        }
        break;
      default:
        result = "Failed";
        break;
    }

    return result;
  }

  protected getMillisecondInterval(): number {
    let delayInSeconds = 30;
    const mostRecentResponse = this.responses[this.responses.length - 1];
    const retryAfterHeaderValue: string | undefined = mostRecentResponse.headers.get("retry-after");
    if (retryAfterHeaderValue) {
      const retryAfterDelayInSeconds: number = parseInt(retryAfterHeaderValue);
      if (!Number.isNaN(retryAfterDelayInSeconds)) {
        delayInSeconds = retryAfterDelayInSeconds;
      }
    }
    return delayInSeconds * 1000;
  }

  protected async sendPollRequest(): Promise<void> {
    const mostRecentResponse = this.responses[this.responses.length - 1];
    const headerUrl = getAzureAsyncOperationHeaderValue(mostRecentResponse) || "";

    const requestUrl: string = headerUrl.replace(" ", "%20");
    const httpRequest = new WebResource(requestUrl, "GET");
    httpRequest.operationSpec = mostRecentResponse.request.operationSpec;
    httpRequest.shouldDeserialize = true;
    httpRequest.operationResponseGetter = getOperationResponse;

    const response = await this.client.sendRequest(httpRequest);

    if (this.requestOptions && this.requestOptions.customHeaders) {
      const customHeaders = this.requestOptions.customHeaders;
      for (const headerName of Object.keys(customHeaders)) {
        httpRequest.headers.set(headerName, customHeaders[headerName]);
      }
    }

    const statusCode: number = response.status;
    const parsedResponse: any = response.parsedBody;
    const validStatusCodes = [200, 201, 202, 204];

    if (!validStatusCodes.includes(statusCode)) {
      const error = new RestError(
        `Invalid status code (${statusCode}) with response body "${response.bodyAsText}" occurred when polling for operation status.`
      );
      error.statusCode = statusCode;
      error.request = stripRequest(response.request);
      error.response = response;
      error.body = parsedResponse;
      throw error;
    }

    if (!parsedResponse) {
      throw new Error("The response from long running operation does not contain a body.");
    } else if (!parsedResponse.status) {
      throw new Error(
        `The response "${response.bodyAsText}" from long running operation does not contain the status property.`
      );
    }

    this.processResponse(response);
  }
}
