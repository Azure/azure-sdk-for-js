// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { BlobLeaseClient } from "@azure/storage-blob";
import { CanonicalCode } from "@opentelemetry/api";

import { Lease, LeaseOperationOptions, LeaseOperationResponse } from "./models";
import { createSpan } from "./utils/tracing";

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
    options: LeaseOperationOptions = {}
  ): Promise<LeaseOperationResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "DataLakeLeaseClient-acquireLease",
      options.tracingOptions
    );
    try {
      return await this.client.acquireLease(duration, {
        ...options,
        tracingOptions: {
          ...options.tracingOptions,
          spanOptions
        }
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async changeLease(
    proposedLeaseId: string,
    options: LeaseOperationOptions = {}
  ): Promise<LeaseOperationResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "DataLakeLeaseClient-changeLease",
      options.tracingOptions
    );
    try {
      return await this.client.changeLease(proposedLeaseId, {
        ...options,
        tracingOptions: {
          ...options.tracingOptions,
          spanOptions
        }
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async releaseLease(options: LeaseOperationOptions = {}): Promise<LeaseOperationResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "DataLakeLeaseClient-releaseLease",
      options.tracingOptions
    );
    try {
      return await this.client.releaseLease({
        ...options,
        tracingOptions: {
          ...options.tracingOptions,
          spanOptions
        }
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async renewLease(options: LeaseOperationOptions = {}): Promise<Lease> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "DataLakeLeaseClient-renewLease",
      options.tracingOptions
    );
    try {
      return await this.client.renewLease({
        ...options,
        tracingOptions: {
          ...options.tracingOptions,
          spanOptions
        }
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async breakLease(
    breakPeriod: number,
    options: LeaseOperationOptions = {}
  ): Promise<LeaseOperationResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "DataLakeLeaseClient-renewLease",
      options.tracingOptions
    );
    try {
      return await this.client.breakLease(breakPeriod, {
        ...options,
        tracingOptions: {
          ...options.tracingOptions,
          spanOptions
        }
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
