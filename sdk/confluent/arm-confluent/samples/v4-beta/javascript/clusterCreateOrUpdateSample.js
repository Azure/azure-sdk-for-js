// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create confluent clusters
 *
 * @summary create confluent clusters
 * x-ms-original-file: 2025-08-18-preview/Cluster_CreateOrUpdate_MaximumSet_Gen.json
 */
async function clusterCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.cluster.createOrUpdate(
    "rgconfluent",
    "vwqtjoijzqitjmu",
    "rwmpydknnovcfsattscfm",
    "rdizpgcbewizsgffpg",
    {
      body: {
        kind: "eroxushslwhufo",
        metadata: {
          self: "bnbnbarlsvfifpzcnsnplf",
          resourceName: "ciadqmxlpgllibvkz",
          createdTimestamp: "ouqjivxfggaxzrsmxm",
          updatedTimestamp: "ctrngbppcxdpzmp",
          deletedTimestamp: "gn",
        },
        spec: {
          name: "cq",
          availability: "mtt",
          cloud: "zamxartuouxpglfbitjwhqy",
          zone: "pqcxm",
          package: "ESSENTIALS",
          region: "gbodcnzmbifwyitnojrxali",
          kafkaBootstrapEndpoint: "cnbkuhfnnqjb",
          httpEndpoint: "bircvfulzjdeobklsrbuxwr",
          apiEndpoint: "axxhwauhucchb",
          config: { kind: "hsruehsjppcnlxlsabwns" },
          environment: {
            id: "wbshmvpdhycxltclubn",
            environment: "ern",
            related: "q",
            resourceName: "ewjrvururrahroszquhvhryqzmncp",
          },
          network: {
            id: "wbshmvpdhycxltclubn",
            environment: "ern",
            related: "q",
            resourceName: "ewjrvururrahroszquhvhryqzmncp",
          },
          byok: {
            id: "kfppxiwgcmp",
            related: "sfvjcdvrpzwwmplohiniuselqq",
            resourceName: "dvttcugicoklgyavt",
          },
        },
        status: { phase: "qkpkryngvlvlostlvilptnfhpj", cku: 1 },
      },
    },
  );
  console.log(result);
}

async function main() {
  await clusterCreateOrUpdateMaximumSet();
}

main().catch(console.error);
