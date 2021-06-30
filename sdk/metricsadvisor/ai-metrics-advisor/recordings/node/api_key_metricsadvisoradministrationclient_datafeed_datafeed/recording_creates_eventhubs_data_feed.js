let nock = require('nock');

module.exports.hash = "b305b062177574b168150bc47bb53ffe";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162501551554005490","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162501551554000546","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162501551554009942","js-test-cosmosFeed-":"js-test-cosmosFeed-162501551554005145","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162501551554001135","js-test-tableFeed-":"js-test-tableFeed-162501551554004299","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162501551554000108","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-162501551554008257","js-test-influxdbFeed-":"js-test-influxdbFeed-162501551554008797","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162501551554001708","js-test-mySqlFeed-":"js-test-mySqlFeed-162501551554009128","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162501551554007077","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-162501551554009182"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureEventHubs","dataFeedName":"js-test-httpRequestFeed-162501551554000108","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"eventhub-connection-string","consumerGroup":"consumer-group"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/f46f05e8-727e-4d5b-b06c-c32568a3b7c0',
  'x-request-id',
  'b25da752-9922-4afc-9862-a12bdd1e005a',
  'x-envoy-upstream-service-time',
  '1613',
  'apim-request-id',
  'b25da752-9922-4afc-9862-a12bdd1e005a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 01:11:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f46f05e8-727e-4d5b-b06c-c32568a3b7c0')
  .reply(200, {"dataFeedId":"f46f05e8-727e-4d5b-b06c-c32568a3b7c0","dataFeedName":"js-test-httpRequestFeed-162501551554000108","metrics":[{"metricId":"9c8b2b1e-e0d8-43f1-97d6-a31a2f1447b2","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"63b175eb-f19d-4d08-9488-95caba4b1d67","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2021-06-30T00:00:00Z","dataSourceType":"AzureEventHubs","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-30T01:11:56Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"consumerGroup":"consumer-group"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1233',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4ee58bc0-6688-41e0-ba63-fb564b4a3bf0',
  'x-envoy-upstream-service-time',
  '525',
  'apim-request-id',
  '4ee58bc0-6688-41e0-ba63-fb564b4a3bf0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 01:11:57 GMT'
]);
