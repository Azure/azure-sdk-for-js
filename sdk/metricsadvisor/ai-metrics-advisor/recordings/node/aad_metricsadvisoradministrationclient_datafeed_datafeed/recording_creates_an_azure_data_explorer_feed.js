let nock = require('nock');

module.exports.hash = "39a392903a280c07866950c3b38134b7";

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
  '25229f16-0ea8-47ff-a58e-036b6ed48800',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AqljBRkQHPlJk91-aDrEquXGLH8mAQAAAPKYGtkOAAAA; expires=Wed, 08-Dec-2021 04:05:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 04:05:06 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataExplorer","dataFeedName":"js-test-dataExplorerFeed-163634429613203930","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","query":"let starttime=datetime(@StartTime); let endtime=starttime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/9628395a-72c5-4765-bd0e-8df63d1b27f2',
  'x-request-id',
  '8c958b97-73f8-4c67-801c-913474fb9064',
  'x-envoy-upstream-service-time',
  '824',
  'apim-request-id',
  '8c958b97-73f8-4c67-801c-913474fb9064',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9628395a-72c5-4765-bd0e-8df63d1b27f2')
  .reply(200, {"dataFeedId":"9628395a-72c5-4765-bd0e-8df63d1b27f2","dataFeedName":"js-test-dataExplorerFeed-163634429613203930","metrics":[{"metricId":"602ba68c-753f-4f7a-9f6a-c0caf7708860","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"beaf84fd-3022-4803-8d05-963aeb505eb4","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataExplorer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T04:05:07Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let starttime=datetime(@StartTime); let endtime=starttime"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1318',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2fd3ca6c-32c3-4449-9a4b-ce09116eb845',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  '2fd3ca6c-32c3-4449-9a4b-ce09116eb845',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:08 GMT'
]);
