// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BrandDetails,
  CampaignDetails,
  TenDlcDeleteUSBrandOptionalParams,
  TenDlcDeleteUSCampaignOptionalParams,
  TenDlcGetUSBrandOptionalParams,
  TenDlcGetUSBrandsOptionalParams,
  TenDlcGetUSCampaignOptionalParams,
  TenDlcGetUSCampaignsOptionalParams,
  TenDlcGetCostsOptionalParams,
  TenDlcSubmitUSBrandOptionalParams,
  TenDlcSubmitUSCampaignOptionalParams,
  MessageDetails,
} from "./generated/src/models";

/**
 * Additional options for the Create or update brand request.
 */
export interface CreateOrUpdateBrandOptions extends TenDlcGetUSBrandOptionalParams {
  brandDetails: BrandDetails | undefined;
}

/**
 * Additional options for the Create or update campaign request.
 */
export interface CreateOrUpdateCampaignOptions extends TenDlcGetUSCampaignOptionalParams {
  campaignDetails: CampaignDetails | undefined;
  messageDetails: MessageDetails | undefined;
}

/**
 * Additional options for the Delete brand request.
 */
export interface DeleteBrandOptionalParams extends TenDlcDeleteUSBrandOptionalParams {}

/**
 * Additional options for the Delete campaign request.
 */
export interface DeleteCampaignOptionalParams extends TenDlcDeleteUSCampaignOptionalParams {}

/**
 * Additional options for the Get brand request.
 */
export interface GetBrandOptionalParams extends TenDlcGetUSBrandOptionalParams {}

/**
 * Additional options for the Get brands request.
 */
export interface GetBrandsOptionalParams extends TenDlcGetUSBrandsOptionalParams {}

/**
 * Additional options for the Get campaign request.
 */
export interface GetCampaignOptionalParams extends TenDlcGetUSCampaignOptionalParams {}

/**
 * Additional options for the List Campaigns request.
 */
export interface ListCampaignsOptionalParams extends TenDlcGetUSCampaignsOptionalParams {}

/**
 * Additional options for the List local number costs request.
 */
export interface ListTenDlcCostsOptions extends TenDlcGetCostsOptionalParams {}

/**
 * Additional options for the Submit brand request.
 */
export interface SubmitBrandOptionalParams extends TenDlcSubmitUSBrandOptionalParams {}

/**
 * Additional options for the Submit campaign request.
 */
export interface SubmitCampaignOptionalParams extends TenDlcSubmitUSCampaignOptionalParams {}

export {
  Address,
  AlternateBusinessIdType,
  BillingFrequency,
  BrandDetails,
  BrandStatus,
  CampaignDetails,
  CampaignStatus,
  CompanyVertical,
  ContactInformation,
  ContentType,
  EntityType,
  MessageDetails,
  ReviewNote,
  StockExchange,
  SubContentType,
  TenDlcCost,
  TenDlcCosts,
  TenDlcCostType,
  TenDlcCancelUSBrandOptionalParams,
  TenDlcCancelUSCampaignOptionalParams,
  TenDlcDeleteUSBrandOptionalParams,
  TenDlcDeleteUSCampaignOptionalParams,
  TenDlcGetUSBrandOptionalParams,
  TenDlcGetUSBrandsOptionalParams,
  TenDlcGetUSCampaignOptionalParams,
  TenDlcGetUSCampaignsOptionalParams,
  TenDlcGetCostsOptionalParams,
  TenDlcSubmitUSBrandOptionalParams,
  TenDlcSubmitUSCampaignOptionalParams,
  TenDlcCancelUSBrandResponse,
  TenDlcCancelUSCampaignResponse,
  USBrand,
  USBrands,
  USCampaign,
  USCampaigns,
  UseCase,
} from "./generated/src/models/";
