let nock = require('nock');

module.exports.hash = "74ba7776254a2ca9a10c63f3155804bb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/create')
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
  '8078be80-f254-401d-874c-c3198a613061',
  'x-ms-request-id',
  '9a2ccb64-233e-43c5-b2a8-d74a0189122e',
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
  'Wed, 28 Apr 2021 20:26:46 GMT'
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
  '1ff6f29c-e18f-4c93-a187-d3a9d9a2a802',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAwAAAIC6G9gOAAAA; expires=Fri, 28-May-2021 20:26:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLwylMZO_jGsp5usfTEQ-yC0ZSL_kFPPuHMiGK7weUfQK7gf9SmDrpXTscuYEpJiYOLJ-BX_SKlgvlnAr8ViDEtZgxJl4F7-SuBbtR2_DfbVqxt6BLmZuk4lwBhpQeEFXyMO-QwnK8b811k7ojT6rOiYojp4acb5k4VLeQ5CFo80gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:26:46 GMT',
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
  '4e2fcded-9726-451d-a467-654bfe572401',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAwAAAIC6G9gOAAAA; expires=Fri, 28-May-2021 20:26:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrgdxeHnSgBn5UcXOAxSMxW_825k2JAUnZdptxxTHEUuEOgELWgjl8AWcOmFUI-cus3o_1fSyFgrFbE9KXIT-shjzctmhgcPLUM5lAQvlEmBxYXjZ1lOgLen-w_lUSthQXEu4tzbVnYUn7P10VYyhpaqs2OiENAnT77nusgBsxJRkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:26:47 GMT',
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
  '4e2fcded-9726-451d-a467-654b07582401',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAAKy7G9gOAAAA; expires=Fri, 28-May-2021 20:26:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:26:47 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending?api-version=7.2&request_id=16c083b5db5d4bf69c8333ad88167700',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8078be80-f254-401d-874c-c3198a613061',
  'x-ms-request-id',
  '31428c13-c89e-4de0-8ff4-408291042bf8',
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
  'Wed, 28 Apr 2021 20:26:47 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '27a1313a-ca53-4b83-b61e-130d18f87e2a',
  'x-ms-request-id',
  '2ed799f0-8b57-4038-a794-421b7d58707f',
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
  'Wed, 28 Apr 2021 20:26:47 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '801edebb-f8da-40ef-aeba-89ddffd14a01',
  'x-ms-request-id',
  '2da66576-fab9-4578-b89b-499e18103fd6',
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
  'Wed, 28 Apr 2021 20:26:47 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a1343395-5bf7-496f-bd78-1592cf1f58cc',
  'x-ms-request-id',
  'f85a1422-5121-41cf-8ce5-c306cd46824f',
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
  'Wed, 28 Apr 2021 20:26:50 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0e343007-133f-4f60-b4e1-82d12faf006c',
  'x-ms-request-id',
  'db8236de-3cb2-426b-8881-c15dac53c7ae',
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
  'Wed, 28 Apr 2021 20:26:51 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8f9d3b5f-252a-49f5-b99a-54b81f877088',
  'x-ms-request-id',
  '683bce9f-c23c-41af-bccc-6cba6f884e93',
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
  'Wed, 28 Apr 2021 20:26:53 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ee12a70b-6f92-4dec-8040-3bb421d6fbee',
  'x-ms-request-id',
  '74dd6387-8f76-48ae-8170-71f0bf2b4e8c',
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
  'Wed, 28 Apr 2021 20:26:56 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9ceefc96-6efe-4c9e-aebb-9758d3f6b5ae',
  'x-ms-request-id',
  'a5559b08-4b6c-44f0-ab60-a9c25c938d9e',
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
  'Wed, 28 Apr 2021 20:26:58 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd69b7a25-6aa0-415e-a9e9-58da66888c75',
  'x-ms-request-id',
  'e66cf8d3-6b31-4fe6-8d0d-e11fd9d95671',
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
  'Wed, 28 Apr 2021 20:27:00 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '19774323-322d-45ff-83fd-4b7ee3ffb08a',
  'x-ms-request-id',
  '536f029f-6f47-4eda-acad-a973ae60515a',
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
  'Wed, 28 Apr 2021 20:27:02 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '76a72817-fbc8-47fc-b809-1bf0328a9f07',
  'x-ms-request-id',
  '8b187d43-d8a1-4f94-a7ee-6a6b2acc65f9',
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
  'Wed, 28 Apr 2021 20:27:04 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6713a7b0-c30a-4aac-af65-4ca5d2b4dd7f',
  'x-ms-request-id',
  'e9f58999-4b06-4b40-8382-053d3700ddca',
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
  'Wed, 28 Apr 2021 20:27:06 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a7662bf8-bdf1-4764-89f8-1698ec449a42',
  'x-ms-request-id',
  'e4b13279-c5fa-48d7-b8a6-c5c34b5cfcd5',
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
  'Wed, 28 Apr 2021 20:27:09 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c0eb6cca-cb5b-47e1-a9d7-8f8257942e06',
  'x-ms-request-id',
  '6b207d3e-c25b-43ac-9105-b628174d56ca',
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
  'Wed, 28 Apr 2021 20:27:11 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cf31820d-cc25-42b4-9802-3f0eb2223fc2',
  'x-ms-request-id',
  '3544ce67-7f27-4fb4-9e51-292f22450bbf',
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
  'Wed, 28 Apr 2021 20:27:13 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'de31e484-e9e6-42b9-aaa0-d782ee155001',
  'x-ms-request-id',
  'fcda49e4-dcbb-44aa-9ee2-02f06a992e4e',
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
  'Wed, 28 Apr 2021 20:27:14 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '39ffb98f-7d51-4327-97c6-c33f08f646b5',
  'x-ms-request-id',
  '8bba3211-d06a-4a1e-8d5f-ef937d40ebdc',
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
  'Wed, 28 Apr 2021 20:27:16 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '415db38b-2268-4630-a94f-f5145852a481',
  'x-ms-request-id',
  '71ece659-b399-4403-94f9-501174e9b29a',
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
  'Wed, 28 Apr 2021 20:27:18 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4efe509d-1136-49bd-9521-db20cd2ab0fa',
  'x-ms-request-id',
  '6e5c6cd9-1805-472f-8088-7105470e763d',
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
  'Wed, 28 Apr 2021 20:27:20 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '06b57afd-5445-4838-b071-e1b5e56d97d7',
  'x-ms-request-id',
  '74379663-b534-456e-9dcc-2f9528dcaa1c',
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
  'Wed, 28 Apr 2021 20:27:22 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e19e8585-b383-4571-af87-9dcf9d113a3b',
  'x-ms-request-id',
  'ebe3e2ab-8565-4f80-a22d-8c876d7d5aff',
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
  'Wed, 28 Apr 2021 20:27:25 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '12024755-35b1-460f-bf35-2fdbee2530d3',
  'x-ms-request-id',
  '2e02a188-159e-4f0f-b0fb-57f159e101bd',
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
  'Wed, 28 Apr 2021 20:27:27 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '69064566-c113-49ac-af96-fc78c4d59805',
  'x-ms-request-id',
  'e7d6c3c8-3b93-49e5-8bdd-7f2de3680ab1',
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
  'Wed, 28 Apr 2021 20:27:30 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '68aa6c88-efda-453d-9833-9d26593d4cdd',
  'x-ms-request-id',
  'd22ecc88-f84e-4578-bcc4-416653b2cc6e',
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
  'Wed, 28 Apr 2021 20:27:32 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '115308ce-4b54-494c-a265-4da0f1cca5a8',
  'x-ms-request-id',
  '33f3d07e-8908-4d28-8c0e-a9512638a2bd',
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
  'Wed, 28 Apr 2021 20:27:33 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '37e8b27e-a931-4c3c-b5ea-b862d137dce0',
  'x-ms-request-id',
  'b16751a1-dd31-4894-a13c-64f205dd87a2',
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
  'Wed, 28 Apr 2021 20:27:35 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5d75fdd0-cda0-4552-89ac-34db57956597',
  'x-ms-request-id',
  'cb4ba1b3-e793-459b-bf00-14b8b2bde178',
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
  'Wed, 28 Apr 2021 20:27:37 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f7a1061a-46c4-427f-a71f-f201a5b75ba8',
  'x-ms-request-id',
  'ec453af1-5669-426e-844a-26982a6de64b',
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
  'Wed, 28 Apr 2021 20:27:40 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '21a29fd7-1e65-42c4-8fdf-9fe60de0860c',
  'x-ms-request-id',
  'fbcac3fc-d631-4f34-aee0-ceef9287cfd7',
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
  'Wed, 28 Apr 2021 20:27:42 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1cb6ddb7-7186-498d-aeea-d2c538875aca',
  'x-ms-request-id',
  'afc24709-ef56-4ca5-8e88-0177db526115',
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
  'Wed, 28 Apr 2021 20:27:44 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '90829b2e-e8d5-4574-98a0-22aced0a9944',
  'x-ms-request-id',
  '84e85d3c-e273-4030-989e-1aaf6f41b872',
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
  'Wed, 28 Apr 2021 20:27:46 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '11cfa416-0e3c-4ec5-ab68-05d34b2e0052',
  'x-ms-request-id',
  '6036fd78-51a6-46bb-b82e-bfeab3adebac',
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
  'Wed, 28 Apr 2021 20:27:48 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGzJhTavtVH8S+5pgovN0xqLu6IBTF5GAY3fl+8evtVsgBHBYLLy75kglIYyVymuFywJxT+7lCjWgYuqM1oTmviSfgR4tEWnAhLQYJFMQcHicJNaaDVQtiwplz4+ORwOkgmBU1isttB7c7+Ub0pSLju/P+bxUeH/tzvcC+7UBxGSKsFWZ3PVoKNHZpofn+jPQFqFZKC0LuYXyzXKsV8d4oxNOM1ZwadyaJT53lh/z8EmMcogy6mgIpTFRuvO+Dmb9Ux1I99afBm2tYwyGxyHLfkoyESl9ub+F0Uea0P/RRQio5Aq2Bv6iTSlxpB23p8PQK3VY/qUl6tf7l9UmZYYRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACd/0g5dYMWhPXZ7bEZnfazoH9eOYxfvszTw3d+I5J/Pzg7mjIisxML2B56M0vLYOCX5Fm/lxDnkydAOUNrxf+m1/pWH1PAz7zGLCRJ+48bPgnSswlrPjVHRUW0M3dPlTx6J21Ip1PZXj9O+uBu0FADEVow3jfX81vyNmWW9yIOLAgJnVf+trNR/t86f0Rm6S0thB70x70QQFDI7IPzK2jsFUYzn9y0j0xDlk816J2BuNbRMLHmTABi8md5BwkwRJZQXq21ohMLjJhzBV4MpGYDukbuU1L13wJi56mv0SHIYEe3VMAIE2jj2UaB62nsekliziX0pMLejyi5TTgWnvgU=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-","request_id":"16c083b5db5d4bf69c8333ad88167700"}, [
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
  'e8c151f9-17cd-4e62-a822-a6e2429a4083',
  'x-ms-request-id',
  '69390fb3-c128-4d78-8aa2-6a2505144600',
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
  'Wed, 28 Apr 2021 20:27:50 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","x5t":"a3smTonNIUP_pLaBLH80RuxPGOc","cer":"MIIDKDCCAhCgAwIBAgIQdIpUTdV9QsWas/NjMLczojANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxNzQ5WhcNMjIwNDI4MjAyNzQ5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8bMmFNq+1UfxL7mmCi83TGou7ogFMXkYBjd+X7x6+1WyAEcFgsvLvmSCUhjJXKa4XLAnFP7uUKNaBi6ozWhOa+JJ+BHi0RacCEtBgkUxBweJwk1poNVC2LCmXPj45HA6SCYFTWKy20Htzv5RvSlIuO78/5vFR4f+3O9wL7tQHEZIqwVZnc9Wgo0dmmh+f6M9AWoVkoLQu5hfLNcqxXx3ijE04zVnBp3JolPneWH/PwSYxyiDLqaAilMVG6874OZv1THUj31p8Gba1jDIbHIct+SjIRKX25v4XRR5rQ/9FFCKjkCrYG/qJNKXGkHbenw9ArdVj+pSXq1/uX1SZlhhFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTfXA5lDfwtf3Nfw/Qejxu2l61BljAdBgNVHQ4EFgQU31wOZQ38LX9zX8P0Ho8btpetQZYwDQYJKoZIhvcNAQELBQADggEBACg8KbxqIofFz69TWd7n+zUe6BNiYl2ebyPsGJxKzplwAwShGv22Sjr9DAE2SRVaoyLYOBtsRREdHTcqhCGEo8pGgzY65x7EDSkLBuv9PgRZwlmnjwQVsK3agYZjsKdSL4Th2/5C2wmdUz7CKYhFSFUKVC1WgDh0qmjH45cfiq1Fu9Xup1aqWyzC0MTX8e6BYWzZ5/Nhaxj8XoT/Nxic0QHQVRNKf+vms7tpAv2CW+HQyK76xc181I1ul0Sve6YR0GbM02hUVFXSvWpGo9T2CqEBa4NoiCIDXtQUcwXwOZa1IHK3qrNArAHenR1/VN7pIt+W4bKR+Gx12vrzAlrbpqY=","attributes":{"enabled":true,"nbf":1619641069,"exp":1651177669,"created":1619641669,"updated":1619641669,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641607,"updated":1619641607}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  'dd743d31-13d5-42b2-9746-80bb68ce5325',
  'x-ms-request-id',
  'c462265d-e5e1-434f-abef-418084de486d',
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
  'Wed, 28 Apr 2021 20:27:50 GMT',
  'Content-Length',
  '2655'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","x5t":"a3smTonNIUP_pLaBLH80RuxPGOc","cer":"MIIDKDCCAhCgAwIBAgIQdIpUTdV9QsWas/NjMLczojANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxNzQ5WhcNMjIwNDI4MjAyNzQ5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8bMmFNq+1UfxL7mmCi83TGou7ogFMXkYBjd+X7x6+1WyAEcFgsvLvmSCUhjJXKa4XLAnFP7uUKNaBi6ozWhOa+JJ+BHi0RacCEtBgkUxBweJwk1poNVC2LCmXPj45HA6SCYFTWKy20Htzv5RvSlIuO78/5vFR4f+3O9wL7tQHEZIqwVZnc9Wgo0dmmh+f6M9AWoVkoLQu5hfLNcqxXx3ijE04zVnBp3JolPneWH/PwSYxyiDLqaAilMVG6874OZv1THUj31p8Gba1jDIbHIct+SjIRKX25v4XRR5rQ/9FFCKjkCrYG/qJNKXGkHbenw9ArdVj+pSXq1/uX1SZlhhFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTfXA5lDfwtf3Nfw/Qejxu2l61BljAdBgNVHQ4EFgQU31wOZQ38LX9zX8P0Ho8btpetQZYwDQYJKoZIhvcNAQELBQADggEBACg8KbxqIofFz69TWd7n+zUe6BNiYl2ebyPsGJxKzplwAwShGv22Sjr9DAE2SRVaoyLYOBtsRREdHTcqhCGEo8pGgzY65x7EDSkLBuv9PgRZwlmnjwQVsK3agYZjsKdSL4Th2/5C2wmdUz7CKYhFSFUKVC1WgDh0qmjH45cfiq1Fu9Xup1aqWyzC0MTX8e6BYWzZ5/Nhaxj8XoT/Nxic0QHQVRNKf+vms7tpAv2CW+HQyK76xc181I1ul0Sve6YR0GbM02hUVFXSvWpGo9T2CqEBa4NoiCIDXtQUcwXwOZa1IHK3qrNArAHenR1/VN7pIt+W4bKR+Gx12vrzAlrbpqY=","attributes":{"enabled":true,"nbf":1619641069,"exp":1651177669,"created":1619641669,"updated":1619641669,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641607,"updated":1619641607}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  'ead5a4c7-5cca-4139-9248-a146d44e4005',
  'x-ms-request-id',
  '4bf0a03d-f862-4560-905e-1b92fb3afc8f',
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
  'Wed, 28 Apr 2021 20:27:50 GMT',
  'Content-Length',
  '2655'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
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
  '1430c413-832e-4906-929f-2e741c4a756a',
  'x-ms-request-id',
  '8bf0c23e-f27c-48d7-9f3a-7d0d8385b16b',
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
  'Wed, 28 Apr 2021 20:27:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
  .query(true)
  .reply(200, {"value":"MIIKOAIBAzCCCfQGCSqGSIb3DQEHAaCCCeUEggnhMIIJ3TCCBhYGCSqGSIb3DQEHAaCCBgcEggYDMIIF/zCCBfsGCyqGSIb3DQEMCgECoIIE/jCCBPowHAYKKoZIhvcNAQwBAzAOBAj08Mt6Eeau8QICB9AEggTYQZAubWzR2BxXpKmGU0b53QJiDpymFfQmBUVJSXhat8yXoglpsox6AY+6qlTb1lL/+Oavs7Ha/HVwa1XNlFKb4IFM1GiFhHRsqcmx8wvji2VwpDHO8xH7QbkDgIjnS2PBei5EUluub6R9BSP7wYi7GpSBDBU85VzZccm77IN/D9IguLEQDPv9bfLMFxyMIBcj4AB8+rc3KKsAR7JMqIIuLsWXFXlBrOi6maaObAQLp0WvUvV8TjvTcgopNl7Umw8QAtY6HKG55kqKVYysa+KETz02DI8iBCtXDDvjPQogFLdWZImJLbuSZw8MyLufcKK1JqRff9gQyU/tMeTTcq9osSBPgmMDChmCmtbcaXzPJisMs7Ggyx2wibsRE9ty7qn8SxtvmxGiNzOKV+3kUJ3PLyh23aOcQKdmzKtZ7WQ6J43pQSsp5CTfFKRh1mNp0SwQli2t4ZlQ7SmiAEraWbe4it6ziZiy7TZrNSdVpSbIKR42AkeJUg0qqwzVRQO9fcQqCuqzqfqxeQI/B3/RmOI2NsABdmnh0JGonxryRjkdYyQwMWKSbwA/vUC8w8FiyhLR6OWHt+961L7qTWsOFHL4nraCxQmbZTHNu5oZex/WBZhqEuLG8t9tG8Z7xb+d4mbUYQIgEeT1QJg6OVhgk05Doimcs6B78OeF9fe8NWv7Ad91oG/sDMbvVFpjvx3rsdnIWUQ1lDtJoGu06cMpg7aYDohmWf+kdjjfKy0x90MXxLlBOCBA0ZLDsuQaG5UheBvNaUu+fHj0JZUKXqpSA7iNrirZT0wcgU7xQ3mFOxEo9KMTZZ56T3dnb4a1NPybtfJE3CuJHFOOWcIYLdm4akJafKnF02qpZtNNTATdY5z/SDEHFeoiTra/8VG6zveu6yeDRNLkChrCivJlzQx2twSmbs9s4B5JysPtGDWkK8zr8Oq/gW5KRrebNacsry/PcxAaG1wKF3mq6elO5C5ghnbQpFemEXkD826Y9m5QCQeZfEZ1+qiVyTJtCKXhetHoS3P1UK4nwbGr8fL51YO1TsiTmBPwbkuyQrfUQ27dWgXu1id+4rBUA8u0vengeGVJ8PxKQj6+1SF1sFSEyaPARa3LbPQwiIKcR3skw74fHp5rv2k2Xyc6afpfHnc1lJijHHaHCSqJDor7cFH1mSD1UxgguAE/7vGLJyvhasKBHIUsSW6PQEjgOSyPthJn+TaB1EU2jwOc5XAFXRREJCllBAY3zusybobeY5ysDFLeQSZVdWyTuLOT1AfVWQ+PAanUfzHPbHL9i9lZqQ1t7RNY1aFCsuORe05pawPxRl3xlQSfqtE2/RiOGVtHANilTGV+RyUuPB+W2kBc9LmE0wOxLN3rUA7+Lzaze6cTkECRufsGfAgD3bqqHHQ7lQ8b2Q17EMa9L3+uJmOQ8VVhMWLYNWeIxdPe9uCvxufxJACos/wvgcPyGxrDmwFFcuVbaKKvqzLexaoRAj7o7MvJx8eOB/0T0pOY2W1R4yNU5g78LJ+DMAq4JtXXskDWI5SOEd+YT0iLIS1+ZV+WBsv3N0Vcq+gSIAhz1FNi+cn+fC1FRCsjPNJms6nZAzSKvOOYawSrCpJ/kk8bw6urmAPmjcOHBhVivDMQSweQYGzziEk7hnldn4PQrCTpBpYBvzGB6TATBgkqhkiG9w0BCRUxBgQEAQAAADBXBgkqhkiG9w0BCRQxSh5IADUANABmADAAMAA0ADEAYwAtAGEAYgBiADcALQA0ADcAYwA0AC0AOQA2ADMANQAtAGIAMgAwADkANwA1ADAAOQAxADYANwA1MHkGCSsGAQQBgjcRATFsHmoATQBpAGMAcgBvAHMAbwBmAHQAIABFAG4AaABhAG4AYwBlAGQAIABSAFMAQQAgAGEAbgBkACAAQQBFAFMAIABDAHIAeQBwAHQAbwBnAHIAYQBwAGgAaQBjACAAUAByAG8AdgBpAGQAZQByMIIDvwYJKoZIhvcNAQcGoIIDsDCCA6wCAQAwggOlBgkqhkiG9w0BBwEwHAYKKoZIhvcNAQwBAzAOBAgkkbw9bs0zVgICB9CAggN4cjY8lzeQqYQZlF372jID2shbHSl6xngdKhYSUHU0sM5sGISbFOotb22CDnDcq0YAsGHCB/sCoy2Z1AUeOSNgB2/K1SbdOaMu5pdNeqVBEh1+jrv/mfgg/UwgZNh4buO5CLziHqKanqDU96ReGrEHxVB5Lq96/C2oAhomMLbeyEs41Rn5VXphV84gESg34fHT8KbPa9xR6C8MWmipV8yRdynA3yXJPzL69rjcXKVjsB0E4PgBPMoV9AP71fpwrBxYdOb1ZAOIdkLlRQSCBZHnRkLkRKzTqfvV8Lj4WqUE/JoDPmXx1dUiO3phMP8dK2gE9UinSK87Z4RQhKN99za80n5yT67FxubYnCdLdila+zZPj0JQodIF9jG3in2VqJVrl5oYSOa5ghht4wnCYKctfi6XsIIoqMugwZvX4mFRTy7SYFIKSmUDksAPXHd6ssQI+lGnAtLDDb+ea9MEvaZFJbuDoSy136yosrOGJPWaf2VLssRL2asE+LyYB3EWau8A8GncE9nQljY6CHBPpm3lCQj2fSBfoaLKYy8MI/WnE1y1ikTYBZlZLflcg34AC0Qyvwjx2vU5E67jmr/gZT423uCPCtMVv8zGsCmV9gJWBdWKoQElM1F2koKT6QorkoCgjij+t+rRJS46Ae5VySqGcauq4totkNhTHo/1OsZupFKZ/F0sn/FLrEJXz/Qg77d0Fa8HOaX5PiEBV2361Z1RovxR/i5faeSVQcpLahzEhOY7HmCafArwkmavmyI9C2cEl5EhMrzuyrjDdEf4pjCX1arv1n6dDVlgbYcsaDVXzTToT6nmJxUU1i3WcVVc/ieS9RFaR4MYJQwX6nlTPaZFbmkEojnO5Th3U/mvTBsPE+tHnMp6H65S4qRqdmuG5LydjnovEVa0Snz3FQ8admIhJ7eYuxy2ISa9FSr2xlCnC5NaXAd5RJ8lp82Je1HYWyYmZj2y749T3rb+dEvDJsX0oXVx1pfFH1jPopQEO0Jkfg5MeHa0O2P4akTeqPOWhR1tlGihgwlInUj2Ql8vc5M9SX37G0KAaTokmoo2DkRO7PqDMZUJ0L3YHvmjx4igeLlYdw7egf7jxmx+BnnBu4UhkqRZFqofWh7dCL+FdhKvcShPBmCBzqndTOfHIyOQqyYiou3kHZIbvoa6ExziRmgrGv1aZ16v6GCDMDswHzAHBgUrDgMCGgQUrbg74eNR0/RPiuEX2lyVAhMx76oEFKZnT7ij4OcqcafOXt3jWAz+thU8AgIH0A==","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","managed":true,"attributes":{"enabled":true,"nbf":1619641069,"exp":1651177669,"created":1619641669,"updated":1619641669,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78"}, [
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
  '1430c413-832e-4906-929f-2e741c4a756a',
  'x-ms-request-id',
  'f3062eeb-b6ab-4b50-b32a-036f08e87c77',
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
  'Wed, 28 Apr 2021 20:27:50 GMT',
  'Content-Length',
  '4063'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-","deletedDate":1619641671,"scheduledPurgeDate":1627417671,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","x5t":"a3smTonNIUP_pLaBLH80RuxPGOc","cer":"MIIDKDCCAhCgAwIBAgIQdIpUTdV9QsWas/NjMLczojANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxNzQ5WhcNMjIwNDI4MjAyNzQ5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8bMmFNq+1UfxL7mmCi83TGou7ogFMXkYBjd+X7x6+1WyAEcFgsvLvmSCUhjJXKa4XLAnFP7uUKNaBi6ozWhOa+JJ+BHi0RacCEtBgkUxBweJwk1poNVC2LCmXPj45HA6SCYFTWKy20Htzv5RvSlIuO78/5vFR4f+3O9wL7tQHEZIqwVZnc9Wgo0dmmh+f6M9AWoVkoLQu5hfLNcqxXx3ijE04zVnBp3JolPneWH/PwSYxyiDLqaAilMVG6874OZv1THUj31p8Gba1jDIbHIct+SjIRKX25v4XRR5rQ/9FFCKjkCrYG/qJNKXGkHbenw9ArdVj+pSXq1/uX1SZlhhFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTfXA5lDfwtf3Nfw/Qejxu2l61BljAdBgNVHQ4EFgQU31wOZQ38LX9zX8P0Ho8btpetQZYwDQYJKoZIhvcNAQELBQADggEBACg8KbxqIofFz69TWd7n+zUe6BNiYl2ebyPsGJxKzplwAwShGv22Sjr9DAE2SRVaoyLYOBtsRREdHTcqhCGEo8pGgzY65x7EDSkLBuv9PgRZwlmnjwQVsK3agYZjsKdSL4Th2/5C2wmdUz7CKYhFSFUKVC1WgDh0qmjH45cfiq1Fu9Xup1aqWyzC0MTX8e6BYWzZ5/Nhaxj8XoT/Nxic0QHQVRNKf+vms7tpAv2CW+HQyK76xc181I1ul0Sve6YR0GbM02hUVFXSvWpGo9T2CqEBa4NoiCIDXtQUcwXwOZa1IHK3qrNArAHenR1/VN7pIt+W4bKR+Gx12vrzAlrbpqY=","attributes":{"enabled":true,"nbf":1619641069,"exp":1651177669,"created":1619641669,"updated":1619641669,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641607,"updated":1619641607}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  '9106178b-c60b-4937-b97c-8d4b1d997ebf',
  'x-ms-request-id',
  '86d2526d-f49d-414f-86e7-e5557c65b522',
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
  'Wed, 28 Apr 2021 20:27:51 GMT',
  'Content-Length',
  '2868'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '700eb4e6-7adc-49dc-a6f0-f4c2ce5f1f0d',
  'x-ms-request-id',
  'c84526c3-6dfc-44fc-8629-e7a6183762c9',
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
  'Wed, 28 Apr 2021 20:27:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f9828a40-53fc-4d81-91c4-26d51839d851',
  'x-ms-request-id',
  '065aeee0-32ab-49fc-9268-117717c2a7f7',
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
  'Wed, 28 Apr 2021 20:27:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7d6e5925-4071-4b81-8bb2-72987313872e',
  'x-ms-request-id',
  'c147010a-1b89-4c8e-9c70-6da9d66f7bea',
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
  'Wed, 28 Apr 2021 20:27:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '08a1fc4d-717f-429a-b22b-752a9f464d72',
  'x-ms-request-id',
  '753a8bae-2ae8-4fad-9e7f-107795e1fa1c',
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
  'Wed, 28 Apr 2021 20:27:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8b83deac-b40f-4d30-ae87-c371d0f3026b',
  'x-ms-request-id',
  '47c45b44-7344-4a09-8f99-14a011ff343f',
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
  'Wed, 28 Apr 2021 20:27:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6f9569c8-8829-4e2f-849d-09480c5146f9',
  'x-ms-request-id',
  '1a54fd4a-547b-43b0-bd46-a44ef721f5ef',
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
  'Wed, 28 Apr 2021 20:28:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '94b5ced9-3b8e-4a66-87c3-7279785b407c',
  'x-ms-request-id',
  'be23bab9-b554-4e39-99e0-ad191d18e630',
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
  'Wed, 28 Apr 2021 20:28:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '367ae990-a90b-4715-9885-6dee5f77e294',
  'x-ms-request-id',
  '624eb5c7-f436-4b0b-9ddd-ed7fab950bca',
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
  'Wed, 28 Apr 2021 20:28:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd4e45847-6339-4742-946a-1a121fa9d102',
  'x-ms-request-id',
  'ddccc4a5-5132-4a9c-baa2-0b3066345dbc',
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
  'Wed, 28 Apr 2021 20:28:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'de186100-bc7e-4b2a-8b1c-51c42b4d829c',
  'x-ms-request-id',
  '11da6fb1-dd58-44d3-94d8-e1b6ead68160',
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
  'Wed, 28 Apr 2021 20:28:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ca1a98b8-5b09-435a-bb39-c998e71f51f1',
  'x-ms-request-id',
  'd2fea575-3a8f-42d0-9292-4c96a4f6c01a',
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
  'Wed, 28 Apr 2021 20:28:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a90e0225-fceb-45a5-ad98-8bde18dae42e',
  'x-ms-request-id',
  '91d1a1ce-adec-455c-ae90-db318cd3b19d',
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
  'Wed, 28 Apr 2021 20:28:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b5b2fad2-c5c8-42f8-b1cf-8b64076b491d',
  'x-ms-request-id',
  'f3332466-749d-4ed9-a025-0f5d63acea26',
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
  'Wed, 28 Apr 2021 20:28:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '33aa03aa-0fea-49e1-b526-47c06c613d95',
  'x-ms-request-id',
  'f6dff295-b671-4738-b2ca-64e60e3c3c3a',
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
  'Wed, 28 Apr 2021 20:28:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3df84c14-2b9e-4b21-8983-f30f9f098c40',
  'x-ms-request-id',
  '570c20e7-c24a-40b7-b901-179fe81ea396',
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
  'Wed, 28 Apr 2021 20:28:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bb49d1e1-57d8-46f7-8fe8-fda39775eafd',
  'x-ms-request-id',
  'a71c6020-0ad5-4702-9c04-5b667fe95cc2',
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
  'Wed, 28 Apr 2021 20:28:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2a7415fe-bfeb-472f-849d-ab66c22ec5ba',
  'x-ms-request-id',
  '9b4f0f5d-d253-4bef-9a58-f939c4434737',
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
  'Wed, 28 Apr 2021 20:28:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '608ad0b2-8063-49a6-a04d-e6755eec959a',
  'x-ms-request-id',
  '1dd87958-a219-49ff-ad8b-c38905b2a742',
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
  'Wed, 28 Apr 2021 20:28:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7717ce3c-919e-44ec-a24e-e9cce57fc9e4',
  'x-ms-request-id',
  '1751dd24-f581-4101-b964-3c2860c77f82',
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
  'Wed, 28 Apr 2021 20:28:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4d3eac40-e140-4e6d-88e1-b09b1e7a629d',
  'x-ms-request-id',
  '31dcb799-fa9d-438d-80b5-024f5cc6a475',
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
  'Wed, 28 Apr 2021 20:28:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '959a28c4-bc2a-4f21-ac15-96350cb760fd',
  'x-ms-request-id',
  '811b6d46-7907-49b3-87bf-d3114a3a259e',
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
  'Wed, 28 Apr 2021 20:28:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f5c1f5af-b019-423b-ad39-df3bdba9de6f',
  'x-ms-request-id',
  '67643ea1-06e1-436f-a78b-597ffe12701a',
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
  'Wed, 28 Apr 2021 20:28:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '02d2c4e3-9f91-4973-8c84-9cf23ba5ba2a',
  'x-ms-request-id',
  '1ac96c6c-6c02-4c1c-881e-54acf2a8eb35',
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
  'Wed, 28 Apr 2021 20:28:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ff5bc223-8bc2-46ab-90d4-6e52e4667db9',
  'x-ms-request-id',
  '4f722e4d-faf9-4418-921b-cf8a1bff3f62',
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
  'Wed, 28 Apr 2021 20:28:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1f24f4d1-9069-4b27-bb5c-fbd1917e620e',
  'x-ms-request-id',
  '308a9407-d675-4436-87f2-b32c7c124a52',
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
  'Wed, 28 Apr 2021 20:28:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9eb1cfaa-4370-42f3-b391-ad5c92ec1789',
  'x-ms-request-id',
  'f6b5b79a-5d95-4f8e-91ea-edf0c4fd6ab7',
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
  'Wed, 28 Apr 2021 20:28:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c8b502ed-c226-40e1-8a82-118aaecc68b5',
  'x-ms-request-id',
  '71425475-dc88-4110-874f-3679938331fe',
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
  'Wed, 28 Apr 2021 20:28:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c79452b0-cc71-4a15-998c-4534bb3d62d1',
  'x-ms-request-id',
  'cc7b20d9-e58f-4d3c-b937-613e3fb8d210',
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
  'Wed, 28 Apr 2021 20:28:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4dbdd2a8-7ed5-4b6f-9f4b-873ee1fbbdd9',
  'x-ms-request-id',
  '4b6a8e49-0930-4ce3-b8e8-4d852c571d9c',
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
  'Wed, 28 Apr 2021 20:28:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3e55ef65-d12a-4d6d-a64c-47708aa256da',
  'x-ms-request-id',
  '76632fd2-cc46-40f9-bc2a-03fd5b9fd2ba',
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
  'Wed, 28 Apr 2021 20:28:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e252f856-696a-453c-b762-6f934fb31b4c',
  'x-ms-request-id',
  '603adae3-be0c-4464-b3c9-3523ee2f8b94',
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
  'Wed, 28 Apr 2021 20:28:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bb45d072-fe65-438a-a6e7-b899826573e6',
  'x-ms-request-id',
  'f45f7b69-c8a3-464f-87ca-59224082d87e',
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
  'Wed, 28 Apr 2021 20:28:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '80a5cd91-e4eb-4675-af71-bef33016ef6c',
  'x-ms-request-id',
  '7ba4f983-693d-4f31-9464-c85fe6ce3362',
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
  'Wed, 28 Apr 2021 20:28:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '19040d5d-5d14-4e65-a003-3fc59c270fc9',
  'x-ms-request-id',
  'f0b23fff-d41d-4c83-b719-c09966bc5f3a',
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
  'Wed, 28 Apr 2021 20:28:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '174423bc-a3bc-4f5d-9fbe-1f3296b54597',
  'x-ms-request-id',
  '8fa5e927-0b66-4a4a-98f8-7d5472b5d076',
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
  'Wed, 28 Apr 2021 20:29:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6add2986-1106-4d8a-9215-4fd2c9fc48d2',
  'x-ms-request-id',
  '4fb7f63d-3d1b-4bfb-9345-39faeb28840c',
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
  'Wed, 28 Apr 2021 20:29:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9ac82ac6-0ba3-47a1-bb1b-31b07becdb6e',
  'x-ms-request-id',
  '62742bce-db5d-40e3-bf90-43c244ebd50c',
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
  'Wed, 28 Apr 2021 20:29:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd75220e8-f268-4726-970a-ca40518978c2',
  'x-ms-request-id',
  '7cb9a4bd-31de-4a8e-bf6c-839a17724898',
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
  'Wed, 28 Apr 2021 20:29:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a5436e3e-db42-4f01-99a0-d9cbf96ebec7',
  'x-ms-request-id',
  'db24ea7c-7c86-4062-8093-0422ffae7ba0',
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
  'Wed, 28 Apr 2021 20:29:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b8e732d0-1602-4046-a527-7a8e322457c3',
  'x-ms-request-id',
  '0d6102f7-9eab-4f6b-b8bf-4ff708fe0b8d',
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
  'Wed, 28 Apr 2021 20:29:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fd72a0fc-1fc6-4de0-bc09-a0112031b630',
  'x-ms-request-id',
  '28222f96-c304-4b8b-ad83-7cafbdd55f08',
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
  'Wed, 28 Apr 2021 20:29:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '749b8f81-1633-4869-9fcf-4ce2a8a4ef1c',
  'x-ms-request-id',
  'b220470e-7925-4a5b-8a26-50f46f38ade3',
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
  'Wed, 28 Apr 2021 20:29:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '28c5c771-cac6-4711-872e-27ae01fd150a',
  'x-ms-request-id',
  '0cfa0932-5d16-4629-8dfa-94df0a90be00',
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
  'Wed, 28 Apr 2021 20:29:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-","deletedDate":1619641671,"scheduledPurgeDate":1627417671,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/d57e8b94589849e4a7013c1b1643ff78","x5t":"a3smTonNIUP_pLaBLH80RuxPGOc","cer":"MIIDKDCCAhCgAwIBAgIQdIpUTdV9QsWas/NjMLczojANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxNzQ5WhcNMjIwNDI4MjAyNzQ5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8bMmFNq+1UfxL7mmCi83TGou7ogFMXkYBjd+X7x6+1WyAEcFgsvLvmSCUhjJXKa4XLAnFP7uUKNaBi6ozWhOa+JJ+BHi0RacCEtBgkUxBweJwk1poNVC2LCmXPj45HA6SCYFTWKy20Htzv5RvSlIuO78/5vFR4f+3O9wL7tQHEZIqwVZnc9Wgo0dmmh+f6M9AWoVkoLQu5hfLNcqxXx3ijE04zVnBp3JolPneWH/PwSYxyiDLqaAilMVG6874OZv1THUj31p8Gba1jDIbHIct+SjIRKX25v4XRR5rQ/9FFCKjkCrYG/qJNKXGkHbenw9ArdVj+pSXq1/uX1SZlhhFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTfXA5lDfwtf3Nfw/Qejxu2l61BljAdBgNVHQ4EFgQU31wOZQ38LX9zX8P0Ho8btpetQZYwDQYJKoZIhvcNAQELBQADggEBACg8KbxqIofFz69TWd7n+zUe6BNiYl2ebyPsGJxKzplwAwShGv22Sjr9DAE2SRVaoyLYOBtsRREdHTcqhCGEo8pGgzY65x7EDSkLBuv9PgRZwlmnjwQVsK3agYZjsKdSL4Th2/5C2wmdUz7CKYhFSFUKVC1WgDh0qmjH45cfiq1Fu9Xup1aqWyzC0MTX8e6BYWzZ5/Nhaxj8XoT/Nxic0QHQVRNKf+vms7tpAv2CW+HQyK76xc181I1ul0Sve6YR0GbM02hUVFXSvWpGo9T2CqEBa4NoiCIDXtQUcwXwOZa1IHK3qrNArAHenR1/VN7pIt+W4bKR+Gx12vrzAlrbpqY=","attributes":{"enabled":true,"nbf":1619641069,"exp":1651177669,"created":1619641669,"updated":1619641669,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641607,"updated":1619641607}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  '2fcea190-a4ad-4174-bc58-f6a5c6a56aee',
  'x-ms-request-id',
  'f890ac31-a5e4-4bfe-add3-6d94c181b9ce',
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
  'Wed, 28 Apr 2021 20:29:18 GMT',
  'Content-Length',
  '2868'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
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
  'd16f98c5-834b-418c-971c-feb37cd61121',
  'x-ms-request-id',
  'daa0a1df-c3a9-48f9-89b5-a0cc9cf26485',
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
  'Wed, 28 Apr 2021 20:29:20 GMT'
]);
