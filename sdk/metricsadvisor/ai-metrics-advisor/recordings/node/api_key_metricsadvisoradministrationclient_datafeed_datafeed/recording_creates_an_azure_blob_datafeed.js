let nock = require('nock');

module.exports.hash = "710a34aa269ed0daa9d46bd5d8fae15f";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-164160822036709396","js-test-appInsightsFeed-":"js-test-appInsightsFeed-164160822036708454","js-test-sqlServerFeed-":"js-test-sqlServerFeed-164160822036701756","js-test-cosmosFeed-":"js-test-cosmosFeed-164160822036705828","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-164160822036705425","js-test-tableFeed-":"js-test-tableFeed-164160822036701702","js-test-eventhubRequestFeed-":"js-test-eventhubRequestFeed-164160822036703573","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-164160822036707975","js-test-influxdbFeed-":"js-test-influxdbFeed-164160822036706387","js-test-mongoDbFeed-":"js-test-mongoDbFeed-164160822036705877","js-test-mySqlFeed-":"js-test-mySqlFeed-164160822036704760","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-164160822036700108","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-164160822036707760"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-164160822036709396","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/5e469479-dfae-4e9f-8ae8-996aea8b1e88',
  'x-request-id',
  '51c923af-d71b-4120-8c77-5026ee71fe92',
  'x-envoy-upstream-service-time',
  '444',
  'apim-request-id',
  '51c923af-d71b-4120-8c77-5026ee71fe92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5e469479-dfae-4e9f-8ae8-996aea8b1e88')
  .reply(200, {"dataFeedId":"5e469479-dfae-4e9f-8ae8-996aea8b1e88","dataFeedName":"js-test-datafeed-164160822036709396","metrics":[{"metricId":"0734885d-9e88-4ada-a5b2-b0d57ec7490f","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"8ed8517d-485b-4c68-83ea-95de3184acdf","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2022-01-08T02:17:00Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '04f0de67-cd06-4a77-bb32-b8ee4275f4b0',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  '04f0de67-cd06-4a77-bb32-b8ee4275f4b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:00 GMT'
]);
