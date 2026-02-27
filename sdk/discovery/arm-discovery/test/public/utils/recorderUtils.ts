// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";

/**
 * EUAP endpoint for Discovery API (2026-02-01-preview is only available on EUAP)
 */
export const EUAP_ENDPOINT = "https://eastus2euap.management.azure.com";

/**
 * Environment variable replacements for playback mode
 */
export const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  SUBSCRIPTION_ID: "azure_subscription_id",
};

/**
 * Recorder options for Discovery ARM tests
 */
export const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret
    "AZSDK3430", // .id in the body is not a secret
  ],
};

/**
 * Polling options optimized for test execution
 */
export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

/**
 * Generate a unique string for test resources
 */
export function uniqueString(): string {
  return isPlaybackMode() ? "" : Math.random().toString().slice(2, 8);
}

/**
 * Get subscription ID from environment
 */
export function getSubscriptionId(): string {
  return env.SUBSCRIPTION_ID || "";
}
