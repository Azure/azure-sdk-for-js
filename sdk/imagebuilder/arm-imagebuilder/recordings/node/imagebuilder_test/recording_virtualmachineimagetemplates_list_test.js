let nock = require('nock');

module.exports.hash = "32347a6f8c41608a7d3181ddfe2fa089";

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
  'f3edfea5-2534-40e9-bc13-f4ee4fcc8600',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ajji4T42eJpLr0Vna9mkcbI; expires=Sat, 05-Feb-2022 03:11:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6HJl-qxLgurL53QWe3bmTwZ4LdYNPks_Qo7V0HkkATiEPnOYXYGBxAPMEhEGzj3RQjmJNCA5zCzMIgUhRdJfUz-YW7O5NWaVyjtBxKFyUb248JsFMmfkYvNQCmE6_4aia75Ccv7aNNw-78cUfRkytvY4AWROMCtSO5jvcfMKlRIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 06 Jan 2022 03:11:08 GMT',
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
  'af698745-0a52-46a4-b823-085140810b00',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AlF8H5Kv3Q9FiJUaCg3hN80; expires=Sat, 05-Feb-2022 03:11:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1aDj16RQaGhuxFWfJEos9M_TolMKZ9xSpcrG83DSxuLtyUtEDB9JnRTou4zYw6IOiryB8-npwHUPGWjQRCizp_rJ-DchJ2OsRJMH9PI_nILX21uXlGqhixA7fHmA22AQstn0NQNkYK6Z52h_9JRdUmXcMgsg9R1n1nuQJtFq6WwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 06 Jan 2022 03:11:08 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=55aebeda-1aad-4304-959a-2753af64bd4a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '47af5f47-bd6e-4acd-b8d8-aa96a0c18000',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtdfzaC85nZOsZm_LVQpJ67Lj78gAQAAAMxUaNkOAAAA; expires=Sat, 05-Feb-2022 03:11:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 06 Jan 2022 03:11:08 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.VirtualMachineImages/imageTemplates')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227e71927e749995ebfca347e9f79234a5bfd3f4a3555dadf2ba2df2863ee68fd28f9a6a5d4fd14cfe4e3f2a16d9457e36a34f3ebadbac27cdb42e566d512d9bbb0ff7ce1fde9f1d9c6fdf9b7efa607b7f776f7ffbe1eef4c1f6c1f47ce7c1743639dfdbdfbd5be702f1f3ba5aaf9abb8beb9f6edabc69ef52df97c52caf9bbb5f14d3ba6aaaf3767c522d56eb36bfcb5da22dff9265d9472345a6bd5e01b78fbec896f4cdec0cdf7fc4dffd1269f2d174ddb4d5a2f8019a61a4f4e848d28f96d9021f7ff47a9e97657a625ad6e9e9bb6cb12a73d30d518147f9555da0f9bc6d57cda3bb772f8a76be9e8ca7d5e2eef10fd6757e37c3bfdbbf685d4cdf366d56b7db6d4e60321adfdd49594dee2e321a6b7dd735a031d9c112181eece5627bd11477a5c7e66eb1a49665b99d2d67dbf57ab93d2d8bedbd7133f7709b677bf73f3d99e70474bd00827be7bbf77626f7b2c9c1fd070f27e7fb0f67f7cfcfb3fdc9bdf39d4f27f77777ee1dcc3e7d7830b937bb37db3ddfdffbf4d3f3dd7c727e706fb297dd9b3c98ed3ad886be4c21216cfa4bf8c7f7a5cd47b3a269eb62429853bb2e816988c579366ddf64178ea5e8f9a8cd2e5e28f1850df51b9d356ac153fdff12364b3f2aab6986de814e4eb3b86edc77342b5fae5b826046c4affffe45fbfbaf8afaf78f10b3cfac1d9a32920d75572c2f5eb7c43f78ebf57a3acdf3593e53801f4dd645397b532cf26add9e2dbf289634065079075f0b213fa2a12edba2bda68f85f81689af9abc3e6e9ae262e920aebdcfcee44d5f177cd84c5cdc62260c65a4efebbb718408064908e6c762069a15cb69b1ca4ae199fddddde9ce64bab39defee66dbfb0ff7f2ed2c9fdedb9e1eec1ccc1eecdf7bf8f0de810e9b5e26a122e0f2e6a77bb3f3e9c3fce1f6c3bde9f9f6fefedec176b633bdbfbdb733b93ffb749acf0eee1f04b3c6ff5a7a03c4dd9f6532fd6451b7ebacfc229bce8b65ce7c448a023fde5885a35c6c3e78f7eedd0f64bc56eb0db7303cf25e3deabb4392029177ac84bf76e9af8fcedefcfe6f8c88e0c33df970eff77fb3c7440671e9ffdf4f7e","c9ff03b51eaea9b3060000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11983',
  'x-ms-correlation-request-id',
  '076e0580-905c-4d21-981a-a4f72926aeab',
  'x-ms-request-id',
  'a91928d3-a926-432a-8594-bdb46625b9de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'nginx',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220106T031109Z:076e0580-905c-4d21-981a-a4f72926aeab',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Jan 2022 03:11:09 GMT'
]);
