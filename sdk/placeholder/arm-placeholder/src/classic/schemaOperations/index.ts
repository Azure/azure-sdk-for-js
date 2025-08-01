// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsContext } from "../../api/messagingConnectorsContext.js";
import { fetch } from "../../api/schemaOperations/operations.js";
import { SchemaOperationsFetchOptionalParams } from "../../api/schemaOperations/options.js";
import {
  SchemaRequestProperties,
  SchemaResult,
} from "../../models/azure/mgmt/placeholder/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SchemaOperations operations. */
export interface SchemaOperationsOperations {
  /** fetch Schema task */
  fetch: (
    location: string,
    body: SchemaRequestProperties,
    options?: SchemaOperationsFetchOptionalParams,
  ) => PollerLike<OperationState<SchemaResult>, SchemaResult>;
}

function _getSchemaOperations(context: MessagingConnectorsContext) {
  return {
    fetch: (
      location: string,
      body: SchemaRequestProperties,
      options?: SchemaOperationsFetchOptionalParams,
    ) => fetch(context, location, body, options),
  };
}

export function _getSchemaOperationsOperations(
  context: MessagingConnectorsContext,
): SchemaOperationsOperations {
  return {
    ..._getSchemaOperations(context),
  };
}
