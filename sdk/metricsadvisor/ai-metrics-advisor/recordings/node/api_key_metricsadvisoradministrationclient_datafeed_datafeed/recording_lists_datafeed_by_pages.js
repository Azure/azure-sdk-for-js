let nock = require('nock');

module.exports.hash = "793b87e3aaf5e6051ade04eb4ff45668";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"68b8db03-4d1d-47ee-bbdd-b1a0ab7cf7fe","dataFeedName":"js-test-appInsightsFeed-163978429259806142","metrics":[{"metricId":"4f3b63cf-491d-4559-8831-5055428789f7","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"51e317a7-78a7-463e-a587-6848a8c961a0","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:15Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$maxpagesize=1&$skip=1"}, [
  'Content-Length',
  '1754',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '658a0e12-767b-4fcc-afb4-bf403a73b3a2',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '658a0e12-767b-4fcc-afb4-bf403a73b3a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"3b5d71ac-af9c-4855-a1da-11d83a9fa4cc","dataFeedName":"js-test-sqlServerFeed-163978429259808429","metrics":[{"metricId":"e594364d-4e25-4247-9172-0f8ca143df85","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"9abab968-4582-4e1c-a4d4-e663360ab561","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:15Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"select * from adsample2 where Timestamp = @StartTime"},"authenticationType":"Basic"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$maxpagesize=1&$skip=2"}, [
  'Content-Length',
  '1422',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c8ce97d8-59a6-45d7-952b-a15a9aa49677',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  'c8ce97d8-59a6-45d7-952b-a15a9aa49677',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:16 GMT'
]);
