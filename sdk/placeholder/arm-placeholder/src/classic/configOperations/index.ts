// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsContext } from "../../api/messagingConnectorsContext.js";
import {
  dataPreviewValidation,
  connectorValidation,
} from "../../api/configOperations/operations.js";
import {
  ConfigOperationsDataPreviewValidationOptionalParams,
  ConfigOperationsConnectorValidationOptionalParams,
} from "../../api/configOperations/options.js";
import {
  ConnectorConfigurationValidationRequest,
  ValidationResult,
  DataPreviewConfigurationValidationRequest,
} from "../../models/azure/mgmt/placeholder/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConfigOperations operations. */
export interface ConfigOperationsOperations {
  /** create one validation task for datapreview config */
  dataPreviewValidation: (
    location: string,
    body: DataPreviewConfigurationValidationRequest,
    options?: ConfigOperationsDataPreviewValidationOptionalParams,
  ) => PollerLike<OperationState<ValidationResult>, ValidationResult>;
  /** create one validation task for connector config */
  connectorValidation: (
    location: string,
    body: ConnectorConfigurationValidationRequest,
    options?: ConfigOperationsConnectorValidationOptionalParams,
  ) => PollerLike<OperationState<ValidationResult>, ValidationResult>;
}

function _getConfigOperations(context: MessagingConnectorsContext) {
  return {
    dataPreviewValidation: (
      location: string,
      body: DataPreviewConfigurationValidationRequest,
      options?: ConfigOperationsDataPreviewValidationOptionalParams,
    ) => dataPreviewValidation(context, location, body, options),
    connectorValidation: (
      location: string,
      body: ConnectorConfigurationValidationRequest,
      options?: ConfigOperationsConnectorValidationOptionalParams,
    ) => connectorValidation(context, location, body, options),
  };
}

export function _getConfigOperationsOperations(
  context: MessagingConnectorsContext,
): ConfigOperationsOperations {
  return {
    ..._getConfigOperations(context),
  };
}
