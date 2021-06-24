let nock = require('nock');

module.exports.hash = "20a42b7c23b773a1da152bf8cfd1872b";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162286540825106897","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162286540825103508","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162286540825102841","js-test-cosmosFeed-":"js-test-cosmosFeed-162286540825109497","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162286540825100498","js-test-tableFeed-":"js-test-tableFeed-162286540825106607","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162286540825107845","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-162286540825103590","js-test-influxdbFeed-":"js-test-influxdbFeed-162286540825109243","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162286540825106090","js-test-mySqlFeed-":"js-test-mySqlFeed-162286540825102842","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162286540825106280","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-162286540825100711"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureEventHubs","dataFeedName":"js-test-httpRequestFeed-162286540825107845","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"eventhub-connection-string","consumerGroup":"consumer-group"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/f6e5a8cb-398a-4d5a-89e7-56d1307d72c5',
  'x-request-id',
  '386f4c2e-85ca-46e5-a265-388c1387d4de',
  'x-envoy-upstream-service-time',
  '749',
  'apim-request-id',
  '386f4c2e-85ca-46e5-a265-388c1387d4de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 03:56:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f6e5a8cb-398a-4d5a-89e7-56d1307d72c5')
  .reply(200, {"dataFeedId":"f6e5a8cb-398a-4d5a-89e7-56d1307d72c5","dataFeedName":"js-test-httpRequestFeed-162286540825107845","metrics":[{"metricId":"15512319-f95c-48ae-aeca-f775497fbc35","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"395ca396-b5d4-45a3-96fa-d0adc40873f8","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2021-06-05T00:00:00Z","dataSourceType":"AzureEventHubs","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-05T03:56:48Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"consumerGroup":"consumer-group"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1233',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a44fa8ca-54d1-48e6-b609-a38894c2d09d',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  'a44fa8ca-54d1-48e6-b609-a38894c2d09d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 03:56:48 GMT'
]);
