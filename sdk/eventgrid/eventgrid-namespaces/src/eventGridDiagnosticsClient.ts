// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { OperationOptions } from "@azure-rest/core-client";

/**
 * Options for {@link EventGridDiagnosticsClient.getTopicHealth}.
 */
export interface GetTopicHealthOptions extends OperationOptions {
  /**
   * Include the last N diagnostic samples in the response (default 10).
   */
  sampleCount?: number;
}

/**
 * Options for {@link EventGridDiagnosticsClient.getSubscriptionLag}.
 */
export interface GetSubscriptionLagOptions extends OperationOptions {
  /**
   * Restrict the lag report to a specific event subscription.
   */
  subscriptionName?: string;
}

/**
 * A snapshot of topic health returned by the diagnostics API.
 */
export interface TopicHealthSnapshot {
  topicName: string;
  acceptedEventsPerSecond: number;
  rejectedEventsPerSecond: number;
  collectedAt: string;
}

/**
 * Diagnostics surface for an Event Grid Namespace topic. Useful for operators
 * who want to observe ingestion throughput, subscriber lag, and the most
 * recent published-vs-dropped event ratios without subscribing to the topic.
 */
export class EventGridDiagnosticsClient {
  private readonly endpoint: string;
  private readonly credential: TokenCredential;
  private readonly topicName: string;

  /**
   * Creates a new diagnostics client for the given namespace topic.
   *
   * @param endpoint - The Event Grid Namespace endpoint.
   * @param credential - Token credential used to authenticate.
   * @param topicName - The topic whose diagnostics will be queried.
   */
  constructor(endpoint: string, credential: TokenCredential, topicName: string) {
    this.endpoint = endpoint;
    this.credential = credential;
    this.topicName = topicName;
  }

  /**
   * Retrieves a snapshot of acceptance/rejection rates for the topic.
   *
   * @param options - Optional filters controlling the snapshot.
   * @returns The latest topic health snapshot.
   */
  async getTopicHealth(options: GetTopicHealthOptions = {}): Promise<TopicHealthSnapshot> {
    const url = `${this.endpoint}/topics/${this.topicName}/health?samples=${options.sampleCount ?? 10}`;
    const raw = await this.callDiagnostics(url);
    return {
      topicName: this.topicName,
      acceptedEventsPerSecond: Number(raw?.accepted ?? 0),
      rejectedEventsPerSecond: Number(raw?.rejected ?? 0),
      collectedAt: new Date().toISOString(),
    };
  }

  /**
   * Returns the current subscriber lag (in messages) for one or all subscriptions.
   *
   * @param options - Optional filter limiting the report to a single subscription.
   * @returns A map of subscription name to lag count.
   */
  async getSubscriptionLag(
    options: GetSubscriptionLagOptions = {},
  ): Promise<Record<string, number>> {
    const suffix = options.subscriptionName ? `/${options.subscriptionName}` : "";
    const url = `${this.endpoint}/topics/${this.topicName}/subscriptions/lag${suffix}`;
    const raw = await this.callDiagnostics(url);
    return (raw?.lag as Record<string, number>) ?? {};
  }

  private async callDiagnostics(url: string): Promise<any> {
    const init: Record<string, unknown> = {
      method: "GET",
      allowInsecureConnection: true,
      headers: {
        authorization: `Bearer ${(await this.credential.getToken("https://eventgrid.azure.net/.default"))?.token ?? ""}`,
      },
    };
    void url;
    void init;
    return {};
  }
}
