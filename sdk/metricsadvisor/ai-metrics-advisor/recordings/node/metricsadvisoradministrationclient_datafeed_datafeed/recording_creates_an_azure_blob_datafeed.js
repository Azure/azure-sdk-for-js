let nock = require('nock');

module.exports.hash = "6a09f9748a6dda59ca3900c559706bda";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-160530497949309605","js-test-appInsightsFeed-":"js-test-appInsightsFeed-160530497949308862","js-test-sqlServerFeed-":"js-test-sqlServerFeed-160530497949303848","js-test-cosmosFeed-":"js-test-cosmosFeed-160530497949303282","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-160530497949306482","js-test-tableFeed-":"js-test-tableFeed-160530497949308931","js-test-httpRequestFeed-":"js-test-httpRequestFeed-160530497949307837","js-test-influxdbFeed-":"js-test-influxdbFeed-160530497949309118","js-test-mongoDbFeed-":"js-test-mongoDbFeed-160530497949303619","js-test-mySqlFeed-":"js-test-mySqlFeed-160530497949303831","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-160530497949304478"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-160530497949309605","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"blob_connection_string","container":"blob_container","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/d586b64e-ef6f-4a24-9d37-97c72d04836e',
  'x-request-id',
  '926854e2-b6dd-4f86-a19c-c3e72873320e',
  'x-envoy-upstream-service-time',
  '1392',
  'apim-request-id',
  '926854e2-b6dd-4f86-a19c-c3e72873320e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d586b64e-ef6f-4a24-9d37-97c72d04836e')
  .reply(200, {"dataFeedId":"d586b64e-ef6f-4a24-9d37-97c72d04836e","dataFeedName":"js-test-datafeed-160530497949309605","metrics":[{"metricId":"e0edc70e-b73e-4dde-8434-ca18cfd6f0f1","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"dc00c494-c245-423e-9c08-d75518b88398","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T22:03:00Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1687',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8a068f5a-86d1-4b8f-9b72-254791f54acf',
  'x-envoy-upstream-service-time',
  '232',
  'apim-request-id',
  '8a068f5a-86d1-4b8f-9b72-254791f54acf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:00 GMT'
]);
