let nock = require('nock');

module.exports.hash = "591834e6675a5b43c0afc6d05c52fc67";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"e18ec164-11c2-4189-9d94-e2d1e591f2d5","dataFeedName":"js-test-sqlServerFeed-160529679231907547","metrics":[{"metricId":"5cf55f1f-9863-42e4-b3aa-2267d55b36b6","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"40e7ac1a-eda6-49d5-8103-703141421af5","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:35Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"sqlServer_connection_string","query":"select * from blob_container2 where Timestamp = @StartTime"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$top=1&$skip=1"}, [
  'Content-Length',
  '1684',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6a1cff18-d7b6-4c6e-84fc-73bc0fad8602',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '6a1cff18-d7b6-4c6e-84fc-73bc0fad8602',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"3e631af1-018a-4056-9111-41d39a934f35","dataFeedName":"js-test-appInsightsFeed-160529679231907356","metrics":[{"metricId":"6fbf6a43-68ae-4213-a743-551a54b93ab6","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"6222f2ff-194a-4f39-baba-5bc3950b75a0","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:34Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"appInsights_app_key","query":"appInsights_query","azureCloud":"Azure","applicationId":"appInsights_application"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$top=1&$skip=2"}, [
  'Content-Length',
  '1850',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a2b0fb9e-dc4e-4a9d-9c3a-ed40ff6e3f92',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  'a2b0fb9e-dc4e-4a9d-9c3a-ed40ff6e3f92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:36 GMT'
]);
