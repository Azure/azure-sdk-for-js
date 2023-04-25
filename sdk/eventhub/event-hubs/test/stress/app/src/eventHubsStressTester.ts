import {
  EventHubClientOptions,
  EventHubConsumerClient,
  EventHubConsumerClientOptions,
  EventHubProducerClient,
} from "@azure/event-hubs";
import util from "util";
import {
  SnapshotOptions
} from "./utils";
import * as appInsights from "applicationinsights";
import * as dotenv from "dotenv";
import { AbortSignalLike } from "@azure/abort-controller";

dotenv.config({ path: process.env.ENV_FILE || ".env" });

appInsights.setup().setAutoCollectConsole(true).setUseDiskRetryCaching(true).start();

export const defaultClientAppInsights = appInsights.defaultClient;

export interface StressTestInitOptions {
  /**
   * Additional custom properties to add to the 'start' event reported to Monitor.
   */
  additionalEventProperties?: Record<string, string | number | boolean>;
  eventHubName: string
}

export function captureConsoleOutputToAppInsights() {
  const debug = require("debug");

  debug.log = (...args: any[]) => {
    // for some reason the appinsights console.log hook doesn't seem to be firing for me (or at least
    // it's inconsistent). For now I'll just add a hook in here and send the events myself.
    defaultClientAppInsights.trackTrace({
      message: util.format(...args),
    });
  };
}

export class EventHubsStressTester {
  public eventsSentCount = 0;
  public eventsReceivedCount = 0;
  private snapshotTimer: NodeJS.Timer;
  private startedAt!: Date;
  public _numErrors = 0;
  public eventProperties: Record<string, string | boolean | number> = {};

  constructor(private snapshotOptions: SnapshotOptions) {
    const snapshotIntervalMs = !this.snapshotOptions.snapshotIntervalInMs
      ? 5000
      : this.snapshotOptions.snapshotIntervalInMs;

    this.startedAt = new Date();
    this.snapshotTimer = setInterval(this.snapshot.bind(this), snapshotIntervalMs);
  }

  public async init(options?: StressTestInitOptions) {
    defaultClientAppInsights.commonProperties = {
      // these will be reported with each event
      testName: this.snapshotOptions.testName,
    };

    defaultClientAppInsights.trackEvent({
      name: "start",
      properties: {
        ...options?.additionalEventProperties,
        eventHubsName: options?.eventHubName,
      },
    });
  }

  public async snapshot(): Promise<void> {
    const elapsedTimeInSeconds = (new Date().valueOf() - this.startedAt.valueOf()) / 1000;

    this.eventProperties["elapsedTimeInSeconds"] = elapsedTimeInSeconds;
    this.eventProperties["events.sent"] = this.eventsSentCount;
    this.eventProperties["events.received"] = this.eventsReceivedCount;
    this.eventProperties["errorCount"] = this._numErrors;
    const { arrayBuffers, rss, heapUsed } = process.memoryUsage()
    this.eventProperties["memory.arrayBuffers"] = arrayBuffers;
    this.eventProperties["memory.rss"] = rss;
    this.eventProperties["memory.heapUsed"] = heapUsed;
    this._numErrors = 0;

    defaultClientAppInsights.trackEvent({
      name: "summary",
      properties: this.eventProperties
    });
    defaultClientAppInsights.flush();

    if (this.snapshotOptions.writeSnapshotInfoToConsole) {
      console.log(JSON.stringify(this.eventProperties, undefined, 2));
    }
  }

  public async endTest() {
    console.log(`[BEGIN]: ending test...`);
    await this.snapshot();
    clearInterval(this.snapshotTimer);
    // TODO: Log tracked messages in JSON
    console.log(`[END]: ending test...`);
  }
}

export function createEventHubsConsumerClient(options?: EventHubConsumerClientOptions): EventHubConsumerClient {
  const consumerGroup = process.env.EVENTHUBS_CONSUMER_GROUP || "$Default";
  const connectionString = process.env.EVENTHUBS_CONNECTION_STRING;
  const hubName = process.env.EVENTHUB_NAME;
  if (!connectionString || !consumerGroup || !hubName) {
    throw new Error("EVENTHUBS_CONNECTION_STRING, EVENTHUB_NAME and EVENTHUBS_CONSUMER_GROUP have to be populated in the environment and are not!");
  }
  console.log(consumerGroup, connectionString, hubName)
  return new EventHubConsumerClient(consumerGroup, connectionString, hubName, options);
}

export function createEventHubsProducerClient(options?: EventHubClientOptions): EventHubProducerClient {
  const eventHubName = process.env.EVENTHUB_NAME;
  const connectionString = process.env.EVENTHUBS_CONNECTION_STRING;

  if (!connectionString || !eventHubName) {
    throw new Error("EVENTHUBS_CONNECTION_STRING and EVENTHUB_NAME have to be populated in the environment and are not!");
  }

  return new EventHubProducerClient(connectionString, eventHubName, options);
}

/**
 * Loops infinitely with a delay between invocations.
 */
export async function loopForever(
  fn: () => Promise<void>,
  delay: number,
  abortSignal?: AbortSignalLike
) {
  const timeout = () => new Promise((resolve) => setTimeout(() => resolve(true), delay));

  while (abortSignal?.aborted === false && (await timeout())) {
    await fn();
  }
}
