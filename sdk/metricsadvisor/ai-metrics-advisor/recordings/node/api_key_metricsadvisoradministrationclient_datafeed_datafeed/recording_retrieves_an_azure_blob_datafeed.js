let nock = require('nock');

module.exports.hash = "359a4ffc8feaadce1326336a4a5d83af";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/c0b17aba-de6c-489d-b1df-2d97e405eca2')
  .reply(200, {"dataFeedId":"c0b17aba-de6c-489d-b1df-2d97e405eca2","dataFeedName":"js-test-datafeed-163978429259804380","metrics":[{"metricId":"6277f269-394e-4e10-af5f-9f63084f2710","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"e75f5854-075b-42ca-bc50-8402612207a0","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:12Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '25b53f22-3219-45ca-843a-03761ecb301d',
  'x-envoy-upstream-service-time',
  '359',
  'apim-request-id',
  '25b53f22-3219-45ca-843a-03761ecb301d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:13 GMT'
]);
