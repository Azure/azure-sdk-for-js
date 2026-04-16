// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PerfOptionDictionary } from "@azure-tools/test-perf";
import { PerfTest, getEnvVar } from "@azure-tools/test-perf";
import type { SendCloudEventInput } from "@azure/eventgrid";
import { EventGridPublisherClient, AzureKeyCredential } from "@azure/eventgrid";

interface SendCloudEventsPerfTestOptions {
  "event-count": number;
}

export class SendCloudEventsTest extends PerfTest<SendCloudEventsPerfTestOptions> {
  options: PerfOptionDictionary<SendCloudEventsPerfTestOptions> = {
    "event-count": {
      required: true,
      description: "Number of events to send in a single request",
      shortName: "n",
      longName: "events-count",
      defaultValue: 10,
    },
  };
  client: EventGridPublisherClient<"CloudEvent">;
  events: SendCloudEventInput<string>[] = [];

  constructor() {
    super();

    const eventCount = this.parsedOptions["event-count"]?.value ?? 10;
    for (let i = 0; i < eventCount; i++) {
      this.events.push({
        source: "sdk/eventgrid/eventgrid-perf-tests",
        type: "cloud-event-test-event",
        data: `${i}`,
      });
    }

    const endpoint = getEnvVar("EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT");
    const key = getEnvVar("EVENT_GRID_CLOUD_EVENT_SCHEMA_API_KEY");

    this.client = new EventGridPublisherClient(endpoint, "CloudEvent", new AzureKeyCredential(key));
  }

  async run(): Promise<void> {
    await this.client.send(this.events);
  }
}
