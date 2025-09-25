// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import { type KeyCredential, type TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { TenDLCClient as TenDlcGeneratedClient } from "./generated/src/tenDLCClient.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { tracingClient } from "./generated/src/tracing.js";
import { logger } from "./utils/logger.js";
import { createTenDlcPagingPolicy } from "./utils/customPipelinePolicies.js";
import type {
  CampaignAttachment,
  TenDlcCancelUSBrandOptionalParams,
  TenDlcCancelUSBrandResponse,
  TenDlcCancelUSCampaignOptionalParams,
  TenDlcCancelUSCampaignResponse,
  TenDlcCost,
  TenDlcSubmitUSBrandOptionalParams,
  TenDlcSubmitUSCampaignOptionalParams,
  USBrand,
  USCampaign,
} from "./generated/src/models/index.js";
import type {
  DeleteBrandOptionalParams,
  DeleteCampaignOptionalParams,
  GetBrandOptionalParams,
  GetBrandsOptionalParams,
  GetCampaignOptionalParams,
  ListCampaignsOptionalParams,
  ListCostsOptions,
  SubmitBrandOptionalParams,
  SubmitBrandForVettingOptionalParams,
  SubmitCampaignOptionalParams,
  UpsertUSBrandOptions,
  UpsertUSCampaignOptions,
  TenDlcPutUSCampaignAttachmentOptionalParams,
  TenDlcPutUSCampaignAttachmentResponse,
  TenDlcGetUSCampaignAttachmentOptionalParams,
  TenDlcGetUSCampaignAttachmentsOptionalParams,
  TenDlcGetUSCampaignAttachmentResponse,
  TenDlcDeleteUSCampaignAttachmentOptionalParams,
  AttachmentType,
  FileType,
} from "./models.js";

/**
 * Client options used to configure the TenDlcClient API requests.
 */
export interface TenDlcClientOptions extends CommonClientOptions {}

const isTenDlcClientOptions = (options: any): options is TenDlcClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

/**
 * Client class for interacting with Azure Communication Services 10DLC Administration.
 */
export class TenDlcClient {
  /**
   * A reference to the auto-generated 10 DLC HTTP client.
   */
  private readonly client: TenDlcGeneratedClient;

  public constructor(connectionString: string, options?: TenDlcClientOptions);

  public constructor(endpoint: string, credential: KeyCredential, options?: TenDlcClientOptions);

