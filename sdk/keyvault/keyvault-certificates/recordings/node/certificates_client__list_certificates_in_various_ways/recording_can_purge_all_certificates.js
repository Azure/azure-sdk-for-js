let nock = require('nock');

module.exports.hash = "eb4c427738f5716372e1458908fabfbc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
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
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '49a01838-c922-4c4f-b6bb-039b4000a7c6',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:23:56 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  '640f2083-833a-4c03-b165-03c4a7f80f01',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjIfKinay3xEkBKzeiGRaKI_aSJHAQAAAHyqhtYOAAAA; expires=Sat, 25-Jul-2020 14:23:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 14:23:56 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-4892663737593751","x5t":"ARw6-FzD4rAkJv-iGDBbKVoiVPk","attributes":{"enabled":true,"nbf":1593089458,"exp":1624626058,"created":1593090059,"updated":1593090059},"subject":""}],"nextLink":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c61ff37d-34d7-4a70-bb58-724d0137f863',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:23:56 GMT',
  'Content-Length',
  '310'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751","deletedDate":1593095037,"scheduledPurgeDate":1600871037,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-4892663737593751/31f67926a3a34d439669781c5432e85f","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-4892663737593751/31f67926a3a34d439669781c5432e85f","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-4892663737593751/31f67926a3a34d439669781c5432e85f","x5t":"ARw6-FzD4rAkJv-iGDBbKVoiVPk","cer":"MIIDKDCCAhCgAwIBAgIQb7F2moq5QpOz8AArTo4jIjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1MDU4WhcNMjEwNjI1MTMwMDU4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDT7vLHMK/nNbi8RybKlVaDTYtiaOdgpQBnYLUDvhgoQKBKOn6/OCQ2DM+7MlAcdabJKQPPdb6XjrFkxvR1wTD8NRQ37mdEsX2QH8S3B38A4N3O7zIarCkInrUnBnNguQ2oK3+ELrBbC7Hy6/0dP1n4+1NMCb7Ix6crHTbV7KdTn4b3uIhdKZj9TU7qQudgb2e7ra7JDLyWjChYsoTNYHRUcLoE+NpTiU04c+g6GAs9K9gNiqQ2MSF+CDCEykcDm26Hgc5pEaQ+aeEJ9YHcoPv4OTHw2f9uKokCJEvTkKjwDKvGtJuYU1P8rcUyutgpv8AYEcd39eogYzvcfTmZ6E8lAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSn/TG2Ie5Q/IAlZnCO2DeneXwW3DAdBgNVHQ4EFgQUp/0xtiHuUPyAJWZwjtg3p3l8FtwwDQYJKoZIhvcNAQELBQADggEBALLUxvttj/polPtZWsWDEEUDn6kcoCYvXQigUo64lxyaFa2QttI4BlIvts30it2eE9R7MXLKtrnAjgWVRO2alx8hPpsyKQqSqMfoH37EQeA7bHOkKfs+Cn23ROrQEw38yv7BNbFQt4MgTTNJBMMxhoe498kDEHP+Yb284i7Vy8u28rxRBCFzi+sjXiLfQ6vU8yo7n+jjBPy8jhj4PUNxv48UhVcG5KxS+hORFHp63KAgNQf7myxzXrpt23Del1A9DtHs7mionVEQSwsbKjcQe6PszzEm/V1Sjrk2oDd1MpCJC401S3knozfBUNXiflR69+nmy6YgXzT/dqLNAaHaInU=","attributes":{"enabled":true,"nbf":1593089458,"exp":1624626058,"created":1593090059,"updated":1593090059,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-4892663737593751/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090042,"updated":1593090042}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-4892663737593751/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '84b8ebde-40c0-49de-8fba-ad27cdfbe4e8',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:23:56 GMT',
  'Content-Length',
  '2778'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '76b74dc9-6e12-498a-a559-4d75e3345a11',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:23:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dfea4623-c8f4-4ce0-9f51-5fbc66668b14',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:23:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c72c437c-623b-456f-9d8e-fbb67ffe27f5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:23:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f8ceb358-572b-422c-8908-2a0a6922315a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:24:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e39b7f9c-c0aa-4958-bcb7-a90a9592dd67',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:24:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9d9bf78b-0237-40da-bcad-085249d923de',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:24:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751","deletedDate":1593095037,"scheduledPurgeDate":1600871037,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-4892663737593751/31f67926a3a34d439669781c5432e85f","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-4892663737593751/31f67926a3a34d439669781c5432e85f","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-4892663737593751/31f67926a3a34d439669781c5432e85f","x5t":"ARw6-FzD4rAkJv-iGDBbKVoiVPk","cer":"MIIDKDCCAhCgAwIBAgIQb7F2moq5QpOz8AArTo4jIjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1MDU4WhcNMjEwNjI1MTMwMDU4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDT7vLHMK/nNbi8RybKlVaDTYtiaOdgpQBnYLUDvhgoQKBKOn6/OCQ2DM+7MlAcdabJKQPPdb6XjrFkxvR1wTD8NRQ37mdEsX2QH8S3B38A4N3O7zIarCkInrUnBnNguQ2oK3+ELrBbC7Hy6/0dP1n4+1NMCb7Ix6crHTbV7KdTn4b3uIhdKZj9TU7qQudgb2e7ra7JDLyWjChYsoTNYHRUcLoE+NpTiU04c+g6GAs9K9gNiqQ2MSF+CDCEykcDm26Hgc5pEaQ+aeEJ9YHcoPv4OTHw2f9uKokCJEvTkKjwDKvGtJuYU1P8rcUyutgpv8AYEcd39eogYzvcfTmZ6E8lAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSn/TG2Ie5Q/IAlZnCO2DeneXwW3DAdBgNVHQ4EFgQUp/0xtiHuUPyAJWZwjtg3p3l8FtwwDQYJKoZIhvcNAQELBQADggEBALLUxvttj/polPtZWsWDEEUDn6kcoCYvXQigUo64lxyaFa2QttI4BlIvts30it2eE9R7MXLKtrnAjgWVRO2alx8hPpsyKQqSqMfoH37EQeA7bHOkKfs+Cn23ROrQEw38yv7BNbFQt4MgTTNJBMMxhoe498kDEHP+Yb284i7Vy8u28rxRBCFzi+sjXiLfQ6vU8yo7n+jjBPy8jhj4PUNxv48UhVcG5KxS+hORFHp63KAgNQf7myxzXrpt23Del1A9DtHs7mionVEQSwsbKjcQe6PszzEm/V1Sjrk2oDd1MpCJC401S3knozfBUNXiflR69+nmy6YgXzT/dqLNAaHaInU=","attributes":{"enabled":true,"nbf":1593089458,"exp":1624626058,"created":1593090059,"updated":1593090059,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-4892663737593751/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090042,"updated":1593090042}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-4892663737593751/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd59fbdae-480c-430f-82c7-9b22adeee5ba',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:24:08 GMT',
  'Content-Length',
  '2778'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2bc08939-6649-4395-bdc8-d92ac2ba3fc7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:24:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
  .reply(200, {"value":[],"nextLink":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0be195ad-4abb-4aec-a773-8edb8257ad59',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:24:08 GMT',
  'Content-Length',
  '28'
]);
