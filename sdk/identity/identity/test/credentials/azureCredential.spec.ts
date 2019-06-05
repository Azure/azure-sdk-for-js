// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { AccessToken } from "../../src";
import { AzureCredential, TokenRefreshBufferMs } from "../../src/credentials/azureCredential";
import { RequestOptionsBase } from "@azure/core-http";

class MockRefreshAzureCredential extends AzureCredential {
  private _expiresOn: Date;
  public authCount: number = 0;

  constructor(expiresOn: Date) {
    super();
    this._expiresOn = expiresOn;
  }

  protected getAccessToken(
    _scopes: string | string[],
    _requestOptions?: RequestOptionsBase
  ): Promise<AccessToken | null> {
    this.authCount++;
    return Promise.resolve({ token: "mocktoken", expiresOn: this._expiresOn });
  }
}

describe("AzureCredential", function() {
  it("refreshes access tokens when they expire", async () => {
    const now = Date.now();
    const refreshCred1 = new MockRefreshAzureCredential(new Date(now));
    const refreshCred2 = new MockRefreshAzureCredential(new Date(now + TokenRefreshBufferMs));
    const notRefreshCred1 = new MockRefreshAzureCredential(
      new Date(now + TokenRefreshBufferMs + 5000)
    );

    const credentialsToTest: [MockRefreshAzureCredential, number][] = [
      [refreshCred1, 2],
      [refreshCred2, 2],
      [notRefreshCred1, 1]
    ];

    for (const [credentialToTest, expectedCalls] of credentialsToTest) {
      await credentialToTest.getToken("mockscope");
      await credentialToTest.getToken("mockscope");
      assert.strictEqual(credentialToTest.authCount, expectedCalls);
    }
  });
});
