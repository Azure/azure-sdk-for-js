// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { BlobLeaseClient } from "@azure/storage-blob";

import { Lease, LeaseOperationOptions, LeaseOperationResponse } from "./models";
import { tracingClient } from "./utils/tracing";

export class DataLakeLeaseClient {
  public get leaseId(): string {
    return this.client.leaseId;
  }

  public get url(): string {
    return this.client.url;
  }

  constructor(private readonly client: BlobLeaseClient) {}

  public async acquireLease(
    duration: number,
    options: LeaseOperationOptions = {},
  ): Promise<LeaseOperationResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "DataLakeLeaseClient-acquireLease",
      options,
      async (updatedOptions) => {
        return this.client.acquireLease(duration, updatedOptions);
      },
    );
  }

  public async changeLease(
    proposedLeaseId: string,
    options: LeaseOperationOptions = {},
  ): Promise<LeaseOperationResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "DataLakeLeaseClient-changeLease",
      options,
      async (updatedOptions) => {
        return this.client.changeLease(proposedLeaseId, updatedOptions);
      },
    );
  }

  public async releaseLease(options: LeaseOperationOptions = {}): Promise<LeaseOperationResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "DataLakeLeaseClient-releaseLease",
      options,
      async (updatedOptions) => {
        return this.client.releaseLease(updatedOptions);
      },
    );
  }

  public async renewLease(options: LeaseOperationOptions = {}): Promise<Lease> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "DataLakeLeaseClient-renewLease",
      options,
      async (updatedOptions) => {
        return this.client.renewLease(updatedOptions);
      },
    );
  }

  public async breakLease(
    breakPeriod: number,
    options: LeaseOperationOptions = {},
  ): Promise<LeaseOperationResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "DataLakeLeaseClient-renewLease",
      options,
      async (updatedOptions) => {
        return this.client.breakLease(breakPeriod, updatedOptions);
      },
    );
  }
}
