let nock = require('nock');

module.exports.hash = "993030f77f9ce497bd2e0e07500b3f4f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureApplicationInsights","dataFeedName":"js-test-appInsightsFeed-162267904090105484","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"azureCloud":"Azure","applicationId":"appInsights_application","apiKey":"appInsights_app_key","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/dc7ef668-0f8c-43fb-a398-f7cb22e4c391',
  'x-request-id',
  '2eeb03d0-5a0c-4700-9c40-59ecc5a32b6b',
  'x-envoy-upstream-service-time',
  '900',
  'apim-request-id',
  '2eeb03d0-5a0c-4700-9c40-59ecc5a32b6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/dc7ef668-0f8c-43fb-a398-f7cb22e4c391')
  .reply(200, {"dataFeedId":"dc7ef668-0f8c-43fb-a398-f7cb22e4c391","dataFeedName":"js-test-appInsightsFeed-162267904090105484","metrics":[{"metricId":"13bd9294-ab5c-4a96-ac8a-73e991bbc16f","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"ff61d52e-e522-4cc3-903c-5d8d47c00fc2","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-03T00:10:49Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1631',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f242a715-a13e-4383-bd17-a24cd1483b3e',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  'f242a715-a13e-4383-bd17-a24cd1483b3e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:48 GMT'
]);
