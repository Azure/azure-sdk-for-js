// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Traffic Manager profile.
 *
 * @summary create or update a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-PUT-MultiValue.json
 */
async function profilePUTMultiValue(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.createOrUpdate(
    "azuresdkfornetautoresttrafficmanager1421",
    "azsmnet6386",
    {
      location: "global",
      dnsConfig: { relativeName: "azsmnet6386", ttl: 35 },
      maxReturn: 2,
      monitorConfig: { path: "/testpath.aspx", port: 80, protocol: "HTTP" },
      profileStatus: "Enabled",
      trafficRoutingMethod: "MultiValue",
      trafficViewEnrollmentStatus: "Disabled",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Traffic Manager profile.
 *
 * @summary create or update a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-PUT-NoEndpoints.json
 */
async function profilePUTNoEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.createOrUpdate(
    "azuresdkfornetautoresttrafficmanager1421",
    "azsmnet6386",
    {
      location: "global",
      dnsConfig: { relativeName: "azsmnet6386", ttl: 35 },
      monitorConfig: { path: "/testpath.aspx", port: 80, protocol: "HTTP" },
      profileStatus: "Enabled",
      trafficRoutingMethod: "Performance",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Traffic Manager profile.
 *
 * @summary create or update a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-PUT-WithAliasing.json
 */
async function profilePUTWithAliasing(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.createOrUpdate(
    "azuresdkfornetautoresttrafficmanager2583",
    "azuresdkfornetautoresttrafficmanager6192",
    {
      location: "global",
      allowedEndpointRecordTypes: ["DomainName"],
      dnsConfig: { relativeName: "azuresdkfornetautoresttrafficmanager6192", ttl: 35 },
      endpoints: [
        {
          name: "My external endpoint",
          type: "Microsoft.network/TrafficManagerProfiles/ExternalEndpoints",
          endpointLocation: "North Europe",
          endpointStatus: "Enabled",
          target: "foobar.contoso.com",
        },
      ],
      monitorConfig: {
        path: "/testpath.aspx",
        intervalInSeconds: 10,
        port: 80,
        timeoutInSeconds: 5,
        toleratedNumberOfFailures: 2,
        protocol: "HTTP",
      },
      profileStatus: "Enabled",
      trafficRoutingMethod: "Performance",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Traffic Manager profile.
 *
 * @summary create or update a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-PUT-WithCustomHeaders.json
 */
async function profilePUTWithCustomHeaders(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.createOrUpdate(
    "azuresdkfornetautoresttrafficmanager2583",
    "azuresdkfornetautoresttrafficmanager6192",
    {
      location: "global",
      dnsConfig: { relativeName: "azuresdkfornetautoresttrafficmanager6192", ttl: 35 },
      endpoints: [
        {
          name: "My external endpoint",
          type: "Microsoft.network/TrafficManagerProfiles/ExternalEndpoints",
          customHeaders: [{ name: "header-2", value: "value-2-overridden" }],
          endpointLocation: "North Europe",
          endpointStatus: "Enabled",
          target: "foobar.contoso.com",
        },
      ],
      monitorConfig: {
        path: "/testpath.aspx",
        customHeaders: [
          { name: "header-1", value: "value-1" },
          { name: "header-2", value: "value-2" },
        ],
        expectedStatusCodeRanges: [
          { max: 205, min: 200 },
          { max: 410, min: 400 },
        ],
        intervalInSeconds: 10,
        port: 80,
        timeoutInSeconds: 5,
        toleratedNumberOfFailures: 2,
        protocol: "HTTP",
      },
      profileStatus: "Enabled",
      trafficRoutingMethod: "Performance",
      trafficViewEnrollmentStatus: "Disabled",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Traffic Manager profile.
 *
 * @summary create or update a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-PUT-WithEndpoints.json
 */
async function profilePUTWithEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.createOrUpdate(
    "azuresdkfornetautoresttrafficmanager2583",
    "azuresdkfornetautoresttrafficmanager6192",
    {
      location: "global",
      dnsConfig: { relativeName: "azuresdkfornetautoresttrafficmanager6192", ttl: 35 },
      endpoints: [
        {
          name: "My external endpoint",
          type: "Microsoft.network/TrafficManagerProfiles/ExternalEndpoints",
          endpointLocation: "North Europe",
          endpointStatus: "Enabled",
          target: "foobar.contoso.com",
        },
      ],
      monitorConfig: {
        path: "/testpath.aspx",
        intervalInSeconds: 10,
        port: 80,
        timeoutInSeconds: 5,
        toleratedNumberOfFailures: 2,
        protocol: "HTTP",
      },
      profileStatus: "Enabled",
      trafficRoutingMethod: "Performance",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Traffic Manager profile.
 *
 * @summary create or update a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-PUT-WithEndpointsAndRecordType.json
 */
async function profilePUTWithEndpointsAndRecordType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.createOrUpdate(
    "azuresdkfornetautoresttrafficmanager2583",
    "azuresdkfornetautoresttrafficmanager6192",
    {
      profileStatus: "Enabled",
      trafficRoutingMethod: "Performance",
      dnsConfig: { relativeName: "azuresdkfornetautoresttrafficmanager6192", ttl: 35 },
      monitorConfig: {
        protocol: "HTTP",
        port: 80,
        path: "/testpath.aspx",
        intervalInSeconds: 10,
        timeoutInSeconds: 5,
        toleratedNumberOfFailures: 2,
      },
      endpoints: [
        {
          name: "My external endpoint",
          type: "Microsoft.network/TrafficManagerProfiles/ExternalEndpoints",
          target: "foobar.contoso.com",
          endpointStatus: "Enabled",
          endpointLocation: "North Europe",
        },
      ],
      recordType: "CNAME",
      location: "global",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Traffic Manager profile.
 *
 * @summary create or update a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-PUT-WithNestedEndpoints.json
 */
async function profilePUTWithNestedEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.createOrUpdate("myresourcegroup", "parentprofile", {
    location: "global",
    dnsConfig: { relativeName: "parentprofile", ttl: 35 },
    endpoints: [
      {
        name: "MyFirstNestedEndpoint",
        type: "Microsoft.Network/trafficManagerProfiles/nestedEndpoints",
        endpointStatus: "Enabled",
        minChildEndpoints: 2,
        minChildEndpointsIPv4: 1,
        minChildEndpointsIPv6: 2,
        priority: 1,
        target: "firstnestedprofile.tmpreview.watmtest.azure-test.net",
        weight: 1,
      },
      {
        name: "MySecondNestedEndpoint",
        type: "Microsoft.Network/trafficManagerProfiles/nestedEndpoints",
        endpointStatus: "Enabled",
        minChildEndpoints: 2,
        minChildEndpointsIPv4: 2,
        minChildEndpointsIPv6: 1,
        priority: 2,
        target: "secondnestedprofile.tmpreview.watmtest.azure-test.net",
        weight: 1,
      },
    ],
    monitorConfig: {
      path: "/testpath.aspx",
      intervalInSeconds: 10,
      port: 80,
      timeoutInSeconds: 5,
      toleratedNumberOfFailures: 2,
      protocol: "HTTP",
    },
    profileStatus: "Enabled",
    trafficRoutingMethod: "Priority",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await profilePUTMultiValue();
  await profilePUTNoEndpoints();
  await profilePUTWithAliasing();
  await profilePUTWithCustomHeaders();
  await profilePUTWithEndpoints();
  await profilePUTWithEndpointsAndRecordType();
  await profilePUTWithNestedEndpoints();
}

main().catch(console.error);
