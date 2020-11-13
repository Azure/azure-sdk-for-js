let nock = require('nock');

module.exports.hash = "ca341288d33cdec93384f346020a36dd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/87fa49b3-18fe-43fb-bd41-faf3f64eb951')
  .reply(200, {"dataFeedId":"87fa49b3-18fe-43fb-bd41-faf3f64eb951","dataFeedName":"js-test-datafeed-160530446860003593","metrics":[{"metricId":"2c49c436-25ce-478c-ba72-08fedc3a8f22","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"cb5e2570-3685-4a75-a21b-ee881c7c82d1","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T21:54:29Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1687',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5ef4581d-33dc-4dda-ab3a-b5e44fc9fad4',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  '5ef4581d-33dc-4dda-ab3a-b5e44fc9fad4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:29 GMT'
]);
