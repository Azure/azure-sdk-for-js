let nock = require('nock');

module.exports.hash = "08381dcda5cf9628f8e8572591a59161";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataLakeStorageGen2","dataFeedName":"js-test-dataLakeGenFeed-163702279906507664","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"accountName":"account-name","accountKey":"account-key","fileSystemName":"file-system-name","directoryTemplate":"directory-template","fileTemplate":"file-template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/64c76237-0519-432c-919f-c29aee412467',
  'x-request-id',
  'a30b136b-e3a7-4433-99ec-021664517780',
  'x-envoy-upstream-service-time',
  '579',
  'apim-request-id',
  'a30b136b-e3a7-4433-99ec-021664517780',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/64c76237-0519-432c-919f-c29aee412467')
  .reply(200, {"dataFeedId":"64c76237-0519-432c-919f-c29aee412467","dataFeedName":"js-test-dataLakeGenFeed-163702279906507664","metrics":[{"metricId":"9c12edf4-7139-4c4a-bd93-f41ae9d13629","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"1a9b3b19-2053-4f33-97d0-5efa54383e18","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataLakeStorageGen2","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-16T00:33:32Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"fileTemplate":"file-template","accountName":"account-name","directoryTemplate":"directory-template","fileSystemName":"file-system-name"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1353',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cd41e41f-ed41-42a3-b08d-931cefc0a193',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  'cd41e41f-ed41-42a3-b08d-931cefc0a193',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:32 GMT'
]);
