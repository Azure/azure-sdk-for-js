// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PageOrder } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatasetsDeleteGenerationJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "DataGenerationJobs=V1Preview";
}

/** Optional parameters. */
export interface DatasetsCancelGenerationJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "DataGenerationJobs=V1Preview";
}

/** Optional parameters. */
export interface DatasetsCreateGenerationJobOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "DataGenerationJobs=V1Preview";
  /** Client-generated unique ID for idempotent retries. When absent, the server creates the job unconditionally. */
  operationId?: string;
}

/** Optional parameters. */
export interface DatasetsListGenerationJobsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "DataGenerationJobs=V1Preview";
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and`desc`
   * for descending order.
   */
  order?: PageOrder;
  /**
   * A cursor for use in pagination. `after` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include after=obj_foo in order to fetch the next page of the list.
   */
  after?: string;
  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include before=obj_foo in order to fetch the previous page of the list.
   */
  before?: string;
}

/** Optional parameters. */
export interface DatasetsGetGenerationJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "DataGenerationJobs=V1Preview";
}

/** Optional parameters. */
export interface DatasetsGetCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatasetsPendingUploadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatasetsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatasetsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatasetsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatasetsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatasetsListVersionsOptionalParams extends OperationOptions {}
