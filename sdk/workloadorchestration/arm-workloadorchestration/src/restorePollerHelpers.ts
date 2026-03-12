// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "./workloadOrchestrationManagementClient.js";
import {
  _$deleteDeserialize,
  _updateDeserialize,
  _createOrUpdateDeserialize,
} from "./api/siteReferences/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeContexts,
  _updateDeserialize as _updateDeserializeContexts,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeContexts,
} from "./api/contexts/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDiagnostics,
  _updateDeserialize as _updateDeserializeDiagnostics,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDiagnostics,
} from "./api/diagnostics/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeExecutions,
  _updateDeserialize as _updateDeserializeExecutions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeExecutions,
} from "./api/executions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeWorkflowVersions,
  _updateDeserialize as _updateDeserializeWorkflowVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeWorkflowVersions,
} from "./api/workflowVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeWorkflows,
  _updateDeserialize as _updateDeserializeWorkflows,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeWorkflows,
} from "./api/workflows/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeConfigTemplates,
  _createVersionDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeConfigTemplates,
} from "./api/configTemplates/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeInstances,
  _updateDeserialize as _updateDeserializeInstances,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeInstances,
} from "./api/instances/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSolutionTemplates,
  _removeVersionDeserialize,
  _createVersionDeserialize as _createVersionDeserializeSolutionTemplates,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSolutionTemplates,
} from "./api/solutionTemplates/operations.js";
import {
  _bulkPublishSolutionDeserialize,
  _bulkDeploySolutionDeserialize,
} from "./api/solutionTemplateVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSolutions,
  _updateDeserialize as _updateDeserializeSolutions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSolutions,
} from "./api/solutions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDynamicSchemaVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDynamicSchemaVersions,
} from "./api/dynamicSchemaVersions/operations.js";
import {
  _updateExternalValidationStatusDeserialize,
  _publishSolutionVersionDeserialize,
  _reviewSolutionVersionDeserialize,
  _resolveConfigurationDeserialize,
  _removeRevisionDeserialize,
  _uninstallSolutionDeserialize,
  _installSolutionDeserialize,
  _$deleteDeserialize as _$deleteDeserializeTargets,
  _updateDeserialize as _updateDeserializeTargets,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeTargets,
} from "./api/targets/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSolutionVersions,
  _updateDeserialize as _updateDeserializeSolutionVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSolutionVersions,
} from "./api/solutionVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSchemaVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSchemaVersions,
} from "./api/schemaVersions/operations.js";
import {
  _createVersionDeserialize as _createVersionDeserializeSchemas,
  _$deleteDeserialize as _$deleteDeserializeSchemas,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSchemas,
} from "./api/schemas/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDynamicSchemas,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDynamicSchemas,
} from "./api/dynamicSchemas/operations.js";
import { getLongRunningPoller } from "./static-helpers/pollingHelpers.js";
import { OperationOptions, PathUncheckedResponse } from "@azure-rest/core-client";
import { AbortSignalLike } from "@azure/abort-controller";
import {
  PollerLike,
  OperationState,
  deserializeState,
  ResourceLocationConfig,
} from "@azure/core-lro";

export interface RestorePollerOptions<
  TResult,
  TResponse extends PathUncheckedResponse = PathUncheckedResponse,
> extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /** Deserialization function for raw response body */
  processResponseBody?: (result: TResponse) => Promise<TResult>;
}

/**
 * Creates a poller from the serialized state of another poller. This can be
 * useful when you want to create pollers on a different host or a poller
 * needs to be constructed after the original one is not in scope.
 */
export function restorePoller<TResponse extends PathUncheckedResponse, TResult>(
  client: WorkloadOrchestrationManagementClient,
  serializedState: string,
  sourceOperation: (...args: any[]) => PollerLike<OperationState<TResult>, TResult>,
  options?: RestorePollerOptions<TResult>,
): PollerLike<OperationState<TResult>, TResult> {
  const pollerConfig = deserializeState(serializedState).config;
  const { initialRequestUrl, requestMethod, metadata } = pollerConfig;
  if (!initialRequestUrl || !requestMethod) {
    throw new Error(
      `Invalid serialized state: ${serializedState} for sourceOperation ${sourceOperation?.name}`,
    );
  }
  const resourceLocationConfig = metadata?.["resourceLocationConfig"] as
    | ResourceLocationConfig
    | undefined;
  const { deserializer, expectedStatuses = [] } =
    getDeserializationHelper(initialRequestUrl, requestMethod) ?? {};
  const deserializeHelper = options?.processResponseBody ?? deserializer;
  if (!deserializeHelper) {
    throw new Error(
      `Please ensure the operation is in this client! We can't find its deserializeHelper for ${sourceOperation?.name}.`,
    );
  }
  return getLongRunningPoller(
    (client as any)["_client"] ?? client,
    deserializeHelper as (result: TResponse) => Promise<TResult>,
    expectedStatuses,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      resourceLocationConfig,
      restoreFrom: serializedState,
      initialRequestUrl,
    },
  );
}

