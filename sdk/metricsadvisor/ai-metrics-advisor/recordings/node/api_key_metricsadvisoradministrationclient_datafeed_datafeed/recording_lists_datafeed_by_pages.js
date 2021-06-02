let nock = require('nock');

module.exports.hash = "21d2ae9a510590fd7d00788ef76b3d83";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"40a324e6-3b8d-4f09-a39e-ded2c386ea31","dataFeedName":"js-test-sqlServerFeed-162260297550803908","metrics":[{"metricId":"831054ca-a2b3-46f5-a836-347b0b2cd257","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"df3f6705-9222-4ae1-aa12-f1d371ee0c37","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T03:03:04Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"select * from adsample2 where Timestamp = @StartTime"},"authenticationType":"Basic"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$maxpagesize=1&$skip=1"}, [
  'Content-Length',
  '1422',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9c01d785-1508-4e05-9d4d-44b1be4229d7',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  '9c01d785-1508-4e05-9d4d-44b1be4229d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"dddc1441-d099-4f8a-87f3-48b914c72444","dataFeedName":"js-test-appInsightsFeed-162260297550807806","metrics":[{"metricId":"04ca79ac-8201-4ed3-961f-82453291695f","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"4ecdfd59-5072-414c-bc67-597a0a4070b9","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T03:03:03Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$maxpagesize=1&$skip=2"}, [
  'Content-Length',
  '1791',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bf2abd4d-7174-4963-8495-e73433720a92',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  'bf2abd4d-7174-4963-8495-e73433720a92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:15 GMT'
]);
