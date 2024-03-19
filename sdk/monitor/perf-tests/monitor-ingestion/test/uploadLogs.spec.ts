import { getEnvVar, PerfOptionDictionary } from "@azure-tools/test-perf";
import { MonitorIngestionPerfTest } from "./monitorIngestionPerfTest.spec";

interface UploadLogsOptions {
  logsCount: number;
  maxConcurrency: number;
  logLength: number;
  randomLogValue: boolean;
}

function getRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123457890";
  let str = "";

  for (let i = 0; i < length; ++i) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }

  return str;
}

function getRepeatingString(length: number): string {
  return Array(length).fill("a").join("");
}

export class UploadLogsTest extends MonitorIngestionPerfTest<UploadLogsOptions> {
  public options: PerfOptionDictionary<UploadLogsOptions> = {
    logsCount: {
      defaultValue: 100,
      description: "The number of logs to upload",
      shortName: "lc",
    },
    maxConcurrency: {
      defaultValue: 1,
      description: "The maximum number of concurrent requests",
      shortName: "mc",
    },
    logLength: {
      defaultValue: 20,
      description: "Length of the log value string",
    },
    randomLogValue: {
      defaultValue: false,
      description:
        "Set to true to make each log's value a randomly-generated alphanumeric string for a lower compression ratio. Set to false to make the log value repeat the same character to ensure a high compression ratio.",
    },
  };

  private dataCollectionRuleId: string;
  private logs: Record<string, unknown>[] = [];

  constructor() {
    super();
    this.dataCollectionRuleId = getEnvVar("DATA_COLLECTION_RULE_ID");
  }

  setup(): void {
    this.logs = this.createLogObjects(this.parsedOptions.logsCount.value);
  }

  private createLogObjects(count: number): Record<string, unknown>[] {
    const logs: Record<string, unknown>[] = [];
    for (let i = 0; i < count; i++) {
      logs.push({
        time: new Date().toISOString(),
        extendedColumn: `test ${i}`,
        additionalContext: (this.parsedOptions.randomLogValue.value
          ? getRandomString
          : getRepeatingString)(this.parsedOptions.logLength.value),
      });
    }
    return logs;
  }

  async run(): Promise<void> {
    await this.client.upload(this.dataCollectionRuleId, "Custom-MyTableRawData", this.logs, {
      maxConcurrency: this.parsedOptions.maxConcurrency.value,
    });
  }
}
