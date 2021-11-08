let nock = require('nock');

module.exports.hash = "4bb0c54363466bf4ac07bece7a8646a6";

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
  '9d833fce-ed4f-43a2-a8f4-159b0f8cbc00',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AnWefuL96a1NkHHWJ9yg0DnGLH8mAQAAAPmYGtkOAAAA; expires=Wed, 08-Dec-2021 04:05:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 04:05:13 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"MySql","dataFeedName":"js-test-mySqlFeed-163634429613202390","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-mysql","query":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/2f8f999a-e7e6-44c7-a6a6-e32588bf4ae4',
  'x-request-id',
  'ccd03ad4-c480-4314-9116-3e79402a34af',
  'x-envoy-upstream-service-time',
  '618',
  'apim-request-id',
  'ccd03ad4-c480-4314-9116-3e79402a34af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/2f8f999a-e7e6-44c7-a6a6-e32588bf4ae4')
  .reply(200, {"dataFeedId":"2f8f999a-e7e6-44c7-a6a6-e32588bf4ae4","dataFeedName":"js-test-mySqlFeed-163634429613202390","metrics":[{"metricId":"480d035b-56c3-4036-9303-824ed3b71b52","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"b82840b0-2ea5-4d3d-ad59-e9ad94e6bf97","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MySql","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T04:05:14Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1289',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3b05e743-077e-4359-a091-c7aaa83f6eb4',
  'x-envoy-upstream-service-time',
  '241',
  'apim-request-id',
  '3b05e743-077e-4359-a091-c7aaa83f6eb4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:14 GMT'
]);
