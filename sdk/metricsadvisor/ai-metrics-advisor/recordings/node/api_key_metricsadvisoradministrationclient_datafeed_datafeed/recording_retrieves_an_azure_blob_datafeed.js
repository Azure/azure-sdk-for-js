let nock = require('nock');

module.exports.hash = "d6f350a176d66c0c651cbb9737af9c11";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6214e294-ecab-47b3-8494-ebce69e03dd6')
  .reply(200, {"dataFeedId":"6214e294-ecab-47b3-8494-ebce69e03dd6","dataFeedName":"js-test-datafeed-161070014038704880","metrics":[{"metricId":"f4089130-5b99-4185-b9f6-2358e6b64b6b","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"1f72e871-1fe2-48a8-acce-e3a936d27289","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-01-15T08:42:20Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1687',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ca39015f-68d5-4bca-a79b-c77e1cedda87',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  'ca39015f-68d5-4bca-a79b-c77e1cedda87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:21 GMT'
]);
