// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext } from "../../api/providerHubContext.js";
import {
  listByProviderRegistration,
  $delete,
  createOrUpdate,
  get,
} from "../../api/notificationRegistrations/operations.js";
import type {
  NotificationRegistrationsListByProviderRegistrationOptionalParams,
  NotificationRegistrationsDeleteOptionalParams,
  NotificationRegistrationsCreateOrUpdateOptionalParams,
  NotificationRegistrationsGetOptionalParams,
} from "../../api/notificationRegistrations/options.js";
import type { NotificationRegistration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NotificationRegistrations operations. */
export interface NotificationRegistrationsOperations {
  /** Gets the list of the notification registrations for the given provider. */
  listByProviderRegistration: (
    providerNamespace: string,
    options?: NotificationRegistrationsListByProviderRegistrationOptionalParams,
  ) => PagedAsyncIterableIterator<NotificationRegistration>;
  /** Deletes a notification registration. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    providerNamespace: string,
    notificationRegistrationName: string,
    options?: NotificationRegistrationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a notification registration. */
  createOrUpdate: (
    providerNamespace: string,
    notificationRegistrationName: string,
    properties: NotificationRegistration,
    options?: NotificationRegistrationsCreateOrUpdateOptionalParams,
  ) => Promise<NotificationRegistration>;
  /** Gets the notification registration details. */
  get: (
    providerNamespace: string,
    notificationRegistrationName: string,
    options?: NotificationRegistrationsGetOptionalParams,
  ) => Promise<NotificationRegistration>;
}

function _getNotificationRegistrations(context: ProviderHubContext) {
  return {
    listByProviderRegistration: (
      providerNamespace: string,
      options?: NotificationRegistrationsListByProviderRegistrationOptionalParams,
    ) => listByProviderRegistration(context, providerNamespace, options),
    delete: (
      providerNamespace: string,
      notificationRegistrationName: string,
      options?: NotificationRegistrationsDeleteOptionalParams,
    ) => $delete(context, providerNamespace, notificationRegistrationName, options),
    createOrUpdate: (
      providerNamespace: string,
      notificationRegistrationName: string,
      properties: NotificationRegistration,
      options?: NotificationRegistrationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, providerNamespace, notificationRegistrationName, properties, options),
    get: (
      providerNamespace: string,
      notificationRegistrationName: string,
      options?: NotificationRegistrationsGetOptionalParams,
    ) => get(context, providerNamespace, notificationRegistrationName, options),
  };
}

export function _getNotificationRegistrationsOperations(
  context: ProviderHubContext,
): NotificationRegistrationsOperations {
  return {
    ..._getNotificationRegistrations(context),
  };
}
