// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationTracingOptions, TracingClient, TracingSpanOptions } from "./interfaces.js";

/**
 * Type guard to check if a value has tracing options.
 */
function hasTracingOptions(value: unknown): value is { tracingOptions: OperationTracingOptions } {
  return (
    typeof value === "object" &&
    value !== null &&
    "tracingOptions" in value &&
    (value as any).tracingOptions !== undefined
  );
}

/**
 * Options for the @traced decorator.
 */
export interface TracedDecoratorOptions {
  /**
   * Custom span name. If not provided, defaults to `${className}.${methodName}`.
   */
  spanName?: string;
  /**
   * Additional span options to pass to the tracing client.
   */
  spanOptions?: TracingSpanOptions;
  /**
   * The index of the parameter that contains the operation options.
   * Defaults to the last parameter.
   */
  optionsIndex?: number;
}

/**
 * A method decorator that automatically wraps a method with tracing using withSpan.
 *
 * This decorator uses TypeScript 5.0+ decorator syntax and requires the `experimentalDecorators`
 * compiler option to be disabled (or omitted).
 *
 * The decorated class must have a `tracingClient` property of type {@link TracingClient}.
 *
 * @example
 * ```ts
 * class MyClient {
 *   private tracingClient: TracingClient;
 *
 *   constructor(tracingClient: TracingClient) {
 *     this.tracingClient = tracingClient;
 *   }
 *
 *   // Using the traced decorator
 *   async myOperation(name: string, options: MyOperationOptions = {}): Promise<MyResult> {
 *     // Method implementation
 *     // The method will automatically be wrapped with this.tracingClient.withSpan
 *     return { value: name };
 *   }
 * }
 * ```
 *
 * @param decoratorOptions - Options to configure the decorator behavior.
 * @returns A method decorator function.
 */
export function traced(
  decoratorOptions: TracedDecoratorOptions = {},
): <This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This & { tracingClient: TracingClient },
    (this: This, ...args: Args) => Return
  >,
) => (this: This, ...args: Args) => Return {
  return function decorator<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
      This & { tracingClient: TracingClient },
      (this: This, ...args: Args) => Return
    >,
  ): (this: This, ...args: Args) => Return {
    const methodName = String(context.name);

    return function replacementMethod(this: This, ...args: Args): Return {
      const tracingClient = (this as any).tracingClient as TracingClient;

      if (!tracingClient) {
        throw new Error(
          `@traced decorator requires the class to have a 'tracingClient' property of type TracingClient`,
        );
      }

      // Determine which parameter contains the options
      const optionsIndex =
        decoratorOptions.optionsIndex !== undefined
          ? decoratorOptions.optionsIndex
          : Math.max(0, args.length - 1);

      const operationOptions = args[optionsIndex];

      // If options is undefined or doesn't have tracing options, call the original method
      if (operationOptions === undefined || !hasTracingOptions(operationOptions)) {
        return target.apply(this, args);
      }

      // Determine the span name
      const className = (this as any).constructor?.name || "UnknownClass";
      const spanName = decoratorOptions.spanName || `${className}.${methodName}`;

      // Create a wrapper callback that calls the original method
      const callback = (updatedOptions: typeof operationOptions): Return => {
        // Update the args array with the updated options
        const updatedArgs = [...args] as Args;
        updatedArgs[optionsIndex] = updatedOptions;
        return target.apply(this, updatedArgs);
      };

      // Use withSpan to wrap the method execution
      const result = tracingClient.withSpan(
        spanName,
        operationOptions,
        callback,
        decoratorOptions.spanOptions,
      );

      return result as Return;
    };
  };
}

/**
 * A class decorator that marks a class as traceable.
 *
 * This is a utility decorator that can be used to document that a class uses tracing
 * and requires a tracingClient property for use with the traced decorator.
 *
 * This decorator does not modify the class behavior.
 *
 * @example
 * ```ts
 * // Using the traceable decorator
 * class MyClient {
 *   constructor(
 *     private tracingClient: TracingClient
 *   ) {}
 *
 *   // Using the traced decorator
 *   async myOperation(options: MyOptions = {}): Promise<MyResult> {
 *     return { value: "result" };
 *   }
 * }
 * ```
 */
export function traceable<T extends new (...args: any[]) => any>(
  target: T,
  _context: ClassDecoratorContext<T>,
): T {
  // This is a marker decorator that doesn't modify the class
  // It signals that the class is traceable and uses the @traced decorator
  return target;
}
