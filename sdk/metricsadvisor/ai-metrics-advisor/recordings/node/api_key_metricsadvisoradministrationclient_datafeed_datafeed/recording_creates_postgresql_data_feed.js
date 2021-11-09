let nock = require('nock');

module.exports.hash = "9e9d244b72937c7f2721b82f2bb4a3e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"PostgreSql","dataFeedName":"js-test-postgreSqlFeed-163636432991206063","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-postgresql","query":"{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/f307d2b5-d035-4ac0-ad4c-ac5fca4b5874',
  'x-request-id',
  'bbcba8af-73cd-466a-9ff6-a826c115067c',
  'x-envoy-upstream-service-time',
  '478',
  'apim-request-id',
  'bbcba8af-73cd-466a-9ff6-a826c115067c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f307d2b5-d035-4ac0-ad4c-ac5fca4b5874')
  .reply(200, {"dataFeedId":"f307d2b5-d035-4ac0-ad4c-ac5fca4b5874","dataFeedName":"js-test-postgreSqlFeed-163636432991206063","metrics":[{"metricId":"12f0c3df-2bb8-4afa-bc76-7afa65a6721b","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"a63f50ef-3ac1-427b-8060-da0e206449e9","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"PostgreSql","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T09:39:05Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1272',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cecd3c25-a7d7-484e-b666-794cd224c050',
  'x-envoy-upstream-service-time',
  '148',
  'apim-request-id',
  'cecd3c25-a7d7-484e-b666-794cd224c050',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:04 GMT'
]);
