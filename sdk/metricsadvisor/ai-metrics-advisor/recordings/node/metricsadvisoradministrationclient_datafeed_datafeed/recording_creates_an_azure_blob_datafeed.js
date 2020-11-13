let nock = require('nock');

module.exports.hash = "6a09f9748a6dda59ca3900c559706bda";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-160523008231606280","js-test-appInsightsFeed-":"js-test-appInsightsFeed-160523008231701521","js-test-sqlServerFeed-":"js-test-sqlServerFeed-160523008231702294","js-test-cosmosFeed-":"js-test-cosmosFeed-160523008231704733","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-160523008231707637","js-test-tableFeed-":"js-test-tableFeed-160523008231703506","js-test-httpRequestFeed-":"js-test-httpRequestFeed-160523008231703083","js-test-influxdbFeed-":"js-test-influxdbFeed-160523008231705919","js-test-mongoDbFeed-":"js-test-mongoDbFeed-160523008231703868","js-test-mySqlFeed-":"js-test-mySqlFeed-160523008231708658","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-160523008231707053"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-160523008231606280","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"blob_connection_string","container":"blob_container","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/223c7496-4dda-4c68-a210-3a93b92e514b',
  'x-request-id',
  '9f9a9e93-f6d3-4731-abd0-0417d1eb6dd2',
  'x-envoy-upstream-service-time',
  '461',
  'apim-request-id',
  '9f9a9e93-f6d3-4731-abd0-0417d1eb6dd2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/223c7496-4dda-4c68-a210-3a93b92e514b')
  .reply(200, {"dataFeedId":"223c7496-4dda-4c68-a210-3a93b92e514b","dataFeedName":"js-test-datafeed-160523008231606280","metrics":[{"metricId":"b1e9bef7-b076-4611-8205-b460b551c51c","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"19e9ce7f-453d-4622-9091-5e3c51d259d0","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T01:14:42Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1701',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fcc7b379-4f1d-443d-a0d6-7f923180916b',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  'fcc7b379-4f1d-443d-a0d6-7f923180916b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:42 GMT'
]);
