// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { ArcDeploymentSku, CreateOrUpdateArcDeploymentProperties } from "../models.js";
import {
  arcDeploymentSkuSerializer,
  createOrUpdateArcDeploymentPropertiesSerializer,
} from "../models.js";

/** Writable Arc deployment content for the JavaScript SDK. */
export interface ArcDeploymentCreateOrUpdateContent {
  /** Properties used to create or replace an Arc deployment. */
  properties: CreateOrUpdateArcDeploymentProperties;
  /** The Arc deployment SKU. */
  sku: ArcDeploymentSku;
}

export function arcDeploymentCreateOrUpdateContentSerializer(
  item: ArcDeploymentCreateOrUpdateContent,
): any {
  return {
    properties: createOrUpdateArcDeploymentPropertiesSerializer(item["properties"]),
    sku: arcDeploymentSkuSerializer(item["sku"]),
  };
}
