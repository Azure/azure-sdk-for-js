// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import {
  CommunicationAccessToken,
  CommunicationIdentityClient,
  CommunicationUserToken,
  TokenScope
} from "../../src";
import {
  getTokenHttpClient,
  createUserHttpClient,
  revokeTokensHttpClient,
  createUserWithTokenHttpClient
} from "./mockHttpClients";

export class TestCommunicationIdentityClient {
  private connectionString: string = "endpoint=https://contoso.spool.azure.local;accesskey=banana";

  public async getTokenTest(
    user: CommunicationUserIdentifier,
    scopes: TokenScope[],
    options: OperationOptions = {}
  ): Promise<CommunicationAccessToken> {
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: getTokenHttpClient
    });
    return client.getToken(user, scopes, options);
  }

  public async revokeTokensTest(
    user: CommunicationUserIdentifier,
    options: OperationOptions = {}
  ): Promise<void> {
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: revokeTokensHttpClient
    });
    return client.revokeTokens(user, options);
  }

  public async createUserTest(
    options: OperationOptions = {}
  ): Promise<CommunicationUserIdentifier> {
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: createUserHttpClient
    });
    return client.createUser(options);
  }

  public async createUserWithTokenTest(
    scopes: TokenScope[],
    options: OperationOptions = {}
  ): Promise<CommunicationUserToken> {
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: createUserWithTokenHttpClient
    });
    return client.createUserWithToken(scopes, options);
  }
}
