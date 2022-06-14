// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />
import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import {
  DeleteUSProgramBriefOptions,
  GetUSProgramBriefOptions,
  ListShortCodesOptions,
  ListUSProgramBriefsOptions,
  ShortCodesCreateOrReplaceUSProgramBriefAttachmentOptionalParams,
  ShortCodesDeleteUSProgramBriefAttachmentOptionalParams,
  ShortCodesGetUSProgramBriefAttachmentOptionalParams,
  ShortCodesGetUSProgramBriefAttachmentsOptionalParams,
  SubmitUSProgramBriefOptions,
} from "./models";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  ProgramBriefAttachment,
  ShortCode,
  ShortCodesUpsertUSProgramBriefOptionalParams,
  USProgramBrief,
} from "./generated/src/models/";
import { createSpan, logger } from "./utils";
import { isKeyCredential, parseClientArguments } from "@azure/communication-common";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ShortCodesClient as ShortCodesGeneratedClient } from "./generated/src";
import { SpanStatusCode } from "@azure/core-tracing";
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

  public listUSProgramBriefs(
    options: ListUSProgramBriefsOptions = {}
  ): PagedAsyncIterableIterator<USProgramBrief> {
    const { span, updatedOptions } = createSpan("ShortCodesClient-listUSProgramBriefs", options);
    try {
      return this.client.shortCodesOperations.listUSProgramBriefs(updatedOptions);
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

  public async getUSProgramBriefAttachment(
    programBriefId: string,
    attachmentId: string,
    options?: ShortCodesGetUSProgramBriefAttachmentOptionalParams
  ): Promise<ProgramBriefAttachment> {
    const { span, updatedOptions } = createSpan(
      "ShortCodesClient-getUSProgramBriefAttachment",
      options
    );
    try {
      return await this.client.shortCodesOperations.getUSProgramBriefAttachment(
        programBriefId,
        attachmentId,
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

  public listUSProgramBriefAttachments(
    programBriefId: string,
    options: ShortCodesGetUSProgramBriefAttachmentsOptionalParams = {}
  ): PagedAsyncIterableIterator<ProgramBriefAttachment> {
    const { span, updatedOptions } = createSpan(
      "ShortCodesClient-listUSProgramBriefAttachments",
      options
    );
    try {
      return this.client.shortCodesOperations.listUSProgramBriefAttachments(
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

  public async deleteUSProgramBriefAttachment(
    programBriefId: string,
    attachmentId: string,
    options?: ShortCodesDeleteUSProgramBriefAttachmentOptionalParams
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "ShortCodesClient-deleteUSProgramBriefAttachment",
      options
    );
    try {
      return await this.client.shortCodesOperations.deleteUSProgramBriefAttachment(
        programBriefId,
        attachmentId,
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

  public async createOrReplaceUSProgramBriefAttachment(
    programBriefId: string,
    attachmentId: string,
    options: ShortCodesCreateOrReplaceUSProgramBriefAttachmentOptionalParams = {}
  ): Promise<USProgramBrief> {
    const { span, updatedOptions } = createSpan(
      "ShortCodesClient-createOrReplaceUSProgramBriefAttachment",
      options
    );
    try {
      return await this.client.shortCodesOperations.createOrReplaceUSProgramBriefAttachment(
        programBriefId,
        attachmentId,
        attachmentId,
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
