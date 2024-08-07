// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { MsalClient, createMsalClient } from "../msal/nodeFlows/msalClient";
import { createHash, createPrivateKey } from "crypto";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils";

import { CertificateParts } from "../msal/types";
import { ClientCertificateCredentialOptions } from "./clientCertificateCredentialOptions";
import { credentialLogger } from "../util/logging";
import { readFile } from "fs/promises";
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
  private certificateConfiguration: ClientCertificateCredentialPEMConfiguration;
  private sendCertificateChain?: boolean;
  private msalClient: MsalClient;

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
    options?: ClientCertificateCredentialOptions,
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
    options?: ClientCertificateCredentialOptions,
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
    options?: ClientCertificateCredentialOptions,
  );
  constructor(
    tenantId: string,
    clientId: string,
    certificatePathOrConfiguration: string | ClientCertificateCredentialPEMConfiguration,
    options: ClientCertificateCredentialOptions = {},
  ) {
    if (!tenantId || !clientId) {
      throw new Error(`${credentialName}: tenantId and clientId are required parameters.`);
    }

    this.tenantId = tenantId;
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(
      options?.additionallyAllowedTenants,
    );

    this.sendCertificateChain = options.sendCertificateChain;

    this.certificateConfiguration = {
      ...(typeof certificatePathOrConfiguration === "string"
        ? {
            certificatePath: certificatePathOrConfiguration,
          }
        : certificatePathOrConfiguration),
    };
    const certificate: string | undefined = (
      this.certificateConfiguration as ClientCertificatePEMCertificate
    ).certificate;
    const certificatePath: string | undefined = (
      this.certificateConfiguration as ClientCertificatePEMCertificatePath
    ).certificatePath;
    if (!this.certificateConfiguration || !(certificate || certificatePath)) {
      throw new Error(
        `${credentialName}: Provide either a PEM certificate in string form, or the path to that certificate in the filesystem. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`,
      );
    }
    if (certificate && certificatePath) {
      throw new Error(
        `${credentialName}: To avoid unexpected behaviors, providing both the contents of a PEM certificate and the path to a PEM certificate is forbidden. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`,
      );
    }
    this.msalClient = createMsalClient(clientId, tenantId, {
      ...options,
      logger,
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
        logger,
      );

      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      const certificate = await this.buildClientCertificate();
      return this.msalClient.getTokenByClientCertificate(arrayScopes, certificate, newOptions);
    });
  }

  private async buildClientCertificate(): Promise<CertificateParts> {
    const parts = await parseCertificate(
      this.certificateConfiguration,
      this.sendCertificateChain ?? false,
    );

    let privateKey: string;
    if (this.certificateConfiguration.certificatePassword !== undefined) {
      privateKey = createPrivateKey({
        key: parts.certificateContents,
        passphrase: this.certificateConfiguration.certificatePassword,
        format: "pem",
      })
        .export({
          format: "pem",
          type: "pkcs8",
        })
        .toString();
    } else {
      privateKey = parts.certificateContents;
    }

    return {
      thumbprint: parts.thumbprint,
      privateKey,
      x5c: parts.x5c,
    };
  }
}

/**
 * Parses a certificate into its relevant parts
 *
 * @param certificateConfiguration - The certificate contents or path to the certificate
 * @param sendCertificateChain - true if the entire certificate chain should be sent for SNI, false otherwise
 * @returns The parsed certificate parts and the certificate contents
 */
export async function parseCertificate(
  certificateConfiguration: ClientCertificateCredentialPEMConfiguration,
  sendCertificateChain: boolean,
): Promise<Omit<CertificateParts, "privateKey"> & { certificateContents: string }> {
  const certificate: string | undefined = (
    certificateConfiguration as ClientCertificatePEMCertificate
  ).certificate;
  const certificatePath: string | undefined = (
    certificateConfiguration as ClientCertificatePEMCertificatePath
  ).certificatePath;
  const certificateContents = certificate || (await readFile(certificatePath!, "utf8"));
  const x5c = sendCertificateChain ? certificateContents : undefined;

  const certificatePattern =
    /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/g;
  const publicKeys: string[] = [];

  // Match all possible certificates, in the order they are in the file. These will form the chain that is used for x5c
  let match;
  do {
    match = certificatePattern.exec(certificateContents);
    if (match) {
      publicKeys.push(match[3]);
    }
  } while (match);

  if (publicKeys.length === 0) {
    throw new Error("The file at the specified path does not contain a PEM-encoded certificate.");
  }

  const thumbprint = createHash("sha1")
    .update(Buffer.from(publicKeys[0], "base64"))
    .digest("hex")
    .toUpperCase();

  return {
    certificateContents,
    thumbprint,
    x5c,
  };
}
