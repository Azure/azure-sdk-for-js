import { AbortSignal } from "@azure/abort-controller";
import { PerfStressOption, ParsedPerfStressOptions, parsePerfStressOption } from "./PerfStressOptions"

export abstract class PerfStressTest<TOptions extends ParsedPerfStressOptions> {  
  public optionsToParse: PerfStressOption[] = [];
  protected parsedOptions: ParsedPerfStressOptions;

  constructor() {
    this.parsedOptions = parsePerfStressOption(...this.optionsToParse);
  }

  public setup?(options: TOptions): void | Promise<void>;
  public abstract run(options: TOptions, abortSignal: AbortSignal): void | Promise<void>;
  public cleanup?(): void | Promise<void>;
}