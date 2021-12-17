let nock = require('nock');

module.exports.hash = "08381dcda5cf9628f8e8572591a59161";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataLakeStorageGen2","dataFeedName":"js-test-dataLakeGenFeed-163978429259803372","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"accountName":"account-name","accountKey":"account-key","fileSystemName":"file-system-name","directoryTemplate":"directory-template","fileTemplate":"file-template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/8a16b9eb-6ead-4116-9cae-da52862aa00f',
  'x-request-id',
  'b94a218e-d887-4b90-8f3b-8d2b52d4aff9',
  'x-envoy-upstream-service-time',
  '493',
  'apim-request-id',
  'b94a218e-d887-4b90-8f3b-8d2b52d4aff9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/8a16b9eb-6ead-4116-9cae-da52862aa00f')
  .reply(200, {"dataFeedId":"8a16b9eb-6ead-4116-9cae-da52862aa00f","dataFeedName":"js-test-dataLakeGenFeed-163978429259803372","metrics":[{"metricId":"92732a6f-58ee-4159-92e4-6bfd4216cab8","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"34385787-db90-4db8-ae08-b71a51c9585a","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataLakeStorageGen2","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:26Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"fileTemplate":"file-template","accountName":"account-name","directoryTemplate":"directory-template","fileSystemName":"file-system-name"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1353',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5a34fcd3-839d-44c7-bdcc-587a2c24a76c',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '5a34fcd3-839d-44c7-bdcc-587a2c24a76c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:26 GMT'
]);
