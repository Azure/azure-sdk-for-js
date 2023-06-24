// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DynamicAlphaIdConfiguration } from "../../../src";
import { RestError } from "@azure/core-rest-pipeline";
import { assert } from "chai";
import { FullOperationResponse, OperationOptions } from "@azure/core-client";

export async function ignoreSubscriptionNotEligibleError(
  call: (operationOptions: OperationOptions) => Promise<DynamicAlphaIdConfiguration>,
  expectedConfiguration: boolean
): Promise<void> {
  try {
    let configurationResponse: FullOperationResponse | undefined;
    const getConfigurationRequest: OperationOptions = {
      onResponse: (response) => {
        configurationResponse = response;
      },
    };
    const configuration = await call(getConfigurationRequest);
    assert.isOk(configuration);
    assert.isTrue(
      configuration.enabled === expectedConfiguration,
      `The expected configuration: ${expectedConfiguration.toString()} is different than the received configuration: ${configuration.enabled.toString()} 
       CV: ${configurationResponse?.headers.get("MS-CV")}`
    );
  } catch (error) {
    if (isNotEligibleError(error)) {
      return;
    }

    throw error;
  }
}

function isNotEligibleError(error: any): boolean {
  let errorMessage = error?.details?.error?.message;

  if (error instanceof RestError) {
    errorMessage = error?.response?.bodyAsText;
  }

  return error.statusCode === 403 && errorMessage.includes("is not eligible for Alpha IDs usage");
}
