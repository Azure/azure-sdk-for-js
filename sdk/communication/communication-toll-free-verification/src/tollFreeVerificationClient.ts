// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />
import {
  AttachmentType,
  CampaignBrief,
  CampaignBriefAttachment,
  FileType,
  TollFreeVerificationCreateOrReplaceCampaignBriefAttachmentOptionalParams,
  TollFreeVerificationDeleteCampaignBriefAttachmentOptionalParams,
  TollFreeVerificationDeleteCampaignBriefOptionalParams,
  TollFreeVerificationGetCampaignBriefAttachmentOptionalParams,
  TollFreeVerificationGetCampaignBriefAttachmentsOptionalParams,
  TollFreeVerificationGetCampaignBriefOptionalParams,
  TollFreeVerificationGetCampaignBriefsOptionalParams,
  TollFreeVerificationSubmitCampaignBriefOptionalParams,
  TollFreeVerificationSubmitCampaignBriefResponse,
  TollFreeVerificationUpsertCampaignBriefOptionalParams,
} from "./models";
import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { isKeyCredential, parseClientArguments } from "@azure/communication-common";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { TollFreeVerificationClient as TollFreeVerificationGeneratedClient } from "./generated/src";
import { createCommunicationAuthPolicy } from "@azure/communication-common";
import { logger } from "./utils";
import { tracingClient } from "./generated/src/tracing";
/**
 * Client options used to configure the TollFreeVerificationClient API requests.
 */
export interface TollFreeVerificationClientOptions extends CommonClientOptions {}

const isTollFreeVerificationClientOptions = (
  options: any
): options is TollFreeVerificationClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

export class TollFreeVerificationClient {
  /**
   * A reference to the auto-generated Toll Free Verification HTTP client.
   */
  private readonly client: TollFreeVerificationGeneratedClient;

  public constructor(connectionString: string, options?: TollFreeVerificationClientOptions);

  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: TollFreeVerificationClientOptions
  );

  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: TollFreeVerificationClientOptions
  );

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | TollFreeVerificationClientOptions,
    maybeOptions: TollFreeVerificationClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isTollFreeVerificationClientOptions(credentialOrOptions)
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

    this.client = new TollFreeVerificationGeneratedClient(url, internalPipelineOptions);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
  }

  public getCampaignBrief(
    campaignBriefId: string,
    countryCode: string,
    options: TollFreeVerificationGetCampaignBriefOptionalParams = {}
  ): Promise<CampaignBrief> {
    return tracingClient.withSpan(
      "TollFreeVerificationClient-getCampaignBrief",
      options,
      async (updatedOptions) => {
        return this.client.tollFreeVerification.getCampaignBrief(
          campaignBriefId,
          countryCode,
          updatedOptions
        );
      }
    );
  }

  public listCampaignBriefs(
    countryCode: string,
    options: TollFreeVerificationGetCampaignBriefsOptionalParams = {}
  ): PagedAsyncIterableIterator<CampaignBrief> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "TollFreeVerificationClient-listCampaignBriefs",
      options
    );
    try {
      return this.client.tollFreeVerification.listCampaignBriefs(countryCode, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public upsertCampaignBrief(
    campaignBriefId: string,
    countryCode: string,
    options: TollFreeVerificationUpsertCampaignBriefOptionalParams = {}
  ): Promise<CampaignBrief> {
    return tracingClient.withSpan(
      "TollFreeVerificationClient-upsertCampaignBrief",
      options,
      async (updatedOptions) => {
        return this.client.tollFreeVerification.upsertCampaignBrief(
          campaignBriefId,
          countryCode,
          updatedOptions
        );
      }
    );
  }

  public deleteCampaignBrief(
    campaignBriefId: string,
    countryCode: string,
    options: TollFreeVerificationDeleteCampaignBriefOptionalParams = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "TollFreeVerificationClient-deleteCampaignBrief",
      options,
      async (updatedOptions) => {
        return this.client.tollFreeVerification.deleteCampaignBrief(
          campaignBriefId,
          countryCode,
          updatedOptions
        );
      }
    );
  }

  public submitCampaignBrief(
    campaignBriefId: string,
    countryCode: string,
    options: TollFreeVerificationSubmitCampaignBriefOptionalParams = {}
  ): Promise<TollFreeVerificationSubmitCampaignBriefResponse> {
    return tracingClient.withSpan(
      "TollFreeVerificationClient-upsertCampaignBrief",
      options,
      async (updatedOptions) => {
        return this.client.tollFreeVerification.submitCampaignBrief(
          campaignBriefId,
          countryCode,
          updatedOptions
        );
      }
    );
  }

  public upsertCampaignBriefAttachment(
    countryCode: string,
    campaignBriefId: string,
    attachmentId: string,
    attachmentType: AttachmentType,
    fileName: string,
    fileType: FileType,
    fileContentBase64: string,
    options: TollFreeVerificationCreateOrReplaceCampaignBriefAttachmentOptionalParams = {}
  ): Promise<CampaignBriefAttachment> {
    return tracingClient.withSpan(
      "TollFreeVerificationClient-upsertCampaignBriefAttachment",
      options,
      async (updatedOptions) => {
        return this.client.tollFreeVerification.createOrReplaceCampaignBriefAttachment(
          countryCode,
          campaignBriefId,
          attachmentId,
          attachmentId,
          attachmentType,
          fileName,
          fileType,
          fileContentBase64,
          updatedOptions
        );
      }
    );
  }

  public deleteCampaignBriefAttachment(
    campaignBriefId: string,
    attachmentId: string,
    countryCode: string,
    options: TollFreeVerificationDeleteCampaignBriefAttachmentOptionalParams = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "TollFreeVerificationClient-deleteCampaignBriefAttachment",
      options,
      async (updatedOptions) => {
        return this.client.tollFreeVerification.deleteCampaignBriefAttachment(
          campaignBriefId,
          attachmentId,
          countryCode,
          updatedOptions
        );
      }
    );
  }

  public listCampaignBriefAttachments(
    countryCode: string,
    campaignBriefId: string,
    options: TollFreeVerificationGetCampaignBriefAttachmentsOptionalParams = {}
  ): PagedAsyncIterableIterator<CampaignBrief> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "TollFreeVerificationClient-listCampaignBriefAttachments",
      options
    );
    try {
      return this.client.tollFreeVerification.listCampaignBriefAttachments(
        countryCode,
        campaignBriefId,
        updatedOptions
      );
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public getCampaignBriefAttachment(
    countryCode: string,
    campaignBriefId: string,
    attachmentId: string,
    options: TollFreeVerificationGetCampaignBriefAttachmentOptionalParams = {}
  ): Promise<CampaignBrief> {
    return tracingClient.withSpan(
      "TollFreeVerificationClient-getCampaignBriefAttachment",
      options,
      async (updatedOptions) => {
        return this.client.tollFreeVerification.getCampaignBriefAttachment(
          countryCode,
          campaignBriefId,
          attachmentId,
          updatedOptions
        );
      }
    );
  }
}
