let nock = require('nock');

module.exports.hash = "5186be9e5ad20b4bbf5c572e069f2571";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureTable","dataFeedName":"js-test-tableFeed-163978429259809218","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://table.example.net","table":"table-name","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/d98674ef-0215-4008-8f2d-3551a916afd3',
  'x-request-id',
  '45671b21-ad5a-49b0-8b8d-ee1dd20c3ed1',
  'x-envoy-upstream-service-time',
  '496',
  'apim-request-id',
  '45671b21-ad5a-49b0-8b8d-ee1dd20c3ed1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/d98674ef-0215-4008-8f2d-3551a916afd3')
  .reply(200, {"dataFeedId":"d98674ef-0215-4008-8f2d-3551a916afd3","dataFeedName":"js-test-tableFeed-163978429259809218","metrics":[{"metricId":"5eab8f6e-20f3-40a4-bbe8-f43421b7b394","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"20b68f7d-6e17-4ef6-a981-4e4dec34931c","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureTable","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:21Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"partition-key eq @start-time","table":"table-name"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1256',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f6acb10e-7fc1-48a6-ac06-2cb62ef01989',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  'f6acb10e-7fc1-48a6-ac06-2cb62ef01989',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:21 GMT'
]);
