let nock = require('nock');

module.exports.hash = "9b472f6f211657f4799291bcf7bf404d";

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
  '191a7fb5-77e3-4555-8767-a30a54ba9400',
  'x-ms-ests-server',
  '2.1.12197.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AizKN2NoWR1JklobudyypRU; expires=Wed, 08-Dec-2021 04:05:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 04:05:17 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureLogAnalytics","dataFeedName":"js-test-logAnalyticsFeed-163634429613201595","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"tenantId":"tenant-id","clientId":"client-id","clientSecret":"client-secret","workspaceId":"workspace-id","query":"query"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/af3bd353-0d3f-4623-9895-541295e2b62e',
  'x-request-id',
  'd2e6edec-ed8f-425a-a870-398708439ea6',
  'x-envoy-upstream-service-time',
  '538',
  'apim-request-id',
  'd2e6edec-ed8f-425a-a870-398708439ea6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/af3bd353-0d3f-4623-9895-541295e2b62e')
  .reply(200, {"dataFeedId":"af3bd353-0d3f-4623-9895-541295e2b62e","dataFeedName":"js-test-logAnalyticsFeed-163634429613201595","metrics":[{"metricId":"193b0550-17e2-49f7-a45c-ebc15c43a934","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"9f489c19-ecae-497e-a495-557b15630b87","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureLogAnalytics","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-11-08T04:05:17Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"clientId":"client-id","query":"query","tenantId":"tenant-id","workspaceId":"workspace-id"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1331',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ed220a1c-e729-4246-97d0-79bec3bb8ff7',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'ed220a1c-e729-4246-97d0-79bec3bb8ff7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:17 GMT'
]);
