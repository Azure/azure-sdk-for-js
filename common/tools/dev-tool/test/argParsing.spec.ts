// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { spawn } from "child_process";
import { StrictAllowMultiple } from "../src/framework/command";
import { CommandOptions } from "../src/framework/CommandInfo";
import { parseOptions } from "../src/framework/parseOptions";
import { silenceLogger } from "./util";

const ARG_SCRIPT = "process.stdout.write(JSON.stringify(process.argv.slice(1)))";

// Normally this is handled by makeCommandInfo. This is _only_ for the sake of making an ergonomic type assertion
// below.
const strict = <Opts extends CommandOptions>(options: Opts): StrictAllowMultiple<Opts> =>
  options as StrictAllowMultiple<Opts>;

/**
 * Uses the platform shell to split a string as arguments.
 *
 * @param args - a string to split using the shell's argument parser
 * @returns an array of strings containing the split arguments
 */
function shellSplit(args: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const command = `node -e "${ARG_SCRIPT}" -- ${args}`;
    const child = spawn(command, {
      shell: true,
    });

    let output = "";

    child.stdout.on("data", (data: Buffer) => {
      output += data.toString();
    });

    child.on("exit", (code) => {
      if (code !== 0) reject("exited " + code);

      const result = JSON.parse(output);

      if (!Array.isArray(result) || result.some((value) => typeof value !== "string")) {
        reject("malformed command output: " + output);
      }

      resolve(result);
    });
  });
}

describe("argument parsing", async function () {
  before(silenceLogger);

  it("simple option", async () => {
    const parsed = parseOptions(
      await shellSplit('--test="hello world"'),
      strict({
        test: {
          kind: "string",
          description: "",
        },
      })
    );

    // Assert type
    const test: string | undefined = parsed.test;

    assert.equal(test, "hello world");
  });

  // Option parsing should end at the first unrecognized option
  it("positional args", async function () {
    const parsed = parseOptions(
      await shellSplit("--test unknown --after=10"),
      strict({
        test: {
          kind: "boolean",
          description: "",
          default: false,
        },
      })
    );

    // Assert type
    const test: boolean = parsed.test;

    assert.isTrue(test);
    assert.deepStrictEqual(parsed.args, ["unknown", "--after=10"]);
  });

  it("extra args", async function () {
    const parsed = parseOptions(
      await shellSplit('--test unknown --after=10 -- "these are" extra args "--whatever"'),
      strict({
        test: {
          description: "",
          kind: "boolean",
        },
      })
    );

    assert.isTrue(parsed.test);
    assert.deepStrictEqual(parsed.args, ["unknown", "--after=10"]);
    assert.deepStrictEqual(parsed["--"], ["these are", "extra", "args", "--whatever"]);
  });

  it("type checking", async function () {
    const opts = await shellSplit('--test="foo" --test="bar"');

    // This should throw because multiple entries are not allowed.
    assert.throws(() => {
      parseOptions(opts, {
        test: {
          kind: "string",
          allowMultiple: false,
          description: "",
        },
      });
    });
  });
});
