// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationAccessToken,
  CommunicationIdentityClientOptions,
  CommunicationUserToken,
  GetTokenForTeamsUserOptions,
  CreateUserAndTokenOptions,
  GetTokenOptions,
  TokenScope,
} from "./models";
import {
  CommunicationUserIdentifier,
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { InternalClientPipelineOptions, OperationOptions } from "@azure/core-client";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { IdentityRestClient } from "./generated/src/identityRestClient";
import { logger } from "./common/logger";
import { tracingClient } from "./generated/src/tracing";
import { CommunicationIdentityIssueAccessTokenOptionalParams } from "./generated/src/models";

const isCommunicationIdentityClientOptions = (
  options: any
): options is CommunicationIdentityClientOptions =>
  options && !isTokenCredential(options) && !isKeyCredential(options);

/**
 * Client class for interacting with Azure Communication Services User Token Management.
 */
export class CommunicationIdentityClient {
  /**
   * A reference to the auto-generated UserToken HTTP client.
   */
  private readonly client: IdentityRestClient;

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
    options?: CommunicationIdentityClientOptions
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
    options?: CommunicationIdentityClientOptions
  );

  public constructor(
    connectionStringOrEndpoint: string,
    credentialOrOptions?: KeyCredential | CommunicationIdentityClientOptions | TokenCredential,
    maybeOptions: CommunicationIdentityClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(
      connectionStringOrEndpoint,
      credentialOrOptions
    );
    const options = isCommunicationIdentityClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new IdentityRestClient(url, { endpoint: url, ...internalPipelineOptions });

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
    tokenExpirationInMinutes?: number,
    options?: GetTokenOptions
  ): Promise<CommunicationAccessToken>;

  /**
   * Creates a scoped user token.
   *
   * @param user - The user whose tokens are being issued.
   * @param scopes - Scopes to include in the token.
   * @param tokenExpirationInMinutes - Custom validity period of the Communication Identity access token within [60,1440] minutes range. If not provided, the default value of 1440 minutes (24 hours) will be used.
   * @param options - Additional options for the request.
   */
  public getToken(
    user: CommunicationUserIdentifier,
    scopes: TokenScope[],
    tokenExpirationInMinutes?: number,
    options?: GetTokenOptions
  ): Promise<CommunicationAccessToken>;

  public getToken(
    user: CommunicationUserIdentifier,
    scopes: TokenScope[],
    tokenExpirationInMinutesOrOptions?: number | GetTokenOptions,
    options?: GetTokenOptions
  ): Promise<CommunicationAccessToken> {
    const operationOptions: CommunicationIdentityIssueAccessTokenOptionalParams =
      this.parseTokenExpirationInMinutesOrOptions(tokenExpirationInMinutesOrOptions, options);

    return tracingClient.withSpan(
      "CommunicationIdentity-issueToken",
      operationOptions,
      (updatedOptions) => {
        return this.client.communicationIdentityOperations.issueAccessToken(
          user.communicationUserId,
          scopes,
          updatedOptions
        );
      }
    );
  }

  /**
   * Revokes all data and tokens created for a user.
   *
   * @param user - The user whose tokens are being revoked.
   * @param options - Additional options for the request.
   */
  public revokeTokens(
    user: CommunicationUserIdentifier,
    options: OperationOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "CommunicationIdentity-revokeTokens",
      options,
      async (updatedOptions) => {
        await this.client.communicationIdentityOperations.revokeAccessTokens(
          user.communicationUserId,
          updatedOptions
        );
      }
    );
  }

  /**
   * Creates a single user.
   *
   * @param options - Additional options for the request.
   */
  public createUser(options: OperationOptions = {}): Promise<CommunicationUserIdentifier> {
    const operationOptions: CommunicationIdentityIssueAccessTokenOptionalParams = options;
    operationOptions.expiresInMinutes = undefined;
    return tracingClient.withSpan(
      "CommunicationIdentity-createUser",
      operationOptions,
      async (updatedOptions) => {
        const result = await this.client.communicationIdentityOperations.create(updatedOptions);
        return {
          communicationUserId: result.identity.id,
        };
      }
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
    tokenExpirationInMinutes?: number,
    options?: CreateUserAndTokenOptions
  ): Promise<CommunicationUserToken>;

  /**
   * Creates a single user and a token simultaneously.
   *
   * @param scopes - Scopes to include in the token.
   * @param tokenExpirationInMinutes - Custom validity period of the Communication Identity access token within [60,1440] minutes range. If not provided, the default value of 1440 minutes (24 hours) will be used.
   * @param options - Additional options for the request.
   */
  public createUserAndToken(
    scopes: TokenScope[],
    tokenExpirationInMinutes?: number,
    options?: CreateUserAndTokenOptions
  ): Promise<CommunicationUserToken>;

  public createUserAndToken(
    scopes: TokenScope[],
    tokenExpirationInMinutesOrOptions?: number | CreateUserAndTokenOptions,
    options?: CreateUserAndTokenOptions
  ): Promise<CommunicationUserToken> {
    const operationOptions: CommunicationIdentityIssueAccessTokenOptionalParams =
      this.parseTokenExpirationInMinutesOrOptions(tokenExpirationInMinutesOrOptions, options);

    return tracingClient.withSpan(
      "CommunicationIdentity-createUserAndToken",
      operationOptions,
      async (updatedOptions) => {
        const { identity, accessToken } = await this.client.communicationIdentityOperations.create({
          createTokenWithScopes: scopes,
          ...updatedOptions,
        });
        return {
          ...accessToken!,
          user: { communicationUserId: identity.id },
        };
      }
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
    options: OperationOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "CommunicationIdentity-deleteUser",
      options,
      async (updatedOptions) => {
        await this.client.communicationIdentityOperations.delete(
          user.communicationUserId,
          updatedOptions
        );
      }
    );
  }

  /**
   * Exchanges an Azure AD access token of a Teams user for a new Communication Identity access token with a matching expiration time.
   *
   * @param options - Options used to exchange an Azure AD access token of a Teams user for a new Communication Identity access token.
   */
  public getTokenForTeamsUser(
    options: GetTokenForTeamsUserOptions
  ): Promise<CommunicationAccessToken> {
    return tracingClient.withSpan(
      "CommunicationIdentity-getTokenForTeamsUser",
      options,
      (updatedOptions) => {
        const { teamsUserAadToken, clientId, userObjectId } = updatedOptions;
        return this.client.communicationIdentityOperations.exchangeTeamsUserAccessToken(
          teamsUserAadToken,
          clientId,
          userObjectId,
          updatedOptions
        );
      }
    );
  }

  private parseTokenExpirationInMinutesOrOptions(
    tokenExpirationInMinutesOrOptions?: number | OperationOptions,
    options?: OperationOptions
  ): CommunicationIdentityIssueAccessTokenOptionalParams {
    let optionsWithTokenExpiration: CommunicationIdentityIssueAccessTokenOptionalParams = {};

    if (options) {
      optionsWithTokenExpiration = options;
    }
    if (
      tokenExpirationInMinutesOrOptions &&
      typeof tokenExpirationInMinutesOrOptions === "number"
    ) {
      optionsWithTokenExpiration.expiresInMinutes = tokenExpirationInMinutesOrOptions;
      return optionsWithTokenExpiration;
    } else {
      optionsWithTokenExpiration.expiresInMinutes = undefined;
      return optionsWithTokenExpiration;
    }
  }
}
