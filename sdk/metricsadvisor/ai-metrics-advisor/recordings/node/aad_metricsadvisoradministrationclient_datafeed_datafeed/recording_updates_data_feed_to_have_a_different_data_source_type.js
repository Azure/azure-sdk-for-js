let nock = require('nock');

module.exports.hash = "f42b96ca5c10ec9b5b2fb0467b00c31e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  '32a7b53f-072d-4231-b30d-944bed878f00',
  'x-ms-ests-server',
  '2.1.11722.26 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ahgdh1ysEgZDtr4bGSsWe9zGLH8mCwAAAC3rSNgOAAAA; expires=Fri, 02-Jul-2021 03:02:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 03:02:32 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/df89fc29-8ac6-4f09-b899-bb8c50ed1380', {"dataSourceType":"MongoDB","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(200, {"dataFeedId":"df89fc29-8ac6-4f09-b899-bb8c50ed1380","dataFeedName":"js-test-postgreSqlFeed-162260279715609710","metrics":[{"metricId":"880da66f-2def-4455-bd83-84ab7abcaa22","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"8359e73e-1806-4661-b68d-48b0ed8b1236","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-02T03:02:27Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2f2977b8-d8f1-4cd2-bf18-151c4d0ff81b',
  'x-envoy-upstream-service-time',
  '6135',
  'apim-request-id',
  '2f2977b8-d8f1-4cd2-bf18-151c4d0ff81b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:02:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/df89fc29-8ac6-4f09-b899-bb8c50ed1380')
  .reply(200, {"dataFeedId":"df89fc29-8ac6-4f09-b899-bb8c50ed1380","dataFeedName":"js-test-postgreSqlFeed-162260279715609710","metrics":[{"metricId":"880da66f-2def-4455-bd83-84ab7abcaa22","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"8359e73e-1806-4661-b68d-48b0ed8b1236","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-02T03:02:27Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bcf16b2f-1522-4db7-9e80-7d14eb6d482c',
  'x-envoy-upstream-service-time',
  '5256',
  'apim-request-id',
  'bcf16b2f-1522-4db7-9e80-7d14eb6d482c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:02:44 GMT'
]);
