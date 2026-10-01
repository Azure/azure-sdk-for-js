// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const EnvVarKeys = {
  ENDPOINT: "CONTENTUNDERSTANDING_ENDPOINT",
  KEY: "CONTENTUNDERSTANDING_KEY",
  TEST_MODE: "TEST_MODE",
  SOURCE_RESOURCE_ID: "CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID",
  SOURCE_REGION: "CONTENTUNDERSTANDING_SOURCE_REGION",
  TARGET_ENDPOINT: "CONTENTUNDERSTANDING_TARGET_ENDPOINT",
  TARGET_RESOURCE_ID: "CONTENTUNDERSTANDING_TARGET_RESOURCE_ID",
  TARGET_REGION: "CONTENTUNDERSTANDING_TARGET_REGION",
  TARGET_KEY: "CONTENTUNDERSTANDING_TARGET_KEY",
  TRAINING_DATA_SAS_URL: "CONTENTUNDERSTANDING_TRAINING_DATA_SAS_URL",
  TRAINING_DATA_STORAGE_ACCOUNT: "CONTENTUNDERSTANDING_TRAINING_DATA_STORAGE_ACCOUNT",
  TRAINING_DATA_CONTAINER: "CONTENTUNDERSTANDING_TRAINING_DATA_CONTAINER",
  TRAINING_DATA_PREFIX: "CONTENTUNDERSTANDING_TRAINING_DATA_PREFIX",
  TEST_COMPLETION_MODEL: "CU_TEST_COMPLETION_MODEL",
  TEST_COMPLETION_MINI_MODEL: "CU_TEST_COMPLETION_MINI_MODEL",
} as const;

export const ENDPOINT = "https://sanitized.services.ai.azure.com/";
export const KEY = "Sanitized";
export const SOURCE_RESOURCE_ID = "placeholder-source-resource-id";
export const SOURCE_REGION = "placeholder-source-region";
export const TARGET_ENDPOINT = "https://sanitized-target.services.ai.azure.com/";
export const TARGET_RESOURCE_ID = "placeholder-target-resource-id";
export const TARGET_REGION = "placeholder-target-region";
export const TARGET_KEY = "Sanitized";
export const TRAINING_DATA_SAS_URL =
  "https://sanitized.blob.core.windows.net/container?sv=sanitized-sas-token";
export const TRAINING_DATA_STORAGE_ACCOUNT = "sanitizedstorage";
export const TRAINING_DATA_CONTAINER = "sanitizedcontainer";
export const TRAINING_DATA_PREFIX = "sanitized-prefix/";

/**
 * Completion model used in recorded/live analyzer creation tests.
 *
 * Env-driven with a per-recording default. A single completion-model string is sent
 * in analyzer creation requests, and the same string is asserted on the round-tripped
 * response. The `envSetupForPlayback` block in `test/public/utils/recordedClient.ts`
 * locks the value during playback so assertions stay deterministic across environments.
 *
 * Default `"gpt-4.1"` matches current recordings. When recordings are refreshed
 * against a preview API version, flip this default (and the matching
 * `envSetupForPlayback` entry) to `"gpt-5.2"` in a single commit — no per-test
 * changes required.
 */
export const TEST_COMPLETION_MODEL = process.env[EnvVarKeys.TEST_COMPLETION_MODEL] ?? "gpt-4.1";

/**
 * Mini completion model used in analyzer creation tests. See
 * {@link TEST_COMPLETION_MODEL} for the env / recording-refresh contract.
 */
export const TEST_COMPLETION_MINI_MODEL =
  process.env[EnvVarKeys.TEST_COMPLETION_MINI_MODEL] ?? "gpt-4.1-mini";
