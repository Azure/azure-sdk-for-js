let nock = require('nock');

module.exports.hash = "8060e92ac76cdc4a69b9367c63caedf8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"86b83bf4-cc78-4ac9-8841-1bbbdbf6818e","dataFeedName":"js-test-appInsightsFeed-163636432991200664","metrics":[{"metricId":"22866653-2688-42c9-baa4-0c1fccf6ad27","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"1479a0ee-5eec-4585-ba2b-43c518676c5e","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T09:38:52Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"},{"dataFeedId":"edd67707-0e92-4868-afca-c1db28137ace","dataFeedName":"js-test-sqlServerFeed-163636432991201829","metrics":[{"metricId":"99a7a7c2-8a3a-4256-98bb-5d3cf199473c","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"b44ea88e-b7d9-486a-b2e7-17b157f0dadf","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T09:38:52Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"select * from adsample2 where Timestamp = @StartTime"},"authenticationType":"Basic"}]}, [
  'Content-Length',
  '2869',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '43aa88aa-e1d6-438d-a5fa-ccd84b10061b',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  '43aa88aa-e1d6-438d-a5fa-ccd84b10061b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:52 GMT'
]);
