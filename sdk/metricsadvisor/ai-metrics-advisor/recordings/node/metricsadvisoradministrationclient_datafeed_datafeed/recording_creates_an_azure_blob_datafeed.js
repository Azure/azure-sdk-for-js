let nock = require('nock');

module.exports.hash = "6a09f9748a6dda59ca3900c559706bda";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-160522265192804574","js-test-appInsightsFeed-":"js-test-appInsightsFeed-160522265192800516","js-test-sqlServerFeed-":"js-test-sqlServerFeed-160522265192807673","js-test-cosmosFeed-":"js-test-cosmosFeed-160522265192809210","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-160522265192805257","js-test-tableFeed-":"js-test-tableFeed-160522265192804776","js-test-httpRequestFeed-":"js-test-httpRequestFeed-160522265192803703","js-test-influxdbFeed-":"js-test-influxdbFeed-160522265192802447","js-test-mongoDbFeed-":"js-test-mongoDbFeed-160522265192806675","js-test-mySqlFeed-":"js-test-mySqlFeed-160522265192807904","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-160522265192803297"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-160522265192804574","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"blob_connection_string","container":"blob_container","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/a8c87aa0-52d6-4025-8732-1d1a222237c1',
  'x-request-id',
  'fdff51a3-57f0-4696-a25a-58341b2d67d3',
  'x-envoy-upstream-service-time',
  '659',
  'apim-request-id',
  'fdff51a3-57f0-4696-a25a-58341b2d67d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/a8c87aa0-52d6-4025-8732-1d1a222237c1')
  .reply(200, {"dataFeedId":"a8c87aa0-52d6-4025-8732-1d1a222237c1","dataFeedName":"js-test-datafeed-160522265192804574","metrics":[{"metricId":"63446e3a-2660-4f03-ba19-d7d22ae088f4","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"998bb7a4-5899-470b-8bb0-e6becd6ce38c","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-12T23:10:52Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1701',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f8bc6527-d50f-4624-9c6f-ca8a5ef18ba0',
  'x-envoy-upstream-service-time',
  '472',
  'apim-request-id',
  'f8bc6527-d50f-4624-9c6f-ca8a5ef18ba0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:52 GMT'
]);
