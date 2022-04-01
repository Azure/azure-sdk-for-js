// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AvroError } from "../../../src";
import { assert } from "@azure/test-utils";

export async function assertAvroError<T>(
  p: Promise<T>,
  expectations: {
    innerMessage?: RegExp;
    message?: RegExp;
    schemaId?: string | boolean;
  } = {}
): Promise<void> {
  const { innerMessage, message, schemaId = false } = expectations;
  try {
    await p;
    assert.fail(`Expected promise to error, but resolved successfully`);
  } catch (e) {
    assert.instanceOf(e, AvroError);
    const error = e as AvroError;
    if (message) {
      assert.match(error.message, message);
    }
    if (innerMessage) {
      assert.isDefined(error.innerError, "innerError is not found");
      const innerError = error.innerError as Error;
      assert.match(innerError.message, innerMessage);
    }
    if (typeof schemaId === "string") {
      assert.equal(error.schemaId, schemaId);
    } else if (schemaId) {
      assert.isDefined(error.schemaId);
    } else {
      assert.isUndefined(error.schemaId);
    }
  }
}
