let nock = require('nock');

module.exports.hash = "76d2ee155f56b2829daa0e273b0c9142";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureTable","dataFeedName":"js-test-tableFeed-160529679231907504","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://table.example.net","table":"table-name","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/b2ce61bd-bcff-4187-9c17-c2940ff7456b',
  'x-request-id',
  '70c07a7c-5632-461b-a894-6fa8db27ae50',
  'x-envoy-upstream-service-time',
  '598',
  'apim-request-id',
  '70c07a7c-5632-461b-a894-6fa8db27ae50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/b2ce61bd-bcff-4187-9c17-c2940ff7456b')
  .reply(200, {"dataFeedId":"b2ce61bd-bcff-4187-9c17-c2940ff7456b","dataFeedName":"js-test-tableFeed-160529679231907504","metrics":[{"metricId":"e313ab80-d963-4ce6-8ac6-220f3cb7b022","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"ff154a36-c7c3-463c-a5b8-30d80d3b6e59","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureTable","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:41Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://table.example.net","query":"partition-key eq @start-time","table":"table-name"}}, [
  'Content-Length',
  '1318',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c03fe1b5-0db8-41f5-9389-cbbaffee7119',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  'c03fe1b5-0db8-41f5-9389-cbbaffee7119',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:41 GMT'
]);
