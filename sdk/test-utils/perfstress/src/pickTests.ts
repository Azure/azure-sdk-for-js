import { PerfStressTest } from "./perfStressTest";
import { ParsedPerfStressOptions } from "./perfStressOptions";

export function pickTests(tests: PerfStressTest<ParsedPerfStressOptions>[], query: string[]) {
  // Exact match:
  let selectedTests = tests.filter((test) => query.includes(test.constructor.name));
  if (!selectedTests.length) {
    // Rough RegExp match:
    try {
      selectedTests = tests.filter(
        (test) => query.filter((pattern) => test.constructor.name.match(new RegExp(pattern))).length
      );
    } catch (e) {
      throw new Error("You must either provide exact class names, or valid RegExps");
    }
  }
  return selectedTests;
}
