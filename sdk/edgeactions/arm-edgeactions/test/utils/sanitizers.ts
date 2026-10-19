// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SanitizerOptions } from "@azure-tools/test-recorder";

export const sanitizedSubscription = "00000000-0000-0000-0000-000000000000";
export const pollingSecretPattern = '([?&](?:t|c|s|h|sig|token)=)[^&\\s"\\\\#]+';

export const sanitizers: SanitizerOptions = {
  generalSanitizers: [
    {
      regex: true,
      target: '(?i)(/subscriptions/)[^/\\s"\\\\?#]+',
      value: "${1}" + sanitizedSubscription,
    },
    {
      regex: true,
      target: '(?i)(/resourceGroups/)[^/\\s"\\\\?#]+',
      value: "$1edgeactions-test-rg",
    },
    {
      regex: true,
      target: `(?i)${pollingSecretPattern}`,
      value: "$1Sanitized",
    },
  ],
  bodyKeySanitizers: [
    ...["createdBy", "lastModifiedBy"].map((field) => ({
      jsonPath: `$..systemData.${field}`,
      value: "Sanitized",
    })),
    ...["tenantId", "clientId", "principalId"].map((field) => ({
      jsonPath: `$..${field}`,
      value: sanitizedSubscription,
    })),
    ...["access_token", "refresh_token", "id_token", "client_secret"].map((field) => ({
      jsonPath: `$..${field}`,
      value: "Sanitized",
    })),
  ],
  headerSanitizers: [
    "Authorization",
    "Cookie",
    "Set-Cookie",
    "x-ms-correlation-request-id",
    "x-ms-routing-request-id",
    "x-ms-operation-identifier",
    "x-ms-original-request-ids",
    "x-ms-request-id",
    "x-ms-client-request-id",
    "X-MSEdge-Ref",
  ].map((key) => ({ key, value: "Sanitized" })),
};
