// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AlphaIdConfiguration } from "../../../src";
import { RestError } from "@azure/core-rest-pipeline";
import { assert } from "chai";

export async function ignoreSubscriptionNotEligibleError(
  call: () => Promise<AlphaIdConfiguration>
): Promise<void> {
  try {
    const configuration = await call();
    assert.isOk(configuration);
  } catch (error) {
    if (error instanceof RestError) {
      console.log(error.statusCode);
      console.log(error.response?.bodyAsText);
      if (
        error?.statusCode === 403 &&
        error?.response?.bodyAsText?.includes("is not eligible for Alpha IDs usage")
      ) {
        return;
      }
    }

    throw error;
  }
}
