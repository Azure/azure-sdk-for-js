let nock = require('nock');

module.exports.hash = "e63471a38236c5985bbc85fedfb02984";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-161070014038704880","js-test-appInsightsFeed-":"js-test-appInsightsFeed-161070014038707409","js-test-sqlServerFeed-":"js-test-sqlServerFeed-161070014038707451","js-test-cosmosFeed-":"js-test-cosmosFeed-161070014038704118","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-161070014038700574","js-test-tableFeed-":"js-test-tableFeed-161070014038708289","js-test-httpRequestFeed-":"js-test-httpRequestFeed-161070014038703210","js-test-influxdbFeed-":"js-test-influxdbFeed-161070014038707395","js-test-mongoDbFeed-":"js-test-mongoDbFeed-161070014038702866","js-test-mySqlFeed-":"js-test-mySqlFeed-161070014038708553","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-161070014038706199"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-161070014038704880","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/6214e294-ecab-47b3-8494-ebce69e03dd6',
  'x-request-id',
  'ecc2341a-49ef-4f13-8e06-76b35712f6b8',
  'x-envoy-upstream-service-time',
  '447',
  'apim-request-id',
  'ecc2341a-49ef-4f13-8e06-76b35712f6b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6214e294-ecab-47b3-8494-ebce69e03dd6')
  .reply(200, {"dataFeedId":"6214e294-ecab-47b3-8494-ebce69e03dd6","dataFeedName":"js-test-datafeed-161070014038704880","metrics":[{"metricId":"f4089130-5b99-4185-b9f6-2358e6b64b6b","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"1f72e871-1fe2-48a8-acce-e3a936d27289","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-01-15T08:42:20Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1687',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '484e7226-67a2-4b75-bb12-715fcad1bed3',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '484e7226-67a2-4b75-bb12-715fcad1bed3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:20 GMT'
]);