// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { parseOptions } from "../src/framework/parseOptions";
import { makeCommandInfo, subCommand, leafCommand } from "../src/framework/command";

import { updateBackend } from "../src/util/printer";

const simpleCommandInfo = makeCommandInfo("simple", "a simple command", {
  simpleArg: {
    kind: "string",
    description: "a simple argument",
    allowMultiple: false,
    default: "foo"
  }
});

interface SimpleExpectedOptionsType {
  simpleArg: string;
  help?: boolean;
  args?: string[];
}

describe("Command Framework", () => {
  before(() => {
    // Silence the logger
    updateBackend({
      error: () => {},
      warn: () => {},
      info: () => {},
      log: () => {}
    });
  });

  describe("subCommand", () => {
    it("simple dispatcher", async () => {
      const dispatcher = subCommand(
        { name: "test", description: "a sub-command dispatcher" },
        {
          sub: async () => ({
            commandInfo: { name: "sub", description: "a leaf command" },
            default: leafCommand({ name: "sub", description: "a leaf command" }, async () => true)
          }),
          fail: async () => ({
            commandInfo: { name: "fail", description: "a command that fails" },
            default: leafCommand(
              { name: "fail", description: "a command that fails" },
              async () => false
            )
          })
        }
      );

      assert.isTrue(await dispatcher("sub"));
      assert.isFalse(await dispatcher("fail"));
    });
  });

  describe("leafCommand", () => {
    it("simple leaf command with argument", async () => {
      const command = leafCommand(simpleCommandInfo, (opts: SimpleExpectedOptionsType) => {
        if (opts.simpleArg === "yes") {
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      });

      assert.isTrue(await command("--simpleArg", "yes"));
      assert.isFalse(await command("--simpleArg", "no"));
    });
  });

  describe("parseOptions", () => {
    it("simple", () => {
      const opts: SimpleExpectedOptionsType = parseOptions(
        ["--simpleArg", "test"],
        simpleCommandInfo.options
      );
      assert.equal(opts.simpleArg, "test");
    });
  });
});
