// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { wrapProcessErrorHandler } from "../../src/receivers/shared";
import chai from "chai";
const assert = chai.assert;

describe("shared", () => {
  it("error handler wrapper", () => {
    const loggedMessages: string[] = [];

    const wrappedProcessError = wrapProcessErrorHandler(
      {
        processError: () => {
          throw new Error("Whoops!");
        }
      },
      (msg) => {
        loggedMessages.push(msg);
      }
    );

    wrappedProcessError(
      new Error(
        "Doesn't matter, testing internal behavior when the user's process error handler throws"
      )
    );

    assert.deepEqual(loggedMessages, [
      `An error was thrown from the user's processError handler: Error: Whoops!`
    ]);
  });
});
