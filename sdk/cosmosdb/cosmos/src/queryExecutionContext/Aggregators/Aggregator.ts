// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * @internal
 * @hidden
 */
export interface Aggregator {
  aggregate: (other: any) => void;
  getResult: () => number;
}
