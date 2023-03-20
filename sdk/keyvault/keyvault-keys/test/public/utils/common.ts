// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SupportedVersions, TestFunctionWrapper, supports } from "@azure/test-utils";
import { env } from "@azure-tools/test-recorder";
import { assert } from "@azure/test-utils";

export async function assertThrowsAbortError(cb: () => Promise<any>): Promise<void> {
  let passed = false;
  try {
    await cb();
    passed = true;
  } catch (e: any) {
    console.log(`name: ${e.name}, message: ${e.message}`);
    assert.equal(e.name, "AbortError");
  }
  if (passed) {
    throw new Error("Expected cb to throw an AbortError");
  }
}

/**
 * The known API versions that we support.
 */
export const serviceVersions = ["7.0", "7.1", "7.2", "7.3", "7.4"] as const;

/**
 * Fetches the service version to test against. This version could be configured as part of CI
 * and then passed through the environment in order to support testing prior service versions.
 * @returns - The service version to test
 */
export function getServiceVersion(): string {
  return env.SERVICE_VERSION || serviceVersions[serviceVersions.length - 1];
}

/**
 * A convenience wrapper allowing us to limit service versions without using the `versionsToTest` wrapper.
 *
 * @param supportedVersions - The {@link SupportedVersions} to limit this test against.
 * @param serviceVersion - The service version we want to test support for. If omitted we will default to the version returned from {@link getServiceVersion}.
 * @returns A Mocha Wrapper which will skip or execute the chained tests depending the currently tested service version and the supported versions.
 */
export function onVersions(
  supportedVersions: SupportedVersions,
  serviceVersion?: string
): TestFunctionWrapper {
  return supports(serviceVersion || getServiceVersion(), supportedVersions, serviceVersions);
}

/**
 * Acts as a proxy to check with we're running on public or sovereign cloud.
 *
 * @returns - true if running on public cloud, false otherwise.
 */
export function isPublicCloud(): boolean {
  return (env.AZURE_AUTHORITY_HOST ?? "").includes(".microsoftonline.com");
}
