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
  '201c79b6-a5d2-42b4-ab36-dbd639d28900',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkF5Pjf3Bt5AuyHpGfCpOO4; expires=Wed, 08-Dec-2021 04:05:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 04:05:05 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureCosmosDB","dataFeedName":"js-test-cosmosFeed-163634429613205541","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","database":"sample","collectionId":"sample"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/9459cc1d-613e-4abd-bcc6-dbcc44dfeb84',
  'x-request-id',
  '05904e0e-42c6-400c-a5b7-62375fb5f8ff',
  'x-envoy-upstream-service-time',
  '722',
  'apim-request-id',
  '05904e0e-42c6-400c-a5b7-62375fb5f8ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9459cc1d-613e-4abd-bcc6-dbcc44dfeb84')
  .reply(200, {"dataFeedId":"9459cc1d-613e-4abd-bcc6-dbcc44dfeb84","dataFeedName":"js-test-cosmosFeed-163634429613205541","metrics":[{"metricId":"68dc371a-fa74-47f3-9c0f-86ac52276574","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"0f4fc9f1-1fe1-45ab-bc18-2f1119b98bb0","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureCosmosDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T04:05:05Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"sample","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","collectionId":"sample"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1345',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '84b1cd7f-3d94-441b-9e92-91d0a967bf13',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '84b1cd7f-3d94-441b-9e92-91d0a967bf13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:06 GMT'
]);
