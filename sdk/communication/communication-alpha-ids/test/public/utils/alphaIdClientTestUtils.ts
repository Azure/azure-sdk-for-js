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
    if (isNotEligibleError(error)) {
      return;
    } else {
      console.log("Not a RestError");
      console.log(error);
    }

    throw error;
  }
}

function isNotEligibleError(error: any) {
  let errorMessage = error?.details?.error?.message;

  if (error instanceof RestError) {
    errorMessage = error?.response?.bodyAsText;
  }

  return error.statusCode === 403 && errorMessage.includes("is not eligible for Alpha IDs usage");
}
