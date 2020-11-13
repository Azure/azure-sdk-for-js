let nock = require('nock');

module.exports.hash = "b9a3cf10cfdec4fc77b26f76d0a2acd3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/2e7d3691-1dc2-4632-8116-bbe8cfa59335', {"dataSourceType":"MongoDB","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2c5f0f94-790c-46cb-9505-a8c723bc7639',
  'x-envoy-upstream-service-time',
  '1139',
  'apim-request-id',
  '2c5f0f94-790c-46cb-9505-a8c723bc7639',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/2e7d3691-1dc2-4632-8116-bbe8cfa59335')
  .reply(200, {"dataFeedId":"2e7d3691-1dc2-4632-8116-bbe8cfa59335","dataFeedName":"js-test-postgreSqlFeed-160530497949304478","metrics":[{"metricId":"98f1a450-0991-4548-ac32-10f636206ce3","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"5caca682-2ba0-4b8d-8093-e638e5523e04","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T22:03:29Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1374',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8c232f00-998b-4fe3-9656-533b3e2c39e5',
  'x-envoy-upstream-service-time',
  '372',
  'apim-request-id',
  '8c232f00-998b-4fe3-9656-533b3e2c39e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:32 GMT'
]);
