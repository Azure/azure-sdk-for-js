// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { hashlittle } from "jenkins-hash-lookup3";

export function mapPartitionKeyToId(partitionKey: string, partitionCount: number): number {
  const hash = hashlittle(partitionKey);
  const hashedParitionKey = hash.b ^ hash.c;
  return Math.abs(hashedParitionKey % partitionCount);
}
