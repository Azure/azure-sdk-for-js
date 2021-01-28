let nock = require('nock');

module.exports.hash = "d7e419c8dc9e81eb6a059400804e158b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureTable","dataFeedName":"js-test-tableFeed-161070014038708289","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://table.example.net","table":"table-name","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/2594e90d-6ac8-4f44-bf81-5ca21a648b04',
  'x-request-id',
  '322138eb-037d-4e45-b6d5-c8e577663114',
  'x-envoy-upstream-service-time',
  '1780',
  'apim-request-id',
  '322138eb-037d-4e45-b6d5-c8e577663114',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/2594e90d-6ac8-4f44-bf81-5ca21a648b04')
  .reply(200, {"dataFeedId":"2594e90d-6ac8-4f44-bf81-5ca21a648b04","dataFeedName":"js-test-tableFeed-161070014038708289","metrics":[{"metricId":"b04c53b3-1536-4cda-b15d-7e1b293135f8","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"0eebb965-f776-4c19-a093-f0b9f648292f","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureTable","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-01-15T08:42:36Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://table.example.net","query":"partition-key eq @start-time","table":"table-name"}}, [
  'Content-Length',
  '1318',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '63d82659-2510-472b-89b9-0cd36f039ca1',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  '63d82659-2510-472b-89b9-0cd36f039ca1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:37 GMT'
]);
