// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/** A list of pricing batch resources. */
export interface _PricingBatchList {
  /** The pricing batch resources. */
  value: PricingBatch[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _pricingBatchListDeserializer(item: any): _PricingBatchList {
  return {
    value: pricingBatchArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function pricingBatchArraySerializer(result: Array<PricingBatch>): any[] {
  return result.map((item) => {
    return pricingBatchSerializer(item);
  });
}

export function pricingBatchArrayDeserializer(result: Array<PricingBatch>): any[] {
  return result.map((item) => {
    return pricingBatchDeserializer(item);
  });
}

/** Pricing batch resource for updating multiple pricing configurations. */
export interface PricingBatch extends ExtensionResource {
  /** Pricing batch properties. */
  properties?: PricingBatchProperties;
}

export function pricingBatchSerializer(item: PricingBatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : pricingBatchPropertiesSerializer(item["properties"]),
  };
}

export function pricingBatchDeserializer(item: any): PricingBatch {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : pricingBatchPropertiesDeserializer(item["properties"]),
  };
}

/** Properties for a pricing batch resource. */
export interface PricingBatchProperties {
  /** Pricing plan configurations represented by this resource. */
  plansConfigurations: PricingBatchPlanItem[];
}

export function pricingBatchPropertiesSerializer(item: PricingBatchProperties): any {
  return { plansConfigurations: pricingBatchPlanItemArraySerializer(item["plansConfigurations"]) };
}

export function pricingBatchPropertiesDeserializer(item: any): PricingBatchProperties {
  return {
    plansConfigurations: pricingBatchPlanItemArrayDeserializer(item["plansConfigurations"]),
  };
}

export function pricingBatchPlanItemArraySerializer(result: Array<PricingBatchPlanItem>): any[] {
  return result.map((item) => {
    return pricingBatchPlanItemSerializer(item);
  });
}

export function pricingBatchPlanItemArrayDeserializer(result: Array<PricingBatchPlanItem>): any[] {
  return result.map((item) => {
    return pricingBatchPlanItemDeserializer(item);
  });
}

/** An individual pricing plan configuration. */
export interface PricingBatchPlanItem {
  /** Name of the pricing plan. */
  planName: string;
  /** Pricing configuration properties for the plan. */
  properties: PricingPropertiesReference;
  /** Status of this plan's update operation. This property is returned only after a PUT operation. */
  readonly operationStatus?: PricingPlanOperationStatus;
}

export function pricingBatchPlanItemSerializer(item: PricingBatchPlanItem): any {
  return {
    planName: item["planName"],
    properties: pricingPropertiesReferenceSerializer(item["properties"]),
  };
}

export function pricingBatchPlanItemDeserializer(item: any): PricingBatchPlanItem {
  return {
    planName: item["planName"],
    properties: pricingPropertiesReferenceDeserializer(item["properties"]),
    operationStatus: !item["operationStatus"]
      ? item["operationStatus"]
      : pricingPlanOperationStatusDeserializer(item["operationStatus"]),
  };
}

/** Reference to the pricing properties defined in pricings.json. */
export interface PricingPropertiesReference {}

export function pricingPropertiesReferenceSerializer(_item: PricingPropertiesReference): any {
  return {};
}

export function pricingPropertiesReferenceDeserializer(item: any): PricingPropertiesReference {
  return item;
}

/** Status of a pricing plan update operation. */
export interface PricingPlanOperationStatus {
  /** The operation status code. */
  code?: PricingPlanOperationStatusCode;
  /** Additional information about the operation result. */
  message?: string;
}

export function pricingPlanOperationStatusDeserializer(item: any): PricingPlanOperationStatus {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Status code for a pricing plan update operation. */
export enum KnownPricingPlanOperationStatusCode {
  /** The pricing plan was updated successfully. */
  Succeeded = "Succeeded",
  /** The pricing plan was not updated successfully. */
  Failed = "Failed",
}

/**
 * Status code for a pricing plan update operation. \
 * {@link KnownPricingPlanOperationStatusCode} can be used interchangeably with PricingPlanOperationStatusCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The pricing plan was updated successfully. \
 * **Failed**: The pricing plan was not updated successfully.
 */
export type PricingPlanOperationStatusCode = string;
