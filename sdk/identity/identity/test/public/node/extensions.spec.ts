// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DeviceCodeCredential } from "../../../src/index.js";
import { VisualStudioCodeCredential } from "../../../src/index.js";
import { describe, it, assert, chai } from "vitest";

/**
 * A helper to assert that a Promise rejects.
 */
async function assertRejects(p: Promise<unknown>, regexp: RegExp): Promise<void> {
  try {
    await p;
  } catch (e: any) {
    if (!regexp.test(e.message)) {
      throw new chai.AssertionError(
        `The input did not match the regular expression ${regexp}. Input:\n\n'${e.message}'`,
      );
    }
    return;
  }
  throw new chai.AssertionError("Expected the function body to throw.");
}

describe("Plugin API", function () {
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
      /No implementation of `VisualStudioCodeCredential`.*@azure\/identity-vscode/,
    );
  });
});
