// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import type { ClientCredential } from "@typespec/ts-http-runtime";
import {
  isApiKeyCredential,
  isBasicCredential,
  isBearerTokenCredential,
  isOAuth2TokenCredential,
} from "$internal/auth/credentials.js";

const fakeApiKeyCredential: ClientCredential = {
  key: "fakeKey",
};
const fakeBasicCredential: ClientCredential = {
  username: "fakeUsername",
  password: "fakePassword",
};
const fakeBearerTokenCredential: ClientCredential = {
  getBearerToken: async () => "fakeBearerToken",
};
const fakeOAuth2TokenCredential: ClientCredential = {
  getOAuth2Token: async (_flows: [{ kind: "implicit"; authorizationUrl: "example.com" }]) =>
    "fakeOAuth2Token",
};

describe("isApiKeyCredential", function () {
  it("should return true for an object that resembles a KeyCredential", () => {
    assert.isTrue(isApiKeyCredential(fakeApiKeyCredential));
  });

  it("should return false for other type of credential", () => {
    assert.isFalse(isApiKeyCredential(fakeBasicCredential));
    assert.isFalse(isApiKeyCredential(fakeBearerTokenCredential));
    assert.isFalse(isApiKeyCredential(fakeOAuth2TokenCredential));
  });
});

describe("isBasicCredential", function () {
  it("should return true for valid basic credentials", () => {
    assert.isTrue(isBasicCredential(fakeBasicCredential));
  });

  it("should return false for other type of credential", () => {
    assert.isFalse(isBasicCredential(fakeApiKeyCredential));
    assert.isFalse(isBasicCredential(fakeBearerTokenCredential));
    assert.isFalse(isBasicCredential(fakeOAuth2TokenCredential));
  });
});

describe("isBearerTokenCredential", function () {
  it("should return true for valid bearer token credential", () => {
    assert.isTrue(isBearerTokenCredential(fakeBearerTokenCredential));
  });

  it("should return false for other type of credential", () => {
    assert.isFalse(isBearerTokenCredential(fakeApiKeyCredential));
    assert.isFalse(isBearerTokenCredential(fakeBasicCredential));
    assert.isFalse(isBearerTokenCredential(fakeOAuth2TokenCredential));
  });
});

describe("isOAuth2TokenCredential", function () {
  it("should return true for valid OAuth2 token credential", () => {
    assert.isTrue(isOAuth2TokenCredential(fakeOAuth2TokenCredential));
  });

  it("should return false for other type of credential", () => {
    assert.isFalse(isOAuth2TokenCredential(fakeApiKeyCredential));
    assert.isFalse(isOAuth2TokenCredential(fakeBasicCredential));
    assert.isFalse(isOAuth2TokenCredential(fakeBearerTokenCredential));
  });
});
