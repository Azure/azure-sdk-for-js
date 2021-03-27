// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { readFileSync } from "fs";
import { createHash } from "crypto";
import { AccessToken } from "@azure/core-http";
import { MsalNodeOptions, MsalNode } from "./nodeCommon";
import { formatError } from "../../util/logging";
import { CredentialFlowGetTokenOptions } from "../credentials";

/**
 * Options that can be passed to configure MSAL to handle client certificates.
 * @internal
 */
export interface MSALClientCertificateOptions extends MsalNodeOptions {
  /**
   * Location of the certificate.
   */
  certificatePath: string;
  /**
   * Option to include x5c header for SubjectName and Issuer name authorization.
   * Set this option to send base64 encoded public certificate in the client assertion header as an x5c claim
   */
  sendCertificateChain?: boolean;
}

/**
 * Parts of a certificate, as understood by MSAL.
 * @internal
 */
interface CertificateParts {
  /**
   * Hex encoded X.509 SHA-1 thumbprint of the certificate
   */
  thumbprint: string;
  /**
   * The PEM encoded private key (string should contain -----BEGIN PRIVATE KEY----- ... -----END PRIVATE KEY-----
   */
  certificateContents: string;
  /**
   * x5c header.
   */
  x5c: string;
}

/**
 * MSAL client certificate client. Calls to MSAL's confidential application's `acquireTokenByClientCredential` during `doGetToken`.
 * @internal
 */
export class MsalClientCertificate extends MsalNode {
  private sendCertificateChain?: boolean;

  constructor(options: MSALClientCertificateOptions) {
    super(options);
    this.requiresConfidential = true;
    this.sendCertificateChain = options.sendCertificateChain;

    const parts = this.parseCertificate(options.certificatePath);
    this.msalConfig.auth.clientCertificate = {
      thumbprint: parts.thumbprint,
      privateKey: parts.certificateContents,
      x5c: parts.x5c
    };
  }

  private parseCertificate(certificatePath: string): CertificateParts {
    const certificateParts: Partial<CertificateParts> = {};

    certificateParts.certificateContents = readFileSync(certificatePath, "utf8");
    if (this.sendCertificateChain) {
      certificateParts.x5c = certificateParts.certificateContents;
    }

    const certificatePattern = /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/g;
    const publicKeys: string[] = [];

    // Match all possible certificates, in the order they are in the file. These will form the chain that is used for x5c
    let match;
    do {
      match = certificatePattern.exec(certificateParts.certificateContents);
      if (match) {
        publicKeys.push(match[3]);
      }
    } while (match);

    if (publicKeys.length === 0) {
      const error = new Error(
        "The file at the specified path does not contain a PEM-encoded certificate."
      );
      this.logger.info(formatError("", error));
      throw error;
    }

    certificateParts.thumbprint = createHash("sha1")
      .update(Buffer.from(publicKeys[0], "base64"))
      .digest("hex")
      .toUpperCase();

    return certificateParts as CertificateParts;
  }

  protected async doGetToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {}
  ): Promise<AccessToken> {
    try {
      const result = await this.confidentialApp!.acquireTokenByClientCredential({
        scopes,
        correlationId: options.correlationId
      });
      // Even though we're providing the same default in memory persistence cache that we use for DeviceCodeCredential,
      // The Client Credential flow does not return the account information from the authentication service,
      // so each time getToken gets called, we will have to acquire a new token through the service.
      return this.handleResult(scopes, result || undefined);
    } catch (err) {
      throw this.handleError(scopes, err);
    }
  }
}
