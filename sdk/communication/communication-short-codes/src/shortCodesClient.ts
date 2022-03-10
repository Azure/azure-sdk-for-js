// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { isKeyCredential, parseClientArguments } from "@azure/communication-common";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { createSpan, logger } from "./utils";
import { ShortCodesClient as ShortCodesGeneratedClient } from "./generated/src";
import {
  ShortCode,
  ShortCodesUpsertUSProgramBriefOptionalParams,
  USProgramBrief,
} from "./generated/src/models/";
import { SpanStatusCode } from "@azure/core-tracing";
import {
  DeleteUSProgramBriefOptions,
  GetUSProgramBriefOptions,
  ListShortCodesOptions,
  ListUSProgramBriefsOptions,
  SubmitUSProgramBriefOptions,
} from "./models";
import { createCommunicationAuthPolicy } from "@azure/communication-common";

/**
 * Client options used to configure the ShortCodesClient API requests.
 */
export interface ShortCodesClientOptions extends CommonClientOptions {}

const isShortCodesClientOptions = (options: any): options is ShortCodesClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

export class ShortCodesClient {
  /**
   * A reference to the auto-generated ShortCodes HTTP client.
   */
  private readonly client: ShortCodesGeneratedClient;

  public constructor(connectionString: string, options?: ShortCodesClientOptions);

  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: ShortCodesClientOptions
  );

  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: ShortCodesClientOptions
  );

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | ShortCodesClientOptions,
    maybeOptions: ShortCodesClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isShortCodesClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new ShortCodesGeneratedClient(url, internalPipelineOptions);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
  }

  public listShortCodes(
    options: ListShortCodesOptions = {}
  ): PagedAsyncIterableIterator<ShortCode> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-listShortCodes", options);
    try {
      return this.client.shortCodesOperations.listShortCodes(updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async upsertUSProgramBrief(
    programBriefId: string,
    options: ShortCodesUpsertUSProgramBriefOptionalParams = {}
  ): Promise<USProgramBrief> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-upsertUSProgramBrief", options);
    try {
      return await this.client.shortCodesOperations.upsertUSProgramBrief(
        programBriefId,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async deleteUSProgramBrief(
    programBriefId: string,
    options?: DeleteUSProgramBriefOptions
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-deleteUSProgramBrief", options);
    try {
      return await this.client.shortCodesOperations.deleteUSProgramBrief(
        programBriefId,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async getUSProgramBrief(
    programBriefId: string,
    options?: GetUSProgramBriefOptions
  ): Promise<USProgramBrief> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-getUSProgramBrief", options);
    try {
      return await this.client.shortCodesOperations.getUSProgramBrief(
        programBriefId,
        updatedOptions
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public listUSProgramBriefs(
    options: ListUSProgramBriefsOptions = {}
  ): PagedAsyncIterableIterator<USProgramBrief> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-listUSProgramBriefs", options);
    try {
      return this.client.shortCodesOperations.listUSProgramBriefs(updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async submitUSProgramBrief(
    programBriefId: string,
    options?: SubmitUSProgramBriefOptions
  ): Promise<USProgramBrief> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-submitUSProgramBrief", options);
    try {
      return await this.client.shortCodesOperations.submitUSProgramBrief(
        programBriefId,
        updatedOptions
      );
    } catch (e) {
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
