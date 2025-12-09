// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { MsalClient } from "../msal/nodeFlows/msalClient.js";
import { createMsalClient } from "../msal/nodeFlows/msalClient.js";
import { createHash, createPrivateKey } from "node:crypto";
import {
  processMultiTenantRequest,
  resolveAdditionallyAllowedTenantIds,
} from "../util/tenantIdUtils.js";

import type { CertificateParts } from "../msal/types.js";
import type { ClientCertificateCredentialOptions } from "./clientCertificateCredentialOptions.js";
import { credentialLogger } from "../util/logging.js";
import { readFile } from "node:fs/promises";
import { tracingClient } from "../util/tracing.js";
import type {
  ClientCertificateCredentialPEMConfiguration,
  ClientCertificatePEMCertificate,
  ClientCertificatePEMCertificatePath,
} from "./clientCertificateCredentialModels.js";
import { extractPemCertificateKeys } from "../util/certificatesUtils.js";

const credentialName = "ClientCertificateCredential";
const logger = credentialLogger(credentialName);

/**
 * Enables authentication to Microsoft Entra ID using a PEM-encoded
 * certificate that is assigned to an App Registration. More information
 * on how to configure certificate authentication can be found here:
 *
 * https://learn.microsoft.com/azure/active-directory/develop/active-directory-certificate-credentials#register-your-certificate-with-azure-ad
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
   * Ensure that certificate is in PEM format and contains both the public and private keys.
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
    const certificate = (this.certificateConfiguration as ClientCertificatePEMCertificate)
      .certificate;
    const certificatePath = (this.certificateConfiguration as ClientCertificatePEMCertificatePath)
      .certificatePath;
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
      thumbprintSha256: parts.thumbprintSha256,
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
  const certificate = (certificateConfiguration as ClientCertificatePEMCertificate).certificate;
  const certificatePath = (certificateConfiguration as ClientCertificatePEMCertificatePath)
    .certificatePath;
  const certificateContents = certificate || (await readFile(certificatePath!, "utf8"));
  const x5c = sendCertificateChain ? certificateContents : undefined;

  const publicKeys = extractPemCertificateKeys(certificateContents);

  const thumbprint = createHash("sha1") // CodeQL [SM04514] Needed for backward compatibility reason
    .update(Buffer.from(publicKeys[0], "base64"))
    .digest("hex")
    .toUpperCase();

  const thumbprintSha256 = createHash("sha256")
    .update(Buffer.from(publicKeys[0], "base64"))
    .digest("hex")
    .toUpperCase();

  return {
    certificateContents,
    thumbprintSha256,
    thumbprint,
    x5c,
  };
}
