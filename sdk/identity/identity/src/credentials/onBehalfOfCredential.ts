// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  OnBehalfOfCredentialCertificateOptions,
  OnBehalfOfCredentialOptions,
  OnBehalfOfCredentialSecretOptions,
} from "./onBehalfOfCredentialOptions";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import { MsalFlow } from "../msal/flows";
import { MsalOnBehalfOf } from "../msal/nodeFlows/msalOnBehalfOf";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";
import { credentialLogger } from "../util/logging";
import { ensureScopes } from "../util/scopeUtils";
import { tracingClient } from "../util/tracing";

const credentialName = "OnBehalfOfCredential";
const logger = credentialLogger(credentialName);

/**
 * Enables authentication to Microsoft Entra ID using the [On Behalf Of flow](https://learn.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow).
 */
export class OnBehalfOfCredential implements TokenCredential {
  private tenantId: string;
  private additionallyAllowedTenantIds: string[];
  private msalFlow: MsalFlow;
  /**
   * Creates an instance of the {@link OnBehalfOfCredential} with the details
   * needed to authenticate against Microsoft Entra ID with path to a PEM certificate,
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
      MultiTenantTokenCredentialOptions &
      CredentialPersistenceOptions
  );
  /**
   * Creates an instance of the {@link OnBehalfOfCredential} with the details
   * needed to authenticate against Microsoft Entra ID with a client
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
      MultiTenantTokenCredentialOptions &
      CredentialPersistenceOptions
  );

  constructor(private options: OnBehalfOfCredentialOptions) {
    const { clientSecret } = options as OnBehalfOfCredentialSecretOptions;
    const { certificatePath } = options as OnBehalfOfCredentialCertificateOptions;
    const {
      tenantId,
      clientId,
      userAssertionToken,
      additionallyAllowedTenants: additionallyAllowedTenantIds,
    } = options;
    if (!tenantId || !clientId || !(clientSecret || certificatePath) || !userAssertionToken) {
      throw new Error(
        `${credentialName}: tenantId, clientId, clientSecret (or certificatePath) and userAssertionToken are required parameters.`
      );
    }

    this.tenantId = tenantId;
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      additionallyAllowedTenantIds
    );

    this.msalFlow = new MsalOnBehalfOf({
      ...this.options,
      logger,
      tokenCredentialOptions: this.options,
    });
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure the underlying network requests.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    return tracingClient.withSpan(`${credentialName}.getToken`, options, async (newOptions) => {
      newOptions.tenantId = processMultiTenantRequest(
        this.tenantId,
        newOptions,
        this.additionallyAllowedTenantIds,
        logger
      );

      const arrayScopes = ensureScopes(scopes);
      return this.msalFlow!.getToken(arrayScopes, newOptions);
    });
  }
}
