// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * @hidden
 */
export interface PartitionKeyRange {
  id: string;
  minInclusive: string;
  maxExclusive: string;
  ridPrefix: number;
  throughputFraction: number;
  status: string;
  parents: string[];
}
