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
import type { OperationOptions } from "@azure/core-client";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import { IdentityClient } from "./generated/identityClient.js";
import { logger } from "./common/logger.js";
import { tracingClient } from "./tracing.js";
import { withLegacyOperationOptions } from "./legacyOperationOptions.js";

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
    const userId = getCommunicationUserId(user);
    assertRequired(scopes, "scopes");
    return tracingClient.withSpan("CommunicationIdentity-issueToken", options, (updatedOptions) => {
      return withLegacyOperationOptions(updatedOptions, (generatedOptions) =>
        this.client.identityOperations.issueAccessToken(
          userId,
          { scopes, expiresInMinutes: options.tokenExpiresInMinutes },
          generatedOptions,
        ),
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
    const userId = getCommunicationUserId(user);
    return tracingClient.withSpan(
      "CommunicationIdentity-revokeTokens",
      options,
      async (updatedOptions) => {
        await withLegacyOperationOptions(updatedOptions, (generatedOptions) =>
          this.client.identityOperations.revokeAccessTokens(userId, generatedOptions),
        );
      },
    );
  }

  /**
   * Creates a single user.
   *
   * The request is sent without a body, matching previous versions of this client.
   *
   * @param options - Additional options for the request.
   */
  public createUser(options: CreateUserOptions = {}): Promise<CommunicationUserIdentifier> {
    return tracingClient.withSpan(
      "CommunicationIdentity-createUser",
      options,
      async (updatedOptions) => {
        // Keep the body undefined because the GA client omitted an empty serialized body on the wire.
        const result = await withLegacyOperationOptions(updatedOptions, (generatedOptions) =>
          this.client.identityOperations.create(generatedOptions),
        );
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
    assertRequired(scopes, "scopes");
    return tracingClient.withSpan(
      "CommunicationIdentity-createUserAndToken",
      options,
      async (updatedOptions) => {
        const { identity, accessToken } = await withLegacyOperationOptions(
          updatedOptions,
          (generatedOptions) =>
            this.client.identityOperations.create({
              ...generatedOptions,
              body: {
                createTokenWithScopes: scopes,
                expiresInMinutes: options.tokenExpiresInMinutes,
              },
            }),
        );
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
    const userId = getCommunicationUserId(user);
    return tracingClient.withSpan(
      "CommunicationIdentity-deleteUser",
      options,
      async (updatedOptions) => {
        await withLegacyOperationOptions(updatedOptions, (generatedOptions) =>
          this.client.identityOperations.deleteIdentityOperation(userId, generatedOptions),
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
    assertRequired(options, "options");
    assertRequired(options.teamsUserAadToken, "teamsUserAadToken");
    assertRequired(options.clientId, "clientId");
    assertRequired(options.userObjectId, "userObjectId");
    return tracingClient.withSpan(
      "CommunicationIdentity-getTokenForTeamsUser",
      options,
      (updatedOptions) => {
        const { teamsUserAadToken, clientId, userObjectId } = updatedOptions;
        return withLegacyOperationOptions(updatedOptions, (generatedOptions) =>
          this.client.teamsUserOperations.exchangeTeamsUserAccessToken(
            {
              token: teamsUserAadToken,
              appId: clientId,
              userId: userObjectId,
            },
            generatedOptions,
          ),
        );
      },
    );
  }
}

function getCommunicationUserId(user: CommunicationUserIdentifier): string {
  const userId = user?.communicationUserId;
  assertRequired(userId, "id");
  return userId;
}

function assertRequired<T>(value: T | null | undefined, name: string): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(`${name} cannot be null or undefined.`);
  }
}
