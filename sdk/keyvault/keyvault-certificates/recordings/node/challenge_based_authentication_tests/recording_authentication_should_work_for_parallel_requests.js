let nock = require('nock');

module.exports.hash = "a293f69d0b5fd0736d8fe7d9c9e1ea78";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5cf9659d-cc2e-4656-8c61-7dfbd46177d0',
  'x-ms-request-id',
  '899eb989-1013-4677-9e29-5481920a88e7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'eb4dada0-ece8-4ed7-b408-6c6f84cf0e29',
  'x-ms-request-id',
  'e7cbbd04-c0e2-45d1-825a-7aafb72fbb4f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:33 GMT'
]);

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
  '52714894-3fd4-41c8-9d4b-f2514a781602',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aip9r52J29tElGir6pFMwgk; expires=Fri, 28-May-2021 22:24:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSEgn8PI7gsrq4Tok5RakCNRSgUUX-w_9bmaEEphgv7rAaijh--slLlLTn6_2m8BQrPwwUF8UKfdrp7o5vDDbA-bvHcJjByONw2-pP-WkkmyPOU3Lf9kZd_IY5g4-zs8T5mTDKsHh1y5y67OyJgnSChiIY09O70n9rsYVxCJvK-EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:24:32 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '2bd23cee-7fd8-4275-89ce-1d87d8e60702',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AtPRfsTMW_9AkZ7oh4TCZ4s; expires=Fri, 28-May-2021 22:24:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLGUqq7Y-9bMA1Ok72vxmzpDY2nwCTzt5wFL3_4B1ODe2gZgcfihJGPdzUs6pjFz4yzbZkg1Czz_nmsYd0raEBKBbAplV45raVIpHF7qOhhEr7vDzU7Eqk4dA8k4GMHL1CTQ0j1r05v8FwLPgcMq3Aig2IEW8VLiNQuSr7o7BVFYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:24:32 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"NA","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '4838f28a-bcb9-405c-905d-3e63feaf4100',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtPRfsTMW_9AkZ7oh4TCZ4s; expires=Fri, 28-May-2021 22:24:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrwmv1nAEabCyNy1Y4ZbL-Cs3E-BQE5awD49vVkjiJZ8zfqoKRQ-UyVJMUqLTgmHZLWJ88PWQ40ls-xl_arzA1MflniMrt8zLUMa_2pr6RPohq0fj7D6XO83oOHeznQTILXKnN1KXO7k3dPiEsgPorbOnkDZUdxXp5eOfvH2fnTGogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:24:32 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"NA","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1651',
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
  '31061063-f98b-4365-a7d0-37a718ac6a00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aip9r52J29tElGir6pFMwgk; expires=Fri, 28-May-2021 22:24:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrgo786xuRMDdCOzDEO8M2RvMeaXLAxeCr4XJdAlhj6C9MqB09txfk-WmRIkluh6Oa92YaFE-xus5Eg-fuDvE-AlmuuRdCwN89bfQobfYhmxryzq54DA0NppZPGfc-LwAWNEk6XI587anEwuqKdV3iONe8j1wvz04IN4DG_dgKOYYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:24:32 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1313',
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
  '8fa1c2cf-b116-417a-8b4c-0513fa032a01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtPRfsTMW_9AkZ7oh4TCZ4vmR1YbAQAAAKHXG9gOAAAA; expires=Fri, 28-May-2021 22:24:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:24:32 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  'd1bad0e6-2846-4292-99df-24a747ec3301',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aip9r52J29tElGir6pFMwgnmR1YbAQAAAKDXG9gOAAAA; expires=Fri, 28-May-2021 22:24:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:24:32 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmF8NgjjDsYb9/jbkIJ5Y33MOkQDgD4tUo03CoqpcaJHzzFkAXEeHnqpdQjSwwNXTkWVaLAGnGMpTcrPxd2sLPpN8eGR+2o8mMT76ujOVNQzEOSGlZA43M9ORAYz8Z+mVG+TWyZyT52QBIhCqkMqjeEz5vrguIhs+4prMC4HxIo/1PHqV0klstmWNKBGQM4FqUllKOKHktpB9P1ybFp7jTLKJPCf5Uk9yC57IDGdEFDWgNGd/zoapua8RNcL4CdkAFhg4jf2YXv2T/z0ly2MoorMrFS0kNnnvlTfEvNRCCnXSuMSu5IT2+r1cX1xk5N5yb53VjsrBKH0wAML654nioQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIr1eCD+NZQYDmprYttyCFMe+vYumLFrXd9bMTHWGN6widFpGgc0VqkJrj+rlgoFlh+wAwe28Bd2B+qtL2itryZ49fGsJB9j91h2a0lp7FV4mPdaXQf5OCFVzcCLWrqt0TG7935UOwATfuKvfFPEkKXsQJ4JfVliiGcXQr6aWV9S8c4AdrF87Jo7HMsM+OWtYCcC5f81CXIbkflDK77CNlWBsPdJtT/mNef4Y1THxW0PTgtmhjfx6MSzeuc0wq6mNidcukTf5eP6IqlAuh2OL/N+WxGrx/M3m/ReZswthcd6htZwoMbXLiY41mi8M/ZSSlMMQbqs0BIjpbsthHQwy10=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"476fdcb9d1544a9dbe17e60ea9b65e9f"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending?api-version=7.2&request_id=476fdcb9d1544a9dbe17e60ea9b65e9f',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5cf9659d-cc2e-4656-8c61-7dfbd46177d0',
  'x-ms-request-id',
  '7123a0ad-4614-49d5-950e-c15f73440500',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:34 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending?api-version=7.2&request_id=8940d85428b14c6db98ee948d778dcf3',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'eb4dada0-ece8-4ed7-b408-6c6f84cf0e29',
  'x-ms-request-id',
  '6247c071-2b3d-4adb-a40d-15dc386d5f46',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:34 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmF8NgjjDsYb9/jbkIJ5Y33MOkQDgD4tUo03CoqpcaJHzzFkAXEeHnqpdQjSwwNXTkWVaLAGnGMpTcrPxd2sLPpN8eGR+2o8mMT76ujOVNQzEOSGlZA43M9ORAYz8Z+mVG+TWyZyT52QBIhCqkMqjeEz5vrguIhs+4prMC4HxIo/1PHqV0klstmWNKBGQM4FqUllKOKHktpB9P1ybFp7jTLKJPCf5Uk9yC57IDGdEFDWgNGd/zoapua8RNcL4CdkAFhg4jf2YXv2T/z0ly2MoorMrFS0kNnnvlTfEvNRCCnXSuMSu5IT2+r1cX1xk5N5yb53VjsrBKH0wAML654nioQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIr1eCD+NZQYDmprYttyCFMe+vYumLFrXd9bMTHWGN6widFpGgc0VqkJrj+rlgoFlh+wAwe28Bd2B+qtL2itryZ49fGsJB9j91h2a0lp7FV4mPdaXQf5OCFVzcCLWrqt0TG7935UOwATfuKvfFPEkKXsQJ4JfVliiGcXQr6aWV9S8c4AdrF87Jo7HMsM+OWtYCcC5f81CXIbkflDK77CNlWBsPdJtT/mNef4Y1THxW0PTgtmhjfx6MSzeuc0wq6mNidcukTf5eP6IqlAuh2OL/N+WxGrx/M3m/ReZswthcd6htZwoMbXLiY41mi8M/ZSSlMMQbqs0BIjpbsthHQwy10=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"476fdcb9d1544a9dbe17e60ea9b65e9f"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bf06ccdf-98f9-402c-8366-12ab458b805b',
  'x-ms-request-id',
  'a7e20a04-a37b-4cab-91ce-1d0b4471415e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:34 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ee653160-8cb8-4ef7-a8f2-fcaebcabac46',
  'x-ms-request-id',
  'ddb2c320-7f5e-4f4e-a84b-b77d23a3bd55',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:34 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '878cf777-eab4-4157-8039-f257dfc6f5fc',
  'x-ms-request-id',
  '1fedc437-67f3-4368-9c7e-089bc50ceeb2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:34 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b0d901f2-504b-417d-af98-e7a23d1c7af7',
  'x-ms-request-id',
  'f20bb543-31ca-460b-99c0-1d6afe17e07a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:36 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd9d6a479-e58b-4126-961e-b2af143fbd49',
  'x-ms-request-id',
  '73a4d831-f401-4d7e-b503-8af88f6719e2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:38 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0c443fe6-34ab-4f87-839c-1125f079165c',
  'x-ms-request-id',
  'c3a15aa1-a996-4d75-82ae-3c6e20c1dc6a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:40 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '46d79323-20f6-425d-a44a-6a17309392b1',
  'x-ms-request-id',
  'c17b6a92-4715-4bd8-8898-bf87a08124b1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:42 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '28909714-c57b-4955-815a-e7a9677f1b03',
  'x-ms-request-id',
  '2090cfd0-22fb-48d4-8ca5-9a821c8f6ef5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:44 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'afba0bf9-debb-4949-862b-9b67977cc8ea',
  'x-ms-request-id',
  'ace59deb-9bfd-44ca-a869-3168e7725068',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:46 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ab7c3b2e-ed9e-4d91-bfaa-1a747df142c0',
  'x-ms-request-id',
  '63980fde-c691-4e2b-a7c2-18a48cb09ef0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:49 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1442d190-9f72-4d8a-8799-b28066ea32ef',
  'x-ms-request-id',
  'a73b2f93-9045-4681-9211-2713e047b954',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:50 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4ea9346e-f4cc-4336-9e61-3e662fa1b3aa',
  'x-ms-request-id',
  '3f79e49a-0a5e-4c25-8cbb-d94b8805c504',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:53 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'caa6d570-e9d0-491e-9309-78213cd772d5',
  'x-ms-request-id',
  '64661335-2f9a-40c6-b92f-390415b89f48',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:55 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2c5a0f5a-f349-4eba-bc0c-c63efa1da320',
  'x-ms-request-id',
  '1a2bb663-19fe-45a1-8991-e5d8da93ab96',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:56 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '06026021-c3e1-4a23-8fd8-055064993b18',
  'x-ms-request-id',
  '3fd8bd1e-6d53-4a13-901d-b14d3259f77e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:24:58 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '00de99f5-41c8-449b-8efc-9ca9ac7c4c80',
  'x-ms-request-id',
  '757598de-f807-4175-bd11-84b6aad2254e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:00 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '61f12b25-2d1a-4a64-b122-f51f87769580',
  'x-ms-request-id',
  '2327fb35-bc5a-4555-b50d-761063486c3e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:03 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3d1c58c4-7ccc-47b2-9bc6-7ee191b51091',
  'x-ms-request-id',
  '610d475f-664e-4ab1-a73e-a482b270b1e0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:05 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0e2f5052-eb3f-410c-9c44-2fdcd41286e5',
  'x-ms-request-id',
  'd3f3cbab-0b9e-4f16-885d-f23ca34a66ba',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:07 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e2a6cbd7-2058-46f7-ad39-d9a5dc3750bb',
  'x-ms-request-id',
  'e8c59aae-099a-41b1-abda-b68f9892e99b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:09 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ce074a1f-d653-4fba-8669-9b71a847399f',
  'x-ms-request-id',
  '41d3806a-3b47-4f62-b97f-5ac800436735',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:11 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4d1d6590-d7b8-4bea-af3f-96188b3c98c8',
  'x-ms-request-id',
  '92704ea3-4b5a-4307-9aa8-6de81cd645d4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:14 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0f3da4db-21c1-4ba8-a5b4-64a9aef87684',
  'x-ms-request-id',
  '6933cc38-10da-4bdd-ba7b-1f810d1363aa',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:15 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '150aed25-1945-492f-a845-dc39cea81921',
  'x-ms-request-id',
  '568c2e1e-d686-405f-8a51-d0aab0b1ae66',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:17 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f0eecc1c-c341-4223-84d2-68ea9b612096',
  'x-ms-request-id',
  '5383abd1-f686-4025-817f-8505fc9f16b1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:20 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c0684b97-427c-4db8-a73d-bf5142f492dc',
  'x-ms-request-id',
  'afb3772f-344e-4a89-982a-83f0ac34b00d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:21 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '07e4a425-7db3-4d73-af68-7c362a14d200',
  'x-ms-request-id',
  'df93e711-8566-4305-ad4f-64de65a16d46',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:24 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7307ed2b-b281-460b-9e22-1d537ccd2009',
  'x-ms-request-id',
  '8b8cefe6-8429-4ae4-9014-54d0a1b33fe0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:25 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0bfd7366-3a80-445a-9516-1694f17c44f8',
  'x-ms-request-id',
  'a1420504-61cb-4f60-9f0b-ccdcb82080d9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:28 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '287c0a12-69b1-4897-9cf1-0c91c43fceed',
  'x-ms-request-id',
  '271499b3-e405-449a-81ca-ad1c6c6a6f7f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:30 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a68c8fde-0bb2-4a69-a5d9-5def1217c00f',
  'x-ms-request-id',
  'e4d36030-cbbd-452e-bc69-e53527030ad2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:32 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ca98fae7-551d-4279-9362-d69004bb9550',
  'x-ms-request-id',
  'e9d7a15d-6800-4636-8781-44eac8984b18',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:34 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '84f1876e-eed3-4a63-a23e-54543a9b9855',
  'x-ms-request-id',
  '4ead47a9-872d-46f8-adfd-ffd0370e9ee8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:36 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f2d0feab-c696-4965-a7b1-631fe8305a0c',
  'x-ms-request-id',
  '77e163d0-32d9-4d78-82ab-7d3e833bcbc0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:38 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b7549f65-c50b-41c8-81b2-1bbd0706d0d1',
  'x-ms-request-id',
  'b61e294f-f409-472a-b877-f4d35cd6e22f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:41 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0845200f-fcd5-4d1f-816b-99462da8d166',
  'x-ms-request-id',
  'd29fc830-2022-4372-a778-7a268dc69d67',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:43 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c8c57065-8c6b-4748-bfb9-8eaaee274449',
  'x-ms-request-id',
  '4e1babfc-6551-48e5-b152-a3b355a93ea3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:45 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '720495ae-aedd-4cd5-8a89-e443a720411d',
  'x-ms-request-id',
  '423e211b-03f0-46e7-917a-c47747b5cef0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:46 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1jbTiWfbtusFNDYFkSZlNHEsBVlsg9YwY6ujSpLvqw6wM0LWcM1Im+4RkBZJ0I3HH+n9NDYSLW5XrxILf4hspL/Dvk2mFiHYOnLRjH/ChFgHC6awqzceBmQylc1r7a78J19ipOgpPBD/cGRK3389X+TwQb9d9s7BGkUcOOHSzSwkjqtRuJPuf68+KU4gTIwfdv3W7M/BxXY1atb9Bc3HOSTb6Fl69UR9oms/6EXIUW03kXpA4j1lAdXDvm2IN8l1NCkoJjm/UYanRf9f/8xrGj2zT7h009bILy+gVAU0G+oMx98pvL/teeYUFbcmiSdi6qDUbs4fxVPKnG5Tz3CVRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHUVcc78CqbH/51L6eOSUW1MKX3LVxpdwT8HJTgkYnofEDbL2YXajoySiNhaghY0eEvKL9qs3CKlQLLPIhjhwJnHH8D/DhHZkMieIFmZfpiFYLNrVn17Z2U6ir+Yf3krR93QKq8442bRrVMtB6DN0/f825DOILkiyw5C+pd7BpGq2jDlKQV38BW/wwox4BVjal3J+7AbpyKbsMnDyh2l8FW6MjO2Ajv6ZozRR4Bip2HrCbFXd0PuaUYkpy9Pzt/xqh6hD3AyXoVro0Kwfyka7ihskI0K/BOI3+eGQHjt9WU05mYnfKePXlT8J5LCHRmjuZQxcWI+ZIE7tImHsgfBdnU=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","request_id":"8940d85428b14c6db98ee948d778dcf3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3f815473-087e-4c24-9804-a19b9bb38d93',
  'x-ms-request-id',
  '7c219f08-349f-4b8a-9dbe-66f08f39f992',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:49 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/70b9eaba024b410495b2ca4c9f0c4d19","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/70b9eaba024b410495b2ca4c9f0c4d19","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/70b9eaba024b410495b2ca4c9f0c4d19","x5t":"AE6chdL3iootxzPGrX1zSd5DZlY","cer":"MIIDKDCCAhCgAwIBAgIQb3vxtNRiTFCBHXvolQW4NTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIxNTQ4WhcNMjIwNDI4MjIyNTQ4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWNtOJZ9u26wU0NgWRJmU0cSwFWWyD1jBjq6NKku+rDrAzQtZwzUib7hGQFknQjccf6f00NhItblevEgt/iGykv8O+TaYWIdg6ctGMf8KEWAcLprCrNx4GZDKVzWvtrvwnX2Kk6Ck8EP9wZErffz1f5PBBv132zsEaRRw44dLNLCSOq1G4k+5/rz4pTiBMjB92/dbsz8HFdjVq1v0Fzcc5JNvoWXr1RH2iaz/oRchRbTeRekDiPWUB1cO+bYg3yXU0KSgmOb9RhqdF/1//zGsaPbNPuHTT1sgvL6BUBTQb6gzH3ym8v+155hQVtyaJJ2LqoNRuzh/FU8qcblPPcJVFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQNVTgswEH0dSsphK5Z3lsSdKF7LjAdBgNVHQ4EFgQUDVU4LMBB9HUrKYSuWd5bEnShey4wDQYJKoZIhvcNAQELBQADggEBAC9yfj956w/nT4JFRmemf/xDk3bTHcCtewLG4vHXFzlElgNRiUkU18M+oqSR7F4VGsQaPyY44GhWWV3svP23/6RLNHSV762H+kk0eFz90VInA71hKBK0xnlDWTBadu5NaswsFt2xZtpTCth1tQ4ZVaadpgc5A8akkm9DBaghwGQPbYyudjk6pG2/9ZCPq0QHXvC2Wdmw3MffY7crihI94iQQK3JasIEWJCsXFHou8B4I4ple9aV3fnzndFYoPSFOUZ7nsV2CbKcFvBoZlXXHSMxQGHxijIJ/oNaCp0av86e59/u5uELi5voMIMo1v6FUYtrXlSb3UwAq5Xy39P8eIUw=","attributes":{"enabled":true,"nbf":1619648148,"exp":1651184748,"created":1619648748,"updated":1619648748,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619648673,"updated":1619648673}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd631a2a6-f6c9-490b-8fe4-b558595a7ae6',
  'x-ms-request-id',
  'f7ceda3d-fe6a-489f-a938-b89695e19408',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:49 GMT',
  'Content-Length',
  '2735'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","deletedDate":1619648749,"scheduledPurgeDate":1627424749,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/70b9eaba024b410495b2ca4c9f0c4d19","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/70b9eaba024b410495b2ca4c9f0c4d19","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/70b9eaba024b410495b2ca4c9f0c4d19","x5t":"AE6chdL3iootxzPGrX1zSd5DZlY","cer":"MIIDKDCCAhCgAwIBAgIQb3vxtNRiTFCBHXvolQW4NTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIxNTQ4WhcNMjIwNDI4MjIyNTQ4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWNtOJZ9u26wU0NgWRJmU0cSwFWWyD1jBjq6NKku+rDrAzQtZwzUib7hGQFknQjccf6f00NhItblevEgt/iGykv8O+TaYWIdg6ctGMf8KEWAcLprCrNx4GZDKVzWvtrvwnX2Kk6Ck8EP9wZErffz1f5PBBv132zsEaRRw44dLNLCSOq1G4k+5/rz4pTiBMjB92/dbsz8HFdjVq1v0Fzcc5JNvoWXr1RH2iaz/oRchRbTeRekDiPWUB1cO+bYg3yXU0KSgmOb9RhqdF/1//zGsaPbNPuHTT1sgvL6BUBTQb6gzH3ym8v+155hQVtyaJJ2LqoNRuzh/FU8qcblPPcJVFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQNVTgswEH0dSsphK5Z3lsSdKF7LjAdBgNVHQ4EFgQUDVU4LMBB9HUrKYSuWd5bEnShey4wDQYJKoZIhvcNAQELBQADggEBAC9yfj956w/nT4JFRmemf/xDk3bTHcCtewLG4vHXFzlElgNRiUkU18M+oqSR7F4VGsQaPyY44GhWWV3svP23/6RLNHSV762H+kk0eFz90VInA71hKBK0xnlDWTBadu5NaswsFt2xZtpTCth1tQ4ZVaadpgc5A8akkm9DBaghwGQPbYyudjk6pG2/9ZCPq0QHXvC2Wdmw3MffY7crihI94iQQK3JasIEWJCsXFHou8B4I4ple9aV3fnzndFYoPSFOUZ7nsV2CbKcFvBoZlXXHSMxQGHxijIJ/oNaCp0av86e59/u5uELi5voMIMo1v6FUYtrXlSb3UwAq5Xy39P8eIUw=","attributes":{"enabled":true,"nbf":1619648148,"exp":1651184748,"created":1619648748,"updated":1619648748,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619648673,"updated":1619648673}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '40684740-ea2d-4e38-9089-89874e79f305',
  'x-ms-request-id',
  '4b92136c-b823-42d6-85d4-3730003c658d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:49 GMT',
  'Content-Length',
  '2964'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '78b6966b-b983-489d-8264-578525f32c2a',
  'x-ms-request-id',
  '3185f782-d379-49fc-ad38-fada24ec0111',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0c469b52-3b21-4c0c-ba67-50d1dc067df8',
  'x-ms-request-id',
  '46ce2a60-4166-4538-891c-d9615b6c185b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cdedc112-3fb0-4381-9d69-19f83b596c35',
  'x-ms-request-id',
  '0e4d8b62-27ce-4d73-9f75-5782d9bc62b9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '030cbac0-20ae-4e7e-bc64-4c397869ecc0',
  'x-ms-request-id',
  'b9c4d713-91eb-41cf-9768-4fa3332d7056',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '03f00df0-53f5-456a-9fc6-9801519972a3',
  'x-ms-request-id',
  '264af650-ce2d-4e1f-88d4-b64b58ae3b48',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c9ed8112-dfa8-4007-bdef-7cd2f8e203bd',
  'x-ms-request-id',
  'c00d9f6b-d339-4406-8623-a3e6f8b53a1b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:25:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8585d57d-4ff0-497f-8fa0-248eb4fb5bf3',
  'x-ms-request-id',
  'e2ac503d-8a12-413e-96e6-3670750b9a41',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd1affa19-d35f-4609-98a9-5fcc88bbacc5',
  'x-ms-request-id',
  'f115f8fa-8d78-48f7-8014-459863924ce2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '69eb7d11-d4bb-4a84-a915-98f6d9d3140a',
  'x-ms-request-id',
  '936b89bc-8c0b-42ed-9bbd-2df75e1e5aa1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '51e05b1c-ddc4-4bde-a7dd-b2e09d89beb6',
  'x-ms-request-id',
  '816974ad-ecdb-45c2-a34f-916d528e0191',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '674efed8-613b-4e19-bd73-04c6ff14a8a3',
  'x-ms-request-id',
  '9a8e70e3-c632-44f6-b774-8f29912ae8b4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '65a4da74-efd1-4f7f-9767-624e963f4784',
  'x-ms-request-id',
  '463be985-739b-427f-ba8e-09e1db6e84c6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1e93a424-205f-4b4c-beae-1bf35235a2df',
  'x-ms-request-id',
  '6b1ea5c7-b8b0-4266-8074-b12dfcd186c6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8f5dcd86-5e26-478e-8fc3-7752eb663ecf',
  'x-ms-request-id',
  'f7e3bf24-9f16-404f-87d4-91e0f7ddb18b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f558f43b-f804-48fe-95dc-8450065ad62a',
  'x-ms-request-id',
  '9b15e16b-849a-4e1f-a8ef-d43a11472954',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e52c9671-48d6-4af3-acad-742c4dbdb4eb',
  'x-ms-request-id',
  '760745b2-cc84-4c9d-b032-5154b60fe86e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fe085f31-c199-4e0c-8002-b76cf5c5ea3c',
  'x-ms-request-id',
  '2fe6ed2d-a629-48d1-93dc-aa303b9c2a1b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b8b7ecb7-c6d0-41f8-a69d-81889f5e0f33',
  'x-ms-request-id',
  '9467d547-79b3-4041-b103-b697876cf6e5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '981c3a61-d29e-439a-a429-3ba179ab8501',
  'x-ms-request-id',
  '497cf8f3-5392-4083-8c9e-d68e873dfe30',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9f234f03-74b8-4709-a04a-0bd55e7f46f9',
  'x-ms-request-id',
  'fc879948-5717-4214-872e-de973987bbad',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2b32d65c-e384-4eef-8a7c-0ed65a7e8669',
  'x-ms-request-id',
  '9a2ca03e-7bd6-4054-a68b-336840a1229c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '61449af5-b928-4eae-801e-351c9ce9eb0b',
  'x-ms-request-id',
  '8ef2dee6-3c29-4785-a9ca-e8e7f23e2f41',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '20495030-7e9b-4517-8eac-1b33318b0d0c',
  'x-ms-request-id',
  'e38e7692-806c-493c-8823-2bf48b57af87',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","deletedDate":1619648749,"scheduledPurgeDate":1627424749,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/70b9eaba024b410495b2ca4c9f0c4d19","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/70b9eaba024b410495b2ca4c9f0c4d19","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/70b9eaba024b410495b2ca4c9f0c4d19","x5t":"AE6chdL3iootxzPGrX1zSd5DZlY","cer":"MIIDKDCCAhCgAwIBAgIQb3vxtNRiTFCBHXvolQW4NTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIxNTQ4WhcNMjIwNDI4MjIyNTQ4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWNtOJZ9u26wU0NgWRJmU0cSwFWWyD1jBjq6NKku+rDrAzQtZwzUib7hGQFknQjccf6f00NhItblevEgt/iGykv8O+TaYWIdg6ctGMf8KEWAcLprCrNx4GZDKVzWvtrvwnX2Kk6Ck8EP9wZErffz1f5PBBv132zsEaRRw44dLNLCSOq1G4k+5/rz4pTiBMjB92/dbsz8HFdjVq1v0Fzcc5JNvoWXr1RH2iaz/oRchRbTeRekDiPWUB1cO+bYg3yXU0KSgmOb9RhqdF/1//zGsaPbNPuHTT1sgvL6BUBTQb6gzH3ym8v+155hQVtyaJJ2LqoNRuzh/FU8qcblPPcJVFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQNVTgswEH0dSsphK5Z3lsSdKF7LjAdBgNVHQ4EFgQUDVU4LMBB9HUrKYSuWd5bEnShey4wDQYJKoZIhvcNAQELBQADggEBAC9yfj956w/nT4JFRmemf/xDk3bTHcCtewLG4vHXFzlElgNRiUkU18M+oqSR7F4VGsQaPyY44GhWWV3svP23/6RLNHSV762H+kk0eFz90VInA71hKBK0xnlDWTBadu5NaswsFt2xZtpTCth1tQ4ZVaadpgc5A8akkm9DBaghwGQPbYyudjk6pG2/9ZCPq0QHXvC2Wdmw3MffY7crihI94iQQK3JasIEWJCsXFHou8B4I4ple9aV3fnzndFYoPSFOUZ7nsV2CbKcFvBoZlXXHSMxQGHxijIJ/oNaCp0av86e59/u5uELi5voMIMo1v6FUYtrXlSb3UwAq5Xy39P8eIUw=","attributes":{"enabled":true,"nbf":1619648148,"exp":1651184748,"created":1619648748,"updated":1619648748,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619648673,"updated":1619648673}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e144ef6a-4548-42a7-b439-e52ba47678f7',
  'x-ms-request-id',
  '3358ed02-61ec-48b8-855a-73d73cf2e099',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:35 GMT',
  'Content-Length',
  '2964'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '65606cff-7fb7-4b3e-b690-6536bac13f26',
  'x-ms-request-id',
  '0a206fa2-4d62-4aa6-9b7a-0d0dd0393223',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmF8NgjjDsYb9/jbkIJ5Y33MOkQDgD4tUo03CoqpcaJHzzFkAXEeHnqpdQjSwwNXTkWVaLAGnGMpTcrPxd2sLPpN8eGR+2o8mMT76ujOVNQzEOSGlZA43M9ORAYz8Z+mVG+TWyZyT52QBIhCqkMqjeEz5vrguIhs+4prMC4HxIo/1PHqV0klstmWNKBGQM4FqUllKOKHktpB9P1ybFp7jTLKJPCf5Uk9yC57IDGdEFDWgNGd/zoapua8RNcL4CdkAFhg4jf2YXv2T/z0ly2MoorMrFS0kNnnvlTfEvNRCCnXSuMSu5IT2+r1cX1xk5N5yb53VjsrBKH0wAML654nioQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIr1eCD+NZQYDmprYttyCFMe+vYumLFrXd9bMTHWGN6widFpGgc0VqkJrj+rlgoFlh+wAwe28Bd2B+qtL2itryZ49fGsJB9j91h2a0lp7FV4mPdaXQf5OCFVzcCLWrqt0TG7935UOwATfuKvfFPEkKXsQJ4JfVliiGcXQr6aWV9S8c4AdrF87Jo7HMsM+OWtYCcC5f81CXIbkflDK77CNlWBsPdJtT/mNef4Y1THxW0PTgtmhjfx6MSzeuc0wq6mNidcukTf5eP6IqlAuh2OL/N+WxGrx/M3m/ReZswthcd6htZwoMbXLiY41mi8M/ZSSlMMQbqs0BIjpbsthHQwy10=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","request_id":"476fdcb9d1544a9dbe17e60ea9b65e9f"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '311461ca-6274-4079-9a0e-da819dc4806c',
  'x-ms-request-id',
  '643a6db7-7ef9-4e93-8eb0-4e3ea3864bda',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:36 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/7a3c1e89ca154d3197789a1dc3d3f0d3","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/7a3c1e89ca154d3197789a1dc3d3f0d3","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/7a3c1e89ca154d3197789a1dc3d3f0d3","x5t":"RNTgnukkgxjTQZL7IWe8RqMitms","cer":"MIIDKDCCAhCgAwIBAgIQESlBEJFbTmilxwKgSBD2rjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIxNTQ4WhcNMjIwNDI4MjIyNTQ4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCYXw2COMOxhv3+NuQgnljfcw6RAOAPi1SjTcKiqlxokfPMWQBcR4eeql1CNLDA1dORZVosAacYylNys/F3aws+k3x4ZH7ajyYxPvq6M5U1DMQ5IaVkDjcz05EBjPxn6ZUb5NbJnJPnZAEiEKqQyqN4TPm+uC4iGz7imswLgfEij/U8epXSSWy2ZY0oEZAzgWpSWUo4oeS2kH0/XJsWnuNMsok8J/lST3ILnsgMZ0QUNaA0Z3/Ohqm5rxE1wvgJ2QAWGDiN/Zhe/ZP/PSXLYyiisysVLSQ2ee+VN8S81EIKddK4xK7khPb6vVxfXGTk3nJvndWOysEofTAAwvrnieKhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQZ0guDUJrT4P/VMWcgiQBBZ17mgzAdBgNVHQ4EFgQUGdILg1Ca0+D/1TFnIIkAQWde5oMwDQYJKoZIhvcNAQELBQADggEBADiO9jt6wYjXTl0MwmvBFCaLhSxacn353vB4oYPWJLqedAOcw5xgac082ZhylRkT9k3J+HjGnIoKDhq8r8CJE03RQ+xtOoRyiJlVPbzMLDUuzzms+dEh3a6OLpYlqUZqQA1YjCsflc98n4gduat93Hr4nbD6amTarKnI+pAdiYj8NxLnCa3WA4qztWHp5tC/qy3T/mfNQiVUulUFm/fjNvEdnSAXz5Yok1MJnR/i8a/6Zg9RUc5eM/1CEeszYzFZm2l+m+eRBULsrmrGh39fnCMYBQaADz5oklskcrkVicC7eG9OC3ApvJRxdBSpMxXfA/lLA3TK6vaCVR7yCbzhazI=","attributes":{"enabled":true,"nbf":1619648148,"exp":1651184748,"created":1619648748,"updated":1619648748,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619648673,"updated":1619648673}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9c02a744-8948-4e09-afb3-a1279a00b938',
  'x-ms-request-id',
  '2a4de608-1546-4d71-ad5c-a7deb05d73b7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:35 GMT',
  'Content-Length',
  '2735'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","deletedDate":1619648796,"scheduledPurgeDate":1627424796,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/7a3c1e89ca154d3197789a1dc3d3f0d3","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/7a3c1e89ca154d3197789a1dc3d3f0d3","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/7a3c1e89ca154d3197789a1dc3d3f0d3","x5t":"RNTgnukkgxjTQZL7IWe8RqMitms","cer":"MIIDKDCCAhCgAwIBAgIQESlBEJFbTmilxwKgSBD2rjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIxNTQ4WhcNMjIwNDI4MjIyNTQ4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCYXw2COMOxhv3+NuQgnljfcw6RAOAPi1SjTcKiqlxokfPMWQBcR4eeql1CNLDA1dORZVosAacYylNys/F3aws+k3x4ZH7ajyYxPvq6M5U1DMQ5IaVkDjcz05EBjPxn6ZUb5NbJnJPnZAEiEKqQyqN4TPm+uC4iGz7imswLgfEij/U8epXSSWy2ZY0oEZAzgWpSWUo4oeS2kH0/XJsWnuNMsok8J/lST3ILnsgMZ0QUNaA0Z3/Ohqm5rxE1wvgJ2QAWGDiN/Zhe/ZP/PSXLYyiisysVLSQ2ee+VN8S81EIKddK4xK7khPb6vVxfXGTk3nJvndWOysEofTAAwvrnieKhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQZ0guDUJrT4P/VMWcgiQBBZ17mgzAdBgNVHQ4EFgQUGdILg1Ca0+D/1TFnIIkAQWde5oMwDQYJKoZIhvcNAQELBQADggEBADiO9jt6wYjXTl0MwmvBFCaLhSxacn353vB4oYPWJLqedAOcw5xgac082ZhylRkT9k3J+HjGnIoKDhq8r8CJE03RQ+xtOoRyiJlVPbzMLDUuzzms+dEh3a6OLpYlqUZqQA1YjCsflc98n4gduat93Hr4nbD6amTarKnI+pAdiYj8NxLnCa3WA4qztWHp5tC/qy3T/mfNQiVUulUFm/fjNvEdnSAXz5Yok1MJnR/i8a/6Zg9RUc5eM/1CEeszYzFZm2l+m+eRBULsrmrGh39fnCMYBQaADz5oklskcrkVicC7eG9OC3ApvJRxdBSpMxXfA/lLA3TK6vaCVR7yCbzhazI=","attributes":{"enabled":true,"nbf":1619648148,"exp":1651184748,"created":1619648748,"updated":1619648748,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619648673,"updated":1619648673}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a4948b04-caed-4086-948c-041db3168544',
  'x-ms-request-id',
  '2557abc9-aca1-412d-a451-f64daa0e6ce5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:36 GMT',
  'Content-Length',
  '2964'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '36f57228-e681-4d9e-9c63-69d168b2d361',
  'x-ms-request-id',
  'b44cb61c-ea84-465f-9a25-7eeca798e9bc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1b2603e6-af06-4970-9e47-cd068fcbe908',
  'x-ms-request-id',
  '30d34d8c-e6fe-43a6-8221-f5ab8a43f798',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '13837242-dd9c-4850-b1a2-054c9f00ecb8',
  'x-ms-request-id',
  '0d1dff7b-3145-4402-80bc-573269bbd25f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '47db3a2a-7621-4a1a-be52-c8fbc9f4e549',
  'x-ms-request-id',
  'fb91d5e7-e0b0-4a80-a629-4e6861d06f87',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '455c0407-3182-468e-8ab6-a290f8022444',
  'x-ms-request-id',
  'b72f5b67-703d-4d2a-9209-3a7571db3a61',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c5b965bc-ae52-4c98-837a-798c3eaa7617',
  'x-ms-request-id',
  '4b15574e-d98a-4b8c-972c-f5eec2025e3f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ceb556ce-d158-4c2a-b6ce-e6ab001ff15f',
  'x-ms-request-id',
  'd2b8cada-c989-4618-ba82-001ba16fd1be',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3314a3cd-9f15-4471-9f63-800c2cdcb570',
  'x-ms-request-id',
  '38a11ae6-6301-4ada-91ca-bbe552fd463d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f2892a74-091d-4629-9479-51b6c1df492e',
  'x-ms-request-id',
  'f80ad2b5-fe71-43e6-8d4c-26f82dcabfcb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1dee11f5-11c4-4408-9393-54138442065c',
  'x-ms-request-id',
  '1e913abf-d2c6-425b-b6ea-f76c095b0d7a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd9472bc3-6021-46d2-aaff-15a66807f12d',
  'x-ms-request-id',
  'b09250bc-4581-4885-b527-eaedb61b5939',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '78771e0a-cf4c-4626-a71d-35b2977ec1d1',
  'x-ms-request-id',
  'ba98ddce-5745-411c-a2a1-64df0abf4b25',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:26:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0f1a3edb-df4a-476a-a93b-33af73aa4aa7',
  'x-ms-request-id',
  'c0cd6dc4-3ede-4eba-9440-ffa6e39f73a1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c2129aad-2390-4c39-bb16-c8fcd3dda334',
  'x-ms-request-id',
  '34de1436-4463-4fe4-9ffb-e391a6137451',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fa3f3283-6d82-4b3c-86fe-222d51bd5f35',
  'x-ms-request-id',
  '59537f29-8bea-428e-972d-8024f21d296d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '10855622-39b9-4971-8b79-febc5d74c508',
  'x-ms-request-id',
  'e0108f68-d18a-4094-86a4-869b6b29e01d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '21a35605-28d8-4d18-a6b4-6af01b0e153e',
  'x-ms-request-id',
  '1930665e-1d8b-46c9-a0bd-21a3491b7fa6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c93926bd-5fdd-4da4-836d-2137eed2b88c',
  'x-ms-request-id',
  '2038649f-2fe1-4911-8894-f157b6c63f00',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '15999b46-d634-4184-9b4e-caca1db77f5c',
  'x-ms-request-id',
  '38f5f85e-1e8c-4c01-a8cc-73e69e4de679',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '105ba834-11be-4bf2-a1f8-e081cc94144b',
  'x-ms-request-id',
  '17163209-ffad-45d9-96ec-5f92d9d0f712',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '41f4db48-a994-4fd5-b13c-75932684084d',
  'x-ms-request-id',
  '7e8d8f08-3d4e-4d52-ad53-59a4c1c1ca47',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7a9d5a12-a631-4bcb-895c-63b93d8914cb',
  'x-ms-request-id',
  'b6631055-4fc5-47fe-b2b2-eded46baef97',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '35c77748-c7cd-4bf6-a321-89b3bb8d5e7d',
  'x-ms-request-id',
  '2b4e51c4-5c97-4cc4-a50c-4945a34a5534',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b6ae11e1-dacd-48bf-8dad-da3c1443c8f5',
  'x-ms-request-id',
  '511ce230-d289-420d-8cc8-35d0b55ae5a9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0f2f729b-60f2-4e99-b798-cebed7749951',
  'x-ms-request-id',
  '15276aba-cb14-447b-a7b5-170865842148',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8b6ef403-32a9-41ce-aed7-eeb6840a44b1',
  'x-ms-request-id',
  '2881166b-0b62-4fc5-b258-d55c4fb49097',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '506982fd-90f9-4ed9-9e5f-7041e534b496',
  'x-ms-request-id',
  'a9a59ae2-0ef2-4bef-988e-20f79c850390',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '11624403-0366-4272-aa1c-fdadf48f33c3',
  'x-ms-request-id',
  'aecb42ca-f744-4848-8c1a-ec0835182a83',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8e71c9de-f50f-4418-a75e-693ddcf6c242',
  'x-ms-request-id',
  '4351db8d-15f6-4c52-9fea-e005ab63a217',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4b068332-347c-48ac-b4fc-41e1e4973a3a',
  'x-ms-request-id',
  '8e505d17-67e0-45fd-84a4-e8d6c034e010',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '22d8c689-33aa-47fe-a9ec-9df0419452ee',
  'x-ms-request-id',
  '53d2093e-15af-4cf6-9301-6fdf836102d5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cc7996e9-a87d-422b-8b73-08f3fd228377',
  'x-ms-request-id',
  'e31b169f-b075-46c0-8bab-a85c6cced44e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1e8e9dc8-2d22-48cb-bebf-fa00113eae26',
  'x-ms-request-id',
  'bd218f1b-a714-4941-93ba-47a3cd7a937f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7bc7f9af-3ecc-42d0-b5f3-90bf794cf550',
  'x-ms-request-id',
  '6207c479-a550-48ae-b045-9039e512b7f4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '13a6e27f-7ba7-44df-a7e2-cf1d4a98a97d',
  'x-ms-request-id',
  '096dba17-bfc3-41f0-b064-621ded0a4b1b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd53d8611-059e-4ef4-b234-3aebac695dd9',
  'x-ms-request-id',
  '62df3515-5a0a-4307-8283-8853a1bedcf0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '82fe7678-0991-4f0b-a99d-8f02ba06b744',
  'x-ms-request-id',
  '6f1fe587-94b2-49fe-8aab-a37219af104f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '79c0ff64-0380-4a0e-961e-eaba938a49b6',
  'x-ms-request-id',
  '4667bd0e-dd24-4b20-95c1-224448b76ad1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bbb7dcb7-fc53-4ba9-8cea-414f2355a9e4',
  'x-ms-request-id',
  '66625eb1-23b8-4594-8628-b68fa0295211',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '237b733f-e2af-4d68-9d91-3b6e9813a17b',
  'x-ms-request-id',
  '740ad7c7-de99-4182-ba43-a1bbcd0b13c5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '654ca06d-f195-400b-a8e8-e3319f034b46',
  'x-ms-request-id',
  '54278ade-7a8f-4e56-86f7-e23165f7ad77',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:27:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0bd065f6-d1b2-4fe8-a7f5-f1e519759928',
  'x-ms-request-id',
  '40e745aa-d2d0-43f9-94a3-3ec5ed7df0c5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '58dcfa69-2723-4411-b7db-99d5d8be1a0d',
  'x-ms-request-id',
  '4bf2cd12-cd68-4dc1-99a9-56435ef6d746',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cf80202a-bcbd-4389-8ee3-249a816ff826',
  'x-ms-request-id',
  '7594a251-ebbd-4aa1-9267-909406b6f29d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ee10d16f-9a5c-4b7e-94bd-a188a9fcc675',
  'x-ms-request-id',
  'fa4370b5-8b33-4efd-931a-626e45b1651d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","deletedDate":1619648796,"scheduledPurgeDate":1627424796,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/7a3c1e89ca154d3197789a1dc3d3f0d3","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/7a3c1e89ca154d3197789a1dc3d3f0d3","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/7a3c1e89ca154d3197789a1dc3d3f0d3","x5t":"RNTgnukkgxjTQZL7IWe8RqMitms","cer":"MIIDKDCCAhCgAwIBAgIQESlBEJFbTmilxwKgSBD2rjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIxNTQ4WhcNMjIwNDI4MjIyNTQ4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCYXw2COMOxhv3+NuQgnljfcw6RAOAPi1SjTcKiqlxokfPMWQBcR4eeql1CNLDA1dORZVosAacYylNys/F3aws+k3x4ZH7ajyYxPvq6M5U1DMQ5IaVkDjcz05EBjPxn6ZUb5NbJnJPnZAEiEKqQyqN4TPm+uC4iGz7imswLgfEij/U8epXSSWy2ZY0oEZAzgWpSWUo4oeS2kH0/XJsWnuNMsok8J/lST3ILnsgMZ0QUNaA0Z3/Ohqm5rxE1wvgJ2QAWGDiN/Zhe/ZP/PSXLYyiisysVLSQ2ee+VN8S81EIKddK4xK7khPb6vVxfXGTk3nJvndWOysEofTAAwvrnieKhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQZ0guDUJrT4P/VMWcgiQBBZ17mgzAdBgNVHQ4EFgQUGdILg1Ca0+D/1TFnIIkAQWde5oMwDQYJKoZIhvcNAQELBQADggEBADiO9jt6wYjXTl0MwmvBFCaLhSxacn353vB4oYPWJLqedAOcw5xgac082ZhylRkT9k3J+HjGnIoKDhq8r8CJE03RQ+xtOoRyiJlVPbzMLDUuzzms+dEh3a6OLpYlqUZqQA1YjCsflc98n4gduat93Hr4nbD6amTarKnI+pAdiYj8NxLnCa3WA4qztWHp5tC/qy3T/mfNQiVUulUFm/fjNvEdnSAXz5Yok1MJnR/i8a/6Zg9RUc5eM/1CEeszYzFZm2l+m+eRBULsrmrGh39fnCMYBQaADz5oklskcrkVicC7eG9OC3ApvJRxdBSpMxXfA/lLA3TK6vaCVR7yCbzhazI=","attributes":{"enabled":true,"nbf":1619648148,"exp":1651184748,"created":1619648748,"updated":1619648748,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619648673,"updated":1619648673}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '77092be3-59e9-48d8-943b-9ac1df25e4fe',
  'x-ms-request-id',
  'dd630e71-a765-4174-8908-bf7d85f6ed12',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:09 GMT',
  'Content-Length',
  '2964'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ac2ff01c-1c2c-4e76-83fe-c7dde0f03cf1',
  'x-ms-request-id',
  '068bd0aa-cbab-402a-8ea4-e7c07b1aae7c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:09 GMT'
]);
