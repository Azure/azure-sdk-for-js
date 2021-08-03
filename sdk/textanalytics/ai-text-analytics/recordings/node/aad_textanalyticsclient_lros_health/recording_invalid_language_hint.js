let nock = require('nock');

module.exports.hash = "4fe6d983363e697807ee4c3c068d2783";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'd5ac823b-def3-4edc-93c5-809c6678a000',
  'x-ms-ests-server',
  '2.1.11898.12 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvEXdzq7Y-VJkTswm-nNlitz_bg1EAAAAL6omtgOAAAA; expires=Thu, 02-Sep-2021 03:09:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevruqCeqY7A4GYfwRY5hqxWXPKd0Td1bCApv9jyYsngw0jhjJmx_5B6_UVlOfItFLuTuwnlpJDI_btoeckqvzmgjmhUcgwqn6EluDzqmc3xST8wqLGk73uqWyErKguYkpWGdHjJQPR2t7JMQHClIth43bAaExfyySjkoNrUUehDv78gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 03:09:03 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '073336bb-b142-4e8e-8104-b0c995d5e500',
  'x-ms-ests-server',
  '2.1.11898.12 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvEXdzq7Y-VJkTswm-nNlitz_bg1EAAAAL6omtgOAAAA; expires=Thu, 02-Sep-2021 03:09:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdrfxYy_3zOLHTTjvLjl88EbOXCy7ZqlNuSJkreL75M73kPhE4VyJlvtw4D-Q-YyGmCCpFNuWzbGpZovPSr8TgPwVY24FKfwB2dkDLiItkOGLe5xbyW8O6jaOs8vILvWlB7LIeOrbXL-uSNeXYhh9v5ydKxzBPp-hpJsZmqN3bgMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 03:09:03 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=f5a4a58e-d6de-4e7c-9880-994a445cd775&client_secret=azure_client_secret")
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
  '06e400e8-5081-41dc-a4da-913be10cd200',
  'x-ms-ests-server',
  '2.1.11898.12 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvEXdzq7Y-VJkTswm-nNlitz_bg1EAAAAL6omtgOAAAA; expires=Thu, 02-Sep-2021 03:09:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 03:09:03 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/162295cb-2977-4132-9191-9879df6f9aad',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '5420671a-6b11-4342-a294-6e8273a52b45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:09:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/162295cb-2977-4132-9191-9879df6f9aad')
  .query(true)
  .reply(200, {"jobId":"162295cb-2977-4132-9191-9879df6f9aad","lastUpdateDateTime":"2021-08-03T03:09:03Z","createdDateTime":"2021-08-03T03:09:03Z","expirationDateTime":"2021-08-04T03:09:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '3d92bf9a-2f5e-4db4-af09-5714d4325a0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:09:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/162295cb-2977-4132-9191-9879df6f9aad')
  .query(true)
  .reply(200, {"jobId":"162295cb-2977-4132-9191-9879df6f9aad","lastUpdateDateTime":"2021-08-03T03:09:03Z","createdDateTime":"2021-08-03T03:09:03Z","expirationDateTime":"2021-08-04T03:09:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '0d0ca8d2-3f82-4f9f-ae5b-842bd8972e92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:09:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/162295cb-2977-4132-9191-9879df6f9aad')
  .query(true)
  .reply(200, {"jobId":"162295cb-2977-4132-9191-9879df6f9aad","lastUpdateDateTime":"2021-08-03T03:09:03Z","createdDateTime":"2021-08-03T03:09:03Z","expirationDateTime":"2021-08-04T03:09:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '69b5e0b9-368d-4e77-99ec-636f6ce67f7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:09:05 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/162295cb-2977-4132-9191-9879df6f9aad')
  .query(true)
  .reply(200, {"jobId":"162295cb-2977-4132-9191-9879df6f9aad","lastUpdateDateTime":"2021-08-03T03:09:06Z","createdDateTime":"2021-08-03T03:09:03Z","expirationDateTime":"2021-08-04T03:09:03Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  '41fa9663-9672-4254-903f-5ee20b37642d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:09:07 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/162295cb-2977-4132-9191-9879df6f9aad')
  .query(true)
  .reply(200, {"jobId":"162295cb-2977-4132-9191-9879df6f9aad","lastUpdateDateTime":"2021-08-03T03:09:06Z","createdDateTime":"2021-08-03T03:09:03Z","expirationDateTime":"2021-08-04T03:09:03Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'd36b6f7a-2d6b-4b55-89fe-ff969ef953f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:09:07 GMT'
]);
