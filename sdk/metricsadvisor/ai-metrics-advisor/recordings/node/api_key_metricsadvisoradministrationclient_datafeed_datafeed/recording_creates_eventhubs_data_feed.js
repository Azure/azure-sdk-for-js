let nock = require('nock');

module.exports.hash = "b305b062177574b168150bc47bb53ffe";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162508946944502353","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162508946944504837","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162508946944506617","js-test-cosmosFeed-":"js-test-cosmosFeed-162508946944505568","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162508946944505953","js-test-tableFeed-":"js-test-tableFeed-162508946944505637","js-test-eventhubRequestFeed-":"js-test-eventhubRequestFeed-162508946944506472","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-162508946944503585","js-test-influxdbFeed-":"js-test-influxdbFeed-162508946944501773","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162508946944503448","js-test-mySqlFeed-":"js-test-mySqlFeed-162508946944509246","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162508946944503668","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-162508946944504276"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureEventHubs","dataFeedName":"js-test-eventhubRequestFeed-162508946944506472","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"eventhub-connection-string","consumerGroup":"consumer-group"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/38c952af-7a0c-403e-bdb0-f7576cf22575',
  'x-request-id',
  'c01157c3-78d4-47c3-b5f0-a8e788908a42',
  'x-envoy-upstream-service-time',
  '1568',
  'apim-request-id',
  'c01157c3-78d4-47c3-b5f0-a8e788908a42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 21:44:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/38c952af-7a0c-403e-bdb0-f7576cf22575')
  .reply(200, {"dataFeedId":"38c952af-7a0c-403e-bdb0-f7576cf22575","dataFeedName":"js-test-eventhubRequestFeed-162508946944506472","metrics":[{"metricId":"b02b1eee-dbfa-4b51-93c1-632f05b50173","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"c7e79d6b-505c-4f15-83b5-c5b8654270c2","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2021-06-30T00:00:00Z","dataSourceType":"AzureEventHubs","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-30T21:44:30Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"consumerGroup":"consumer-group"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1237',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cac70470-15ff-402f-8940-aa8d720d67b2',
  'x-envoy-upstream-service-time',
  '436',
  'apim-request-id',
  'cac70470-15ff-402f-8940-aa8d720d67b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 21:44:30 GMT'
]);
