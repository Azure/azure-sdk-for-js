// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { parseOptions } from "../src/framework/parseOptions";
import { makeCommandInfo, subCommand, leafCommand } from "../src/framework/command";

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

describe("Command Framework", async () => {
  describe("subCommand", async () => {
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

  describe("leafCommand", async () => {});

  describe("parseOptions", async () => {
    it("simple", async () => {
      const opts: SimpleExpectedOptionsType = parseOptions(
        ["--simpleArg", "test"],
        simpleCommandInfo.options
      );
      assert.equal(opts.simpleArg, "test");
    });
  });
});
