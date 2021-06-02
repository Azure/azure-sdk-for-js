let nock = require('nock');

module.exports.hash = "fa2de5f0574cddd6fe5544e3111283f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/036f0f01-e1c9-4ff5-aefd-f044ec23f355')
  .reply(200, {"dataFeedId":"036f0f01-e1c9-4ff5-aefd-f044ec23f355","dataFeedName":"js-test-datafeed-162260297550809501","metrics":[{"metricId":"921ba8e2-75ff-4386-a025-0c957c7b1860","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"d9ab794f-04ad-4997-927f-5acea130e53a","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T03:02:55Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1264',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1326f8bc-3295-4c31-b52e-178f7a0d036f',
  'x-envoy-upstream-service-time',
  '273',
  'apim-request-id',
  '1326f8bc-3295-4c31-b52e-178f7a0d036f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:02:56 GMT'
]);
