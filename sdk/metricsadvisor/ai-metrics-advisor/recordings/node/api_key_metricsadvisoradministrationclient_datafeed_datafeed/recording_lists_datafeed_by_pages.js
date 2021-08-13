let nock = require('nock');

module.exports.hash = "21d2ae9a510590fd7d00788ef76b3d83";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"b88af029-dd7d-497a-87be-9ceacb9b9895","dataFeedName":"js-test-sqlServerFeed-162267904090104451","metrics":[{"metricId":"ac17278a-2f7d-45f6-9d13-4975842e5e02","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"ba188a34-7291-4a5f-9124-6b306ae2f613","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-03T00:10:55Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"select * from adsample2 where Timestamp = @StartTime"},"authenticationType":"Basic"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$maxpagesize=1&$skip=1"}, [
  'Content-Length',
  '1422',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7b583f49-a1c7-40bd-85c5-d99178bb808c',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '7b583f49-a1c7-40bd-85c5-d99178bb808c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"dc7ef668-0f8c-43fb-a398-f7cb22e4c391","dataFeedName":"js-test-appInsightsFeed-162267904090105484","metrics":[{"metricId":"13bd9294-ab5c-4a96-ac8a-73e991bbc16f","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"ff61d52e-e522-4cc3-903c-5d8d47c00fc2","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-03T00:10:49Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$maxpagesize=1&$skip=2"}, [
  'Content-Length',
  '1791',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '66c33b3b-4b82-45b4-beae-e4e4ba56f73f',
  'x-envoy-upstream-service-time',
  '328',
  'apim-request-id',
  '66c33b3b-4b82-45b4-beae-e4e4ba56f73f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:56 GMT'
]);
