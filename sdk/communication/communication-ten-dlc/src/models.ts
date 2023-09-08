// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TenDLCCreateOrUpdateBrandOptionalParams,
  TenDLCCreateOrUpdateCampaignOptionalParams,
  TenDLCDeleteBrandOptionalParams,
  TenDLCDeleteCampaignOptionalParams,
  TenDLCGetBrandOptionalParams,
  TenDLCGetBrandsOptionalParams,
  TenDLCGetCampaignOptionalParams,
  TenDLCGetCampaignsOptionalParams,
  TenDLCGetCostsOptionalParams,
  TenDLCSubmitBrandOptionalParams,
  TenDLCSubmitCampaignOptionalParams,
} from "./generated/src/models";

/**
 * Additional options for the Create or update brand request.
 */
export interface CreateOrUpdateBrandOptions extends TenDLCCreateOrUpdateBrandOptionalParams {}

/**
 * Additional options for the Create or update campaign request.
 */
export interface CreateOrUpdateCampaignOptions extends TenDLCCreateOrUpdateCampaignOptionalParams {}

/**
 * Additional options for the Delete brand request.
 */
export interface DeleteBrandOptionalParams extends TenDLCDeleteBrandOptionalParams {}

/**
 * Additional options for the Delete campaign request.
 */
export interface DeleteCampaignOptionalParams extends TenDLCDeleteCampaignOptionalParams {}

/**
 * Additional options for the Get brand request.
 */
export interface GetBrandOptionalParams extends TenDLCGetBrandOptionalParams {}

/**
 * Additional options for the Get brands request.
 */
export interface GetBrandsOptionalParams extends TenDLCGetBrandsOptionalParams {}

/**
 * Additional options for the Get campaign request.
 */
export interface GetCampaignOptionalParams extends TenDLCGetCampaignOptionalParams {}

/**
 * Additional options for the List Campaigns request.
 */
export interface ListCampaignsOptionalParams extends TenDLCGetCampaignsOptionalParams {}

/**
 * Additional options for the List local number costs request.
 */
export interface ListTenDlcCostsOptions extends TenDLCGetCostsOptionalParams {}

/**
 * Additional options for the Submit brand request.
 */
export interface SubmitBrandOptionalParams extends TenDLCSubmitBrandOptionalParams {}

/**
 * Additional options for the Submit campaign request.
 */
export interface SubmitCampaignOptionalParams extends TenDLCSubmitCampaignOptionalParams {}

export {
  Address,
  AlternateBusinessIdType,
  BillingFrequency,
  BrandDetails,
  CampaignDetails,
  CompanyVertical,
  ContactInformation,
  ContentType,
  EntityType,
  LocalNumberCost,
  LocalNumberCostType,
  MessageDetails,
  Relationship,
  StockExchange,
  SubContentType,
  TenDLCCreateOrUpdateBrandOptionalParams,
  TenDLCCreateOrUpdateCampaignOptionalParams,
  TenDLCDeleteBrandOptionalParams,
  TenDLCDeleteCampaignOptionalParams,
  TenDLCGetBrandOptionalParams,
  TenDLCGetBrandsOptionalParams,
  TenDLCGetCampaignOptionalParams,
  TenDLCGetCampaignsOptionalParams,
  TenDLCGetCostsOptionalParams,
  TenDLCSubmitBrandOptionalParams,
  TenDLCSubmitCampaignOptionalParams,
  USBrand,
  USBrands,
  USCampaign,
  USCampaigns,
  UseCase,
} from "./generated/src/models/";
