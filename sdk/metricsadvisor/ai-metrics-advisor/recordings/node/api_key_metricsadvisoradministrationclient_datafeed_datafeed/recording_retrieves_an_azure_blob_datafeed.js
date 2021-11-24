let nock = require('nock');

module.exports.hash = "359a4ffc8feaadce1326336a4a5d83af";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/8f8dcdc1-1c2a-478d-ad8e-bde4d4317721')
  .reply(200, {"dataFeedId":"8f8dcdc1-1c2a-478d-ad8e-bde4d4317721","dataFeedName":"js-test-datafeed-163702279906505395","metrics":[{"metricId":"325d3468-1f2d-4dca-88e5-e0a77265e7da","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"da2f9959-613e-4567-ad4f-c5aee79a50ff","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-16T00:33:19Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f96d7ccc-7b06-477d-8d36-38c3d7bb7d6b',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  'f96d7ccc-7b06-477d-8d36-38c3d7bb7d6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:19 GMT'
]);
