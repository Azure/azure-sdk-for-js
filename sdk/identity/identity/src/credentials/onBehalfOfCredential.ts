// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs";
import { promisify } from "util";
import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

import { MsalOnBehalfOf } from "../msal/nodeFlows/msalOnBehalfOf";
import { credentialLogger } from "../util/logging";
import { trace } from "../util/tracing";
import { MsalFlow } from "../msal/flows";
import { OnBehalfOfCredentialOptions } from "./onBehalfOfCredentialOptions";

const logger = credentialLogger("OnBehalfOfCredential");
const accessAsync = promisify(fs.access);
/**
 * Enables authentication to Azure Active Directory using the [On Behalf Of flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow).
 */
export class OnBehalfOfCredential implements TokenCredential {
  private msalFlow?: MsalFlow;

  /**
   * Creates an instance of the {@link OnBehalfOfCredential} with the details
   * needed to authenticate against Azure Active Directory with a client
   * secret, and an user assertion.
   *
   * Example using the `KeyClient` from [\@azure/keyvault-keys](https://www.npmjs.com/package/\@azure/keyvault-keys):
   *
   * ```ts
   * const tokenCredential = new OnBehalfOfCredential(tenantId, clientId, clientSecret, "access-token");
   * const client = new KeyClient("vault-url", tokenCredential);
   *
   * await client.getKey("key-name", { authenticationOptions: { userAssertion } });
   * ```
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param clientSecret - A client secret that was generated for the App Registration.
   * @param userAssertionToken - The user assertion to be used.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    clientSecret: string,
    userAssertionToken: string,
    options?: OnBehalfOfCredentialOptions
  );
  /**
   * Creates an instance of the {@link OnBehalfOfCredential} with the details
   * needed to authenticate against Azure Active Directory with a client certificate, and an user assertion.
   *
   * Example using the `KeyClient` from [\@azure/keyvault-keys](https://www.npmjs.com/package/\@azure/keyvault-keys):
   *
   * ```ts
   * const certificatePath = "path/to/certificate.pem";
   * const tokenCredential = new OnBehalfOfCredential(tenantId, clientId, certificatePath, "access-token");
   * const client = new KeyClient("vault-url", tokenCredential);
   *
   * await client.getKey("key-name", { authenticationOptions: { userAssertion } });
   * ```
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param certificatePath - The path to a PEM-encoded public/private key certificate on the filesystem.
   * @param userAssertionToken - The user assertion to be used.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    certificatePath: string,
    userAssertionToken: string,
    options?: OnBehalfOfCredentialOptions
  );

  /**
   * Creates an instance of the {@link OnBehalfOfCredential} with the details
   * needed to authenticate against Azure Active Directory with a client
   * secret (or certificate), and an user assertion.
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param clientSecretOrCertificatePath - A client secret, or a path to a certificate, that was generated for the App Registration.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    private tenantId: string,
    private clientId: string,
    private clientSecretOrCertificatePath: string,
    private userAssertionToken: string,
    private options: OnBehalfOfCredentialOptions = {}
  ) {
    if (!tenantId || !clientId || !clientSecretOrCertificatePath || !userAssertionToken) {
      throw new Error(
        "ClientCertificateCredential: tenantId, clientId, clientSecret (or certificatePath) and userAssertionToken are required parameters."
      );
    }
  }

  /**
   * Loads the MSAL flow if it hasn't been loaded yet.
   */
  private async loadMsalFlow(): Promise<void> {
    if (!this.msalFlow) {
      let clientSecret: string | undefined;
      let certificatePath: string | undefined;
      try {
        await accessAsync(this.clientSecretOrCertificatePath);
        certificatePath = this.clientSecretOrCertificatePath;
      } catch (e) {
        clientSecret = this.clientSecretOrCertificatePath;
      }

      this.msalFlow = new MsalOnBehalfOf({
        ...this.options,
        logger,
        clientId: this.clientId,
        tenantId: this.tenantId,
        clientSecret,
        certificatePath,
        sendCertificateChain: this.options.sendCertificateChain,
        userAssertionToken: this.userAssertionToken,
        tokenCredentialOptions: this.options
      });
    }
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
    await this.loadMsalFlow();
    return trace(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      return this.msalFlow!.getToken(arrayScopes, newOptions);
    });
  }
}
