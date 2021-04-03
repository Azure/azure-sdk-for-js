// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { retrieveJwtExpirationTimestamp } from "../src/util/jwt";

describe("jwt", () => {
  it("parse expiration", () => {
    // Note: The trailing "." on the end indicates an empty signature indicating that this JWT is not signed.
    const jwtValue =
      "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJlbWFpbCI6IkJvYkBjb250b3NvLmNvbSIsImdpdmVuX25hbWUiOiJCb2IiLCJpc3MiOiJodHRwOi8vRGVmYXVsdC5Jc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL0RlZmF1bHQuQXVkaWVuY2UuY29tIiwiaWF0IjoiMTYxMDgxMjI1MCIsIm5iZiI6IjE2MTA4MTI1NTAiLCJleHAiOiIxNjEwODk4NjUwIn0.";
    const expectedExpirationTimestamp = 1610898650; // 1/17/2021 3:50:50 PM UTC

    const expirationTimestamp = retrieveJwtExpirationTimestamp(jwtValue);

    assert.equal(expirationTimestamp, expectedExpirationTimestamp);
  });

  it("parse with invalid argument", () => {
    assert.throws(
      () => retrieveJwtExpirationTimestamp(undefined!),
      "Argument cannot be null or empty: 'jwt'."
    );
    assert.throws(
      () => retrieveJwtExpirationTimestamp(null!),
      "Argument cannot be null or empty: 'jwt'."
    );
    assert.throws(
      () => retrieveJwtExpirationTimestamp(""),
      "Argument cannot be null or empty: 'jwt'."
    );
  });

  it("parse with invalid JWT structure", () => {
    // JWT value with missing signature section on the end.
    const jwtValue =
      "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJlbWFpbCI6IkJvYkBjb250b3NvLmNvbSIsImdpdmVuX25hbWUiOiJCb2IiLCJpc3MiOiJodHRwOi8vRGVmYXVsdC5Jc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL0RlZmF1bHQuQXVkaWVuY2UuY29tIiwiaWF0IjoiMTYxMDgxMjI1MCIsIm5iZiI6IjE2MTA4MTI1NTAiLCJleHAiOiIxNjEwODk4NjUwIn0";

    assert.throws(() => retrieveJwtExpirationTimestamp(jwtValue), "Invalid JWT structure.");
  });

  it("parse with invalid JWT payload", () => {
    // JWT value with empty payload.
    const jwtValue = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0..";

    assert.throws(() => retrieveJwtExpirationTimestamp(jwtValue), "Invalid JWT payload.");
  });

  it("parse with missing exp field", () => {
    // JWT value with missing signature section on the end.
    const jwtValue =
      "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJlbWFpbCI6IkJvYkBjb250b3NvLmNvbSIsImdpdmVuX25hbWUiOiJCb2IiLCJpc3MiOiJodHRwOi8vRGVmYXVsdC5Jc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL0RlZmF1bHQuQXVkaWVuY2UuY29tIiwiaWF0IjoiMTYxMDgxMjI1MCIsIm5iZiI6IjE2MTA4MTI1NTAifQ==.";

    assert.throws(
      () => retrieveJwtExpirationTimestamp(jwtValue),
      "Invalid JWT payload structure. No expiration."
    );
  });
});
