// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DynamicAlphaIdConfiguration } from "../../../src";
import { assert } from "chai";
import { FullOperationResponse, OperationOptions } from "@azure/core-client";

export async function assertAlphaDynamicConfiguration(
  call: (operationOptions: OperationOptions) => Promise<DynamicAlphaIdConfiguration>,
  expectedConfiguration: boolean
): Promise<void> {
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
}
