let nock = require('nock');

module.exports.hash = "b6a74d9b0729403e262c11fc6d370f47";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162259141885101710","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162259141885103371","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162259141885107268","js-test-cosmosFeed-":"js-test-cosmosFeed-162259141885106839","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162259141885100988","js-test-tableFeed-":"js-test-tableFeed-162259141885105582","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162259141885100329","js-test-influxdbFeed-":"js-test-influxdbFeed-162259141885109352","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162259141885103155","js-test-mySqlFeed-":"js-test-mySqlFeed-162259141885101256","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162259141885106005"},"newDate":{}}

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
  'a65459ff-1788-449a-bee0-5a18171db300',
  'x-ms-ests-server',
  '2.1.11722.26 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AtYEXegxN91AnpLhgYp9BqbGLH8mAQAAALq-SNgOAAAA; expires=Thu, 01-Jul-2021 23:50:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Jun 2021 23:50:18 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-162259141885101710","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/97e8e9dd-6491-47ce-84b4-fb0c40243ddc',
  'x-request-id',
  '8e197b0d-444e-416e-9baf-3d572f035d0b',
  'x-envoy-upstream-service-time',
  '5629',
  'apim-request-id',
  '8e197b0d-444e-416e-9baf-3d572f035d0b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Jun 2021 23:50:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/97e8e9dd-6491-47ce-84b4-fb0c40243ddc')
  .reply(200, {"dataFeedId":"97e8e9dd-6491-47ce-84b4-fb0c40243ddc","dataFeedName":"js-test-datafeed-162259141885101710","metrics":[{"metricId":"93d93183-0a06-423d-bd80-2d12e2ff8110","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"eed99980-dafd-4dda-a9ef-7405d353ee6d","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-01T23:50:25Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1294',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '12a4ff76-bfd0-44bd-8bf6-79e13569b1da',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  '12a4ff76-bfd0-44bd-8bf6-79e13569b1da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Jun 2021 23:50:25 GMT'
]);
