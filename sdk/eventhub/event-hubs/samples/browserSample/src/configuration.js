// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/**
 * This file contains the configuration settings needed to authenticate and connect
 * to an Event Hub.
 *
 * These settings will be used both when sending and receiving events.
 */
module.exports = {
  /**
   * The full namespace likely similar to `<yournamespace>.servicebus.windows.net`.
   */
  fullyQualifiedNamespace: "namespace.servicebus.windows.net",
  /**
   * The name of the specific Event Hub to use when sending and receiving events.
   */
  eventHubName: "event-hub-name",
  /**
   * The name of the consumer group from which you want to process events.
   */
  consumerGroup: "consumer-group",
  /**
   * The Client (Application) id from the app registration you created.
   */
  appClientId: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  /**
   * The Tenant (Directory) id from the app registration you created.
   */
  appTenantId: "11111111-2222-3333-4444-555555555555"
};
