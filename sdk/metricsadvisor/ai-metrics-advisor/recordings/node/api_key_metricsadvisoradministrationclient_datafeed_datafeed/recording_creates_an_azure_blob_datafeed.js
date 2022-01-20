let nock = require('nock');

module.exports.hash = "710a34aa269ed0daa9d46bd5d8fae15f";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-164264035316900011","js-test-appInsightsFeed-":"js-test-appInsightsFeed-164264035316901632","js-test-sqlServerFeed-":"js-test-sqlServerFeed-164264035316908904","js-test-cosmosFeed-":"js-test-cosmosFeed-164264035316901042","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-164264035316906295","js-test-tableFeed-":"js-test-tableFeed-164264035316902818","js-test-eventhubRequestFeed-":"js-test-eventhubRequestFeed-164264035316902527","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-164264035316907268","js-test-influxdbFeed-":"js-test-influxdbFeed-164264035316908818","js-test-mongoDbFeed-":"js-test-mongoDbFeed-164264035316900597","js-test-mySqlFeed-":"js-test-mySqlFeed-164264035316908133","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-164264035316902056","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-164264035316900823"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-164264035316900011","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/0ae4f903-cd73-4ffc-b248-b310a8fd7620',
  'x-request-id',
  'ec9bf1fc-a602-415e-8857-e565c92dbb1e',
  'x-envoy-upstream-service-time',
  '480',
  'apim-request-id',
  'ec9bf1fc-a602-415e-8857-e565c92dbb1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0ae4f903-cd73-4ffc-b248-b310a8fd7620')
  .reply(200, {"dataFeedId":"0ae4f903-cd73-4ffc-b248-b310a8fd7620","dataFeedName":"js-test-datafeed-164264035316900011","metrics":[{"metricId":"346b4734-c6b1-4f02-96eb-67cd2dc05ca3","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"56b1e276-0946-4214-91e2-adddbc060ec7","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2022-01-20T00:59:13Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'dbf723bd-14bb-4da9-b573-4a9ae2beb4c8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  'dbf723bd-14bb-4da9-b573-4a9ae2beb4c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:13 GMT'
]);
