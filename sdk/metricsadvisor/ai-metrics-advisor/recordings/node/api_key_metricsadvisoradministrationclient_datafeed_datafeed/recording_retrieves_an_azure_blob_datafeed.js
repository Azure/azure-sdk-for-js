let nock = require('nock');

module.exports.hash = "5cebd5c83470a376437382b76b9088b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0ae4f903-cd73-4ffc-b248-b310a8fd7620')
  .reply(200, {"dataFeedId":"0ae4f903-cd73-4ffc-b248-b310a8fd7620","dataFeedName":"js-test-datafeed-164264035316900011","metrics":[{"metricId":"346b4734-c6b1-4f02-96eb-67cd2dc05ca3","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"56b1e276-0946-4214-91e2-adddbc060ec7","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2022-01-20T00:59:13Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd7e645e8-5e7f-4859-9a8e-98fdd7c6d1ae',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  'd7e645e8-5e7f-4859-9a8e-98fdd7c6d1ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:13 GMT'
]);
