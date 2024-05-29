// Licensed under the MIT license.

import { RequestParameters } from "@typespec/ts-http-runtime";
import {
  Asset,
  AssetUpdate,
  AssetEndpointProfile,
  AssetEndpointProfileUpdate,
} from "./models.js";

export type OperationsListParameters = RequestParameters;
export type OperationStatusGetParameters = RequestParameters;
export type AssetsGetParameters = RequestParameters;

export interface AssetsCreateOrReplaceBodyParam {
  /** Resource create parameters. */
  body: Asset;
}

export type AssetsCreateOrReplaceParameters = AssetsCreateOrReplaceBodyParam &
  RequestParameters;

export interface AssetsUpdateBodyParam {
  /** The resource properties to be updated. */
  body: AssetUpdate;
}

export type AssetsUpdateParameters = AssetsUpdateBodyParam & RequestParameters;
export type AssetsDeleteParameters = RequestParameters;
export type AssetsListByResourceGroupParameters = RequestParameters;
export type AssetsListBySubscriptionParameters = RequestParameters;
export type AssetEndpointProfilesGetParameters = RequestParameters;

export interface AssetEndpointProfilesCreateOrReplaceBodyParam {
  /** Resource create parameters. */
  body: AssetEndpointProfile;
}

export type AssetEndpointProfilesCreateOrReplaceParameters =
  AssetEndpointProfilesCreateOrReplaceBodyParam & RequestParameters;

export interface AssetEndpointProfilesUpdateBodyParam {
  /** The resource properties to be updated. */
  body: AssetEndpointProfileUpdate;
}

export type AssetEndpointProfilesUpdateParameters =
  AssetEndpointProfilesUpdateBodyParam & RequestParameters;
export type AssetEndpointProfilesDeleteParameters = RequestParameters;
export type AssetEndpointProfilesListByResourceGroupParameters =
  RequestParameters;
export type AssetEndpointProfilesListBySubscriptionParameters =
  RequestParameters;
