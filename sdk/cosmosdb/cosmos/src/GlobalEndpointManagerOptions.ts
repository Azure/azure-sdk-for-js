// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ResourceType, OperationType } from "./common/index.js";
import type { DiagnosticNodeInternal } from "./diagnostics/DiagnosticNodeInternal.js";

/**
 * @internal
 */
export interface ResolveServiceEndpointOptions {
  diagnosticNode: DiagnosticNodeInternal;
  resourceType: ResourceType;
  operationType: OperationType;
  /**
   * This is to indicate the starting index for selecting servers.
   */
  startServiceEndpointIndex: number;
  /**
   * Excludes one or more Azure regions for the operation.
   * <p>This option is only applied when enableEndPointDiscovery is set to true.</p>
   */
  excludedLocations?: string[];
}
