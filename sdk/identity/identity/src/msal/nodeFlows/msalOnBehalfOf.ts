// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";
import { formatError } from "../../util/logging";
import { CredentialFlowGetTokenOptions } from "../credentials";
import { parseCertificate } from "./msalClientCertificate";
import { MsalNodeOptions, MsalNode } from "./nodeCommon";

/**
 * Options that can be passed to configure MSAL to handle On-Behalf-Of authentication requests.
 * @internal
 */
export interface MSALOnBehalfOfOptions extends MsalNodeOptions {
  clientSecret?: string;
  certificatePath?: string;
  sendCertificateChain?: boolean;
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

  constructor(options: MSALOnBehalfOfOptions) {
    super(options);
    this.logger.info("Initialized MSAL's On-Behalf-Of flow");
    this.requiresConfidential = true;
    this.userAssertionToken = options.userAssertionToken;
    this.certificatePath = options.certificatePath;
    this.sendCertificateChain = options.sendCertificateChain;

    // Changing the MSAL configuration asynchronously
    this.prepareMsalConfiguration = async (): Promise<void> => {
      if (this.certificatePath) {
        try {
          const parts = await parseCertificate(this.certificatePath, this.sendCertificateChain);
          this.msalConfig.auth.clientCertificate = {
            thumbprint: parts.thumbprint,
            privateKey: parts.certificateContents,
            x5c: parts.x5c
          };
        } catch (error) {
          this.logger.info(formatError("", error));
          throw error;
        }
      } else {
        this.msalConfig.auth.clientSecret = options.clientSecret;
      }
    };
  }

  protected async doGetToken(
    scopes: string[],
    options: CredentialFlowGetTokenOptions = {}
  ): Promise<AccessToken> {
    try {
      const result = await this.confidentialApp!.acquireTokenOnBehalfOf({
        scopes,
        correlationId: options.correlationId,
        authority: options.authority,
        oboAssertion: this.userAssertionToken
      });
      return this.handleResult(scopes, this.clientId, result || undefined);
    } catch (err) {
      throw this.handleError(scopes, err, options);
    }
  }
}
