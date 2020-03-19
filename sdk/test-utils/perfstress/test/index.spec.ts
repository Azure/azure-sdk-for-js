import { PerfStressProgram, PerfStressTest, ParsedPerfStressOptions } from "../src";
import { SynchronousException, AsynchronousException } from "./exception.spec";
import { HTTPSGetTest } from "./httpClientGet.spec";

console.log(process.argv);

let tests: PerfStressTest<ParsedPerfStressOptions>[] = [
  new SynchronousException(),
  new AsynchronousException(),
  new HTTPSGetTest()
];

const perfStressProgram = new PerfStressProgram(tests);

perfStressProgram.run();