// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { TrafficManagerManagementClient } = require("@azure/arm-trafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Traffic Manager endpoint.
 *
 * @summary create or update a Traffic Manager endpoint.
 * x-ms-original-file: 2024-04-01-preview/Endpoint-PUT-External-WithAlwaysServe.json
 */
async function endpointPUTExternalWithAlwaysServe() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "azuresdkfornetautoresttrafficmanager1421",
    "azsmnet6386",
    "ExternalEndpoints",
    "azsmnet7187",
    {
      name: "azsmnet7187",
      type: "Microsoft.network/TrafficManagerProfiles/ExternalEndpoints",
      alwaysServe: "Enabled",
      endpointLocation: "North Europe",
      endpointStatus: "Enabled",
      target: "foobar.contoso.com",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Traffic Manager endpoint.
 *
 * @summary create or update a Traffic Manager endpoint.
 * x-ms-original-file: 2024-04-01-preview/Endpoint-PUT-External-WithCustomHeaders.json
 */
async function endpointPUTExternalWithCustomHeaders() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "azuresdkfornetautoresttrafficmanager1421",
    "azsmnet6386",
    "ExternalEndpoints",
    "azsmnet7187",
    {
      name: "azsmnet7187",
      type: "Microsoft.network/TrafficManagerProfiles/ExternalEndpoints",
      customHeaders: [
        { name: "header-1", value: "value-1" },
        { name: "header-2", value: "value-2" },
      ],
      endpointLocation: "North Europe",
      endpointStatus: "Enabled",
      target: "foobar.contoso.com",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Traffic Manager endpoint.
 *
 * @summary create or update a Traffic Manager endpoint.
 * x-ms-original-file: 2024-04-01-preview/Endpoint-PUT-External-WithGeoMapping.json
 */
async function endpointPUTExternalWithGeoMapping() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "azuresdkfornetautoresttrafficmanager2191",
    "azuresdkfornetautoresttrafficmanager8224",
    "ExternalEndpoints",
    "My%20external%20endpoint",
    {
      name: "My external endpoint",
      type: "Microsoft.network/TrafficManagerProfiles/ExternalEndpoints",
      endpointStatus: "Enabled",
      geoMapping: ["GEO-AS", "GEO-AF"],
      target: "foobar.contoso.com",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Traffic Manager endpoint.
 *
 * @summary create or update a Traffic Manager endpoint.
 * x-ms-original-file: 2024-04-01-preview/Endpoint-PUT-External-WithLocation.json
 */
async function endpointPUTExternalWithLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "azuresdkfornetautoresttrafficmanager1421",
    "azsmnet6386",
    "ExternalEndpoints",
    "azsmnet7187",
    {
      name: "azsmnet7187",
      type: "Microsoft.network/TrafficManagerProfiles/ExternalEndpoints",
      endpointLocation: "North Europe",
      endpointStatus: "Enabled",
      target: "foobar.contoso.com",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Traffic Manager endpoint.
 *
 * @summary create or update a Traffic Manager endpoint.
 * x-ms-original-file: 2024-04-01-preview/Endpoint-PUT-External-WithSubnetMapping.json
 */
async function endpointPUTExternalWithSubnetMapping() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "azuresdkfornetautoresttrafficmanager2191",
    "azuresdkfornetautoresttrafficmanager8224",
    "ExternalEndpoints",
    "My%20external%20endpoint",
    {
      name: "My external endpoint",
      type: "Microsoft.network/TrafficManagerProfiles/ExternalEndpoints",
      endpointStatus: "Enabled",
      subnets: [
        { first: "1.2.3.0", scope: 24 },
        { first: "25.26.27.28", last: "29.30.31.32" },
      ],
      target: "foobar.contoso.com",
    },
  );
  console.log(result);
}

async function main() {
  await endpointPUTExternalWithAlwaysServe();
  await endpointPUTExternalWithCustomHeaders();
  await endpointPUTExternalWithGeoMapping();
  await endpointPUTExternalWithLocation();
  await endpointPUTExternalWithSubnetMapping();
}

main().catch(console.error);
