// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewManagementContext } from "../../api/purviewManagementContext.js";
import {
  listByAccount,
  $delete,
  createOrUpdate,
  get,
} from "../../api/kafkaConfigurations/operations.js";
import type {
  KafkaConfigurationsListByAccountOptionalParams,
  KafkaConfigurationsDeleteOptionalParams,
  KafkaConfigurationsCreateOrUpdateOptionalParams,
  KafkaConfigurationsGetOptionalParams,
} from "../../api/kafkaConfigurations/options.js";
import type { KafkaConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a KafkaConfigurations operations. */
export interface KafkaConfigurationsOperations {
  /** Lists the Kafka configurations in the Account */
  listByAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: KafkaConfigurationsListByAccountOptionalParams,
  ) => PagedAsyncIterableIterator<KafkaConfiguration>;
  /** Deletes a KafkaConfiguration resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    kafkaConfigurationName: string,
    options?: KafkaConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update Kafka Configuration */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    kafkaConfigurationName: string,
    kafkaConfiguration: KafkaConfiguration,
    options?: KafkaConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<KafkaConfiguration>;
  /** Gets the kafka configuration for the account */
  get: (
    resourceGroupName: string,
    accountName: string,
    kafkaConfigurationName: string,
    options?: KafkaConfigurationsGetOptionalParams,
  ) => Promise<KafkaConfiguration>;
}

function _getKafkaConfigurations(context: PurviewManagementContext) {
  return {
    listByAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: KafkaConfigurationsListByAccountOptionalParams,
    ) => listByAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      kafkaConfigurationName: string,
      options?: KafkaConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, kafkaConfigurationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      kafkaConfigurationName: string,
      kafkaConfiguration: KafkaConfiguration,
      options?: KafkaConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        kafkaConfigurationName,
        kafkaConfiguration,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      kafkaConfigurationName: string,
      options?: KafkaConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, kafkaConfigurationName, options),
  };
}

export function _getKafkaConfigurationsOperations(
  context: PurviewManagementContext,
): KafkaConfigurationsOperations {
  return {
    ..._getKafkaConfigurations(context),
  };
}
