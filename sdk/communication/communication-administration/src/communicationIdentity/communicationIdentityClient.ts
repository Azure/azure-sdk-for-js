// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createCommunicationAccessKeyCredentialPolicy,
  parseClientArguments,
  isKeyCredential,
  CommunicationUser
} from "@azure/communication-common";
import { KeyCredential } from "@azure/core-auth";
import {
  InternalPipelineOptions,
  createPipelineFromOptions,
  OperationOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/api";
import { GeneratedCommunicationIdentityClient } from "./generated/src/generatedCommunicationIdentityClient";
import { CommunicationIdentityOperations } from "./generated/src/operations/communicationIdentityOperations";
import { SDK_VERSION } from "./constants";
import { logger } from "../common/logger";
import { createSpan } from "../common/tracing";
import {
  CommunicationIdentityOptions,
  TokenScope,
  IssueTokenResponse,
  CreateUserResponse,
  CommunicationUserToken
} from "./models";
import { VoidResponse } from "../common/models";
import { attachHttpResponse } from "../common/mappers";

const isCommunicationIdentityOptions = (options: any): options is CommunicationIdentityOptions =>
  options && !isKeyCredential(options);

/**
 * Client class for interacting with Azure Communication Services User Token Management.
 */
export class CommunicationIdentityClient {
  /**
   * A reference to the auto-generated UserToken HTTP client.
   */
  private readonly client: CommunicationIdentityOperations;

  /**
   * The base URL to which requests are made
   */
  private readonly endpoint: string;

  /**
   * Initializes a new instance of the CommunicationIdentity class.
   * @param connectionString Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options Optional. Options to configure the HTTP pipeline.
   */
  public constructor(connectionString: string, options?: CommunicationIdentityOptions);

  /**
   * Initializes a new instance of the CommunicationIdentity class using an Azure KeyCredential.
   * @param url The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential An object that is used to authenticate requests to the service. Use the AzureKeyCredential or `@azure/identity` to create a credential.
   * @param options Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    url: string,
    credential: KeyCredential,
    options?: CommunicationIdentityOptions
  );

  /**
   * Creates an instance of CommunicationIdentity.
   *
   * @param {string} url The endpoint to the service
   * @param {KeyCredential} credential An object that is used to authenticate requests to the service. Use the AzureKeyCredential or `@azure/identity` to create a credential.
   * @param {CommunicationIdentityOptions} [options={}] Options to configure the HTTP pipeline.
   */
  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | CommunicationIdentityOptions,
    maybeOptions: CommunicationIdentityOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isCommunicationIdentityOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;
    const libInfo = `azsdk-js-communication-administration/${SDK_VERSION}`;

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

    const authPolicy = createCommunicationAccessKeyCredentialPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.endpoint = url;
    this.client = new GeneratedCommunicationIdentityClient(pipeline).communicationIdentity;
  }

  /**
   * Creates a scoped user token.
   *
   * @param {CommunicationUser} user The user whose tokens are being revoked.
   * @param {TokenScope[]} scopes Scopes to include in the token.
   * @param {OperationOptions} [options={}] Additional options for the request.
   */
  public async issueToken(
    user: CommunicationUser,
    scopes: TokenScope[],
    options: OperationOptions = {}
  ): Promise<IssueTokenResponse> {
    const { span, updatedOptions } = createSpan("CommunicationIdentity-issueToken", options);
    try {
      const { token, id, expiresOn, _response } = await this.client.issueToken(
        this.endpoint,
        user.communicationUserId,
        scopes,
        { ...operationOptionsToRequestOptionsBase(updatedOptions) }
      );
      const results: CommunicationUserToken = {
        token,
        expiresOn,
        user: { communicationUserId: id }
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
   * Revokes all data and tokens created for a user.
   *
   * @param {CommunicationUser} user The user whose tokens are being revoked.
   * @param {Date} tokensValidFrom Tokens issued before this time will be revoked.
   * @param {OperationOptions} [options={}] Additional options for the request.
   */
  public async revokeTokens(
    user: CommunicationUser,
    tokensValidFrom: Date = new Date(),
    options: OperationOptions = {}
  ): Promise<VoidResponse> {
    const { span, updatedOptions } = createSpan("CommunicationIdentity-revokeTokens", options);
    try {
      const { _response } = await this.client.update(this.endpoint, user.communicationUserId, {
        tokensValidFrom,
        ...operationOptionsToRequestOptionsBase(updatedOptions)
      });
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
   * @param {OperationOptions} [options={}] Additional options for the request.
   */
  public async createUser(options: OperationOptions = {}): Promise<CreateUserResponse> {
    const { span, updatedOptions } = createSpan("CommunicationIdentity-createUser", options);
    try {
      const { id, _response } = await this.client.create(this.endpoint, {
        ...operationOptionsToRequestOptionsBase(updatedOptions)
      });
      const user: CommunicationUser = { communicationUserId: id };
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
   * Triggers revocation event for user and deletes all its data.
   *
   * @param {CommunicationUser} user The user being deleted.
   * @param {OperationOptions} [options={}] Additional options for the request.
   */
  public async deleteUser(
    user: CommunicationUser,
    options: OperationOptions = {}
  ): Promise<VoidResponse> {
    const { span, updatedOptions } = createSpan("CommunicationIdentity-deleteUser", options);
    try {
      const { _response } = await this.client.deleteMethod(
        this.endpoint,
        user.communicationUserId,
        {
          ...operationOptionsToRequestOptionsBase(updatedOptions)
        }
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

export { CommunicationTokenRequest, CommunicationIdentityToken } from "./generated/src/models";
