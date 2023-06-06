// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MetadataLookUpType } from "../CosmosDiagnostics";
import { CosmosDiagnosticContext } from "../CosmosDiagnosticsContext";
import { PartitionKeyDefinition } from "../documents";
import { Container } from "./Container";

export async function readAndRecordPartitionKeyDefinition(container: Container): Promise<{
  diagnosticContext: CosmosDiagnosticContext;
  partitionKeyDefinition: PartitionKeyDefinition;
}> {
  const diagnosticContext: CosmosDiagnosticContext = new CosmosDiagnosticContext();

  const { resource: partitionKeyDefinition, diagnostics } =
    await container.readPartitionKeyDefinition();
  diagnosticContext.recordMetaDataLookup(diagnostics, MetadataLookUpType.PartitionKeyRangeLookUp);
  return { diagnosticContext, partitionKeyDefinition };
}
