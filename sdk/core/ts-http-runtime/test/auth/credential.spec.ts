// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import type { AuthCredential } from "../../src/auth/credentials.js";
import {
  isApiKeyCredential,
  isBasicCredential,
  isBearerTokenCredential,
  isOAuth2TokenCredential,
} from "../../src/auth/credentials.js";
import type { OAuth2FlowType } from "../../src/index.js";

const fakeApiKeyCredential: AuthCredential = {
  key: "fakeKey",
};
const fakeBasicCredential: AuthCredential = {
  username: "fakeUsername",
  password: "fakePassword",
};
const fakeBearerTokenCredential: AuthCredential = {
  getBearerToken: async () => "fakeBearerToken",
};
const fakeOAuth2TokenCredential: AuthCredential = {
  getOAuth2Token: async (
    _flows: [{ type: OAuth2FlowType.Implicit; authorizationUrl: "example.com" }],
  ) => "fakeOAuth2Token",
};

describe("isApiKeyCredential", function () {
  it("should return true for an object that resembles a KeyCredential", () => {
    assert.ok(isApiKeyCredential(fakeApiKeyCredential));
  });

  it("should return false for other type of credential", () => {
    assert.ok(!isApiKeyCredential(fakeBasicCredential));
    assert.ok(!isApiKeyCredential(fakeBearerTokenCredential));
    assert.ok(!isApiKeyCredential(fakeOAuth2TokenCredential));
  });
});

describe("isBasicCredential", function () {
  it("should return true for valid basic credentials", () => {
    assert.ok(isBasicCredential(fakeBasicCredential));
  });

  it("should return false for other type of credential", () => {
    assert.ok(!isBasicCredential(fakeApiKeyCredential));
    assert.ok(!isBasicCredential(fakeBearerTokenCredential));
    assert.ok(!isBasicCredential(fakeOAuth2TokenCredential));
  });
});

describe("isBearerTokenCredential", function () {
  it("should return true for valid bearer token credential", () => {
    assert.ok(isBearerTokenCredential(fakeBearerTokenCredential));
  });

  it("should return false for other type of credential", () => {
    assert.ok(!isBearerTokenCredential(fakeApiKeyCredential));
    assert.ok(!isBearerTokenCredential(fakeBasicCredential));
    assert.ok(!isBearerTokenCredential(fakeOAuth2TokenCredential));
  });
});

describe("isOAuth2TokenCredential", function () {
  it("should return true for valid OAuth2 token credential", () => {
    assert.ok(isOAuth2TokenCredential(fakeOAuth2TokenCredential));
  });

  it("should return false for other type of credential", () => {
    assert.ok(!isOAuth2TokenCredential(fakeApiKeyCredential));
    assert.ok(!isOAuth2TokenCredential(fakeBasicCredential));
    assert.ok(!isOAuth2TokenCredential(fakeBearerTokenCredential));
  });
});
