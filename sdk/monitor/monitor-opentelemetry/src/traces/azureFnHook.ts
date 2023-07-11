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
      // Only v3 of Azure Functions library is supported right now. See matrix of versions here:
      // https://github.com/Azure/azure-functions-nodejs-library
      const funcProgModel = this._functionsCoreModule.getProgrammingModel();
      if (funcProgModel.name === "@azure/functions" && funcProgModel.version.startsWith("3.")) {
        this._addPreInvocationHook();
      } else {
        Logger.getInstance().debug(
          `AzureFunctionsHook does not support model "${funcProgModel.name}" version "${funcProgModel.version}"`
        );
      }
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
