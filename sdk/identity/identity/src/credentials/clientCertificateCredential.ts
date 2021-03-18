// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-http";
import { MsalClientCertificate } from "../msal/nodeFlows/msalClientCertificate";
import { credentialLogger } from "../util/logging";
import { trace } from "../util/tracing";
import { MsalFlow } from "../msal/flows";
import { ClientCertificateCredentialOptions } from "./clientCertificateCredentialOptions";

const logger = credentialLogger("ClientCertificateCredential");

/**
 * Enables authentication to Azure Active Directory using a PEM-encoded
 * certificate that is assigned to an App Registration. More information
 * on how to configure certificate authentication can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-certificate-credentials#register-your-certificate-with-azure-ad
 *
 */
export class ClientCertificateCredential implements TokenCredential {
  private msalFlow: MsalFlow;

  /**
   * Creates an instance of the ClientCertificateCredential with the details
   * needed to authenticate against Azure Active Directory with a certificate.
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param certificatePath - The path to a PEM-encoded public/private key certificate on the filesystem.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    certificatePath: string,
    options: ClientCertificateCredentialOptions = {}
  ) {
    this.msalFlow = new MsalClientCertificate({
      ...options,
      certificatePath,
      logger,
      clientId,
      tenantId,
      sendCertificateChain: options.sendCertificateChain,
      tokenCredentialOptions: options
    });
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    return trace(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      const arrayScopes = typeof scopes === "object" ? scopes : [scopes];
      return this.msalFlow.getToken(arrayScopes, newOptions);
    });
  }
}
