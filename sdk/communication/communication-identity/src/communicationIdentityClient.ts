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
import { CanonicalCode } from "@opentelemetry/api";
import { CommunicationIdentity, IdentityRestClient } from "./generated/src/identityRestClient";
import { SDK_VERSION } from "./constants";
import { logger } from "./common/logger";
import { createSpan } from "./common/tracing";
import {
  CommunicationIdentityOptions,
  TokenScope,
  IssueTokenResponse,
  CreateUserResponse,
  CommunicationUserToken,
  CreateUserWithTokenResponse
} from "./models";
import { VoidResponse } from "./common/models";
import { attachHttpResponse } from "./common/mappers";

const isCommunicationIdentityOptions = (options: any): options is CommunicationIdentityOptions =>
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
  public constructor(connectionString: string, options?: CommunicationIdentityOptions);

  /**
   * Initializes a new instance of the CommunicationIdentity class using an Azure KeyCredential.
   * @param url - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the AzureKeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    url: string,
    credential: KeyCredential,
    options?: CommunicationIdentityOptions
  );
  /**
   * Initializes a new instance of the CommunicationIdentity class using a TokenCredential.
   * @param url - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net)
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    url: string,
    credential: TokenCredential,
    options?: CommunicationIdentityOptions
  );
  /**
   * Creates an instance of CommunicationIdentity.
   *
   * @param url - The endpoint to the service
   * @param credential - An object that is used to authenticate requests to the service. Use the AzureKeyCredential or `@azure/identity` to create a credential.
   * @param options - Options to configure the HTTP pipeline.
   */
  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | CommunicationIdentityOptions | TokenCredential,
    maybeOptions: CommunicationIdentityOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isCommunicationIdentityOptions(credentialOrOptions)
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
   * @param user - The user whose tokens are being revoked.
   * @param scopes - Scopes to include in the token.
   * @param options - Additional options for the request.
   */
  public async issueToken(
    user: CommunicationUserIdentifier,
    scopes: TokenScope[],
    options: OperationOptions = {}
  ): Promise<IssueTokenResponse> {
    const { span, updatedOptions } = createSpan("CommunicationIdentity-issueToken", options);
    try {
      const { token, expiresOn, _response } = await this.client.issueAccessToken(
        user.communicationUserId,
        { scopes },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse({ token, expiresOn }, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
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
  ): Promise<VoidResponse> {
    const { span, updatedOptions } = createSpan("CommunicationIdentity-revokeTokens", options);
    try {
      const { _response } = await this.client.revokeAccessTokens(
        user.communicationUserId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse({}, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
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
  public async createUser(options: OperationOptions = {}): Promise<CreateUserResponse> {
    const { span, updatedOptions } = createSpan("CommunicationIdentity-createUser", options);
    try {
      const { identity, _response } = await this.client.create(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      const user: CommunicationUserIdentifier = { communicationUserId: identity.id };
      return attachHttpResponse(user, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
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
  public async createUserWithToken(
    scopes: TokenScope[],
    options: OperationOptions = {}
  ): Promise<CreateUserWithTokenResponse> {
    const { span, updatedOptions } = createSpan(
      "CommunicationIdentity-createUserWithToken",
      options
    );
    try {
      const { identity, accessToken, _response } = await this.client.create({
        body: { createTokenWithScopes: scopes },
        ...operationOptionsToRequestOptionsBase(updatedOptions)
      });
      const results: CommunicationUserToken = {
        ...accessToken!,
        user: { communicationUserId: identity.id }
      };
      return attachHttpResponse(results, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
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
  ): Promise<VoidResponse> {
    const { span, updatedOptions } = createSpan("CommunicationIdentity-deleteUser", options);
    try {
      const { _response } = await this.client.delete(
        user.communicationUserId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse({}, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
