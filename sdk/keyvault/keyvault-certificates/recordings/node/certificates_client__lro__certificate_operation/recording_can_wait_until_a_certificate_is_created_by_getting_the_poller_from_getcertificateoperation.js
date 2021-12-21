let nock = require('nock');

module.exports.hash = "264d80049ba963b7dd8c771ab13b67d7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/create')
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
  '8f5a280f-4a70-4876-9512-744855ce2359',
  'x-ms-request-id',
  'c04a6a8b-4498-4df7-9df9-356bde09a976',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:03 GMT'
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
  'e1231bf4-7d48-424e-89f4-263c9fc34803',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAODDG9gOAAAA; expires=Fri, 28-May-2021 21:06:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGS8yap8AGSrLf48sVOIN9SjUc_wEFki0Vm8Uo_W090cO71EB_qcxRt92zV1Wx9upeKqacprZq4GTlad0Vqy-AtpSiiBQCCfmmxLLks4Fl4kNk5Rb-_X70NBFnjXgEPdENlCyZ2IU0O9lAgDlutEA7dN8PsIGfehwy79snDsvbZQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:06:03 GMT',
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
  '1f9398a4-7d83-436b-9d83-189c3d85ff00',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAODDG9gOAAAA; expires=Fri, 28-May-2021 21:06:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsLLMY3cFgHZTZi2oc_fiTnRzTuRhhKSxzy8Vt76TsTlsWNqju40s8u0NomQIgzQNnN97GJSsv6d8fIAs9e995alax08P2vLKXUburNQpAuAstCx6ze31poioDLMdM-JqA2tl3TifeeoLf1LgBSsJ5YhSAkA4R_aXgxwfjWCtU6sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:06:03 GMT',
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
  '6f4596de-6982-4a72-ba2a-54051d832801',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAODDG9gOAAAA; expires=Fri, 28-May-2021 21:06:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:06:03 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending?api-version=7.2&request_id=87a2e5952eca4415821fcbf42a7bf4e8',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8f5a280f-4a70-4876-9512-744855ce2359',
  'x-ms-request-id',
  '613f2845-9649-4e4d-b7e9-f53e5519c6aa',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:04 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '66441ebd-ecf2-427d-ae45-3f1aea5e0f1b',
  'x-ms-request-id',
  '154ceb58-607b-4f4b-bc0c-79f8c866f50a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:03 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/a22013b7327447f7ad7234e4a8802ae6","attributes":{"enabled":false,"nbf":1619643364,"exp":1651179964,"created":1619643964,"updated":1619643964,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643964,"updated":1619643964}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending"}}, [
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
  'd5c3031b-f761-43d8-b9dd-6653bf4a423a',
  'x-ms-request-id',
  'd88d6b29-e5df-4588-afac-e76a53853790',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:04 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '51e1eef2-5380-4a0f-81c2-573637e5eccf',
  'x-ms-request-id',
  'c48415c7-3887-473e-b3a5-c15717aec9f1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:04 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '9562c3ee-a9a4-421b-b321-edab4ca71f88',
  'x-ms-request-id',
  'a290a3c8-ef95-438e-9b23-a29b8dbea914',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:04 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '26d79f96-346b-497f-b98d-b216f382facb',
  'x-ms-request-id',
  '103bb230-8e8c-4301-9d3a-b6b429d3ae28',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:06 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '50b10862-36fc-44fe-b6ea-8b8456ff8cf3',
  'x-ms-request-id',
  '57a37a50-e71f-4db3-90c9-9090f80d1c67',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:08 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '30584d3a-faad-4e44-9b55-e8b9f6abceec',
  'x-ms-request-id',
  'd37996ba-0e25-45a0-8dd4-37724e01b0ec',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:11 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '868ddbb2-55d0-4412-9552-5d2284138de0',
  'x-ms-request-id',
  'f5b213bc-6d19-4747-b28d-01c6d5af99e4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:13 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  'a746b9e0-b850-40f3-9b4c-b9bc7b70a8ae',
  'x-ms-request-id',
  '8a34bb53-12b3-4b9f-886b-afbb90932116',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:15 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  'd24badbe-d5d6-4cb8-8175-0e3679ecb6a0',
  'x-ms-request-id',
  'e95178a9-7c63-4836-a7e1-80d42ba1e11b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:17 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '79ac73e8-75f4-4e42-bd45-79caee0332cb',
  'x-ms-request-id',
  '906f73b8-bf9f-4d5f-bab8-ac185b08acb7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:19 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '0a05f2a9-6aa1-4982-b567-cd5c8728dd87',
  'x-ms-request-id',
  '41385da9-25e1-4976-a5b6-7aa83e2b7f3d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:21 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '0a5605cf-09fe-4893-95c4-167434f3d4bc',
  'x-ms-request-id',
  '1ff4f12c-3e64-4d1f-8ad0-7e10a5a81a4a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:23 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  'a6787198-1c97-447f-8689-62a8639eb731',
  'x-ms-request-id',
  'ae5e7b8e-9066-446e-893f-629afea6e62e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:25 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '5eba29e2-2c8f-4f1c-85a7-0e0baf058ec3',
  'x-ms-request-id',
  '87bc596a-b9f9-40d1-8896-98a8ab0f92c6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:27 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '1f334b40-74d7-4f10-8651-a8a7fcbeffe4',
  'x-ms-request-id',
  '2f18a8cd-2c65-48e7-b878-9110d03857da',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:29 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  'b28e1592-5c1a-4dcb-bfab-319706d81831',
  'x-ms-request-id',
  '5cd114d9-3ee0-4f1a-9d53-02b0c70d9c6e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:31 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '04288d22-8222-430e-aa42-3fefd5bc68c9',
  'x-ms-request-id',
  'b926acd9-da61-4a6b-981e-dce8b7d78dc3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:34 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '054bdeb5-c8bc-46d4-bcd7-fa8d00b306dd',
  'x-ms-request-id',
  '551852ca-ee21-47a1-a227-7d74ff9733b4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:36 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '30a74441-df57-4408-836b-65ae2ca1e5d7',
  'x-ms-request-id',
  '4fdfdd47-ce4d-45de-9aea-d96e8db7a65e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:37 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '68c13f5e-3306-4bde-9b43-1a5999fe2ea2',
  'x-ms-request-id',
  '589aae1d-75e9-486f-9c53-b51541027e52',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:40 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  'dcb93d36-c21c-4406-a23f-67cd07ffd40d',
  'x-ms-request-id',
  '8fb37fff-8737-4773-ac14-fff6820f35f2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:41 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  'c3c4b636-f2f9-40b6-863a-aeb0ba15ef90',
  'x-ms-request-id',
  'a310c3c6-a018-418a-aeec-700451a573c1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:44 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  'c9594818-b527-4f2f-b440-609aa1eb9dca',
  'x-ms-request-id',
  'c2ca394a-d718-45ce-a70d-b099b9525d11',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:46 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  '78abc035-85ec-4ba7-9713-8a00fd08b009',
  'x-ms-request-id',
  '8dfc3010-6c6c-4e6b-963b-f4026ab2c32f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:48 GMT',
  'Content-Length',
  '1400'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2JFdvKTUGlJEgEhbxbZ8hMlr6V9sSnTErK+c0qwWTq7voIm00K0ImtrZ54Ii4JHQvsrsAkdyRkORbWj8WDnNBAjv+4f211XZ1KnyyoufYwg/ahGFHMqnvpBv1pAZT4EcdE+vc06FX+sO2bZ07ThwmY6J3aZC3p9IvYl4j1ladefqDMdkKvhpyc01/VUCpukfPJ/m7DGSfXIC0Kq77QHR8c6B+MfmR/SFznwXIinY/k7lGUvvoN4l5hV59LUeNW8rHcYPGmSMy1QrY5gB8sAnMFNAk/yl6uiQ5PDfjbBg3Mq7j2ZiwZhIQIs0jgp8ZUhAbHMN3hTcEjSiQPlbaCMQQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD/X5IszXEMByDV4pb5aEUMPd5S2ix0mHzOCPGGsnu7HLeA941aZp4zx9zTimfUU27r353czmmVMOmufLTr38xUUVr5GZS4B6p+pLO4FJdxfwqfjeytKQ/C9Hjm4ivva91wNTr2HRLM3trNBCxubegSSQYWKjJtJ86zhjLQGqqozRk1kHKNJk+9xPMtuvRfW5QAJJpt2i98vOvcJLGTSvGEpZqoRLribzjv0GWpo2DvVX7j6ixsdwP4JNTU5srK54BqgAvYm4gVNwwyd5OuZLwA6fBtPjuNUjcUruUHS9fOw1ffRSdm9pRvq7faEaFfg0xJcGYWlbKzNsmJYPbZhdLI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-","request_id":"87a2e5952eca4415821fcbf42a7bf4e8"}, [
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
  'de985dcf-5bbe-40d1-a287-4ccbb2f1df65',
  'x-ms-request-id',
  '9cecc32a-2acf-4a1d-9f56-29b8bb305b38',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:50 GMT',
  'Content-Length',
  '1427'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/a8bbdcfeca5c45f088692365c4a8e433","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/a8bbdcfeca5c45f088692365c4a8e433","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/a8bbdcfeca5c45f088692365c4a8e433","x5t":"iyeG6zVOjT9kzLPAhZALuc_mzOI","cer":"MIIDKDCCAhCgAwIBAgIQClfITG36RZmKJCf/Y2tGwzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1NjUwWhcNMjIwNDI4MjEwNjUwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDHYkV28pNQaUkSASFvFtnyEyWvpX2xKdMSsr5zSrBZOru+gibTQrQia2tnngiLgkdC+yuwCR3JGQ5FtaPxYOc0ECO/7h/bXVdnUqfLKi59jCD9qEYUcyqe+kG/WkBlPgRx0T69zToVf6w7ZtnTtOHCZjondpkLen0i9iXiPWVp15+oMx2Qq+GnJzTX9VQKm6R88n+bsMZJ9cgLQqrvtAdHxzoH4x+ZH9IXOfBciKdj+TuUZS++g3iXmFXn0tR41bysdxg8aZIzLVCtjmAHywCcwU0CT/KXq6JDk8N+NsGDcyruPZmLBmEhAizSOCnxlSEBscw3eFNwSNKJA+VtoIxBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTNc7l6Pd/VBUyNAnH5YT1D9UeLZTAdBgNVHQ4EFgQUzXO5ej3f1QVMjQJx+WE9Q/VHi2UwDQYJKoZIhvcNAQELBQADggEBAD3AQ3Pq2tMF4Cbe+5gUV9y9gUMgp7RcmebVEPrBl8yvLldyK4sbI7ufe9L0JugUFmE2yvwQwJqslZK2wOeHDM4nir9WP6lil53+gNlhvUhxekOVuZj6L8dJobkO1Yj0EC3qn90xfXsC46gmIp4R8IAVBz6yIexTXSf5W/kEh837GtGWsCJ+uTiIkb3IWDe1EL9btNyo2JUMrJwMAGiNtUFCf4/Bhr/K1dDXqU5AxzGKK6umUT18PhB1Dr/s+M3iy5eGYgWT9WhcDDrchCRIM9VLuoYK6nD68fJ8GalTfTu5986TA8XibMw4AS3gSLgdlIGz1WVnt+APeXejCGouyGk=","attributes":{"enabled":true,"nbf":1619643410,"exp":1651180010,"created":1619644010,"updated":1619644010,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643964,"updated":1619643964}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending"}}, [
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
  '938034ef-de62-4067-8bae-7ed8a3d7314f',
  'x-ms-request-id',
  '2a022221-56f3-47a7-b4d7-8511a04286b9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:51 GMT',
  'Content-Length',
  '2890'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-","deletedDate":1619644011,"scheduledPurgeDate":1627420011,"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/a8bbdcfeca5c45f088692365c4a8e433","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/a8bbdcfeca5c45f088692365c4a8e433","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/a8bbdcfeca5c45f088692365c4a8e433","x5t":"iyeG6zVOjT9kzLPAhZALuc_mzOI","cer":"MIIDKDCCAhCgAwIBAgIQClfITG36RZmKJCf/Y2tGwzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1NjUwWhcNMjIwNDI4MjEwNjUwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDHYkV28pNQaUkSASFvFtnyEyWvpX2xKdMSsr5zSrBZOru+gibTQrQia2tnngiLgkdC+yuwCR3JGQ5FtaPxYOc0ECO/7h/bXVdnUqfLKi59jCD9qEYUcyqe+kG/WkBlPgRx0T69zToVf6w7ZtnTtOHCZjondpkLen0i9iXiPWVp15+oMx2Qq+GnJzTX9VQKm6R88n+bsMZJ9cgLQqrvtAdHxzoH4x+ZH9IXOfBciKdj+TuUZS++g3iXmFXn0tR41bysdxg8aZIzLVCtjmAHywCcwU0CT/KXq6JDk8N+NsGDcyruPZmLBmEhAizSOCnxlSEBscw3eFNwSNKJA+VtoIxBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTNc7l6Pd/VBUyNAnH5YT1D9UeLZTAdBgNVHQ4EFgQUzXO5ej3f1QVMjQJx+WE9Q/VHi2UwDQYJKoZIhvcNAQELBQADggEBAD3AQ3Pq2tMF4Cbe+5gUV9y9gUMgp7RcmebVEPrBl8yvLldyK4sbI7ufe9L0JugUFmE2yvwQwJqslZK2wOeHDM4nir9WP6lil53+gNlhvUhxekOVuZj6L8dJobkO1Yj0EC3qn90xfXsC46gmIp4R8IAVBz6yIexTXSf5W/kEh837GtGWsCJ+uTiIkb3IWDe1EL9btNyo2JUMrJwMAGiNtUFCf4/Bhr/K1dDXqU5AxzGKK6umUT18PhB1Dr/s+M3iy5eGYgWT9WhcDDrchCRIM9VLuoYK6nD68fJ8GalTfTu5986TA8XibMw4AS3gSLgdlIGz1WVnt+APeXejCGouyGk=","attributes":{"enabled":true,"nbf":1619643410,"exp":1651180010,"created":1619644010,"updated":1619644010,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643964,"updated":1619643964}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending"}}, [
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
  '63c6346b-8e45-437a-bf39-70afe03c31ae',
  'x-ms-request-id',
  '3f94bb1e-0da1-4052-af37-e748e1cb240d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:51 GMT',
  'Content-Length',
  '3150'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f60cb120-d764-48b4-9ee8-a1779c857f73',
  'x-ms-request-id',
  'f214425f-8bac-40c2-aba1-d730f17028c2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a2c5ee63-579d-40e4-920b-ef44f3ece30a',
  'x-ms-request-id',
  'd864ca6a-f4b7-41a2-8ac9-755b8c3324b4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd2020c2a-7c66-4e46-8216-202f3d84bb83',
  'x-ms-request-id',
  'bae22dcf-1bad-4996-8ec8-b78ce53e4bf4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '207a8f6a-eea2-40a5-b599-e1834a5a7b07',
  'x-ms-request-id',
  'd91c4a5a-d601-4dae-983d-460b3abab40f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4e5741d5-56d4-4c0a-973b-fe2aa1c3f711',
  'x-ms-request-id',
  '8b54c1c8-04ac-40a0-a7c4-248bd9c972ad',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b5ee67f7-2eca-413d-9ece-ea5f4948c4f6',
  'x-ms-request-id',
  '39ccd4aa-21f8-450a-be10-fb058f270da6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0b4b4927-f9ea-4d83-a304-cdbee51cd5a8',
  'x-ms-request-id',
  '5b6c9ccd-ca89-4886-b463-798f2f608b22',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a0278f31-61f0-4bde-a60f-3271253a494d',
  'x-ms-request-id',
  'f1c9eac4-87d4-4b2b-866d-74072542829c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1a29c1fe-d933-49f7-a174-4ac2833757c6',
  'x-ms-request-id',
  '2b6e274b-d7a2-473e-834b-c37ee83e0e1d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'eebf8fcd-aaae-47e4-98da-b0afdcb7baf0',
  'x-ms-request-id',
  'a61c6b77-b703-4625-b513-20b87cb95108',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c8fe8a01-1715-4f90-bba8-2090f29c9fc3',
  'x-ms-request-id',
  '09377d2e-8de4-42e7-8c80-86333995d187',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '53b2c226-dbd6-4e5f-8945-56be4b582d88',
  'x-ms-request-id',
  '6cd6af7c-3b3f-4820-b6e3-107937305712',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '168ace05-5df2-4aaf-beb3-4b387ddcff0d',
  'x-ms-request-id',
  '2d371f54-8a43-4939-b98f-43ad901cbaeb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '12a2409b-7a71-4e3a-9b9f-9c9da7b28077',
  'x-ms-request-id',
  '0fb16a24-06dc-4a59-9d52-a519f352a5aa',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd479d239-bd41-4aff-9266-f8e30a389ec3',
  'x-ms-request-id',
  'df6be5fd-c5e9-4b6a-8cb0-aa80a38b0f08',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '80b3f0d5-daa4-4507-b346-f28bff8ee1f8',
  'x-ms-request-id',
  'f0d3a9af-2540-46e6-beb1-88623a00a7e6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '49b9d6e0-0493-4e6a-9d4e-be326e17635b',
  'x-ms-request-id',
  'f72922fb-98a3-410a-bb43-1ad912c2af81',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c630636b-b358-493d-b71c-ee6c6cc69ca0',
  'x-ms-request-id',
  '5814f6b4-fab8-4d9d-93df-5fe20e6431a5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '05244214-244d-4eb4-9c97-8cc8e2d8acfa',
  'x-ms-request-id',
  'f45054d5-23a5-4c1f-9311-4829d34981c3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8e7700f6-c01e-47ef-a81f-90ce15c8fb99',
  'x-ms-request-id',
  'cc4388a3-b8cc-4a47-a2ed-bff3d44ea22e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd696c6c6-7bb0-4a8f-ae6d-db1fde06c652',
  'x-ms-request-id',
  '47724278-7d2e-4593-a15d-d3897c7033bd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8a0ab08b-757f-407a-b0a9-5b9af7faa1f3',
  'x-ms-request-id',
  '9f1a0df3-5c0a-4b6c-9da5-289a137a95a4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6da08785-46a1-4d6d-99b8-4e7bd4e6b22a',
  'x-ms-request-id',
  '100a5037-88d1-446c-80c5-64787db9cf09',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8b83b888-4da3-46be-8591-d28f1ecd97e4',
  'x-ms-request-id',
  '6f3eee0d-2b5e-4965-9a7b-90b92c7f7a5b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '91bfa16b-4194-4edd-a669-8718680ca1df',
  'x-ms-request-id',
  'd2f9ff0d-9b8b-4c98-acf9-7dc669ffe88c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bf619ea8-4cd9-4f15-8372-1edf919a0787',
  'x-ms-request-id',
  '49b6337e-0bed-4c1c-8b93-9e425761d628',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ea65e5f6-4e5d-466a-98e3-a66d2964ebde',
  'x-ms-request-id',
  'd369d357-0972-4000-b049-b1b460f44b56',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'dd24e582-02e2-48ee-8226-e28ceec11026',
  'x-ms-request-id',
  '4610290d-bc46-4518-bb05-e980886362c7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1dcebd39-661f-495c-8a6f-ee4459b2c6c4',
  'x-ms-request-id',
  'c75f1223-dcfc-4a4e-a53d-1acc2ed38d63',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e1534474-096d-4a83-bcef-33fc6010a2c5',
  'x-ms-request-id',
  '7ca8c42e-ab82-4276-b899-c97158e5288a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '44ccf479-9b1a-4568-999c-7bd47bb0efe4',
  'x-ms-request-id',
  'f7fd279a-7726-414c-a4d8-368957bf33a9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2ca93d0e-02b6-4097-8caa-cf89333bf39c',
  'x-ms-request-id',
  '43ef09e0-a8f9-4ffd-99dc-1dc837192d28',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '862d7a43-ac5e-466d-9d9b-f529cd697a75',
  'x-ms-request-id',
  'c9058efa-9ff8-428a-8b15-72acec0f95bd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3798d693-ee34-4863-bbbc-8790165bd0ff',
  'x-ms-request-id',
  '791403b5-3f67-4452-8422-0c6d8d2e125a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f359cd96-7e4d-46d5-8e66-895d8d14c16a',
  'x-ms-request-id',
  '4ac03c5f-1eae-4a9a-9a01-878e574fedc9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4bd62c38-7e5f-48c1-9e26-48e25d10b1e9',
  'x-ms-request-id',
  '8cbc8571-7bc6-41d0-b302-7e8dff38dd67',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-","deletedDate":1619644011,"scheduledPurgeDate":1627420011,"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/a8bbdcfeca5c45f088692365c4a8e433","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/a8bbdcfeca5c45f088692365c4a8e433","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/a8bbdcfeca5c45f088692365c4a8e433","x5t":"iyeG6zVOjT9kzLPAhZALuc_mzOI","cer":"MIIDKDCCAhCgAwIBAgIQClfITG36RZmKJCf/Y2tGwzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1NjUwWhcNMjIwNDI4MjEwNjUwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDHYkV28pNQaUkSASFvFtnyEyWvpX2xKdMSsr5zSrBZOru+gibTQrQia2tnngiLgkdC+yuwCR3JGQ5FtaPxYOc0ECO/7h/bXVdnUqfLKi59jCD9qEYUcyqe+kG/WkBlPgRx0T69zToVf6w7ZtnTtOHCZjondpkLen0i9iXiPWVp15+oMx2Qq+GnJzTX9VQKm6R88n+bsMZJ9cgLQqrvtAdHxzoH4x+ZH9IXOfBciKdj+TuUZS++g3iXmFXn0tR41bysdxg8aZIzLVCtjmAHywCcwU0CT/KXq6JDk8N+NsGDcyruPZmLBmEhAizSOCnxlSEBscw3eFNwSNKJA+VtoIxBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTNc7l6Pd/VBUyNAnH5YT1D9UeLZTAdBgNVHQ4EFgQUzXO5ej3f1QVMjQJx+WE9Q/VHi2UwDQYJKoZIhvcNAQELBQADggEBAD3AQ3Pq2tMF4Cbe+5gUV9y9gUMgp7RcmebVEPrBl8yvLldyK4sbI7ufe9L0JugUFmE2yvwQwJqslZK2wOeHDM4nir9WP6lil53+gNlhvUhxekOVuZj6L8dJobkO1Yj0EC3qn90xfXsC46gmIp4R8IAVBz6yIexTXSf5W/kEh837GtGWsCJ+uTiIkb3IWDe1EL9btNyo2JUMrJwMAGiNtUFCf4/Bhr/K1dDXqU5AxzGKK6umUT18PhB1Dr/s+M3iy5eGYgWT9WhcDDrchCRIM9VLuoYK6nD68fJ8GalTfTu5986TA8XibMw4AS3gSLgdlIGz1WVnt+APeXejCGouyGk=","attributes":{"enabled":true,"nbf":1619643410,"exp":1651180010,"created":1619644010,"updated":1619644010,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643964,"updated":1619643964}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending"}}, [
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
  'd05c3107-319c-42ec-9dd8-8e0c0a71a6dc',
  'x-ms-request-id',
  'b5c7ef45-a3c8-4220-9e06-e27c822ac8e4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:04 GMT',
  'Content-Length',
  '3150'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
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
  '10388558-c4aa-4f00-b8ab-54512a6927c6',
  'x-ms-request-id',
  '084951c3-88b7-4405-b6ea-2a759fd1bb34',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:04 GMT'
]);
