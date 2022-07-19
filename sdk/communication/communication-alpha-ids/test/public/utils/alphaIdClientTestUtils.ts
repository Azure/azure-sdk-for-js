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
      console.log("RestError thrown");
      console.log(error);
      if (error?.response?.bodyAsText?.includes("is not eligible for Alpha IDs usage")) {
        return;
      }
    } else {
      console.log("Not a RestError");
      console.log(error);
    }

    throw error;
  }
}
