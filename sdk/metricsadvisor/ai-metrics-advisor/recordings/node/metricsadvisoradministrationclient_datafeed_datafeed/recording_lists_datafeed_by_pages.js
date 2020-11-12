let nock = require('nock');

module.exports.hash = "591834e6675a5b43c0afc6d05c52fc67";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"4615771e-a822-4624-98d0-429237edaf4c","dataFeedName":"js-test-sqlServerFeed-160522265192807673","metrics":[{"metricId":"2a287a53-06ee-426d-a36a-6c5d90458936","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"7303bf5c-e1df-4b4a-b1a7-804a92eb1a66","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-12T23:10:57Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"sqlServer_connection_string","query":"select * from blob_container2 where Timestamp = @StartTime"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$top=1&$skip=1"}, [
  'Content-Length',
  '1698',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b631160c-bd02-4374-8184-1bda7c4bd5c2',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  'b631160c-bd02-4374-8184-1bda7c4bd5c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"fd952b2f-e935-45f5-bce3-b8a02d0950c3","dataFeedName":"js-test-appInsightsFeed-160522265192800516","metrics":[{"metricId":"72ed627d-93f8-4a5c-961c-6ed7524b1329","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"245a3ce5-4939-4a9b-9606-9ef7ef92fc76","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-12T23:10:56Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"appInsights_app_key","query":"appInsights_query","azureCloud":"Azure","applicationId":"appInsights_application"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$top=1&$skip=2"}, [
  'Content-Length',
  '1864',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd6ca302e-3204-4f25-abbc-3ed3365f0dd5',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  'd6ca302e-3204-4f25-abbc-3ed3365f0dd5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:58 GMT'
]);
