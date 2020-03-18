import { AbortSignal } from "@azure/abort-controller";
import { PerfStressOption, ParsedPerfStressOptions, parsePerfStressOption } from "./PerfStressOptions"

export abstract class PerfStressTest<TOptions extends ParsedPerfStressOptions> {    
  public optionsToParse: PerfStressOption[] = [];
  protected parsedOptions: TOptions;

  constructor() {
    this.parsedOptions = parsePerfStressOption(...this.optionsToParse) as TOptions;
  }

  // Before and after parallelism
  public globalSetup?(): void | Promise<void>;
  public globalCleanup?(): void | Promise<void>;

  public setup?(): void | Promise<void>;
  public cleanup?(): void | Promise<void>;

  public abstract run(abortSignal: AbortSignal): void | Promise<void>;
}