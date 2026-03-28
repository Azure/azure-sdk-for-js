// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import { invoke } from "../../api/lookingGlass/operations.js";
import type { LookingGlassInvokeOptionalParams } from "../../api/lookingGlass/options.js";
import type {
  LookingGlassOutput,
  LookingGlassCommand,
  LookingGlassSourceType,
} from "../../models/models.js";

/** Interface representing a LookingGlass operations. */
export interface LookingGlassOperations {
  /** Run looking glass functionality */
  invoke: (
    command: LookingGlassCommand,
    sourceType: LookingGlassSourceType,
    sourceLocation: string,
    destinationIP: string,
    options?: LookingGlassInvokeOptionalParams,
  ) => Promise<LookingGlassOutput>;
}

function _getLookingGlass(context: PeeringManagementContext) {
  return {
    invoke: (
      command: LookingGlassCommand,
      sourceType: LookingGlassSourceType,
      sourceLocation: string,
      destinationIP: string,
      options?: LookingGlassInvokeOptionalParams,
    ) => invoke(context, command, sourceType, sourceLocation, destinationIP, options),
  };
}

export function _getLookingGlassOperations(
  context: PeeringManagementContext,
): LookingGlassOperations {
  return {
    ..._getLookingGlass(context),
  };
}
