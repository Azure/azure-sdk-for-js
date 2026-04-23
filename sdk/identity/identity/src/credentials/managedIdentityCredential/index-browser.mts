// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { TokenCredentialOptions } from "../../tokenCredentialOptions.js";
import type {
  ManagedIdentityCredentialClientIdOptions,
  ManagedIdentityCredentialObjectIdOptions,
  ManagedIdentityCredentialResourceIdOptions,
} from "./options.js";

import { credentialLogger, formatError } from "../../util/logging.js";

const BrowserNotSupportedError = new Error(
  "ManagedIdentityCredential is not supported in the browser.",
);
const logger = credentialLogger("ManagedIdentityCredential");

export class ManagedIdentityCredential implements TokenCredential {
  constructor(clientId: string, options?: TokenCredentialOptions);
  constructor(options?: ManagedIdentityCredentialClientIdOptions);
  constructor(options?: ManagedIdentityCredentialResourceIdOptions);
  constructor(options?: ManagedIdentityCredentialObjectIdOptions);
  constructor(
    _clientIdOrOptions?:
      | string
      | ManagedIdentityCredentialClientIdOptions
      | ManagedIdentityCredentialResourceIdOptions
      | ManagedIdentityCredentialObjectIdOptions,
    _options?: TokenCredentialOptions,
  ) {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public async getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
