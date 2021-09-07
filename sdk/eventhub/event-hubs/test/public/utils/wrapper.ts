// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode, TestFunctionWrapper, versionsToTest } from "@azure/test-utils";
import { getEnvVarValue } from "./testUtils";

export type SupportedTargets = "mock" | "live";
const serviceVersions: SupportedTargets[] = ["mock", "live"];
const testTarget = getEnvVarValue("TEST_TARGET") || "live";

export function wrapper(
  filePath: string,
  handler: (
    serviceVersion: SupportedTargets,
    onVersions: (supported: SupportedTargets[]) => TestFunctionWrapper
  ) => void
): void {
  describe(filePath, function() {
    versionsToTest(serviceVersions, { versionForRecording: testTarget }, function(
      serviceVersion,
      ...rest
    ) {
      if (serviceVersion === "mock" && !isNode) {
        // We don't currently support running tests aginst the mock service in browsers.
        // This can be revisted once the mock service supports websockets.
        return;
      }

      handler(serviceVersion as SupportedTargets, ...rest);
    });
  });
}
