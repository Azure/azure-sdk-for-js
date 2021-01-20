// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { LROStrategy, BaseResult, LROOperationStep, LROSYM } from "./models";
import { OperationSpec } from "@azure/core-http";
import { terminalStates } from "./constants";
import { SendOperationFn } from "./lroPoller";

/**
 * Creates a polling strategy based on BodyPolling which uses the provisioning state
 * from the result to determine the current operation state
 */
export function createBodyPollingStrategy<TResult extends BaseResult>(
  initialOperation: LROOperationStep<TResult>,
  sendOperation: SendOperationFn<TResult>
): LROStrategy<TResult> {
  if (!initialOperation.result._response[LROSYM]) {
    throw new Error("Expected lroData to be defined for BodyPolling strategy");
  }

  let currentOperation = initialOperation;

  return {
    isTerminal: () => {
      const currentResult = currentOperation.result._response[LROSYM];
      if (!currentResult) {
        throw new Error("Expected lroData to determine terminal status");
      }

      const { provisioningState = "succeeded" } = currentResult;
      // If provisioning state is missing, default to Success

      return terminalStates.includes(provisioningState.toLowerCase());
    },
    sendFinalRequest: () => {
      // BodyPolling doesn't require a final get so return the lastOperation
      return Promise.resolve(currentOperation);
    },
    poll: async () => {
      // When doing BodyPolling, we need to poll to the original url with a
      // GET http method
      const { requestBody, ...restSpec } = initialOperation.spec;
      const pollingSpec: OperationSpec = {
        // Make sure we don't send any body to the get request
        ...restSpec,
        httpMethod: "GET"
      };

      // Execute the polling operation
      initialOperation.result = await sendOperation(initialOperation.args, pollingSpec);
      return initialOperation;
    }
  };
}
