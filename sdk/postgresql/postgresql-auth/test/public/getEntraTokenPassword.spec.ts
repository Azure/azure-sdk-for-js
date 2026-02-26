// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { getEntraTokenPassword } from "@azure/postgresql-auth";
import {
  createValidJwtToken,
  TestTokenCredential,
  FailingTokenCredential,
  NullTokenCredential,
  TEST_USERS,
} from "./utils/testUtils.js";

describe("getEntraTokenPassword", () => {
  it("should return the access token string from the credential", async () => {
    const expectedToken = createValidJwtToken(TEST_USERS.ENTRA_USER);
    const credential = new TestTokenCredential(expectedToken);

    const result = await getEntraTokenPassword(credential);

    expect(result).toBe(expectedToken);
  });

  it("should pass the correct default scope to the credential", async () => {
    let capturedScope: string | string[] | undefined;
    const token = createValidJwtToken(TEST_USERS.ENTRA_USER);
    const credential = new TestTokenCredential(token);
    const originalGetToken = credential.getToken.bind(credential);
    credential.getToken = async (scopes, options) => {
      capturedScope = scopes;
      return originalGetToken(scopes, options);
    };

    await getEntraTokenPassword(credential);

    expect(capturedScope).toBe("https://ossrdbms-aad.database.windows.net/.default");
  });

  it("should pass a custom scope to the credential when provided", async () => {
    let capturedScope: string | string[] | undefined;
    const token = createValidJwtToken(TEST_USERS.ENTRA_USER);
    const credential = new TestTokenCredential(token);
    const originalGetToken = credential.getToken.bind(credential);
    credential.getToken = async (scopes, options) => {
      capturedScope = scopes;
      return originalGetToken(scopes, options);
    };

    const customScope = "https://custom-scope/.default";
    await getEntraTokenPassword(credential, customScope);

    expect(capturedScope).toBe(customScope);
  });

  it("should throw when credential is not provided", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect(getEntraTokenPassword(null as any)).rejects.toThrow("credential is required");
  });

  it("should throw when token acquisition fails", async () => {
    const credential = new FailingTokenCredential("Simulated auth failure");

    await expect(getEntraTokenPassword(credential)).rejects.toThrow("Simulated auth failure");
  });

  it("should throw when credential returns null token", async () => {
    const credential = new NullTokenCredential();

    await expect(getEntraTokenPassword(credential)).rejects.toThrow(
      "Failed to acquire Entra ID token",
    );
  });

  it("should invoke the credential each time it is called", async () => {
    const token = createValidJwtToken(TEST_USERS.ENTRA_USER);
    const credential = new TestTokenCredential(token);

    await getEntraTokenPassword(credential);
    expect(credential.getCallCount()).toBe(1);

    await getEntraTokenPassword(credential);
    expect(credential.getCallCount()).toBe(2);

    await getEntraTokenPassword(credential);
    expect(credential.getCallCount()).toBe(3);
  });
});
