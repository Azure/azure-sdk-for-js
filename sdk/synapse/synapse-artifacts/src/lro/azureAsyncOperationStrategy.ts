// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  LROStrategy,
  BaseResult,
  LROOperationStep,
  LROResponseInfo,
  FinalStateVia,
  LROSYM
} from "./models";
import { OperationSpec, OperationArguments, OperationResponse } from "@azure/core-http";
import { terminalStates } from "./constants";
import { SendOperationFn } from ".";

export function createAzureAsyncOperationStrategy<TResult extends BaseResult>(
  initialOperation: LROOperationStep<TResult>,
  sendOperationFn: SendOperationFn<TResult>,
  finalStateVia?: FinalStateVia
): LROStrategy<TResult> {
  const lroData = initialOperation.result._response[LROSYM];
  if (!lroData) {
    throw new Error("Expected lroData to be defined for Azure-AsyncOperation strategy");
  }

  let currentOperation = initialOperation;
  let lastKnownPollingUrl = lroData.azureAsyncOperation || lroData.operationLocation;

  return {
    isTerminal: () => {
      const currentResult = currentOperation.result._response[LROSYM];

      if (!currentResult) {
        throw new Error("Expected lroData to determine terminal status");
      }

      if (currentOperation === initialOperation) {
        // Azure-AsyncOperations don't need to check for terminal state
        // on originalOperation result, always need to poll
        return false;
      }

      const { status = "succeeded" } = currentResult;
      return terminalStates.includes(status.toLowerCase());
    },
    sendFinalRequest: async () => {
      if (!initialOperation.result._response[LROSYM]) {
        throw new Error("Expected lroData to determine terminal status");
      }

      if (!currentOperation.result._response[LROSYM]) {
        throw new Error("Expected lroData to determine terminal status");
      }

      const initialOperationResult = initialOperation.result._response[LROSYM];
      const currentOperationResult = currentOperation.result._response[LROSYM];

      if (!shouldPerformFinalGet(initialOperationResult, currentOperationResult)) {
        return currentOperation;
      }

      if (initialOperationResult?.requestMethod === "PUT") {
        currentOperation = await sendFinalGet(initialOperation, sendOperationFn);

        return currentOperation;
      }

      if (initialOperationResult?.location) {
        switch (finalStateVia) {
          case "original-uri":
            currentOperation = await sendFinalGet(initialOperation, sendOperationFn);
            return currentOperation;

          case "azure-async-operation":
            return currentOperation;
          case "location":
          default:
            const location = initialOperationResult.location || currentOperationResult?.location;

            if (!location) {
              throw new Error("Couldn't determine final GET URL from location");
            }

            return await sendFinalGet(initialOperation, sendOperationFn, location);
        }
      }

      // All other cases return the last operation
      return currentOperation;
    },
    poll: async () => {
      if (!lastKnownPollingUrl) {
        throw new Error("Unable to determine polling url");
      }

      const pollingArgs = currentOperation.args;
      // Make sure we don't send any body to the get request
      const { requestBody, responses, ...restSpec } = currentOperation.spec;

      const pollingSpec: OperationSpec = {
        ...restSpec,
        responses: getCompositeMappers(responses),
        httpMethod: "GET",
        path: lastKnownPollingUrl
      };

      const result = await sendOperationFn(pollingArgs, pollingSpec);

      // Update latest polling url
      lastKnownPollingUrl =
        result._response[LROSYM]?.azureAsyncOperation ||
        result._response[LROSYM]?.operationLocation ||
        lastKnownPollingUrl;

      // Update lastOperation result
      currentOperation = {
        args: pollingArgs,
        spec: pollingSpec,
        result
      };

      return currentOperation;
    }
  };
}

/**
 * Polling calls will always return a status object i.e. {"status": "success"}
 * these intermediate responses are not described in the swagger so we need to
 * pass custom mappers at runtime.
 * This function replaces all the existing mappers to be able to deserialize a status object
 * @param responses Original set of responses defined in the operation
 */
function getCompositeMappers(responses: {
  [responseCode: string]: OperationResponse;
}): {
  [responseCode: string]: OperationResponse;
} {
  return Object.keys(responses).reduce((acc, statusCode) => {
    return {
      ...acc,
      [statusCode]: {
        ...responses[statusCode],
        bodyMapper: {
          type: {
            name: "Composite",
            modelProperties: {
              status: {
                serializedName: "status",
                type: {
                  name: "String"
                }
              }
            }
          }
        }
      }
    };
  }, {} as { [responseCode: string]: OperationResponse });
}

function shouldPerformFinalGet(initialResult?: LROResponseInfo, currentResult?: LROResponseInfo) {
  const { status } = currentResult || {};
  const { requestMethod: initialRequestMethod, location } = initialResult || {};
  if (status && status.toLowerCase() !== "succeeded") {
    return false;
  }

  if (initialRequestMethod === "DELETE") {
    return false;
  }

  if (initialRequestMethod !== "PUT" && !location) {
    return false;
  }

  return true;
}

async function sendFinalGet<TResult extends BaseResult>(
  initialOperation: LROOperationStep<TResult>,
  sendOperationFn: SendOperationFn<TResult>,
  path?: string
): Promise<LROOperationStep<TResult>> {
  // Make sure we don't send any body to the get request
  const { requestBody, ...restSpec } = initialOperation.spec;
  const finalGetSpec: OperationSpec = {
    ...restSpec,
    httpMethod: "GET"
  };

  // Send final GET request to the Original URL
  const spec = {
    ...finalGetSpec,
    ...(path && { path })
  };

  const operationArgs: OperationArguments = initialOperation.args;
  if (operationArgs.options) {
    operationArgs.options.shouldDeserialize = true;
  }

  const finalResult = await sendOperationFn(initialOperation.args, spec);

  return {
    args: initialOperation.args,
    spec,
    result: finalResult
  };
}
