// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DnsResolverManagementClient } = require("@azure/arm-dnsresolver");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to uploads or downloads the list of domains for a DNS Resolver Domain List from a storage link.
 *
 * @summary uploads or downloads the list of domains for a DNS Resolver Domain List from a storage link.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_BulkDownload.json
 */
async function downloadDNSResolverDomainListDomains() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverDomainLists.bulk(
    "sampleResourceGroup",
    "sampleDnsResolverDomainList",
    {
      properties: {
        action: "Download",
        storageUrl:
          "https://sampleStorageAccount.blob.core.windows.net/sample-container/sampleBlob.txt?sv=2022-11-02&sr=b&sig=39Up9jzHkxhUIhFEjEh9594DJxe7w6cIRCgOV6ICGS0%3A377&sp=rcw",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to uploads or downloads the list of domains for a DNS Resolver Domain List from a storage link.
 *
 * @summary uploads or downloads the list of domains for a DNS Resolver Domain List from a storage link.
 * x-ms-original-file: 2025-10-01-preview/DnsResolverDomainList_BulkUpload.json
 */
async function uploadDNSResolverDomainListDomains() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abdd4249-9f34-4cc6-8e42-c2e32110603e";
  const client = new DnsResolverManagementClient(credential, subscriptionId);
  const result = await client.dnsResolverDomainLists.bulk(
    "sampleResourceGroup",
    "sampleDnsResolverDomainList",
    {
      properties: {
        action: "Upload",
        storageUrl:
          "https://sampleStorageAccount.blob.core.windows.net/sample-container/sampleBlob.txt?sv=2022-11-02&sr=b&sig=39Up9jzHkxhUIhFEjEh9594DJxe7w6cIRCgOV6ICGS0%3A377&sp=rcw",
      },
    },
  );
  console.log(result);
}

async function main() {
  await downloadDNSResolverDomainListDomains();
  await uploadDNSResolverDomainListDomains();
}

main().catch(console.error);
