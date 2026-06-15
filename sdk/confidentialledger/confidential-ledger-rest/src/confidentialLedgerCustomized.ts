// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";

import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { ConfidentialLedgerClient } from "./clientDefinitions.js";
import type { ConfidentialLedgerClientOptions } from "./confidentialLedgerClient.js";
import { logger } from "./logger.js";

export default function ConfidentialLedger(
  ledgerEndpoint: string,
  ledgerIdentityCertificate: string,
  options?: ClientOptions,
): ConfidentialLedgerClient;
export default function ConfidentialLedger(
  ledgerEndpoint: string,
  ledgerIdentityCertificate: string,
  credentials: TokenCredential,
  options?: ClientOptions,
): ConfidentialLedgerClient;
export default function ConfidentialLedger(
  ledgerEndpoint: string,
  ledgerIdentityCertificate: string,
  credentialsOrOptions?: TokenCredential | ClientOptions,
  opts?: ClientOptions,
): ConfidentialLedgerClient {
  let credentials: TokenCredential | undefined;
  let options: ConfidentialLedgerClientOptions;

  if (isTokenCredential(credentialsOrOptions)) {
    credentials = credentialsOrOptions;
    options = opts ?? {};
  } else {
    options = credentialsOrOptions ?? {};
  }

  const tlsOptions = options?.tlsOptions ?? {};
  tlsOptions.ca = ledgerIdentityCertificate;

  const apiVersion = options.apiVersion ?? "2026-02-23";
  const endpointUrl = options.endpoint ?? `${ledgerEndpoint}`;
  const userAgentInfo = `azsdk-js-confidential-ledger-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;

  const clientOptions = {
    ...options,
    tlsOptions,
    userAgentOptions: {
      userAgentPrefix,
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info,
    },
  };

  const client = (
    credentials
      ? getClient(endpointUrl, credentials, clientOptions)
      : getClient(endpointUrl, clientOptions)
  ) as ConfidentialLedgerClient;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  client.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      const url = new URL(req.url);
      if (!url.searchParams.get("api-version") && apiVersion) {
        req.url = `${req.url}${
          Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
        }api-version=${apiVersion}`;
      }

      return next(req);
    },
  });

  return client;
}
