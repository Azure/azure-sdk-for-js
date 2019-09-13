import {
  HttpOperationResponse,
  RestError,
  OperationResponse,
  OperationSpec
} from "@azure/core-http";
import { LongRunningOperationStates } from "../utils/constants";

export function getAzureAsyncOperationHeaderValue(
  response: HttpOperationResponse
): string | undefined {
  return response.headers.get("azure-asyncoperation");
}

export function getProvisioningState(responseBody: any): LongRunningOperationStates | undefined {
  let result: LongRunningOperationStates | undefined;
  if (responseBody) {
    if (responseBody.provisioningState) {
      result = responseBody.provisioningState;
    } else if (responseBody.properties) {
      result = responseBody.properties.provisioningState;
    }
  }
  return result;
}

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

export function getOperationResponse(
  operationSpec: OperationSpec,
  response: HttpOperationResponse
): OperationResponse | undefined {
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
