let nock = require('nock');

module.exports.hash = "825bcc2e5b2e8a6e1e83084bf2d5f446";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureApplicationInsights","dataFeedName":"js-test-appInsightsFeed-160529679231907356","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"azureCloud":"Azure","applicationId":"appInsights_application","apiKey":"appInsights_app_key","query":"appInsights_query"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/3e631af1-018a-4056-9111-41d39a934f35',
  'x-request-id',
  '3c6f92ae-6b37-4754-a0fd-adb0367513e7',
  'x-envoy-upstream-service-time',
  '571',
  'apim-request-id',
  '3c6f92ae-6b37-4754-a0fd-adb0367513e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3e631af1-018a-4056-9111-41d39a934f35')
  .reply(200, {"dataFeedId":"3e631af1-018a-4056-9111-41d39a934f35","dataFeedName":"js-test-appInsightsFeed-160529679231907356","metrics":[{"metricId":"6fbf6a43-68ae-4213-a743-551a54b93ab6","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"6222f2ff-194a-4f39-baba-5bc3950b75a0","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:34Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"appInsights_app_key","query":"appInsights_query","azureCloud":"Azure","applicationId":"appInsights_application"}}, [
  'Content-Length',
  '1698',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0a7bbed5-1ac8-42ca-b961-6fb2862d7c11',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '0a7bbed5-1ac8-42ca-b961-6fb2862d7c11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:34 GMT'
]);
