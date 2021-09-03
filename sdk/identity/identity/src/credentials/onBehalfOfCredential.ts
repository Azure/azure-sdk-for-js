// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

import { MsalOnBehalfOf } from "../msal/nodeFlows/msalOnBehalfOf";
import { credentialLogger } from "../util/logging";
import { trace } from "../util/tracing";
import { MsalFlow } from "../msal/flows";
import { OnBehalfOfCredentialOptions } from "./onBehalfOfCredentialOptions";

const logger = credentialLogger("OnBehalfOfCredential");

/**
 * Defines the possible configuration parameters to send to the {@link OnBehalfOfCredential} when a client secret must be specified.
 */
export interface OnBehalfOfCredentialSecretConfiguration {
  /**
   * The Azure Active Directory tenant (directory) ID.
   */
  tenantId: string;
  /**
   * The client (application) ID of an App Registration in the tenant.
   */
  clientId: string;
  /**
   * A client secret that was generated for the App Registration.
   */
  clientSecret: string;
  /**
   * The user assertion for the On-Behalf-Of flow.
   */
  userAssertionToken: string;
}

/**
 * Defines the possible configuration parameters to send to the {@link OnBehalfOfCredential} when a client certificate must be specified.
 */
export interface OnBehalfOfCredentialCertificateConfiguration {
  /**
   * The Azure Active Directory tenant (directory) ID.
   */
  tenantId: string;
  /**
   * The client (application) ID of an App Registration in the tenant.
   */
  clientId: string;
  /**
   * The path to a PEM-encoded public/private key certificate on the filesystem.
   */
  certificatePath: string;
  /**
   * The user assertion for the On-Behalf-Of flow.
   */
  userAssertionToken: string;
}

/**
 * Enables authentication to Azure Active Directory using the [On Behalf Of flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow).
 */
export class OnBehalfOfCredential implements TokenCredential {
  private msalFlow: MsalFlow;

  /**
   * Creates an instance of the {@link OnBehalfOfCredential} with the details
   * needed to authenticate against Azure Active Directory with a client
   * secret or a path to a PEM certificate, and an user assertion.
   *
   * Example using the `KeyClient` from [\@azure/keyvault-keys](https://www.npmjs.com/package/\@azure/keyvault-keys):
   *
   * ```ts
   * const tokenCredential = new OnBehalfOfCredential({
   *   tenantId,
   *   clientId,
   *   clientSecret, // or `certificatePath: "/path/to/certificate.pem"
   *   userAssertionToken: "access-token"
   * });
   * const client = new KeyClient("vault-url", tokenCredential);
   *
   * await client.getKey("key-name");
   * ```
   *
   * @param configuration - Configuration specific to this credential.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    private configuration:
      | OnBehalfOfCredentialSecretConfiguration
      | OnBehalfOfCredentialCertificateConfiguration,
    private options: OnBehalfOfCredentialOptions = {}
  ) {
    const { tenantId, clientId, userAssertionToken } = configuration;
    const secretConfiguration = configuration as OnBehalfOfCredentialSecretConfiguration;
    const certificateConfiguration = configuration as OnBehalfOfCredentialCertificateConfiguration;
    if (
      !tenantId ||
      !clientId ||
      !(secretConfiguration.clientSecret || certificateConfiguration.certificatePath) ||
      !userAssertionToken
    ) {
      throw new Error(
        "ClientCertificateCredential: tenantId, clientId, clientSecret (or certificatePath) and userAssertionToken are required parameters."
      );
    }
    this.msalFlow = new MsalOnBehalfOf({
      ...this.options,
      ...this.configuration,
      logger,
      tokenCredentialOptions: this.options
    });
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    return trace(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      return this.msalFlow!.getToken(arrayScopes, newOptions);
    });
  }
}
