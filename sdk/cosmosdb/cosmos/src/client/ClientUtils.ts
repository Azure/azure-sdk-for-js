// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MetadataLookUpType } from "../CosmosDiagnostics";
import { DiagnosticNodeInternal, DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal";
import { PartitionKeyDefinition } from "../documents";
import { addDignosticChild } from "../utils/diagnostics";
import { Container } from "./Container";

export async function readPartitionKeyDefinition(
  diagnosticNode: DiagnosticNodeInternal,
  container: Container
): Promise<PartitionKeyDefinition> {
  return addDignosticChild(
    async (childNode: DiagnosticNodeInternal) => {
      const partitionKeyDefinition = await container.readPartitionKeyDefinition(childNode);
      return partitionKeyDefinition.resource;
    },
    diagnosticNode,
    DiagnosticNodeType.METADATA_REQUEST_NODE,
    {
      metadatOperationType: MetadataLookUpType.PartitionKeyDefinition,
    }
  );
}
