import { PerfStressTest, ParsedPerfStressOptions, PerfStressTestError } from "../src";

export class SynchronousException extends PerfStressTest<ParsedPerfStressOptions> {
  run() {
    try {
      throw new PerfStressTestError();
    } catch(e) {
    }
  }
}

export class AsynchronousException extends PerfStressTest<ParsedPerfStressOptions> {
  async run() {
    try {
      throw new PerfStressTestError();
    } catch(e) {
    }
  }
}