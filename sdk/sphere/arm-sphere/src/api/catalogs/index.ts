// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  uploadImage,
  listDevices,
  listDeviceInsights,
  listDeviceGroups,
  listDeployments,
  countDevices,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  CatalogsUploadImageOptionalParams,
  CatalogsListDevicesOptionalParams,
  CatalogsListDeviceInsightsOptionalParams,
  CatalogsListDeviceGroupsOptionalParams,
  CatalogsListDeploymentsOptionalParams,
  CatalogsCountDevicesOptionalParams,
  CatalogsListBySubscriptionOptionalParams,
  CatalogsListByResourceGroupOptionalParams,
  CatalogsDeleteOptionalParams,
  CatalogsUpdateOptionalParams,
  CatalogsCreateOrUpdateOptionalParams,
  CatalogsGetOptionalParams,
} from "./options.js";
