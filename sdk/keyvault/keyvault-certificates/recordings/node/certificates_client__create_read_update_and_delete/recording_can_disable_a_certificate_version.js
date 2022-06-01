let nock = require('nock');

module.exports.hash = "2dc76af00f0857f1d4f81f1f16cc639b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candisableacertificateversion-/create')
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
  'd515acac-e984-4547-8518-418b73f1b52f',
  'x-ms-request-id',
  '8f0c98de-b2e1-409a-87e0-9f6a809c4afb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:35 GMT'
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
  '40d23407-6757-4a36-8779-38263fe32202',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAIC6G9gOAAAA; expires=Fri, 28-May-2021 20:23:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrHb6xVb4B59xwYVpPV64jqnoP_uHtVnSDtdgl_0HD7oz6lJ0_fdaFxBxRZwJLpUgnDUPgA3_inmktw9H4mGy6W8ys8FRGh5h3iK8SxuH9Q701VT-ZGQvMZWHp40mbfnrZUZgboHjdfvIAkcWEn-JCJPYZlsOa3kfWr37lOYmN06AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:23:36 GMT'
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
  'a26f508e-f64b-4c9e-98b8-dbb7b6821901',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAIC6G9gOAAAA; expires=Fri, 28-May-2021 20:23:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2XJN1HTt9ftr6LdHONRsnto78ecivE7IZ0RGhgb_PUAHgAH_hZGIZ_6dVBKV-jo8sIKCA0-QkTJbh3gCgASKEIXrNu10CJQ1SXLnKY0b6KFDHJeaMB9g6nW2vvbcnnCosubMupZJptNvRxfhSfkgkRPcUm6nCImOoHHvv6J-UfwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:23:36 GMT'
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
  'd38a8af8-3653-47f2-9276-25b0a71d0d01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAIC6G9gOAAAA; expires=Fri, 28-May-2021 20:23:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:23:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candisableacertificateversion-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending?api-version=7.2&request_id=efa360e527ed4c3bb25a1620032b4a5d',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd515acac-e984-4547-8518-418b73f1b52f',
  'x-ms-request-id',
  '45bf866f-c32e-49ca-86ed-ceb727723809',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:36 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  'cdaa59bb-ee35-4556-80cf-1525b7cfbfa8',
  'x-ms-request-id',
  '89f71da8-f65e-483d-8532-f7161148080c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:36 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '73401e80-d7aa-4b21-98a4-be04f0d614e1',
  'x-ms-request-id',
  '23a4dfdf-0b3f-4e32-96ae-48dc4bcba0d6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:36 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '616cde21-8bb1-46ee-88b8-d6bae7080742',
  'x-ms-request-id',
  '8358cc00-5db5-415f-b524-543fc5010209',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:38 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '60fde114-2fe5-4f1c-adb5-6ac08cb34fb6',
  'x-ms-request-id',
  'e457d44e-adc6-40a3-b7cb-8c2261c72afd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:41 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '34ee0218-cfaf-42c0-a89c-92ddbe912a0e',
  'x-ms-request-id',
  '5f1da48b-bb24-4c08-b6d5-1ea2679374c3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:43 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '729fafc0-b007-425e-a887-0785f93fe071',
  'x-ms-request-id',
  '5e8c81a7-031a-4212-a302-2c89c68b0189',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:45 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  'c7987af7-d7e7-4624-a3c8-0687c5e6a3be',
  'x-ms-request-id',
  '2eb6ead1-b2e6-4aed-8c82-2373940260f0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:48 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  'f22b83c7-c476-4aa2-80e8-b49309a01d09',
  'x-ms-request-id',
  'e04ed19e-68e5-493a-862d-89f382ac545a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:49 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '35c58332-f9e3-4fca-9ea0-a9b16e078392',
  'x-ms-request-id',
  '5a3d638b-9c90-48b1-97af-c8d1e528d22d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:51 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '935ab924-9276-49c9-bfe9-587c15cfaf4f',
  'x-ms-request-id',
  '98937d39-fa32-4ca9-b365-06a38bb93c5b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:53 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '1c82f9ef-8964-4d3f-b065-0545ed59279e',
  'x-ms-request-id',
  '7dee1324-c77c-440d-bb75-4ee05eaebfdb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:55 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  'e6d8f4bc-3e68-4d36-b510-eb157420b520',
  'x-ms-request-id',
  'b91ce96e-4ace-44e6-b123-b82596697184',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:57 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '2ee3dbbd-989c-41fb-86e3-65f2f0d1abeb',
  'x-ms-request-id',
  '801e0d8f-0ac2-4969-b7f8-ea3164fd987c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:59 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '3ddfeee1-f567-49ff-ae79-e1e4eef557d0',
  'x-ms-request-id',
  '2157c083-692c-4df9-b4d8-56991393c240',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:02 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '2b270515-7326-42e5-9128-105f85b3461f',
  'x-ms-request-id',
  'ea6acc78-f9b7-41bc-bb0e-12d1a3c7d4c5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:04 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '2fc9731d-8548-485e-9702-c6bf7d134876',
  'x-ms-request-id',
  '877a11d3-ba02-4c0a-8925-27804b2ae51e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:06 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  'd2c13b14-565a-4145-8973-a2bfea7d3e8a',
  'x-ms-request-id',
  '7c224518-4cdc-40e7-8762-1bf6b99ad86c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:08 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/WubQ3OC5jK7qd8QmJfSMz/BlcUkzsnCTPgtXa5u7xNx08bKoCMmgqOoycfIPLf+6nH0/6MhgIYN9sXRVPMDVS2b5Aj/6mkTp9qXQgAwm7VTIf5I01FfxP+6pkIDx9aQs1Gm+3UCTGy92uVHZWa4JQe5jC1YDjMxWPpP2XiKVc+FZXiUXaIoLWoayB/oKFtRkspl+qoG6cMJwQVP4ecFrSd0azD7IofPvQuLQKdda5TW4FYTyN32utWe/wRXAQp+jtuPt0MUN26TESeEG4EJJPEjZeRmyDzUwz4wJcaxRfWeXy6ynHJmMhUKQmPD7ghXr3/B0Wzrvi5ccTZOmjaUQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJMd+V8ji/ipNCTkhxYNTvi0j8Se5/nymvYrW1+bny0LMyVFAcuBZ8oMrha6xujnb+yWBHGeaa8VD5R6V0GhTShRe1nC4VNaohEOcyWlMJAfEOYTV3R3WMAsh8DgZfWUSE3omxfb0UMzUKEOAIl6U355U+wh+aENJdxa+Ovzozu0HvDEmbUDU+n2qB6IZgzSo8ZFDDccjj15evfE1sL/HQ8gYZYJxjDkmfbTiwtEaVo41NdloUz8CZDqP8VkezmGvdCscZ40XS5XlLwRq7hNXKK32KGx8mxk8IoUILPfv/Gp4L+0vjC8Yudpwn43qRxYcee45Y7fRp9Ize1Orf6Rqw=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-","request_id":"efa360e527ed4c3bb25a1620032b4a5d"}, [
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
  '294a17c0-4364-47f3-9e4e-401f5834f3d5',
  'x-ms-request-id',
  'a80baf52-a70e-489a-83a6-8804ce11ac2f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:10 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","x5t":"fGmbQxFfsjtNtMgEXiq8p9E-zDY","cer":"MIIDKDCCAhCgAwIBAgIQFl2QpyJIQR+TxuuaI1cQ5DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxNDA5WhcNMjIwNDI4MjAyNDA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCn9a5tDc4LmMrup3xCYl9IzP8GVxSTOycJM+C1drm7vE3HTxsqgIyaCo6jJx8g8t/7qcfT/oyGAhg32xdFU8wNVLZvkCP/qaROn2pdCADCbtVMh/kjTUV/E/7qmQgPH1pCzUab7dQJMbL3a5UdlZrglB7mMLVgOMzFY+k/ZeIpVz4VleJRdoigtahrIH+goW1GSymX6qgbpwwnBBU/h5wWtJ3RrMPsih8+9C4tAp11rlNbgVhPI3fa61Z7/BFcBCn6O24+3QxQ3bpMRJ4QbgQkk8SNl5GbIPNTDPjAlxrFF9Z5fLrKccmYyFQpCY8PuCFevf8HRbOu+LlxxNk6aNpRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQYoZsOzYfPx8NhROAnHlSavTziZzAdBgNVHQ4EFgQUGKGbDs2Hz8fDYUTgJx5Umr084mcwDQYJKoZIhvcNAQELBQADggEBAFub+Yo2x613dpJQ205ukCauIYvJZ++hT9nVyEQeeyi0T7u0S+XvtO5kbj4RCW9gunrItgoTcWNTGH8sriJorz23F/zTMtqtVYlLjSuwPnoLP6iZf580t6abn3fP6njYZ3hOssp+ct9UI5ypJqK/wG+QrNf3CDfOIJIuo5Eg1l89LJP7m9laDdb2gWmrtf/WqOklzUY/0CvM9D5DeiJAfxpfkmqEjrkmRHh4ZEvRj2mV5BzTC3XDappGTJswD28xPWBRrYSSqwFn+pL5GX7lv4FgRsNqsu2rvwi31U+93f/MkGZ+6Dm58oRX/zA37cTN/C4E/nCUD18CHo1rnsKz2Gk=","attributes":{"enabled":true,"nbf":1619640849,"exp":1651177449,"created":1619641449,"updated":1619641449,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641417,"updated":1619641417}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending"}}, [
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
  '7cc864c5-b4d8-42c1-8fb4-32ba122ac11a',
  'x-ms-request-id',
  '17ca8b44-ffd1-419b-b92e-d9cc7a3ff390',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:10 GMT',
  'Content-Length',
  '2605'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","x5t":"fGmbQxFfsjtNtMgEXiq8p9E-zDY","cer":"MIIDKDCCAhCgAwIBAgIQFl2QpyJIQR+TxuuaI1cQ5DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxNDA5WhcNMjIwNDI4MjAyNDA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCn9a5tDc4LmMrup3xCYl9IzP8GVxSTOycJM+C1drm7vE3HTxsqgIyaCo6jJx8g8t/7qcfT/oyGAhg32xdFU8wNVLZvkCP/qaROn2pdCADCbtVMh/kjTUV/E/7qmQgPH1pCzUab7dQJMbL3a5UdlZrglB7mMLVgOMzFY+k/ZeIpVz4VleJRdoigtahrIH+goW1GSymX6qgbpwwnBBU/h5wWtJ3RrMPsih8+9C4tAp11rlNbgVhPI3fa61Z7/BFcBCn6O24+3QxQ3bpMRJ4QbgQkk8SNl5GbIPNTDPjAlxrFF9Z5fLrKccmYyFQpCY8PuCFevf8HRbOu+LlxxNk6aNpRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQYoZsOzYfPx8NhROAnHlSavTziZzAdBgNVHQ4EFgQUGKGbDs2Hz8fDYUTgJx5Umr084mcwDQYJKoZIhvcNAQELBQADggEBAFub+Yo2x613dpJQ205ukCauIYvJZ++hT9nVyEQeeyi0T7u0S+XvtO5kbj4RCW9gunrItgoTcWNTGH8sriJorz23F/zTMtqtVYlLjSuwPnoLP6iZf580t6abn3fP6njYZ3hOssp+ct9UI5ypJqK/wG+QrNf3CDfOIJIuo5Eg1l89LJP7m9laDdb2gWmrtf/WqOklzUY/0CvM9D5DeiJAfxpfkmqEjrkmRHh4ZEvRj2mV5BzTC3XDappGTJswD28xPWBRrYSSqwFn+pL5GX7lv4FgRsNqsu2rvwi31U+93f/MkGZ+6Dm58oRX/zA37cTN/C4E/nCUD18CHo1rnsKz2Gk=","attributes":{"enabled":false,"nbf":1619640849,"exp":1651177449,"created":1619641449,"updated":1619641451,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending"}}, [
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
  'c2105dd9-96b6-4157-bd32-87ee40290912',
  'x-ms-request-id',
  'ca88fd7e-f126-4413-928b-a61592f7b82e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:11 GMT',
  'Content-Length',
  '1930'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","x5t":"fGmbQxFfsjtNtMgEXiq8p9E-zDY","cer":"MIIDKDCCAhCgAwIBAgIQFl2QpyJIQR+TxuuaI1cQ5DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxNDA5WhcNMjIwNDI4MjAyNDA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCn9a5tDc4LmMrup3xCYl9IzP8GVxSTOycJM+C1drm7vE3HTxsqgIyaCo6jJx8g8t/7qcfT/oyGAhg32xdFU8wNVLZvkCP/qaROn2pdCADCbtVMh/kjTUV/E/7qmQgPH1pCzUab7dQJMbL3a5UdlZrglB7mMLVgOMzFY+k/ZeIpVz4VleJRdoigtahrIH+goW1GSymX6qgbpwwnBBU/h5wWtJ3RrMPsih8+9C4tAp11rlNbgVhPI3fa61Z7/BFcBCn6O24+3QxQ3bpMRJ4QbgQkk8SNl5GbIPNTDPjAlxrFF9Z5fLrKccmYyFQpCY8PuCFevf8HRbOu+LlxxNk6aNpRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQYoZsOzYfPx8NhROAnHlSavTziZzAdBgNVHQ4EFgQUGKGbDs2Hz8fDYUTgJx5Umr084mcwDQYJKoZIhvcNAQELBQADggEBAFub+Yo2x613dpJQ205ukCauIYvJZ++hT9nVyEQeeyi0T7u0S+XvtO5kbj4RCW9gunrItgoTcWNTGH8sriJorz23F/zTMtqtVYlLjSuwPnoLP6iZf580t6abn3fP6njYZ3hOssp+ct9UI5ypJqK/wG+QrNf3CDfOIJIuo5Eg1l89LJP7m9laDdb2gWmrtf/WqOklzUY/0CvM9D5DeiJAfxpfkmqEjrkmRHh4ZEvRj2mV5BzTC3XDappGTJswD28xPWBRrYSSqwFn+pL5GX7lv4FgRsNqsu2rvwi31U+93f/MkGZ+6Dm58oRX/zA37cTN/C4E/nCUD18CHo1rnsKz2Gk=","attributes":{"enabled":false,"nbf":1619640849,"exp":1651177449,"created":1619641449,"updated":1619641451,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"subject":"CN=MyCert","issuer":"CN=MyCert","sans":{},"serialnumber":"165D90A72248411F93C6EB9A235710E4"}, [
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
  '2c8acd40-4e3b-476e-af16-3ce5bc906763',
  'x-ms-request-id',
  'd6b808af-ca4a-4186-bfbf-fae385f3a22d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:11 GMT',
  'Content-Length',
  '1882'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificateversion-","deletedDate":1619641451,"scheduledPurgeDate":1627417451,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","x5t":"fGmbQxFfsjtNtMgEXiq8p9E-zDY","cer":"MIIDKDCCAhCgAwIBAgIQFl2QpyJIQR+TxuuaI1cQ5DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxNDA5WhcNMjIwNDI4MjAyNDA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCn9a5tDc4LmMrup3xCYl9IzP8GVxSTOycJM+C1drm7vE3HTxsqgIyaCo6jJx8g8t/7qcfT/oyGAhg32xdFU8wNVLZvkCP/qaROn2pdCADCbtVMh/kjTUV/E/7qmQgPH1pCzUab7dQJMbL3a5UdlZrglB7mMLVgOMzFY+k/ZeIpVz4VleJRdoigtahrIH+goW1GSymX6qgbpwwnBBU/h5wWtJ3RrMPsih8+9C4tAp11rlNbgVhPI3fa61Z7/BFcBCn6O24+3QxQ3bpMRJ4QbgQkk8SNl5GbIPNTDPjAlxrFF9Z5fLrKccmYyFQpCY8PuCFevf8HRbOu+LlxxNk6aNpRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQYoZsOzYfPx8NhROAnHlSavTziZzAdBgNVHQ4EFgQUGKGbDs2Hz8fDYUTgJx5Umr084mcwDQYJKoZIhvcNAQELBQADggEBAFub+Yo2x613dpJQ205ukCauIYvJZ++hT9nVyEQeeyi0T7u0S+XvtO5kbj4RCW9gunrItgoTcWNTGH8sriJorz23F/zTMtqtVYlLjSuwPnoLP6iZf580t6abn3fP6njYZ3hOssp+ct9UI5ypJqK/wG+QrNf3CDfOIJIuo5Eg1l89LJP7m9laDdb2gWmrtf/WqOklzUY/0CvM9D5DeiJAfxpfkmqEjrkmRHh4ZEvRj2mV5BzTC3XDappGTJswD28xPWBRrYSSqwFn+pL5GX7lv4FgRsNqsu2rvwi31U+93f/MkGZ+6Dm58oRX/zA37cTN/C4E/nCUD18CHo1rnsKz2Gk=","attributes":{"enabled":false,"nbf":1619640849,"exp":1651177449,"created":1619641449,"updated":1619641451,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641417,"updated":1619641417}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending"}}, [
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
  'd28f4fc8-9533-4c5a-97c4-977726d5688b',
  'x-ms-request-id',
  '70dec7d4-4e2b-4fa2-aa6a-431d03629170',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:11 GMT',
  'Content-Length',
  '2809'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '6a6700f1-7578-46af-850f-756fe16927c6',
  'x-ms-request-id',
  '5c25df07-d441-4cf3-8b54-758ab98b7656',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '6dacd913-4d2e-40da-b639-123923083d78',
  'x-ms-request-id',
  '8587227f-52f8-41f1-94a1-ba68108ac8ed',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  'b67f9be6-ea8a-4b65-8298-d73723d89799',
  'x-ms-request-id',
  '100072c7-7d3a-4bcc-985b-86cd856be2d1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '0dbab046-2ead-4ce3-8f57-085696c0a438',
  'x-ms-request-id',
  '12eca04c-5586-4396-87dc-5f2132efed96',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '83bcbd77-c1d6-41f1-98a5-bddaafc16a1d',
  'x-ms-request-id',
  '6a4db9ee-f210-4b46-b639-df9a1d8fb6ad',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  'd587a839-80e8-4213-b9a6-ae0d63fad1c3',
  'x-ms-request-id',
  'd1a37e1d-4a77-466f-b7ff-dc85558affef',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '4d3fbd08-a187-4454-913f-7cf6a1d0955f',
  'x-ms-request-id',
  '3d03f386-3440-4023-9997-db27a36c5807',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  'f3618c80-ed57-4481-ae50-2ccccf5178b5',
  'x-ms-request-id',
  '39ee7237-483d-4db8-866a-f5290adf674e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  'a041d3d9-9a64-441d-a1eb-5bf08da42250',
  'x-ms-request-id',
  '7c4a4a3e-302a-4fce-8aec-ae7411d95ebc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '9ad13cb9-22ff-47be-9801-f1cfed073247',
  'x-ms-request-id',
  'ea53cb7d-dad2-4c73-896e-d1dcbf770412',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '6c17e689-7b71-4161-ab1b-ec0ba1d9a289',
  'x-ms-request-id',
  '415f046b-8fb2-4217-9319-f6edcd9b5371',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '1f82aa53-18ad-40d1-bbaf-0b5ce5871f94',
  'x-ms-request-id',
  'ba601a14-77a7-48e1-a031-29f3256e2bf9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '82b40d8e-d4fd-461d-8e5f-25f515b87dbd',
  'x-ms-request-id',
  '997c3f75-4d9e-4f97-87ed-f34830449be0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '24f18c00-af23-4f2b-8d48-348c6fbc6a62',
  'x-ms-request-id',
  '5c2608d3-19d6-48cf-89e2-58f6c0c35d26',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  'd91079f5-7238-4ea0-9be9-d1efb5204195',
  'x-ms-request-id',
  '135d60fc-a2b9-40b5-a19b-286d17272599',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '5310d775-e716-418b-bd0b-9e2122212bb0',
  'x-ms-request-id',
  '2f449e06-2701-4b01-9eff-0569b0c007b8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '3c1afd42-e55b-4cdc-8c66-85ee5dfd3d5f',
  'x-ms-request-id',
  '4f0ff5dd-2ba3-494e-97a0-e9a350935bd4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  'da8f29e1-176d-4fe0-99c0-3778369c7b87',
  'x-ms-request-id',
  '8c3e5146-cc6b-44f0-8fef-16a706c0d033',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '7d237f55-1eaa-4ebc-8e00-fbcfc089a2fe',
  'x-ms-request-id',
  'f19a0cab-cc53-481e-a1f7-f024f253103c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '0c8d92dd-a41a-478f-ab6a-e2f527032885',
  'x-ms-request-id',
  '94b40712-1882-4a0e-90ca-117f9a90c915',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '9d33dc62-2616-4c37-b477-f99f37e865a1',
  'x-ms-request-id',
  '8f6256e0-3cc2-420b-b733-6c2a5d2aff00',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '5db6d137-6604-4e58-bee7-a86d778ce5d4',
  'x-ms-request-id',
  'e8b09df3-3812-4031-8d73-fd60897be2ad',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
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
  '003e85fb-9ff5-4a0b-8ea0-ffa0b799dc7a',
  'x-ms-request-id',
  '45c1b6fc-b006-412f-920f-d90fc8d0eaf2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificateversion-","deletedDate":1619641451,"scheduledPurgeDate":1627417451,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/19a6298a497f430498f070a81ceceaa3","x5t":"fGmbQxFfsjtNtMgEXiq8p9E-zDY","cer":"MIIDKDCCAhCgAwIBAgIQFl2QpyJIQR+TxuuaI1cQ5DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxNDA5WhcNMjIwNDI4MjAyNDA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCn9a5tDc4LmMrup3xCYl9IzP8GVxSTOycJM+C1drm7vE3HTxsqgIyaCo6jJx8g8t/7qcfT/oyGAhg32xdFU8wNVLZvkCP/qaROn2pdCADCbtVMh/kjTUV/E/7qmQgPH1pCzUab7dQJMbL3a5UdlZrglB7mMLVgOMzFY+k/ZeIpVz4VleJRdoigtahrIH+goW1GSymX6qgbpwwnBBU/h5wWtJ3RrMPsih8+9C4tAp11rlNbgVhPI3fa61Z7/BFcBCn6O24+3QxQ3bpMRJ4QbgQkk8SNl5GbIPNTDPjAlxrFF9Z5fLrKccmYyFQpCY8PuCFevf8HRbOu+LlxxNk6aNpRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQYoZsOzYfPx8NhROAnHlSavTziZzAdBgNVHQ4EFgQUGKGbDs2Hz8fDYUTgJx5Umr084mcwDQYJKoZIhvcNAQELBQADggEBAFub+Yo2x613dpJQ205ukCauIYvJZ++hT9nVyEQeeyi0T7u0S+XvtO5kbj4RCW9gunrItgoTcWNTGH8sriJorz23F/zTMtqtVYlLjSuwPnoLP6iZf580t6abn3fP6njYZ3hOssp+ct9UI5ypJqK/wG+QrNf3CDfOIJIuo5Eg1l89LJP7m9laDdb2gWmrtf/WqOklzUY/0CvM9D5DeiJAfxpfkmqEjrkmRHh4ZEvRj2mV5BzTC3XDappGTJswD28xPWBRrYSSqwFn+pL5GX7lv4FgRsNqsu2rvwi31U+93f/MkGZ+6Dm58oRX/zA37cTN/C4E/nCUD18CHo1rnsKz2Gk=","attributes":{"enabled":false,"nbf":1619640849,"exp":1651177449,"created":1619641449,"updated":1619641451,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641417,"updated":1619641417}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending"}}, [
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
  'd5fa0435-94f1-4a05-bdbc-af600ba14c8c',
  'x-ms-request-id',
  'bfa2b1ce-6552-41a8-8db5-0f86e0a71655',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:57 GMT',
  'Content-Length',
  '2809'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
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
  '260947cc-f7fa-4961-86df-01d8832aa3ff',
  'x-ms-request-id',
  'c1305096-3049-4a12-b94c-cac242c6f022',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:24:57 GMT'
]);
