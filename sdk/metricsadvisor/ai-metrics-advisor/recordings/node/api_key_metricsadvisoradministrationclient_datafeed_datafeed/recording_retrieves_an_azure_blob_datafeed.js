let nock = require('nock');

module.exports.hash = "359a4ffc8feaadce1326336a4a5d83af";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c9673522-01d6-4068-b7f9-845ea1c46f4b')
  .reply(200, {"dataFeedId":"c9673522-01d6-4068-b7f9-845ea1c46f4b","dataFeedName":"js-test-datafeed-163636432991208086","metrics":[{"metricId":"f27b8776-ecaf-4de2-ac62-9db4f09a2dcb","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"b90b6ea5-7c38-4a60-a312-04122cb11ca9","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T09:38:50Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '632c5e10-ae26-4f14-834b-dd92400dd5be',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  '632c5e10-ae26-4f14-834b-dd92400dd5be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:50 GMT'
]);
