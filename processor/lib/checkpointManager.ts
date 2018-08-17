// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { CheckpointInfo } from "./checkpointInfo";
import { Lease } from "./lease";

export interface CheckpointManager {
  checkpointStoreExists(): Promise<boolean>;
  createCheckpointStoreIfNotExists(): Promise<boolean>;
  getCheckpoint(partitionId: string): Promise<CheckpointInfo | undefined>;
  updateCheckpoint(lease: Lease, checkpoint: CheckpointInfo): Promise<boolean>;
  deleteCheckpoint(partitionId: string): Promise<void>;
}