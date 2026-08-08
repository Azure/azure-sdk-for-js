// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationContext } from "../../api/appConfigurationContext.js";
import {
  checkFeatureFlagRevisions,
  getFeatureFlagRevisions,
  deleteFeatureFlag,
  putFeatureFlag,
  checkFeatureFlag,
  getFeatureFlag,
  checkFeatureFlags,
  getFeatureFlags,
} from "../../api/featureFlagClient/operations.js";
import {
  FeatureFlagClientCheckFeatureFlagRevisionsOptionalParams,
  FeatureFlagClientGetFeatureFlagRevisionsOptionalParams,
  FeatureFlagClientDeleteFeatureFlagOptionalParams,
  FeatureFlagClientPutFeatureFlagOptionalParams,
  FeatureFlagClientCheckFeatureFlagOptionalParams,
  FeatureFlagClientGetFeatureFlagOptionalParams,
  FeatureFlagClientCheckFeatureFlagsOptionalParams,
  FeatureFlagClientGetFeatureFlagsOptionalParams,
} from "../../api/featureFlagClient/options.js";
import { FeatureFlag } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a FeatureFlagClient operations. */
export interface FeatureFlagClientOperations {
  /** Requests the headers and status of the given resource. */
  checkFeatureFlagRevisions: (
    options?: FeatureFlagClientCheckFeatureFlagRevisionsOptionalParams,
  ) => Promise<void>;
  /** Gets a list of feature flag revisions. */
  getFeatureFlagRevisions: (
    options?: FeatureFlagClientGetFeatureFlagRevisionsOptionalParams,
  ) => PagedAsyncIterableIterator<FeatureFlag>;
  /** Deletes a feature flag. */
  deleteFeatureFlag: (
    name: string,
    options?: FeatureFlagClientDeleteFeatureFlagOptionalParams,
  ) => Promise<FeatureFlag | void>;
  /** Creates a feature flag. */
  putFeatureFlag: (
    name: string,
    options?: FeatureFlagClientPutFeatureFlagOptionalParams,
  ) => Promise<FeatureFlag>;
  /** Requests the headers and status of the given resource. */
  checkFeatureFlag: (
    name: string,
    options?: FeatureFlagClientCheckFeatureFlagOptionalParams,
  ) => Promise<void>;
  /** Gets a single feature flag. */
  getFeatureFlag: (
    name: string,
    options?: FeatureFlagClientGetFeatureFlagOptionalParams,
  ) => Promise<FeatureFlag>;
  /** Requests the headers and status of the given resource. */
  checkFeatureFlags: (options?: FeatureFlagClientCheckFeatureFlagsOptionalParams) => Promise<void>;
  /** Gets a list of feature flags. */
  getFeatureFlags: (
    options?: FeatureFlagClientGetFeatureFlagsOptionalParams,
  ) => PagedAsyncIterableIterator<FeatureFlag>;
}
function _getFeatureFlagClient(context: AppConfigurationContext) {
  return {
    checkFeatureFlagRevisions: (
      options?: FeatureFlagClientCheckFeatureFlagRevisionsOptionalParams,
    ) => checkFeatureFlagRevisions(context, options),
    getFeatureFlagRevisions: (options?: FeatureFlagClientGetFeatureFlagRevisionsOptionalParams) =>
      getFeatureFlagRevisions(context, options),
    deleteFeatureFlag: (name: string, options?: FeatureFlagClientDeleteFeatureFlagOptionalParams) =>
      deleteFeatureFlag(context, name, options),
    putFeatureFlag: (name: string, options?: FeatureFlagClientPutFeatureFlagOptionalParams) =>
      putFeatureFlag(context, name, options),
    checkFeatureFlag: (name: string, options?: FeatureFlagClientCheckFeatureFlagOptionalParams) =>
      checkFeatureFlag(context, name, options),
    getFeatureFlag: (name: string, options?: FeatureFlagClientGetFeatureFlagOptionalParams) =>
      getFeatureFlag(context, name, options),
    checkFeatureFlags: (options?: FeatureFlagClientCheckFeatureFlagsOptionalParams) =>
      checkFeatureFlags(context, options),
    getFeatureFlags: (options?: FeatureFlagClientGetFeatureFlagsOptionalParams) =>
      getFeatureFlags(context, options),
  };
}
export function _getFeatureFlagClientOperations(
  context: AppConfigurationContext,
): FeatureFlagClientOperations {
  return {
    ..._getFeatureFlagClient(context),
  };
}
