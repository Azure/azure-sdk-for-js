// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to run generate custom metrics that will be sent to Azure Monitor
 *
 * Works in both CommonJS and ESM environments.
 */

export class CustomMetricExample {
  static async run(): Promise<void> {
    // Import dependencies using dynamic imports for universal compatibility
    const { useAzureMonitor } = await import("@azure/monitor-opentelemetry");
    const { metrics } = await import("@opentelemetry/api");
    const express = (await import("express")).default;

    const options: any = {
      azureMonitorExporterOptions: {
        connectionString:
          process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
      },
    };

    useAzureMonitor(options);

    const app = express();
    const PORT = 8080;

    async function metricExport(): Promise<void> {
      const meter = metrics.getMeter("testMeter");
      const customCounter = meter.createCounter("TestCounter");
      await customCounter.add(1);
      await customCounter.add(2);
      await customCounter.add(3);
    }

    async function setupRoutes(): Promise<void> {
      await app.get("/", async (_req: any, res: any) => {
        await metricExport().then(() => {
          res.send("Metrics sent to Azure Monitor");
        });
      });
    }

    await setupRoutes();
    app.listen(PORT);
    console.log(`Listening on http://localhost:${PORT}`);
    console.log(
      "Custom metrics example is running. Visit http://localhost:8080 to trigger metrics.",
    );
  }
}
