let nock = require('nock');

module.exports.hash = "04659932ba97797359490e52b5d7c8ff";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/create')
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
  'f5b8c7b1-a6eb-4b2d-91b1-ae16696dd0d8',
  'x-ms-request-id',
  '8e8204c1-8e01-4e5a-985f-a72a5e7ea2f9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:20 GMT'
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
  '1d3c3b37-4c9f-4cb6-8a36-c0e8d04adf02',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAALTCG9gOAAAA; expires=Fri, 28-May-2021 21:02:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrO5b1L309UpKFeEhs4y8XT7AjwqiSQy1xaNsOlmy9oVhrdjzqz_0ZhXjtxoM97aBVQr-GcCR0EHBzY4kChuWM0wGrPJL-yB2ByztjoQQNO9Crg44qcWSxuAFhRSQgrBK2XRvCv_SHx1nvtPZfPMAFL6GoLLwv_Lrd_rpsCh1bHJAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:02:20 GMT'
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
  '522341e7-f23f-4c83-b4b9-3f8858130701',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAALTCG9gOAAAA; expires=Fri, 28-May-2021 21:02:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrhj1IZEIJeD-tXslPW_6WokrxW5-w192nMXJAtT3fjafy6KGsSifi8sf1tzN46Wct9g3t49M4zqPlSiorSDf9IyYOrntz_DgUiXw_stxpadTQckGDKEYjXo8p2SZt615a3ec22CWVZTSPV8a2AkLj-ivtdayFbGii2ZXJDsgNxHggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:02:20 GMT'
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
  '522341e7-f23f-4c83-b4b9-3f8860130701',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAAODDG9gOAAAA; expires=Fri, 28-May-2021 21:02:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:02:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending?api-version=7.2&request_id=e6e1fe012c534452967ab8187d040f18',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f5b8c7b1-a6eb-4b2d-91b1-ae16696dd0d8',
  'x-ms-request-id',
  '65a3d244-2dd8-4915-8a83-94e7c53385d2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:20 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '816114cc-9da8-4151-a7dd-bb15fb651a36',
  'x-ms-request-id',
  'e9085afb-3fb2-4662-a0f7-e0c5bd2c3d22',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:20 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  'f2060482-e278-4573-9c39-317e3cbb32f1',
  'x-ms-request-id',
  'b10857a0-fb8c-4f98-b29f-5bcb43d8c19b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:21 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '1ce9bb19-225d-4a7f-adbc-84f312387ce1',
  'x-ms-request-id',
  'b0ec7968-49f8-4113-87da-69c97cb3a6d9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:23 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  'f414dff5-099b-432a-9546-ef63c4bff31f',
  'x-ms-request-id',
  '2ba086f8-bc08-4701-ad4f-7bb8b7e836f8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:26 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '02110dbf-33e3-4b3a-9d26-311e540beab7',
  'x-ms-request-id',
  'ac3a6d8b-a8ab-4d9a-96c8-d8d6abbbc707',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:28 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  'd4e04a3e-ed79-44cf-8af0-3e035b6fd2d6',
  'x-ms-request-id',
  '0808e73b-bbe2-4bf0-8dcf-86bc62e5c2df',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:29 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  'c37f867c-84fc-48da-bcce-f3a0f0f17861',
  'x-ms-request-id',
  '8b7ca258-72d2-41d9-b2ec-1c9e5c42ceb5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:32 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '6268492e-0517-4b23-96d4-aa7ff0926808',
  'x-ms-request-id',
  '52bfb5df-515f-476d-b8cf-e7111b38fcfe',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:33 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '16210a6b-de81-4dc5-a52b-115d1d7b3c97',
  'x-ms-request-id',
  '525d77cf-0550-4da4-b89a-39ec35fcfcfb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:35 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '52a5c294-ff13-4cfa-b358-a539d38025e4',
  'x-ms-request-id',
  '2fade937-00ee-44b7-b51a-f0af7116b9a3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:38 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  'd536d5ad-d99d-4482-8c7e-75f1d8b94592',
  'x-ms-request-id',
  'e87884c9-5c20-4f69-9f78-f5e0471b389e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:40 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '52f14adc-445d-4a8d-aaac-d2bec83a00c2',
  'x-ms-request-id',
  '00d612bc-9a29-489a-b20b-d66286dd3ec6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:42 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '1f9dc1ff-f728-4491-aa27-6702c7e18967',
  'x-ms-request-id',
  '859063ee-edb8-4f9b-8b06-256a27408f95',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:44 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '050d09a7-dda6-4c36-a8e3-c0e46a90999a',
  'x-ms-request-id',
  '9caf167c-d552-4bd2-acfb-ad794fecf514',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:46 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '0c45550d-cbff-4f1b-906e-5b2a6fe53069',
  'x-ms-request-id',
  'e3d6530c-5103-4be7-96c3-e30e6eb6f92f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:48 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '1f89128c-e5d4-4155-9380-824265dee91f',
  'x-ms-request-id',
  '4c8d7f00-809d-4a14-b963-0f234b68b58f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:51 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '901a018c-ce46-4ebc-b6c3-4f60417a2635',
  'x-ms-request-id',
  'b7e6efbb-43aa-4513-9ba9-18ddf484ce64',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:52 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '777a15b6-a412-4c1c-98cb-b18bf5544ba1',
  'x-ms-request-id',
  'a11d1f3c-a4c6-4b3f-96a0-bf857893ef06',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:54 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  'c7e7a421-ef0f-4c0a-9733-6cc1d7be6c13',
  'x-ms-request-id',
  'aaf46396-72cd-43d5-be53-b571406484b3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:56 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '548c012f-2117-459d-894c-3aad222c549f',
  'x-ms-request-id',
  '0acd5bb4-61df-4974-8a11-22c6186e0d73',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:02:59 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '523c2b79-fee8-474f-9233-406dc859992c',
  'x-ms-request-id',
  '860097a8-fd2c-4ac8-8866-be220feb7616',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:01 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  'c3bef5c0-4697-45ad-939c-3be242640bbc',
  'x-ms-request-id',
  'f9275716-0336-4826-bdaf-a88cee56f213',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:03 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '588888c5-2a86-4589-b945-c606f740f1aa',
  'x-ms-request-id',
  '12ca1527-bdb9-4e1e-bc76-0c10bdbfd4d4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:05 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  'f023c5b5-474f-4cf2-b9c0-5c4803da77fb',
  'x-ms-request-id',
  '422ab1b1-8314-4dce-85c8-e2c6175d5278',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:08 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qd5XvimoSlZSMCXQmRggRFOE8as60B8ZEjAjU5csJZpCsHbuj3tgPwLtxCTYb+2GZZZ1GZlbeQ/fspEE4xSeTs23jZ67No3tcpSZ9T6akOtuBdOBA+0leG0S1sszw/ee2RxbQYTa24GfdXBmeDYESpomSGAPJt0Sh9jKR3J5iksoSX5XbdIdurVBWeqV3iFabLyXKKUYizPP4XlI4I1H91q31NYwO4m+qYTwcxymK+0Im3tar4c8lj5W661kCBk7mbt1XVsn6FNEt9FMaGpauDKtwmZ9u0Aq/cUzg4Ea+r8cVkv7pIUvqxUAv7VtkSnUc3CaUTV/vq4GOBk3dinsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABJG9WV+aPQAxGu57QUo7Xndw2HXcbQHcw3RFqSy0htWHUMWY97OXvkQGCK5xeOEGtTXbi5E6Fp9eTQ2H40ZjQGHnOU+R+A6MncnZkCdApwPJY+qCXLNyrBHANrHy58u+KGSzn0pDur3FTpVi8EC8oP5JaRh6eEmsrP8CHkgWkpJx3mk5N9L3AMzQJQOq7YZ/WB6d/0IGYq1TYGYa1f0MU7No0MU9zvOUG1TLmQPmBOQfx7R2Wvk4bIBaR+76rB4NHvKmnN1MxxHYvdiut55WiUjupRXQl2SmJr7lTutgYr1oj0fZEXY+ZBnsQQba1HzCffWGloM/snHgG72rMkD7tc=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-","request_id":"e6e1fe012c534452967ab8187d040f18"}, [
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
  '09269cfe-dab4-40c5-87d9-f133a2c814e0',
  'x-ms-request-id',
  'f91e3cee-cf83-4263-a6c5-207f688f4a5b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:09 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/c3be02708f6547a8a4f54e6c960972b7","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/c3be02708f6547a8a4f54e6c960972b7","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/c3be02708f6547a8a4f54e6c960972b7","x5t":"foEpq0n5qE_FyOA5i2Ec6q0VqQk","cer":"MIIDKDCCAhCgAwIBAgIQGVroWlb8Ts6nkfK6fln48jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1MzA4WhcNMjIwNDI4MjEwMzA4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDmp3le+KahKVlIwJdCZGCBEU4TxqzrQHxkSMCNTlywlmkKwdu6Pe2A/Au3EJNhv7YZllnUZmVt5D9+ykQTjFJ5OzbeNnrs2je1ylJn1PpqQ624F04ED7SV4bRLWyzPD957ZHFtBhNrbgZ91cGZ4NgRKmiZIYA8m3RKH2MpHcnmKSyhJfldt0h26tUFZ6pXeIVpsvJcopRiLM8/heUjgjUf3WrfU1jA7ib6phPBzHKYr7Qibe1qvhzyWPlbrrWQIGTuZu3VdWyfoU0S30Uxoalq4Mq3CZn27QCr9xTODgRr6vxxWS/ukhS+rFQC/tW2RKdRzcJpRNX++rgY4GTd2KexAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR2kU7j97YFlEInSOu2dgEJ/iqNXzAdBgNVHQ4EFgQUdpFO4/e2BZRCJ0jrtnYBCf4qjV8wDQYJKoZIhvcNAQELBQADggEBAAIEdGXnBqvie80txTBAfobRXGTzy4gprdLLoVfZ58XGUQlb6C26JscL3A2nuKdyNTLzj3UE09URDnAdnPabJthK344Jk/OrQUHdT2iK/pKGu0DL64/oGKCE6lbL7js0bcqsLmYgVEYFwAIDLMCiRfdtkOGLblngWB5CtnGefSs3i3f+0ZFFZja3tDevUp+XlQz/7NI2b2MogH4U2um9jRN8I/mwPiZFa83fG6gCAI1f35SQ6RGAkwA9Z4CdPiMu60K3RsDWv3UGJpUlS9kBhMf5ftg4nTk1eCzQ9LX47WZsEFH8doS5O6ulP3Ncf/BO6i3pOR6xKsj3pQ/EK/zxr00=","attributes":{"enabled":true,"nbf":1619643188,"exp":1651179788,"created":1619643788,"updated":1619643788,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643741,"updated":1619643741}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending"}}, [
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
  'eb641838-6fcb-4820-97ce-0e72ef2007e4',
  'x-ms-request-id',
  'f36514bb-cb19-48d0-a5d8-6c28d0691aac',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:10 GMT',
  'Content-Length',
  '2655'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-","deletedDate":1619643790,"scheduledPurgeDate":1627419790,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/c3be02708f6547a8a4f54e6c960972b7","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/c3be02708f6547a8a4f54e6c960972b7","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/c3be02708f6547a8a4f54e6c960972b7","x5t":"foEpq0n5qE_FyOA5i2Ec6q0VqQk","cer":"MIIDKDCCAhCgAwIBAgIQGVroWlb8Ts6nkfK6fln48jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1MzA4WhcNMjIwNDI4MjEwMzA4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDmp3le+KahKVlIwJdCZGCBEU4TxqzrQHxkSMCNTlywlmkKwdu6Pe2A/Au3EJNhv7YZllnUZmVt5D9+ykQTjFJ5OzbeNnrs2je1ylJn1PpqQ624F04ED7SV4bRLWyzPD957ZHFtBhNrbgZ91cGZ4NgRKmiZIYA8m3RKH2MpHcnmKSyhJfldt0h26tUFZ6pXeIVpsvJcopRiLM8/heUjgjUf3WrfU1jA7ib6phPBzHKYr7Qibe1qvhzyWPlbrrWQIGTuZu3VdWyfoU0S30Uxoalq4Mq3CZn27QCr9xTODgRr6vxxWS/ukhS+rFQC/tW2RKdRzcJpRNX++rgY4GTd2KexAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR2kU7j97YFlEInSOu2dgEJ/iqNXzAdBgNVHQ4EFgQUdpFO4/e2BZRCJ0jrtnYBCf4qjV8wDQYJKoZIhvcNAQELBQADggEBAAIEdGXnBqvie80txTBAfobRXGTzy4gprdLLoVfZ58XGUQlb6C26JscL3A2nuKdyNTLzj3UE09URDnAdnPabJthK344Jk/OrQUHdT2iK/pKGu0DL64/oGKCE6lbL7js0bcqsLmYgVEYFwAIDLMCiRfdtkOGLblngWB5CtnGefSs3i3f+0ZFFZja3tDevUp+XlQz/7NI2b2MogH4U2um9jRN8I/mwPiZFa83fG6gCAI1f35SQ6RGAkwA9Z4CdPiMu60K3RsDWv3UGJpUlS9kBhMf5ftg4nTk1eCzQ9LX47WZsEFH8doS5O6ulP3Ncf/BO6i3pOR6xKsj3pQ/EK/zxr00=","attributes":{"enabled":true,"nbf":1619643188,"exp":1651179788,"created":1619643788,"updated":1619643788,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643741,"updated":1619643741}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending"}}, [
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
  '81c4ef9c-338f-4f5b-9be0-7292491c4767',
  'x-ms-request-id',
  '78e94c9d-89e2-413c-8644-8c07d5165a23',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:10 GMT',
  'Content-Length',
  '2868'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '12be27fe-d8bd-4660-8ebd-d10a664ef84e',
  'x-ms-request-id',
  'fb9c585e-dbe2-4d59-a328-70c74e682090',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '6e82794c-6a0d-44f8-98ba-d5d19dc77ebd',
  'x-ms-request-id',
  '852e2fc0-02c7-4fe7-b5a4-7571277a5ba3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '6cc7b6ce-e4a7-452c-be58-e98e5024228d',
  'x-ms-request-id',
  '77cfe288-f183-4afa-877c-b47a23e2a79b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '5c3f6334-7598-46f3-b39c-324d18f626c4',
  'x-ms-request-id',
  '9eb935ad-917a-44d9-8989-627009abf24b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  'c74a0f09-82b7-4130-9daa-95055053c8e3',
  'x-ms-request-id',
  'f9144a49-85d3-4762-9dda-edbbd60a200d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '4f73d370-a5c8-4f0a-9077-704ed1560661',
  'x-ms-request-id',
  '6ddfc59e-982d-4a87-8a0f-790081f771de',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '2f93495b-b231-43f5-bfae-f3f7b9cb72f2',
  'x-ms-request-id',
  '16175a6a-f667-4643-8682-988a5f1b6ba0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '13defb21-3184-4b65-993b-1e669c33c4cc',
  'x-ms-request-id',
  '55a16b91-ccdb-4d63-ba36-890013c2ec1d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '7ba7b864-f400-4d29-afff-2673f64dac6e',
  'x-ms-request-id',
  '80ea2363-13f8-4aa7-9693-3fb93876370d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '92febe25-3468-4aa1-bc6b-341357b713e0',
  'x-ms-request-id',
  'f7fcde21-7112-41bf-beb0-86fa02ebbdfe',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '3d25f122-a67e-4805-9b4b-7d8b9e7e0179',
  'x-ms-request-id',
  '64b28075-ffbe-4244-8017-d4a96b324818',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '6fbb4200-24c9-4c6c-a9e5-62aa226103cf',
  'x-ms-request-id',
  '16d8a505-42ae-4d6a-92f2-5b5636c37744',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  'e3e380e9-2b33-4c9a-b872-be3983bba3ef',
  'x-ms-request-id',
  '73ede3a9-c796-4e87-9fc9-3a2cfb46cffd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '58e4c716-3f34-4ad8-ab1f-1f9bd06f5c8d',
  'x-ms-request-id',
  '44697e9a-b27a-4a08-a157-5ccdfdb9aab0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '0eff562b-ffcd-45b1-a0da-a63f8607b39e',
  'x-ms-request-id',
  'b3be74fb-0daa-4f60-9aed-94149bec9ee6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '9d2152f9-0d98-4017-a5ad-ebc28320cf20',
  'x-ms-request-id',
  '23977f66-ed30-440c-a21a-0af490c667b0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '07824593-6d8f-4774-b721-b0f4536e7325',
  'x-ms-request-id',
  'ff462509-6891-4715-aa02-6ccd33aaf28f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '7dce49b4-8f5a-43e5-adca-8d6e815dd758',
  'x-ms-request-id',
  '4167a91d-4006-430d-81f2-d17fbfa149d8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '1427430a-5e29-48b4-b975-8b6907c19807',
  'x-ms-request-id',
  'f6c9a373-8735-48cf-89aa-b3991767f457',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  '8e7f9b6e-6f8d-487e-b042-6c37517dc2f5',
  'x-ms-request-id',
  '82a45464-e39f-4374-9da3-d72d3db7a80e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  'c5048a5e-d5a4-4fcd-bdf8-1a8158465986',
  'x-ms-request-id',
  'c3ad2fc7-4ceb-4877-945c-234196e44767',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
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
  'd087ad99-a841-42c9-ab5f-0a4b87da982e',
  'x-ms-request-id',
  'ac9dfa78-c33b-4348-b337-27564d95b516',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-","deletedDate":1619643790,"scheduledPurgeDate":1627419790,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/c3be02708f6547a8a4f54e6c960972b7","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/c3be02708f6547a8a4f54e6c960972b7","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/c3be02708f6547a8a4f54e6c960972b7","x5t":"foEpq0n5qE_FyOA5i2Ec6q0VqQk","cer":"MIIDKDCCAhCgAwIBAgIQGVroWlb8Ts6nkfK6fln48jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1MzA4WhcNMjIwNDI4MjEwMzA4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDmp3le+KahKVlIwJdCZGCBEU4TxqzrQHxkSMCNTlywlmkKwdu6Pe2A/Au3EJNhv7YZllnUZmVt5D9+ykQTjFJ5OzbeNnrs2je1ylJn1PpqQ624F04ED7SV4bRLWyzPD957ZHFtBhNrbgZ91cGZ4NgRKmiZIYA8m3RKH2MpHcnmKSyhJfldt0h26tUFZ6pXeIVpsvJcopRiLM8/heUjgjUf3WrfU1jA7ib6phPBzHKYr7Qibe1qvhzyWPlbrrWQIGTuZu3VdWyfoU0S30Uxoalq4Mq3CZn27QCr9xTODgRr6vxxWS/ukhS+rFQC/tW2RKdRzcJpRNX++rgY4GTd2KexAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR2kU7j97YFlEInSOu2dgEJ/iqNXzAdBgNVHQ4EFgQUdpFO4/e2BZRCJ0jrtnYBCf4qjV8wDQYJKoZIhvcNAQELBQADggEBAAIEdGXnBqvie80txTBAfobRXGTzy4gprdLLoVfZ58XGUQlb6C26JscL3A2nuKdyNTLzj3UE09URDnAdnPabJthK344Jk/OrQUHdT2iK/pKGu0DL64/oGKCE6lbL7js0bcqsLmYgVEYFwAIDLMCiRfdtkOGLblngWB5CtnGefSs3i3f+0ZFFZja3tDevUp+XlQz/7NI2b2MogH4U2um9jRN8I/mwPiZFa83fG6gCAI1f35SQ6RGAkwA9Z4CdPiMu60K3RsDWv3UGJpUlS9kBhMf5ftg4nTk1eCzQ9LX47WZsEFH8doS5O6ulP3Ncf/BO6i3pOR6xKsj3pQ/EK/zxr00=","attributes":{"enabled":true,"nbf":1619643188,"exp":1651179788,"created":1619643788,"updated":1619643788,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643741,"updated":1619643741}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending"}}, [
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
  '2778ad03-630a-409b-b683-d28801d9489b',
  'x-ms-request-id',
  'a48746ce-f159-434b-be80-8dfffb4e90d1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:54 GMT',
  'Content-Length',
  '2868'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-","deletedDate":1619643790,"scheduledPurgeDate":1627419790,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/c3be02708f6547a8a4f54e6c960972b7","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/c3be02708f6547a8a4f54e6c960972b7","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/c3be02708f6547a8a4f54e6c960972b7","x5t":"foEpq0n5qE_FyOA5i2Ec6q0VqQk","cer":"MIIDKDCCAhCgAwIBAgIQGVroWlb8Ts6nkfK6fln48jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1MzA4WhcNMjIwNDI4MjEwMzA4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDmp3le+KahKVlIwJdCZGCBEU4TxqzrQHxkSMCNTlywlmkKwdu6Pe2A/Au3EJNhv7YZllnUZmVt5D9+ykQTjFJ5OzbeNnrs2je1ylJn1PpqQ624F04ED7SV4bRLWyzPD957ZHFtBhNrbgZ91cGZ4NgRKmiZIYA8m3RKH2MpHcnmKSyhJfldt0h26tUFZ6pXeIVpsvJcopRiLM8/heUjgjUf3WrfU1jA7ib6phPBzHKYr7Qibe1qvhzyWPlbrrWQIGTuZu3VdWyfoU0S30Uxoalq4Mq3CZn27QCr9xTODgRr6vxxWS/ukhS+rFQC/tW2RKdRzcJpRNX++rgY4GTd2KexAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR2kU7j97YFlEInSOu2dgEJ/iqNXzAdBgNVHQ4EFgQUdpFO4/e2BZRCJ0jrtnYBCf4qjV8wDQYJKoZIhvcNAQELBQADggEBAAIEdGXnBqvie80txTBAfobRXGTzy4gprdLLoVfZ58XGUQlb6C26JscL3A2nuKdyNTLzj3UE09URDnAdnPabJthK344Jk/OrQUHdT2iK/pKGu0DL64/oGKCE6lbL7js0bcqsLmYgVEYFwAIDLMCiRfdtkOGLblngWB5CtnGefSs3i3f+0ZFFZja3tDevUp+XlQz/7NI2b2MogH4U2um9jRN8I/mwPiZFa83fG6gCAI1f35SQ6RGAkwA9Z4CdPiMu60K3RsDWv3UGJpUlS9kBhMf5ftg4nTk1eCzQ9LX47WZsEFH8doS5O6ulP3Ncf/BO6i3pOR6xKsj3pQ/EK/zxr00=","attributes":{"enabled":true,"nbf":1619643188,"exp":1651179788,"created":1619643788,"updated":1619643788,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643741,"updated":1619643741}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending"}}, [
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
  'b84a368a-2600-41c2-8d6e-09b6f996bc7b',
  'x-ms-request-id',
  'cf4fe770-d384-4acf-9fbd-dbe6a9b8e9dc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:55 GMT',
  'Content-Length',
  '2868'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
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
  'b208f8ea-dbfb-4b55-b803-30d9ef984698',
  'x-ms-request-id',
  '877bd228-5a04-489d-ba86-2ef8fc9dec6a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:54 GMT'
]);
