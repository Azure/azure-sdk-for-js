// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MsalAuthorizationCode } from "../../identity/src/msal/nodeFlows/msalAuthorizationCode";
import { MsalFlow } from "../../identity/src/msal/flows";
import { credentialLogger } from "../../identity/src/util/logging";
import { checkTenantId } from "../../identity/src/util/checkTenantId";
import { trace } from "../../identity/src/util/tracing";
import {
  AccessToken,
  AuthenticationRecord,
  AuthenticationRequiredError,
  GetTokenOptions,
  TokenCredential,
  TokenCredentialOptions,
} from "@azure/identity";

const logger = credentialLogger("WebRedirectCredential");

/**
 * Options for the {@link WebRedirectCredential}
 */
export interface WebRedirectCredentialOptions extends TokenCredentialOptions {
  /**
   * Result of a previous authentication that can be used to retrieve the cached credentials of each individual account.
   * This is necessary to provide in case the application wants to work with more than one account per
   * Client ID and Tenant ID pair.
   *
   * This record can be retrieved by calling to the credential's `authenticate()` method, as follows:
   *
   *     const authenticationRecord = await credential.authenticate(scope, code);
   *
   */
  authenticationRecord?: AuthenticationRecord;
  /**
   * Allows specifying a client secret.
   */
  clientSecret?: string;
}

/**
 * Simplifies the development of web services that authenticate with Azure resources.
 * Uses the [Authorization Code Flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow)
 * underneath.
 */
export class WebRedirectCredential implements TokenCredential {
  private tenantId: string;
  private clientId: string;
  private redirectUri: string;
  private credentialOptions: WebRedirectCredentialOptions;
  private msalFlow: MsalFlow | undefined;

  /**
   * Creates an instance of {@link WebRedirectCredential}.
   *
   * ```javascript
   * const credential = new WebRedirectCredential(
   *   tenantId,
   *   clientId,
   *   redirectUri
   * );
   * ```
   *
   * This credential won't automatically authenticate at first.
   * It is necessary to go through the redirection process to retrieve a code:
   *
   * ```javascript
   * const authorizeUrl = credential.getRedirectUri(scope);
   * // Redirect to the authorizeUrl
   * ```
   *
   * After the redirection, the redirect request will include a `code`.
   * With this code, we can authenticate the first time using `authenticate`:
   *
   * ```javascript
   * const authenticationRecord = await credential.authenticate(scope, code);
   * ```
   *
   * Once we have authenticated, subsequent authentication requests will work.
   * The `authorizationRecord` can be stored and retrieved for later use:
   *
   * ```javascript
   * const credential2 = new WebRedirectCredential(
   *   tenantId,
   *   clientId,
   *   redirectUri,
   *   { authenticationRecord }
   * );
   * ```
   *
   * @param tenantId - The Azure Active Directory tenant (directory) ID or name.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param redirectUri - The redirect URI that was used to request the authorization code.
   * @param options - Options for configuring the client which makes the access token request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    redirectUri: string,
    options: WebRedirectCredentialOptions = {}
  ) {
    checkTenantId(logger, tenantId);

    this.tenantId = tenantId;
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.credentialOptions = options;
  }

  /**
   * Generates the Authorize URI
   * where the application must redirect to
   * in order to trigger the Authorization Code Flow.
   */
  getAuthorizeUrl(
    scopes: string,
    options: {
      /**
       * Helps customize the authorization host, in case of testing or private clouds.
       */
      authorizeHost?: string;
      /**
       * Metadata useful to know the source of the redirection.
       */
      state?: string;
    } = {}
  ): string {
    let queryParams: Record<string, string | undefined> = {
      client_id: this.clientId,
      response_type: "code",
      redirect_uri: this.redirectUri,
      scope: scopes,
    };
    if (options.state) {
      queryParams.state = options.state;
    }
    const params = new URLSearchParams(queryParams as Record<string, string>);
    const query = params.toString();
    const authorizeHost = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/authorize?${query}`;
    return `${authorizeHost}/authorize?${query}`;
  }

  /**
   * If `authenticate()` has been successfully called before,
   * this method authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes: string | string[], options: GetTokenOptions = {}): Promise<AccessToken> {
    if (!this.msalFlow) {
      throw new AuthenticationRequiredError({
        scopes: Array.isArray(scopes) ? scopes : [scopes],
        getTokenOptions: options,
        message:
          "Automatic authentication is unavailable in this credential. You must call the authentication() method first.",
      });
    }
    return trace(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      return this.msalFlow!.getToken(arrayScopes, {
        ...newOptions,
        disableAutomaticAuthentication: true
      });
    });
  }

  /**
   * If the redirection to the authorize URL succeeds and a code is provided,
   * this method authenticates with Azure Active Directory and returns the information of the authenticated account.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param authorizationCode - The code received from the redirection flow.
   * @param options - The options used to configure any requests this
   *                  TokenCredential implementation might make.
   */
  async authenticate(
    scopes: string | string[],
    authorizationCode: string,
    options: GetTokenOptions = {}
  ): Promise<AuthenticationRecord | undefined> {
    if (!this.msalFlow) {
      this.msalFlow = new MsalAuthorizationCode({
        ...this.credentialOptions,
        authorizationCode,
        tenantId: this.tenantId,
        clientId: this.clientId,
        redirectUri: this.redirectUri,
        tokenCredentialOptions: this.credentialOptions,
        logger,
      });
    }

    try {
      return trace(`${this.constructor.name}.authenticate`, options, async (newOptions) => {
        const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
        await this.msalFlow!.getToken(arrayScopes, newOptions);
        return this.msalFlow!.getActiveAccount();
      });
    } catch (e) {
      this.msalFlow = undefined;
      throw e;
    }
  }
}
