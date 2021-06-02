let nock = require('nock');

module.exports.hash = "b6a74d9b0729403e262c11fc6d370f47";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162260279715609271","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162260279715601618","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162260279715605726","js-test-cosmosFeed-":"js-test-cosmosFeed-162260279715605268","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162260279715609858","js-test-tableFeed-":"js-test-tableFeed-162260279715609890","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162260279715604394","js-test-influxdbFeed-":"js-test-influxdbFeed-162260279715604503","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162260279715605557","js-test-mySqlFeed-":"js-test-mySqlFeed-162260279715600183","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162260279715609710"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '24e378d0-4599-4be2-be46-50121a969300',
  'x-ms-ests-server',
  '2.1.11722.26 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ahgdh1ysEgZDtr4bGSsWe9zGLH8mAQAAAC3rSNgOAAAA; expires=Fri, 02-Jul-2021 02:59:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 02:59:57 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-162260279715609271","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/f7ace851-a698-4502-a1d4-e279faa72b5e',
  'x-request-id',
  'cf7da2f3-5fa8-4786-aede-86c8204a802d',
  'x-envoy-upstream-service-time',
  '651',
  'apim-request-id',
  'cf7da2f3-5fa8-4786-aede-86c8204a802d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:59:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f7ace851-a698-4502-a1d4-e279faa72b5e')
  .reply(200, {"dataFeedId":"f7ace851-a698-4502-a1d4-e279faa72b5e","dataFeedName":"js-test-datafeed-162260279715609271","metrics":[{"metricId":"b5685ad5-2bf4-491b-9519-7bef1df111a9","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"877e83dc-2de2-4262-83e0-27ad046ed05c","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-02T02:59:58Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1294',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'baff3e10-0738-4d35-9b59-645a2a124502',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  'baff3e10-0738-4d35-9b59-645a2a124502',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:59:58 GMT'
]);
