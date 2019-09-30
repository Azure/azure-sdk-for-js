// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export interface PartitionKeyDefinition {
  paths: string[];
  version?: number;
  systemKey?: boolean;
}
