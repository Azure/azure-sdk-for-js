let nock = require('nock');

module.exports.hash = "86ba04863d69607c629f4d0864ecd174";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azure_tenant_id/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'ad5e3065-d9b7-433d-a2f4-2332173b3100',
  'x-ms-ests-server',
  '2.1.11654.25 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AsgocXpGLAFDoJ5BQOGN6wk; expires=Thu, 10-Jun-2021 18:44:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrqC998QxtzdNhb0pC1CJRRvaCCAfdcBqem98hM1zAGgpx4RgzodSz9J6J6jjeOJhOWjp6yxuz8m9odvzIkDoMZiUiNkd0no9UndK2ZOqhO-X1tRgKg-cMykKQJKGs_y9ExIct5wsmTbrQmHqMrwunt1fy7F7B266LkR_hOPSxVEEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 11 May 2021 18:44:23 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azure_tenant_id/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azure_tenant_id/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azure_tenant_id/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'f835c62c-0e86-4216-bc19-f37c447d2c00',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AsgocXpGLAFDoJ5BQOGN6wk; expires=Thu, 10-Jun-2021 18:44:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrAYyoBm8tRtrui2NoyNfG8WzY8gbPtz5Q7UGLtz2J3iBCgIR7FIPzlpnvMkBr5AOj88q1PPn10_cpfRJZ5nPa3sRFvN9LGNJbXFCKUPxDXpHAm3pm3b6uwpFy1HUIgiiRMBOx8AlcbzLdCtnXfE9-chRKwxgAqgNCVorv9xC631sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 11 May 2021 18:44:23 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/azure_tenant_id/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  '4abcebe8-0b51-4dbe-bbc9-375a58ca2a00',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AsgocXpGLAFDoJ5BQOGN6wnGLH8mAQAAAIfHLNgOAAAA; expires=Thu, 10-Jun-2021 18:44:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 11 May 2021 18:44:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:24:43Z"},{"timestamp":"2020-08-30T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:24:44Z"},{"timestamp":"2020-08-29T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:24:49Z"},{"timestamp":"2020-08-28T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:24:54Z"},{"timestamp":"2020-08-27T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:09Z"},{"timestamp":"2020-08-26T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:09Z"},{"timestamp":"2020-08-25T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:08Z"},{"timestamp":"2020-08-24T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:15Z"},{"timestamp":"2020-08-23T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:24Z"},{"timestamp":"2020-08-22T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:22:59Z"},{"timestamp":"2020-08-21T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:29Z"},{"timestamp":"2020-08-20T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:24:28Z"},{"timestamp":"2020-08-19T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:28Z"},{"timestamp":"2020-08-18T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:28Z"},{"timestamp":"2020-08-17T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:34Z"},{"timestamp":"2020-08-16T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:22:58Z"},{"timestamp":"2020-08-15T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:35Z"},{"timestamp":"2020-08-14T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:34Z"},{"timestamp":"2020-08-13T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:48Z"},{"timestamp":"2020-08-12T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:21:59Z"},{"timestamp":"2020-08-11T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:05Z"},{"timestamp":"2020-08-10T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:49Z"},{"timestamp":"2020-08-09T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:47Z"},{"timestamp":"2020-08-08T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:52Z"},{"timestamp":"2020-08-07T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:54Z"},{"timestamp":"2020-08-06T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:54Z"},{"timestamp":"2020-08-05T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:58Z"},{"timestamp":"2020-08-04T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:25:58Z"},{"timestamp":"2020-08-03T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:27:31Z"},{"timestamp":"2020-08-02T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:27:29Z"},{"timestamp":"2020-08-01T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T18:27:24Z"}]}, [
  'Content-Length',
  '4351',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c9007742-2a9e-455e-ae9d-8559eb5b2d87',
  'x-envoy-upstream-service-time',
  '5443',
  'apim-request-id',
  'c9007742-2a9e-455e-ae9d-8559eb5b2d87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 11 May 2021 18:44:30 GMT'
]);
