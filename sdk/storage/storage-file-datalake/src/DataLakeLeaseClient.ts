// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { BlobLeaseClient } from "@azure/storage-blob";
import { SpanStatusCode } from "@azure/core-tracing";

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
    const { span, updatedOptions } = createSpan("DataLakeLeaseClient-acquireLease", options);
    try {
      return await this.client.acquireLease(duration, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
    const { span, updatedOptions } = createSpan("DataLakeLeaseClient-changeLease", options);
    try {
      return await this.client.changeLease(proposedLeaseId, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async releaseLease(options: LeaseOperationOptions = {}): Promise<LeaseOperationResponse> {
    options.conditions = options.conditions || {};
    const { span, updatedOptions } = createSpan("DataLakeLeaseClient-releaseLease", options);
    try {
      return await this.client.releaseLease(updatedOptions);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async renewLease(options: LeaseOperationOptions = {}): Promise<Lease> {
    options.conditions = options.conditions || {};
    const { span, updatedOptions } = createSpan("DataLakeLeaseClient-renewLease", options);
    try {
      return await this.client.renewLease(updatedOptions);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
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
    const { span, updatedOptions } = createSpan("DataLakeLeaseClient-renewLease", options);
    try {
      return await this.client.breakLease(breakPeriod, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
