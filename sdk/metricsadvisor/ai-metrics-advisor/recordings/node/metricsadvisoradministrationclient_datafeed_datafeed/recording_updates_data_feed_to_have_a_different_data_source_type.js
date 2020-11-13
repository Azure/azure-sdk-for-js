let nock = require('nock');

module.exports.hash = "b9a3cf10cfdec4fc77b26f76d0a2acd3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/9c107e23-c9f8-4c2c-a0df-60bd4718b262', {"dataSourceType":"MongoDB","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '40ca0a56-dc82-4ed9-8d00-f2c3218e29c7',
  'x-envoy-upstream-service-time',
  '637',
  'apim-request-id',
  '40ca0a56-dc82-4ed9-8d00-f2c3218e29c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9c107e23-c9f8-4c2c-a0df-60bd4718b262')
  .reply(200, {"dataFeedId":"9c107e23-c9f8-4c2c-a0df-60bd4718b262","dataFeedName":"js-test-postgreSqlFeed-160529679231900484","metrics":[{"metricId":"196ac109-6863-425a-9b79-328c90f594de","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"4023352d-7b2d-48f2-b4ed-4aae3dbb2496","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:48Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1374',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '321c2302-e8ec-4572-98cf-f2fb8fa29e5b',
  'x-envoy-upstream-service-time',
  '293',
  'apim-request-id',
  '321c2302-e8ec-4572-98cf-f2fb8fa29e5b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:49 GMT'
]);
