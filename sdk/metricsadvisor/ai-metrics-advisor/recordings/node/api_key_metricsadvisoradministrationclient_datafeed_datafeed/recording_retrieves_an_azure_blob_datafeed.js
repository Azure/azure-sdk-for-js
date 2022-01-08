let nock = require('nock');

module.exports.hash = "5cebd5c83470a376437382b76b9088b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5e469479-dfae-4e9f-8ae8-996aea8b1e88')
  .reply(200, {"dataFeedId":"5e469479-dfae-4e9f-8ae8-996aea8b1e88","dataFeedName":"js-test-datafeed-164160822036709396","metrics":[{"metricId":"0734885d-9e88-4ada-a5b2-b0d57ec7490f","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"8ed8517d-485b-4c68-83ea-95de3184acdf","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2022-01-08T02:17:00Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b6c864f1-1dad-4734-9175-7dd5ae36b486',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  'b6c864f1-1dad-4734-9175-7dd5ae36b486',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:00 GMT'
]);
