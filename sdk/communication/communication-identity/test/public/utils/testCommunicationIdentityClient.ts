// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationAccessToken,
  CommunicationIdentityClient,
  CommunicationIdentityClientOptions,
  CommunicationUserToken,
  TokenScope,
} from "../../../src";
import {
  createUserAndTokenHttpClient,
  createUserHttpClient,
  getTokenForTeamsUserHttpClient,
  getTokenHttpClient,
  revokeTokensHttpClient,
} from "./mockHttpClients";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { OperationOptions } from "@azure/core-client";

export class TestCommunicationIdentityClient {
  private connectionString: string = "endpoint=https://contoso.spool.azure.local;accesskey=banana";

  public async getTokenTest(
    user: CommunicationUserIdentifier,
    scopes: TokenScope[],
    options: OperationOptions = {}
  ): Promise<CommunicationAccessToken> {
    // casting is a workaround to enable min-max testing
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: getTokenHttpClient,
    } as CommunicationIdentityClientOptions);
    return client.getToken(user, scopes, options as any);
  }

  public async revokeTokensTest(
    user: CommunicationUserIdentifier,
    options: OperationOptions = {}
  ): Promise<void> {
    // casting is a workaround to enable min-max testing
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: revokeTokensHttpClient,
    } as CommunicationIdentityClientOptions);
    return client.revokeTokens(user, options as any);
  }

  public async createUserTest(
    options: OperationOptions = {}
  ): Promise<CommunicationUserIdentifier> {
    // casting is a workaround to enable min-max testing
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: createUserHttpClient,
    } as CommunicationIdentityClientOptions);
    return client.createUser(options as any);
  }

  public async createUserAndTokenTest(
    scopes: TokenScope[],
    options: OperationOptions = {}
  ): Promise<CommunicationUserToken> {
    // casting is a workaround to enable min-max testing
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: createUserAndTokenHttpClient,
    } as CommunicationIdentityClientOptions);
    return client.createUserAndToken(scopes, options as any);
  }

  public async getTokenForTeamsUserTest(
    teamsToken: string,
    clientId: string,
    userObjectId: string
  ): Promise<CommunicationAccessToken> {
    // casting is a workaround to enable min-max testing
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: getTokenForTeamsUserHttpClient,
    } as CommunicationIdentityClientOptions);
    return client.getTokenForTeamsUser({
      teamsUserAadToken: teamsToken,
      clientId: clientId,
      userObjectId: userObjectId,
    });
  }
}
