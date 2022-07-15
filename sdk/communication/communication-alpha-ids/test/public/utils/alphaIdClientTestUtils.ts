import { RestError } from "@azure/core-rest-pipeline";
import { assert } from "chai";
import { AlphaIdConfiguration } from "../../../src";

export async function ignoreSubscriptionNotEligibleError(call: () => Promise<AlphaIdConfiguration>) {
  try {
    var configuration = await call();
    assert.isOk(configuration);
  } catch (error) {
    if (error instanceof RestError) {
      if (error?.statusCode == 403 && error?.response?.bodyAsText?.includes("is not eligible for Alpha IDs usage")) {
        return;
      }
    }

    throw error;
  }
}
