let nock = require('nock');

module.exports.hash = "1b5ec92714d0b328b605da17efe0edd4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"MySql","dataFeedName":"js-test-mySqlFeed-161070014038708553","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://connect-to-mysql","query":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/5ff8be39-5ec4-47b7-9550-f70ab9ef03c6',
  'x-request-id',
  '8d1ebaa7-402a-4ca0-b909-cfc190eaf50c',
  'x-envoy-upstream-service-time',
  '619',
  'apim-request-id',
  '8d1ebaa7-402a-4ca0-b909-cfc190eaf50c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5ff8be39-5ec4-47b7-9550-f70ab9ef03c6')
  .reply(200, {"dataFeedId":"5ff8be39-5ec4-47b7-9550-f70ab9ef03c6","dataFeedName":"js-test-mySqlFeed-161070014038708553","metrics":[{"metricId":"8f2d2945-a421-47ed-a3c5-11e14e182d02","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"68789a45-f0ab-4780-9183-f163ff637e08","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MySql","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-01-15T08:42:46Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-mysql","query":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1320',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8dc4beff-ebd7-40e6-9746-6e9dc0621f10',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '8dc4beff-ebd7-40e6-9746-6e9dc0621f10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:46 GMT'
]);
