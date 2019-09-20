import { HttpOperationResponse, RequestOptionsBase, RestError, WebResource, OperationResponse, OperationSpec } from "@azure/core-http";
import { Poller } from "@azure/core-lro";

export function getResponseBody(response: HttpOperationResponse): any {
  let result: any;
  try {
    if (response.parsedBody) {
      result = response.parsedBody;
    } else if (response.bodyAsText && response.bodyAsText.length > 0) {
      result = JSON.parse(response.bodyAsText);
    }
  } catch (error) {
    const deserializationError = new RestError(`Error "${error}" occurred in parsing the responseBody " +
      "while creating the PollingState for Long Running Operation- "${response.bodyAsText}"`);
    deserializationError.request = response.request;
    deserializationError.response = response;
    throw deserializationError;
  }
  return result;
} 

export function getLocationHeaderValue(response: HttpOperationResponse): string | undefined {
  return response.headers.get("location");
}

export function getAzureAsyncOperationHeaderValue(response: HttpOperationResponse): string | undefined {
  return response.headers.get("azure-asyncoperation");
}
 
export function getStateFromResponse(response: HttpOperationResponse, responseBody?: any): LongRunningOperationStates {
  if (responseBody == undefined) {
    responseBody = getResponseBody(response);
  }

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
      const provisioningState: LongRunningOperationStates | undefined = getProvisioningState(responseBody);
      if (provisioningState) {
        result = provisioningState;
      } else if (getAzureAsyncOperationHeaderValue(response) || getLocationHeaderValue(response)) {
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

export function getOperationResponse(operationSpec: OperationSpec, response: HttpOperationResponse): OperationResponse | undefined {
  const statusCode: number = response.status;
  const operationResponses: { [statusCode: string]: OperationResponse } = operationSpec.responses;
  let result: OperationResponse | undefined = operationResponses[statusCode];
  if (!result) {
    if (statusCode === 200) {
      result = operationResponses[201] || operationResponses[202];
    } else if (201 <= statusCode && statusCode <= 299) {
      result = {};
    }
  }
  return result;
}

export async azureServiceClientRequest(poller: Poller, url: string): Promise<HttpOperationResponse> {
  const requestUrl: string = statusUrl.replace(" ", "%20");
  const httpRequest = new WebResource(requestUrl, "GET");
  httpRequest.operationSpec = poller.previousResponse.request.operationSpec;
  httpRequest.operationResponseGetter = getOperationResponse;
  const options: RequestOptionsBase | undefined = poller.requestOptions;

  if (options && options.customHeaders) {
    const customHeaders = options.customHeaders;
    for (const headerName of Object.keys(customHeaders)) {
      httpRequest.headers.set(headerName, customHeaders[headerName]);
    }
  }

  const response = await poller.resources.client.sendRequest(httpRequest);
}
