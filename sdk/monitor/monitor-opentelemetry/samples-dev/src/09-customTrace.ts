// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to run generate custom traces that will be sent to Azure Monitor
 *
 * Works in both CommonJS and ESM environments.
 */

export class CustomTraceExample {
  static async run(): Promise<void> {
    // Import dependencies using dynamic imports for universal compatibility
    const { context, trace } = await import("@opentelemetry/api");
    const { useAzureMonitor, shutdownAzureMonitor } = await import("@azure/monitor-opentelemetry");

    const options: any = {
      azureMonitorExporterOptions: {
        connectionString:
          process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
      },
    };

    useAzureMonitor(options);

    console.log("Custom Trace Example");
    console.log("Generating custom traces and spans...");

    try {
      await CustomTraceExample.generateTraces(trace, context);
      console.log("Custom traces generated successfully");
      console.log("Check Azure Application Insights to see the traces");

      // Wait a bit for traces to be sent
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Error generating custom traces:", error);
      throw error;
    } finally {
      await shutdownAzureMonitor();
    }
  }

  private static async generateTraces(trace: any, context: any): Promise<void> {
    // Get Tracer and create Span
    const tracer = trace.getTracer("testTracer");
    // Create a span. A span must be closed.
    const parentSpan = tracer.startSpan("main");

    try {
      for (let i = 0; i < 10; i += 1) {
        CustomTraceExample.doWork(parentSpan, trace, context);
      }
    } finally {
      // Be sure to end the current span.
      parentSpan.end();
    }
  }

  private static doWork(parent: any, trace: any, context: any): void {
    // Start another span. In this example, the main method already started a
    // span, so that'll be the parent span, and this will be a child span.
    const ctx = trace.setSpan(context.active(), parent);
    const span = trace.getTracer("testTracer").startSpan("doWork", undefined, ctx);

    try {
      // simulate some random work.
      for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
        // empty
      }

      // Set attributes to the span.
      span.setAttribute("key", "value");

      // Annotate our span to capture metadata about our operation
      span.addEvent("invoking doWork");
    } finally {
      span.end();
    }
  }
}
