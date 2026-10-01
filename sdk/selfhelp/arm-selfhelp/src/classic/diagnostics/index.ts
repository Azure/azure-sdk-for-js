// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRPContext } from "../../api/helpRPContext.js";
import { create, get } from "../../api/diagnostics/operations.js";
import {
  DiagnosticsCreateOptionalParams,
  DiagnosticsGetOptionalParams,
} from "../../api/diagnostics/options.js";
import { DiagnosticResource } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Diagnostics operations. */
export interface DiagnosticsOperations {
  /** Creates a diagnostic for the specific resource using solutionId from discovery solutions. <br/>Diagnostics are powerful solutions that access product resources or other relevant data and provide the root cause of the issue and the steps to address the issue.<br/><br/> */
  create: (
    scope: string,
    diagnosticsResourceName: string,
    options?: DiagnosticsCreateOptionalParams,
  ) => PollerLike<OperationState<DiagnosticResource>, DiagnosticResource>;
  /** @deprecated use create instead */
  beginCreate: (
    scope: string,
    diagnosticsResourceName: string,
    options?: DiagnosticsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DiagnosticResource>, DiagnosticResource>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    scope: string,
    diagnosticsResourceName: string,
    options?: DiagnosticsCreateOptionalParams,
  ) => Promise<DiagnosticResource>;
  /** Get the diagnostics using the 'diagnosticsResourceName' you chose while creating the diagnostic. */
  get: (
    scope: string,
    diagnosticsResourceName: string,
    options?: DiagnosticsGetOptionalParams,
  ) => Promise<DiagnosticResource>;
}

function _getDiagnostics(context: HelpRPContext) {
  return {
    create: (
      scope: string,
      diagnosticsResourceName: string,
      options?: DiagnosticsCreateOptionalParams,
    ) => create(context, scope, diagnosticsResourceName, options),
    beginCreate: async (
      scope: string,
      diagnosticsResourceName: string,
      options?: DiagnosticsCreateOptionalParams,
    ) => {
      const poller = create(context, scope, diagnosticsResourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      scope: string,
      diagnosticsResourceName: string,
      options?: DiagnosticsCreateOptionalParams,
    ) => {
      return await create(context, scope, diagnosticsResourceName, options);
    },
    get: (scope: string, diagnosticsResourceName: string, options?: DiagnosticsGetOptionalParams) =>
      get(context, scope, diagnosticsResourceName, options),
  };
}

export function _getDiagnosticsOperations(context: HelpRPContext): DiagnosticsOperations {
  return {
    ..._getDiagnostics(context),
  };
}
