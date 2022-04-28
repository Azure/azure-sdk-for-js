// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { AuthenticationError } from "../src";
import { DefaultAuthorityHost } from "../src/constants";

/**
 * Waits for the given promise to resolve, then returns the resulted error.
 * Throws an exception if the promise doesn't reject.
 * @internal
 */
export async function getError<T = Error>(promise: Promise<any>): Promise<T> {
  try {
    const result = await promise;
    throw new Error(`Expected an error. Received: ${result}`);
  } catch (error: any) {
    return error;
  }
}

/**
 * Helps test some common expected values out of the credential responses.
 * @internal
 */
export function assertClientCredentials(
  requestUrl: string,
  requestBody: string,
  expectedTenantId: string,
  expectedClientId: string,
  expectedClientSecret?: string
): void {
  assert.ok(requestUrl.indexOf(DefaultAuthorityHost) > -1);
  assert.ok(requestUrl.indexOf(expectedTenantId) > -1);

  assert.strictEqual(
    requestBody.indexOf(`client_id=${expectedClientId}`) > -1,
    true,
    "Request body doesn't contain expected clientId"
  );

  if (expectedClientSecret) {
    assert.strictEqual(
      requestBody.indexOf(`client_secret=${expectedClientSecret}`) > -1,
      true,
      "Request body doesn't contain expected clientSecret"
    );
  }
}

/**
 * Helps test common AuthenticationErrors triggered by the Identity credentials.
 * @internal
 */
export function isExpectedError(expectedErrorName: string): (error: any) => boolean {
  return (error: Error) => {
    if (!(error.name === "AuthenticationError")) {
      assert.ifError(error);
    }
    return (error as AuthenticationError).errorResponse.error === expectedErrorName;
  };
}
