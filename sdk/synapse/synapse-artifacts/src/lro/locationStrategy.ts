// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { BaseResult, LROOperationStep, LROStrategy, LROSYM } from "./models";
import { SendOperationFn } from "./lroPoller";
import { OperationSpec } from "@azure/core-http";

export function createLocationStrategy<TResult extends BaseResult>(
  initialOperation: LROOperationStep<TResult>,
  sendOperationFn: SendOperationFn<TResult>
): LROStrategy<TResult> {
  const lroData = initialOperation.result._response[LROSYM];
  if (!lroData) {
    throw new Error(
      "Expected lroData to be defined for Azure-AsyncOperation strategy"
    );
  }

  let currentOperation = initialOperation;
  let lastKnownPollingUrl = lroData.location;

  return {
    isTerminal: () => {
      const currentResult = currentOperation.result._response[LROSYM];
      if (!currentResult) {
        throw new Error("Expected lroData to determine terminal status");
      }

      if (currentOperation === initialOperation) {
        return false;
      }

      if (currentResult.statusCode === 202) {
        return false;
      }

      return true;
    },
    sendFinalRequest: () => Promise.resolve(currentOperation),
    poll: async () => {
      if (!lastKnownPollingUrl) {
        throw new Error("Unable to determine polling url");
      }

      const pollingArgs = currentOperation.args;
      // Make sure we don't send any body to the get request
      const { requestBody, ...restSpec } = currentOperation.spec;
      const pollingSpec: OperationSpec = {
        ...restSpec,
        httpMethod: "GET",
        path: lastKnownPollingUrl
      };

      const result = await sendOperationFn(pollingArgs, pollingSpec);

      // Update latest polling url
      lastKnownPollingUrl =
        result._response[LROSYM]?.location || lastKnownPollingUrl;

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
