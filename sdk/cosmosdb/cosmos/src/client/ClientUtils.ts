// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { PartitionKeyDefinition } from "../documents";
import { Container } from "./Container";

export async function readPartitionKeyDefinition(
  diagnosticNode: DiagnosticNodeInternal,
  container: Container,
): Promise<PartitionKeyDefinition> {
  const partitionKeyDefinition = await container.readPartitionKeyDefinition(diagnosticNode);
  return partitionKeyDefinition.resource;
}
