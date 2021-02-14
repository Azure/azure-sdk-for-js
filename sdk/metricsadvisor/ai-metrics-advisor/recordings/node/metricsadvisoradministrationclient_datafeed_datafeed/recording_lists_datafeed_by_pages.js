let nock = require('nock');

module.exports.hash = "591834e6675a5b43c0afc6d05c52fc67";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"540b2568-9fdd-46ad-a81d-48bb5d9d7c49","dataFeedName":"js-test-sqlServerFeed-160530907341201978","metrics":[{"metricId":"3d27f450-2f62-4fba-b4bc-db3dd2689c0f","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"1b8ad6cb-7320-49da-bbea-b267ef858ae5","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T23:11:23Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"sqlServer_connection_string","query":"select * from adsample2 where Timestamp = @StartTime"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$top=1&$skip=1"}, [
  'Content-Length',
  '1684',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3b4f9679-b831-4956-8c3f-722e613355a8',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '3b4f9679-b831-4956-8c3f-722e613355a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"89cd21ff-86b3-4707-962f-32b0b4dc82c7","dataFeedName":"js-test-appInsightsFeed-160530907341201171","metrics":[{"metricId":"0837e50f-3232-4168-a3fc-2f7ce9d9904d","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"9cc35486-3c18-49e5-a518-4eba45adf733","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T23:11:22Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"appInsights_app_key","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds?dataFeedName=js-test-&$top=1&$skip=2"}, [
  'Content-Length',
  '1850',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0059ff5e-093c-4bcb-abfa-e14a24adb2c9',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  '0059ff5e-093c-4bcb-abfa-e14a24adb2c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:23 GMT'
]);
