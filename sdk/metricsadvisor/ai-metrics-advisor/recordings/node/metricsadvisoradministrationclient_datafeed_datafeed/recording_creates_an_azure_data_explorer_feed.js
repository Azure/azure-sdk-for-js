let nock = require('nock');

module.exports.hash = "0ebf3163a48996b8720d82dfbbaa8f6c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataExplorer","dataFeedName":"js-test-dataExplorerFeed-160522265192805257","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","query":"let starttime=datetime(@StartTime); let endtime=starttime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/1d0da4ea-e060-4e2e-a434-7a3ad2fce8ea',
  'x-request-id',
  '75c7ef37-6605-4088-93bf-b82dcdc6b90a',
  'x-envoy-upstream-service-time',
  '628',
  'apim-request-id',
  '75c7ef37-6605-4088-93bf-b82dcdc6b90a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/1d0da4ea-e060-4e2e-a434-7a3ad2fce8ea')
  .reply(200, {"dataFeedId":"1d0da4ea-e060-4e2e-a434-7a3ad2fce8ea","dataFeedName":"js-test-dataExplorerFeed-160522265192805257","metrics":[{"metricId":"0bd7e085-466f-4c0e-b130-ec4b844d5f97","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"bb6f430d-0d5d-4d8e-9d63-6f6898cb2115","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataExplorer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-12T23:11:04Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","query":"let starttime=datetime(@StartTime); let endtime=starttime"}}, [
  'Content-Length',
  '1368',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b1fe6d40-aabb-4926-8c33-fbee57ff44ce',
  'x-envoy-upstream-service-time',
  '330',
  'apim-request-id',
  'b1fe6d40-aabb-4926-8c33-fbee57ff44ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:04 GMT'
]);
