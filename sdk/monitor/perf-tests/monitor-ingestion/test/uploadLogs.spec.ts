import { getEnvVar, PerfOptionDictionary } from "@azure/test-utils-perf";
import { MonitorIngestionPerfTest } from "./monitorIngestionPerfTest.spec";

interface UploadLogsOptions {
  logsCount: number;
  maxConcurrency: number;
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
  };

  private dataCollectionRuleId: string;
  private logs: Record<string, unknown>[] = [];

  constructor() {
    super();

    this.dataCollectionRuleId = getEnvVar("DATA_COLLECTION_RULE_ID");

    this.logs = this.createLogObjects(this.parsedOptions.logsCount.value);
  }

  private createLogObjects(count: number): Record<string, unknown>[] {
    const logs: Record<string, unknown>[] = [];
    for (let i = 0; i < count; i++) {
      logs.push({
        time: new Date().toISOString(),
        extendedColumn: `test ${i}`,
        additionalContext: "additional logs context",
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
