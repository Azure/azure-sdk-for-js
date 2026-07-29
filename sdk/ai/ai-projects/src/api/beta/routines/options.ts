// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RoutineTriggerUnion,
  RoutineActionUnion,
  RoutineDispatchPayloadUnion,
} from "../../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaRoutinesDispatchOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
  /** A direct action-input override sent downstream when testing a routine. */
  payload?: RoutineDispatchPayloadUnion;
}

/** Optional parameters. */
export interface BetaRoutinesListRunsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
  /** An optional MLflow search-runs filter expression applied within the routine's experiment. */
  filter?: string;
  /** The maximum number of runs to return. */
  limit?: number;
  /** An opaque cursor returned as last_id by the previous list-runs response. */
  after?: string;
  /** Unsupported. Reserved for future backward pagination support. */
  before?: string;
  /** The ordering direction. Supported values are asc and desc. */
  order?: string;
}

/** Optional parameters. */
export interface BetaRoutinesDeleteOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
}

/** Optional parameters. */
export interface BetaRoutinesListOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
  /** The maximum number of routines to return. */
  limit?: number;
  /** An opaque cursor returned as last_id by the previous list response. */
  after?: string;
  /** Unsupported. Reserved for future backward pagination support. */
  before?: string;
  /** The ordering direction. Supported values are asc and desc. */
  order?: string;
}

/** Optional parameters. */
export interface BetaRoutinesDisableOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
}

/** Optional parameters. */
export interface BetaRoutinesEnableOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
}

/** Optional parameters. */
export interface BetaRoutinesGetOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
}

/** Optional parameters. */
export interface BetaRoutinesCreateOrUpdateOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
  /** A human-readable description of the routine. */
  description?: string;
  /** Whether the routine is enabled. */
  enabled?: boolean;
  /** The triggers configured for the routine. In v1, exactly one trigger entry is supported. */
  triggers?: Record<string, RoutineTriggerUnion>;
  /** The action executed when the routine fires. */
  action?: RoutineActionUnion;
}
