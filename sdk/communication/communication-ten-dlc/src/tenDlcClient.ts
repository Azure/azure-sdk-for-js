// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { TenDLCClient as TenDlcGeneratedClient } from "./generated/src/tenDLCClient";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { tracingClient } from "./generated/src/tracing";
import { logger } from "./utils/logger";
import { createTenDlcPagingPolicy } from "./utils/customPipelinePolicies";
import {
  TenDlcCancelUSBrandOptionalParams,
  TenDlcCancelUSBrandResponse,
  TenDlcCancelUSCampaignOptionalParams,
  TenDlcCancelUSCampaignResponse,
  TenDlcCost,
  TenDlcSubmitUSBrandOptionalParams,
  TenDlcSubmitUSCampaignOptionalParams,
  USBrand,
  USCampaign,
} from "./generated/src/models";
import {
  CreateOrUpdateBrandOptions,
  CreateOrUpdateCampaignOptions,
  DeleteBrandOptionalParams,
  DeleteCampaignOptionalParams,
  GetBrandOptionalParams,
  GetBrandsOptionalParams,
  GetCampaignOptionalParams,
  ListCampaignsOptionalParams,
  ListTenDlcCostsOptions,
  SubmitBrandOptionalParams,
  SubmitCampaignOptionalParams,
} from "./models";

/**
 * Client options used to configure the TenDlcClient API requests.
 */
export interface TenDlcClientOptions extends CommonClientOptions {}

const isTenDlcClientOptions = (options: any): options is TenDlcClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

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

  public upsertUSBrand(
    brandId: string,
    options: CreateOrUpdateBrandOptions = {
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

  public upsertUSCampaign(
    campaingId: string,
    options: CreateOrUpdateCampaignOptions = {
      campaignDetails: {},
    },
  ): Promise<USCampaign> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "TenDlcClient-upsertUSCampaign",
      options,
    );
    try {
      return this.client.tenDlc.upsertUSCampaign(campaingId, campaingId, updatedOptions);
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

  public listCosts(options: ListTenDlcCostsOptions = {}): PagedAsyncIterableIterator<TenDlcCost> {
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

  public submitUSBrand(brandId: string, options: SubmitBrandOptionalParams = {}): Promise<USBrand> {
    return tracingClient.withSpan(
      "TenDlcClient-submitUSBrand",
      options,
      (submitOptions: TenDlcSubmitUSBrandOptionalParams | undefined) => {
        return this.client.tenDlc.submitUSBrand(brandId, submitOptions);
      },
    );
  }

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
}
