let nock = require('nock');

module.exports.hash = "413113d9b30eef2f13c2941fcef17d32";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-163978429259804380","js-test-appInsightsFeed-":"js-test-appInsightsFeed-163978429259806142","js-test-sqlServerFeed-":"js-test-sqlServerFeed-163978429259808429","js-test-cosmosFeed-":"js-test-cosmosFeed-163978429259800502","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-163978429259805188","js-test-tableFeed-":"js-test-tableFeed-163978429259809218","js-test-eventhubRequestFeed-":"js-test-eventhubRequestFeed-163978429259801501","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-163978429259802082","js-test-influxdbFeed-":"js-test-influxdbFeed-163978429259804465","js-test-mongoDbFeed-":"js-test-mongoDbFeed-163978429259803733","js-test-mySqlFeed-":"js-test-mySqlFeed-163978429259808585","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-163978429259805784","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-163978429259803372"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-163978429259804380","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/c0b17aba-de6c-489d-b1df-2d97e405eca2',
  'x-request-id',
  'e357c9fc-3371-4f0f-a402-801f27c21036',
  'x-envoy-upstream-service-time',
  '617',
  'apim-request-id',
  'e357c9fc-3371-4f0f-a402-801f27c21036',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/c0b17aba-de6c-489d-b1df-2d97e405eca2')
  .reply(200, {"dataFeedId":"c0b17aba-de6c-489d-b1df-2d97e405eca2","dataFeedName":"js-test-datafeed-163978429259804380","metrics":[{"metricId":"6277f269-394e-4e10-af5f-9f63084f2710","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"e75f5854-075b-42ca-bc50-8402612207a0","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:12Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'abc5f423-a0ab-4deb-9663-de928a10c830',
  'x-envoy-upstream-service-time',
  '206',
  'apim-request-id',
  'abc5f423-a0ab-4deb-9663-de928a10c830',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:12 GMT'
]);
