let nock = require('nock');

module.exports.hash = "e8021b542e1d918009b4e98501920329";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/a5c71d07-59c8-4407-9c33-3ed4d6823f13')
  .reply(200, {"dataFeedId":"a5c71d07-59c8-4407-9c33-3ed4d6823f13","dataFeedName":"js-test-datafeed-160072575346105837","metrics":[{"metricId":"2b42a5af-1924-4611-a721-a52521f4ff93","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"8c2faac9-2f23-446a-9038-d228a32d1a2b","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-21T22:02:35Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1678',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ef81b839-5488-4b9c-8e62-ffe3a88b8099',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  'ef81b839-5488-4b9c-8e62-ffe3a88b8099',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:36 GMT'
]);
