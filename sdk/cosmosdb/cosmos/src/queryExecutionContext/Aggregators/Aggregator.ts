// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/** @hidden */
export interface Aggregator {
  aggregate: (other: any) => void;
  getResult: () => number;
}
