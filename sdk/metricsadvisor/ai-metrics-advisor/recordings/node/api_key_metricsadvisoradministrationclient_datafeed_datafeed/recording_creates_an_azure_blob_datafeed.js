let nock = require('nock');

module.exports.hash = "413113d9b30eef2f13c2941fcef17d32";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-163636432991208086","js-test-appInsightsFeed-":"js-test-appInsightsFeed-163636432991200664","js-test-sqlServerFeed-":"js-test-sqlServerFeed-163636432991201829","js-test-cosmosFeed-":"js-test-cosmosFeed-163636432991203498","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-163636432991202839","js-test-tableFeed-":"js-test-tableFeed-163636432991202040","js-test-eventhubRequestFeed-":"js-test-eventhubRequestFeed-163636432991207558","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-163636432991201243","js-test-influxdbFeed-":"js-test-influxdbFeed-163636432991201996","js-test-mongoDbFeed-":"js-test-mongoDbFeed-163636432991203796","js-test-mySqlFeed-":"js-test-mySqlFeed-163636432991201291","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-163636432991206063","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-163636432991208484"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-163636432991208086","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/c9673522-01d6-4068-b7f9-845ea1c46f4b',
  'x-request-id',
  '6e3297cf-c080-4ecb-9d7b-fd52726a118f',
  'x-envoy-upstream-service-time',
  '598',
  'apim-request-id',
  '6e3297cf-c080-4ecb-9d7b-fd52726a118f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c9673522-01d6-4068-b7f9-845ea1c46f4b')
  .reply(200, {"dataFeedId":"c9673522-01d6-4068-b7f9-845ea1c46f4b","dataFeedName":"js-test-datafeed-163636432991208086","metrics":[{"metricId":"f27b8776-ecaf-4de2-ac62-9db4f09a2dcb","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"b90b6ea5-7c38-4a60-a312-04122cb11ca9","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T09:38:50Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'dfbbba74-c4da-4285-bdf4-e16261f19842',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  'dfbbba74-c4da-4285-bdf4-e16261f19842',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:50 GMT'
]);
