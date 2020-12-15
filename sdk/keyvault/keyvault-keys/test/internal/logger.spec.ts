// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { createSandbox, SinonSandbox, SinonSpy } from "sinon";
import { CryptographyClient, KeyClient } from "../../src";
import {
  HttpClient,
  WebResourceLike,
  HttpOperationResponse,
  HttpHeaders,
  isNode
} from "@azure/core-http";
import { ClientSecretCredential } from "@azure/identity";
import { logger } from "../../src/log";
import { setLogLevel } from "@azure/logger";

describe("The keyvault-keys clients logging options should work", () => {
  const keyVaultUrl = `https://keyVaultName.vault.azure.net`;
  const headers = new HttpHeaders({
    "x-ms-keyvault-region": "x-ms-keyvault-region-value",
    "x-ms-keyvault-network-info": "x-ms-keyvault-network-info-value",
    "x-ms-keyvault-service-version": "x-ms-keyvault-service-version"
  });

  function makeHTTPMock(path: string, status = 200): HttpClient {
    return {
      async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
        return {
          status,
          headers,
          request: httpRequest,
          parsedBody: {
            key: {
              kid: `${keyVaultUrl}${path}`
            }
          }
        };
      }
    };
  }

  let mockHttpClient: HttpClient;
  let sandbox: SinonSandbox;
  let spy: SinonSpy<any[], void>;
  let credential: ClientSecretCredential;

  beforeEach(async () => {
    credential = await new ClientSecretCredential(
      "<tenant-id>",
      "<client-id>",
      "<azure-client-secret>"
    );
    setLogLevel("info");
  });

  afterEach(() => {
    setLogLevel("error");
    sandbox.restore();
  });

  describe("KeyClient", () => {
    beforeEach(async () => {
      mockHttpClient = makeHTTPMock("/keys/keyName/id");
      sandbox = createSandbox();
      spy = sandbox.spy(logger, "info");
    });

    it("it should log as expected", async function() {
      const client = new KeyClient(keyVaultUrl, credential, {
        httpClient: mockHttpClient
      });
      await client.listPropertiesOfKeyVersions("/").next();

      assert.ok(spy.called);
      const calls = spy.getCalls();
      assert.ok(calls[0].args[0].match(/method": "GET/));
      assert.equal(calls[1].args[0], "Response status code: 200");
      assert.equal(
        calls[2].args[0],
        `Headers: ${JSON.stringify({ _headersMap: headers.toJson() }, null, 2)}`
      );
    });
  });

  describe("CryptographyClient", () => {
    beforeEach(async () => {
      mockHttpClient = makeHTTPMock("/keys/key-name/sign");
      sandbox = createSandbox();
      spy = sandbox.spy(logger, "info");
    });

    it("it should log as expected", async function() {
      // Cryptography isn't currently working in the browser
      if (!isNode) {
        this.skip();
      }
      const keyId = `${keyVaultUrl}/keys/key-name/key-id`;
      const client = new CryptographyClient(keyId, credential, {
        httpClient: mockHttpClient
      });
      await client.signData("RS256", Buffer.from("my message"));

      assert.ok(spy.called);
      const calls = spy.getCalls();
      assert.ok(calls[0].args[0].match(/method": "GET/));
      assert.equal(calls[1].args[0], "Response status code: 200");
      assert.equal(
        calls[2].args[0],
        `Headers: ${JSON.stringify({ _headersMap: headers.toJson() }, null, 2)}`
      );
    });
  });
});
