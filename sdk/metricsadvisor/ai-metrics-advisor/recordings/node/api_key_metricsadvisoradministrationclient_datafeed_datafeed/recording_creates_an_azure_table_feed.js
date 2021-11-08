let nock = require('nock');

module.exports.hash = "5186be9e5ad20b4bbf5c572e069f2571";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureTable","dataFeedName":"js-test-tableFeed-163634432099804800","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://table.example.net","table":"table-name","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/60f6fdea-b0d6-41dc-9583-7f9667666a3c',
  'x-request-id',
  '0639b710-69a6-49d7-95a2-55aa8c9c60ce',
  'x-envoy-upstream-service-time',
  '611',
  'apim-request-id',
  '0639b710-69a6-49d7-95a2-55aa8c9c60ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/60f6fdea-b0d6-41dc-9583-7f9667666a3c')
  .reply(200, {"dataFeedId":"60f6fdea-b0d6-41dc-9583-7f9667666a3c","dataFeedName":"js-test-tableFeed-163634432099804800","metrics":[{"metricId":"0bb234e1-2365-4e3e-8eaa-98c2dc539795","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"12efbfdf-d4b2-4497-8d27-ebd9cf92861c","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureTable","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:30Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"partition-key eq @start-time","table":"table-name"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1256',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '48d19e57-244e-4c0a-a2ea-17b7d6a2e785',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  '48d19e57-244e-4c0a-a2ea-17b7d6a2e785',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:30 GMT'
]);
