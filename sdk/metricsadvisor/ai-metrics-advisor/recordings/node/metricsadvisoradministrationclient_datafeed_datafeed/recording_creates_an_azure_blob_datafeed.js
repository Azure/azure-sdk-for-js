let nock = require('nock');

module.exports.hash = "6a09f9748a6dda59ca3900c559706bda";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-160530446860003593","js-test-appInsightsFeed-":"js-test-appInsightsFeed-160530446860005245","js-test-sqlServerFeed-":"js-test-sqlServerFeed-160530446860000366","js-test-cosmosFeed-":"js-test-cosmosFeed-160530446860006934","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-160530446860000986","js-test-tableFeed-":"js-test-tableFeed-160530446860003884","js-test-httpRequestFeed-":"js-test-httpRequestFeed-160530446860001499","js-test-influxdbFeed-":"js-test-influxdbFeed-160530446860002090","js-test-mongoDbFeed-":"js-test-mongoDbFeed-160530446860002279","js-test-mySqlFeed-":"js-test-mySqlFeed-160530446860005584","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-160530446860002496"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-160530446860003593","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"blob_connection_string","container":"blob_container","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/87fa49b3-18fe-43fb-bd41-faf3f64eb951',
  'x-request-id',
  'f5ab6062-c050-4046-b647-d77cb8c55478',
  'x-envoy-upstream-service-time',
  '1158',
  'apim-request-id',
  'f5ab6062-c050-4046-b647-d77cb8c55478',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/87fa49b3-18fe-43fb-bd41-faf3f64eb951')
  .reply(200, {"dataFeedId":"87fa49b3-18fe-43fb-bd41-faf3f64eb951","dataFeedName":"js-test-datafeed-160530446860003593","metrics":[{"metricId":"2c49c436-25ce-478c-ba72-08fedc3a8f22","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"cb5e2570-3685-4a75-a21b-ee881c7c82d1","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T21:54:29Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1687',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6ba30497-01ca-4f6e-b3c5-6e1bede30448',
  'x-envoy-upstream-service-time',
  '252',
  'apim-request-id',
  '6ba30497-01ca-4f6e-b3c5-6e1bede30448',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:29 GMT'
]);
