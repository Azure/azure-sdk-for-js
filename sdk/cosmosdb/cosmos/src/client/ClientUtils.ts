// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
  MetadataLookUpType,
} from "../CosmosDiagnostics";
import { withTracing } from "../CosmosDiagnosticsContext";
import { PartitionKeyDefinition } from "../documents";
import { Container } from "./Container";

export async function readPartitionKeyDefinition(
  diagnosticNode: DiagnosticNodeInternal,
  container: Container
): Promise<PartitionKeyDefinition> {
  return await withTracing(
    async (childNode: DiagnosticNodeInternal) => {
      const partitionKeyDefinition = await container.readPartitionKeyDefinition(childNode);
      childNode.recordMetaDataLookup(
        partitionKeyDefinition.activityId,
        MetadataLookUpType.ServiceEndpointResolution
      );
      return partitionKeyDefinition.resource;
    },
    diagnosticNode,
    DiagnosticNodeType.METADATA_REQUEST_NODE,
    {
      metadatOperationType: MetadataLookUpType.ServiceEndpointResolution,
    }
  );
}
