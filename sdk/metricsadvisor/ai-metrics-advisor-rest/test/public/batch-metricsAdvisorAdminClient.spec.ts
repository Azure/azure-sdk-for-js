// import { ClientOptions } from "@azure-rest/core-client";
// import { createTestCredential } from "@azure-tools/test-credential";
// import { Recorder } from "@azure-tools/test-recorder";
// import assert from "assert";
// import { Context } from "mocha";
// import { createAdminClient, MetricsAdvisorAdministrationClient, MetricsAdvisorKeyCredential } from "../../src";
// import { CreateDataFeedParameters } from "../../src/generated/batch/admin/parameters";
// import { createRecorder } from "./utils/recordedClient";

// function createMAClient(isAAD: boolean = true, recorder: Recorder, options?: ClientOptions): MetricsAdvisorAdministrationClient.Client.MetricsAdvisorAdministrationClient {
//   let credential;
//   if (isAAD) {
//     credential = createTestCredential();
//   } else {
//     const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
//     const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
//     credential = {
//       key: apiKey,
//       subscriptionKey: subscriptionKey
//     } as MetricsAdvisorKeyCredential;
//   }
//   const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
//   return createAdminClient(endpoint, credential, recorder.configureClientOptions({ options }));
// }
// describe("[Batch Generation] Metrics Advisor Admin Client", () => {
//   let recorder: Recorder;
//   let client: MetricsAdvisorAdministrationClient.Client.MetricsAdvisorAdministrationClient;
//   let dataFeedName: string = "js-test--12xxx3-admin";
//   let dataFeedId: string;

//   beforeEach(async function (this: Context) {
//     recorder = await createRecorder(this);
//     client = createMAClient(true, recorder);
//   });

//   afterEach(async function () {
//     await recorder.stop();
//   });

//   it("could create data feed", async () => {
//     console.log("Creating Datafeed...");
//     const feed: CreateDataFeedParameters = {
//       body: {
//         dataFeedName,
//         dataSourceType: "AzureBlob",
//         granularityName: "Daily",
//         metrics: [{
//           metricName: "Metric1",
//           metricDisplayName: "Metric1 display",
//           metricDescription: "",
//         },
//         {
//           metricName: "Metric2",
//           metricDisplayName: "Metric2 display",
//           metricDescription: "",
//         },],
//         dimension: [
//           { dimensionName: "Dim1", dimensionDisplayName: "Dim1 display" },
//           { dimensionName: "Dim2", dimensionDisplayName: "Dim2 display" },
//         ],
//         timestampColumn: undefined,
//         authenticationType: "Basic",
//         dataStartFrom: new Date(Date.UTC(2020, 8, 21)),
//         dataSourceParameter: {
//           connectionString:
//             process.env.METRICS_ADVISOR_AZURE_BLOB_CONNECTION_STRING ||
//             "<Azure Blob storage connection string>",
//           container: process.env.METRICS_ADVISOR_AZURE_BLOB_CONTAINER || "<Azure Blob container name>",
//           blobTemplate:
//             process.env.METRICS_ADVISOR_AZURE_BLOB_TEMPLATE || "<Azure Blob data file name template>",

//         },
//         needRollup: "NeedRollup",
//         rollUpColumns: undefined,
//         allUpIdentification: "__CUSTOM_SUM__",
//         rollUpMethod: "Sum",
//         fillMissingPointType: "CustomValue",
//         fillMissingPointValue: 567,
//         viewMode: "Private",
//       }
//     };
//     const result = await client.createDataFeed(feed);
//     console.dir(result);
//     assert.ok(result?.status == "201");
//     assert.ok(result?.headers?.location);
//     const lastSlashIndex = result.headers.location.lastIndexOf("/");
//     dataFeedId = result.headers.location.substring(lastSlashIndex + 1);
//   });

//   it("should get existing data feed by id", async () => {
//     // console.log("Retrieving datafeed by id...");
//     const result = await client.getDataFeedById(dataFeedId);
//     if (result.status != "200") {
//       throw result;
//     }
//     // console.dir(dataFeedName)
//     assert.ok(result.body?.dataFeedId == dataFeedId, "data feed id");
//     assert.ok(!!result.body.dataSourceType, "not null source type");
//     assert.ok(result.body.dataFeedName == dataFeedName, "feed name");
//   });

//   it("could delete data feed by id", async () => {
//     // console.log(`Deleting datafeed ${dataFeedId}...`);
//     const res = await client.deleteDataFeed(dataFeedId);
//     // console.dir(res);
//     assert.ok(res.status == "204");
//   });

// });
