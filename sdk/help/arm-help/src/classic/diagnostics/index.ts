// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpContext } from "../../api/helpContext.js";
import { DiagnosticResource } from "../../models/models.js";
import {
  DiagnosticsCreateOptionalParams,
  DiagnosticsGetOptionalParams,
} from "../../api/diagnostics/options.js";
import { create, get } from "../../api/diagnostics/operations.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Diagnostics operations. */
export interface DiagnosticsOperations {
  /** Creates a diagnostic for the specific resource using solutionId from discovery solutions. <br/>Diagnostics are powerful solutions that access product resources or other relevant data and provide the root cause of the issue and the steps to address the issue.<br/><br/> */
  create: (
    scope: string,
    diagnosticsResourceName: string,
    options?: DiagnosticsCreateOptionalParams,
  ) => PollerLike<OperationState<DiagnosticResource>, DiagnosticResource>;
  /** Get the diagnostics using the 'diagnosticsResourceName' you chose while creating the diagnostic. */
  get: (
    scope: string,
    diagnosticsResourceName: string,
    options?: DiagnosticsGetOptionalParams,
  ) => Promise<DiagnosticResource>;
}

function _getDiagnostics(context: HelpContext) {
  return {
    create: (
      scope: string,
      diagnosticsResourceName: string,
      options?: DiagnosticsCreateOptionalParams,
    ) => create(context, scope, diagnosticsResourceName, options),
    get: (scope: string, diagnosticsResourceName: string, options?: DiagnosticsGetOptionalParams) =>
      get(context, scope, diagnosticsResourceName, options),
  };
}

export function _getDiagnosticsOperations(context: HelpContext): DiagnosticsOperations {
  return {
    ..._getDiagnostics(context),
  };
}
