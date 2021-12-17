let nock = require('nock');

module.exports.hash = "032a09938d4f27dfae54c12cebe5fff2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '0b0f9cee-2082-44d0-9017-6c50b16f4200',
  'x-ms-ests-server',
  '2.1.12261.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Au03tbPLVm5MvGVdh4bKHLk; expires=Sun, 16-Jan-2022 23:37:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrp0b1Z9i2h4qGtC4XFndI64EAoG9C8cLdQqtn76D5CC6GfmAFV_1CrwZ6sPRDgsQqzGC0xvhm7lUKAQTyVeQsuu_makfHWsDyWD-TcL-lBPkRfw4WQBFzxCGAE8q3U0ZBg6IlLZgBfZN_Axp7l-wAXHvplxhYbCE9APJJnHxF3pIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 23:37:57 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'd2e55d1c-4318-4697-a5a2-a05f3b7e1a00',
  'x-ms-ests-server',
  '2.1.12261.15 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Av-sFqgvPZRBsW9pB-7bQJ8; expires=Sun, 16-Jan-2022 23:37:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5_rKQrFGfhPaDylqMv33loqV69uFskJo213F6mIZRZniidBmdh9FM05KPkgS2s-EoWG7mfEVqAXA20iveNTpfy8pP9ODjyyj0HwM-c93GbVLTAPvDnoEPm-n_a8NjbUSPkHXeN0JW3NONBXGA405A4AzjvoFwUkTwy83e0SgPXMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 23:37:57 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=0856e154-f0fa-45ca-a9ff-74ddb51aaed1&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '2b41289b-02e5-49c1-b572-8672753f1d00',
  'x-ms-ests-server',
  '2.1.12261.15 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Amwnjr2rgz1MhG1fQ-OGc2PGLH8mAQAAAFUWT9kOAAAA; expires=Sun, 16-Jan-2022 23:37:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 23:37:58 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"InfluxDB","dataFeedName":"js-test-influxdbFeed-163978426297601701","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","database":"data-feed-database","userName":"user","password":"SecretPlaceholder","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/6c89a557-29ab-442f-b25e-aa548bd3dbe7',
  'x-request-id',
  '4a042cd0-c776-4b62-b2a4-1ab84f53b3df',
  'x-envoy-upstream-service-time',
  '440',
  'apim-request-id',
  '4a042cd0-c776-4b62-b2a4-1ab84f53b3df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:37:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/6c89a557-29ab-442f-b25e-aa548bd3dbe7')
  .reply(200, {"dataFeedId":"6c89a557-29ab-442f-b25e-aa548bd3dbe7","dataFeedName":"js-test-influxdbFeed-163978426297601701","metrics":[{"metricId":"83c9f2fa-7d21-4de7-a587-b693c5b49ff5","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"d181906e-8f81-4372-b33e-24efee8aaae2","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"InfluxDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-12-17T23:37:58Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","database":"data-feed-database","query":"partition-key eq @start-time","userName":"user"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1365',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3005b8a3-9c16-4321-a9c5-e892ad538b9e',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  '3005b8a3-9c16-4321-a9c5-e892ad538b9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:37:58 GMT'
]);
