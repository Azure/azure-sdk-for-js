// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import { dirname } from "node:path";
import { context, diag } from "@opentelemetry/api";
import type { ExportResult } from "@opentelemetry/core";
import { ExportResultCode, suppressTracing } from "@opentelemetry/core";
import type { AzureMonitorExporterOptions } from "../../config.js";
import { ENV_MULTI_ENDPOINT_AAD_AUDIENCE } from "../../Declarations/Constants.js";
import type { RoutingGroups, TelemetryRoute } from "../../utils/routing.js";
import { failedRoutedExport, routingDiagnostic } from "../../utils/routingDiagnostics.js";
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
      const count = Array.from(groups.values()).reduce(
        (sum, group) => sum + group.envelopes.length,
        0,
      );
      return Promise.resolve(failedRoutedExport("SENDER_SHUTDOWN", count));
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
            return failedRoutedExport("SENDER_SHUTDOWN", envelopes.length);
          }
          sender = this.senders.get(key);
          if (!sender) {
            if (route.isAad && !this.options.credential) {
              return failedRoutedExport("MISSING_CREDENTIAL", envelopes.length);
            }
            temporary = this.senders.size >= MAX_CACHED_ROUTES;
            if (temporary) {
              diag.warn(routingDiagnostic("ROUTE_CACHE_LIMIT", envelopes.length));
            }
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
                    } catch {
                      diag.warn(routingDiagnostic("STORAGE_READ_FAILED"));
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
        } catch {
          return failedRoutedExport("EXPORT_FAILED", envelopes.length);
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
    return new HttpSender({
      endpointUrl: route.endpoint.replace(/\/$/, ""),
      instrumentationKey: this.instrumentationKey,
      trackStatsbeat: false,
      isRouted: true,
      routingAbortSignal: this.abortController.signal,
      disableKeepAlive: temporary,
      storagePartition: {
        exporterRoot: dirname(this.storageRoot),
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
