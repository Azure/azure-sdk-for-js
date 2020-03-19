import { PerfStressProgram, PerfStressTest, ParsedPerfStressOptions } from "../src";
import { SynchronousException, AsynchronousException } from "./exception.spec";
import { HTTPSGetTest } from "./httpClientGet.spec";

// Getting test filters while avoiding options
const testQuery = process.argv.slice(
  2,
  process.argv.indexOf(process.argv.filter((arg) => arg.match(/--[a-z-]+/))[0])
);

let allTests: PerfStressTest<ParsedPerfStressOptions>[] = [
  new SynchronousException(),
  new AsynchronousException(),
  new HTTPSGetTest()
];
let selectedTests: PerfStressTest<ParsedPerfStressOptions>[] = allTests;

if (testQuery) {
  // Exact match:
  selectedTests = allTests.filter((test) => testQuery.includes(test.constructor.name));
  if (!selectedTests.length) {
    // Rough RegExp match:
    try {
      selectedTests = allTests.filter(
        (test) =>
          testQuery.filter((pattern) => test.constructor.name.match(new RegExp(pattern))).length
      );
    } catch (e) {
      console.log("You must either provide exact class names, or valid RegExps");
      throw e;
    }
  }
}

console.log("=== Starting the perfStress tests ===");
console.table([{ testQuery, selectedTests: selectedTests.map((test) => test.constructor.name) }]);

const perfStressProgram = new PerfStressProgram(selectedTests);

perfStressProgram.run();
