// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// eslint-disable-next-line import/no-extraneous-dependencies
import { Context as AzureFnV3Context } from "@azure/functions-old";
// eslint-disable-next-line import/no-extraneous-dependencies
import { InvocationContext as AzureFnV4Context } from "@azure/functions";
import { context, propagation, Context as OpenTelemetryContext } from "@opentelemetry/api";
import { Logger } from "../shared/logging";

type AzureFnContext = AzureFnV3Context & AzureFnV4Context;

type FunctionCallback = (context: unknown, ...inputs: unknown[]) => unknown;

/**
 * Context on a function that is about to be executed
 * This object will be passed to all pre invocation hooks
 */
export interface PreInvocationContext {
  /**
   * The context object passed to the function
   * This object is readonly. You may modify it, but attempting to overwrite it will throw an error
   */
  readonly invocationContext: unknown;

  /**
   * The input values for this specific invocation. Changes to this array _will_ affect the inputs passed to your function
   */
  inputs: any[];

  /**
   * The function callback for this specific invocation. Changes to this value _will_ affect the function itself
   */
  functionCallback: FunctionCallback;
}

export class AzureFunctionsHook {
  private _functionsCoreModule: any;
  private _preInvocationHook: any;

  constructor() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      this._functionsCoreModule = require("@azure/functions-core");
      this._addPreInvocationHook();
    } catch (error) {
      Logger.getInstance().debug(
        "@azure/functions-core failed to load, not running in Azure Functions",
      );
    }
  }

  public shutdown(): void {
    if (this._preInvocationHook) {
      this._preInvocationHook.dispose();
      this._preInvocationHook = undefined;
    }
    this._functionsCoreModule = undefined;
  }

  private _addPreInvocationHook(): void {
    if (!this._preInvocationHook) {
      this._preInvocationHook = this._functionsCoreModule.registerHook(
        "preInvocation",
        // eslint-disable-next-line @typescript-eslint/require-await
        async (preInvocationContext: PreInvocationContext) => {
          const sharedContext = <AzureFnContext>preInvocationContext.invocationContext;
          const traceContext = sharedContext.traceContext;
          // Update context to use Azure Functions one
          // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
          let extractedContext: OpenTelemetryContext | any = null;
          try {
            if (traceContext) {
              extractedContext = propagation.extract(context.active(), {
                traceparent: traceContext.traceparent || traceContext.traceParent,
                tracestate: traceContext.tracestate || traceContext.traceState,
              });
            }
            const currentContext = extractedContext || context.active();
            preInvocationContext.functionCallback = context.bind(
              currentContext,
              preInvocationContext.functionCallback,
            );
          } catch (err) {
            Logger.getInstance().error("Failed to propagate context in Azure Functions", err);
          }
        },
      );
    }
  }
}
