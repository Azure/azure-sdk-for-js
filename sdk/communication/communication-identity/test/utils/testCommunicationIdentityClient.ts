// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, RestResponse } from "@azure/core-http";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import {
  CommunicationIdentityClient,
  TokenScope,
  IssueTokenResponse,
  CreateUserResponse
} from "../../src";
import {
  issueTokenHttpClient,
  createUserHttpClient,
  revokeTokensHttpClient
} from "./mockHttpClients";

export class TestCommunicationIdentityClient {
  private connectionString: string = "endpoint=https://contoso.spool.azure.local;accesskey=banana";

  public async issueTokenTest(
    user: CommunicationUserIdentifier,
    scopes: TokenScope[],
    options: OperationOptions = {}
  ): Promise<IssueTokenResponse> {
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: issueTokenHttpClient
    });
    return client.getToken(user, scopes, options);
  }

  public async revokeTokensTest(
    user: CommunicationUserIdentifier,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: revokeTokensHttpClient
    });
    return client.revokeTokens(user, options);
  }

  public async createUserTest(options: OperationOptions = {}): Promise<CreateUserResponse> {
    const client = new CommunicationIdentityClient(this.connectionString, {
      httpClient: createUserHttpClient
    });
    return client.createUser(options);
  }
}
