// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { PartitionKeyDefinition, PartitionKeyInternal } from "../documents/index.js";
import type { PartitionKeyRangeCache } from "../routing/partitionKeyRangeCache.js";
import type { Container } from "./Container/index.js";

export async function readPartitionKeyDefinition(
  diagnosticNode: DiagnosticNodeInternal,
  container: Container,
): Promise<PartitionKeyDefinition> {
  const partitionKeyDefinition = await container.readPartitionKeyDefinition(diagnosticNode);
  return partitionKeyDefinition.resource;
}

export async function computePartitionKeyRangeId(
  diagnosticNode: DiagnosticNodeInternal,
  partitionKey: PartitionKeyInternal,
  partitionKeyRangeCache: PartitionKeyRangeCache,
  isPartitionLevelFailOverEnabled: boolean,
  container: Container,
  pKDefinition?: PartitionKeyDefinition,
): Promise<string | undefined> {
  let partitionKeyRangeId: string | undefined = undefined;
  if (isPartitionLevelFailOverEnabled) {
    const partitionKeyDefinition =
      pKDefinition ?? (await readPartitionKeyDefinition(diagnosticNode, container));
    if (partitionKeyDefinition && partitionKey && partitionKey.length > 0) {
      partitionKeyRangeId = await partitionKeyRangeCache.getPartitionKeyRangeIdFromPartitionKey(
        container.url,
        partitionKey,
        partitionKeyDefinition,
        diagnosticNode,
      );
    }
  }
  return partitionKeyRangeId;
}
