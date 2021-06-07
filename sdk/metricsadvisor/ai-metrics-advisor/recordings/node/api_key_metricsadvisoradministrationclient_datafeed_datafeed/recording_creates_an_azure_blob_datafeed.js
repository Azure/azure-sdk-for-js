let nock = require('nock');

module.exports.hash = "cbafa67c55ab39a574c7a94b2eed7809";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162267904090104549","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162267904090105484","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162267904090104451","js-test-cosmosFeed-":"js-test-cosmosFeed-162267904090109437","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162267904090102583","js-test-tableFeed-":"js-test-tableFeed-162267904090100706","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162267904090100325","js-test-influxdbFeed-":"js-test-influxdbFeed-162267904090107471","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162267904090103178","js-test-mySqlFeed-":"js-test-mySqlFeed-162267904090105854","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162267904090102577"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-162267904090104549","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/47336207-4e5e-4fd3-997b-20d5428537d5',
  'x-request-id',
  'b5b41c77-1d76-4fbc-abe6-364051df717e',
  'x-envoy-upstream-service-time',
  '722',
  'apim-request-id',
  'b5b41c77-1d76-4fbc-abe6-364051df717e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/47336207-4e5e-4fd3-997b-20d5428537d5')
  .reply(200, {"dataFeedId":"47336207-4e5e-4fd3-997b-20d5428537d5","dataFeedName":"js-test-datafeed-162267904090104549","metrics":[{"metricId":"ac5e5f13-0b75-43b3-86bb-83bb43705a01","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"5a47719f-18f0-45d8-a56b-b4f492b1692d","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-03T00:10:41Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1264',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '133378ff-3727-406a-88fb-13c98d520d12',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  '133378ff-3727-406a-88fb-13c98d520d12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:41 GMT'
]);
