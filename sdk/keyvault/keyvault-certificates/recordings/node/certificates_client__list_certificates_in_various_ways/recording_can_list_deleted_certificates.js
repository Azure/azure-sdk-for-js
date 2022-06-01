let nock = require('nock');

module.exports.hash = "f593cc9980d2d8c1c72b7cadc70ecee7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificates-0/create')
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
  '880cec14-f836-4e60-b73e-0ba631acf5a0',
  'x-ms-request-id',
  '5e98b6f5-d223-478f-97e6-9d7008e2f200',
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
  'Wed, 28 Apr 2021 20:43:36 GMT'
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
  '53021c7e-e5fc-4912-ab40-77349ebe4f01',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAADC_G9gOAAAA; expires=Fri, 28-May-2021 20:43:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhFBFTfKp_kHWtpXEClILYKwst0s1Y_1xn99vsWA56caTc7ifkffNzMso5xB4_JrKgvc8epKFfa0pMi_5QhHNJygeBGXMCpUbKhy5SYyX3i0spzOMO_1V7ZWJaeHkl6kBW1AF3lnjiH21q2jpU2iRvFWmictoR_1S0a_iFGsXDhogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:43:36 GMT',
  'Content-Length',
  '980'
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
  'c6a948b1-fbd9-4ffc-8240-f283f3eb0500',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAADC_G9gOAAAA; expires=Fri, 28-May-2021 20:43:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrqsT352T4GMr45up6z9VvERvldtR0XpAx_xkCU86lqVtyCLr3j4QZHHA__VHRH33ScPT73Pt2M6bZyYTKpfbbSHVSoSi2eTEqJP6ncykBWeEQ4D1im7JcLZ3h0EhtneU9lS4jVG4j7ae94oM7zSlm5Q9dNXdrNiLcL_S4DJpDGFggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:43:36 GMT',
  'Content-Length',
  '1651'
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
  '66eb627d-31f2-4c37-b661-d1ed37a42f00',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAADC_G9gOAAAA; expires=Fri, 28-May-2021 20:43:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:43:36 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificates-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending?api-version=7.2&request_id=edaa41c5175e4480a5198c147c55c953',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '880cec14-f836-4e60-b73e-0ba631acf5a0',
  'x-ms-request-id',
  'e5908c8d-3884-430a-ab0a-c66a43bfd185',
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
  'Wed, 28 Apr 2021 20:43:37 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  'e675277f-a1d1-4e4f-a810-90193d65a54b',
  'x-ms-request-id',
  'd07958b1-50c7-488b-a3cf-9085cd16199d',
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
  'Wed, 28 Apr 2021 20:43:37 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  'ec9810e5-1eb6-4b86-b3a2-a1258603267e',
  'x-ms-request-id',
  '71ae1aa0-0b10-4207-95ba-aa00ab2be282',
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
  'Wed, 28 Apr 2021 20:43:37 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  'e3ee987a-2743-424b-9d5f-b31b936ba341',
  'x-ms-request-id',
  '5a7fce81-222b-4fd5-b7a0-32de58adf434',
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
  'Wed, 28 Apr 2021 20:43:39 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  '0c42044e-6d12-4c2b-a8d0-7cd63380923e',
  'x-ms-request-id',
  '3b5b033f-a843-462c-a545-a0c6e9d54617',
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
  'Wed, 28 Apr 2021 20:43:41 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  '8cb8ba95-3bb2-4436-a36a-272ccfb33df2',
  'x-ms-request-id',
  'e3a1930c-817d-49cd-b4d4-a3f80f948e9f',
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
  'Wed, 28 Apr 2021 20:43:44 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  '1d385594-c01b-49fc-90f2-297791f20984',
  'x-ms-request-id',
  'ce1a3800-bab5-4614-a503-2d7f3b7e7ca8',
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
  'Wed, 28 Apr 2021 20:43:46 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  '994a3244-d42b-48d0-935c-ed9e9cb3361f',
  'x-ms-request-id',
  '474a495c-9698-4f24-8179-df283d40812a',
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
  'Wed, 28 Apr 2021 20:43:47 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  '221e9a98-862e-4943-ba42-ccd8485f7c30',
  'x-ms-request-id',
  '6e2e731b-4a94-4e9c-b27a-922db3da0a5c',
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
  'Wed, 28 Apr 2021 20:43:49 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  'c78b18f9-919d-4686-a316-a59d1628b080',
  'x-ms-request-id',
  'e1e32352-bdaa-4a98-bffc-3ab853266ec3',
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
  'Wed, 28 Apr 2021 20:43:51 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  '1b6e301c-fbf7-4b56-8941-7d69fbe58cbe',
  'x-ms-request-id',
  'e91430b1-c174-4a11-94f7-82c7dca965c4',
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
  'Wed, 28 Apr 2021 20:43:53 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  '2c4f80f5-2936-4c5d-b0c9-8650c378ad11',
  'x-ms-request-id',
  '3a3db0c9-1e3f-4898-b37a-271507006571',
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
  'Wed, 28 Apr 2021 20:43:56 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  '0597c3ea-6186-49b6-bcc5-d88dfb5ae6c5',
  'x-ms-request-id',
  '8586dc65-eab0-4e59-a91c-a5e0443783bf',
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
  'Wed, 28 Apr 2021 20:43:58 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  '0ebdd6c6-c66d-47b1-90f1-a0a20c27df4e',
  'x-ms-request-id',
  'a7397ba2-cf37-492f-b078-348b9da311fb',
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
  'Wed, 28 Apr 2021 20:44:00 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  '13e90e7b-ba08-4019-b010-5c512b22d380',
  'x-ms-request-id',
  'ef7e2ff6-3606-4627-b50a-7ee7ec8e6433',
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
  'Wed, 28 Apr 2021 20:44:02 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  'e12c0efc-b1f6-4eb3-93eb-c128435bc2e3',
  'x-ms-request-id',
  'c24ae97b-b2c3-4d6c-bf5c-befaa3089b77',
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
  'Wed, 28 Apr 2021 20:44:05 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  '17467593-b87b-42a3-aca7-b5155b09076d',
  'x-ms-request-id',
  'b77d2fb6-c093-46ab-989e-5b9e7e7be7af',
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
  'Wed, 28 Apr 2021 20:44:07 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  'c48807c4-fdfc-4e57-bf93-9fcf100fd379',
  'x-ms-request-id',
  '017785b8-8118-4764-a5be-b0827c710e94',
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
  'Wed, 28 Apr 2021 20:44:09 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  '31680f4d-f9fd-4c7e-8e19-6fca87c589f4',
  'x-ms-request-id',
  'b3379504-c4f8-4055-8b83-f72760002ae5',
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
  'Wed, 28 Apr 2021 20:44:11 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  'a49fb1c5-e29e-42b4-85d2-32807e00305a',
  'x-ms-request-id',
  'a8a4c415-9c56-4029-8876-13bea38f4117',
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
  'Wed, 28 Apr 2021 20:44:12 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6H7zklZKHpIn6pdGnk54YC+1S9QAIXH29WvHe+1JmcY9QxodAh0em0Y4puGHD7cL8oLfnzURMmH0qEh1uUg1LqwH+bQEyposHgf0aCmLZ946qZ5VSUHv3Ej8LLTdt3gIl5ccTerWjhtmZCr5x85VLA67DlioUD8y1QCvUyTUJpDJH7He8R39bHFzIpoWMMb1PIS7tdcWSuh0/NoVqrLltHTe9fZ3CEGJa4cA74gTueDgN6papG+Dxga04SHYcC7T07Qr8xqDogMwhZa+6KfYUGabKLZsyxpBZhGIyhOjSEgRDP7aYbXQismniD/AR8XRjGMwcPDo4JJfafBfOcln0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH4SWSmUQ8uZByIT1RW/JZ+9HanXnnJd43Xbv2LoJl3Kk4kUDID9sbyLCoLPEswAR4f2aXIC37voqBPT6tiYjv+4HD0RZKivWGPVlC6Vpkw/VWhin4SqLqb5lYuaj1Hv4XLXbGXi62UuMt8wMMO4f3AxD2utJFAzbWHwYoJ0/jw/clNA0yfVzUDBf/AGz6JsY9NJJkBNDG/wwFh4w+w6skTKyF4+UU+VphLq6IvU9jNFXHlKqo1BpUDrWm5ooHCvCbQMvryjcXAIFyZeDu/tFBHi4pInohkJj2ajG/QjpA7OUa+KxOeeX30mk8K+5DMvx7EKwAV4xiabIioHv4h7mYc=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0","request_id":"edaa41c5175e4480a5198c147c55c953"}, [
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
  'd25114f4-da98-453a-855a-484e86a11212',
  'x-ms-request-id',
  'a7477a62-1093-497d-b0f8-40c6d755ca7d',
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
  'Wed, 28 Apr 2021 20:44:14 GMT',
  'Content-Length',
  '1309'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/6abf36bbd04d4148b8ce19a292611179","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-0/6abf36bbd04d4148b8ce19a292611179","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-0/6abf36bbd04d4148b8ce19a292611179","x5t":"e5m7p6mD6XpwVnRSyLUEr3Dss3Q","cer":"MIIDKDCCAhCgAwIBAgIQTHRYH5Z2SO2ePiGWYil6RDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAzNDEzWhcNMjIwNDI4MjA0NDEzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDofvOSVkoekifql0aeTnhgL7VL1AAhcfb1a8d77UmZxj1DGh0CHR6bRjim4YcPtwvygt+fNREyYfSoSHW5SDUurAf5tATKmiweB/RoKYtn3jqpnlVJQe/cSPwstN23eAiXlxxN6taOG2ZkKvnHzlUsDrsOWKhQPzLVAK9TJNQmkMkfsd7xHf1scXMimhYwxvU8hLu11xZK6HT82hWqsuW0dN719ncIQYlrhwDviBO54OA3qlqkb4PGBrThIdhwLtPTtCvzGoOiAzCFlr7op9hQZpsotmzLGkFmEYjKE6NISBEM/tphtdCKyaeIP8BHxdGMYzBw8Ojgkl9p8F85yWfRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTt6PzQcggpEiHARfdv9vLyVQbBpDAdBgNVHQ4EFgQU7ej80HIIKRIhwEX3b/by8lUGwaQwDQYJKoZIhvcNAQELBQADggEBAGOypXSs8+c0S0+QBqjPRHrDp6MdPYHsW+BiYxJsR5PK7yvEEABvwgKlEdIp7TVhxvwrJFONgosOJlyWhGmlL1I4fMVMu2+OTUqkGpDRVlhA/CeEKf4tIgniVfXlfxNj5niiGsp+4T49lPS2O6mJXGDcO5Y6R/yVIcrG8+o9QCMA8NqUAEPwRJH3CkFBoyrQ/KqIhiMh43fnGdVP3NoZbQZFsnrAwSXIrsDX9qEJQyJTj2AK9catNMjrrWX07XEoVomfZBi0AGRerKaJ7ldDyaF/ifAA43nZ6BZd5ZkzxIFOSiyCPCZmsUl7cJdBEKRihgVotndue/DnRbS8ojz57VI=","attributes":{"enabled":true,"nbf":1619642053,"exp":1651178653,"created":1619642654,"updated":1619642654,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619642617,"updated":1619642617}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending"}}, [
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
  '41b341d7-25d5-4cc7-bab7-72491af2be32',
  'x-ms-request-id',
  '8444f00b-3d17-4897-a005-147ba72713e1',
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
  'Wed, 28 Apr 2021 20:44:14 GMT',
  'Content-Length',
  '2595'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificates-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending?api-version=7.2&request_id=10cb9804610848628da0a32b39205811',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a833edd9-af27-41f7-98e8-efc56f9e5d14',
  'x-ms-request-id',
  '80d1c33c-eaec-4e60-aaf9-7df3d8e7281b',
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
  'Wed, 28 Apr 2021 20:44:15 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'ba9c3567-92ea-4218-bae7-1f34e043f861',
  'x-ms-request-id',
  '00baa123-5798-48ad-9cc9-f1839b387fcc',
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
  'Wed, 28 Apr 2021 20:44:15 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'ef683d15-604c-46d1-97ef-1bf066ea94d2',
  'x-ms-request-id',
  '724853df-acb8-47e9-bf6f-52c893cf56ad',
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
  'Wed, 28 Apr 2021 20:44:15 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'd6526a05-d9a6-4784-82a9-1f6cb4dee08a',
  'x-ms-request-id',
  'd661e850-97a2-4605-862f-2d7314519848',
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
  'Wed, 28 Apr 2021 20:44:18 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'dd4508a4-98a8-4c74-a0f0-bd935327c2c8',
  'x-ms-request-id',
  '23a7c52d-1f44-4766-90b5-7831c92ff4af',
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
  'Wed, 28 Apr 2021 20:44:20 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '5217bb99-f25f-4f6f-bf3e-4192dac5bd47',
  'x-ms-request-id',
  'd44421e5-20df-4beb-9dbd-f0c6fdf1bd3b',
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
  'Wed, 28 Apr 2021 20:44:22 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '128683ed-58ff-459c-ad37-bea8c2269021',
  'x-ms-request-id',
  '44d827d8-302a-4bd4-a455-6fd4c163ae3b',
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
  'Wed, 28 Apr 2021 20:44:24 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '59ed0f9c-58c8-457b-b0b6-da5ce56341bc',
  'x-ms-request-id',
  'c5569bfc-8add-447a-b468-2ede799b9a25',
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
  'Wed, 28 Apr 2021 20:44:26 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '04d4390c-d1d9-4b4e-beda-80ae0a1ffbb9',
  'x-ms-request-id',
  '1c4c8211-a2a8-4630-9a63-84b2673cc73b',
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
  'Wed, 28 Apr 2021 20:44:29 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '3c168227-aace-4cb3-9761-521feda03e13',
  'x-ms-request-id',
  '8090011c-47bb-4846-82f5-7795f9d0230b',
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
  'Wed, 28 Apr 2021 20:44:31 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'd75a858f-edc2-4497-9e5d-9273b7f4f24d',
  'x-ms-request-id',
  '22d4f38f-20ff-4a93-a520-0526cec7c53c',
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
  'Wed, 28 Apr 2021 20:44:33 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'bd17b900-7407-457f-b35f-c78aeb8e17c8',
  'x-ms-request-id',
  '529b4c83-f7c5-4336-a920-7ece64864e70',
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
  'Wed, 28 Apr 2021 20:44:35 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '7e9b1b00-ba7d-4b55-8cd0-5aca7288181a',
  'x-ms-request-id',
  '79982a3e-09ca-4c80-b308-b0404ad80ab7',
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
  'Wed, 28 Apr 2021 20:44:37 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '66b238a7-1f00-41a6-8d6a-851c0941d856',
  'x-ms-request-id',
  'f3bc8617-2455-44e8-8f6b-3d6983206036',
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
  'Wed, 28 Apr 2021 20:44:39 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '23822623-5956-4939-a20d-8de239c7a2d5',
  'x-ms-request-id',
  '4e5666a2-97cc-42f9-af43-445999ad5c17',
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
  'Wed, 28 Apr 2021 20:44:41 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'a9c5b47d-2f54-41ad-a667-dfa337965813',
  'x-ms-request-id',
  'd6989bf8-2851-41e5-aedc-43e58184a909',
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
  'Wed, 28 Apr 2021 20:44:43 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'db70e829-6989-4b34-a994-98be8ca03a1c',
  'x-ms-request-id',
  'd109b58a-3612-4b7c-a4b3-8ed677b4f608',
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
  'Wed, 28 Apr 2021 20:44:46 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '937788a6-0624-4500-aa35-76ab9d651839',
  'x-ms-request-id',
  '79ae2191-5186-48c6-bdab-9b33a6924114',
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
  'Wed, 28 Apr 2021 20:44:48 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'e063667f-1b8e-452c-b94a-38a421ab314f',
  'x-ms-request-id',
  '07ddd871-d59f-4410-85f4-ff30d2744c74',
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
  'Wed, 28 Apr 2021 20:44:50 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '52fd0443-9213-4a0c-b1b9-c85ed0eb4f4c',
  'x-ms-request-id',
  '197610a9-3c6c-45fb-ae3f-7f7aae378b67',
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
  'Wed, 28 Apr 2021 20:44:52 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'd207a19b-ace7-48b4-8aa1-5006931dd6e2',
  'x-ms-request-id',
  '31ffedf1-9c35-407f-9b8f-90efefdc79c2',
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
  'Wed, 28 Apr 2021 20:44:54 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '3d4438e7-efee-4da9-a4fd-9fbe04c71df5',
  'x-ms-request-id',
  '5155e896-8c4c-4802-8854-36b639947156',
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
  'Wed, 28 Apr 2021 20:44:56 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '2e2b3a0f-511d-4ca7-bdf9-8ab595c9bbca',
  'x-ms-request-id',
  '3c6d2eb4-7b12-465d-b59b-dd4bb87d23c8',
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
  'Wed, 28 Apr 2021 20:44:58 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '4635f726-cddb-475e-a879-84a77ac50e5e',
  'x-ms-request-id',
  '8e80b27c-7a68-4bbd-a047-274765041c0b',
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
  'Wed, 28 Apr 2021 20:45:00 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'edb787c3-bd73-441e-b897-2d8e56174b80',
  'x-ms-request-id',
  '061c6f51-d0e4-47cf-b8ae-fc58e99922f7',
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
  'Wed, 28 Apr 2021 20:45:02 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '1d4e2674-f2cd-475a-a6e5-e32fd36b6165',
  'x-ms-request-id',
  '0cf8e3f3-ce71-4b3d-b99e-215d7ad77da5',
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
  'Wed, 28 Apr 2021 20:45:04 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '41a268c1-49fa-4bc7-ae0e-28ddfd63256f',
  'x-ms-request-id',
  '46200f34-cead-4f7e-9bd2-90af51aec410',
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
  'Wed, 28 Apr 2021 20:45:06 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '3520b66a-ae2f-4754-ade9-2c5264218052',
  'x-ms-request-id',
  'bcf65d4e-eb18-4217-aed5-7a9092f8ba48',
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
  'Wed, 28 Apr 2021 20:45:08 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'f0f21b31-ea3c-4323-b6c0-bd2e610371ed',
  'x-ms-request-id',
  '9ba04f65-bcd2-42fe-a747-d86506d626d7',
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
  'Wed, 28 Apr 2021 20:45:11 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '5e5b5d42-880b-492a-8b42-9d96404df58b',
  'x-ms-request-id',
  '94fa86bf-478a-4aed-b089-c1db83dec948',
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
  'Wed, 28 Apr 2021 20:45:13 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '48b20a48-708a-4225-baaa-6873bb4ea92f',
  'x-ms-request-id',
  'efd73ee0-ba38-4308-96e5-9c523a972cb6',
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
  'Wed, 28 Apr 2021 20:45:15 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'ccb0cb47-cc03-4cca-a42b-8f9d489b7e81',
  'x-ms-request-id',
  '349a0523-6c6b-4a80-8396-084d2bc34a1b',
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
  'Wed, 28 Apr 2021 20:45:17 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '893cb857-a76c-41d9-baef-b944424abfe4',
  'x-ms-request-id',
  'a040dcdb-2319-4426-8345-94fa0c5075a4',
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
  'Wed, 28 Apr 2021 20:45:19 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'ebbbd7be-e4da-4af2-9ff2-d03da2ef928d',
  'x-ms-request-id',
  '565eebaa-aa83-4f1e-80ce-cbf34db6f96d',
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
  'Wed, 28 Apr 2021 20:45:21 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'abaa8c4b-9301-4e05-87b8-265ed61813c6',
  'x-ms-request-id',
  'e7ed269e-a456-4210-aefa-7df2ac62205d',
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
  'Wed, 28 Apr 2021 20:45:23 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '9c70cf6f-06fc-4eb1-8b48-50cff94f7913',
  'x-ms-request-id',
  '012bdc30-dbed-428a-ad0a-ea42216c6d00',
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
  'Wed, 28 Apr 2021 20:45:25 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '0f9a98ad-0a8c-4578-8eee-10b4d04aaceb',
  'x-ms-request-id',
  'c15042b0-0bcf-424a-a8d3-a6cb7a0ca6e2',
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
  'Wed, 28 Apr 2021 20:45:28 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '82963624-07e4-4860-b48b-0227a1d47cca',
  'x-ms-request-id',
  '0c77dade-a8e7-4a52-a59f-69ece9dbc0e8',
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
  'Wed, 28 Apr 2021 20:45:30 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '47ec2122-63c3-40f6-99cb-187b1b5c8e25',
  'x-ms-request-id',
  '332361cd-2dc5-45d0-8919-8139bd975368',
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
  'Wed, 28 Apr 2021 20:45:32 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '1ce55fda-f927-423c-8792-9ee631ddfc51',
  'x-ms-request-id',
  '0e6a7325-19fc-4fe2-b83f-f69d170bde9e',
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
  'Wed, 28 Apr 2021 20:45:34 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '8fe0c9a9-e4c1-4da7-96e1-6c7a12224d50',
  'x-ms-request-id',
  '39569870-251c-4ecb-89cd-c890e8b87f87',
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
  'Wed, 28 Apr 2021 20:45:36 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '52533917-f6d0-45f9-ae45-a06ecfbda4ca',
  'x-ms-request-id',
  'a58261b8-0892-49d7-a0e2-4172a4217163',
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
  'Wed, 28 Apr 2021 20:45:38 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'd29cbea8-ec71-42ed-87d0-2388f4735ce4',
  'x-ms-request-id',
  '3295385c-51bc-40b0-871f-019b65f2d0e1',
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
  'Wed, 28 Apr 2021 20:45:40 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '255d4eda-c9a2-4ea5-abbe-58c77faec3c5',
  'x-ms-request-id',
  'eda586ff-abdc-419c-87dc-68bfb3561989',
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
  'Wed, 28 Apr 2021 20:45:43 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '49fd1eb6-c723-457d-9cfa-21786246a284',
  'x-ms-request-id',
  'd5d6cc2e-301d-46ca-8ef1-6b904fb41b2e',
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
  'Wed, 28 Apr 2021 20:45:45 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '01fa4694-6584-4016-a0f6-52ac52b0ff61',
  'x-ms-request-id',
  '8f5290be-cbe4-4d72-9fc2-a973be30bcd6',
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
  'Wed, 28 Apr 2021 20:45:47 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  'e16f7f5a-6fff-4094-82e1-ea8887557c4a',
  'x-ms-request-id',
  '76a9107f-1368-4011-add4-d90345eb3da3',
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
  'Wed, 28 Apr 2021 20:45:49 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Amn919qZFluVYRED0VGLDoyCE0RTyjKT+hIL58E2Gt1Z9yhJkHv9k7JCOhyGXM6ulHYFj7d5v8Dgs3Q+GBaDwr0QKySWjDbBEETVvTA6j2Euu4iJX+gIAxnVadTV7UfHChtv6aItcjz7FQlRR/uEUFccTre8jkK75w8krdptoAsuyKnmGmqNp7GwrxQwRJP4//uBCY3ygS8Yy7qC/INxRMUdAEXF05wqMlJInXx+bdJZhkO5KhazzAflcR1dqsdMnxQHvA1ZtdLOeo1Q3cCtSqjgGsg8bq1zXtVBmnA0YulPmgXVoc4Y98cAf2GoreIGL1B5CepQ4Vz3uh/bGXHLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKTt4N25F0swarG0L6+jLdp9s6i0jHIKdgj81BoLBkqmSLDaa5i4yOyU3BtPSiCdRH0j0ymdz6QZLddrZgUu/Ubas4tj8k4Iqnyd/68v/xTiRudFskn4xrRppol012zi85v2gWE1YeyTPcFC63tBI0U+hk+bFGl3ZH2P5JtD4Dzj9+dcVXJCfVi1rzc85UNgYjLhOL60vqEytRk3Bfq2+87d+EUE6nrwWtshBKGLruZQFMjLnc0eLh+s+sxEyt+U94g8aIyvVTekt5nP5yxuYkqt6ASYLbFi2HcJ9kbaO9SoTcPGsxWYHqkhv9pr1mEOw41xotHyCs08o4DDNMNG+D4=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1","request_id":"10cb9804610848628da0a32b39205811"}, [
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
  '64d72b72-b7d5-416c-8381-ee0d4ea4619c',
  'x-ms-request-id',
  '27e47695-33c5-46be-94e3-9ee3883ae517',
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
  'Wed, 28 Apr 2021 20:45:51 GMT',
  'Content-Length',
  '1309'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/8b315069bec84e9189fb77bdca10c2a4","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-1/8b315069bec84e9189fb77bdca10c2a4","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-1/8b315069bec84e9189fb77bdca10c2a4","x5t":"_dS-_wEPhT6eje6jWV1166-7mHs","cer":"MIIDKDCCAhCgAwIBAgIQPEjSQ8JFQYy6+ALQlC0IizANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAzNTUwWhcNMjIwNDI4MjA0NTUwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDUCaf3X2pkWW5VhEQPRUYsOjIITRFPKMpP6EgvnwTYa3Vn3KEmQe/2TskI6HIZczq6UdgWPt3m/wOCzdD4YFoPCvRArJJaMNsEQRNW9MDqPYS67iIlf6AgDGdVp1NXtR8cKG2/poi1yPPsVCVFH+4RQVxxOt7yOQrvnDySt2m2gCy7IqeYaao2nsbCvFDBEk/j/+4EJjfKBLxjLuoL8g3FExR0ARcXTnCoyUkidfH5t0lmGQ7kqFrPMB+VxHV2qx0yfFAe8DVm10s56jVDdwK1KqOAayDxurXNe1UGacDRi6U+aBdWhzhj3xwB/Yait4gYvUHkJ6lDhXPe6H9sZcctAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTaHpFlUQZ6oB63uV57aLW6/beQQjAdBgNVHQ4EFgQU2h6RZVEGeqAet7lee2i1uv23kEIwDQYJKoZIhvcNAQELBQADggEBADejtl+8izNKuVN2bcaF20JxkHSbLL4gp08mfBcahxVTm4WTHK+OcnRZRYac2+T4jJSZzsczKI903oHTVEif+o5dHp1Wrz6zHfcKLivx5tsutkx1yx93rAbxscccCH+sF7SujXJhStfgeyRIyx0n2MYS0eqO3f3+TA9rg53wAmxpouRAn1xILhFcfe+IPZ0QjnxTCRoaAQ/T6MoF3J1OtKv8NcuHemOVgaEB4UxgqwdEy7gIBfBm0/PFVR8rs1s0GhhUeX8olZlX9cqFOiaBpDU6OwAaWpfuP191lXjpQ6jRF4KId6sdGRmTAXP/6PQf8jfMXRTIz01LqSyjUG8Sg8U=","attributes":{"enabled":true,"nbf":1619642150,"exp":1651178750,"created":1619642750,"updated":1619642750,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619642656,"updated":1619642656}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending"}}, [
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
  '57777f85-cb8b-4b18-8b82-06a7baef0a9e',
  'x-ms-request-id',
  '142183e0-2938-49b0-9813-34c43ee19203',
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
  'Wed, 28 Apr 2021 20:45:51 GMT',
  'Content-Length',
  '2595'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-0","deletedDate":1619642751,"scheduledPurgeDate":1627418751,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/6abf36bbd04d4148b8ce19a292611179","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-0/6abf36bbd04d4148b8ce19a292611179","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-0/6abf36bbd04d4148b8ce19a292611179","x5t":"e5m7p6mD6XpwVnRSyLUEr3Dss3Q","cer":"MIIDKDCCAhCgAwIBAgIQTHRYH5Z2SO2ePiGWYil6RDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAzNDEzWhcNMjIwNDI4MjA0NDEzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDofvOSVkoekifql0aeTnhgL7VL1AAhcfb1a8d77UmZxj1DGh0CHR6bRjim4YcPtwvygt+fNREyYfSoSHW5SDUurAf5tATKmiweB/RoKYtn3jqpnlVJQe/cSPwstN23eAiXlxxN6taOG2ZkKvnHzlUsDrsOWKhQPzLVAK9TJNQmkMkfsd7xHf1scXMimhYwxvU8hLu11xZK6HT82hWqsuW0dN719ncIQYlrhwDviBO54OA3qlqkb4PGBrThIdhwLtPTtCvzGoOiAzCFlr7op9hQZpsotmzLGkFmEYjKE6NISBEM/tphtdCKyaeIP8BHxdGMYzBw8Ojgkl9p8F85yWfRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTt6PzQcggpEiHARfdv9vLyVQbBpDAdBgNVHQ4EFgQU7ej80HIIKRIhwEX3b/by8lUGwaQwDQYJKoZIhvcNAQELBQADggEBAGOypXSs8+c0S0+QBqjPRHrDp6MdPYHsW+BiYxJsR5PK7yvEEABvwgKlEdIp7TVhxvwrJFONgosOJlyWhGmlL1I4fMVMu2+OTUqkGpDRVlhA/CeEKf4tIgniVfXlfxNj5niiGsp+4T49lPS2O6mJXGDcO5Y6R/yVIcrG8+o9QCMA8NqUAEPwRJH3CkFBoyrQ/KqIhiMh43fnGdVP3NoZbQZFsnrAwSXIrsDX9qEJQyJTj2AK9catNMjrrWX07XEoVomfZBi0AGRerKaJ7ldDyaF/ifAA43nZ6BZd5ZkzxIFOSiyCPCZmsUl7cJdBEKRihgVotndue/DnRbS8ojz57VI=","attributes":{"enabled":true,"nbf":1619642053,"exp":1651178653,"created":1619642654,"updated":1619642654,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619642617,"updated":1619642617}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending"}}, [
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
  '6ae49dd4-83aa-453f-abfa-37cf681ee4b6',
  'x-ms-request-id',
  'af9ba026-1df1-4d4e-bebf-cdd1b7752879',
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
  'Wed, 28 Apr 2021 20:45:51 GMT',
  'Content-Length',
  '2796'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '73cd4ffd-2841-4953-a048-e39006297015',
  'x-ms-request-id',
  'efa5fbfa-5181-4887-a22e-c7d7d856de40',
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
  'Wed, 28 Apr 2021 20:45:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0a51db69-58bd-4145-bfe1-eedd88b2e863',
  'x-ms-request-id',
  'f0971b11-fe98-44b2-8576-e2928317824a',
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
  'Wed, 28 Apr 2021 20:45:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd62d3744-cdd3-4f3d-abc5-808d90f96071',
  'x-ms-request-id',
  'fca6535f-6aae-4470-b3b5-821674b8f7be',
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
  'Wed, 28 Apr 2021 20:45:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e0143b72-b5c6-41e8-8ddf-70741a34ab2b',
  'x-ms-request-id',
  'aac60c28-03a3-47b8-b615-8b8e2cae379d',
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
  'Wed, 28 Apr 2021 20:45:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6d0f5442-5f09-4dae-ad3e-602e510c80f5',
  'x-ms-request-id',
  '44cf3ff8-d236-41c5-9494-6fe62fb35e18',
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
  'Wed, 28 Apr 2021 20:45:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9054f8e1-39f7-42bb-896b-d641b3793a30',
  'x-ms-request-id',
  '5a7863e0-5a0f-4ce8-bd17-612af2c12d1a',
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
  'Wed, 28 Apr 2021 20:45:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '172fd6ca-e8ae-41a5-9096-d25979fd8d18',
  'x-ms-request-id',
  'bc527187-655c-465d-a993-598651470967',
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
  'Wed, 28 Apr 2021 20:46:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd08aa87b-f750-49c3-ab74-d7109ede216e',
  'x-ms-request-id',
  '57c497f6-fde4-46dd-9d7d-c3b8c4065edb',
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
  'Wed, 28 Apr 2021 20:46:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd4e61851-08bb-41af-92f2-89c25ddaa09c',
  'x-ms-request-id',
  'a99e8ac8-7d5c-4989-9965-7fce87c81fb4',
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
  'Wed, 28 Apr 2021 20:46:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9ebafc9a-fccd-4b19-bb55-ffb2c425cceb',
  'x-ms-request-id',
  '347323b2-ee98-464c-a416-dec71a07b341',
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
  'Wed, 28 Apr 2021 20:46:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a87580a4-4c28-4205-9d7e-a4834f380edb',
  'x-ms-request-id',
  '190a2cbf-09a0-4c72-95bc-74d43d4013a5',
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
  'Wed, 28 Apr 2021 20:46:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '06612c73-4f7e-4e64-96d6-311dfebad4ce',
  'x-ms-request-id',
  '0e669223-964f-40d4-8f5c-8f25824ac607',
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
  'Wed, 28 Apr 2021 20:46:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd16be116-c63d-418a-b862-047816b81c71',
  'x-ms-request-id',
  'b68baa8b-2e5e-4f83-a0bd-891499d0e44f',
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
  'Wed, 28 Apr 2021 20:46:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '804c9874-f500-408c-87b9-b1383539d96c',
  'x-ms-request-id',
  'aa2e6495-9fb0-406c-a21b-4b8f644e4856',
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
  'Wed, 28 Apr 2021 20:46:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '981b1775-ad1a-476e-8c35-2c3c2a862e61',
  'x-ms-request-id',
  'c82a907b-3868-4dc4-a22b-daa3beefa77b',
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
  'Wed, 28 Apr 2021 20:46:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '40176717-ef3c-4d7a-ba01-072e5c654d57',
  'x-ms-request-id',
  '9d84c695-0c9d-4343-af6b-3889816cb372',
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
  'Wed, 28 Apr 2021 20:46:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0664fa31-d313-472f-a340-e8bd1139ae73',
  'x-ms-request-id',
  'd612624f-ede8-48db-aa80-dbc1ab6e5dfe',
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
  'Wed, 28 Apr 2021 20:46:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b89c79c3-da32-4024-b9b2-663227cce8b7',
  'x-ms-request-id',
  '08aae845-44c2-4e82-8cc1-49166e9566fd',
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
  'Wed, 28 Apr 2021 20:46:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-0","deletedDate":1619642751,"scheduledPurgeDate":1627418751,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/6abf36bbd04d4148b8ce19a292611179","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-0/6abf36bbd04d4148b8ce19a292611179","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-0/6abf36bbd04d4148b8ce19a292611179","x5t":"e5m7p6mD6XpwVnRSyLUEr3Dss3Q","cer":"MIIDKDCCAhCgAwIBAgIQTHRYH5Z2SO2ePiGWYil6RDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAzNDEzWhcNMjIwNDI4MjA0NDEzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDofvOSVkoekifql0aeTnhgL7VL1AAhcfb1a8d77UmZxj1DGh0CHR6bRjim4YcPtwvygt+fNREyYfSoSHW5SDUurAf5tATKmiweB/RoKYtn3jqpnlVJQe/cSPwstN23eAiXlxxN6taOG2ZkKvnHzlUsDrsOWKhQPzLVAK9TJNQmkMkfsd7xHf1scXMimhYwxvU8hLu11xZK6HT82hWqsuW0dN719ncIQYlrhwDviBO54OA3qlqkb4PGBrThIdhwLtPTtCvzGoOiAzCFlr7op9hQZpsotmzLGkFmEYjKE6NISBEM/tphtdCKyaeIP8BHxdGMYzBw8Ojgkl9p8F85yWfRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTt6PzQcggpEiHARfdv9vLyVQbBpDAdBgNVHQ4EFgQU7ej80HIIKRIhwEX3b/by8lUGwaQwDQYJKoZIhvcNAQELBQADggEBAGOypXSs8+c0S0+QBqjPRHrDp6MdPYHsW+BiYxJsR5PK7yvEEABvwgKlEdIp7TVhxvwrJFONgosOJlyWhGmlL1I4fMVMu2+OTUqkGpDRVlhA/CeEKf4tIgniVfXlfxNj5niiGsp+4T49lPS2O6mJXGDcO5Y6R/yVIcrG8+o9QCMA8NqUAEPwRJH3CkFBoyrQ/KqIhiMh43fnGdVP3NoZbQZFsnrAwSXIrsDX9qEJQyJTj2AK9catNMjrrWX07XEoVomfZBi0AGRerKaJ7ldDyaF/ifAA43nZ6BZd5ZkzxIFOSiyCPCZmsUl7cJdBEKRihgVotndue/DnRbS8ojz57VI=","attributes":{"enabled":true,"nbf":1619642053,"exp":1651178653,"created":1619642654,"updated":1619642654,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619642617,"updated":1619642617}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending"}}, [
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
  '62704f5a-b2bb-4b9d-8027-76c668ea1add',
  'x-ms-request-id',
  'a2e9aad7-8d42-45ce-8773-10215fd792d5',
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
  'Wed, 28 Apr 2021 20:46:26 GMT',
  'Content-Length',
  '2796'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-1","deletedDate":1619642787,"scheduledPurgeDate":1627418787,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/8b315069bec84e9189fb77bdca10c2a4","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-1/8b315069bec84e9189fb77bdca10c2a4","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-1/8b315069bec84e9189fb77bdca10c2a4","x5t":"_dS-_wEPhT6eje6jWV1166-7mHs","cer":"MIIDKDCCAhCgAwIBAgIQPEjSQ8JFQYy6+ALQlC0IizANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAzNTUwWhcNMjIwNDI4MjA0NTUwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDUCaf3X2pkWW5VhEQPRUYsOjIITRFPKMpP6EgvnwTYa3Vn3KEmQe/2TskI6HIZczq6UdgWPt3m/wOCzdD4YFoPCvRArJJaMNsEQRNW9MDqPYS67iIlf6AgDGdVp1NXtR8cKG2/poi1yPPsVCVFH+4RQVxxOt7yOQrvnDySt2m2gCy7IqeYaao2nsbCvFDBEk/j/+4EJjfKBLxjLuoL8g3FExR0ARcXTnCoyUkidfH5t0lmGQ7kqFrPMB+VxHV2qx0yfFAe8DVm10s56jVDdwK1KqOAayDxurXNe1UGacDRi6U+aBdWhzhj3xwB/Yait4gYvUHkJ6lDhXPe6H9sZcctAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTaHpFlUQZ6oB63uV57aLW6/beQQjAdBgNVHQ4EFgQU2h6RZVEGeqAet7lee2i1uv23kEIwDQYJKoZIhvcNAQELBQADggEBADejtl+8izNKuVN2bcaF20JxkHSbLL4gp08mfBcahxVTm4WTHK+OcnRZRYac2+T4jJSZzsczKI903oHTVEif+o5dHp1Wrz6zHfcKLivx5tsutkx1yx93rAbxscccCH+sF7SujXJhStfgeyRIyx0n2MYS0eqO3f3+TA9rg53wAmxpouRAn1xILhFcfe+IPZ0QjnxTCRoaAQ/T6MoF3J1OtKv8NcuHemOVgaEB4UxgqwdEy7gIBfBm0/PFVR8rs1s0GhhUeX8olZlX9cqFOiaBpDU6OwAaWpfuP191lXjpQ6jRF4KId6sdGRmTAXP/6PQf8jfMXRTIz01LqSyjUG8Sg8U=","attributes":{"enabled":true,"nbf":1619642150,"exp":1651178750,"created":1619642750,"updated":1619642750,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619642656,"updated":1619642656}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending"}}, [
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
  'f16a54e7-2476-4770-83a7-8861e1db1588',
  'x-ms-request-id',
  'e7e89c82-800a-444d-98ef-e4d471842445',
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
  'Wed, 28 Apr 2021 20:46:27 GMT',
  'Content-Length',
  '2796'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '13ab2f2a-088a-4979-8083-671818b2ea35',
  'x-ms-request-id',
  '95b4e81a-4753-429a-8294-7a27b5f40f5c',
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
  'Wed, 28 Apr 2021 20:46:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '37568dc1-3b4f-4f10-99a2-ce0763429238',
  'x-ms-request-id',
  '234f91f4-bfd3-430b-a5e1-ee6a452fcc87',
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
  'Wed, 28 Apr 2021 20:46:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '45fd666f-ae62-432f-8619-11c7964c8e73',
  'x-ms-request-id',
  '067d586a-261d-4ea9-a0f3-5974354fd428',
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
  'Wed, 28 Apr 2021 20:46:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '34ee29a7-86e1-45e5-b8e6-8ec28aa3bf61',
  'x-ms-request-id',
  'd6fc8c78-1dd2-4e77-a46f-7f5308bd0e2e',
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
  'Wed, 28 Apr 2021 20:46:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '886bd237-77b1-4eaa-a694-5d5326c40745',
  'x-ms-request-id',
  '932a333a-2251-4e99-aab5-cc5b8920881a',
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
  'Wed, 28 Apr 2021 20:46:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c3c7f339-0d02-4f21-92df-2009e9a85bcc',
  'x-ms-request-id',
  'ac610b7e-8d0e-4bd0-a896-e1155e41c1d2',
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
  'Wed, 28 Apr 2021 20:46:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3a034cc5-baa0-4700-898c-9d7cbc445323',
  'x-ms-request-id',
  'fd735043-17b1-4ed1-bc68-73776c4158bb',
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
  'Wed, 28 Apr 2021 20:46:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fdeea51c-2106-4f0b-9ff1-5f73a1e70a4f',
  'x-ms-request-id',
  '3ed711f1-4f5e-468c-9c61-42a980870ebc',
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
  'Wed, 28 Apr 2021 20:46:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f7977722-aead-45a2-9830-c769eb22d5c6',
  'x-ms-request-id',
  '8770ac78-7701-44d9-acdc-f57afd9cd02a',
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
  'Wed, 28 Apr 2021 20:46:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b720f7a1-61f4-4336-8b89-a8d35b1cfd88',
  'x-ms-request-id',
  'c52b9b60-0190-49a5-a73c-cc8ea70e5a75',
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
  'Wed, 28 Apr 2021 20:46:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '229d64eb-6550-4d04-90a6-fc81c7aeedf9',
  'x-ms-request-id',
  '208c8984-a4c8-44c9-b66a-45d568026e69',
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
  'Wed, 28 Apr 2021 20:46:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2fea383b-b072-45ea-be47-2a7446a7ec7a',
  'x-ms-request-id',
  '9b1dbde1-f323-4ed5-917e-2a9cf3fbb50b',
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
  'Wed, 28 Apr 2021 20:46:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cbddfffc-2b70-4979-be97-422e98ec71f6',
  'x-ms-request-id',
  '19a4f048-f042-4c22-98f6-17b1c2d5efe5',
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
  'Wed, 28 Apr 2021 20:46:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e8fb776c-cce5-4dcd-bcbf-bdbeb14843bf',
  'x-ms-request-id',
  'f8135e04-c1dd-47de-b755-d7c83dbc3f62',
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
  'Wed, 28 Apr 2021 20:46:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a7b5ef3d-9775-4b20-bede-53fd6999ac14',
  'x-ms-request-id',
  'bd0e1d21-56c0-4f32-a076-01cb3682d588',
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
  'Wed, 28 Apr 2021 20:46:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5ca7d7d0-4307-455f-8bf1-0a7f1bc72c91',
  'x-ms-request-id',
  '7cbb43fd-1dd0-48c3-96b5-7cd6092acbad',
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
  'Wed, 28 Apr 2021 20:46:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3d9bae2e-65c7-4610-a0da-594c7d3f00ec',
  'x-ms-request-id',
  'e3d8650a-b5b3-479e-990c-300fb7268440',
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
  'Wed, 28 Apr 2021 20:46:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a68c0716-1562-4ad2-91ea-05e059193785',
  'x-ms-request-id',
  '4434e01e-94c5-406b-bcb3-fd934d7d6285',
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
  'Wed, 28 Apr 2021 20:47:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd5f3bfbb-c509-4518-86d3-f2d5c00c5bf7',
  'x-ms-request-id',
  'e87d5832-b005-44c2-ac52-470dee53db74',
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
  'Wed, 28 Apr 2021 20:47:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '964975f5-120c-4e51-83f2-6cd9b7e9c55b',
  'x-ms-request-id',
  '01b48671-9865-4362-8e9b-44e1f8bc84d9',
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
  'Wed, 28 Apr 2021 20:47:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c03e9daa-f356-43a9-bce9-e6fa2514111a',
  'x-ms-request-id',
  '27075f9b-e72e-4b65-bc76-1c378fada9c9',
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
  'Wed, 28 Apr 2021 20:47:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e766ac92-b4a6-4437-8a97-746ce978f73e',
  'x-ms-request-id',
  '4a783503-e3dd-4da3-ba32-9c2eac668f47',
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
  'Wed, 28 Apr 2021 20:47:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-1","deletedDate":1619642787,"scheduledPurgeDate":1627418787,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/8b315069bec84e9189fb77bdca10c2a4","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-1/8b315069bec84e9189fb77bdca10c2a4","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-1/8b315069bec84e9189fb77bdca10c2a4","x5t":"_dS-_wEPhT6eje6jWV1166-7mHs","cer":"MIIDKDCCAhCgAwIBAgIQPEjSQ8JFQYy6+ALQlC0IizANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAzNTUwWhcNMjIwNDI4MjA0NTUwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDUCaf3X2pkWW5VhEQPRUYsOjIITRFPKMpP6EgvnwTYa3Vn3KEmQe/2TskI6HIZczq6UdgWPt3m/wOCzdD4YFoPCvRArJJaMNsEQRNW9MDqPYS67iIlf6AgDGdVp1NXtR8cKG2/poi1yPPsVCVFH+4RQVxxOt7yOQrvnDySt2m2gCy7IqeYaao2nsbCvFDBEk/j/+4EJjfKBLxjLuoL8g3FExR0ARcXTnCoyUkidfH5t0lmGQ7kqFrPMB+VxHV2qx0yfFAe8DVm10s56jVDdwK1KqOAayDxurXNe1UGacDRi6U+aBdWhzhj3xwB/Yait4gYvUHkJ6lDhXPe6H9sZcctAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTaHpFlUQZ6oB63uV57aLW6/beQQjAdBgNVHQ4EFgQU2h6RZVEGeqAet7lee2i1uv23kEIwDQYJKoZIhvcNAQELBQADggEBADejtl+8izNKuVN2bcaF20JxkHSbLL4gp08mfBcahxVTm4WTHK+OcnRZRYac2+T4jJSZzsczKI903oHTVEif+o5dHp1Wrz6zHfcKLivx5tsutkx1yx93rAbxscccCH+sF7SujXJhStfgeyRIyx0n2MYS0eqO3f3+TA9rg53wAmxpouRAn1xILhFcfe+IPZ0QjnxTCRoaAQ/T6MoF3J1OtKv8NcuHemOVgaEB4UxgqwdEy7gIBfBm0/PFVR8rs1s0GhhUeX8olZlX9cqFOiaBpDU6OwAaWpfuP191lXjpQ6jRF4KId6sdGRmTAXP/6PQf8jfMXRTIz01LqSyjUG8Sg8U=","attributes":{"enabled":true,"nbf":1619642150,"exp":1651178750,"created":1619642750,"updated":1619642750,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619642656,"updated":1619642656}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending"}}, [
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
  'a5d0492d-8b41-4d1a-88b4-3923fe935f0d',
  'x-ms-request-id',
  '40b4854a-67cd-48c9-a08c-1302a5c56c00',
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
  'Wed, 28 Apr 2021 20:47:11 GMT',
  'Content-Length',
  '2796'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-0","deletedDate":1619642751,"scheduledPurgeDate":1627418751,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0","x5t":"e5m7p6mD6XpwVnRSyLUEr3Dss3Q","attributes":{"enabled":true,"nbf":1619642053,"exp":1651178653,"created":1619642654,"updated":1619642654,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-1","deletedDate":1619642787,"scheduledPurgeDate":1627418787,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1","x5t":"_dS-_wEPhT6eje6jWV1166-7mHs","attributes":{"enabled":true,"nbf":1619642150,"exp":1651178750,"created":1619642750,"updated":1619642750,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":null}, [
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
  '0f9f0dd0-2898-465a-972b-434a7138769a',
  'x-ms-request-id',
  'f68a3893-7f5b-4de7-9625-e115d52b3268',
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
  'Wed, 28 Apr 2021 20:47:11 GMT',
  'Content-Length',
  '1097'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
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
  'dad0d8ac-6558-4b0d-b110-c4cd1462aef3',
  'x-ms-request-id',
  '13088a78-8b76-48eb-8b67-d9ccf4ea1d07',
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
  'Wed, 28 Apr 2021 20:47:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
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
  '9f87a164-7b8b-4b43-aac8-0a522ad5479a',
  'x-ms-request-id',
  'a7bc3116-1c84-42fc-b639-b0d3fe0aec82',
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
  'Wed, 28 Apr 2021 20:47:11 GMT'
]);
