let nock = require('nock');

module.exports.hash = "9231853b28075536de8fdcf5b1266b19";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/create')
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
  'a66b72de-e5c2-4f35-8792-176ae5c635b0',
  'x-ms-request-id',
  'c169566e-6811-48d6-b6d9-b48a9ab2505b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:27 GMT'
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
  '714f5301-1f89-4b60-b762-79d877124f01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAAIC6G9gOAAAA; expires=Fri, 28-May-2021 20:20:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDiN069vb5oqXBY1HDVroHqwQrRTuMohqQawR9Pd-h0MUu7jqOMOm57ygpgLyTA4K3571e9_go60G9zglYxgtuXI2nYE3NHNsxodOgAYrQD7bWbkkxlN9mD8TcfMseDuIkngvD7KFw-6oO0kDJKI7HJjmuVfx1dUvBHS58dNeM4EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:20:26 GMT',
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
  'e256b059-f58d-4474-8d03-3c535e332801',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAAIC6G9gOAAAA; expires=Fri, 28-May-2021 20:20:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEK5Ny9KQALeQoLvt3bMdZ7NdSLr138MWXwOv3TRYimsXV5uvA7zbWh-6QvQnk7fW7f7hXxmvtriFaJlH1gHwJiDw_Ac87mxjo3kOWy31wjNHoGTHp__NfCNwIdeF2S-L0QthVe27mcYRRmegSELYeh4Ul1WAoR9qZR0fQ5XvdC0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:20:26 GMT',
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
  'd38a8af8-3653-47f2-9276-25b0e6dc0c01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAIC6G9gOAAAA; expires=Fri, 28-May-2021 20:20:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:20:27 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwzhpLKorHcYBbHezB6E6VEG3B7Y+cme1I4Ud65rU3Fj1lxVbloeXumgits+BZ3GAXmJBH57geYobmEj72jKaKvlTkGLuBrdiSxaDU8sDmlNyShyT1Z9nUPZq4EFuHHXeCI1EPXwahi3aIvnXLstgZRgFwb3EKDf9mSgP+pOPiPODcaOjNC1jbC5yJ1za22ZgmfE2HtY84oRefHMqzpgf7rIDG/u0mVkKdIXY63ZdlCNDnfkPlys05SU+moG/5KMzZ3oVzzMDFFsbR6phzIurZsOnSp3sG6xRL7PPti42fPiUusMmN6VeUYwXuUkBL+MA9MPJ+XRduuiIpwBihI6FTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGmfSib5ERdu5covQFBpWSOR2FTn1QW9GXh7G49hVwYFQnsXwlbli1/KqZ1yLPhSoSr0P0+91Hx7HO4s9GnlfHfHSPM+aEXPsifuhGcMuPJYLCsYVh/aL77R7nHs4aA8xpA3j3M3ts9j2mcVjgiypQ4rLYNeZgnOZYawS76OJK6V5NZbpCYruKp2SORtBBBSGnABseibqMwAR+DIANvFDSHQvy6DG3KW02gR7YsKue7gITNsFiW9P8RCF/z41kkpL9Cgj8bFJ3VFI8fozb0dy4OSni/9yRXCUUTGOBMINbDLy0fyohwib0ZRRHNMz+XX6QuExBaC/T35dcYEUWJXu9U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f60c1e4f318c4a418603936cc66dfb48"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/pending?api-version=7.2&request_id=f60c1e4f318c4a418603936cc66dfb48',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a66b72de-e5c2-4f35-8792-176ae5c635b0',
  'x-ms-request-id',
  '5aaed88c-58c7-40f5-8d31-0818f50a9292',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:28 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwzhpLKorHcYBbHezB6E6VEG3B7Y+cme1I4Ud65rU3Fj1lxVbloeXumgits+BZ3GAXmJBH57geYobmEj72jKaKvlTkGLuBrdiSxaDU8sDmlNyShyT1Z9nUPZq4EFuHHXeCI1EPXwahi3aIvnXLstgZRgFwb3EKDf9mSgP+pOPiPODcaOjNC1jbC5yJ1za22ZgmfE2HtY84oRefHMqzpgf7rIDG/u0mVkKdIXY63ZdlCNDnfkPlys05SU+moG/5KMzZ3oVzzMDFFsbR6phzIurZsOnSp3sG6xRL7PPti42fPiUusMmN6VeUYwXuUkBL+MA9MPJ+XRduuiIpwBihI6FTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGmfSib5ERdu5covQFBpWSOR2FTn1QW9GXh7G49hVwYFQnsXwlbli1/KqZ1yLPhSoSr0P0+91Hx7HO4s9GnlfHfHSPM+aEXPsifuhGcMuPJYLCsYVh/aL77R7nHs4aA8xpA3j3M3ts9j2mcVjgiypQ4rLYNeZgnOZYawS76OJK6V5NZbpCYruKp2SORtBBBSGnABseibqMwAR+DIANvFDSHQvy6DG3KW02gR7YsKue7gITNsFiW9P8RCF/z41kkpL9Cgj8bFJ3VFI8fozb0dy4OSni/9yRXCUUTGOBMINbDLy0fyohwib0ZRRHNMz+XX6QuExBaC/T35dcYEUWJXu9U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f60c1e4f318c4a418603936cc66dfb48"}, [
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
  '37d3e2a2-508b-4b64-bbcf-d406e55af885',
  'x-ms-request-id',
  'bfb0c76c-df6e-4840-a261-d54e2650a228',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:28 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/', {"attributes":{},"tags":{"customTag":"value"}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/0683f49060cd4deba6f9f3389b2d5f86","attributes":{"enabled":false,"nbf":1619640628,"exp":1651177228,"created":1619641228,"updated":1619641228,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641228,"updated":1619641228}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/pending"}}, [
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
  '6a10de0d-89cf-47e5-a81b-355ee438f015',
  'x-ms-request-id',
  '66ac699a-dcd1-41e0-9a99-2df6baf082d0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:28 GMT',
  'Content-Length',
  '1189'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/0683f49060cd4deba6f9f3389b2d5f86","attributes":{"enabled":false,"nbf":1619640628,"exp":1651177228,"created":1619641228,"updated":1619641228,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641228,"updated":1619641228}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/pending"}}, [
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
  '323f44cf-5f2d-4fef-874e-4d60409bed54',
  'x-ms-request-id',
  'a9f41851-0348-49cd-82cb-77003767bc56',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:28 GMT',
  'Content-Length',
  '1189'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-","deletedDate":1619641229,"scheduledPurgeDate":1627417229,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/0683f49060cd4deba6f9f3389b2d5f86","attributes":{"enabled":false,"nbf":1619640628,"exp":1651177228,"created":1619641228,"updated":1619641228,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641228,"updated":1619641228}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/pending"}}, [
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
  '15e22242-0cdf-4d43-a25f-526d0cfabd68',
  'x-ms-request-id',
  '167f385a-b5d0-4b6a-8a25-3c40878ee41a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:29 GMT',
  'Content-Length',
  '1392'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f975ab1e-d770-4230-ba02-4dd83db7530d',
  'x-ms-request-id',
  'ee62b1d8-4452-4ae2-a303-c087531a3a50',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7c4a1782-36b1-4328-835f-a00425d649e0',
  'x-ms-request-id',
  'bd5925f5-e1fa-49e4-8f2d-e09287e08b77',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5cde467f-ab00-4d87-b2b3-ac4a5c5b60f9',
  'x-ms-request-id',
  '8979195f-70e5-40b9-ab62-274444229854',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5a866b00-f453-4090-8b12-15da25055aeb',
  'x-ms-request-id',
  '3b0519b3-c6fc-4d84-9e73-44180b56bc2d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4724b7b4-fba8-4533-9910-db2cfc6e3778',
  'x-ms-request-id',
  '0ba99a23-691e-4c6b-9294-739660fd9e89',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '10c4f3f1-5543-46ca-b5bc-addedeb358a9',
  'x-ms-request-id',
  '75edd4bb-1324-4524-a63f-381fe3dc19af',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '32ce24b9-21e0-4e3a-bf47-ffe099d41dd3',
  'x-ms-request-id',
  '24609d35-4044-4c78-9b3e-1c2716bf2fc0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c99e6084-4464-494b-875d-75eb12655bd0',
  'x-ms-request-id',
  '79c12d34-42a5-446f-bea1-99cf13a8d04c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9b6899a1-1d24-43a2-9167-76ed7dbe5824',
  'x-ms-request-id',
  '2cd7d496-3b41-4142-beae-375c012c4d33',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9107bb74-c304-4670-9027-7c402aae5a44',
  'x-ms-request-id',
  '99d4b4b7-898e-4589-a7fc-3b20aaa5d49d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f2d17c04-55de-46c6-a6c9-bb8713d5cc16',
  'x-ms-request-id',
  'acceef98-c54e-4555-af9f-2fcced779d1f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '363fdbfb-a778-4e2a-832f-a880a0c8b761',
  'x-ms-request-id',
  '051528ff-d95f-4120-b740-0558691be538',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1e6357ad-c01e-437d-9865-7ed815de2b99',
  'x-ms-request-id',
  '3f3bcc6a-e9ab-4419-84b0-f091f8d2be6a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e9c4c172-7a45-4128-af1e-90345d2d0fdd',
  'x-ms-request-id',
  'ce99a1b1-e49d-46cb-9ddb-2d667521a537',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1daf8dbe-dd1b-43e3-9168-bc412ed4ab96',
  'x-ms-request-id',
  '7b49d6cb-cd39-453c-9962-d38ea5e4326e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '549c137e-faec-4ee8-9594-389e52d7564a',
  'x-ms-request-id',
  '10f967df-a942-48f2-9641-b28cce3bb991',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:20:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '77667492-04b8-43e0-b1fc-412298a36c68',
  'x-ms-request-id',
  'cb89adf0-c3db-430d-96cd-307c61947a52',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e011b33c-ac00-41f4-b924-0ec6e90828ce',
  'x-ms-request-id',
  '2b26a5b8-1245-4f60-89e9-d05d057eefca',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6af8fe26-2643-456c-9dba-0cebcfc6f5dc',
  'x-ms-request-id',
  '820cb2fa-7125-4625-ba32-5b4bd8221a86',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ced87a48-3a9e-4964-9700-412b13014236',
  'x-ms-request-id',
  '451c368f-77ba-436c-9028-86196190d1d8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c4c36ff9-2571-4a32-a73c-761dc77d5c82',
  'x-ms-request-id',
  '8ad1f4d0-12cf-4280-978e-dd70db289dba',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7ceeb5d8-e98d-469b-9448-e0187bfd2946',
  'x-ms-request-id',
  'c65fa29f-cc27-44d5-b989-6fc7ff097a5a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '669fb559-91bb-4bad-82ec-4dc971d633ae',
  'x-ms-request-id',
  '5f2bd825-ba9e-43ab-8c89-9fea523e154b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1181de44-5bad-46ab-be0e-ac9a9dc47b46',
  'x-ms-request-id',
  '4aee62d1-38c7-4ac7-b9d0-64a211dda927',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd3d0e82c-962c-4cbf-a414-4e2c69b35618',
  'x-ms-request-id',
  'ab8cf83f-ad29-4c23-bac5-e89b8fa2b4b3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '40fc6d7a-22aa-4909-ab04-7c5d6c5c1f5f',
  'x-ms-request-id',
  '28684575-70ac-4277-994e-aa9912703fa4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '15e6ecd2-a6e5-4585-8a5a-173bd0fcf0d5',
  'x-ms-request-id',
  '24e362e4-3ce9-4324-a142-36da8e054b13',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '11e027c8-0d2a-430a-ac3f-2abdb2036f5b',
  'x-ms-request-id',
  'f2c85984-2e01-49d7-a891-a21d953cc7f1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a6a5f4f9-d99a-4d52-8a5d-4baf773cfe28',
  'x-ms-request-id',
  '23fe0535-bf5e-42a8-a384-17ab86fbe0f4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '15e4c73d-8d60-4c9b-b2fc-c2ab90e254d4',
  'x-ms-request-id',
  '883fc0c4-a9aa-447b-a078-01266faae950',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5c6044d4-adf2-4825-9f9c-7e2e7b480a6e',
  'x-ms-request-id',
  'fa95e15c-a4a8-49a5-8532-7e9a862ba4be',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'de6c13f3-8c9e-4503-9a70-76485fc75335',
  'x-ms-request-id',
  '3ee03d55-35c1-4227-81cd-3f6d7c7f40a5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd29de287-0e82-46f1-b43b-f11cf6e13947',
  'x-ms-request-id',
  '91087973-c549-4a39-a4b1-d0d55540f58e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b3b03a89-ccb3-439c-9aec-0a4977928e13',
  'x-ms-request-id',
  'acfa9758-250c-43c5-bf73-59fbb50b0163',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '695e52a6-7499-42d8-b681-cd5c0223b69b',
  'x-ms-request-id',
  'b7254850-22b6-4f85-a248-6bce1124ef0a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '695056ce-ede4-44c8-887c-e79119017418',
  'x-ms-request-id',
  '9b7f07a4-ad9b-476f-8491-5f2fe6e464f1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '260822ae-5c5b-43e3-a25d-bdfc05838092',
  'x-ms-request-id',
  '4a948c70-60aa-4773-a232-931169fa746e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '44191a09-4756-4f79-96e5-c0a900722aac',
  'x-ms-request-id',
  '4076fa4c-3aea-4bb0-9b0d-9a145d67b1c2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'edd3774d-c21d-4bc9-a929-03977f6d0518',
  'x-ms-request-id',
  'dd566974-b07b-45cb-9fbb-66b8aa629d93',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a0f5fddb-37c2-423d-92b4-c19010d946a3',
  'x-ms-request-id',
  '57601b2a-3b3d-4262-9097-232751188444',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-","deletedDate":1619641229,"scheduledPurgeDate":1627417229,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/0683f49060cd4deba6f9f3389b2d5f86","attributes":{"enabled":false,"nbf":1619640628,"exp":1651177228,"created":1619641228,"updated":1619641228,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641228,"updated":1619641228}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-/pending"}}, [
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
  'd57bef90-9ecb-4c4a-9941-09ec6a75c177',
  'x-ms-request-id',
  'fe94505c-f77d-45b7-9e03-6d874079957c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:51 GMT',
  'Content-Length',
  '1392'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-')
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
  'cf61fcf8-7b2d-420b-bbc9-c751ddb98e37',
  'x-ms-request-id',
  'ed7102e2-2e36-4af2-8e94-856d418e3390',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:51 GMT'
]);
