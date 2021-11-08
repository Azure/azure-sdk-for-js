let nock = require('nock');

module.exports.hash = "8060e92ac76cdc4a69b9367c63caedf8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"dc36bd57-e9f4-4495-ba4b-e3ea2fa7aa15","dataFeedName":"js-test-sqlServerFeed-163634432099804880","metrics":[{"metricId":"6d314c21-6004-4890-89f6-c5f79f2cad77","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"b51dd332-c4fb-4914-9137-181094c914de","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:24Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"select * from adsample2 where Timestamp = @StartTime"},"authenticationType":"Basic"},{"dataFeedId":"8239771c-6570-4399-9d17-95de64012cc5","dataFeedName":"js-test-appInsightsFeed-163634432099808480","metrics":[{"metricId":"de0036bf-8f07-463e-bf12-58ccfde7a922","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"b0824b74-7fbe-465a-9120-38cba6635e20","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:23Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"}]}, [
  'Content-Length',
  '2869',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '42ccab9b-948c-44d7-925a-a0b9c1b420c4',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '42ccab9b-948c-44d7-925a-a0b9c1b420c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:24 GMT'
]);
