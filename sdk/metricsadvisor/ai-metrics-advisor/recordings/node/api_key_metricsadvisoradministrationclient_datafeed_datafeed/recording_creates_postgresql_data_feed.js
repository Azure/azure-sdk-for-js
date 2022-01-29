let nock = require('nock');

module.exports.hash = "21408b1a2ee0685c49220932bb357acf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"PostgreSql","dataFeedName":"js-test-postgreSqlFeed-164264035316902056","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-postgresql","query":"{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/4d4faf65-0a08-44ce-9b11-4af0573bf187',
  'x-request-id',
  '09f67e73-d074-4733-b824-b2fb22788787',
  'x-envoy-upstream-service-time',
  '512',
  'apim-request-id',
  '09f67e73-d074-4733-b824-b2fb22788787',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/4d4faf65-0a08-44ce-9b11-4af0573bf187')
  .reply(200, {"dataFeedId":"4d4faf65-0a08-44ce-9b11-4af0573bf187","dataFeedName":"js-test-postgreSqlFeed-164264035316902056","metrics":[{"metricId":"37ace75a-15ef-43dc-9ee3-7a3aaff08bd6","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"bbe242d7-f261-4c75-8c85-86bd32610142","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"PostgreSql","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2022-01-20T00:59:28Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1272',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b3fdc275-cae6-4757-9b34-c2bb3514c44d',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  'b3fdc275-cae6-4757-9b34-c2bb3514c44d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:28 GMT'
]);
