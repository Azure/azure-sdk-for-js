// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils";
import { ClientCertificateCredentialOptions } from "./clientCertificateCredentialOptions";
import { MsalClientCertificate } from "../msal/nodeFlows/msalClientCertificate";
import { MsalFlow } from "../msal/flows";
import { credentialLogger } from "../util/logging";
import { tracingClient } from "../util/tracing";

const credentialName = "ClientCertificateCredential";
const logger = credentialLogger(credentialName);

/**
 * Required configuration options for the {@link ClientCertificateCredential}, with the string contents of a PEM certificate
 */
export interface ClientCertificatePEMCertificate {
  /**
   * The PEM-encoded public/private key certificate on the filesystem.
   */
  certificate: string;

  /**
   * The password for the certificate file.
   */
  certificatePassword?: string;
}
/**
 * Required configuration options for the {@link ClientCertificateCredential}, with the path to a PEM certificate.
 */
export interface ClientCertificatePEMCertificatePath {
  /**
   * The path to the PEM-encoded public/private key certificate on the filesystem.
   */
  certificatePath: string;

  /**
   * The password for the certificate file.
   */
  certificatePassword?: string;
}
/**
 * Required configuration options for the {@link ClientCertificateCredential}, with either the string contents of a PEM certificate, or the path to a PEM certificate.
 */
export type ClientCertificateCredentialPEMConfiguration =
  | ClientCertificatePEMCertificate
  | ClientCertificatePEMCertificatePath;

/**
 * Enables authentication to Microsoft Entra ID using a PEM-encoded
 * certificate that is assigned to an App Registration. More information
 * on how to configure certificate authentication can be found here:
 *
 * https://learn.microsoft.com/en-us/azure/active-directory/develop/active-directory-certificate-credentials#register-your-certificate-with-azure-ad
 *
 */
export class ClientCertificateCredential implements TokenCredential {
  private tenantId: string;
  private additionallyAllowedTenantIds: string[];
  private msalFlow: MsalFlow;

  /**
   * Creates an instance of the ClientCertificateCredential with the details
   * needed to authenticate against Microsoft Entra ID with a certificate.
   *
   * @param tenantId - The Microsoft Entra tenant (directory) ID.
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
   * needed to authenticate against Microsoft Entra ID with a certificate.
   *
   * @param tenantId - The Microsoft Entra tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param configuration - Other parameters required, including the path of the certificate on the filesystem.
   *                        If the type is ignored, we will throw the value of the path to a PEM certificate.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    configuration: ClientCertificatePEMCertificatePath,
    options?: ClientCertificateCredentialOptions
  );
  /**
   * Creates an instance of the ClientCertificateCredential with the details
   * needed to authenticate against Microsoft Entra ID with a certificate.
   *
   * @param tenantId - The Microsoft Entra tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param configuration - Other parameters required, including the PEM-encoded certificate as a string.
   *                        If the type is ignored, we will throw the value of the PEM-encoded certificate.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    configuration: ClientCertificatePEMCertificate,
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

    this.tenantId = tenantId;
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      options?.additionallyAllowedTenants
    );

    const configuration: ClientCertificateCredentialPEMConfiguration = {
      ...(typeof certificatePathOrConfiguration === "string"
        ? {
            certificatePath: certificatePathOrConfiguration,
          }
        : certificatePathOrConfiguration),
    };
    const certificate: string | undefined = (configuration as ClientCertificatePEMCertificate)
      .certificate;
    const certificatePath: string | undefined = (
      configuration as ClientCertificatePEMCertificatePath
    ).certificatePath;
    if (!configuration || !(certificate || certificatePath)) {
      throw new Error(
        `${credentialName}: Provide either a PEM certificate in string form, or the path to that certificate in the filesystem. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`
      );
    }
    if (certificate && certificatePath) {
      throw new Error(
        `${credentialName}: To avoid unexpected behaviors, providing both the contents of a PEM certificate and the path to a PEM certificate is forbidden. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`
      );
    }
    this.msalFlow = new MsalClientCertificate({
      ...options,
      configuration,
      logger,
      clientId,
      tenantId,
      sendCertificateChain: options.sendCertificateChain,
      tokenCredentialOptions: options,
    });
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    return tracingClient.withSpan(`${credentialName}.getToken`, options, async (newOptions) => {
      newOptions.tenantId = processMultiTenantRequest(
        this.tenantId,
        newOptions,
        this.additionallyAllowedTenantIds,
        logger
      );

      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      return this.msalFlow.getToken(arrayScopes, newOptions);
    });
  }
}
