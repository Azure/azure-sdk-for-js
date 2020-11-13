let nock = require('nock');

module.exports.hash = "b9a3cf10cfdec4fc77b26f76d0a2acd3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/fced3f71-4e1c-41c9-8bc2-3532d723a1bc', {"dataSourceType":"MongoDB","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2b87a5d6-78f7-47c6-bb39-cdb909f3f272',
  'x-envoy-upstream-service-time',
  '652',
  'apim-request-id',
  '2b87a5d6-78f7-47c6-bb39-cdb909f3f272',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/fced3f71-4e1c-41c9-8bc2-3532d723a1bc')
  .reply(200, {"dataFeedId":"fced3f71-4e1c-41c9-8bc2-3532d723a1bc","dataFeedName":"js-test-postgreSqlFeed-160530446860002496","metrics":[{"metricId":"0ea012cb-898b-40ee-ae0b-a3d453ea50ac","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"cb3ae179-d902-4dd5-bfc0-7fe309743036","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T21:54:54Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1374',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fd1ebb8a-d02a-4e85-8a2f-bc151eb77ed0',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  'fd1ebb8a-d02a-4e85-8a2f-bc151eb77ed0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:55 GMT'
]);
