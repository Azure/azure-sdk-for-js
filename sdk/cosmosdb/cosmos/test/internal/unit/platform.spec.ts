// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../../../src/common/constants.js";
import { getUserAgent } from "../../../src/common/platform.js";
import { describe, it, assert } from "vitest";
import packageJson from "../../../package.json" with { type: "json" };
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { PipelineResponse } from "@azure/core-rest-pipeline";
import { CosmosClient, EncryptionKeyResolverName } from "../../../src/index.js";
import type {
  ClientEncryptionOptions,
  CosmosClientOptions,
  EncryptionKeyResolver,
} from "../../../src/index.js";

const packageVersion = packageJson["version"];
const constantVersion = Constants.SDKVersion;
const encryptionUserAgent = "cse";
const keyEncryptionKeyResolver: EncryptionKeyResolver = {
  encryptionKeyResolverName: EncryptionKeyResolverName.AzureKeyVault,
  async wrapKey(_id, _algorithm, key) {
    return key;
  },
  async unwrapKey(_id, _algorithm, wrappedKey) {
    return wrappedKey;
  },
};

describe("getUserAgent", () => {
  it("should contain the current SDK version", () => {
    assert(getUserAgent().includes(packageVersion));
  });

  it("should contain the current node version", () => {
    assert(getUserAgent().includes(process.version.replace("v", "")));
  });

  it("should allow a custom suffix", () => {
    const suffix = "myApp";
    const options: CosmosClientOptions = {
      userAgentSuffix: suffix,
    };
    assert(getUserAgent(options).includes(suffix));
  });

  it("should leave non-encryption user agents unchanged", () => {
    const userAgent = getUserAgent();
    assert.notInclude(userAgent.split(" "), encryptionUserAgent);
    assert.equal(
      getUserAgent({ userAgentSuffix: "myApp/1" }, "myFramework/2"),
      `${userAgent} myFramework/2 myApp/1`,
    );
  });

  it.each([
    { keyEncryptionKeyResolver },
    { keyEncryptionKeyResolver, encryptionKeyTimeToLiveInSeconds: 3600 },
  ] satisfies ClientEncryptionOptions[])(
    "should identify encryption-configured clients with options %j",
    (clientEncryptionOptions) => {
      const options: CosmosClientOptions = { clientEncryptionOptions };
      assert.equal(getUserAgent(options), `${getUserAgent()} ${encryptionUserAgent}`);
    },
  );

  it("should preserve the host framework and custom suffix for encryption clients", () => {
    const options: CosmosClientOptions = {
      clientEncryptionOptions: { keyEncryptionKeyResolver },
      userAgentSuffix: "myApp/1 customIntegration/2",
    };
    assert.equal(
      getUserAgent(options, "myFramework/3"),
      `${getUserAgent()} ${encryptionUserAgent} myFramework/3 myApp/1 customIntegration/2`,
    );
  });

  it("should not accumulate encryption markers or mutate the custom suffix", () => {
    const options: CosmosClientOptions = {
      clientEncryptionOptions: { keyEncryptionKeyResolver },
      userAgentSuffix: "myApp/1",
    };
    const firstUserAgent = getUserAgent(options, "myFramework/2");
    assert.equal(getUserAgent(options, "myFramework/2"), firstUserAgent);
    assert.equal(
      getUserAgent(options, "myFramework/3"),
      `${getUserAgent()} ${encryptionUserAgent} myFramework/3 myApp/1`,
    );
    assert.equal(options.userAgentSuffix, "myApp/1");
  });

  it("should set and preserve both encryption user-agent headers", async () => {
    const options: CosmosClientOptions = {
      endpoint: "https://localhost:8081",
      key: Buffer.alloc(64).toString("base64"),
      connectionPolicy: { enableEndpointDiscovery: false },
      userAgentSuffix: "myApp/1",
      clientEncryptionOptions: { keyEncryptionKeyResolver },
    };
    const client = new CosmosClient(options);
    try {
      const expectedUserAgent = `${getUserAgent()} ${encryptionUserAgent} myApp/1`;
      assert.equal(options.defaultHeaders[Constants.HttpHeaders.UserAgent], expectedUserAgent);
      assert.equal(
        options.defaultHeaders[Constants.HttpHeaders.CustomUserAgent],
        expectedUserAgent,
      );
      for (const hostFramework of ["myFramework/2", "myFramework/3"]) {
        await client.updateHostFramework(hostFramework);
        const updatedUserAgent = `${getUserAgent()} ${encryptionUserAgent} ${hostFramework} myApp/1`;
        assert.equal(options.defaultHeaders[Constants.HttpHeaders.UserAgent], updatedUserAgent);
        assert.equal(
          options.defaultHeaders[Constants.HttpHeaders.CustomUserAgent],
          updatedUserAgent,
        );
      }
      assert.equal(options.userAgentSuffix, "myApp/1");
    } finally {
      client.dispose();
    }
  });

  it.each([true, false])(
    "should send the expected user-agent and encryption headers when encryption is %s",
    async (encryptionEnabled) => {
      let requestCount = 0;
      const baseUserAgent = encryptionEnabled
        ? `${getUserAgent()} ${encryptionUserAgent}`
        : getUserAgent();
      let expectedUserAgent = `${baseUserAgent} myApp/1`;
      const options: CosmosClientOptions = {
        endpoint: "https://localhost:8081",
        key: Buffer.alloc(64).toString("base64"),
        connectionPolicy: { enableEndpointDiscovery: false },
        userAgentSuffix: "myApp/1",
        clientEncryptionOptions: encryptionEnabled ? { keyEncryptionKeyResolver } : undefined,
        httpClient: {
          async sendRequest(request): Promise<PipelineResponse> {
            requestCount++;
            assert.equal(request.headers.get(Constants.HttpHeaders.UserAgent), expectedUserAgent);
            assert.equal(
              request.headers.get(Constants.HttpHeaders.CustomUserAgent),
              expectedUserAgent,
            );
            assert.equal(
              request.headers.get(Constants.HttpHeaders.IsClientEncryptedHeader),
              encryptionEnabled ? "true" : undefined,
            );
            return {
              request,
              status: 200,
              headers: createHttpHeaders(),
              bodyAsText: JSON.stringify({ id: "unit-account" }),
            };
          },
        },
      };
      const client = new CosmosClient(options);
      try {
        await client.getDatabaseAccount();
        for (const hostFramework of ["myFramework/2", "myFramework/3"]) {
          await client.updateHostFramework(hostFramework);
          expectedUserAgent = `${baseUserAgent} ${hostFramework} myApp/1`;
          await client.getDatabaseAccount();
        }
        assert.equal(requestCount, 3);
        assert.equal(options.userAgentSuffix, "myApp/1");
      } finally {
        client.dispose();
      }
    },
  );
});

describe("Version", () => {
  it("should have matching constant version & package version", () => {
    assert.equal(
      constantVersion,
      packageVersion,
      "Package.json and Constants.SDKVersion don't match",
    );
  });
});
