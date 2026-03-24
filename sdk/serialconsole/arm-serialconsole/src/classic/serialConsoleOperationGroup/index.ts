// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSerialConsoleContext } from "../../api/microsoftSerialConsoleContext.js";
import { enableConsole, disableConsole } from "../../api/serialConsoleOperationGroup/operations.js";
import type {
  SerialConsoleOperationGroupEnableConsoleOptionalParams,
  SerialConsoleOperationGroupDisableConsoleOptionalParams,
} from "../../api/serialConsoleOperationGroup/options.js";
import type { DisableSerialConsoleResult, EnableSerialConsoleResult } from "../../models/models.js";

/** Interface representing a SerialConsoleOperationGroup operations. */
export interface SerialConsoleOperationGroupOperations {
  /** Enables the Serial Console service for all VMs and VM scale sets in the provided subscription */
  enableConsole: (
    defaultParam: string,
    options?: SerialConsoleOperationGroupEnableConsoleOptionalParams,
  ) => Promise<EnableSerialConsoleResult>;
  /** Disables the Serial Console service for all VMs and VM scale sets in the provided subscription */
  disableConsole: (
    defaultParam: string,
    options?: SerialConsoleOperationGroupDisableConsoleOptionalParams,
  ) => Promise<DisableSerialConsoleResult>;
}

function _getSerialConsoleOperationGroup(context: MicrosoftSerialConsoleContext) {
  return {
    enableConsole: (
      defaultParam: string,
      options?: SerialConsoleOperationGroupEnableConsoleOptionalParams,
    ) => enableConsole(context, defaultParam, options),
    disableConsole: (
      defaultParam: string,
      options?: SerialConsoleOperationGroupDisableConsoleOptionalParams,
    ) => disableConsole(context, defaultParam, options),
  };
}

export function _getSerialConsoleOperationGroupOperations(
  context: MicrosoftSerialConsoleContext,
): SerialConsoleOperationGroupOperations {
  return {
    ..._getSerialConsoleOperationGroup(context),
  };
}
