// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { VisualStudioCodeCredentialOptions } from "./visualStudioCodeCredentialOptions.js";
import { credentialLogger, formatError } from "../util/logging.js";

const BrowserNotSupportedError = new Error(
  "VisualStudioCodeCredential is not supported in the browser.",
);
const logger = credentialLogger("VisualStudioCodeCredential");

export const vsCodeCredentialControl = {
  set vsCodeCredentialFinder(_finder: never) {
    throw new Error(
      "Attempted to register a VisualStudioCodeCredential provider plugin in the browser. This environment is not supported by VisualStudioCodeCredential.",
    );
  },
};

/**
 * Connects to Azure using the credential provided by the VSCode extension 'Azure Account'.
 * 
 * @deprecated This credential is deprecated because the VS Code Azure Account extension on which this credential
 * relies has been deprecated. Users should use other dev-time credentials, such as {@link AzureCliCredential},
 * {@link AzureDeveloperCliCredential}, or {@link AzurePowerShellCredential} for their
 * local development needs. See Azure account extension deprecation notice [here](https://github.com/microsoft/vscode-azure-account/issues/964).
 */
export class VisualStudioCodeCredential implements TokenCredential {
  /**
   * Only available in Node.js
   */
  constructor(_options?: VisualStudioCodeCredentialOptions) {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  public getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
