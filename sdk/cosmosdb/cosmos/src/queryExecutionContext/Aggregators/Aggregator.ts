// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/** @hidden */
export interface Aggregator {
  aggregate: (other: any) => void;
  getResult: () => any;
}
