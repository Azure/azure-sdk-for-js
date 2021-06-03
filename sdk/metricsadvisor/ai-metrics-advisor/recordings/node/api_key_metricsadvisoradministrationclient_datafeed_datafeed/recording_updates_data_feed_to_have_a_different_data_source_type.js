let nock = require('nock');

module.exports.hash = "f42b96ca5c10ec9b5b2fb0467b00c31e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/6180ba7c-dc5f-4baf-9f00-898718b6b87f', {"dataSourceType":"MongoDB","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(200, {"dataFeedId":"6180ba7c-dc5f-4baf-9f00-898718b6b87f","dataFeedName":"js-test-postgreSqlFeed-162267904090102577","metrics":[{"metricId":"d92b4675-3757-4d35-951e-a903948dd2ec","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"96428b0b-fbd6-4da2-a3a1-a2a72ad3e792","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-03T00:11:08Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b56aebd0-880c-4332-82c9-167c18e1343b',
  'x-envoy-upstream-service-time',
  '1001',
  'apim-request-id',
  'b56aebd0-880c-4332-82c9-167c18e1343b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6180ba7c-dc5f-4baf-9f00-898718b6b87f')
  .reply(200, {"dataFeedId":"6180ba7c-dc5f-4baf-9f00-898718b6b87f","dataFeedName":"js-test-postgreSqlFeed-162267904090102577","metrics":[{"metricId":"d92b4675-3757-4d35-951e-a903948dd2ec","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"96428b0b-fbd6-4da2-a3a1-a2a72ad3e792","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-03T00:11:08Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5be44903-f84f-4775-bdf7-905483dbb1ee',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  '5be44903-f84f-4775-bdf7-905483dbb1ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:10 GMT'
]);
