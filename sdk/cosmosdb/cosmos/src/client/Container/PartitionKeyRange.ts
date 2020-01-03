// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * @ignore
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
