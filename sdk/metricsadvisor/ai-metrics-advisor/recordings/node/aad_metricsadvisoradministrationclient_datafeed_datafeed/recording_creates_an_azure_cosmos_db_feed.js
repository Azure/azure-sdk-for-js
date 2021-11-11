let nock = require('nock');

module.exports.hash = "6834378f81e4dc598a5ef0666cc4be8f";

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
  '191a7fb5-77e3-4555-8767-a30a126a9b00',
  'x-ms-ests-server',
  '2.1.12197.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au7ZEQ-fLppGoCv31vp5CNY; expires=Wed, 08-Dec-2021 09:38:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:38:37 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureCosmosDB","dataFeedName":"js-test-cosmosFeed-163636431278608959","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","database":"sample","collectionId":"sample"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/c70878a6-2d9c-4e15-8bfc-95877180fe27',
  'x-request-id',
  '60d59785-cdc5-4dd2-b955-3f5cea39199a',
  'x-envoy-upstream-service-time',
  '470',
  'apim-request-id',
  '60d59785-cdc5-4dd2-b955-3f5cea39199a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c70878a6-2d9c-4e15-8bfc-95877180fe27')
  .reply(200, {"dataFeedId":"c70878a6-2d9c-4e15-8bfc-95877180fe27","dataFeedName":"js-test-cosmosFeed-163636431278608959","metrics":[{"metricId":"fdc423c1-21de-4b6d-9062-de0e1010637c","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"4820249c-7b0c-4610-a0e5-6e107c14c302","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureCosmosDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T09:38:38Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"sample","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","collectionId":"sample"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1345',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '36aa8d77-6cf2-4971-aa27-56f1f8cf7c56',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '36aa8d77-6cf2-4971-aa27-56f1f8cf7c56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:38 GMT'
]);
