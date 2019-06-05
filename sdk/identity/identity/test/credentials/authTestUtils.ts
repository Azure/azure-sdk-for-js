import assert from "assert";
import { IdentityClientOptions } from '../../src';
import { HttpHeaders, HttpOperationResponse, WebResource, HttpClient } from '@azure/core-http'

export class MockAuthHttpClient implements HttpClient {
  private requestPromise: Promise<WebResource>
  private requestResolve: (request: WebResource) => void

  public identityClientOptions: IdentityClientOptions

  constructor() {
    this.requestResolve = (r) => {}
    this.requestPromise = new Promise((resolve) => {
      this.requestResolve = resolve
    })

    this.identityClientOptions = {
      authorityHost: "https://authority",
      httpClient: this
    };
  }

  sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse> {
    this.requestResolve(httpRequest)
    return Promise.resolve({
      request: httpRequest,
      status: 200,
      headers: new HttpHeaders(),
      parsedBody: {
        access_token: 'token',
        expires_in: 120
      }
    })
  }

  getAuthRequest(): Promise<WebResource> {
    return this.requestPromise
  }
}

export function assertClientCredentials(
  authRequest: WebResource,
  expectedTenantId: string,
  expectedClientId: string,
  expectedClientSecret: string) {
  if (!authRequest) {
    assert.fail("No authentication request was intercepted")
  } else {
    assert.strictEqual(
      authRequest.url.startsWith(`https://authority/${expectedTenantId}`),
      true,
      "Request URL doesn't contain expected tenantId")
    assert.strictEqual(
      authRequest.body.indexOf(`client_id=${expectedClientId}`) > -1,
      true,
      "Request URL doesn't contain expected clientId")
    assert.strictEqual(
      authRequest.body.indexOf(`client_secret=${expectedClientSecret}`) > -1,
      true,
      "Request URL doesn't contain expected clientSecret")
  }
}
