// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

import { MsalClientCertificate } from "../msal/nodeFlows/msalClientCertificate";
import { credentialLogger } from "../util/logging";
import { trace } from "../util/tracing";
import { MsalFlow } from "../msal/flows";
import { ClientCertificateCredentialOptions } from "./clientCertificateCredentialOptions";

const credentialName = "ClientCertificateCredential";
const logger = credentialLogger(credentialName);

/**
 * Required configuration options for the {@link ClientCertificateCredential}, with either the string contents of a PEM certificate, or the path to a PEM certificate.
 */
export type ClientCertificateCredentialPEMConfiguration =
  | {
      /**
       * The PEM-encoded public/private key certificate on the filesystem.
       */
      certificate: string;
      /**
       * The PEM-encoded public/private key certificate on the filesystem     should not be provided if `certificate` is provided.
       */
      certificatePath?: never;
    }
  | {
      /**
       * The PEM-encoded public/private key certificate on the filesystem should not be provided if `certificatePath` is provided.
       */
      certificate?: never;
      /**
       * The path to the PEM-encoded public/private key certificate on the filesystem.
       */
      certificatePath: string;
    };

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
    options?: ClientCertificateCredentialOptions
  );
  /**
   * Creates an instance of the ClientCertificateCredential with the details
   * needed to authenticate against Azure Active Directory with a certificate.
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param configuration - Other parameters required, including the PEM-encoded certificate as a string, or as a path on the filesystem.
   *                        If the type is ignored, we will throw if both the value of the PEM certificate and the path to a PEM certificate are provided at the same time.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    configuration: ClientCertificateCredentialPEMConfiguration,
    options?: ClientCertificateCredentialOptions
  );
  constructor(
    tenantId: string,
    clientId: string,
    certificatePathOrConfiguration: string | ClientCertificateCredentialPEMConfiguration,
    options: ClientCertificateCredentialOptions = {}
  ) {
    if (!tenantId || !clientId) {
      throw new Error(`${credentialName}: tenantId and clientId are required parameters.`);
    }
    const configuration: ClientCertificateCredentialPEMConfiguration = {
      ...(typeof certificatePathOrConfiguration === "string"
        ? {
            certificatePath: certificatePathOrConfiguration
          }
        : certificatePathOrConfiguration)
    };
    if (!configuration || !(configuration.certificate || configuration.certificatePath)) {
      throw new Error(
        `${credentialName}: Provide either a PEM certificate in string form, or the path to that certificate in the filesystem.`
      );
    }
    if (configuration.certificate && configuration.certificatePath) {
      throw new Error(
        `${credentialName}: To avoid unexpected behaviors, providing both the contents of a PEM certificate and the path to a PEM certificate is forbidden.`
      );
    }
    this.msalFlow = new MsalClientCertificate({
      ...options,
      configuration,
      logger,
      clientId,
      tenantId,
      sendCertificateChain: options.sendCertificateChain,
      tokenCredentialOptions: options
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
    return trace(`${credentialName}.getToken`, options, async (newOptions) => {
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      return this.msalFlow.getToken(arrayScopes, newOptions);
    });
  }
}
