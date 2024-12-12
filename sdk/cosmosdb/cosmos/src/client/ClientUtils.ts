// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import type { PartitionKeyDefinition } from "../documents";
import type { Container } from "./Container";

export async function readPartitionKeyDefinition(
  diagnosticNode: DiagnosticNodeInternal,
  container: Container,
): Promise<PartitionKeyDefinition> {
  const partitionKeyDefinition = await container.readPartitionKeyDefinition(diagnosticNode);
  return partitionKeyDefinition.resource;
}
