// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, isPlaybackMode, isRecordMode } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";

if (isNode) {
  dotenv.config();
}

export function uniqueString(): string {
  return isPlaybackMode()
    ? ""
    : Math.random()
        .toString()
        .slice(2);
}

export const testPollerProperties = {
  intervalInMs: isPlaybackMode() ? 0 : undefined
};

export function releasePolicy(replacementAttestationUri: string): string {
  const releasePolicy = {
    anyOf: [
      {
        anyOf: [
          {
            claim: "sdk-test",
            condition: "equals",
            value: "true"
          }
        ],
        authority: isRecordMode() ? replacementAttestationUri : env.AZURE_KEYVAULT_ATTESTATION_URI
      }
    ],
    version: "1.0"
  };
  return btoa(JSON.stringify(releasePolicy))
    .replace(/\+/g, "-")
    .replace(/\//, "_")
    .split("=")[0];
}
