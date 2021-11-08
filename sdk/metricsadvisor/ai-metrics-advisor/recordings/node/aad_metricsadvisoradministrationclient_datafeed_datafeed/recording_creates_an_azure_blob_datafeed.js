let nock = require('nock');

module.exports.hash = "413113d9b30eef2f13c2941fcef17d32";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-163634429613201880","js-test-appInsightsFeed-":"js-test-appInsightsFeed-163634429613204453","js-test-sqlServerFeed-":"js-test-sqlServerFeed-163634429613202132","js-test-cosmosFeed-":"js-test-cosmosFeed-163634429613205541","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-163634429613203930","js-test-tableFeed-":"js-test-tableFeed-163634429613203096","js-test-eventhubRequestFeed-":"js-test-eventhubRequestFeed-163634429613207289","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-163634429613201595","js-test-influxdbFeed-":"js-test-influxdbFeed-163634429613207794","js-test-mongoDbFeed-":"js-test-mongoDbFeed-163634429613208518","js-test-mySqlFeed-":"js-test-mySqlFeed-163634429613202390","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-163634429613202599","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-163634429613207878"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '650202f1-e11d-41a9-8232-c4b8eda78100',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnQzIxiY_fZJuF36DSEvQlrGLH8mAQAAAOeYGtkOAAAA; expires=Wed, 08-Dec-2021 04:04:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 04:04:56 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-163634429613201880","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/f6550179-af42-4258-9c51-1681f240b93a',
  'x-request-id',
  'da7d2762-71dd-477e-b9ee-b28e94780534',
  'x-envoy-upstream-service-time',
  '718',
  'apim-request-id',
  'da7d2762-71dd-477e-b9ee-b28e94780534',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:04:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f6550179-af42-4258-9c51-1681f240b93a')
  .reply(200, {"dataFeedId":"f6550179-af42-4258-9c51-1681f240b93a","dataFeedName":"js-test-datafeed-163634429613201880","metrics":[{"metricId":"7c239b0a-6dcc-4c77-8bbb-3ee732e18e5c","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"a722f184-06ad-4896-b2ec-a7093222cceb","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T04:04:57Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1278',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '79f10569-87db-4f0c-a9e3-a3688ddbda96',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  '79f10569-87db-4f0c-a9e3-a3688ddbda96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:04:57 GMT'
]);
