let nock = require('nock');

module.exports.hash = "6686ffeb000fe6e65256c94d6ecb6584";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"SqlServer","dataFeedName":"js-test-sqlServerFeed-163634432099804880","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"sqlServer_connection_string","query":"select * from adsample2 where Timestamp = @StartTime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/dc36bd57-e9f4-4495-ba4b-e3ea2fa7aa15',
  'x-request-id',
  '29457368-35d5-4f69-9ed8-779d9ec75e54',
  'x-envoy-upstream-service-time',
  '593',
  'apim-request-id',
  '29457368-35d5-4f69-9ed8-779d9ec75e54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/dc36bd57-e9f4-4495-ba4b-e3ea2fa7aa15')
  .reply(200, {"dataFeedId":"dc36bd57-e9f4-4495-ba4b-e3ea2fa7aa15","dataFeedName":"js-test-sqlServerFeed-163634432099804880","metrics":[{"metricId":"6d314c21-6004-4890-89f6-c5f79f2cad77","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"b51dd332-c4fb-4914-9137-181094c914de","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:24Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"select * from adsample2 where Timestamp = @StartTime"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1262',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ff7d12f2-2503-40d6-b2ad-005147e85921',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  'ff7d12f2-2503-40d6-b2ad-005147e85921',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:24 GMT'
]);
