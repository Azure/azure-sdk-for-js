// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

import { MsalOnBehalfOf } from "../msal/nodeFlows/msalOnBehalfOf";
import { credentialLogger } from "../util/logging";
import { trace } from "../util/tracing";
import { MsalFlow } from "../msal/flows";
import {
  OnBehalfOfCredentialCertificateOptions,
  OnBehalfOfCredentialOptions,
  OnBehalfOfCredentialSecretOptions,
} from "./onBehalfOfCredentialOptions";
import { TokenCredentialOptions } from "../tokenCredentialOptions";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";

const credentialName = "OnBehalfOfCredential";
const logger = credentialLogger(credentialName);

/**
 * Enables authentication to Azure Active Directory using the [On Behalf Of flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow).
 */
export class OnBehalfOfCredential implements TokenCredential {
  private msalFlow: MsalFlow;
  /**
   * Creates an instance of the {@link OnBehalfOfCredential} with the details
   * needed to authenticate against Azure Active Directory with path to a PEM certificate,
   * and an user assertion.
   *
   * Example using the `KeyClient` from [\@azure/keyvault-keys](https://www.npmjs.com/package/\@azure/keyvault-keys):
   *
   * ```ts
   * const tokenCredential = new OnBehalfOfCredential({
   *   tenantId,
   *   clientId,
   *   certificatePath: "/path/to/certificate.pem",
   *   userAssertionToken: "access-token"
   * });
   * const client = new KeyClient("vault-url", tokenCredential);
   *
   * await client.getKey("key-name");
   * ```
   *
   * @param options - Optional parameters, generally common across credentials.
   */
  constructor(
    options: OnBehalfOfCredentialCertificateOptions &
      TokenCredentialOptions &
      CredentialPersistenceOptions
  );
  /**
   * Creates an instance of the {@link OnBehalfOfCredential} with the details
   * needed to authenticate against Azure Active Directory with a client
   * secret and an user assertion.
   *
   * Example using the `KeyClient` from [\@azure/keyvault-keys](https://www.npmjs.com/package/\@azure/keyvault-keys):
   *
   * ```ts
   * const tokenCredential = new OnBehalfOfCredential({
   *   tenantId,
   *   clientId,
   *   clientSecret,
   *   userAssertionToken: "access-token"
   * });
   * const client = new KeyClient("vault-url", tokenCredential);
   *
   * await client.getKey("key-name");
   * ```
   *
   * @param options - Optional parameters, generally common across credentials.
   */
  constructor(
    options: OnBehalfOfCredentialSecretOptions &
      TokenCredentialOptions &
      CredentialPersistenceOptions
  );

  constructor(private options: OnBehalfOfCredentialOptions) {
    const { clientSecret } = options as OnBehalfOfCredentialSecretOptions;
    const { certificatePath } = options as OnBehalfOfCredentialCertificateOptions;
    const { tenantId, clientId, userAssertionToken } = options;
    if (!tenantId || !clientId || !(clientSecret || certificatePath) || !userAssertionToken) {
      throw new Error(
        `${credentialName}: tenantId, clientId, clientSecret (or certificatePath) and userAssertionToken are required parameters.`
      );
    }
    this.msalFlow = new MsalOnBehalfOf({
      ...this.options,
      logger,
      tokenCredentialOptions: this.options,
    });
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure the underlying network requests.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    return trace(`${credentialName}.getToken`, options, async (newOptions) => {
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      return this.msalFlow!.getToken(arrayScopes, newOptions);
    });
  }
}
