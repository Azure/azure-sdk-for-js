// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FeatureFlag, FeatureFlagFields } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FeatureFlagClientCheckFeatureFlagRevisionsOptionalParams extends OperationOptions {
  /** A filter used to match names. */
  name?: string;
  /**
   * A filter used to match labels. Syntax reference:
   * https://aka.ms/azconfig/docs/restapirevisions
   */
  label?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: FeatureFlagFields[];
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/restapirevisions
   */
  tags?: string[];
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
/** Optional parameters. */
export interface FeatureFlagClientGetFeatureFlagRevisionsOptionalParams extends OperationOptions {
  /** A filter used to match names. */
  name?: string;
  /**
   * A filter used to match labels. Syntax reference:
   * https://aka.ms/azconfig/docs/restapirevisions
   */
  label?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: FeatureFlagFields[];
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/restapirevisions
   */
  tags?: string[];
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
/** Optional parameters. */
export interface FeatureFlagClientDeleteFeatureFlagOptionalParams extends OperationOptions {
  /** The label of the feature flag to delete. */
  label?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
/** Optional parameters. */
export interface FeatureFlagClientPutFeatureFlagOptionalParams extends OperationOptions {
  /** The label of the feature flag to create. */
  label?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /** The feature flag to create. */
  entity?: FeatureFlag;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
/** Optional parameters. */
export interface FeatureFlagClientCheckFeatureFlagOptionalParams extends OperationOptions {
  /** The label of the feature flag to retrieve. */
  label?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: FeatureFlagFields[];
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  tags?: string[];
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
/** Optional parameters. */
export interface FeatureFlagClientGetFeatureFlagOptionalParams extends OperationOptions {
  /** The label of the feature flag to retrieve. */
  label?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: FeatureFlagFields[];
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  tags?: string[];
}
/** Optional parameters. */
export interface FeatureFlagClientCheckFeatureFlagsOptionalParams extends OperationOptions {
  /** A filter used to match feature flag names. */
  name?: string;
  /**
   * A filter used to match labels. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  label?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: FeatureFlagFields[];
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  tags?: string[];
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
/** Optional parameters. */
export interface FeatureFlagClientGetFeatureFlagsOptionalParams extends OperationOptions {
  /** A filter used to match feature flag names. */
  name?: string;
  /**
   * A filter used to match labels. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  label?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: FeatureFlagFields[];
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  tags?: string[];
}
