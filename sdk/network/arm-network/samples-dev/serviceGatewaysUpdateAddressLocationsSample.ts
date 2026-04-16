// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServiceGatewayUpdateAddressLocationsRequest} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates address locations within the service gateway.

The request supports both full and partial update modes at two levels: location and address.

Full update replaces all existing data.

Partial update modifies only the specified entries:

For location-level partial updates, if no address is provided, the existing address will be deleted.

For address-level partial updates, if no services are provided, the existing services will be considered for deletion.
 *
 * @summary Creates or updates address locations within the service gateway.

The request supports both full and partial update modes at two levels: location and address.

Full update replaces all existing data.

Partial update modifies only the specified entries:

For location-level partial updates, if no address is provided, the existing address will be deleted.

For address-level partial updates, if no services are provided, the existing services will be considered for deletion.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ServiceGatewayFullUpdateAddressLocationsRequest.json
 */
async function fullUpdateCreateUpdateOrDeleteAddressLocationsInTheServiceGateway(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const serviceGatewayName = "sg";
  const parameters: ServiceGatewayUpdateAddressLocationsRequest = {
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
        addresses: [
          { address: "10.0.0.5", services: ["Service2"] },
          { address: "10.0.0.6" },
        ],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.serviceGateways.beginUpdateAddressLocationsAndWait(
      resourceGroupName,
      serviceGatewayName,
      parameters,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates address locations within the service gateway.

The request supports both full and partial update modes at two levels: location and address.

Full update replaces all existing data.

Partial update modifies only the specified entries:

For location-level partial updates, if no address is provided, the existing address will be deleted.

For address-level partial updates, if no services are provided, the existing services will be considered for deletion.
 *
 * @summary Creates or updates address locations within the service gateway.

The request supports both full and partial update modes at two levels: location and address.

Full update replaces all existing data.

Partial update modifies only the specified entries:

For location-level partial updates, if no address is provided, the existing address will be deleted.

For address-level partial updates, if no services are provided, the existing services will be considered for deletion.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ServiceGatewayPartialUpdateAddressLocationsRequest.json
 */
async function partialUpdateCreateUpdateOrDeleteAddressLocationsInTheServiceGateway(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const serviceGatewayName = "sg";
  const parameters: ServiceGatewayUpdateAddressLocationsRequest = {
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
        addresses: [
          { address: "10.0.0.5", services: ["Service2"] },
          { address: "10.0.0.6" },
        ],
      },
      { addressLocation: "192.0.0.3" },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.serviceGateways.beginUpdateAddressLocationsAndWait(
      resourceGroupName,
      serviceGatewayName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await fullUpdateCreateUpdateOrDeleteAddressLocationsInTheServiceGateway();
  await partialUpdateCreateUpdateOrDeleteAddressLocationsInTheServiceGateway();
}

main().catch(console.error);
