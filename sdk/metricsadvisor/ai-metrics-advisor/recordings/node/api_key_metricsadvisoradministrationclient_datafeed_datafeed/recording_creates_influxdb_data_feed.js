let nock = require('nock');

module.exports.hash = "032a09938d4f27dfae54c12cebe5fff2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"InfluxDB","dataFeedName":"js-test-influxdbFeed-163634432099905915","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","database":"data-feed-database","userName":"user","password":"SecretPlaceholder","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/5330d7b1-2e05-4a6d-b708-ab21ce1a402b',
  'x-request-id',
  '06a21606-e2db-4dc4-b230-d4f27d5a8a35',
  'x-envoy-upstream-service-time',
  '585',
  'apim-request-id',
  '06a21606-e2db-4dc4-b230-d4f27d5a8a35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5330d7b1-2e05-4a6d-b708-ab21ce1a402b')
  .reply(200, {"dataFeedId":"5330d7b1-2e05-4a6d-b708-ab21ce1a402b","dataFeedName":"js-test-influxdbFeed-163634432099905915","metrics":[{"metricId":"e5bb6bdf-b1d5-4926-ab25-09118c362965","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"91892626-914c-4626-a739-e557770f4258","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"InfluxDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:31Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","database":"data-feed-database","query":"partition-key eq @start-time","userName":"user"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9494f9fe-d1a1-4e98-8844-efe7100c75a6',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  '9494f9fe-d1a1-4e98-8844-efe7100c75a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:31 GMT'
]);
