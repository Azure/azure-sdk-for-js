let nock = require('nock');

module.exports.hash = "08381dcda5cf9628f8e8572591a59161";

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
  'e6b12e10-4c52-4afe-8ca2-6d18ae292900',
  'x-ms-ests-server',
  '2.1.12261.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApG7BTtsjtBBj-ChXLsriJQ; expires=Sun, 16-Jan-2022 23:38:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZ5S40lCUZ3hxwu9cogGcvZZBThzfSTXiqVfpTX0JbgaXDAtrL1wiaVJy7O772nLfnDGAhGNvSjRpvoHDlmZKh3GywdRZ99kPm7bP4P4TA5H1h2jcfkRyTNfyN49Ik4Be8KWycd-g9rbp30jJVuaWvo3IydSEWfpYY6zsZ7qeQ_wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 23:38:04 GMT',
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
  'd2e55d1c-4318-4697-a5a2-a05fc37e1a00',
  'x-ms-ests-server',
  '2.1.12261.15 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjRIIxPrf75ErvxkiCXqMkk; expires=Sun, 16-Jan-2022 23:38:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNOBltdmELdk2egfa2D-u4hw-x241V3XqUffC0Vd6ezS2_kRhYuh_LLmUvXNY_YzA19v_N9Mx7aAKRMzffuNCrcmYrYQK_iCujytQyO8W55IlAaeD35Ae4IRzpwbSmIq-UbErEGCPOeJXi5yIbbpfn-cQbRMhQednZ4I3uJi4DNEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 23:38:05 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4be40b6e-b025-4d43-923a-767354aad12a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a557f14a-4b99-47b8-b011-038ccddd1c00',
  'x-ms-ests-server',
  '2.1.12261.15 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmQ_l7Bl7M1NrQaYWcuLIFQ; expires=Sun, 16-Jan-2022 23:38:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 23:38:05 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataLakeStorageGen2","dataFeedName":"js-test-dataLakeGenFeed-163978426297604030","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"accountName":"account-name","accountKey":"account-key","fileSystemName":"file-system-name","directoryTemplate":"directory-template","fileTemplate":"file-template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/ab27ff23-751c-4e56-b0de-19d7db89756f',
  'x-request-id',
  '406d1b43-bdc6-47fd-85f1-9a5edb110339',
  'x-envoy-upstream-service-time',
  '484',
  'apim-request-id',
  '406d1b43-bdc6-47fd-85f1-9a5edb110339',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/ab27ff23-751c-4e56-b0de-19d7db89756f')
  .reply(200, {"dataFeedId":"ab27ff23-751c-4e56-b0de-19d7db89756f","dataFeedName":"js-test-dataLakeGenFeed-163978426297604030","metrics":[{"metricId":"41282511-a1b7-4254-88e3-617313cc4b40","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"b06cd123-a4c8-421b-8e27-91901c0644d2","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataLakeStorageGen2","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-12-17T23:38:05Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"fileTemplate":"file-template","accountName":"account-name","directoryTemplate":"directory-template","fileSystemName":"file-system-name"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1383',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a8b71f3e-3a93-4758-b3f1-0f6942b9172d',
  'x-envoy-upstream-service-time',
  '266',
  'apim-request-id',
  'a8b71f3e-3a93-4758-b3f1-0f6942b9172d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:05 GMT'
]);
