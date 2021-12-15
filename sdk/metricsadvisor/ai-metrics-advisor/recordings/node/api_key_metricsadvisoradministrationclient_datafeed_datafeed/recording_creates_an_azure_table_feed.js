let nock = require('nock');

module.exports.hash = "5186be9e5ad20b4bbf5c572e069f2571";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureTable","dataFeedName":"js-test-tableFeed-163702279906501923","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://table.example.net","table":"table-name","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/7a3e9ddc-6293-4592-975c-cf3f4489ca38',
  'x-request-id',
  'b9e215c8-982c-46cc-ba80-3e7c24ab0623',
  'x-envoy-upstream-service-time',
  '510',
  'apim-request-id',
  'b9e215c8-982c-46cc-ba80-3e7c24ab0623',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7a3e9ddc-6293-4592-975c-cf3f4489ca38')
  .reply(200, {"dataFeedId":"7a3e9ddc-6293-4592-975c-cf3f4489ca38","dataFeedName":"js-test-tableFeed-163702279906501923","metrics":[{"metricId":"7ae939ea-51a5-4fd1-a90b-530d888a92cf","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"2998c59a-a080-48c9-b2e4-9c8ff3ecd8fb","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureTable","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-16T00:33:27Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"partition-key eq @start-time","table":"table-name"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1256',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8bee3ca5-8088-4e6c-82b7-513aa730842c',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  '8bee3ca5-8088-4e6c-82b7-513aa730842c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:27 GMT'
]);
