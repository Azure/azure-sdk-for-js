// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { PartitionKeyDefinition } from "../documents/index.js";
import type { Container } from "./Container/index.js";

export async function readPartitionKeyDefinition(
  diagnosticNode: DiagnosticNodeInternal,
  container: Container,
): Promise<PartitionKeyDefinition> {
  const partitionKeyDefinition = await container.readPartitionKeyDefinition(diagnosticNode);
  return partitionKeyDefinition.resource;
}
