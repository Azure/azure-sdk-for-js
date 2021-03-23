let nock = require('nock');

module.exports.hash = "26a208f5545b8ca2bcc2549cd5b45fef";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-161647972388208408","js-test-appInsightsFeed-":"js-test-appInsightsFeed-161647972388204205","js-test-sqlServerFeed-":"js-test-sqlServerFeed-161647972388201376","js-test-cosmosFeed-":"js-test-cosmosFeed-161647972388208680","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-161647972388201649","js-test-tableFeed-":"js-test-tableFeed-161647972388209076","js-test-httpRequestFeed-":"js-test-httpRequestFeed-161647972388205634","js-test-influxdbFeed-":"js-test-influxdbFeed-161647972388202355","js-test-mongoDbFeed-":"js-test-mongoDbFeed-161647972388203032","js-test-mySqlFeed-":"js-test-mySqlFeed-161647972388201121","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-161647972388207060"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureApplicationInsights","dataFeedName":"js-test-appInsightsFeed-161647972388204205","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"azureCloud":"Azure","applicationId":"appInsights_application","apiKey":"appInsights_app_key","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/246246ca-5c60-431f-b6d8-a990e17a4fae',
  'x-request-id',
  '8572121c-6fa9-43f7-900e-a5d869377069',
  'x-envoy-upstream-service-time',
  '1070',
  'apim-request-id',
  '8572121c-6fa9-43f7-900e-a5d869377069',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Mar 2021 06:08:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/246246ca-5c60-431f-b6d8-a990e17a4fae')
  .reply(200, {"dataFeedId":"246246ca-5c60-431f-b6d8-a990e17a4fae","dataFeedName":"js-test-appInsightsFeed-161647972388204205","metrics":[{"metricId":"7a697c2a-4f27-4f98-b384-28881cfe1bbe","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"0898af7f-894d-4dbc-bb53-6cebfe1677d0","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-03-23T06:08:44Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"appInsights_app_key","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1678',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '85c468fc-e33d-4d4f-aaec-a881eb4f8cd9',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '85c468fc-e33d-4d4f-aaec-a881eb4f8cd9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Mar 2021 06:08:44 GMT'
]);
