// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates address locations within the service gateway.
 *
 * The request supports both full and partial update modes at two levels: location and address.
 *
 * Full update replaces all existing data.
 *
 * Partial update modifies only the specified entries:
 *
 * For location-level partial updates, if no address is provided, the existing address will be deleted.
 *
 * For address-level partial updates, if no services are provided, the existing services will be considered for deletion.
 *
 * @summary creates or updates address locations within the service gateway.
 *
 * The request supports both full and partial update modes at two levels: location and address.
 *
 * Full update replaces all existing data.
 *
 * Partial update modifies only the specified entries:
 *
 * For location-level partial updates, if no address is provided, the existing address will be deleted.
 *
 * For address-level partial updates, if no services are provided, the existing services will be considered for deletion.
 * x-ms-original-file: 2025-05-01/ServiceGatewayFullUpdateAddressLocationsRequest.json
 */
async function fullUpdateCreateUpdateOrDeleteAddressLocationsInTheServiceGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.serviceGateways.updateAddressLocations("rg1", "sg", {
    action: "FullUpdate",
    addressLocations: [
      {
        addressLocation: "192.0.0.1",
        addressUpdateAction: "FullUpdate",
        addresses: [{ address: "10.0.0.4", services: ["Service1"] }],
      },
      {
        addressLocation: "192.0.0.2",
        addressUpdateAction: "PartialUpdate",
        addresses: [{ address: "10.0.0.5", services: ["Service2"] }, { address: "10.0.0.6" }],
      },
    ],
  });
}

/**
 * This sample demonstrates how to creates or updates address locations within the service gateway.
 *
 * The request supports both full and partial update modes at two levels: location and address.
 *
 * Full update replaces all existing data.
 *
 * Partial update modifies only the specified entries:
 *
 * For location-level partial updates, if no address is provided, the existing address will be deleted.
 *
 * For address-level partial updates, if no services are provided, the existing services will be considered for deletion.
 *
 * @summary creates or updates address locations within the service gateway.
 *
 * The request supports both full and partial update modes at two levels: location and address.
 *
 * Full update replaces all existing data.
 *
 * Partial update modifies only the specified entries:
 *
 * For location-level partial updates, if no address is provided, the existing address will be deleted.
 *
 * For address-level partial updates, if no services are provided, the existing services will be considered for deletion.
 * x-ms-original-file: 2025-05-01/ServiceGatewayPartialUpdateAddressLocationsRequest.json
 */
async function partialUpdateCreateUpdateOrDeleteAddressLocationsInTheServiceGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.serviceGateways.updateAddressLocations("rg1", "sg", {
    action: "PartialUpdate",
    addressLocations: [
      {
        addressLocation: "192.0.0.1",
        addressUpdateAction: "FullUpdate",
        addresses: [{ address: "10.0.0.4", services: ["Service1"] }],
      },
      {
        addressLocation: "192.0.0.2",
        addressUpdateAction: "PartialUpdate",
        addresses: [{ address: "10.0.0.5", services: ["Service2"] }, { address: "10.0.0.6" }],
      },
      { addressLocation: "192.0.0.3" },
    ],
  });
}

async function main(): Promise<void> {
  await fullUpdateCreateUpdateOrDeleteAddressLocationsInTheServiceGateway();
  await partialUpdateCreateUpdateOrDeleteAddressLocationsInTheServiceGateway();
}

main().catch(console.error);
