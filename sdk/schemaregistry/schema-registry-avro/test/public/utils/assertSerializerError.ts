// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AvroSerializerError } from "../../../src";
import { assert } from "@azure/test-utils";

export async function assertSerializationError<T>(
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
    assert.instanceOf(e, AvroSerializerError);
    const error = e as AvroSerializerError;
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
