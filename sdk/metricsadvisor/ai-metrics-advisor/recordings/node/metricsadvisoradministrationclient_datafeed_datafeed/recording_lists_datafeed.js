let nock = require('nock');

module.exports.hash = "bf3e6400d9140c49d16b9bcf07d4b060";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"22463eed-b41f-4747-9778-51019462cf4f","dataFeedName":"js-test-appInsightsFeed-160099018411307716","metrics":[{"metricId":"5863057d-cc1b-413f-b8a6-73d8bd33c5dc","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"02b07180-c28a-474c-a42f-86289daca677","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-24T23:29:47Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"appInsights_app_key","query":"appInsights_query","azureCloud":"Azure","applicationId":"appInsights_application"}},{"dataFeedId":"20a1b881-7fae-4ad3-89c7-14897e85f3c9","dataFeedName":"js-test-datafeed-160099018411302498","metrics":[{"metricId":"e5655f15-8d13-42d4-b62d-046506a3d5c7","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"b0108799-6e16-4159-b65a-5b38b67683c9","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-24T23:29:45Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}],"@nextLink":null}, [
  'Content-Length',
  '3373',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f04a6631-5385-40cc-a0a3-0ce06a8b0747',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  'f04a6631-5385-40cc-a0a3-0ce06a8b0747',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 24 Sep 2020 23:29:47 GMT',
  'Connection',
  'close'
]);
