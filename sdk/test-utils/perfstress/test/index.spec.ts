import { PerfStressProgram } from "../src";
import { SynchronousException, AsynchronousException } from "./exception.spec";
import { HTTPSGetTest } from "./httpClientGet.spec";

console.log("=== Starting the perfStress tests ===");

const perfStressProgram = new PerfStressProgram([
  new SynchronousException(),
  new AsynchronousException(),
  new HTTPSGetTest()
]);

perfStressProgram.run();
