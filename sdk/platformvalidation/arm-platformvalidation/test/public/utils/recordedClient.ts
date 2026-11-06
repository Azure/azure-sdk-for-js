// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RecorderStartOptions,
  SanitizerOptions,
  VitestTestContext,
} from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { PlatformValidationClient } from "../../../src/index.js";

const replaceableVariables: Record<string, string> = {
  AZURE_SUBSCRIPTION_ID: "00000000-0000-0000-0000-000000000000",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  PLATFORMVALIDATION_RESOURCE_GROUP: "rg-platformvalidation-test",
  PLATFORMVALIDATION_LOCATION: "eastus2euap",
  PLATFORMVALIDATION_ARM_ENDPOINT: "https://recording.management.azure.com",
  PLATFORMVALIDATION_SOURCE_VHD_URI: "https://example.invalid/image.vhd",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  // ARM identities and polling routes must survive sanitization for subsequent SDK calls.
  removeCentralSanitizers: ["AZSDK3430", "AZSDK3493", "AZSDK2030"],
  sanitizerOptions: {
    headerSanitizers: [{ key: "x-ms-operation-identifier", value: "Sanitized" }],
    generalSanitizers: [
      {
        regex: true,
        target: "[A-Za-z0-9._%+-]+@microsoft\\.com",
        value: "sanitized@example.invalid",
      },
    ],
    bodyKeySanitizers: [
      { jsonPath: "$..systemData.createdBy", value: "sanitized@example.invalid" },
      { jsonPath: "$..systemData.lastModifiedBy", value: "sanitized@example.invalid" },
      { jsonPath: "$..principalId", value: "00000000-0000-0000-0000-000000000000" },
      ...["planConfigurationJson", "planConfigurationSnapshot", "inputsJson"].map((key) => ({
        jsonPath: `$..${key}`,
        regex: 'https://[^"\\s]+?\\.vhd(?:\\?[^"\\s]*)?',
        value: "https://example.invalid/image.vhd",
      })),
    ],
  },
};

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\//g, "\\/");
}

export function ownedCloudValidationSanitizers(ownedId: string): SanitizerOptions {
  const group =
    /^\/subscriptions\/[^/]+\/resourceGroups\/([^/]+)\/providers\/Microsoft\.PlatformValidation\/cloudValidations\/[^/]+$/i.exec(
      ownedId,
    )?.[1];
  if (!group) {
    throw new Error("An owned cloud validation resource ID is required");
  }
  const sanitizedId = ownedId
    .replace(
      /^\/subscriptions\/[^/]+/i,
      `/subscriptions/${replaceableVariables.AZURE_SUBSCRIPTION_ID}`,
    )
    .replace(
      /\/resourceGroups\/[^/]+/i,
      `/resourceGroups/${replaceableVariables.PLATFORMVALIDATION_RESOURCE_GROUP}`,
    );
  const identities = `(?:${escapeRegex(ownedId)}|${escapeRegex(sanitizedId)})`;
  const listedValidations = "$.value[?(@.type =~ /cloudvalidations$/i)]";
  return {
    bodyKeySanitizers: [
      { jsonPath: `${listedValidations}.tags.*`, value: "Sanitized" },
      { jsonPath: `${listedValidations}.properties.description`, value: "Sanitized" },
      { jsonPath: `${listedValidations}.name`, value: "other-cloud-validation" },
    ],
    bodySanitizers: [
      {
        regex: true,
        target: `(?i)(?!${identities}(?=[/"\\\\?]|$))/subscriptions/[^/"\\\\]+/resourceGroups/[^/"\\\\]+/providers/Microsoft\\.PlatformValidation/cloudValidations/(?<name>[^/"\\\\?]+)`,
        groupForReplace: "name",
        value: "other-cloud-validation",
      },
      {
        regex: true,
        target: `(?i)/resourceGroups/(?!(?:${escapeRegex(group)}|${replaceableVariables.PLATFORMVALIDATION_RESOURCE_GROUP})(?=[/"\\\\?]|$))[^/"\\\\?]+`,
        value: "/resourceGroups/other-group",
      },
    ],
  };
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export function createClient(recorder: Recorder): PlatformValidationClient {
  return new PlatformValidationClient(
    createTestCredential(),
    assertEnvironmentVariable("AZURE_SUBSCRIPTION_ID"),
    recorder.configureClientOptions({
      endpoint: assertEnvironmentVariable("PLATFORMVALIDATION_ARM_ENDPOINT"),
    }),
  );
}
