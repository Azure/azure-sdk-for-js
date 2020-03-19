import { AbortSignalLike } from "@azure/abort-controller";
import { PerfStressOption, ParsedPerfStressOptions, parsePerfStressOption } from "./PerfStressOptions"

export abstract class PerfStressTest<TOptions extends ParsedPerfStressOptions> {    
  public optionsToParse: PerfStressOption[] = [];
  public parsedOptions?: TOptions;

  constructor() {
  }

  public parseOptions() {
    this.parsedOptions = parsePerfStressOption(...this.optionsToParse) as TOptions;
  }

  // Before and after running a bunch of the same test.
  public globalSetup?(): void | Promise<void>;
  public globalCleanup?(): void | Promise<void>;

  public setup?(): void | Promise<void>;
  public cleanup?(): void | Promise<void>;

  public abstract run(abortSignal?: AbortSignalLike): void | Promise<void>;
}