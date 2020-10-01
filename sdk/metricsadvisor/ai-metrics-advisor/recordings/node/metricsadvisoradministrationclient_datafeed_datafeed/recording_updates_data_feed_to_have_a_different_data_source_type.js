let nock = require('nock');

module.exports.hash = "b9a3cf10cfdec4fc77b26f76d0a2acd3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/0c05dc38-7d21-4250-92b4-816561701d63', {"dataSourceType":"MongoDB","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'cd1e9f2b-cb98-4e5a-a7fd-4f422e5736bf',
  'x-envoy-upstream-service-time',
  '473',
  'apim-request-id',
  'cd1e9f2b-cb98-4e5a-a7fd-4f422e5736bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 28 Sep 2020 23:00:34 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0c05dc38-7d21-4250-92b4-816561701d63')
  .reply(200, {"dataFeedId":"0c05dc38-7d21-4250-92b4-816561701d63","dataFeedName":"js-test-postgreSqlFeed-160133402256203902","metrics":[{"metricId":"3bff5e2c-3200-4030-9c7a-ce24a861fee2","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"26edafa5-8765-4530-8a7b-2f93f516a92a","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-28T23:00:23Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1365',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '37c7f203-c136-4ed9-8efa-23796bda0386',
  'x-envoy-upstream-service-time',
  '5246',
  'apim-request-id',
  '37c7f203-c136-4ed9-8efa-23796bda0386',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 28 Sep 2020 23:00:41 GMT',
  'Connection',
  'close'
]);
