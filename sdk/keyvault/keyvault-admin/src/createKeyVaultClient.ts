// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { KeyVaultClientOptionalParams } from "./keyVaultClient.js";
import { KeyVaultClient } from "./keyVaultClient.js";
import { bearerTokenAuthenticationPolicyName } from "@azure/core-rest-pipeline";
import { keyVaultAuthenticationPolicy } from "@azure/keyvault-common";
import type { AccessControlClientOptions } from "./accessControlModels.js";
import type { KeyVaultBackupClientOptions } from "./backupClientModels.js";
import type { SettingsClientOptions } from "./settingsClientModels.js";
import { LATEST_API_VERSION, SDK_VERSION } from "./constants.js";
import { logger } from "./logger.js";

export function createKeyVaultClient(
  vaultUrl: string,
  credential: TokenCredential,
  options: AccessControlClientOptions | KeyVaultBackupClientOptions | SettingsClientOptions,
): KeyVaultClient {
  const clientOptions: KeyVaultClientOptionalParams = {
    ...options,
    apiVersion: options.serviceVersion || LATEST_API_VERSION,
    loggingOptions: {
      logger: logger.info,
      additionalAllowedHeaderNames: [
        "x-ms-keyvault-region",
        "x-ms-keyvault-network-info",
        "x-ms-keyvault-service-version",
      ],
    },
  };
  clientOptions.userAgentOptions ??= {};
  clientOptions.userAgentOptions.userAgentPrefix = `${clientOptions.userAgentOptions.userAgentPrefix ?? ""} azsdk-js-keyvault-admin/${SDK_VERSION}`;

  const client = new KeyVaultClient(vaultUrl, credential, clientOptions);

  client.pipeline.removePolicy({ name: bearerTokenAuthenticationPolicyName });
  client.pipeline.addPolicy(keyVaultAuthenticationPolicy(credential, options));
  // Workaround for: https://github.com/Azure/azure-sdk-for-js/issues/31843
  client.pipeline.addPolicy({
    name: "ContentTypePolicy",
    sendRequest(request, next) {
      const contentType = request.headers.get("Content-Type") ?? "";
      if (contentType.startsWith("application/json")) {
        request.headers.set("Content-Type", "application/json");
      }
      return next(request);
    },
  });
  return client;
}
