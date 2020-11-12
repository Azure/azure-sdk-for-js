let nock = require('nock');

module.exports.hash = "ca341288d33cdec93384f346020a36dd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/a8c87aa0-52d6-4025-8732-1d1a222237c1')
  .reply(200, {"dataFeedId":"a8c87aa0-52d6-4025-8732-1d1a222237c1","dataFeedName":"js-test-datafeed-160522265192804574","metrics":[{"metricId":"63446e3a-2660-4f03-ba19-d7d22ae088f4","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"998bb7a4-5899-470b-8bb0-e6becd6ce38c","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-12T23:10:52Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1701',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '171a3221-58ed-4bee-be00-22fe6bbd8cdc',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '171a3221-58ed-4bee-be00-22fe6bbd8cdc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:53 GMT'
]);
