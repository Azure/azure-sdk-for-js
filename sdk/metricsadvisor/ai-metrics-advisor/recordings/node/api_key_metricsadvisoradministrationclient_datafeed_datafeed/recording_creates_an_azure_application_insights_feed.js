let nock = require('nock');

module.exports.hash = "26a208f5545b8ca2bcc2549cd5b45fef";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-161652988649809710","js-test-appInsightsFeed-":"js-test-appInsightsFeed-161652988649802972","js-test-sqlServerFeed-":"js-test-sqlServerFeed-161652988649806789","js-test-cosmosFeed-":"js-test-cosmosFeed-161652988649809054","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-161652988649804340","js-test-tableFeed-":"js-test-tableFeed-161652988649801846","js-test-httpRequestFeed-":"js-test-httpRequestFeed-161652988649800374","js-test-influxdbFeed-":"js-test-influxdbFeed-161652988649809319","js-test-mongoDbFeed-":"js-test-mongoDbFeed-161652988649801002","js-test-mySqlFeed-":"js-test-mySqlFeed-161652988649807327","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-161652988649809109"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureApplicationInsights","dataFeedName":"js-test-appInsightsFeed-161652988649802972","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"azureCloud":"Azure","applicationId":"appInsights_application","apiKey":"appInsights_app_key","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/170aac18-6351-4e2a-904a-81e66b2c18b8',
  'x-request-id',
  'fee0732c-b92a-450d-b37c-cb4dfdb2b277',
  'x-envoy-upstream-service-time',
  '771',
  'apim-request-id',
  'fee0732c-b92a-450d-b37c-cb4dfdb2b277',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Mar 2021 20:04:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/170aac18-6351-4e2a-904a-81e66b2c18b8')
  .reply(200, {"dataFeedId":"170aac18-6351-4e2a-904a-81e66b2c18b8","dataFeedName":"js-test-appInsightsFeed-161652988649802972","metrics":[{"metricId":"dbd67de1-e76c-438c-b073-11f8c4f5627d","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"233d6745-3c41-45c1-8cb1-bf827e147dc0","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureApplicationInsights","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-03-23T20:04:46Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"apiKey":"appInsights_app_key","query":"let gran=60m; let starttime=datetime(@StartTime); let endtime=starttime + gran; requests | where timestamp >= starttime and timestamp < endtime | summarize request_count = count(), duration_avg_ms = avg(duration), duration_95th_ms = percentile(duration, 95), duration_max_ms = max(duration) by resultCode","azureCloud":"Azure","applicationId":"appInsights_application"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1678',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1c03b085-e50a-4e73-af5d-92813fa20273',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  '1c03b085-e50a-4e73-af5d-92813fa20273',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Mar 2021 20:04:47 GMT'
]);
