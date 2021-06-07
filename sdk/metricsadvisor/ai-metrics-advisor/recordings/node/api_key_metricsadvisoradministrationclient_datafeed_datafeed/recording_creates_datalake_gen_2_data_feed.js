let nock = require('nock');

module.exports.hash = "54e0f75c85f3b4f3e8c663437b5cc74e";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162285909638603598","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162285909638608943","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162285909638607193","js-test-cosmosFeed-":"js-test-cosmosFeed-162285909638600660","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162285909638603277","js-test-tableFeed-":"js-test-tableFeed-162285909638606405","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162285909638604382","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-162285909638603535","js-test-influxdbFeed-":"js-test-influxdbFeed-162285909638606548","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162285909638607690","js-test-mySqlFeed-":"js-test-mySqlFeed-162285909638606014","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162285909638601413","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-162285909638606528"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataLakeStorageGen2","dataFeedName":"js-test-dataLakeGenFeed-162285909638606528","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"accountName":"account-name","accountKey":"account-key","fileSystemName":"file-system-name","directoryTemplate":"directory-template","fileTemplate":"file-template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/f380c2da-2279-43f6-b2a7-b696aa56b700',
  'x-request-id',
  '856f3c77-173e-4e51-8a58-b778fd658a87',
  'x-envoy-upstream-service-time',
  '749',
  'apim-request-id',
  '856f3c77-173e-4e51-8a58-b778fd658a87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 02:11:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f380c2da-2279-43f6-b2a7-b696aa56b700')
  .reply(200, {"dataFeedId":"f380c2da-2279-43f6-b2a7-b696aa56b700","dataFeedName":"js-test-dataLakeGenFeed-162285909638606528","metrics":[{"metricId":"f79468a0-b787-483b-bfd3-826e56842db6","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"2a5e128c-b708-4ac8-9e58-0543f91512f3","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataLakeStorageGen2","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-05T02:11:36Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"fileTemplate":"file-template","accountName":"account-name","directoryTemplate":"directory-template","fileSystemName":"file-system-name"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1353',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2ff7f720-b561-4d5a-ae1b-113fb0ee7d77',
  'x-envoy-upstream-service-time',
  '193',
  'apim-request-id',
  '2ff7f720-b561-4d5a-ae1b-113fb0ee7d77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 02:11:37 GMT'
]);
