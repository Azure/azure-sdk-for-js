let nock = require('nock');

module.exports.hash = "b6a74d9b0729403e262c11fc6d370f47";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162259142558609322","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162259142558609602","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162259142558603790","js-test-cosmosFeed-":"js-test-cosmosFeed-162259142558607189","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162259142558601847","js-test-tableFeed-":"js-test-tableFeed-162259142558601648","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162259142558602928","js-test-influxdbFeed-":"js-test-influxdbFeed-162259142558604723","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162259142558603870","js-test-mySqlFeed-":"js-test-mySqlFeed-162259142558601586","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162259142558609751"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-162259142558609322","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/d50846c3-7019-44c4-addb-197416c56814',
  'x-request-id',
  '7e3cdd62-4643-49dc-998e-7f66c5199b7d',
  'x-envoy-upstream-service-time',
  '444',
  'apim-request-id',
  '7e3cdd62-4643-49dc-998e-7f66c5199b7d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Jun 2021 23:50:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d50846c3-7019-44c4-addb-197416c56814')
  .reply(200, {"dataFeedId":"d50846c3-7019-44c4-addb-197416c56814","dataFeedName":"js-test-datafeed-162259142558609322","metrics":[{"metricId":"e0c8d225-96c1-41fd-b2ce-dc4576fd10b4","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"70de0efe-6a61-48ab-98a3-bac074b99b67","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-01T23:50:25Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1264',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '495ebdf7-be44-4293-8acf-b4e2129212e2',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  '495ebdf7-be44-4293-8acf-b4e2129212e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Jun 2021 23:50:25 GMT'
]);
