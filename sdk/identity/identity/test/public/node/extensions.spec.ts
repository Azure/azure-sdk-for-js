// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, AssertionError } from "chai";
import { DeviceCodeCredential } from "../../../src";
import { VisualStudioCodeCredential } from "../../../src";

/**
 * A helper to assert that a Promise rejects.
 */
async function assertRejects(p: Promise<unknown>, regexp: RegExp): Promise<void> {
  try {
    await p;
  } catch (e: any) {
    if (!regexp.test(e.message)) {
      throw new AssertionError(
        `The input did not match the regular expression ${regexp}. Input:\n\n'${e.message}'`
      );
    }
    return;
  }
  throw new AssertionError("Expected the function body to throw.");
}

describe("Plugin API", function (this: Mocha.Suite) {
  it("Setting persistence options throws if not initialized", function () {
    assert.throws(() => {
      new DeviceCodeCredential({
        tokenCachePersistenceOptions: {
          enabled: true,
        },
      });
    }, /no persistence provider.*@azure\/identity-cache-persistence/);
  });

  it("Calling getToken on VisualStudioCodeCredential throws if not initialized", async function () {
    await assertRejects(
      new VisualStudioCodeCredential().getToken("https://graph.microsoft.com/.default"),
      /No implementation of `VisualStudioCodeCredential`.*@azure\/identity-vscode/
    );
  });
});
