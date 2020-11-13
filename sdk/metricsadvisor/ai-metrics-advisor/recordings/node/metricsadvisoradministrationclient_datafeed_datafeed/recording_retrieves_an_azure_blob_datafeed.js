let nock = require('nock');

module.exports.hash = "ca341288d33cdec93384f346020a36dd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/223c7496-4dda-4c68-a210-3a93b92e514b')
  .reply(200, {"dataFeedId":"223c7496-4dda-4c68-a210-3a93b92e514b","dataFeedName":"js-test-datafeed-160523008231606280","metrics":[{"metricId":"b1e9bef7-b076-4611-8205-b460b551c51c","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"19e9ce7f-453d-4622-9091-5e3c51d259d0","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T01:14:42Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1701',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '59b15eff-f94a-4245-b7ae-6113d2027245',
  'x-envoy-upstream-service-time',
  '304',
  'apim-request-id',
  '59b15eff-f94a-4245-b7ae-6113d2027245',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:43 GMT'
]);
