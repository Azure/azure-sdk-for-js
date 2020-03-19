import { PerfStressProgram } from "../src";
import { SynchronousException, AsynchronousException } from "./exception.spec";
import { HTTPSGetTest } from "./httpClientGet.spec";

const perfStressProgram = new PerfStressProgram([
  new SynchronousException(),
  new AsynchronousException(),
  new HTTPSGetTest(),
])

perfStressProgram.run();