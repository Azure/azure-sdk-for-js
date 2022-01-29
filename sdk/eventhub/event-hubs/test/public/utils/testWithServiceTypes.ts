// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TestFunctionWrapper, isNode, versionsToTest } from "@azure/test-utils";
import { getEnvVarValue } from "./testUtils";

export type SupportedTargets = "mock" | "live";
const serviceVersions: SupportedTargets[] = ["mock", "live"];
const testTarget = getEnvVarValue("TEST_TARGET") || "live";
export function testWithServiceTypes(
  handler: (
    serviceVersion: SupportedTargets,
    onVersions: (supported: SupportedTargets[]) => TestFunctionWrapper
  ) => void
): void {
  // Wrap within an empty `describe` so that nested functions get the mocha
  // context object for the current suite being ran.
  describe("", function () {
    // this.file comes from the current mocha suite context.
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    describe(this.file ?? "", function () {
      versionsToTest(
        serviceVersions,
        { versionForRecording: testTarget },
        function (serviceVersion, ...rest) {
          if (serviceVersion !== testTarget) {
            // The min-max tests don't currently allow us to set the environment variables
            // we use to disable running all targets when TEST_MODE is live.
            // This ensures we only run the tests against the target version we want.
            return;
          }

          if (serviceVersion === "mock" && !isNode) {
            // We don't currently support running tests aginst the mock service in browsers.
            // This can be revisted once the mock service supports websockets.
            return;
          }

          handler(serviceVersion as SupportedTargets, ...rest);
        }
      );
    });
  });
}
