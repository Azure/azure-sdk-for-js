// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, PerfStressTest, ParsedPerfStressOptions } from "../src";
import { SynchronousException, AsynchronousException } from "./exception.spec";
import { HTTPSGetTest } from "./httpClientGet.spec";
import { Delay500ms } from "./delay.spec";

console.log("=== Starting the perfStress tests ===");

const testName = process.argv[2];

const allTests: PerfStressTest<ParsedPerfStressOptions>[] = [
  new SynchronousException(),
  new AsynchronousException(),
  new HTTPSGetTest(),
  new Delay500ms()
];

// TODO: Move this into a tool provided by PerfStress.
const allTestsNames: string[] = allTests.map((test) => test.constructor.name);
const testIndex = allTestsNames.indexOf(testName);
if (testIndex === -1) {
  throw new Error(
    `Couldn't find a test named ${testName}. Try with any of the following: ${allTestsNames.join(
      ", "
    )}`
  );
}

const perfStressProgram = new PerfStressProgram(allTests[testIndex]);

perfStressProgram.run();
