let nock = require('nock');

module.exports.hash = "20806b607f21c8c15fb83ceb3fc87c74";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/78e1c1f1-64ee-472c-9090-50a1070590d6')
  .reply(200, {"dataFeedId":"78e1c1f1-64ee-472c-9090-50a1070590d6","dataFeedName":"js-test-datafeed-160323420510603178","metrics":[{"metricId":"a8e3b41e-d538-42fa-ac4d-77c21b512c89","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"1e49b4f2-5dd6-4a03-9d3e-9b3a0fbdb431","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-10-20T22:50:21Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1699',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c8fdd67f-ff50-49d1-a7cc-4d8037f4ebcb',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  'c8fdd67f-ff50-49d1-a7cc-4d8037f4ebcb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:28 GMT',
  'Connection',
  'close'
]);
