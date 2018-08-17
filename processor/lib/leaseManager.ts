// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Lease } from "./lease";

export interface LeaseManager {
  leaseRenewInterval: number;
  leaseDuration: number;
  leaseStoreExists(): Promise<boolean>;
  createLeaseStoreIfNotExists(): Promise<boolean>;
  deleteLeaseStore(): Promise<boolean>;
  getLease(partitionId: string): Promise<Lease | undefined>;
  getAllLeases(): Promise<Array<Lease | undefined>>;
  createLeaseIfNotExists(partitionId: string): Promise<Lease>;
  deleteLease(lease: Lease): Promise<boolean>;
  acquireLease(lease: Lease): Promise<boolean>;
  renewLease(lease: Lease): Promise<boolean>;
  releaseLease(lease: Lease): Promise<boolean>;
  updateLease(lease: Lease): Promise<boolean>;
}