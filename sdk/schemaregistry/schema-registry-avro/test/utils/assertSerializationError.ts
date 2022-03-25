// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { AvroSerializationError } from "../../src/models";

export async function assertSerializationError<T>(
  p: Promise<T>,
  expectations: {
    innerMessage?: RegExp;
    message?: RegExp;
  } = {}
): Promise<void> {
  const { innerMessage, message } = expectations;
  try {
    await p;
    assert.fail(`Expected promise to error, but resolved successfully`);
  } catch (e) {
    assert.instanceOf(e, AvroSerializationError);
    const error = e as AvroSerializationError;
    if (message) {
      assert.match(error.message, message);
    }
    if (innerMessage) {
      assert.isDefined(error.innerError, "innerError is not found");
      const innerError = error.innerError as Error;
      assert.match(innerError.message, innerMessage);
    }
  }
}
