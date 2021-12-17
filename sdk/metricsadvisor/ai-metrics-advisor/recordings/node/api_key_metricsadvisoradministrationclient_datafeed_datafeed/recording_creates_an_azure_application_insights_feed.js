let nock = require('nock');

module.exports.hash = "ab03802a893e10872e3827ce5d677d8f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureApplicationInsights","dataFeedName":"js-test-appInsightsFeed-163978429259806142","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"azureCloud":"Azure","applicationId":"appInsights_application","apiKey":"appInsights_app_key","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/68b8db03-4d1d-47ee-bbdd-b1a0ab7cf7fe',
  'x-request-id',
  'e56f3b58-22ab-4814-9b66-87c2386e8fef',
  'x-envoy-upstream-service-time',
  '525',
  'apim-request-id',
  'e56f3b58-22ab-4814-9b66-87c2386e8fef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/68b8db03-4d1d-47ee-bbdd-b1a0ab7cf7fe')
  .reply(200, {"dataFeedId":"68b8db03-4d1d-47ee-bbdd-b1a0ab7cf7fe","dataFeedName":"js-test-appInsightsFeed-163978429259806142","metrics":[{"metricId":"4f3b63cf-491d-4559-8831-5055428789f7","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"51e317a7-78a7-463e-a587-6848a8c961a0","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:15Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1594',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fa39e382-3a0f-42df-9ea3-db9956ce7010',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  'fa39e382-3a0f-42df-9ea3-db9956ce7010',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:14 GMT'
]);
