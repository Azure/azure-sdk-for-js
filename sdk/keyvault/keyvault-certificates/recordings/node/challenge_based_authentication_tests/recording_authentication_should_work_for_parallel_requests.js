let nock = require('nock');

module.exports.hash = "7846e49801cb89451a7c2d068fff2698";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b7508d76-6277-43b4-b76b-23b93de5c402',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:30 GMT'
]);

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
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '67d7d1c1-8369-4a9c-87a4-dc6096ef2aaa',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:29 GMT'
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
  '9f177f99-7ff4-4d48-91bd-8de916fb8300',
  'x-ms-ests-server',
  '2.1.10620.9 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AlLwbyhMwqFBn1ox-w97y64_aSJHAQAAAFYLX9YOAAAA; expires=Thu, 25-Jun-2020 13:06:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 26 May 2020 13:06:30 GMT',
  'Content-Length',
  '1315'
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
  '9f11b6cc-3d95-4851-b7d3-f1f5272f0001',
  'x-ms-ests-server',
  '2.1.10571.11 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=As_0v7n3gQlJrDK5ewDXZs8_aSJHAQAAAFYLX9YOAAAA; expires=Thu, 25-Jun-2020 13:06:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 26 May 2020 13:06:30 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzfF8kUntJrCp/iyZqhgC9NUOMdYObSvN9jr4gqhDNBKyuN3fUAe6zoJJbwaqJsDTckg+W++VQ9d/Fjs5bb6VFc6r8AxATnV2Ps0g2JnTKzW78TGXW43BdGl7dTil/3oAs1dIkS7rnecfCWGWA5gVoXyGp6fVyKxY16BTWHEsAefaJ0Vve1h6KDs0C5JweErrfHbEJjATeySjaWaseucj6wmrZZJcib2wSqpZhvZIbKxWbXs9z+mKGGqJheWuzreyY0x6ebE0MJ/FpTOxPS69IxnsqN2OXyEjpe6NJOwI1TvAf3geLwGiSZS7Ag/XUeRSAtNgcAsFD8jj0RC3HookcwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHEV4fa7MXFEWvJwfY2+s3DHkiByNkuQbDL1TRbGUw2JpLUM6tD9ZcigjL+ZJ7ZojnJMUCSSbU46OBpTiaCoOmt7W/P+hgzyG2Lmj/mlJKoPrgqPbk1FqgEz+cCR/q0qJcx02zNk9DV3MynWBJ6glcZVLoDSyFKmtx3h7RFh0AFuv73Roz1/FenP9WphoEOuQQP9pS9ulb9JWagpikgU8gN7asL31HKWeUtwLGmOLU22SuOPII0V/J71+55ZIhfNM4ITYGhA0jydOIlUm0oiQfEcJ1rml0qJCOkKaNuoXI+0BA6H646PXmMzp9ymrwEXflewvuRRHCkigsaCaWHbKhs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"52881cef6db44fb0ad39ffb7d8d0b14a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending?api-version=7.1-preview&request_id=52881cef6db44fb0ad39ffb7d8d0b14a',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1fe48404-48c8-4409-8702-84092c401c1a',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:30 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4A7X7Ru7ZkETZDbqBPPtTkXmYFneXndduHxX5M0hXwHNNc5H3qagziIoAKzcJmrYg8GDBNpgvYFPAUXERQh0fwkfTAFvqeJR13qJ+FZ/c6cmeTNmoKlmM7DUYoKMIS4mX2iFUQM0VUWabSS97vNFFpGcizztUnAXOZCbSWCHcrU4FSmtP9hMCUY8BBqwwFq3+zCGaNpQQyivFFyOlbZTA1pIT25JKgibAQ8CO+R3ZUwBsrltg/ZpXnRxYD3Ee1MaBrwmRXO5pMwqOz/mZLnorohaQQlEv05epLnST5bX4TJJJIlhe3sp7G45ywKWpsBnt42w0iPij0qzZoCZqWbJnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD9FaPnsa2x4Ii6c1+0Kr3knoDwGUuAxTlDf8WQK9PdJctEKlJTeTV4egyyAM2/NzJ3s6gHHWnbLoEiyamyCCw/ovmj95C2TM3CdCXbD3XF4CpnKmi5BSqIDS+aq0KVl9c0Kxqp22FEvTiUjLwFiyXsB9eNNXZqKmgmgIIh642oFfoH16PNHs2G0aIY+QQQEURgQo9bmgjN9XPKVwiGcr5OR1nxDRzMhfFUmv0OVLvLYunxmWBW+thyxWxWaigECt3eaHHgZvxrob4lvfb3tcNSm1M6QbqJp3/zHrpaiucl/7Ek5hgRoCS4DWpxF4vHGlwb9WyjS3/CqKJUhHRmxdOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"cbdb4e61c63b489da5d565211fd2b3d0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending?api-version=7.1-preview&request_id=cbdb4e61c63b489da5d565211fd2b3d0',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c39bbe4f-4dc6-4904-93db-dc1d8bd3d34d',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:31 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzfF8kUntJrCp/iyZqhgC9NUOMdYObSvN9jr4gqhDNBKyuN3fUAe6zoJJbwaqJsDTckg+W++VQ9d/Fjs5bb6VFc6r8AxATnV2Ps0g2JnTKzW78TGXW43BdGl7dTil/3oAs1dIkS7rnecfCWGWA5gVoXyGp6fVyKxY16BTWHEsAefaJ0Vve1h6KDs0C5JweErrfHbEJjATeySjaWaseucj6wmrZZJcib2wSqpZhvZIbKxWbXs9z+mKGGqJheWuzreyY0x6ebE0MJ/FpTOxPS69IxnsqN2OXyEjpe6NJOwI1TvAf3geLwGiSZS7Ag/XUeRSAtNgcAsFD8jj0RC3HookcwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHEV4fa7MXFEWvJwfY2+s3DHkiByNkuQbDL1TRbGUw2JpLUM6tD9ZcigjL+ZJ7ZojnJMUCSSbU46OBpTiaCoOmt7W/P+hgzyG2Lmj/mlJKoPrgqPbk1FqgEz+cCR/q0qJcx02zNk9DV3MynWBJ6glcZVLoDSyFKmtx3h7RFh0AFuv73Roz1/FenP9WphoEOuQQP9pS9ulb9JWagpikgU8gN7asL31HKWeUtwLGmOLU22SuOPII0V/J71+55ZIhfNM4ITYGhA0jydOIlUm0oiQfEcJ1rml0qJCOkKaNuoXI+0BA6H646PXmMzp9ymrwEXflewvuRRHCkigsaCaWHbKhs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"52881cef6db44fb0ad39ffb7d8d0b14a"}, [
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
  'westus',
  'x-ms-request-id',
  'f29ef905-b702-4317-8595-33716826809d',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:30 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4A7X7Ru7ZkETZDbqBPPtTkXmYFneXndduHxX5M0hXwHNNc5H3qagziIoAKzcJmrYg8GDBNpgvYFPAUXERQh0fwkfTAFvqeJR13qJ+FZ/c6cmeTNmoKlmM7DUYoKMIS4mX2iFUQM0VUWabSS97vNFFpGcizztUnAXOZCbSWCHcrU4FSmtP9hMCUY8BBqwwFq3+zCGaNpQQyivFFyOlbZTA1pIT25JKgibAQ8CO+R3ZUwBsrltg/ZpXnRxYD3Ee1MaBrwmRXO5pMwqOz/mZLnorohaQQlEv05epLnST5bX4TJJJIlhe3sp7G45ywKWpsBnt42w0iPij0qzZoCZqWbJnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD9FaPnsa2x4Ii6c1+0Kr3knoDwGUuAxTlDf8WQK9PdJctEKlJTeTV4egyyAM2/NzJ3s6gHHWnbLoEiyamyCCw/ovmj95C2TM3CdCXbD3XF4CpnKmi5BSqIDS+aq0KVl9c0Kxqp22FEvTiUjLwFiyXsB9eNNXZqKmgmgIIh642oFfoH16PNHs2G0aIY+QQQEURgQo9bmgjN9XPKVwiGcr5OR1nxDRzMhfFUmv0OVLvLYunxmWBW+thyxWxWaigECt3eaHHgZvxrob4lvfb3tcNSm1M6QbqJp3/zHrpaiucl/7Ek5hgRoCS4DWpxF4vHGlwb9WyjS3/CqKJUhHRmxdOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"cbdb4e61c63b489da5d565211fd2b3d0"}, [
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
  'westus',
  'x-ms-request-id',
  'bc8bc788-fcea-4986-9227-8949a27b5673',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:31 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzfF8kUntJrCp/iyZqhgC9NUOMdYObSvN9jr4gqhDNBKyuN3fUAe6zoJJbwaqJsDTckg+W++VQ9d/Fjs5bb6VFc6r8AxATnV2Ps0g2JnTKzW78TGXW43BdGl7dTil/3oAs1dIkS7rnecfCWGWA5gVoXyGp6fVyKxY16BTWHEsAefaJ0Vve1h6KDs0C5JweErrfHbEJjATeySjaWaseucj6wmrZZJcib2wSqpZhvZIbKxWbXs9z+mKGGqJheWuzreyY0x6ebE0MJ/FpTOxPS69IxnsqN2OXyEjpe6NJOwI1TvAf3geLwGiSZS7Ag/XUeRSAtNgcAsFD8jj0RC3HookcwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHEV4fa7MXFEWvJwfY2+s3DHkiByNkuQbDL1TRbGUw2JpLUM6tD9ZcigjL+ZJ7ZojnJMUCSSbU46OBpTiaCoOmt7W/P+hgzyG2Lmj/mlJKoPrgqPbk1FqgEz+cCR/q0qJcx02zNk9DV3MynWBJ6glcZVLoDSyFKmtx3h7RFh0AFuv73Roz1/FenP9WphoEOuQQP9pS9ulb9JWagpikgU8gN7asL31HKWeUtwLGmOLU22SuOPII0V/J71+55ZIhfNM4ITYGhA0jydOIlUm0oiQfEcJ1rml0qJCOkKaNuoXI+0BA6H646PXmMzp9ymrwEXflewvuRRHCkigsaCaWHbKhs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"52881cef6db44fb0ad39ffb7d8d0b14a"}, [
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
  'westus',
  'x-ms-request-id',
  'fbc95a7f-3f9f-4516-b73b-382ccba3d89d',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:30 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzfF8kUntJrCp/iyZqhgC9NUOMdYObSvN9jr4gqhDNBKyuN3fUAe6zoJJbwaqJsDTckg+W++VQ9d/Fjs5bb6VFc6r8AxATnV2Ps0g2JnTKzW78TGXW43BdGl7dTil/3oAs1dIkS7rnecfCWGWA5gVoXyGp6fVyKxY16BTWHEsAefaJ0Vve1h6KDs0C5JweErrfHbEJjATeySjaWaseucj6wmrZZJcib2wSqpZhvZIbKxWbXs9z+mKGGqJheWuzreyY0x6ebE0MJ/FpTOxPS69IxnsqN2OXyEjpe6NJOwI1TvAf3geLwGiSZS7Ag/XUeRSAtNgcAsFD8jj0RC3HookcwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHEV4fa7MXFEWvJwfY2+s3DHkiByNkuQbDL1TRbGUw2JpLUM6tD9ZcigjL+ZJ7ZojnJMUCSSbU46OBpTiaCoOmt7W/P+hgzyG2Lmj/mlJKoPrgqPbk1FqgEz+cCR/q0qJcx02zNk9DV3MynWBJ6glcZVLoDSyFKmtx3h7RFh0AFuv73Roz1/FenP9WphoEOuQQP9pS9ulb9JWagpikgU8gN7asL31HKWeUtwLGmOLU22SuOPII0V/J71+55ZIhfNM4ITYGhA0jydOIlUm0oiQfEcJ1rml0qJCOkKaNuoXI+0BA6H646PXmMzp9ymrwEXflewvuRRHCkigsaCaWHbKhs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"52881cef6db44fb0ad39ffb7d8d0b14a"}, [
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
  'westus',
  'x-ms-request-id',
  '437a6d9b-e8c9-4830-9516-136e470fb56e',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:32 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzfF8kUntJrCp/iyZqhgC9NUOMdYObSvN9jr4gqhDNBKyuN3fUAe6zoJJbwaqJsDTckg+W++VQ9d/Fjs5bb6VFc6r8AxATnV2Ps0g2JnTKzW78TGXW43BdGl7dTil/3oAs1dIkS7rnecfCWGWA5gVoXyGp6fVyKxY16BTWHEsAefaJ0Vve1h6KDs0C5JweErrfHbEJjATeySjaWaseucj6wmrZZJcib2wSqpZhvZIbKxWbXs9z+mKGGqJheWuzreyY0x6ebE0MJ/FpTOxPS69IxnsqN2OXyEjpe6NJOwI1TvAf3geLwGiSZS7Ag/XUeRSAtNgcAsFD8jj0RC3HookcwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHEV4fa7MXFEWvJwfY2+s3DHkiByNkuQbDL1TRbGUw2JpLUM6tD9ZcigjL+ZJ7ZojnJMUCSSbU46OBpTiaCoOmt7W/P+hgzyG2Lmj/mlJKoPrgqPbk1FqgEz+cCR/q0qJcx02zNk9DV3MynWBJ6glcZVLoDSyFKmtx3h7RFh0AFuv73Roz1/FenP9WphoEOuQQP9pS9ulb9JWagpikgU8gN7asL31HKWeUtwLGmOLU22SuOPII0V/J71+55ZIhfNM4ITYGhA0jydOIlUm0oiQfEcJ1rml0qJCOkKaNuoXI+0BA6H646PXmMzp9ymrwEXflewvuRRHCkigsaCaWHbKhs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"52881cef6db44fb0ad39ffb7d8d0b14a"}, [
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
  'westus',
  'x-ms-request-id',
  '9c719510-e3ad-4f91-a94d-49e22187d7e5',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:34 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzfF8kUntJrCp/iyZqhgC9NUOMdYObSvN9jr4gqhDNBKyuN3fUAe6zoJJbwaqJsDTckg+W++VQ9d/Fjs5bb6VFc6r8AxATnV2Ps0g2JnTKzW78TGXW43BdGl7dTil/3oAs1dIkS7rnecfCWGWA5gVoXyGp6fVyKxY16BTWHEsAefaJ0Vve1h6KDs0C5JweErrfHbEJjATeySjaWaseucj6wmrZZJcib2wSqpZhvZIbKxWbXs9z+mKGGqJheWuzreyY0x6ebE0MJ/FpTOxPS69IxnsqN2OXyEjpe6NJOwI1TvAf3geLwGiSZS7Ag/XUeRSAtNgcAsFD8jj0RC3HookcwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHEV4fa7MXFEWvJwfY2+s3DHkiByNkuQbDL1TRbGUw2JpLUM6tD9ZcigjL+ZJ7ZojnJMUCSSbU46OBpTiaCoOmt7W/P+hgzyG2Lmj/mlJKoPrgqPbk1FqgEz+cCR/q0qJcx02zNk9DV3MynWBJ6glcZVLoDSyFKmtx3h7RFh0AFuv73Roz1/FenP9WphoEOuQQP9pS9ulb9JWagpikgU8gN7asL31HKWeUtwLGmOLU22SuOPII0V/J71+55ZIhfNM4ITYGhA0jydOIlUm0oiQfEcJ1rml0qJCOkKaNuoXI+0BA6H646PXmMzp9ymrwEXflewvuRRHCkigsaCaWHbKhs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"52881cef6db44fb0ad39ffb7d8d0b14a"}, [
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
  'westus',
  'x-ms-request-id',
  '1a87d7d4-3359-466f-aad5-1bdfccedceb3',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:36 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzfF8kUntJrCp/iyZqhgC9NUOMdYObSvN9jr4gqhDNBKyuN3fUAe6zoJJbwaqJsDTckg+W++VQ9d/Fjs5bb6VFc6r8AxATnV2Ps0g2JnTKzW78TGXW43BdGl7dTil/3oAs1dIkS7rnecfCWGWA5gVoXyGp6fVyKxY16BTWHEsAefaJ0Vve1h6KDs0C5JweErrfHbEJjATeySjaWaseucj6wmrZZJcib2wSqpZhvZIbKxWbXs9z+mKGGqJheWuzreyY0x6ebE0MJ/FpTOxPS69IxnsqN2OXyEjpe6NJOwI1TvAf3geLwGiSZS7Ag/XUeRSAtNgcAsFD8jj0RC3HookcwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHEV4fa7MXFEWvJwfY2+s3DHkiByNkuQbDL1TRbGUw2JpLUM6tD9ZcigjL+ZJ7ZojnJMUCSSbU46OBpTiaCoOmt7W/P+hgzyG2Lmj/mlJKoPrgqPbk1FqgEz+cCR/q0qJcx02zNk9DV3MynWBJ6glcZVLoDSyFKmtx3h7RFh0AFuv73Roz1/FenP9WphoEOuQQP9pS9ulb9JWagpikgU8gN7asL31HKWeUtwLGmOLU22SuOPII0V/J71+55ZIhfNM4ITYGhA0jydOIlUm0oiQfEcJ1rml0qJCOkKaNuoXI+0BA6H646PXmMzp9ymrwEXflewvuRRHCkigsaCaWHbKhs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"52881cef6db44fb0ad39ffb7d8d0b14a"}, [
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
  'westus',
  'x-ms-request-id',
  'a73f4832-9def-4317-a1ca-e6fe41fd9027',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:39 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzfF8kUntJrCp/iyZqhgC9NUOMdYObSvN9jr4gqhDNBKyuN3fUAe6zoJJbwaqJsDTckg+W++VQ9d/Fjs5bb6VFc6r8AxATnV2Ps0g2JnTKzW78TGXW43BdGl7dTil/3oAs1dIkS7rnecfCWGWA5gVoXyGp6fVyKxY16BTWHEsAefaJ0Vve1h6KDs0C5JweErrfHbEJjATeySjaWaseucj6wmrZZJcib2wSqpZhvZIbKxWbXs9z+mKGGqJheWuzreyY0x6ebE0MJ/FpTOxPS69IxnsqN2OXyEjpe6NJOwI1TvAf3geLwGiSZS7Ag/XUeRSAtNgcAsFD8jj0RC3HookcwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHEV4fa7MXFEWvJwfY2+s3DHkiByNkuQbDL1TRbGUw2JpLUM6tD9ZcigjL+ZJ7ZojnJMUCSSbU46OBpTiaCoOmt7W/P+hgzyG2Lmj/mlJKoPrgqPbk1FqgEz+cCR/q0qJcx02zNk9DV3MynWBJ6glcZVLoDSyFKmtx3h7RFh0AFuv73Roz1/FenP9WphoEOuQQP9pS9ulb9JWagpikgU8gN7asL31HKWeUtwLGmOLU22SuOPII0V/J71+55ZIhfNM4ITYGhA0jydOIlUm0oiQfEcJ1rml0qJCOkKaNuoXI+0BA6H646PXmMzp9ymrwEXflewvuRRHCkigsaCaWHbKhs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"52881cef6db44fb0ad39ffb7d8d0b14a"}, [
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
  'westus',
  'x-ms-request-id',
  'ad136858-e1a3-4171-9805-38b092f54f94',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:41 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzfF8kUntJrCp/iyZqhgC9NUOMdYObSvN9jr4gqhDNBKyuN3fUAe6zoJJbwaqJsDTckg+W++VQ9d/Fjs5bb6VFc6r8AxATnV2Ps0g2JnTKzW78TGXW43BdGl7dTil/3oAs1dIkS7rnecfCWGWA5gVoXyGp6fVyKxY16BTWHEsAefaJ0Vve1h6KDs0C5JweErrfHbEJjATeySjaWaseucj6wmrZZJcib2wSqpZhvZIbKxWbXs9z+mKGGqJheWuzreyY0x6ebE0MJ/FpTOxPS69IxnsqN2OXyEjpe6NJOwI1TvAf3geLwGiSZS7Ag/XUeRSAtNgcAsFD8jj0RC3HookcwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHEV4fa7MXFEWvJwfY2+s3DHkiByNkuQbDL1TRbGUw2JpLUM6tD9ZcigjL+ZJ7ZojnJMUCSSbU46OBpTiaCoOmt7W/P+hgzyG2Lmj/mlJKoPrgqPbk1FqgEz+cCR/q0qJcx02zNk9DV3MynWBJ6glcZVLoDSyFKmtx3h7RFh0AFuv73Roz1/FenP9WphoEOuQQP9pS9ulb9JWagpikgU8gN7asL31HKWeUtwLGmOLU22SuOPII0V/J71+55ZIhfNM4ITYGhA0jydOIlUm0oiQfEcJ1rml0qJCOkKaNuoXI+0BA6H646PXmMzp9ymrwEXflewvuRRHCkigsaCaWHbKhs=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","request_id":"52881cef6db44fb0ad39ffb7d8d0b14a"}, [
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
  '3698ab94-b96d-4571-a4cf-511df26da23a',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:43 GMT',
  'Content-Length',
  '1361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/f2d104a9c62a4c59b66f690017696c66","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/f2d104a9c62a4c59b66f690017696c66","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/f2d104a9c62a4c59b66f690017696c66","x5t":"-s6fv9NJHGSXMR77JGAQcvHX7kk","cer":"MIIDKDCCAhCgAwIBAgIQVw2YlcZ6RuKCJd7tgCLB/jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI2MTI1NjQyWhcNMjEwNTI2MTMwNjQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDN8XyRSe0msKn+LJmqGAL01Q4x1g5tK832OviCqEM0ErK43d9QB7rOgklvBqomwNNySD5b75VD138WOzltvpUVzqvwDEBOdXY+zSDYmdMrNbvxMZdbjcF0aXt1OKX/egCzV0iRLuud5x8JYZYDmBWhfIanp9XIrFjXoFNYcSwB59onRW97WHooOzQLknB4Sut8dsQmMBN7JKNpZqx65yPrCatlklyJvbBKqlmG9khsrFZtez3P6YoYaomF5a7Ot7JjTHp5sTQwn8WlM7E9Lr0jGeyo3Y5fISOl7o0k7AjVO8B/eB4vAaJJlLsCD9dR5FIC02BwCwUPyOPRELceiiRzAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTA6w5J0jomrTgiVcWqW14hQm8SQjAdBgNVHQ4EFgQUwOsOSdI6Jq04IlXFqlteIUJvEkIwDQYJKoZIhvcNAQELBQADggEBABu4Ws7fi7Q2VWKu3DKbYwfqiK1/0OY7Nzw4INr/pzfNbOixiDKm76hI1bOlOk+QNZlFcO62L4bntfIo+L3ocZGHrEqZcCvnNHweS9TcA+ptmE0XFtNuIEPunC0xUFwmx0/IfMXyfGXmTiJVs3ZtuJSaT/Y7itrUC1Pe3oFdcNPqP7+shorEWsVgN9j+/dAe6Erl9+qYO5OSI3j6ZjdRRCBE4rSt/rFKIsxryGqvlxd+sy6ci/UWCHWHqlkdssRSB90LGdAW3AApk/iW5ymJpUp2Rp2naC3TORJj1m0JXepWEeLNT3dtCEfseHP562OFNQ7SvfzN+DmjFfcRLeTpbS0=","attributes":{"enabled":true,"nbf":1590497802,"exp":1622034402,"created":1590498403,"updated":1590498403,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590498391,"updated":1590498391}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  '255ece62-d4ac-4ab6-823b-18a363538551',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:43 GMT',
  'Content-Length',
  '2725'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","deletedDate":1590498404,"scheduledPurgeDate":1598274404,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/f2d104a9c62a4c59b66f690017696c66","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/f2d104a9c62a4c59b66f690017696c66","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/f2d104a9c62a4c59b66f690017696c66","x5t":"-s6fv9NJHGSXMR77JGAQcvHX7kk","cer":"MIIDKDCCAhCgAwIBAgIQVw2YlcZ6RuKCJd7tgCLB/jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI2MTI1NjQyWhcNMjEwNTI2MTMwNjQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDN8XyRSe0msKn+LJmqGAL01Q4x1g5tK832OviCqEM0ErK43d9QB7rOgklvBqomwNNySD5b75VD138WOzltvpUVzqvwDEBOdXY+zSDYmdMrNbvxMZdbjcF0aXt1OKX/egCzV0iRLuud5x8JYZYDmBWhfIanp9XIrFjXoFNYcSwB59onRW97WHooOzQLknB4Sut8dsQmMBN7JKNpZqx65yPrCatlklyJvbBKqlmG9khsrFZtez3P6YoYaomF5a7Ot7JjTHp5sTQwn8WlM7E9Lr0jGeyo3Y5fISOl7o0k7AjVO8B/eB4vAaJJlLsCD9dR5FIC02BwCwUPyOPRELceiiRzAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTA6w5J0jomrTgiVcWqW14hQm8SQjAdBgNVHQ4EFgQUwOsOSdI6Jq04IlXFqlteIUJvEkIwDQYJKoZIhvcNAQELBQADggEBABu4Ws7fi7Q2VWKu3DKbYwfqiK1/0OY7Nzw4INr/pzfNbOixiDKm76hI1bOlOk+QNZlFcO62L4bntfIo+L3ocZGHrEqZcCvnNHweS9TcA+ptmE0XFtNuIEPunC0xUFwmx0/IfMXyfGXmTiJVs3ZtuJSaT/Y7itrUC1Pe3oFdcNPqP7+shorEWsVgN9j+/dAe6Erl9+qYO5OSI3j6ZjdRRCBE4rSt/rFKIsxryGqvlxd+sy6ci/UWCHWHqlkdssRSB90LGdAW3AApk/iW5ymJpUp2Rp2naC3TORJj1m0JXepWEeLNT3dtCEfseHP562OFNQ7SvfzN+DmjFfcRLeTpbS0=","attributes":{"enabled":true,"nbf":1590497802,"exp":1622034402,"created":1590498403,"updated":1590498403,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590498391,"updated":1590498391}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  'c09b7167-e65c-46d7-948e-1335d65abd60',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:43 GMT',
  'Content-Length',
  '2952'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e24e7d84-5bfd-42c2-aa14-9f7b92fd1a18',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:43 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9b092ebc-7447-41df-8f23-f228de39a5b6',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:43 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c8fe1367-c1c5-4778-b618-10354ef2a99a',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:45 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5e3e47a3-0c28-4001-9235-7dbd0da0f29f',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:47 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '623d7b9b-22ba-4f03-9f4a-3d1b9a12f078',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:50 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '32889f5a-639d-4980-aa76-d6a0f3c3f2cd',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:51 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e25de8ed-d3cc-4043-98ab-a29645e52a4b',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:53 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '77dec8e6-7a9d-4b27-a602-f393edb474ed',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:56 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9abe44cd-87ad-45d5-b4ae-b7782e7d513c',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:57 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9eca9b68-5abd-4169-80e0-fbc5a263c8c7',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:00 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dea9a6f4-b476-45b7-b8b9-e6ad3731167b',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","deletedDate":1590498404,"scheduledPurgeDate":1598274404,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/f2d104a9c62a4c59b66f690017696c66","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/f2d104a9c62a4c59b66f690017696c66","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/f2d104a9c62a4c59b66f690017696c66","x5t":"-s6fv9NJHGSXMR77JGAQcvHX7kk","cer":"MIIDKDCCAhCgAwIBAgIQVw2YlcZ6RuKCJd7tgCLB/jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI2MTI1NjQyWhcNMjEwNTI2MTMwNjQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDN8XyRSe0msKn+LJmqGAL01Q4x1g5tK832OviCqEM0ErK43d9QB7rOgklvBqomwNNySD5b75VD138WOzltvpUVzqvwDEBOdXY+zSDYmdMrNbvxMZdbjcF0aXt1OKX/egCzV0iRLuud5x8JYZYDmBWhfIanp9XIrFjXoFNYcSwB59onRW97WHooOzQLknB4Sut8dsQmMBN7JKNpZqx65yPrCatlklyJvbBKqlmG9khsrFZtez3P6YoYaomF5a7Ot7JjTHp5sTQwn8WlM7E9Lr0jGeyo3Y5fISOl7o0k7AjVO8B/eB4vAaJJlLsCD9dR5FIC02BwCwUPyOPRELceiiRzAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTA6w5J0jomrTgiVcWqW14hQm8SQjAdBgNVHQ4EFgQUwOsOSdI6Jq04IlXFqlteIUJvEkIwDQYJKoZIhvcNAQELBQADggEBABu4Ws7fi7Q2VWKu3DKbYwfqiK1/0OY7Nzw4INr/pzfNbOixiDKm76hI1bOlOk+QNZlFcO62L4bntfIo+L3ocZGHrEqZcCvnNHweS9TcA+ptmE0XFtNuIEPunC0xUFwmx0/IfMXyfGXmTiJVs3ZtuJSaT/Y7itrUC1Pe3oFdcNPqP7+shorEWsVgN9j+/dAe6Erl9+qYO5OSI3j6ZjdRRCBE4rSt/rFKIsxryGqvlxd+sy6ci/UWCHWHqlkdssRSB90LGdAW3AApk/iW5ymJpUp2Rp2naC3TORJj1m0JXepWEeLNT3dtCEfseHP562OFNQ7SvfzN+DmjFfcRLeTpbS0=","attributes":{"enabled":true,"nbf":1590497802,"exp":1622034402,"created":1590498403,"updated":1590498403,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590498391,"updated":1590498391}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  '8b95aa25-5768-40fc-a4ae-72fd6ba4acd8',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:04 GMT',
  'Content-Length',
  '2952'
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
  'westus',
  'x-ms-request-id',
  '4fc5aeeb-3633-4354-812c-e74e7a3adfc2',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4A7X7Ru7ZkETZDbqBPPtTkXmYFneXndduHxX5M0hXwHNNc5H3qagziIoAKzcJmrYg8GDBNpgvYFPAUXERQh0fwkfTAFvqeJR13qJ+FZ/c6cmeTNmoKlmM7DUYoKMIS4mX2iFUQM0VUWabSS97vNFFpGcizztUnAXOZCbSWCHcrU4FSmtP9hMCUY8BBqwwFq3+zCGaNpQQyivFFyOlbZTA1pIT25JKgibAQ8CO+R3ZUwBsrltg/ZpXnRxYD3Ee1MaBrwmRXO5pMwqOz/mZLnorohaQQlEv05epLnST5bX4TJJJIlhe3sp7G45ywKWpsBnt42w0iPij0qzZoCZqWbJnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD9FaPnsa2x4Ii6c1+0Kr3knoDwGUuAxTlDf8WQK9PdJctEKlJTeTV4egyyAM2/NzJ3s6gHHWnbLoEiyamyCCw/ovmj95C2TM3CdCXbD3XF4CpnKmi5BSqIDS+aq0KVl9c0Kxqp22FEvTiUjLwFiyXsB9eNNXZqKmgmgIIh642oFfoH16PNHs2G0aIY+QQQEURgQo9bmgjN9XPKVwiGcr5OR1nxDRzMhfFUmv0OVLvLYunxmWBW+thyxWxWaigECt3eaHHgZvxrob4lvfb3tcNSm1M6QbqJp3/zHrpaiucl/7Ek5hgRoCS4DWpxF4vHGlwb9WyjS3/CqKJUhHRmxdOk=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","request_id":"cbdb4e61c63b489da5d565211fd2b3d0"}, [
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
  'f8e7c87f-12b6-4c5c-a347-f6027d289652',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:04 GMT',
  'Content-Length',
  '1361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/50ac82f4ea314337bd2830ede6220ef9","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/50ac82f4ea314337bd2830ede6220ef9","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/50ac82f4ea314337bd2830ede6220ef9","x5t":"NHMy9vo6wcUtLTQDG4_IkmKDAnM","cer":"MIIDKDCCAhCgAwIBAgIQedPPVVR5R/OMpxp95fibAzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI2MTI1NjQyWhcNMjEwNTI2MTMwNjQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDgDtftG7tmQRNkNuoE8+1OReZgWd5ed124fFfkzSFfAc01zkfepqDOIigArNwmatiDwYME2mC9gU8BRcRFCHR/CR9MAW+p4lHXeon4Vn9zpyZ5M2agqWYzsNRigowhLiZfaIVRAzRVRZptJL3u80UWkZyLPO1ScBc5kJtJYIdytTgVKa0/2EwJRjwEGrDAWrf7MIZo2lBDKK8UXI6VtlMDWkhPbkkqCJsBDwI75HdlTAGyuW2D9mledHFgPcR7UxoGvCZFc7mkzCo7P+ZkueiuiFpBCUS/Tl6kudJPltfhMkkkiWF7eynsbjnLApamwGe3jbDSI+KPSrNmgJmpZsmdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSFcfP3huP0jCkku18iYG2+YpAMCTAdBgNVHQ4EFgQUhXHz94bj9IwpJLtfImBtvmKQDAkwDQYJKoZIhvcNAQELBQADggEBAFpB1lQfEf/XrQmR6Fw3Fqwn+o944KcDPFvrvtLh3CR7PFZOqnViEF15G22u57kX/SLsdBtV+hiAGt6Zhse+3spUw3XnBK+FxIbV4i3bD4dSz89DLm2RHQpoef/KBW1hl+/1qIc+6Gw7sp6U5dcpGNKCBueTO0neQaftSDuJr9Xrk5Honh87neiZMC7cW6jULCA+Ou2P/V805RJP0Aq28z3tOSm7aruzavjCpJUbe32FvUsyw0jjFOGcXuYPD2onbtUZlQWv9eAsNYB09/oZ/T/kOHcb8vMKZCqgSUzJ4M1lQsN2274tOYLcWMCJadTwfa2zCsOSV+VZpK2zYVaXdC8=","attributes":{"enabled":true,"nbf":1590497802,"exp":1622034402,"created":1590498403,"updated":1590498403,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590498391,"updated":1590498391}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  '20a8461c-a75f-4815-8a96-066d552ca9d1',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:04 GMT',
  'Content-Length',
  '2725'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","deletedDate":1590498425,"scheduledPurgeDate":1598274425,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/50ac82f4ea314337bd2830ede6220ef9","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/50ac82f4ea314337bd2830ede6220ef9","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/50ac82f4ea314337bd2830ede6220ef9","x5t":"NHMy9vo6wcUtLTQDG4_IkmKDAnM","cer":"MIIDKDCCAhCgAwIBAgIQedPPVVR5R/OMpxp95fibAzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI2MTI1NjQyWhcNMjEwNTI2MTMwNjQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDgDtftG7tmQRNkNuoE8+1OReZgWd5ed124fFfkzSFfAc01zkfepqDOIigArNwmatiDwYME2mC9gU8BRcRFCHR/CR9MAW+p4lHXeon4Vn9zpyZ5M2agqWYzsNRigowhLiZfaIVRAzRVRZptJL3u80UWkZyLPO1ScBc5kJtJYIdytTgVKa0/2EwJRjwEGrDAWrf7MIZo2lBDKK8UXI6VtlMDWkhPbkkqCJsBDwI75HdlTAGyuW2D9mledHFgPcR7UxoGvCZFc7mkzCo7P+ZkueiuiFpBCUS/Tl6kudJPltfhMkkkiWF7eynsbjnLApamwGe3jbDSI+KPSrNmgJmpZsmdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSFcfP3huP0jCkku18iYG2+YpAMCTAdBgNVHQ4EFgQUhXHz94bj9IwpJLtfImBtvmKQDAkwDQYJKoZIhvcNAQELBQADggEBAFpB1lQfEf/XrQmR6Fw3Fqwn+o944KcDPFvrvtLh3CR7PFZOqnViEF15G22u57kX/SLsdBtV+hiAGt6Zhse+3spUw3XnBK+FxIbV4i3bD4dSz89DLm2RHQpoef/KBW1hl+/1qIc+6Gw7sp6U5dcpGNKCBueTO0neQaftSDuJr9Xrk5Honh87neiZMC7cW6jULCA+Ou2P/V805RJP0Aq28z3tOSm7aruzavjCpJUbe32FvUsyw0jjFOGcXuYPD2onbtUZlQWv9eAsNYB09/oZ/T/kOHcb8vMKZCqgSUzJ4M1lQsN2274tOYLcWMCJadTwfa2zCsOSV+VZpK2zYVaXdC8=","attributes":{"enabled":true,"nbf":1590497802,"exp":1622034402,"created":1590498403,"updated":1590498403,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590498391,"updated":1590498391}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  '371de9e3-22e0-4780-9058-e7c7074dbd3e',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:04 GMT',
  'Content-Length',
  '2952'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e716ed3b-9b99-416c-86fe-ebc02304f13b',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:04 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '17862598-58eb-4dfe-b081-59a4038ffabb',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:04 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'be1bb9d0-d13c-49dc-a9b5-1820c191c79f',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:06 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0207240a-7404-473a-80f9-5ca30dbaa8e0',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:08 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f176db25-1080-444a-adba-32f623066f29',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:11 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5f5ad154-a110-44b4-95a5-f4988454d4c1',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:13 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '216e977d-4741-41c1-868c-a5ba80fea52d',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:15 GMT'
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
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4b415e2d-497d-48c1-8864-cf05c9b17005',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","deletedDate":1590498425,"scheduledPurgeDate":1598274425,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/50ac82f4ea314337bd2830ede6220ef9","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/50ac82f4ea314337bd2830ede6220ef9","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/50ac82f4ea314337bd2830ede6220ef9","x5t":"NHMy9vo6wcUtLTQDG4_IkmKDAnM","cer":"MIIDKDCCAhCgAwIBAgIQedPPVVR5R/OMpxp95fibAzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI2MTI1NjQyWhcNMjEwNTI2MTMwNjQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDgDtftG7tmQRNkNuoE8+1OReZgWd5ed124fFfkzSFfAc01zkfepqDOIigArNwmatiDwYME2mC9gU8BRcRFCHR/CR9MAW+p4lHXeon4Vn9zpyZ5M2agqWYzsNRigowhLiZfaIVRAzRVRZptJL3u80UWkZyLPO1ScBc5kJtJYIdytTgVKa0/2EwJRjwEGrDAWrf7MIZo2lBDKK8UXI6VtlMDWkhPbkkqCJsBDwI75HdlTAGyuW2D9mledHFgPcR7UxoGvCZFc7mkzCo7P+ZkueiuiFpBCUS/Tl6kudJPltfhMkkkiWF7eynsbjnLApamwGe3jbDSI+KPSrNmgJmpZsmdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSFcfP3huP0jCkku18iYG2+YpAMCTAdBgNVHQ4EFgQUhXHz94bj9IwpJLtfImBtvmKQDAkwDQYJKoZIhvcNAQELBQADggEBAFpB1lQfEf/XrQmR6Fw3Fqwn+o944KcDPFvrvtLh3CR7PFZOqnViEF15G22u57kX/SLsdBtV+hiAGt6Zhse+3spUw3XnBK+FxIbV4i3bD4dSz89DLm2RHQpoef/KBW1hl+/1qIc+6Gw7sp6U5dcpGNKCBueTO0neQaftSDuJr9Xrk5Honh87neiZMC7cW6jULCA+Ou2P/V805RJP0Aq28z3tOSm7aruzavjCpJUbe32FvUsyw0jjFOGcXuYPD2onbtUZlQWv9eAsNYB09/oZ/T/kOHcb8vMKZCqgSUzJ4M1lQsN2274tOYLcWMCJadTwfa2zCsOSV+VZpK2zYVaXdC8=","attributes":{"enabled":true,"nbf":1590497802,"exp":1622034402,"created":1590498403,"updated":1590498403,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590498391,"updated":1590498391}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  '4112343d-dd22-452e-beb2-1b61a62f5cb6',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:18 GMT',
  'Content-Length',
  '2952'
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
  'westus',
  'x-ms-request-id',
  'f2f38313-0ac4-4752-9fbb-4c2afb77f490',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:07:19 GMT'
]);