  public constructor(endpoint: string, credential: TokenCredential, options?: TenDlcClientOptions);

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | TenDlcClientOptions,
    maybeOptions: TenDlcClientOptions = {},
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isTenDlcClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new TenDlcGeneratedClient(url, internalPipelineOptions);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
    // This policy is temporary workarounds to address compatibility issues with Azure Core V2.
    const tenDlcPagingPolicy = createTenDlcPagingPolicy(url);
    this.client.pipeline.addPolicy(tenDlcPagingPolicy);
  }

  /**
   * Upserts a US brand with the given brand ID.
   *
   * @param brandId - The unique identifier for the brand.
   * @param options - Optional parameters for upserting the US brand.
   * @returns The upserted US brand.
   */
  public upsertUSBrand(
    brandId: string,
    options: UpsertUSBrandOptions = {
      brandDetails: {},
    },
  ): Promise<USBrand> {
    const { span, updatedOptions } = tracingClient.startSpan("TenDlcClient-upsertUSBrand", options);
    try {
      return this.client.tenDlc.upsertUSBrand(brandId, brandId, updatedOptions);
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

  /**
   * Upserts a US campaign with the given campaign ID and options.
   *
   * @param campaignId - The ID of the campaign to upsert.
   * @param options - The options for upserting the US campaign.
   * @returns The upserted US campaign.
   */
  public upsertUSCampaign(
    campaignId: string,
    options: UpsertUSCampaignOptions = {
      body: {
        id: campaignId,
      }
    },
  ): Promise<USCampaign> {

    const { span, updatedOptions } = tracingClient.startSpan(
      "TenDlcClient-upsertUSCampaign",
      options,
    );
    try {
      return this.client.tenDlc.upsertUSCampaign(campaignId, updatedOptions);
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

  /**
   * Deletes a US brand by its ID.
   *
   * @param brandId - The unique identifier of the brand to be deleted.
   * @param options - Optional parameters for the delete operation.
   * @returns A promise that resolves when the brand is successfully deleted.
   */
  public deleteUSBrand(brandId: string, options: DeleteBrandOptionalParams = {}): Promise<void> {
    const { span, updatedOptions } = tracingClient.startSpan("TenDlcClient-deleteUSBrand", options);
    try {
      return this.client.tenDlc.deleteUSBrand(brandId, updatedOptions);
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

  /**
   * Deletes a US campaign by its campaign ID.
   *
   * @param campaignId - The unique identifier of the campaign to be deleted.
   * @param options - Optional parameters for the delete operation.
   * @returns A promise that resolves when the campaign is successfully deleted.
   */
  public deleteUSCampaign(
    campaignId: string,
    options: DeleteCampaignOptionalParams = {},
  ): Promise<void> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "TenDlcClient-deleteUSCampaign",
      options,
    );
    try {
      return this.client.tenDlc.deleteUSCampaign(campaignId, updatedOptions);
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

  /**
   * Retrieves a US brand by its brand ID.
   *
   * @param brandId - The unique identifier of the US brand to retrieve.
   * @param options - Optional parameters for the request.
   * @returns The USBrand object.
   */
  public getUSBrand(brandId: string, options: GetBrandOptionalParams = {}): Promise<USBrand> {
    const { span, updatedOptions } = tracingClient.startSpan("TenDlcClient-getUSBrand", options);
    try {
      return this.client.tenDlc.getUSBrand(brandId, updatedOptions);
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

  /**
   * Lists US brands with optional parameters.
   *
   * @param options - Optional parameters for listing US brands.
   * @returns An async iterable iterator for US brands.
   */
  public listUSBrands(options: GetBrandsOptionalParams = {}): PagedAsyncIterableIterator<USBrand> {
    const { span, updatedOptions } = tracingClient.startSpan("TenDlcClient-listUSBrands", options);
    try {
      return this.client.tenDlc.listUSBrands(updatedOptions);
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

  /**
   * Retrieves a US campaign by its campaign ID.
   *
   * @param campaignId - The unique identifier of the US campaign to retrieve.
   * @param options - Optional parameters for the request.
   * @returns The USCampaign object.
   */
  public getUSCampaign(
    campaignId: string,
    options: GetCampaignOptionalParams = {},
  ): Promise<USCampaign> {
    const { span, updatedOptions } = tracingClient.startSpan("TenDlcClient-getUSCampaign", options);
    try {
      return this.client.tenDlc.getUSCampaign(campaignId, updatedOptions);
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

  /**
   * Lists US campaigns.
   *
   * @param options - Optional parameters for listing US campaigns.
   * @returns An iterator that allows paging through US campaigns.
   */
  public listUSCampaigns(
    options: ListCampaignsOptionalParams = {},
  ): PagedAsyncIterableIterator<USCampaign> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "TenDlcClient-listUSCampaigns",
      options,
    );
    try {
      return this.client.tenDlc.listUSCampaigns(updatedOptions);
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

  /**
   * Lists the costs associated with the TenDlc service.
   *
   * @param options - The options for listing costs.
   * @returns An async iterable iterator that allows paging through the costs.
   */
  public listCosts(options: ListCostsOptions = {}): PagedAsyncIterableIterator<TenDlcCost> {
    const { span, updatedOptions } = tracingClient.startSpan("TenDlcClient-listCosts", options);
    try {
      return this.client.tenDlc.listCosts(updatedOptions);
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

  /**
   * Submits a US brand for registration.
   *
   * @param brandId - The unique identifier of the brand to be submitted.
   * @param options - Optional parameters for submitting the brand.
   * @returns The submitted US brand.
   */
  public submitUSBrand(brandId: string, options: SubmitBrandOptionalParams = {}): Promise<USBrand> {
    return tracingClient.withSpan(
      "TenDlcClient-submitUSBrand",
      options,
      (submitOptions: TenDlcSubmitUSBrandOptionalParams | undefined) => {
        return this.client.tenDlc.submitUSBrand(brandId, submitOptions);
      },
    );
  }


  /**
   * Submits a US brand for vetting registration.
   *
   * @param brandId - The unique identifier of the brand to be submitted.
   * @param options - Optional parameters for submitting the brand.
   * @returns The submitted US brand.
   */
  public submitUSBrandForVetting(brandId: string, options: SubmitBrandForVettingOptionalParams = {}): Promise<USBrand> {
    return tracingClient.withSpan(
      "TenDlcClient-submitUSBrandForVetting",
      options,
      (submitOptions: TenDlcSubmitUSBrandOptionalParams | undefined) => {
        return this.client.tenDlc.submitUSBrandForVetting(brandId, submitOptions);
      },
    );
  }

  /**
   * Submits a US campaign for approval.
   *
   * @param campaignId - The unique identifier of the campaign to be submitted.
   * @param options - Optional parameters for submitting the campaign.
   * @returns The submitted US campaign.
   */
  public submitUSCampaign(
    campaignId: string,
    options: SubmitCampaignOptionalParams = {},
  ): Promise<USCampaign> {
    return tracingClient.withSpan(
      "TenDlcClient-submitUSCampaign",
      options,
      (submitOptions: TenDlcSubmitUSCampaignOptionalParams | undefined) => {
        return this.client.tenDlc.submitUSCampaign(campaignId, submitOptions);
      },
    );
  }

  /**
   * Cancels a US brand.
   *
   * @param brandId - The ID of the brand to be canceled.
   * @param options - Optional parameters for the cancellation request.
   * @returns The response of the cancellation request.
   */
  public cancelUSBrand(
    brandId: string,
    options?: TenDlcCancelUSBrandOptionalParams,
  ): Promise<TenDlcCancelUSBrandResponse> {
    const { span } = tracingClient.startSpan("TenDLCClient.cancelUSBrand", options);
    try {
      return this.client.tenDlc.cancelUSBrand(brandId, options);
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

  /**
   * Cancels a US campaign with the given campaign ID.
   *
   * @param campaignId - The ID of the campaign to be canceled.
   * @param options - Optional parameters for canceling the campaign.
   * @returns The response of the cancel operation.
   */
  public cancelUSCampaign(
    campaignId: string,
    options?: TenDlcCancelUSCampaignOptionalParams,
  ): Promise<TenDlcCancelUSCampaignResponse> {
    const { span } = tracingClient.startSpan("TenDLCClient.cancelUSCampaign", options);
    try {
      return this.client.tenDlc.cancelUSCampaign(campaignId, options);
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

  public getUSCampaignAttachment(
    campaignId: string,
    attachmentId: string,
    options: TenDlcGetUSCampaignAttachmentOptionalParams = {},
  ): Promise<TenDlcGetUSCampaignAttachmentResponse> {
    return tracingClient.withSpan(
      "TenDLCClient-getCampaignAttachment",
      options,
      (updatedOptions) => {
        return this.client.tenDlc.getUSCampaignAttachment(
          campaignId,
          attachmentId,
          updatedOptions,
        );
      },
    );
  }

  public listUSCampaignAttachments(
    campaignId: string,
    options: TenDlcGetUSCampaignAttachmentsOptionalParams = {},
  ): PagedAsyncIterableIterator<CampaignAttachment> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "TenDLCClient-listCampaignAttachments",
      options,
    );
    try {
      return this.client.tenDlc.listUSCampaignAttachments(campaignId, updatedOptions);
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

  public deleteUSCampaignAttachment(
    campaignId: string,
    attachmentId: string,
    options: TenDlcDeleteUSCampaignAttachmentOptionalParams = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "TenDLCClient-deleteCampaignAttachment",
      options,
      (updatedOptions) => {
        return this.client.tenDlc.deleteUSCampaignAttachment(
          campaignId,
          attachmentId,
          updatedOptions,
        );
      },
    );
  }

  public createOrReplaceCampaignAttachment(
    campaignId: string,
    attachmentId: string,
    fileName: string,
    fileType: FileType,
    fileContent: string,
    attachmentType: AttachmentType,
    options: TenDlcPutUSCampaignAttachmentOptionalParams = {},
  ): Promise<TenDlcPutUSCampaignAttachmentResponse> {
    return tracingClient.withSpan(
      "TenDLCClient-createOrReplaceCampaignAttachment",
      options,
      (updatedOptions) => {
        return this.client.tenDlc.putUSCampaignAttachment(
          campaignId,
          attachmentId,
          attachmentId,
          attachmentType,
          fileName,
          fileType,
          fileContent,
          updatedOptions,
        );
      },
    );
  }
}
