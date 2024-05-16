// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MsalNode, MsalNodeOptions } from "./msalNodeCommon";

import { AccessToken } from "@azure/core-auth";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { formatError } from "../../util/logging";
import { handleMsalError } from "../utils";
import { parseCertificate } from "./msalClientCertificate";

/**
 * Options that can be passed to configure MSAL to handle On-Behalf-Of authentication requests.
 * @internal
 */
export interface MsalOnBehalfOfOptions extends MsalNodeOptions {
  /**
   * A client secret that was generated for the App Registration.
   */
  clientSecret?: string;
  /**
   * Location of the PEM certificate.
   */
  certificatePath?: string;
  /**
  * A function that retrieves the client assertion for the credential to use
  */
  getAssertion?: () => Promise<string>;
  /**
   * Option to include x5c header for SubjectName and Issuer name authorization.
   * Set this option to send base64 encoded public certificate in the client assertion header as an x5c claim
   */
  sendCertificateChain?: boolean;
  /**
   * The user assertion for the On-Behalf-Of flow.
   */
  userAssertionToken: string;
}

/**
 * MSAL on behalf of flow. Calls to MSAL's confidential application's `acquireTokenOnBehalfOf` during `doGetToken`.
 * @internal
 */
export class MsalOnBehalfOf extends MsalNode {
  private userAssertionToken: string;
  private certificatePath?: string;
  private sendCertificateChain?: boolean;
  private clientSecret?: string;

  constructor(options: MsalOnBehalfOfOptions) {
    super(options);
    this.logger.info("Initialized MSAL's On-Behalf-Of flow");
    this.requiresConfidential = true;
    this.userAssertionToken = options.userAssertionToken;
    this.certificatePath = options.certificatePath;
    this.sendCertificateChain = options.sendCertificateChain;
    this.clientSecret = options.clientSecret;
  }

  // Changing the MSAL configuration asynchronously
  async init(options?: CredentialFlowGetTokenOptions): Promise<void> {
    if (this.certificatePath) {
      try {
        const parts = await parseCertificate(
          { certificatePath: this.certificatePath },
          this.sendCertificateChain,
        );
        this.msalConfig.auth.clientCertificate = {
          thumbprint: parts.thumbprint,
          privateKey: parts.certificateContents,
          x5c: parts.x5c,
        };
      } catch (error: any) {
        this.logger.info(formatError("", error));
        throw error;
      }
    } else {
      this.msalConfig.auth.clientSecret = this.clientSecret;
    }
    return super.init(options);
  }

  protected async doGetToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {},
  ): Promise<AccessToken> {
    try {
      const result = await this.getApp("confidential", options.enableCae).acquireTokenOnBehalfOf({
        scopes,
        correlationId: options.correlationId,
        authority: options.authority,
        claims: options.claims,
        oboAssertion: this.userAssertionToken,
      });
      return this.handleResult(scopes, result || undefined);
    } catch (err: any) {
      throw handleMsalError(scopes, err, options);
    }
  }
}
