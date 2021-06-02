let nock = require('nock');

module.exports.hash = "fa2de5f0574cddd6fe5544e3111283f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/667c1f71-6f1c-453c-b647-7afbb0ae3820')
  .reply(200, {"dataFeedId":"667c1f71-6f1c-453c-b647-7afbb0ae3820","dataFeedName":"js-test-datafeed-162260135760501522","metrics":[{"metricId":"29d0fc23-9eb6-4dcc-bdd0-e856f72657ec","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"85e85e8c-9801-4bb8-ae98-88aa6f7ebdf7","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T02:36:03Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1264',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5c1e2c2f-50d9-4cdf-91c9-26ce98b1d3b5',
  'x-envoy-upstream-service-time',
  '206',
  'apim-request-id',
  '5c1e2c2f-50d9-4cdf-91c9-26ce98b1d3b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:02 GMT'
]);
