let nock = require('nock');

module.exports.hash = "97898751ee5accc7179e3c9c0abcdd23";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-160072575346105837","js-test-appInsightsFeed-":"js-test-appInsightsFeed-160072575346103597","js-test-sqlServerFeed-":"js-test-sqlServerFeed-160072575346106046","js-test-cosmosFeed-":"js-test-cosmosFeed-160072575346106475","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-160072575346104337","js-test-tableFeed-":"js-test-tableFeed-160072575346107258","js-test-httpRequestFeed-":"js-test-httpRequestFeed-160072575346106798","js-test-influxdbFeed-":"js-test-influxdbFeed-160072575346103116","js-test-mongoDbFeed-":"js-test-mongoDbFeed-160072575346109637","js-test-mySqlFeed-":"js-test-mySqlFeed-160072575346108443","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-160072575346104927"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-160072575346105837","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"blob_connection_string","container":"blob_container","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/a5c71d07-59c8-4407-9c33-3ed4d6823f13',
  'x-request-id',
  '1cbd839c-fb62-4cb5-815d-990a3e69fc13',
  'x-envoy-upstream-service-time',
  '451',
  'apim-request-id',
  '1cbd839c-fb62-4cb5-815d-990a3e69fc13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/a5c71d07-59c8-4407-9c33-3ed4d6823f13')
  .reply(200, {"dataFeedId":"a5c71d07-59c8-4407-9c33-3ed4d6823f13","dataFeedName":"js-test-datafeed-160072575346105837","metrics":[{"metricId":"2b42a5af-1924-4611-a721-a52521f4ff93","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"8c2faac9-2f23-446a-9038-d228a32d1a2b","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-21T22:02:35Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1678',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bdc0cf7b-9cfc-4326-9a9e-b44d640c2ba7',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  'bdc0cf7b-9cfc-4326-9a9e-b44d640c2ba7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:34 GMT'
]);
