let nock = require('nock');

module.exports.hash = "6ab5a3c990cb6149a7f1ea548b51fce0";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-161185892399407849","js-test-appInsightsFeed-":"js-test-appInsightsFeed-161185892399406276","js-test-sqlServerFeed-":"js-test-sqlServerFeed-161185892399408406","js-test-cosmosFeed-":"js-test-cosmosFeed-161185892399403849","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-161185892399400716","js-test-tableFeed-":"js-test-tableFeed-161185892399403680","js-test-httpRequestFeed-":"js-test-httpRequestFeed-161185892399405125","js-test-influxdbFeed-":"js-test-influxdbFeed-161185892399408217","js-test-mongoDbFeed-":"js-test-mongoDbFeed-161185892399405593","js-test-mySqlFeed-":"js-test-mySqlFeed-161185892399406950","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-161185892399401575"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-161185892399407849","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/a9e1cb91-0651-4b8b-b78e-728795cb3e09',
  'x-request-id',
  '62e173c1-0350-49bb-b8a0-1a76d4c5927f',
  'x-envoy-upstream-service-time',
  '793',
  'apim-request-id',
  '62e173c1-0350-49bb-b8a0-1a76d4c5927f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Jan 2021 18:35:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/a9e1cb91-0651-4b8b-b78e-728795cb3e09')
  .reply(200, {"dataFeedId":"a9e1cb91-0651-4b8b-b78e-728795cb3e09","dataFeedName":"js-test-datafeed-161185892399407849","metrics":[{"metricId":"d9cf223d-b181-45c2-bf7e-e17f494b70db","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"1559bf84-6582-4629-af5c-fa6bb80504ec","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-01-28T18:35:24Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1687',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fc384c31-986e-4e89-abe7-b6fcb640a563',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  'fc384c31-986e-4e89-abe7-b6fcb640a563',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Jan 2021 18:35:24 GMT'
]);
