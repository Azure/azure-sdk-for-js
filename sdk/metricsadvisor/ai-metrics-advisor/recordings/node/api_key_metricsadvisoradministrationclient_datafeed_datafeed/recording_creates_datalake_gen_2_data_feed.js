let nock = require('nock');

module.exports.hash = "08381dcda5cf9628f8e8572591a59161";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataLakeStorageGen2","dataFeedName":"js-test-dataLakeGenFeed-163634432099900487","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"accountName":"account-name","accountKey":"account-key","fileSystemName":"file-system-name","directoryTemplate":"directory-template","fileTemplate":"file-template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/38939295-00b9-417e-9e2b-fd82e66010f1',
  'x-request-id',
  'd402aac4-479d-4d14-8814-db96c31c282e',
  'x-envoy-upstream-service-time',
  '651',
  'apim-request-id',
  'd402aac4-479d-4d14-8814-db96c31c282e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/38939295-00b9-417e-9e2b-fd82e66010f1')
  .reply(200, {"dataFeedId":"38939295-00b9-417e-9e2b-fd82e66010f1","dataFeedName":"js-test-dataLakeGenFeed-163634432099900487","metrics":[{"metricId":"bf9ad732-27ab-4039-9cd7-d818f852a03a","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"91bcfc81-9010-4b1c-b9bc-aa0609e1b8dd","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataLakeStorageGen2","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:36Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"fileTemplate":"file-template","accountName":"account-name","directoryTemplate":"directory-template","fileSystemName":"file-system-name"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1353',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6d081e34-2f02-4e96-8f8e-ad1b38441f25',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  '6d081e34-2f02-4e96-8f8e-ad1b38441f25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:36 GMT'
]);
