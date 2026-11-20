// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import { context, diag } from "@opentelemetry/api";
import type { ExportResult } from "@opentelemetry/core";
import { ExportResultCode, suppressTracing } from "@opentelemetry/core";
import type { AzureMonitorExporterOptions } from "../../config.js";
import { ENV_MULTI_ENDPOINT_AAD_AUDIENCE } from "../../Declarations/Constants.js";
import type { RoutingGroups, TelemetryRoute } from "../../utils/routing.js";
import { HttpSender } from "./httpSender.js";
import { getStorageDirectory } from "./persist/fileSystemPersist.js";

const MAX_CACHED_ROUTES = 64;
const RETRY_POLL_INTERVAL_MS = 60_000;
const SHUTDOWN_TIMEOUT_MS = 30_000;

/** @internal */
export class RoutingSender {
  private readonly senders = new Map<string, HttpSender>();
  private readonly operations = new Set<Promise<ExportResult>>();
  private readonly abortController = new AbortController();
  private overflowReady: Promise<void> = Promise.resolve();
  private retryWorker: NodeJS.Timeout | undefined;
  private isShutdown = false;
  private shutdownPromise: Promise<void> | undefined;
  private readonly options: AzureMonitorExporterOptions;
  private readonly storageRoot: string;
  private readonly aadScope?: string;

  constructor(
    options: AzureMonitorExporterOptions,
    private readonly instrumentationKey: string,
  ) {
    if (options.pipeline || options.additionalPolicies?.length) {
      throw new Error(
        "Custom pipelines and additional policies are not supported with multi-endpoint routing. Use httpClient and retryOptions instead.",
      );
    }
    // Routed clients are created lazily. Do not retain a caller-owned list of policies.
    this.options = { ...options, additionalPolicies: undefined };
    const audience = process.env[ENV_MULTI_ENDPOINT_AAD_AUDIENCE]?.trim();
    if (audience) {
      this.aadScope = audience.endsWith("/.default") ? audience : `${audience}/.default`;
    }
    this.storageRoot = `${getStorageDirectory(instrumentationKey, options.storageDirectory)}-routes`;
  }

  export(groups: RoutingGroups): Promise<ExportResult> {
    if (this.isShutdown) {
      return Promise.resolve({
        code: ExportResultCode.FAILED,
        error: new Error("Sender is shut down"),
      });
    }
    const operation = this.sendGroups(groups);
    this.operations.add(operation);
    void operation.then(
      () => this.operations.delete(operation),
      () => this.operations.delete(operation),
    );
    return operation;
  }

  private async sendGroups(groups: RoutingGroups): Promise<ExportResult> {
    const results = await Promise.all(
      [...groups].map(async ([key, { route, envelopes }]): Promise<ExportResult> => {
        let sender: HttpSender | undefined;
        let temporary = false;
        let releaseOverflow: (() => void) | undefined;
        if (!this.senders.has(key) && this.senders.size >= MAX_CACHED_ROUTES) {
          const previous = this.overflowReady;
          this.overflowReady = new Promise((resolve) => {
            releaseOverflow = resolve;
          });
          await previous;
        }
        try {
          if (this.abortController.signal.aborted) {
            throw new Error("Routed export cancelled because the shutdown deadline elapsed.");
          }
          sender = this.senders.get(key);
          if (!sender) {
            temporary = this.senders.size >= MAX_CACHED_ROUTES;
            sender = this.createSender(key, route, temporary);
            if (!temporary) {
              this.senders.set(key, sender);
              if (!this.retryWorker && sender.hasOfflineStorage) {
                const retry = (): void => {
                  void context.with(suppressTracing(context.active()), async () => {
                    try {
                      await Promise.all(
                        [...this.senders.values()].map((item) => item.retryPersistedEnvelopes()),
                      );
                    } catch (error) {
                      diag.warn("Failed to retry routed telemetry:", error);
                    }
                  });
                };
                this.retryWorker = setTimeout(
                  () => {
                    this.retryWorker = setInterval(retry, RETRY_POLL_INTERVAL_MS);
                    this.retryWorker.unref();
                    retry();
                  },
                  Math.floor(Math.random() * RETRY_POLL_INTERVAL_MS),
                );
                this.retryWorker.unref();
              }
            }
          }
          return await sender.exportEnvelopes(envelopes);
        } catch (error) {
          diag.error("Failed to export routed telemetry:", error);
          return {
            code: ExportResultCode.FAILED,
            error: error instanceof Error ? error : new Error(String(error)),
          };
        } finally {
          try {
            if (temporary) {
              await sender?.shutdown();
            }
          } finally {
            releaseOverflow?.();
          }
        }
      }),
    );
    return (
      results.find((result) => result.code === ExportResultCode.FAILED) ?? {
        code: ExportResultCode.SUCCESS,
      }
    );
  }

  private createSender(key: string, route: TelemetryRoute, temporary: boolean): HttpSender {
    if (route.isAad && !this.options.credential) {
      throw new Error("An AAD route requires an exporter credential.");
    }
    if (temporary) {
      diag.warn(
        "The 64-route cache limit has been reached. This destination has no offline storage.",
      );
    }
    return new HttpSender({
      endpointUrl: route.endpoint.replace(/\/$/, ""),
      instrumentationKey: this.instrumentationKey,
      trackStatsbeat: false,
      isRouted: true,
      routingAbortSignal: this.abortController.signal,
      disableKeepAlive: temporary,
      storagePartition: {
        root: this.storageRoot,
        name: createHash("sha256").update(key).digest("hex"),
      },
      exporterOptions: {
        ...this.options,
        host: route.endpoint.replace(/\/$/, ""),
        endpoint: undefined,
        credential: route.isAad ? this.options.credential : undefined,
        disableOfflineStorage: temporary || this.options.disableOfflineStorage,
      },
      aadAudience: route.isAad ? this.aadScope : undefined,
    });
  }

  shutdown(): Promise<void> {
    this.shutdownPromise ??= this.shutdownCore();
    return this.shutdownPromise;
  }

  private async shutdownCore(): Promise<void> {
    this.isShutdown = true;
    clearTimeout(this.retryWorker);
    const timeout = setTimeout(() => {
      diag.warn("Cancelling routed requests because the shutdown deadline elapsed.");
      this.abortController.abort();
    }, SHUTDOWN_TIMEOUT_MS);
    timeout.unref();
    try {
      await Promise.allSettled([...this.operations]);
      await Promise.all([...this.senders.values()].map((sender) => sender.shutdown()));
    } finally {
      clearTimeout(timeout);
      this.senders.clear();
    }
  }
}
