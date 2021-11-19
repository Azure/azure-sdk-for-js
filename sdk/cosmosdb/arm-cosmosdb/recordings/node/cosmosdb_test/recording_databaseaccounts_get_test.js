let nock = require('nock');

module.exports.hash = "4e47848003a4f74b73262cd4a838afa8";

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
  'b337db6b-7951-4d81-85ef-837a8b430200',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aiw9psMJF8RBt_ScocOulbg; expires=Thu, 16-Dec-2021 04:40:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrs1-9Upgo40QAWHk8A4S5bnREXpxOskA3ZPdgYyBmzya6OFeoZ4O1fTyASBrSXPlNC_E-7UBMe48MA8IxIyJ4sJnrnWwxodh3gK_Tt67026XXXUWi2Tkf5tOjhuALn2yCG95-6ZAq-e37w3r-SbnyuGod49E9hLhM3ZMyKsaSW4UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 04:40:23 GMT',
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
  '8eef547c-b276-4bd5-af48-16ed55190200',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ai1lqgrAZMtJmnPqiLwhumY; expires=Thu, 16-Dec-2021 04:40:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrHW0s8I6N9Aoh4fD4yZiuciskiapWjeWMCLwCsq6CdqW5Vp26ptLEZbALhuoSQLgyshnmcDFx1K2KLS6cBoohYTgMCGR-OI2XHbF9J8LvVSdmW4gvqTCK_CyaISWRODXdJtaiZz4iC9hgBaxERu2aPVwqmtaS88dsMEAzYp3tam0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 04:40:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e0664779-9cc5-4761-bd53-85afdb7dadb2&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'b337db6b-7951-4d81-85ef-837a8d430200',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AraOk1QsPIdHlYfEtq_DGZUWPr5BAQAAADctJdkOAAAA; expires=Thu, 16-Dec-2021 04:40:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 04:40:24 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f56d3f5225fb64f9fdc9d656d36c99afc783aadd6cb162f66f2ebbb77efee7f34fa68992d7242a9fb71594d3360475f9d664d9b7ef59a3e6caf57687bab8ea8f9db6289d17e5e5693ac744de99b36bb683e7af48b7fc9e8a3e69a86b1784a2fd3df1f4deb3c6bf3d9714bafededeced6eefd2ff3e7db3b3ffe8dea78f76f6c7f7eeed7fbabbf7e0a73ea23769e0abbc6e8b1c90f0d765d110c2c5f2e2754b4008c2ebf5749ae7b37c463dceb4fbd3e56c55154b74306fdb55f3e86e4891b169d88cb31faceb7c3cad168ff6f7efdd2518abf5a42ca62ff2f6aaaadfd238f386bafee874994d4aee23e7df8ed76db520da4d9f6545595de6f5478fceb3b2c9cdf75faccbb65895f977eba2cd9f2b990950d0e8654623c317bf577efd050daaad1c98a2f9c9a26ed759a9983c2bca36af0d1aa6d565d0e6d5ba049dbef7fd91c1f77855bca1e9a40f3f7afd8b4ac27e5634f8823a7c42d338fb226f33cc29a36906abb005c767759ebf297ae33b5e66e5350d3f2b5f13d6d905cd847e9f75bf39a996e7c5c5ba661260169be93c5f64c08bd0fa6e5e964ff3f36249a3a2f92e964d9b2da7f9198df1a349369b4ef6663bdbf71ee62432fbe7d976763079b0bdfb70b2f7294dd7ec7c3fc39868001e537e797e9ed70a9d986439cb6accdb2c3fcf6852ce6634ed457b4d5f3e2beaa6c51c5cdb0f49528494c7d3f2c9f52a03393e7a512d73fa464987c92c69fae776c4539ad982187c39bd7e5911ef10ec5f6cbaa3c19bef9ee7977949e05e13914189d1478becddd99266f5322bcf96af738233a3feeef3178479992fa9e9cb9aa8f3eea347bb3b3b441f6ae388f925f15d4d6a815e82945d6112811ebea3cfbea78a2860fded2bd2276b08ae11fe17a21bbe4b9f8b0230c271931429a88dc27483c09eabf4bcac8b8ab027caed100f343f45147f95cfd63477e89ee9fc4b88ab4971ccfeff3bc05174386410daf9947aafb33236acd7f83e3d9106ef39be10f6373bcebdf71c679e81d604aa333e67980c7a370e4b407db3c3d91d1c0ef1a541f9473c99f1b07ec493bd6109a86f76381b79d236874962ffe9ebb2a685643b264b148515ce1dbdda8119e18b3ef0bd01e042417aa503d44d461fd62e2831ad6a8c1ebf65ab6c5294e473313de89362e5394d936cfa76bd6282d1bbbfd878c22f7382372ba6d403f9a2fceb17d52c7f19b8a6f2ae33e75f14cb35b9ee349c7d922ef9f6554e8e003077cdbe4dee3e353a304dd46732130a3c3efa3caf3efa2564dfbbaec92b0d16cee0357ceffbd4827c01828f815be4d979f925","bfe4ff01bdec892c940c0000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11281',
  'x-ms-request-id',
  '131506eb-afa8-477f-9bc0-baf0d94af0f9',
  'x-ms-correlation-request-id',
  '131506eb-afa8-477f-9bc0-baf0d94af0f9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T044025Z:131506eb-afa8-477f-9bc0-baf0d94af0f9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 04:40:24 GMT'
]);
