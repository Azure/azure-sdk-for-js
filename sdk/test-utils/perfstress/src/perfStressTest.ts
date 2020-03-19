import { AbortSignalLike } from "@azure/abort-controller";
import {
  PerfStressOption,
  ParsedPerfStressOptions,
  parsePerfStressOption,
  defaultPerfStressOptions,
  printOptions
} from "./perfStressOptions";

export abstract class PerfStressTest<TOptions extends ParsedPerfStressOptions> {
  public optionsToParse: PerfStressOption[] = defaultPerfStressOptions;
  public parsedOptions: TOptions = {} as TOptions;

  constructor() {}

  public parseOptions() {
    try {
      this.parsedOptions = parsePerfStressOption(this.optionsToParse) as TOptions;
    } catch (e) {
      console.log(e.message);
      printOptions(this.optionsToParse, "defaultOptions");
      throw e;
    }
  }

  // Before and after running a bunch of the same test.
  public globalSetup?(): void | Promise<void>;
  public globalCleanup?(): void | Promise<void>;

  public setup?(): void | Promise<void>;
  public cleanup?(): void | Promise<void>;

  public abstract run(abortSignal?: AbortSignalLike): void | Promise<void>;
}
