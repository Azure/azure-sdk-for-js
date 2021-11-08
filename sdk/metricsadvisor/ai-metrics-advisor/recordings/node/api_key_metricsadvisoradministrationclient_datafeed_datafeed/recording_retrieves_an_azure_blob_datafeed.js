let nock = require('nock');

module.exports.hash = "359a4ffc8feaadce1326336a4a5d83af";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0992b58a-87f5-498b-8909-081a9fe869bb')
  .reply(200, {"dataFeedId":"0992b58a-87f5-498b-8909-081a9fe869bb","dataFeedName":"js-test-datafeed-163634432099807600","metrics":[{"metricId":"93c9504e-a2f0-4be8-aed5-4f2933d487b1","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"1638e0e5-c0be-4dca-a1cd-207eb6ece0de","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:21Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cd984ce7-e587-48e2-83a3-2bcbad8be92d',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  'cd984ce7-e587-48e2-83a3-2bcbad8be92d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:21 GMT'
]);
