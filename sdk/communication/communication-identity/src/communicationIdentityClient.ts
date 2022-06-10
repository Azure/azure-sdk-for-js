// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationAccessToken,
  CommunicationIdentityClientOptions,
  CommunicationUserToken,
  GetTokenForTeamsUserOptions,
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
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "./common/tracing";
import { logger } from "./common/logger";

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
  public async getToken(
    user: CommunicationUserIdentifier,
    scopes: TokenScope[],
    options: OperationOptions = {}
  ): Promise<CommunicationAccessToken> {
    const { span, updatedOptions } = createSpan("CommunicationIdentity-issueToken", options);
    try {
      return await this.client.communicationIdentityOperations.issueAccessToken(
        user.communicationUserId,
        scopes,
        updatedOptions
      );
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Revokes all data and tokens created for a user.
   *
   * @param user - The user whose tokens are being revoked.
   * @param options - Additional options for the request.
   */
  public async revokeTokens(
    user: CommunicationUserIdentifier,
    options: OperationOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("CommunicationIdentity-revokeTokens", options);
    try {
      await this.client.communicationIdentityOperations.revokeAccessTokens(
        user.communicationUserId,
        updatedOptions
      );
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a single user.
   *
   * @param options - Additional options for the request.
   */
  public async createUser(options: OperationOptions = {}): Promise<CommunicationUserIdentifier> {
    const { span, updatedOptions } = createSpan("CommunicationIdentity-createUser", options);
    try {
      const result = await this.client.communicationIdentityOperations.create(updatedOptions);
      return {
        communicationUserId: result.identity.id,
      };
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a single user and a token simultaneously.
   *
   * @param scopes - Scopes to include in the token.
   * @param options - Additional options for the request.
   */
  public async createUserAndToken(
    scopes: TokenScope[],
    options: OperationOptions = {}
  ): Promise<CommunicationUserToken> {
    const { span, updatedOptions } = createSpan(
      "CommunicationIdentity-createUserAndToken",
      options
    );
    try {
      const { identity, accessToken } = await this.client.communicationIdentityOperations.create({
        createTokenWithScopes: scopes,
        ...updatedOptions,
      });
      return {
        ...accessToken!,
        user: { communicationUserId: identity.id },
      };
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Triggers revocation event for user and deletes all its data.
   *
   * @param user - The user being deleted.
   * @param options - Additional options for the request.
   */
  public async deleteUser(
    user: CommunicationUserIdentifier,
    options: OperationOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("CommunicationIdentity-deleteUser", options);
    try {
      await this.client.communicationIdentityOperations.delete(
        user.communicationUserId,
        updatedOptions
      );
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Exchanges an Azure AD access token of a Teams user for a new Communication Identity access token with a matching expiration time.
   *
   * @param options - Options used to exchange an Azure AD access token of a Teams user for a new Communication Identity access token.
   */
  public async getTokenForTeamsUser(
    options: GetTokenForTeamsUserOptions
  ): Promise<CommunicationAccessToken> {
    const { span, updatedOptions } = createSpan(
      "CommunicationIdentity-getTokenForTeamsUser",
      options
    );
    const { teamsUserAadToken, clientId, userObjectId } = options;
    try {
      return await this.client.communicationIdentityOperations.exchangeTeamsUserAccessToken(
        teamsUserAadToken,
        clientId,
        userObjectId,
        updatedOptions
      );
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
