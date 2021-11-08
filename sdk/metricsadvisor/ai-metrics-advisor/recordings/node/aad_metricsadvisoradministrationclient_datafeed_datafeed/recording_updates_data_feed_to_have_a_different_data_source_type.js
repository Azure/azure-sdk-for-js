let nock = require('nock');

module.exports.hash = "14a59b7c0e25a01bab2e00358aaee7ae";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'bf3938dc-2bf3-4803-8747-c6fe3f309900',
  'x-ms-ests-server',
  '2.1.12197.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Akj7N3ahvDdEsY6EPkR2O-I; expires=Wed, 08-Dec-2021 04:05:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 04:05:19 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/560b4a96-6632-4c25-b859-edd1abdd78a6', {"dataSourceType":"MongoDB","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(200, {"dataFeedId":"560b4a96-6632-4c25-b859-edd1abdd78a6","dataFeedName":"js-test-postgreSqlFeed-163634429613202599","metrics":[{"metricId":"d258d74e-b79c-45de-80c8-a8282fa87a2e","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"cd2d8e8c-3746-484c-97cc-b7fe2d2ba64a","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T04:05:19Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4fad1f50-ae4d-4e11-81be-87f3aad86525',
  'x-envoy-upstream-service-time',
  '700',
  'apim-request-id',
  '4fad1f50-ae4d-4e11-81be-87f3aad86525',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:20 GMT'
]);
