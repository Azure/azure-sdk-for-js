// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { env } from "@azure-tools/test-recorder";
import { SupportedVersions, supports, TestFunctionWrapper } from "@azure/test-utils";
import { LATEST_API_VERSION, SUPPORTED_API_VERSIONS } from "../../../src/constants";

export async function assertThrowsAbortError(cb: () => Promise<any>): Promise<void> {
  let passed = false;
  try {
    await cb();
    passed = true;
  } catch (e) {
    console.log(`name: ${e.name}, message: ${e.message}`);
    assert.equal(e.name, "AbortError");
    assert.equal(e.message, "The operation was aborted.");
  }

  if (passed) {
    throw new Error("Expected cb to throw an AbortError");
  }
}

export function formatName(name: string): string {
  return name.replace(/[^0-9a-zA-Z-]/g, "");
}

// Receives:
//   https://uri.blob.core.windows.net/backup/<id>
// Splits into:
//   ["https:", "", "uri.blob.core.windows.net", "backup", "<id>"]
// Returns:
//   "<id>"
export function getFolderName(uri: string): string {
  return uri.split("/")[4];
}

/**
 * Safely get an environment variable by name, throwing an error if it doesn't exist.
 * @param envVarName The name of the environment variable to return
 */
export function getEnvironmentVariable(envVarName: string) {
  const envVar = env[envVarName];
  if (!envVar) {
    throw new Error(`Missing required environment variable ${envVarName}`);
  }
  return envVar;
}

/**
 * Get a predefined SAS token and Storage URI to use when backing up a KeyVault
 */
export function getSasToken() {
  const baseStorageUri = getEnvironmentVariable("BLOB_STORAGE_URI").replace(/\/$/, "");
  const blobStorageUri = `${baseStorageUri}/${getEnvironmentVariable("BLOB_CONTAINER_NAME")}`;
  const blobSasToken = getEnvironmentVariable("BLOB_STORAGE_SAS_TOKEN");

  return { blobStorageUri, blobSasToken };
}

/**
 * The known API versions that we support.
 */
export const serviceVersions = ["7.2"] as const;

/**
 * Fetches the service version to test against. This version could be configured as part of CI
 * and then passed through the environment in order to support testing prior service versions.
 * @returns - The service version to test
 */
export function getServiceVersion(): SUPPORTED_API_VERSIONS {
  return env.SERVICE_VERSION || LATEST_API_VERSION;
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
  serviceVersion?: SUPPORTED_API_VERSIONS
): TestFunctionWrapper {
  return supports(serviceVersion || getServiceVersion(), supportedVersions, serviceVersions);
}
