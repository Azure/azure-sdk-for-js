// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to redact URL query strings from telemetry to protect sensitive information.
 */

import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import "dotenv/config";

/**
 * Custom span processor that removes query strings from HTTP span attributes.
 */
class RedactQueryStringProcessor {
  forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  onStart(): void {
    // No action needed on span start
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }

  onEnd(span: { attributes: Record<string, unknown> }): void {
    const httpAttributes = ["http.route", "http.url", "http.target"];

    for (const attr of httpAttributes) {
      const value = span.attributes[attr];
      if (typeof value === "string") {
        const queryIndex = value.indexOf("?");
        if (queryIndex !== -1) {
          span.attributes[attr] = value.substring(0, queryIndex);
        }
      }
    }
  }
}

async function main(): Promise<void> {
  const options = {
    azureMonitorExporterOptions: {
      connectionString:
        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
    },
    spanProcessors: [new RedactQueryStringProcessor()],
  };

  useAzureMonitor(options);

  console.log("Azure Monitor configured with query string redaction:");
  console.log("  Query strings will be removed from HTTP telemetry attributes");
  console.log("  Protects sensitive information (SAS tokens, API keys, etc.)");
}

main().catch(console.error);
