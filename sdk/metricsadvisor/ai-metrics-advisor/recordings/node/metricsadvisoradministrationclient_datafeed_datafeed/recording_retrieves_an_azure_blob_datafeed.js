let nock = require('nock');

module.exports.hash = "ca341288d33cdec93384f346020a36dd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d586b64e-ef6f-4a24-9d37-97c72d04836e')
  .reply(200, {"dataFeedId":"d586b64e-ef6f-4a24-9d37-97c72d04836e","dataFeedName":"js-test-datafeed-160530497949309605","metrics":[{"metricId":"e0edc70e-b73e-4dde-8434-ca18cfd6f0f1","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"dc00c494-c245-423e-9c08-d75518b88398","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T22:03:00Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1687',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0c931612-4356-4771-9507-d331df58de13',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  '0c931612-4356-4771-9507-d331df58de13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:01 GMT'
]);
