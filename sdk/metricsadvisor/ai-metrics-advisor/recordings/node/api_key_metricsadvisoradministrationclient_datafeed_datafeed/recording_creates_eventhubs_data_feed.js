let nock = require('nock');

module.exports.hash = "b305b062177574b168150bc47bb53ffe";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162508841461600525","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162508841461602735","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162508841461605759","js-test-cosmosFeed-":"js-test-cosmosFeed-162508841461708559","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162508841461700596","js-test-tableFeed-":"js-test-tableFeed-162508841461703680","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162508841461705326","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-162508841461700827","js-test-influxdbFeed-":"js-test-influxdbFeed-162508841461706455","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162508841461700802","js-test-mySqlFeed-":"js-test-mySqlFeed-162508841461701315","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162508841461703784","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-162508841461709005"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureEventHubs","dataFeedName":"js-test-httpRequestFeed-162508841461705326","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"eventhub-connection-string","consumerGroup":"consumer-group"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/97101930-32aa-4bd2-a63c-2ad543c51fcf',
  'x-request-id',
  '72d3763e-83b0-48a5-830e-758e73d99c24',
  'x-envoy-upstream-service-time',
  '1580',
  'apim-request-id',
  '72d3763e-83b0-48a5-830e-758e73d99c24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 21:26:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/97101930-32aa-4bd2-a63c-2ad543c51fcf')
  .reply(200, {"dataFeedId":"97101930-32aa-4bd2-a63c-2ad543c51fcf","dataFeedName":"js-test-httpRequestFeed-162508841461705326","metrics":[{"metricId":"062f9570-c3b9-4bf0-95fb-a0865c34f7fb","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"70129bc5-6dc9-439d-ae4c-bafd38a26507","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2021-06-30T00:00:00Z","dataSourceType":"AzureEventHubs","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-30T21:26:55Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"consumerGroup":"consumer-group"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1233',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9f89015a-01ea-4201-9a83-323abba43801',
  'x-envoy-upstream-service-time',
  '415',
  'apim-request-id',
  '9f89015a-01ea-4201-9a83-323abba43801',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 21:26:56 GMT'
]);
