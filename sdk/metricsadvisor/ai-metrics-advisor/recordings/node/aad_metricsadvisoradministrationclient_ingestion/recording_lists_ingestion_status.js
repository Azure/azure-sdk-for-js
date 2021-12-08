let nock = require('nock');

module.exports.hash = "12cf2ec9875ad64a61d21412ff3f1b11";

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
  '96eae31e-d4a9-409b-8143-04d6b3b94400',
  'x-ms-ests-server',
  '2.1.12231.7 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AsUSVVxW8T1KhpFofO2Bu0A; expires=Thu, 16-Dec-2021 00:31:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCDMSANRUMMTlwmXirwI-9ZkmwGUt7Zyj2bKPXYKdOVEwjVDF8g2TW7Jsz8EQG5eR1IJQSsquiPItf1NMuogxud0puBhhuxdk5VNKI1u9oq9Uujw5UorCFXlpduVl_t-7XMjackF5rJcLNT71Bxt6nYD1BQpziyyAZOMa3JxPPJwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 00:31:54 GMT',
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
  '0e3b96d7-cf7b-4b6a-a741-0bd903e72e00',
  'x-ms-ests-server',
  '2.1.12231.7 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ao_Xm95KIAdIvA666Y5c75I; expires=Thu, 16-Dec-2021 00:31:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrwG1XKeJ2_w3cQS-BRRiXV4VuNIs9Kerg7gg-1MpNqFdUeGePu6oo88ayXMNnryV3pze5HzS7UCSfVPnHnD67B0VOZsvArLj0O3MKudPLhcE_seDcY1cT-Teo5q6mKWXI3X148VOYsa1kMMDfYLajTpf4pltrd5PcYkTKa6sGhZsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 00:31:54 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=df89b3ec-d458-4c44-a402-fcfff7363b0c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '308c4b98-d239-4f79-9af3-c4b2fa8b7c00',
  'x-ms-ests-server',
  '2.1.12231.7 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=At0vD-a9_r5HrgOGYdFS9kvGLH8mAQAAAPryJNkOAAAA; expires=Thu, 16-Dec-2021 00:31:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 00:31:54 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-10-30T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-30T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-29T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-28T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-27T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-26T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-25T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-24T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-23T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-22T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-21T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-20T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-19T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-18T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-17T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-16T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-15T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-14T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-13T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-12T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-11T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-10T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-09T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-08T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-07T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-06T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-05T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-04T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-03T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-02T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-01T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-30T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-29T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-28T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-27T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-26T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-25T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-24T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-23T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-22T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-21T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-20T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-19T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-18T00:00:00Z","status":"Error","message":"Duplicate metric values are found on the same dimension combination within one metric interval. Please use aggregation function to aggregate your metrics by its dimensions. "},{"timestamp":"2021-09-17T00:00:00Z","status":"Error","message":"Duplicate metric values are found on the same dimension combination within one metric interval. Please use aggregation function to aggregate your metrics by its dimensions. "},{"timestamp":"2021-09-16T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-15T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-14T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-13T00:00:00Z","status":"Error","message":"Duplicate metric values are found on the same dimension combination within one metric interval. Please use aggregation function to aggregate your metrics by its dimensions. "},{"timestamp":"2021-09-12T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-11T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-10T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-09T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-08T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-07T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-06T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-05T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-04T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-03T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-02T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-09-01T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-31T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-30T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-29T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-28T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-27T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-26T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-25T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-24T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-23T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-22T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-21T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-20T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-19T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-18T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-17T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-16T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-15T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-14T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-13T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-12T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-11T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-10T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-09T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-08T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-07T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-06T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-05T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-04T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-03T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-02T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-08-01T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-07-31T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-07-30T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-07-29T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-07-28T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-07-27T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-07-26T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-07-25T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-07-24T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$maxpagesize=100&$skip=100"}, [
  'Content-Length',
  '7807',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '82a79786-e6d1-4285-869b-daaa430377a9',
  'x-envoy-upstream-service-time',
  '404',
  'apim-request-id',
  '82a79786-e6d1-4285-869b-daaa430377a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:31:55 GMT'
]);
