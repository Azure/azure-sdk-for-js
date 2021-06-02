let nock = require('nock');

module.exports.hash = "f42b96ca5c10ec9b5b2fb0467b00c31e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/7f3ce8dd-7404-46f6-8993-ca7e29f6af34', {"dataSourceType":"MongoDB","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(200, {"dataFeedId":"7f3ce8dd-7404-46f6-8993-ca7e29f6af34","dataFeedName":"js-test-postgreSqlFeed-162260297550800642","metrics":[{"metricId":"0ac784be-5e22-4de1-8617-050a10a8da67","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"6068b063-3bec-4634-8c13-47d03b3add48","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T03:03:24Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '73c3cb2d-7e54-4723-937d-7c5611929b98',
  'x-envoy-upstream-service-time',
  '755',
  'apim-request-id',
  '73c3cb2d-7e54-4723-937d-7c5611929b98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7f3ce8dd-7404-46f6-8993-ca7e29f6af34')
  .reply(200, {"dataFeedId":"7f3ce8dd-7404-46f6-8993-ca7e29f6af34","dataFeedName":"js-test-postgreSqlFeed-162260297550800642","metrics":[{"metricId":"0ac784be-5e22-4de1-8617-050a10a8da67","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"6068b063-3bec-4634-8c13-47d03b3add48","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T03:03:24Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '167f2fca-f3b8-40af-b4ec-48e56bee9305',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  '167f2fca-f3b8-40af-b4ec-48e56bee9305',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:25 GMT'
]);
