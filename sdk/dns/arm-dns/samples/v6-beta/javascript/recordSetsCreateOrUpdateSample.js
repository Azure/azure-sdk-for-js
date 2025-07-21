// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-dns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateAAAARecordset.json
 */
async function createAaaaRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "AAAA", {
    properties: {
      aaaaRecords: [{ ipv6Address: "::1" }],
      ttl: 3600,
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateARecordSetTrafficManagementProfile.json
 */
async function createARecordsetWithTrafficManagementProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "A", {
    properties: {
      ttl: 3600,
      metadata: { key1: "value1" },
      trafficManagementProfile: {
        id: "/subscriptions/726f8cd6-6459-4db4-8e6d-2cd2716904e2/resourceGroups/test/providers/Microsoft.Network/trafficManagerProfiles/testpp2",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateARecordset.json
 */
async function createARecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "A", {
    properties: {
      aRecords: [{ ipv4Address: "127.0.0.1" }],
      ttl: 3600,
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateARecordsetAlias.json
 */
async function createARecordsetWithAliasTargetResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "A", {
    properties: {
      ttl: 3600,
      metadata: { key1: "value1" },
      targetResource: {
        id: "/subscriptions/726f8cd6-6459-4db4-8e6d-2cd2716904e2/resourceGroups/test/providers/Microsoft.Network/trafficManagerProfiles/testpp2",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateCNAMERecordset.json
 */
async function createCnameRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "CNAME", {
    properties: {
      cnameRecord: { cname: "contoso.com" },
      ttl: 3600,
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateCaaRecordset.json
 */
async function createCAARecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "CAA", {
    properties: {
      ttl: 3600,
      caaRecords: [{ flags: 0, tag: "issue", value: "ca.contoso.com" }],
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateDSRecordset.json
 */
async function createDSRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "DS", {
    properties: {
      dsRecords: [
        {
          algorithm: 5,
          digest: {
            algorithmType: 1,
            value: "2BB183AF5F22588179A53B0A98631FAD1A292118",
          },
          keyTag: 60485,
        },
      ],
      ttl: 3600,
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateMXRecordset.json
 */
async function createMXRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "MX", {
    properties: {
      mxRecords: [{ exchange: "mail.contoso.com", preference: 0 }],
      ttl: 3600,
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateNAPTRRecordset.json
 */
async function createNaptrRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "NAPTR", {
    properties: {
      naptrRecords: [
        {
          flags: "U",
          order: 100,
          preference: 10,
          regexp: "!^.*$!sip:user@example.com!",
          replacement: "",
          services: "E2U+sip",
        },
      ],
      ttl: 3600,
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateNSRecordset.json
 */
async function createNSRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "NS", {
    properties: {
      nsRecords: [{ nsdname: "ns1.contoso.com" }],
      ttl: 3600,
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdatePTRRecordset.json
 */
async function createPTRRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "0.0.127.in-addr.arpa", "1", "PTR", {
    properties: {
      ptrRecords: [{ ptrdname: "localhost" }],
      ttl: 3600,
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateSOARecordset.json
 */
async function createSOARecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "@", "SOA", {
    properties: {
      soaRecord: {
        email: "hostmaster.contoso.com",
        expireTime: 2419200,
        host: "ns1.contoso.com",
        minimumTtl: 300,
        refreshTime: 3600,
        retryTime: 300,
        serialNumber: 1,
      },
      ttl: 3600,
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateSRVRecordset.json
 */
async function createSRVRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "SRV", {
    properties: {
      srvRecords: [{ port: 80, priority: 0, target: "contoso.com", weight: 10 }],
      ttl: 3600,
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateTLSARecordset.json
 */
async function createTlsaRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "TLSA", {
    properties: {
      tlsaRecords: [
        {
          certAssociationData: "6EC8A4B7F511454D84DCC055213B8D195E8ADA751FE14300AFE32D54B162438B",
          matchingType: 1,
          selector: 1,
          usage: 3,
        },
      ],
      ttl: 3600,
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 *
 * @summary creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateTXTRecordset.json
 */
async function createTXTRecordset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.recordSets.createOrUpdate("rg1", "zone1", "record1", "TXT", {
    properties: {
      ttl: 3600,
      txtRecords: [{ value: ["string1", "string2"] }],
      metadata: { key1: "value1" },
    },
  });
  console.log(result);
}

async function main() {
  await createAaaaRecordset();
  await createARecordsetWithTrafficManagementProfile();
  await createARecordset();
  await createARecordsetWithAliasTargetResource();
  await createCnameRecordset();
  await createCAARecordset();
  await createDSRecordset();
  await createMXRecordset();
  await createNaptrRecordset();
  await createNSRecordset();
  await createPTRRecordset();
  await createSOARecordset();
  await createSRVRecordset();
  await createTlsaRecordset();
  await createTXTRecordset();
}

main().catch(console.error);
