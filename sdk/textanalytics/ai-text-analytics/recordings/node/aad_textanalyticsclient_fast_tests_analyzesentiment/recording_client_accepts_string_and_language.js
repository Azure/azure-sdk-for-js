let nock = require('nock');

module.exports.hash = "3507106128a8c3279ca558497e4d0b6b";

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
  'b3aef113-76dc-44d7-830f-e054e03f4301',
  'x-ms-ests-server',
  '2.1.11898.12 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvEXdzq7Y-VJkTswm-nNlis; expires=Thu, 02-Sep-2021 03:02:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxyKxgWo62j18AGMe2oM8F3xGqrag1UEVb3vS3W46YRJJmPU6O3BA4gBcLtc6GLPNFp1XGhNg5Fxwt0V6BHEzYcXHcVnFqtKc9lgHHcVPhbH2QUAj2F_Om672prD4rX31wZ4RC76C6ArSdomJF7H2GOxR75d9Vc7ASahCzqLAd2cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 03:02:22 GMT',
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
  '14a7199c-a385-47aa-9f29-e4a79d88e300',
  'x-ms-ests-server',
  '2.1.11898.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvEXdzq7Y-VJkTswm-nNlis; expires=Thu, 02-Sep-2021 03:02:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8iC_RNP-bfaSFHJ6m6mu3fbawXbh6OYqmirb3gcq3x2MtnjOZ4PmDMtXRMTuyXu7s5mIuAhdmH09ndLo-rTx9WwcTh0eUsRpS985-veFGgOINS5UDgNs-T2I0gPJ4v08q66jil-Zc4nS7bxryOLxqk_Ye2x-3xrg59iAZqjhMPIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 03:02:22 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=a1f1c005-0d3e-4a08-94f1-8e85d194cee2&client_secret=azure_client_secret")
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
  '329816ba-093d-4928-8bee-796d7b6bd500',
  'x-ms-ests-server',
  '2.1.11898.12 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvEXdzq7Y-VJkTswm-nNlitz_bg1AQAAAL6omtgOAAAA; expires=Thu, 02-Sep-2021 03:02:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 03:02:22 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/sentiment', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"1","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"2","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"3","text":"I didn't like the last book I read at all.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","sentiment":"positive","confidenceScores":{"positive":0.99,"neutral":0.01,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":0.99,"neutral":0.01,"negative":0},"offset":0,"length":86,"text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!"}],"warnings":[]},{"id":"1","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":58,"text":"Unfortunately, it rained during my entire trip to Seattle."},{"sentiment":"neutral","confidenceScores":{"positive":0.01,"neutral":0.7,"negative":0.29},"offset":59,"length":43,"text":"I didn't even get to visit the Space Needle"}],"warnings":[]},{"id":"2","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":101,"text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected."}],"warnings":[]},{"id":"3","sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0.03,"negative":0.96},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0.03,"negative":0.96},"offset":0,"length":42,"text":"I didn't like the last book I read at all."}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=4,CognitiveServices.TextAnalytics.TextRecords=4',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '8c724e07-845f-440e-8d6a-bf70fd9b952a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:02:23 GMT'
]);
