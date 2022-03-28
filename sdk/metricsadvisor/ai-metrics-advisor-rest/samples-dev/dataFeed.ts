import { ClientSecretCredential } from "@azure/identity";
import { createClient, CreateDataFeed201Response, CreateDataFeeddefaultResponse, CreateDataFeedParameters, GeneratedClientLike, MetricsAdvisorKeyCredential, paginate, paginatePost, UpdateDataFeedParameters } from "@azure-rest/ai-metrics-advisor";

export async function main() {
  testWithAPIKeyCredential();
  testWithAADCredential();
}

async function testWithAPIKeyCredential() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const credential = {
    key: apiKey,
    subscriptionKey: subscriptionKey
  } as MetricsAdvisorKeyCredential;
  const client = createClient(endpoint, credential);

  // list and filter existing items
  const existingDataFeedId = process.env["METRICS_ADVISOR_DATAFEED_ID"] || "<data feed id>";
  await getDataFeed(client, existingDataFeedId);
  await listDataFeeds(client);

  // CURD for data feed
  const created = await createDataFeed(client);
  if (!created?.headers?.location) {
    throw new Error("Expected a valid location to retrieve the created configuration");
  }
  const lastSlashIndex = created.headers.location.lastIndexOf("/");
  const feedId = created.headers.location.substring(lastSlashIndex + 1);
  const getLatestOne = await getDataFeed(client, feedId);
  if (getLatestOne.status !== "200") {
    throw new Error("Expected 200 response code");
  }
  await updateDataFeed(client, getLatestOne?.body?.dataFeedId || "");
  await deleteDataFeed(client, getLatestOne?.body?.dataFeedId || "");
}

async function testWithAADCredential() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID || '',
    process.env.AZURE_CLIENT_ID || '',
    process.env.AZURE_CLIENT_SECRET || ''
  );
  const client = createClient(endpoint, credential);

  // list and filter existing items
  const existingDataFeedId = process.env["METRICS_ADVISOR_DATAFEED_ID"] || "<data feed id>";
  await getDataFeed(client, existingDataFeedId);
  await listDataFeeds(client);

  // CURD for data feed
  const created = await createDataFeed(client);
  if (!created?.headers?.location) {
    throw new Error("Expected a valid location to retrieve the created configuration");
  }
  const lastSlashIndex = created.headers.location.lastIndexOf("/");
  const feedId = created.headers.location.substring(lastSlashIndex + 1);
  const getLatestOne = await getDataFeed(client, feedId);
  // console.log(created);
  if (getLatestOne.status !== "200") {
    throw new Error("Expected 200 response code");
  }
  await updateDataFeed(client, getLatestOne?.body?.dataFeedId || "");
  await deleteDataFeed(client, getLatestOne?.body?.dataFeedId || "");
}

async function listDataFeeds(client: GeneratedClientLike) {
  console.log("Listing Datafeeds ...");
  console.log("  using while loop");
  const initResponse = await client.listDataFeeds({
    queryParameters: {
      dataFeedName: "js-test-",
      $skip: 1,
      $maxpagesize: 1
    }
  });
  const iter = paginate(client, initResponse);
  for await (const data of iter) {
    console.log(data);
  }
}

async function createDataFeed(
  client: GeneratedClientLike
): Promise<CreateDataFeed201Response | CreateDataFeeddefaultResponse> {
  console.log("Creating Datafeed...");
  const feed: CreateDataFeedParameters = {
    body: {
      dataFeedName: "test-datafeed-" + new Date().getTime().toString(),
      dataSourceType: "AzureBlob",
      granularityName: "Daily",
      metrics: [{
        metricName: "Metric1",
        metricDisplayName: "Metric1 display",
        metricDescription: "",
      },
      {
        metricName: "Metric2",
        metricDisplayName: "Metric2 display",
        metricDescription: "",
      },],
      dimension: [
        { dimensionName: "Dim1", dimensionDisplayName: "Dim1 display" },
        { dimensionName: "Dim2", dimensionDisplayName: "Dim2 display" },
      ],
      timestampColumn: undefined,
      authenticationType: "Basic",
      dataStartFrom: new Date(Date.UTC(2020, 8, 21)),
      dataSourceParameter: {
        connectionString:
          process.env.METRICS_ADVISOR_AZURE_BLOB_CONNECTION_STRING ||
          "<Azure Blob storage connection string>",
        container: process.env.METRICS_ADVISOR_AZURE_BLOB_CONTAINER || "<Azure Blob container name>",
        blobTemplate:
          process.env.METRICS_ADVISOR_AZURE_BLOB_TEMPLATE || "<Azure Blob data file name template>",

      },
      needRollup: "NeedRollup",
      rollUpColumns: undefined,
      allUpIdentification: "__CUSTOM_SUM__",
      rollUpMethod: "Sum",
      fillMissingPointType: "CustomValue",
      fillMissingPointValue: 567,
      viewMode: "Private",
    }
  };
  const result = await client.createDataFeed(feed);

  console.dir(result);
  return result;
}

async function getDataFeed(client: GeneratedClientLike, dataFeedId: string) {
  console.log("Retrieving datafeed by id...");
  const result = await client.getDataFeedById(dataFeedId);
  if (result.status != "200") {
    throw result;
  }
  console.log("datafeed result is as follows - ");
  console.log(`  id: ${result.body?.dataFeedId}`);
  console.log(`  data source type: ${result.body.dataSourceType}`);
  console.log(`  name: ${result.body.dataFeedName}`);
  return result;
}

async function updateDataFeed(client: GeneratedClientLike, dataFeedId: string) {
  const patch: UpdateDataFeedParameters = {
    body: {
      dataSourceType: "AzureBlob",
      authenticationType: "ManagedIdentity",
      dataFeedName: "new name test-datafeed " + new Date().getTime().toString(),
      dataStartFrom: new Date(Date.UTC(2020, 8, 15)),
      startOffsetInSeconds: 4444,
      maxConcurrency: undefined,
      minRetryIntervalInSeconds: 3000,
      stopRetryAfterInSeconds: 667777,
      dataFeedDescription: "New datafeed description",
      fillMissingPointType: "SmartFilling",
      status: "Paused",
    }
  };

  try {
    console.log(`Updating datafeed ${dataFeedId}...`);
    const updated = await client.updateDataFeed(dataFeedId, patch);
    console.dir(updated);
  } catch (err) {
    console.log("Error occurred when updating data feed");
    console.log(err);
  }
}

async function deleteDataFeed(client: GeneratedClientLike, dataFeedId: string) {
  console.log(`Deleting datafeed ${dataFeedId}...`);
  const res = await client.deleteDataFeed(dataFeedId);
  console.dir(res);
}

main()
  .then((_) => {
    console.log("Succeeded");
  })
  .catch((err) => {
    console.log("Error occurred:");
    console.log(err);
  });
