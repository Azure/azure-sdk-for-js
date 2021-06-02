let nock = require('nock');

module.exports.hash = "e63a7c0807966575ec1513c6eb0a2b17";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/SomeTenantId/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
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
  '4e450aff-e68c-41e9-913c-e91a839f0f02',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=An8aJvjkv89FlfmGvJw55UyMQo4QAQAAABH4QdgOAAAA; expires=Sat, 26-Jun-2021 20:29:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrbfsmG8fr1RhS2Qv7tDa8U5sAE23A-IYP-5zHWoN5N9GoOkxjMWFUnTOCu5F0512hi8pCSxMsXn51imrEgFt_mXpnbGWx-ZFNeXOi0S5nva4y2py9GEfG_kIVeYylqIXXnnG2ybAZ-nPg6mnKd7YLjSzzqIiXW-UecjKyi7kN-p4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 27 May 2021 20:29:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/SomeTenantId/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/SomeTenantId/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/SomeTenantId/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '1d38f11b-bf66-4290-9b3c-fee1a9b53100',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=An8aJvjkv89FlfmGvJw55UyMQo4QAQAAABH4QdgOAAAA; expires=Sat, 26-Jun-2021 20:29:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrf2mjE7BAuI-1GyaqmwcooO7nxx9A9U_b6867UwDCn44b7r2dYKH8tJtMmEN20YLa5Q-ZLd00ZTnX_77KM8KbD0Yv2kEpOKDblmyThDrofKBuM4g0HjCdBBVfYH66dX1vyKTfNdM1rG40ove1kvnMRMZwn0S4WviEO77aBqfXJF4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 27 May 2021 20:29:05 GMT',
  'Content-Length',
  '1651'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "client_id=SomeClientId&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&client-request-id=aeabd791-df32-414b-8db4-6c98bf24d150&client_secret=SomeClientSecret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"sanitized"}, [
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
  '2a0db59b-a9de-42a9-9c48-cf213c7a3f00',
  'x-ms-ests-server',
  '2.1.11722.21 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=An8aJvjkv89FlfmGvJw55UyMQo4QAgAAABH4QdgOAAAA; expires=Sat, 26-Jun-2021 20:29:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 27 May 2021 20:29:05 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(202, {"value":[{"to":"+14255550123","messageId":"Outgoing_20210527202906de23b54e-52fb-4fb5-8610-08b19aa8d507_noam","httpStatusCode":202,"repeatabilityResult":"accepted","successful":true}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '6/KLbp17rUuG6bnQdPFQkA.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '447ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0EgGwYAAAAACnnxoT1UQpT61J9snPcIxrWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 May 2021 20:29:06 GMT'
]);
