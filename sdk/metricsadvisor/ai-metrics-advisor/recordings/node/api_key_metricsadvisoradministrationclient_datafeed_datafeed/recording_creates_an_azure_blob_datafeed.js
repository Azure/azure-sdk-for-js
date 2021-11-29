let nock = require('nock');

module.exports.hash = "413113d9b30eef2f13c2941fcef17d32";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-163702279906505395","js-test-appInsightsFeed-":"js-test-appInsightsFeed-163702279906505685","js-test-sqlServerFeed-":"js-test-sqlServerFeed-163702279906501823","js-test-cosmosFeed-":"js-test-cosmosFeed-163702279906501630","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-163702279906503106","js-test-tableFeed-":"js-test-tableFeed-163702279906501923","js-test-eventhubRequestFeed-":"js-test-eventhubRequestFeed-163702279906505921","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-163702279906508559","js-test-influxdbFeed-":"js-test-influxdbFeed-163702279906508185","js-test-mongoDbFeed-":"js-test-mongoDbFeed-163702279906502321","js-test-mySqlFeed-":"js-test-mySqlFeed-163702279906507194","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-163702279906508548","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-163702279906507664"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-163702279906505395","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/8f8dcdc1-1c2a-478d-ad8e-bde4d4317721',
  'x-request-id',
  '513ad6ba-d986-4fcd-af47-6366348f67c2',
  'x-envoy-upstream-service-time',
  '542',
  'apim-request-id',
  '513ad6ba-d986-4fcd-af47-6366348f67c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/8f8dcdc1-1c2a-478d-ad8e-bde4d4317721')
  .reply(200, {"dataFeedId":"8f8dcdc1-1c2a-478d-ad8e-bde4d4317721","dataFeedName":"js-test-datafeed-163702279906505395","metrics":[{"metricId":"325d3468-1f2d-4dca-88e5-e0a77265e7da","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"da2f9959-613e-4567-ad4f-c5aee79a50ff","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-16T00:33:19Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6536bbb6-24e3-48e0-9173-47152b170c72',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  '6536bbb6-24e3-48e0-9173-47152b170c72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:19 GMT'
]);
