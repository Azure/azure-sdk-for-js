let nock = require('nock');

module.exports.hash = "b9a3cf10cfdec4fc77b26f76d0a2acd3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/020d58e2-fca1-4e87-a3ab-47497986bef6', {"dataSourceType":"MongoDB","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9d785b6d-4576-4ac0-8dd0-a4112f896772',
  'x-envoy-upstream-service-time',
  '544',
  'apim-request-id',
  '9d785b6d-4576-4ac0-8dd0-a4112f896772',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/020d58e2-fca1-4e87-a3ab-47497986bef6')
  .reply(200, {"dataFeedId":"020d58e2-fca1-4e87-a3ab-47497986bef6","dataFeedName":"js-test-postgreSqlFeed-160530907341207128","metrics":[{"metricId":"28d92709-e66a-45ee-bdd3-755f04d5eac5","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"c5e38fde-9535-4847-96ec-30036afc5213","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T23:11:35Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1374',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '19e49765-c54c-4010-ae0a-5f03792b4836',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '19e49765-c54c-4010-ae0a-5f03792b4836',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:36 GMT'
]);
