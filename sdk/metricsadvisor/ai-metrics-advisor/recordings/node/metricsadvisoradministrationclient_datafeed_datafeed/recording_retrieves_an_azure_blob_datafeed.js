let nock = require('nock');

module.exports.hash = "ca341288d33cdec93384f346020a36dd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9e35715d-720b-4147-82fe-f79f3c56dc61')
  .reply(200, {"dataFeedId":"9e35715d-720b-4147-82fe-f79f3c56dc61","dataFeedName":"js-test-datafeed-160529679231907425","metrics":[{"metricId":"81a4fe34-cc1c-4859-9944-f5bcc12367d2","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"9fefb598-e0d2-4284-9b7e-6fd2aeed08ea","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:32Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1687',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '071d0b8a-7fc1-4580-8e02-8670799fb4c3',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '071d0b8a-7fc1-4580-8e02-8670799fb4c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:33 GMT'
]);
