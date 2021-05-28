// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createCommunicationAuthPolicy,
  parseClientArguments,
  isKeyCredential,
  CommunicationUserIdentifier
} from "@azure/communication-common";
import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  InternalPipelineOptions,
  createPipelineFromOptions,
  OperationOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import { CommunicationIdentity, IdentityRestClient } from "./generated/src/identityRestClient";
import { SDK_VERSION } from "./constants";
import { logger } from "./common/logger";
import { createSpan } from "./common/tracing";
import {
  CommunicationIdentityClientOptions,
  TokenScope,
  CommunicationUserToken,
  CommunicationAccessToken
} from "./models";

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
  private readonly client: CommunicationIdentity;

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
    const libInfo = `azsdk-js-communication-identity/${SDK_VERSION}`;

    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }

    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new IdentityRestClient(url, pipeline).communicationIdentity;
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
      const { _response, ...result } = await this.client.issueAccessToken(
        user.communicationUserId,
        { scopes },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
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
      await this.client.revokeAccessTokens(
        user.communicationUserId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
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
      const result = await this.client.create(operationOptionsToRequestOptionsBase(updatedOptions));
      return {
        communicationUserId: result.identity.id
      };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
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
      const { identity, accessToken } = await this.client.create({
        body: { createTokenWithScopes: scopes },
        ...operationOptionsToRequestOptionsBase(updatedOptions)
      });
      return {
        ...accessToken!,
        user: { communicationUserId: identity.id }
      };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
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
      await this.client.delete(
        user.communicationUserId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Exchanges a Teams token for a new ACS access token.
   *
   * @param teamsToken - The Teams access token.
   * @param options - Additional options for the request.
   */
  public async exchangeTeamsToken(
    teamsToken: string,
    options: OperationOptions = {}
  ): Promise<CommunicationAccessToken> {
    const { span, updatedOptions } = createSpan(
      "CommunicationIdentity-exchangeTeamsToken",
      options
    );
    try {
      const { _response, ...result } = await this.client.exchangeTeamsUserAccessToken(
        { token: teamsToken },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
