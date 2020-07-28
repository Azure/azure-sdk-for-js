// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { TokenCredentialOptions, IdentityClient } from "../client/identityClient";
let keytar: any;
try {
  keytar = require("keytar");
} catch (er) {
  keytar = null;
}

import { CredentialUnavailable } from "../client/errors";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";

const CommonTenantId = "common";
const AzureAccountClientId = "aebc6443-996d-45c2-90f0-388ff96faa56"; // VSC: 'aebc6443-996d-45c2-90f0-388ff96faa56'
const VSCodeUserName = "VS Code Azure";
const logger = credentialLogger("VSCodeCredential");

/**
 * Provides options to configure the Visual Studio Code credential.
 */
export interface VSCodeCredentialOptions extends TokenCredentialOptions {
  /**
   * Optionally pass in a Tenant ID to be used as part of the credential
   */
  tenantId?: string;
}

/**
 * Connect to Azure using the credential provided by the VSCode extension 'Azure Account'.
 * Once the user has logged in via the extension, this credential can share the same refresh token
 * that is cached by the extension.
 */
export class VSCodeCredential implements TokenCredential {
  private identityClient: IdentityClient;
  private tenantId: string;

  /**
   * Creates an instance of VSCodeCredential to use for automatically authenticating via VSCode.
   *
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(options?: VSCodeCredentialOptions) {
    this.identityClient = new IdentityClient(options);
    if (options && options.tenantId) {
      this.tenantId = options.tenantId;
    } else {
      this.tenantId = CommonTenantId;
    }
  }

  /**
   * Returns the token found by searching VSCode's authentication cache or
   * returns null if no token could be found.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                `TokenCredential` implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    if (!keytar) {
      throw new CredentialUnavailable(
        "VSCode credential requires the optional dependency 'keytar' to work correctly"
      );
    }

    let scopeString = typeof scopes === "string" ? scopes : scopes.join(" ");

    // Check to make sure the scope we get back is a valid scope
    if (!scopeString.match(/^[0-9a-zA-Z-.:/]+$/)) {
      const error = new Error("Invalid scope was specified by the user or calling client");
      logger.getToken.info(formatError(error));
      throw error;
    }

    if (scopeString.indexOf("offline_access") < 0) {
      scopeString += " offline_access";
    }

    const refreshToken = await keytar.findPassword(VSCodeUserName);
    if (refreshToken) {
      const tokenResponse = await this.identityClient.refreshAccessToken(
        this.tenantId,
        AzureAccountClientId,
        scopeString,
        refreshToken,
        undefined
      );

      if (tokenResponse) {
        logger.getToken.info(formatSuccess(scopes));
        return tokenResponse.accessToken;
      } else {
        const error = new CredentialUnavailable(
          "Could not retrieve the token associated with VSCode. Have you connected using the 'Azure Account' extension recently?"
        );
        logger.getToken.info(formatError(error));
        throw error;
      }
    } else {
      const error = new CredentialUnavailable(
        "Could not retrieve the token associated with VSCode. Did you connect using the 'Azure Account' extension?"
      );
      logger.getToken.info(formatError(error));
      throw error;
    }
  }
}
