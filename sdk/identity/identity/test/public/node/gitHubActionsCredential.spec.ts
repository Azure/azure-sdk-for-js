// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GitHubActionsCredential } from "@azure/identity";
import { describe, it, assert, afterEach, vi } from "vitest";

describe("GitHubActionsCredential", function () {
  afterEach(function () {
    vi.unstubAllEnvs();
  });

  it("throws CredentialUnavailableError when AZURE_TENANT_ID is missing", function () {
    vi.stubEnv("AZURE_TENANT_ID", "");
    vi.stubEnv("AZURE_CLIENT_ID", "test-client-id");
    vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_URL", "https://example.com");
    vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_TOKEN", "test-token");

    assert.throws(
      () => new GitHubActionsCredential(),
      /GitHubActionsCredential: is unavailable. Set the AZURE_TENANT_ID/,
    );
  });

  it("throws CredentialUnavailableError when AZURE_CLIENT_ID is missing", function () {
    vi.stubEnv("AZURE_TENANT_ID", "test-tenant-id");
    vi.stubEnv("AZURE_CLIENT_ID", "");
    vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_URL", "https://example.com");
    vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_TOKEN", "test-token");

    assert.throws(
      () => new GitHubActionsCredential(),
      /GitHubActionsCredential: is unavailable. Set the AZURE_CLIENT_ID/,
    );
  });

  it("throws CredentialUnavailableError when ACTIONS_ID_TOKEN_REQUEST_URL is missing", function () {
    vi.stubEnv("AZURE_TENANT_ID", "test-tenant-id");
    vi.stubEnv("AZURE_CLIENT_ID", "test-client-id");
    vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_URL", "");
    vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_TOKEN", "test-token");

    assert.throws(
      () => new GitHubActionsCredential(),
      /GitHubActionsCredential: is unavailable.*ACTIONS_ID_TOKEN_REQUEST_URL/,
    );
  });

  it("throws CredentialUnavailableError when ACTIONS_ID_TOKEN_REQUEST_TOKEN is missing", function () {
    vi.stubEnv("AZURE_TENANT_ID", "test-tenant-id");
    vi.stubEnv("AZURE_CLIENT_ID", "test-client-id");
    vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_URL", "https://example.com");
    vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_TOKEN", "");

    assert.throws(
      () => new GitHubActionsCredential(),
      /GitHubActionsCredential: is unavailable.*ACTIONS_ID_TOKEN_REQUEST_TOKEN/,
    );
  });

  it("constructs successfully when all environment variables are set", function () {
    vi.stubEnv("AZURE_TENANT_ID", "test-tenant-id");
    vi.stubEnv("AZURE_CLIENT_ID", "test-client-id");
    vi.stubEnv(
      "ACTIONS_ID_TOKEN_REQUEST_URL",
      "https://token.actions.githubusercontent.com/request?foo=bar",
    );
    vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_TOKEN", "test-request-token");

    const credential = new GitHubActionsCredential();
    assert.isDefined(credential);
  });

  it("reports both missing GitHub env vars", function () {
    vi.stubEnv("AZURE_TENANT_ID", "test-tenant-id");
    vi.stubEnv("AZURE_CLIENT_ID", "test-client-id");
    vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_URL", "");
    vi.stubEnv("ACTIONS_ID_TOKEN_REQUEST_TOKEN", "");

    assert.throws(
      () => new GitHubActionsCredential(),
      /ACTIONS_ID_TOKEN_REQUEST_URL.*ACTIONS_ID_TOKEN_REQUEST_TOKEN/,
    );
  });
});
