// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SanitizerOptions } from "@azure-tools/test-recorder";

export const sanitizedSubscription = "00000000-0000-0000-0000-000000000000";
export const pollingSecretPattern = '([?&](?:t|c|s|h|sig|token)=)[^&\\s"\\\\#]+';
export const resourceGroupOperationPattern =
  '(/providers/Microsoft\\.Resources/locations/[^/]+/operationresults/)[^/\\s"\\\\?#]+';
export const unrelatedEdgeActionPattern =
  '(/providers/Microsoft\\.Cdn/edgeActions/)(?!eajavascript[0-9a-f]{20}(?:[/\\s"\\\\?#]|$))[^/\\s"\\\\?#]+';
export const attachedResourceNamePattern =
  '(/(?:profiles|ruleSets|rules|afdEndpoints|routes)/)[^/\\s"\\\\?#]+';
const unrelatedEdgeActions =
  "$.value[?(@.type =~ /^Microsoft[.]Cdn\\/EdgeActions$/i && @.name =~ /^(?!eajavascript[0-9a-f]{20}$)/)]";

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
    ...[resourceGroupOperationPattern, unrelatedEdgeActionPattern, attachedResourceNamePattern].map(
      (pattern) => ({
        regex: true as const,
        target: `(?i)${pattern}`,
        value: "$1Sanitized",
      }),
    ),
  ],
  bodyKeySanitizers: [
    ...[
      `${unrelatedEdgeActions}.name`,
      `${unrelatedEdgeActions}.tags.*`,
      "$..attachments[*].id",
    ].map((jsonPath) => ({ jsonPath, value: "Sanitized" })),
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
