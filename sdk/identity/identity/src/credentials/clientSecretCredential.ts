// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// import qs from "qs";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { MsalClient, AuthenticationRequired } from "../client/msalClient";
import { createSpan } from "../util/tracing";
import { AuthenticationErrorName } from "../client/errors";
import { CanonicalCode } from "@opentelemetry/api";
import { credentialLogger, formatError } from "../util/logging";
// import { getIdentityTokenEndpointSuffix } from "../util/identityTokenEndpoint";
// import { NodeAuthOptions } from "@azure/msal-node/dist/config/Configuration";
import { ClientSecretCredentialOptions } from "./clientSecretCredentialOptions";
import { ClientCredentialRequest } from "@azure/msal-node";

const logger = credentialLogger("ClientSecretCredential");

/**
 * Enables authentication to Azure Active Directory using a client secret
 * that was generated for an App Registration.  More information on how
 * to configure a client secret can be found here:
 *
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-credentials-to-your-web-application
 *
 */
export class ClientSecretCredential implements TokenCredential {
  private msalClient: MsalClient;

  /**
   * Creates an instance of the ClientSecretCredential with the details
   * needed to authenticate against Azure Active Directory with a client
   * secret.
   *
   * @param tenantId The Azure Active Directory tenant (directory) ID.
   * @param clientId The client (application) ID of an App Registration in the tenant.
   * @param clientSecret A client secret that was generated for the App Registration.
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(
    tenantId: string,
    clientId: string,
    clientSecret: string,
    options?: ClientSecretCredentialOptions
  ) {
    if (!tenantId.match(/^[0-9a-zA-Z-.:/]+$/)) {
      const error = new Error(
        "Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://docs.microsoft.com/partner-center/find-ids-and-domain-names."
      );
      logger.getToken.info(formatError(error));
      throw error;
    }

    const persistenceEnabled = options?.persistenceEnabled ? options?.persistenceEnabled : false;
    const authenticationRecord = options?.authenticationRecord;

    let authorityHost;
    if (options && options.authorityHost) {
      if (options.authorityHost.endsWith("/")) {
        authorityHost = options.authorityHost + tenantId;
      } else {
        authorityHost = options.authorityHost + "/" + tenantId;
      }
    } else {
      authorityHost = "https://login.microsoftonline.com/" + tenantId;
    }

    this.msalClient = new MsalClient(
      { clientId, clientSecret, authority: authorityHost },
      tenantId,
      persistenceEnabled,
      authenticationRecord,
      options?.cachePath,
      options
    );
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if
   * successful.  If authentication cannot be performed at this time, this method may
   * return null.  If an error occurs during authentication, an {@link AuthenticationError}
   * containing failure details will be thrown.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param options The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    const { span } = createSpan("ClientSecretCredential-getToken", options);

    const scopeArray = typeof scopes === "object" ? scopes : [scopes];

    return this.msalClient.acquireTokenFromCache().catch((e) => {
      console.log(e);
      if (e instanceof AuthenticationRequired) {
        try {
          return this.acquireTokenByClientCredential({ scopes: scopeArray });
        } catch (err) {
          const code =
            err.name === AuthenticationErrorName
              ? CanonicalCode.UNAUTHENTICATED
              : CanonicalCode.UNKNOWN;
          span.setStatus({
            code,
            message: err.message
          });
          logger.getToken.info(err);
          throw err;
        } finally {
          span.end();
        }
      } else {
        throw e;
      }
    });

    /*
    const { span, options: newOptions } = createSpan("ClientSecretCredential-getToken", options);
    try {
      const urlSuffix = getIdentityTokenEndpointSuffix(this.tenantId);
      const webResource = this.identityClient.createWebResource({
        url: `${this.identityClient.authorityHost}/${this.tenantId}/${urlSuffix}`,
        method: "POST",
        disableJsonStringifyOnBody: true,
        deserializationMapper: undefined,
        body: qs.stringify({
          response_type: "token",
          grant_type: "client_credentials",
          client_id: this.clientId,
          client_secret: this.clientSecret,
          scope: typeof scopes === "string" ? scopes : scopes.join(" ")
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        abortSignal: options && options.abortSignal,
        spanOptions: newOptions.tracingOptions && newOptions.tracingOptions.spanOptions
      });

      const tokenResponse = await this.identityClient.sendTokenRequest(webResource);
      logger.getToken.info(formatSuccess(scopes));
      return (tokenResponse && tokenResponse.accessToken) || null;
    } catch (err) {
      const code =
        err.name === AuthenticationErrorName
          ? CanonicalCode.UNAUTHENTICATED
          : CanonicalCode.UNKNOWN;
      span.setStatus({
        code,
        message: err.message
      });
      logger.getToken.info(err);
      throw err;
    } finally {
      span.end();
    }
    */
  }

  private async acquireTokenByClientCredential(
    clientCredentialRequest: ClientCredentialRequest
  ): Promise<AccessToken | null> {
    try {
      console.log("trying to acquire token by client credential");
      const response = await this.msalClient.acquireTokenByClientCredential(
        clientCredentialRequest
      );
      console.log("acquired: ");
      console.log(response);
      return {
        expiresOnTimestamp: response.expiresOn.getTime(),
        token: response.accessToken
      };
    } catch (error) {
      console.log(error);
      throw new Error(`Client Secret Authentication Error "${JSON.stringify(error)}"`);
    }
  }
}
