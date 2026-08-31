// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { regenerateKey, get } from "../../api/agentRegistrationInformation/operations.js";
import type {
  AgentRegistrationInformationRegenerateKeyOptionalParams,
  AgentRegistrationInformationGetOptionalParams,
} from "../../api/agentRegistrationInformation/options.js";
import type {
  AgentRegistration,
  AgentRegistrationRegenerateKeyParameter,
} from "../../models/models.js";

/** Interface representing a AgentRegistrationInformation operations. */
export interface AgentRegistrationInformationOperations {
  /** Regenerate a primary or secondary agent registration key */
  regenerateKey: (
    resourceGroupName: string,
    automationAccountName: string,
    parameters: AgentRegistrationRegenerateKeyParameter,
    options?: AgentRegistrationInformationRegenerateKeyOptionalParams,
  ) => Promise<AgentRegistration>;
  /** Retrieve the automation agent registration information. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: AgentRegistrationInformationGetOptionalParams,
  ) => Promise<AgentRegistration>;
}

function _getAgentRegistrationInformation(context: AutomationContext) {
  return {
    regenerateKey: (
      resourceGroupName: string,
      automationAccountName: string,
      parameters: AgentRegistrationRegenerateKeyParameter,
      options?: AgentRegistrationInformationRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, automationAccountName, parameters, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: AgentRegistrationInformationGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, options),
  };
}

export function _getAgentRegistrationInformationOperations(
  context: AutomationContext,
): AgentRegistrationInformationOperations {
  return {
    ..._getAgentRegistrationInformation(context),
  };
}