interface DeserializationHelper {
  deserializer: Function;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences/{siteReferenceName}":
    {
      deserializer: _$deleteDeserialize,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences/{siteReferenceName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences/{siteReferenceName}":
    {
      deserializer: _createOrUpdateDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}":
    {
      deserializer: _$deleteDeserializeContexts,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}":
    {
      deserializer: _updateDeserializeContexts,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}":
    {
      deserializer: _createOrUpdateDeserializeContexts,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/diagnostics/{diagnosticName}":
    {
      deserializer: _$deleteDeserializeDiagnostics,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/diagnostics/{diagnosticName}":
    {
      deserializer: _updateDeserializeDiagnostics,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/diagnostics/{diagnosticName}":
    {
      deserializer: _createOrUpdateDeserializeDiagnostics,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions/{executionName}":
    {
      deserializer: _$deleteDeserializeExecutions,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions/{executionName}":
    {
      deserializer: _updateDeserializeExecutions,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions/{executionName}":
    {
      deserializer: _createOrUpdateDeserializeExecutions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}":
    {
      deserializer: _$deleteDeserializeWorkflowVersions,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}":
    {
      deserializer: _updateDeserializeWorkflowVersions,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}":
    {
      deserializer: _createOrUpdateDeserializeWorkflowVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}":
    {
      deserializer: _$deleteDeserializeWorkflows,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}":
    {
      deserializer: _updateDeserializeWorkflows,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}":
    {
      deserializer: _createOrUpdateDeserializeWorkflows,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}":
    {
      deserializer: _$deleteDeserializeConfigTemplates,
      expectedStatuses: ["202", "204", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/createVersion":
    {
      deserializer: _createVersionDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}":
    {
      deserializer: _createOrUpdateDeserializeConfigTemplates,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}":
    {
      deserializer: _$deleteDeserializeInstances,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}":
    {
      deserializer: _updateDeserializeInstances,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}":
    {
      deserializer: _createOrUpdateDeserializeInstances,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}":
    {
      deserializer: _$deleteDeserializeSolutionTemplates,
      expectedStatuses: ["202", "204", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/removeVersion":
    {
      deserializer: _removeVersionDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/createVersion":
    {
      deserializer: _createVersionDeserializeSolutionTemplates,
      expectedStatuses: ["202", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}":
    {
      deserializer: _createOrUpdateDeserializeSolutionTemplates,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}/bulkPublishSolution":
    {
      deserializer: _bulkPublishSolutionDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}/bulkDeploySolution":
    {
      deserializer: _bulkDeploySolutionDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}":
    {
      deserializer: _$deleteDeserializeSolutions,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}":
    {
      deserializer: _updateDeserializeSolutions,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}":
    {
      deserializer: _createOrUpdateDeserializeSolutions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}/versions/{dynamicSchemaVersionName}":
    {
      deserializer: _$deleteDeserializeDynamicSchemaVersions,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}/versions/{dynamicSchemaVersionName}":
    {
      deserializer: _createOrUpdateDeserializeDynamicSchemaVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/updateExternalValidationStatus":
    {
      deserializer: _updateExternalValidationStatusDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/publishSolutionVersion":
    {
      deserializer: _publishSolutionVersionDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/reviewSolutionVersion":
    {
      deserializer: _reviewSolutionVersionDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/resolveConfiguration":
    {
      deserializer: _resolveConfigurationDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/removeRevision":
    {
      deserializer: _removeRevisionDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/uninstallSolution":
    {
      deserializer: _uninstallSolutionDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/installSolution":
    {
      deserializer: _installSolutionDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}":
    {
      deserializer: _$deleteDeserializeTargets,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}":
    {
      deserializer: _updateDeserializeTargets,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}":
    {
      deserializer: _createOrUpdateDeserializeTargets,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions/{solutionVersionName}":
    {
      deserializer: _$deleteDeserializeSolutionVersions,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions/{solutionVersionName}":
    {
      deserializer: _updateDeserializeSolutionVersions,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions/{solutionVersionName}":
    {
      deserializer: _createOrUpdateDeserializeSolutionVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/versions/{schemaVersionName}":
    {
      deserializer: _$deleteDeserializeSchemaVersions,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/versions/{schemaVersionName}":
    {
      deserializer: _createOrUpdateDeserializeSchemaVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/createVersion":
    {
      deserializer: _createVersionDeserializeSchemas,
      expectedStatuses: ["202", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}":
    {
      deserializer: _$deleteDeserializeSchemas,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}":
    {
      deserializer: _createOrUpdateDeserializeSchemas,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}":
    {
      deserializer: _$deleteDeserializeDynamicSchemas,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}":
    {
      deserializer: _createOrUpdateDeserializeDynamicSchemas,
      expectedStatuses: ["200", "201", "202"],
    },
};

function getDeserializationHelper(
  urlStr: string,
  method: string,
): DeserializationHelper | undefined {
  const path = new URL(urlStr).pathname;
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: DeserializationHelper | undefined;

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(deserializeMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
