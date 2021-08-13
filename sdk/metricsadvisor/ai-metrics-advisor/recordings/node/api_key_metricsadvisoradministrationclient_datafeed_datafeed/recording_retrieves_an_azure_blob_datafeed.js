let nock = require('nock');

module.exports.hash = "fa2de5f0574cddd6fe5544e3111283f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/47336207-4e5e-4fd3-997b-20d5428537d5')
  .reply(200, {"dataFeedId":"47336207-4e5e-4fd3-997b-20d5428537d5","dataFeedName":"js-test-datafeed-162267904090104549","metrics":[{"metricId":"ac5e5f13-0b75-43b3-86bb-83bb43705a01","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"5a47719f-18f0-45d8-a56b-b4f492b1692d","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-03T00:10:41Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1264',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '22e51e07-de0e-41f1-8582-83b73a93552a',
  'x-envoy-upstream-service-time',
  '229',
  'apim-request-id',
  '22e51e07-de0e-41f1-8582-83b73a93552a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:41 GMT'
]);
