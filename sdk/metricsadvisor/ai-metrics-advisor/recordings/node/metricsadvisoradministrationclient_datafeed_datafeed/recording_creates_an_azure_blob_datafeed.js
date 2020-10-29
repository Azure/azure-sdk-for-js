let nock = require('nock');

module.exports.hash = "43a4483e4a160a80ed6b47a04c65b961";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-160323420510603178","js-test-appInsightsFeed-":"js-test-appInsightsFeed-160323420510606467","js-test-sqlServerFeed-":"js-test-sqlServerFeed-160323420510602272","js-test-cosmosFeed-":"js-test-cosmosFeed-160323420510600639","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-160323420510600056","js-test-tableFeed-":"js-test-tableFeed-160323420510607307","js-test-httpRequestFeed-":"js-test-httpRequestFeed-160323420510606509","js-test-influxdbFeed-":"js-test-influxdbFeed-160323420510606249","js-test-mongoDbFeed-":"js-test-mongoDbFeed-160323420510601647","js-test-mySqlFeed-":"js-test-mySqlFeed-160323420510608912","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-160323420510603918"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-160323420510603178","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"blob_connection_string","container":"blob_container","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/78e1c1f1-64ee-472c-9090-50a1070590d6',
  'x-request-id',
  '763db7a8-2aff-4626-b513-95d26aee1900',
  'x-envoy-upstream-service-time',
  '17086',
  'apim-request-id',
  '763db7a8-2aff-4626-b513-95d26aee1900',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:22 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/78e1c1f1-64ee-472c-9090-50a1070590d6')
  .reply(200, {"dataFeedId":"78e1c1f1-64ee-472c-9090-50a1070590d6","dataFeedName":"js-test-datafeed-160323420510603178","metrics":[{"metricId":"a8e3b41e-d538-42fa-ac4d-77c21b512c89","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"1e49b4f2-5dd6-4a03-9d3e-9b3a0fbdb431","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-10-20T22:50:21Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1699',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5264d35e-ec0a-4afb-b42d-5686220fab95',
  'x-envoy-upstream-service-time',
  '5381',
  'apim-request-id',
  '5264d35e-ec0a-4afb-b42d-5686220fab95',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:27 GMT',
  'Connection',
  'close'
]);
