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
import { LocalNumberCost, USBrand, USBrands, USCampaign } from "./generated/src/models";
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
    maybeOptions: TenDlcClientOptions = {}
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

  public createOrUpdateBrand(
    brandId: string,
    id: string,
    options: CreateOrUpdateBrandOptions = {}
  ): Promise<USBrand> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "TenDlcClient-createOrUpdateBrand",
      options
    );
    try {
      return this.client.tenDLC.createOrUpdateBrand(brandId, id, updatedOptions);
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

  public createOrUpdateCampaign(
    campaingId: string,
    id: string,
    options: CreateOrUpdateCampaignOptions = {}
  ): Promise<USBrand> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "TenDlcClient-createOrUpdateCampaign",
      options
    );
    try {
      return this.client.tenDLC.createOrUpdateCampaign(campaingId, id, updatedOptions);
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

  public deleteBrand(brandId: string, options: DeleteBrandOptionalParams = {}): Promise<void> {
    const { span, updatedOptions } = tracingClient.startSpan("TenDlcClient-deleteBrand", options);
    try {
      return this.client.tenDLC.deleteBrand(brandId, updatedOptions);
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

  public deleteCampaign(
    campaignId: string,
    options: DeleteCampaignOptionalParams = {}
  ): Promise<void> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "TenDlcClient-deleteCampaign",
      options
    );
    try {
      return this.client.tenDLC.deleteCampaign(campaignId, updatedOptions);
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

  public getBrand(brandId: string, options: GetBrandOptionalParams = {}): Promise<USBrand> {
    const { span, updatedOptions } = tracingClient.startSpan("TenDlcClient-getBrand", options);
    try {
      return this.client.tenDLC.getBrand(brandId, updatedOptions);
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

  public listBrands(options: GetBrandsOptionalParams = {}): Promise<USBrands> {
    const { span, updatedOptions } = tracingClient.startSpan("TenDlcClient-listBrands", options);
    try {
      return this.client.tenDLC.getBrands(updatedOptions);
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

  public getCampaign(
    campaignId: string,
    options: GetCampaignOptionalParams = {}
  ): Promise<USCampaign> {
    const { span, updatedOptions } = tracingClient.startSpan("TenDlcClient-getCampaign", options);
    try {
      return this.client.tenDLC.getCampaign(campaignId, updatedOptions);
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

  public listCampaigns(
    options: ListCampaignsOptionalParams = {}
  ): PagedAsyncIterableIterator<USCampaign> {
    const { span, updatedOptions } = tracingClient.startSpan("TenDlcClient-listCampaigns", options);
    try {
      return this.client.tenDLC.listCampaigns(updatedOptions);
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

  public listCosts(
    options: ListTenDlcCostsOptions = {}
  ): PagedAsyncIterableIterator<LocalNumberCost> {
    const { span, updatedOptions } = tracingClient.startSpan("TenDlcClient-listCosts", options);
    try {
      return this.client.tenDLC.listCosts(updatedOptions);
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

  public submitBrand(brandId: string, options: SubmitBrandOptionalParams = {}): Promise<USBrand> {
    return tracingClient.withSpan("TenDlcClient-submitBrand", options, (submitOptions) => {
      return this.client.tenDLC.submitBrand(brandId, submitOptions);
    });
  }

  public submitCampaign(
    campaignId: string,
    options: SubmitCampaignOptionalParams = {}
  ): Promise<USCampaign> {
    return tracingClient.withSpan("TenDlcClient-submitCampaign", options, (submitOptions) => {
      return this.client.tenDLC.submitCampaign(campaignId, submitOptions);
    });
  }
}
