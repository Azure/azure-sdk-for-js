import { PerfStressTest, ParsedPerfStressOptions } from "../src";

export class SynchronousException extends PerfStressTest<ParsedPerfStressOptions> {
  run() {
    try {
      throw new Error();
    } catch(e) {
    }
  }
}

export class AsynchronousException extends PerfStressTest<ParsedPerfStressOptions> {
  async run() {
    try {
      throw new Error();
    } catch(e) {
    }
  }
}