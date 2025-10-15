// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ComputeClient } from "./computeClient.js";
export {
  ResourceSku,
  ResourceSkuCapacity,
  ResourceSkuCapacityScaleType,
  ResourceSkuLocationInfo,
  ResourceSkuZoneDetails,
  ResourceSkuCapabilities,
  KnownExtendedLocationType,
  ExtendedLocationType,
  ResourceSkuCosts,
  ResourceSkuRestrictions,
  ResourceSkuRestrictionsType,
  ResourceSkuRestrictionInfo,
  ResourceSkuRestrictionsReasonCode,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  KnownVersions,
} from "./models/index.js";
export { ComputeClientOptionalParams } from "./api/index.js";
export { ResourceSkusListOptionalParams } from "./api/resourceSkus/index.js";
export { ResourceSkusOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
