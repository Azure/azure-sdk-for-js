// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import { validate, regenerateAccessKey } from "../../api/workflows/operations.js";
import type {
  WorkflowsValidateOptionalParams,
  WorkflowsRegenerateAccessKeyOptionalParams,
} from "../../api/workflows/options.js";
import type { RegenerateActionParameter, Workflow } from "../../models/models.js";

/** Interface representing a Workflows operations. */
export interface WorkflowsOperations {
  /** Validates the workflow definition. */
  validate: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    validateParameter: Workflow,
    options?: WorkflowsValidateOptionalParams,
  ) => Promise<void>;
  /** Regenerates the callback URL access key for request triggers. */
  regenerateAccessKey: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    keyType: RegenerateActionParameter,
    options?: WorkflowsRegenerateAccessKeyOptionalParams,
  ) => Promise<void>;
}

function _getWorkflows(context: WebSiteManagementContext) {
  return {
    validate: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      validateParameter: Workflow,
      options?: WorkflowsValidateOptionalParams,
    ) => validate(context, resourceGroupName, name, workflowName, validateParameter, options),
    regenerateAccessKey: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      keyType: RegenerateActionParameter,
      options?: WorkflowsRegenerateAccessKeyOptionalParams,
    ) => regenerateAccessKey(context, resourceGroupName, name, workflowName, keyType, options),
  };
}

export function _getWorkflowsOperations(context: WebSiteManagementContext): WorkflowsOperations {
  return {
    ..._getWorkflows(context),
  };
}
