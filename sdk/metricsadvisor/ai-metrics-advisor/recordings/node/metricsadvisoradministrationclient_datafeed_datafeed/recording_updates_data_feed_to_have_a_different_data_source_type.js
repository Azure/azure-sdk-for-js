let nock = require('nock');

module.exports.hash = "b9a3cf10cfdec4fc77b26f76d0a2acd3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/f4c738f2-6671-43ad-9a8e-86f0d37e7f10', {"dataSourceType":"MongoDB","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '057c83fc-24d9-4306-bb12-c67e16ff6e18',
  'x-envoy-upstream-service-time',
  '1193',
  'apim-request-id',
  '057c83fc-24d9-4306-bb12-c67e16ff6e18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f4c738f2-6671-43ad-9a8e-86f0d37e7f10')
  .reply(200, {"dataFeedId":"f4c738f2-6671-43ad-9a8e-86f0d37e7f10","dataFeedName":"js-test-postgreSqlFeed-160523008231707053","metrics":[{"metricId":"3ba1a177-596e-4737-8ba9-caabcf6651a9","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"ffe82a95-615a-4c29-9995-9633a461e874","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T01:15:09Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1388',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5c8da7b1-f850-47e8-b163-05b161272316',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  '5c8da7b1-f850-47e8-b163-05b161272316',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:11 GMT'
]);
