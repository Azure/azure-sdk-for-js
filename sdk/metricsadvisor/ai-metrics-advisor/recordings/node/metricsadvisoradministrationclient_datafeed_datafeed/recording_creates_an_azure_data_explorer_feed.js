let nock = require('nock');

module.exports.hash = "0ebf3163a48996b8720d82dfbbaa8f6c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataExplorer","dataFeedName":"js-test-dataExplorerFeed-160529679231903768","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","query":"let starttime=datetime(@StartTime); let endtime=starttime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/860f7d1f-f474-4869-83cf-5d0ac8260e58',
  'x-request-id',
  '913c8214-efaf-4fad-9adc-6834993c1b0c',
  'x-envoy-upstream-service-time',
  '631',
  'apim-request-id',
  '913c8214-efaf-4fad-9adc-6834993c1b0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/860f7d1f-f474-4869-83cf-5d0ac8260e58')
  .reply(200, {"dataFeedId":"860f7d1f-f474-4869-83cf-5d0ac8260e58","dataFeedName":"js-test-dataExplorerFeed-160529679231903768","metrics":[{"metricId":"0a7c1fab-ee46-485a-9918-88cef9df2a7a","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"8341edb6-9e25-4fae-9dc6-7425d3ef54be","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataExplorer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:40Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","query":"let starttime=datetime(@StartTime); let endtime=starttime"}}, [
  'Content-Length',
  '1354',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '644e4e38-5b18-43e4-b201-2b9047408943',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  '644e4e38-5b18-43e4-b201-2b9047408943',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:39 GMT'
]);
