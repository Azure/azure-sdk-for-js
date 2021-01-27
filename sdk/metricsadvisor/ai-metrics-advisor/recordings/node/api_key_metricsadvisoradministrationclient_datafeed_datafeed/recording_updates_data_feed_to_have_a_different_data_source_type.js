let nock = require('nock');

module.exports.hash = "e715c57994a9ddec5332496c48521770";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/55343889-8ee9-4f18-9235-3f49607c9eb4', {"dataSourceType":"MongoDB","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c0fa3748-b8e5-4d12-9835-f1abea678a5a',
  'x-envoy-upstream-service-time',
  '455',
  'apim-request-id',
  'c0fa3748-b8e5-4d12-9835-f1abea678a5a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/55343889-8ee9-4f18-9235-3f49607c9eb4')
  .reply(200, {"dataFeedId":"55343889-8ee9-4f18-9235-3f49607c9eb4","dataFeedName":"js-test-postgreSqlFeed-161070014038706199","metrics":[{"metricId":"83b68ed2-7c0e-4ff4-b422-5a02394adadd","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"eada1102-533e-45a5-a1a9-e60d9e708c33","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-01-15T08:42:48Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1374',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a09969eb-c4ba-4b52-9198-babf560c2939',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  'a09969eb-c4ba-4b52-9198-babf560c2939',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:50 GMT'
]);
