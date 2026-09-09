// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CommunicationAccessToken,
  CommunicationIdentityClientOptions,
  CommunicationUserToken,
  GetTokenForTeamsUserOptions,
  CreateUserAndTokenOptions,
  GetTokenOptions,
  TokenScope,
  CreateUserOptions,
} from "./models.js";
import type { CommunicationUserIdentifier } from "@azure/communication-common";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import type { OperationOptions } from "@azure-rest/core-client";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import { IdentityClient } from "./generated/identityClient.js";
import { logger } from "./common/logger.js";
import { tracingClient } from "./tracing.js";

const isCommunicationIdentityClientOptions = (
  options: any,
): options is CommunicationIdentityClientOptions =>
  options && !isTokenCredential(options) && !isKeyCredential(options);

/**
 * Client class for interacting with Azure Communication Services User Token Management.
 */
export class CommunicationIdentityClient {
  /**
   * A reference to the auto-generated Identity HTTP client.
   */
  private readonly client: IdentityClient;

  /**
   * Initializes a new instance of the CommunicationIdentity class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(connectionString: string, options?: CommunicationIdentityClientOptions);

  /**
   * Initializes a new instance of the CommunicationIdentity class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the AzureKeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: CommunicationIdentityClientOptions,
  );
  /**
   * Initializes a new instance of the CommunicationIdentity class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net)
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: CommunicationIdentityClientOptions,
  );

  public constructor(
    connectionStringOrEndpoint: string,
    credentialOrOptions?: KeyCredential | CommunicationIdentityClientOptions | TokenCredential,
    maybeOptions: CommunicationIdentityClientOptions = {},
  ) {
    const { url, credential } = parseClientArguments(
      connectionStringOrEndpoint,
      credentialOrOptions,
    );
    const options = isCommunicationIdentityClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;

    this.client = new IdentityClient(url, {
      ...options,
      endpoint: url,
      loggingOptions: {
        logger: logger.info,
      },
    });

    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
  }

  /**
   * Creates a scoped user token.
   *
   * @param user - The user whose tokens are being issued.
   * @param scopes - Scopes to include in the token.
   * @param options - Additional options for the request.
   */
  public getToken(
    user: CommunicationUserIdentifier,
    scopes: TokenScope[],
    options: GetTokenOptions = {},
  ): Promise<CommunicationAccessToken> {
    return tracingClient.withSpan("CommunicationIdentity-issueToken", options, (updatedOptions) => {
      return this.client.identityOperations.issueAccessToken(
        user.communicationUserId,
        { scopes, expiresInMinutes: options.tokenExpiresInMinutes },
        updatedOptions,
      );
    });
  }

  /**
   * Revokes all data and tokens created for a user.
   *
   * @param user - The user whose tokens are being revoked.
   * @param options - Additional options for the request.
   */
  public revokeTokens(
    user: CommunicationUserIdentifier,
    options: OperationOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "CommunicationIdentity-revokeTokens",
      options,
      async (updatedOptions) => {
        await this.client.identityOperations.revokeAccessTokens(
          user.communicationUserId,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Creates a single user.
   *
   * @param options - Additional options for the request.
   */
  public createUser(options: CreateUserOptions = {}): Promise<CommunicationUserIdentifier> {
    return tracingClient.withSpan(
      "CommunicationIdentity-createUser",
      options,
      async (updatedOptions) => {
        const result = await this.client.identityOperations.create(updatedOptions);
        return {
          communicationUserId: result.identity.id,
        };
      },
    );
  }

  /**
   * Creates a single user and a token simultaneously.
   *
   * @param scopes - Scopes to include in the token.
   * @param options - Additional options for the request.
   */
  public createUserAndToken(
    scopes: TokenScope[],
    options: CreateUserAndTokenOptions = {},
  ): Promise<CommunicationUserToken> {
    return tracingClient.withSpan(
      "CommunicationIdentity-createUserAndToken",
      options,
      async (updatedOptions) => {
        const { identity, accessToken } = await this.client.identityOperations.create({
          ...updatedOptions,
          body: {
            createTokenWithScopes: scopes,
            expiresInMinutes: options.tokenExpiresInMinutes,
          },
        });
        return {
          ...accessToken!,
          user: { communicationUserId: identity.id },
        };
      },
    );
  }

  /**
   * Triggers revocation event for user and deletes all its data.
   *
   * @param user - The user being deleted.
   * @param options - Additional options for the request.
   */
  public deleteUser(
    user: CommunicationUserIdentifier,
    options: OperationOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "CommunicationIdentity-deleteUser",
      options,
      async (updatedOptions) => {
        await this.client.identityOperations.deleteIdentityOperation(
          user.communicationUserId,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Exchanges an Azure AD access token of a Teams user for a new Communication Identity access token with a matching expiration time.
   *
   * @param options - Options used to exchange an Azure AD access token of a Teams user for a new Communication Identity access token.
   */
  public getTokenForTeamsUser(
    options: GetTokenForTeamsUserOptions,
  ): Promise<CommunicationAccessToken> {
    return tracingClient.withSpan(
      "CommunicationIdentity-getTokenForTeamsUser",
      options,
      (updatedOptions) => {
        const { teamsUserAadToken, clientId, userObjectId } = updatedOptions;
        return this.client.teamsUserOperations.exchangeTeamsUserAccessToken(
          {
            token: teamsUserAadToken,
            appId: clientId,
            userId: userObjectId,
          },
          updatedOptions,
        );
      },
    );
  }
}
