/** Determines the connection behavior of the CosmosClient. Note, we currently only support Gateway Mode. */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export enum ConnectionMode {
  /** Gateway mode talks to a intermediate gateway which handles the direct communicationi with your individual partitions. */
  Gateway = 0
}
