import assert from "assert";
import { AzureCredential, AccessToken, IdentityClientOptions } from '../../src';
import { RequestOptionsBase } from '@azure/core-http';

const identityClientOptions: IdentityClientOptions = {
  authorityHost: "https://authority",
  refreshBufferMs: 5000
}

class MockRefreshAzureCredential extends AzureCredential {
  private _expiresOn: Date;
  public authCount: number = 0;

  constructor(expiresOn: Date) {
    super(identityClientOptions)
    this._expiresOn = expiresOn;
  }

  protected getTokenCore(_scopes: string | string[], _requestOptions?: RequestOptionsBase): Promise<AccessToken | null> {
    this.authCount++
    return Promise.resolve({ token: 'mocktoken', expiresOn: this._expiresOn})
  }
}

describe('AzureCredential', function() {
  it('refreshes access tokens when they expire', async () => {
    const now = Date.now()
    const refreshCred1 = new MockRefreshAzureCredential(new Date(now))
    const refreshCred2 = new MockRefreshAzureCredential(new Date(now + identityClientOptions.refreshBufferMs))
    const notRefreshCred1 = new MockRefreshAzureCredential(new Date(now + identityClientOptions.refreshBufferMs + 5000))

    const credentialsToTest: [MockRefreshAzureCredential, number][] = [
      [refreshCred1, 2],
      [refreshCred2, 2],
      [notRefreshCred1, 1]
    ]

    for (const [credentialToTest, expectedCalls] of credentialsToTest) {
      await credentialToTest.getToken('mockscope')
      await credentialToTest.getToken('mockscope')
      assert.strictEqual(credentialToTest.authCount, expectedCalls)
    }
  })
})
