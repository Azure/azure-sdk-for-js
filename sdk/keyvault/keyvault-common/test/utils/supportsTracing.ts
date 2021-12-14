import { OperationTracingOptions } from "@azure/core-tracing";

export async function supportsTracing(
  _callback: (tracingOptions: OperationTracingOptions) => Promise<unknown>,
  _children: string[]
): Promise<void> {
  return;
}
