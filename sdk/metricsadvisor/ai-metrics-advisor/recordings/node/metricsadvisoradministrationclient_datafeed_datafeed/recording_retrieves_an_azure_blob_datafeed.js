let nock = require('nock');

module.exports.hash = "2355528d226b4c7a2e319e8ea376f4db";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f516e8ad-c70f-4471-962f-a6e77637f5d1')
  .reply(200, {"dataFeedId":"f516e8ad-c70f-4471-962f-a6e77637f5d1","dataFeedName":"js-test-datafeed-160530907341201805","metrics":[{"metricId":"9347b82d-4eea-4bbb-9957-c51d5c960136","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"ba95d4b6-dddd-484b-aa93-689e6ae29d5f","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T23:11:14Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1687',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f698694e-21c4-4a08-bcce-24088a7eb629',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  'f698694e-21c4-4a08-bcce-24088a7eb629',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:19 GMT'
]);
