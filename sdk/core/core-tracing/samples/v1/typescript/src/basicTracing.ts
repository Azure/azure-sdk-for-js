// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Uses `@azure/core-tracing` APIs to instrument method calls for a fake Azure client library.
 */

import { createTracingClient, OperationTracingOptions, TracingClient } from "@azure/core-tracing";

/**
 * Represents common operation options
 */
interface OperationOptions {
  tracingOptions?: OperationTracingOptions;
}

/**
 * Represents an Azure Client that does work against an Azure service.
 */
class BasicClient {
  private tracingClient: TracingClient;

  constructor() {
    // Create a tracing client in the constructor
    this.tracingClient = createTracingClient({
      // The package name and version of your package.
      packageName: "@azure/some-example-package",
      packageVersion: "1.0.0",
      // The Resource Provider, which should normally be one of the values defined here:
      // https://docs.microsoft.com/azure/azure-resource-manager/management/azure-services-resource-providers
      namespace: "Microsoft.Sample",
    });
  }

  /**
   * Represents the most common scenario - calling an azure service, mapping the result,
   * and returning the result.
   *
   * Creating the span, setting its status, recording exceptions, and ensuring the span
   * is closed will be handled by the tracing client.
   *
   * @param options - The operation options.
   */
  async basicOperation(options: OperationOptions = {}): Promise<number> {
    return this.tracingClient.withSpan(
      "BasicClient.basicOperation",
      options,
      async (_updatedOptions, _span) => {
        // The `updatedOptions` argument will be returned, containing a new tracing context.
        // Call the generated client, passing updatedOptions, and handle the response as you
        // normally would.
        //
        // You do not need to close the span.
        const result = await Promise.resolve({ value: 42 });
        return result.value;
      }
    );
  }

  /**
   * Represents a consumer which receives a message, creates a new span for processing the message, and links
   * the new span to the message span (via traceheader propagation).
   * @param traceparentHeader The {@link https://www.w3.org/TR/trace-context/#traceparent-header} header of the remote operation.
   * @param options - The Operation Options.
   */
  async withSpanLinks(traceparentHeader: string, options: OperationOptions = {}): Promise<void> {
    const spanLinks = [];
    const linkContext = this.tracingClient.parseTraceparentHeader(traceparentHeader);
    if (linkContext) {
      spanLinks.push({ tracingContext: linkContext });
    }
    // You can pass additional span options to configure the newly created span.
    // In this case, we'll create a "consumer" span with a link to the remote span.
    return this.tracingClient.withSpan("BasicClient.withSpanLinks", options, () => {}, {
      spanLinks,
      spanKind: "consumer",
    });
  }

  /**
   * Represents a scenario where a user provided callback is invoked. In this case, when leaving
   * the boundaries of the Azure SDK, you **MUST** either use `withSpan` or `withContext` when
   * a new span does not need to be created to ensure the active context is set for the duration
   * of the callback.
   * @param callback - The customer registered callback.
   * @param options - The operation options.
   */
  async withUserCallback<Callback extends (...args: unknown[]) => ReturnType<Callback>>(
    callback: Callback,
    options: OperationOptions = {}
  ): Promise<ReturnType<Callback>> {
    const { span, updatedOptions } = this.tracingClient.startSpan(
      "BasicClient.withUserCallback",
      options
    );
    const result = this.tracingClient.withContext(
      updatedOptions.tracingOptions!.tracingContext!,
      callback
    );
    span.setStatus({ status: "success" });
    span.end();
    return result;
  }
}

export async function main(): Promise<void> {
  const client = new BasicClient();
  await client.basicOperation();
  // Using the example https://www.w3.org/TR/trace-context/#examples-of-http-traceparent-headers
  await client.withSpanLinks("00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01");
  await client.withUserCallback(() => {
    // no-op
  });
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
