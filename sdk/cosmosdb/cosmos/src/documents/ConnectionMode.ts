// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/** Determines the connection behavior of the CosmosClient. Note, we currently only support Gateway Mode. */
export enum ConnectionMode {
  /** Gateway mode talks to an intermediate gateway which handles the direct communication with your individual partitions. */
  Gateway = 0,
}
