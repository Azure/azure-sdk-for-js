let nock = require('nock');

module.exports.hash = "413113d9b30eef2f13c2941fcef17d32";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-163978426297604956","js-test-appInsightsFeed-":"js-test-appInsightsFeed-163978426297604441","js-test-sqlServerFeed-":"js-test-sqlServerFeed-163978426297600000","js-test-cosmosFeed-":"js-test-cosmosFeed-163978426297607576","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-163978426297606201","js-test-tableFeed-":"js-test-tableFeed-163978426297605182","js-test-eventhubRequestFeed-":"js-test-eventhubRequestFeed-163978426297605468","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-163978426297601533","js-test-influxdbFeed-":"js-test-influxdbFeed-163978426297601701","js-test-mongoDbFeed-":"js-test-mongoDbFeed-163978426297601868","js-test-mySqlFeed-":"js-test-mySqlFeed-163978426297603110","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-163978426297605197","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-163978426297604030"},"newDate":{}}

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
  '9b016b69-5716-49cf-91c7-c76bea180a00',
  'x-ms-ests-server',
  '2.1.12261.15 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AumomtFFYdNDrPgVg_kkR_8; expires=Sun, 16-Jan-2022 23:37:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrdau6_yTPR5lBGJ1en7zGHITLXGW5DM5XOS1XosvM_WSpn7T6DmI1sirwFjdZtbSsHOiobopeZDKUTtEfHdyQSQmAhdq1c9zGOTFQUft0_LHwEb7w9706yz5fBh9FW-3gC-_1Yp6nqUmuVHPNKqJWgKBHWJ8UL-KqbJiwbwPutGYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 23:37:43 GMT',
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
  '2b41289b-02e5-49c1-b572-8672353e1d00',
  'x-ms-ests-server',
  '2.1.12261.15 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am7qDc3sl2NNs2j3Kp1P_hQ; expires=Sun, 16-Jan-2022 23:37:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrbsUB-mrPKlFfoU73le-2uyX-Xzw5-fGque_lEUuqWai7MCU6Fo1GNMKB2_MrdN6ylpsxsu3EpBxWxnnwEiXhKwBOvXCw-sKYceMEPUoeAJrtjeFzrNGEaKZWggLw7n_BMHAJfjBX3yq7-GJ_M4r190BJTA4kIH15mLH7oiPTtysgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 23:37:43 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d9a8089f-6120-4783-83fe-2f5e14d4d601&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '7b033aa8-c1bb-4730-b083-c33c01cd1c00',
  'x-ms-ests-server',
  '2.1.12261.15 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtQBpR0JU-xDrSGvyWePDjvGLH8mAQAAAEYWT9kOAAAA; expires=Sun, 16-Jan-2022 23:37:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 23:37:43 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-163978426297604956","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/0a1c8d37-b3f0-4679-ad3d-114230b16de4',
  'x-request-id',
  'f3e55cef-ba6d-48cc-b4ec-57ff4d3491ca',
  'x-envoy-upstream-service-time',
  '537',
  'apim-request-id',
  'f3e55cef-ba6d-48cc-b4ec-57ff4d3491ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:37:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/0a1c8d37-b3f0-4679-ad3d-114230b16de4')
  .reply(200, {"dataFeedId":"0a1c8d37-b3f0-4679-ad3d-114230b16de4","dataFeedName":"js-test-datafeed-163978426297604956","metrics":[{"metricId":"94bde110-2043-478b-98f5-ae2c1bdc9143","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"e2091c4f-1c59-464b-8ead-0b0f0d99e5d8","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-12-17T23:37:44Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1278',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '524b52a1-b93b-4b43-bb95-4e200a17523d',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  '524b52a1-b93b-4b43-bb95-4e200a17523d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:37:44 GMT'
]);
