// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context as AzureFnContext } from "@azure/functions";
import {
  context,
  propagation,
  ROOT_CONTEXT,
  Context as OpenTelemetryContext,
} from "@opentelemetry/api";
import { Logger } from "../shared/logging";

export class AzureFunctionsHook {
  private _functionsCoreModule: any;
  private _preInvocationHook: any;

  constructor() {
    try {
      // TODO: Add types files when publicly available
      this._functionsCoreModule = require("@azure/functions-core");
      this._addPreInvocationHook();
    } catch (error) {
      Logger.getInstance().debug(
        "@azure/functions-core failed to load, not running in Azure Functions"
      );
    }
  }

  public shutdown() {
    if (this._preInvocationHook) {
      this._preInvocationHook.dispose();
      this._preInvocationHook = undefined;
    }
    this._functionsCoreModule = undefined;
  }

  private _addPreInvocationHook() {
    if (!this._preInvocationHook) {
      this._preInvocationHook = this._functionsCoreModule.registerHook(
        "preInvocation",
        async (preInvocationContext: any) => {
          const ctx: AzureFnContext = <AzureFnContext>preInvocationContext.invocationContext;
          // Update context to use Azure Functions one
          let extractedContext: OpenTelemetryContext | any = null;
          try {
            if (ctx.traceContext) {
              extractedContext = propagation.extract(ROOT_CONTEXT, ctx.traceContext);
            }
            const currentContext = extractedContext || context.active();
            preInvocationContext.functionCallback = context.bind(
              currentContext,
              preInvocationContext.functionCallback
            );
          } catch (err) {
            Logger.getInstance().error("Failed to propagate context in Azure Functions", err);
          }
        }
      );
    }
  }
}
