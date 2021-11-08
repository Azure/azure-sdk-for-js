let nock = require('nock');

module.exports.hash = "14a59b7c0e25a01bab2e00358aaee7ae";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/82a8f4b6-5d84-4307-b1a3-bab0bd63c9c1', {"dataSourceType":"MongoDB","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(200, {"dataFeedId":"82a8f4b6-5d84-4307-b1a3-bab0bd63c9c1","dataFeedName":"js-test-postgreSqlFeed-163634432099907133","metrics":[{"metricId":"9f24c03f-e339-4a24-8c62-5bf2356b269a","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"3796ddb0-578c-40ed-a525-d43c9eb96790","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:39Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2cf63947-dcb0-4637-911d-1c5f83218ff3',
  'x-envoy-upstream-service-time',
  '745',
  'apim-request-id',
  '2cf63947-dcb0-4637-911d-1c5f83218ff3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:40 GMT'
]);
