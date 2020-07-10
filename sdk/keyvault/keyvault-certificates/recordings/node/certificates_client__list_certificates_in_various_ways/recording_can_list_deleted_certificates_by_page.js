let nock = require('nock');

module.exports.hash = "c65d7a3e34b0caef06c9968f6c996973";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/create')
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
  '1462334a-234e-4a9f-92c6-f243fcc8eb87',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:46 GMT'
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
  'f7e366c0-cb75-4024-b233-cd90988e4a00',
  'x-ms-ests-server',
  '2.1.10761.15 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AsVtKmGFZs1Fr76pqQXRAfA_aSJHAQAAAC4hkNYOAAAA; expires=Sat, 01-Aug-2020 18:40:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 02 Jul 2020 18:40:47 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqEXfuLAjAQf8spV/YttUZvqqUnopItnQ3XO/co6grkTaduZArQgQUm2z94WNOeaFW56HY64ImsOoM/8D/AFSXCdf/sDQfOiCL3hL2fr/oe6vYfFpeYikus8dFtKYk5z7vptSfBN712R08X5/YDl3ZR0Q7xEHbFF5+26w5Pb7eEYxAEjY/3ytmzk1ys5qocafz8Y+7Ntq425ph1l8MK4LdVko+Qc0T/LRkS9m/fF/z0Pq3w01i65JsYwpd7FWgkIKgb3xm3pKsRXrblu8Q3P4R/VHgNYcAUEocDQj+1sVuG+mA6RXzVTK12my+ZFdfuT8e/0D9H/0BmuUT9AM88/sCQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAar8kqTc2Am82xg+dDHS8pw2js0LqF/FPEhK/GlYM6GCRchUpW4e0Eo1f2LU+D+Qofjb3tzCNbDBKEsa2MKfWzTcjNkPl/cD53WgjpI5BY8G1zat8BJUhIdq4S37yrl62kwi2cvidCQGSljyogpq+CWc/m2OGccyfKcaZKMX7zJHPMkjIjcK8m2cA4gDkViZnqu7AbHtIxmpTzdWnkbDXqp2t4OqWfbQDa7zJXyVXAP210qwTmYx/Kb4qo0hxLu4P1P4xWV1ssAptTzn7q3Ntow/c6tdBJRYg8Ttfm0Ig4Zbo6Y0zU3slFgXGh4F8pKdew93X/dmXPc0Sk8/i2I9DE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8f0f47a61d1c455cada23194be89766e"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending?api-version=7.1-preview&request_id=8f0f47a61d1c455cada23194be89766e',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0c112bb5-03c8-4cec-b5ef-e53f66b09fb7',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:47 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqEXfuLAjAQf8spV/YttUZvqqUnopItnQ3XO/co6grkTaduZArQgQUm2z94WNOeaFW56HY64ImsOoM/8D/AFSXCdf/sDQfOiCL3hL2fr/oe6vYfFpeYikus8dFtKYk5z7vptSfBN712R08X5/YDl3ZR0Q7xEHbFF5+26w5Pb7eEYxAEjY/3ytmzk1ys5qocafz8Y+7Ntq425ph1l8MK4LdVko+Qc0T/LRkS9m/fF/z0Pq3w01i65JsYwpd7FWgkIKgb3xm3pKsRXrblu8Q3P4R/VHgNYcAUEocDQj+1sVuG+mA6RXzVTK12my+ZFdfuT8e/0D9H/0BmuUT9AM88/sCQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAar8kqTc2Am82xg+dDHS8pw2js0LqF/FPEhK/GlYM6GCRchUpW4e0Eo1f2LU+D+Qofjb3tzCNbDBKEsa2MKfWzTcjNkPl/cD53WgjpI5BY8G1zat8BJUhIdq4S37yrl62kwi2cvidCQGSljyogpq+CWc/m2OGccyfKcaZKMX7zJHPMkjIjcK8m2cA4gDkViZnqu7AbHtIxmpTzdWnkbDXqp2t4OqWfbQDa7zJXyVXAP210qwTmYx/Kb4qo0hxLu4P1P4xWV1ssAptTzn7q3Ntow/c6tdBJRYg8Ttfm0Ig4Zbo6Y0zU3slFgXGh4F8pKdew93X/dmXPc0Sk8/i2I9DE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8f0f47a61d1c455cada23194be89766e"}, [
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
  '1539d082-d0dd-4bad-a261-35456ad2b9ca',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:47 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqEXfuLAjAQf8spV/YttUZvqqUnopItnQ3XO/co6grkTaduZArQgQUm2z94WNOeaFW56HY64ImsOoM/8D/AFSXCdf/sDQfOiCL3hL2fr/oe6vYfFpeYikus8dFtKYk5z7vptSfBN712R08X5/YDl3ZR0Q7xEHbFF5+26w5Pb7eEYxAEjY/3ytmzk1ys5qocafz8Y+7Ntq425ph1l8MK4LdVko+Qc0T/LRkS9m/fF/z0Pq3w01i65JsYwpd7FWgkIKgb3xm3pKsRXrblu8Q3P4R/VHgNYcAUEocDQj+1sVuG+mA6RXzVTK12my+ZFdfuT8e/0D9H/0BmuUT9AM88/sCQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAar8kqTc2Am82xg+dDHS8pw2js0LqF/FPEhK/GlYM6GCRchUpW4e0Eo1f2LU+D+Qofjb3tzCNbDBKEsa2MKfWzTcjNkPl/cD53WgjpI5BY8G1zat8BJUhIdq4S37yrl62kwi2cvidCQGSljyogpq+CWc/m2OGccyfKcaZKMX7zJHPMkjIjcK8m2cA4gDkViZnqu7AbHtIxmpTzdWnkbDXqp2t4OqWfbQDa7zJXyVXAP210qwTmYx/Kb4qo0hxLu4P1P4xWV1ssAptTzn7q3Ntow/c6tdBJRYg8Ttfm0Ig4Zbo6Y0zU3slFgXGh4F8pKdew93X/dmXPc0Sk8/i2I9DE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8f0f47a61d1c455cada23194be89766e"}, [
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
  'a4603e96-df0c-4804-8fa6-425a011f0be4',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:47 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqEXfuLAjAQf8spV/YttUZvqqUnopItnQ3XO/co6grkTaduZArQgQUm2z94WNOeaFW56HY64ImsOoM/8D/AFSXCdf/sDQfOiCL3hL2fr/oe6vYfFpeYikus8dFtKYk5z7vptSfBN712R08X5/YDl3ZR0Q7xEHbFF5+26w5Pb7eEYxAEjY/3ytmzk1ys5qocafz8Y+7Ntq425ph1l8MK4LdVko+Qc0T/LRkS9m/fF/z0Pq3w01i65JsYwpd7FWgkIKgb3xm3pKsRXrblu8Q3P4R/VHgNYcAUEocDQj+1sVuG+mA6RXzVTK12my+ZFdfuT8e/0D9H/0BmuUT9AM88/sCQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAar8kqTc2Am82xg+dDHS8pw2js0LqF/FPEhK/GlYM6GCRchUpW4e0Eo1f2LU+D+Qofjb3tzCNbDBKEsa2MKfWzTcjNkPl/cD53WgjpI5BY8G1zat8BJUhIdq4S37yrl62kwi2cvidCQGSljyogpq+CWc/m2OGccyfKcaZKMX7zJHPMkjIjcK8m2cA4gDkViZnqu7AbHtIxmpTzdWnkbDXqp2t4OqWfbQDa7zJXyVXAP210qwTmYx/Kb4qo0hxLu4P1P4xWV1ssAptTzn7q3Ntow/c6tdBJRYg8Ttfm0Ig4Zbo6Y0zU3slFgXGh4F8pKdew93X/dmXPc0Sk8/i2I9DE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8f0f47a61d1c455cada23194be89766e"}, [
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
  '06cbba8f-ce56-46e3-99e8-0565dd687961',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:50 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqEXfuLAjAQf8spV/YttUZvqqUnopItnQ3XO/co6grkTaduZArQgQUm2z94WNOeaFW56HY64ImsOoM/8D/AFSXCdf/sDQfOiCL3hL2fr/oe6vYfFpeYikus8dFtKYk5z7vptSfBN712R08X5/YDl3ZR0Q7xEHbFF5+26w5Pb7eEYxAEjY/3ytmzk1ys5qocafz8Y+7Ntq425ph1l8MK4LdVko+Qc0T/LRkS9m/fF/z0Pq3w01i65JsYwpd7FWgkIKgb3xm3pKsRXrblu8Q3P4R/VHgNYcAUEocDQj+1sVuG+mA6RXzVTK12my+ZFdfuT8e/0D9H/0BmuUT9AM88/sCQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAar8kqTc2Am82xg+dDHS8pw2js0LqF/FPEhK/GlYM6GCRchUpW4e0Eo1f2LU+D+Qofjb3tzCNbDBKEsa2MKfWzTcjNkPl/cD53WgjpI5BY8G1zat8BJUhIdq4S37yrl62kwi2cvidCQGSljyogpq+CWc/m2OGccyfKcaZKMX7zJHPMkjIjcK8m2cA4gDkViZnqu7AbHtIxmpTzdWnkbDXqp2t4OqWfbQDa7zJXyVXAP210qwTmYx/Kb4qo0hxLu4P1P4xWV1ssAptTzn7q3Ntow/c6tdBJRYg8Ttfm0Ig4Zbo6Y0zU3slFgXGh4F8pKdew93X/dmXPc0Sk8/i2I9DE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8f0f47a61d1c455cada23194be89766e"}, [
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
  'f0ef12b5-5ca9-466c-9b64-7e7b42728967',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:52 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqEXfuLAjAQf8spV/YttUZvqqUnopItnQ3XO/co6grkTaduZArQgQUm2z94WNOeaFW56HY64ImsOoM/8D/AFSXCdf/sDQfOiCL3hL2fr/oe6vYfFpeYikus8dFtKYk5z7vptSfBN712R08X5/YDl3ZR0Q7xEHbFF5+26w5Pb7eEYxAEjY/3ytmzk1ys5qocafz8Y+7Ntq425ph1l8MK4LdVko+Qc0T/LRkS9m/fF/z0Pq3w01i65JsYwpd7FWgkIKgb3xm3pKsRXrblu8Q3P4R/VHgNYcAUEocDQj+1sVuG+mA6RXzVTK12my+ZFdfuT8e/0D9H/0BmuUT9AM88/sCQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAar8kqTc2Am82xg+dDHS8pw2js0LqF/FPEhK/GlYM6GCRchUpW4e0Eo1f2LU+D+Qofjb3tzCNbDBKEsa2MKfWzTcjNkPl/cD53WgjpI5BY8G1zat8BJUhIdq4S37yrl62kwi2cvidCQGSljyogpq+CWc/m2OGccyfKcaZKMX7zJHPMkjIjcK8m2cA4gDkViZnqu7AbHtIxmpTzdWnkbDXqp2t4OqWfbQDa7zJXyVXAP210qwTmYx/Kb4qo0hxLu4P1P4xWV1ssAptTzn7q3Ntow/c6tdBJRYg8Ttfm0Ig4Zbo6Y0zU3slFgXGh4F8pKdew93X/dmXPc0Sk8/i2I9DE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8f0f47a61d1c455cada23194be89766e"}, [
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
  '6e40f675-afbb-4661-a486-c201cf6a9d74',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:54 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqEXfuLAjAQf8spV/YttUZvqqUnopItnQ3XO/co6grkTaduZArQgQUm2z94WNOeaFW56HY64ImsOoM/8D/AFSXCdf/sDQfOiCL3hL2fr/oe6vYfFpeYikus8dFtKYk5z7vptSfBN712R08X5/YDl3ZR0Q7xEHbFF5+26w5Pb7eEYxAEjY/3ytmzk1ys5qocafz8Y+7Ntq425ph1l8MK4LdVko+Qc0T/LRkS9m/fF/z0Pq3w01i65JsYwpd7FWgkIKgb3xm3pKsRXrblu8Q3P4R/VHgNYcAUEocDQj+1sVuG+mA6RXzVTK12my+ZFdfuT8e/0D9H/0BmuUT9AM88/sCQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAar8kqTc2Am82xg+dDHS8pw2js0LqF/FPEhK/GlYM6GCRchUpW4e0Eo1f2LU+D+Qofjb3tzCNbDBKEsa2MKfWzTcjNkPl/cD53WgjpI5BY8G1zat8BJUhIdq4S37yrl62kwi2cvidCQGSljyogpq+CWc/m2OGccyfKcaZKMX7zJHPMkjIjcK8m2cA4gDkViZnqu7AbHtIxmpTzdWnkbDXqp2t4OqWfbQDa7zJXyVXAP210qwTmYx/Kb4qo0hxLu4P1P4xWV1ssAptTzn7q3Ntow/c6tdBJRYg8Ttfm0Ig4Zbo6Y0zU3slFgXGh4F8pKdew93X/dmXPc0Sk8/i2I9DE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8f0f47a61d1c455cada23194be89766e"}, [
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
  'a8c8d1f2-21ac-4265-be60-f50866b480f5',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:56 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqEXfuLAjAQf8spV/YttUZvqqUnopItnQ3XO/co6grkTaduZArQgQUm2z94WNOeaFW56HY64ImsOoM/8D/AFSXCdf/sDQfOiCL3hL2fr/oe6vYfFpeYikus8dFtKYk5z7vptSfBN712R08X5/YDl3ZR0Q7xEHbFF5+26w5Pb7eEYxAEjY/3ytmzk1ys5qocafz8Y+7Ntq425ph1l8MK4LdVko+Qc0T/LRkS9m/fF/z0Pq3w01i65JsYwpd7FWgkIKgb3xm3pKsRXrblu8Q3P4R/VHgNYcAUEocDQj+1sVuG+mA6RXzVTK12my+ZFdfuT8e/0D9H/0BmuUT9AM88/sCQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAar8kqTc2Am82xg+dDHS8pw2js0LqF/FPEhK/GlYM6GCRchUpW4e0Eo1f2LU+D+Qofjb3tzCNbDBKEsa2MKfWzTcjNkPl/cD53WgjpI5BY8G1zat8BJUhIdq4S37yrl62kwi2cvidCQGSljyogpq+CWc/m2OGccyfKcaZKMX7zJHPMkjIjcK8m2cA4gDkViZnqu7AbHtIxmpTzdWnkbDXqp2t4OqWfbQDa7zJXyVXAP210qwTmYx/Kb4qo0hxLu4P1P4xWV1ssAptTzn7q3Ntow/c6tdBJRYg8Ttfm0Ig4Zbo6Y0zU3slFgXGh4F8pKdew93X/dmXPc0Sk8/i2I9DE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8f0f47a61d1c455cada23194be89766e"}, [
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
  '6cdd07fd-3f19-4ad6-a1db-3439e4302100',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:58 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqEXfuLAjAQf8spV/YttUZvqqUnopItnQ3XO/co6grkTaduZArQgQUm2z94WNOeaFW56HY64ImsOoM/8D/AFSXCdf/sDQfOiCL3hL2fr/oe6vYfFpeYikus8dFtKYk5z7vptSfBN712R08X5/YDl3ZR0Q7xEHbFF5+26w5Pb7eEYxAEjY/3ytmzk1ys5qocafz8Y+7Ntq425ph1l8MK4LdVko+Qc0T/LRkS9m/fF/z0Pq3w01i65JsYwpd7FWgkIKgb3xm3pKsRXrblu8Q3P4R/VHgNYcAUEocDQj+1sVuG+mA6RXzVTK12my+ZFdfuT8e/0D9H/0BmuUT9AM88/sCQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAar8kqTc2Am82xg+dDHS8pw2js0LqF/FPEhK/GlYM6GCRchUpW4e0Eo1f2LU+D+Qofjb3tzCNbDBKEsa2MKfWzTcjNkPl/cD53WgjpI5BY8G1zat8BJUhIdq4S37yrl62kwi2cvidCQGSljyogpq+CWc/m2OGccyfKcaZKMX7zJHPMkjIjcK8m2cA4gDkViZnqu7AbHtIxmpTzdWnkbDXqp2t4OqWfbQDa7zJXyVXAP210qwTmYx/Kb4qo0hxLu4P1P4xWV1ssAptTzn7q3Ntow/c6tdBJRYg8Ttfm0Ig4Zbo6Y0zU3slFgXGh4F8pKdew93X/dmXPc0Sk8/i2I9DE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8f0f47a61d1c455cada23194be89766e"}, [
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
  'f8debd20-9a17-4c71-85ab-045805ffde53',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:00 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqEXfuLAjAQf8spV/YttUZvqqUnopItnQ3XO/co6grkTaduZArQgQUm2z94WNOeaFW56HY64ImsOoM/8D/AFSXCdf/sDQfOiCL3hL2fr/oe6vYfFpeYikus8dFtKYk5z7vptSfBN712R08X5/YDl3ZR0Q7xEHbFF5+26w5Pb7eEYxAEjY/3ytmzk1ys5qocafz8Y+7Ntq425ph1l8MK4LdVko+Qc0T/LRkS9m/fF/z0Pq3w01i65JsYwpd7FWgkIKgb3xm3pKsRXrblu8Q3P4R/VHgNYcAUEocDQj+1sVuG+mA6RXzVTK12my+ZFdfuT8e/0D9H/0BmuUT9AM88/sCQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAar8kqTc2Am82xg+dDHS8pw2js0LqF/FPEhK/GlYM6GCRchUpW4e0Eo1f2LU+D+Qofjb3tzCNbDBKEsa2MKfWzTcjNkPl/cD53WgjpI5BY8G1zat8BJUhIdq4S37yrl62kwi2cvidCQGSljyogpq+CWc/m2OGccyfKcaZKMX7zJHPMkjIjcK8m2cA4gDkViZnqu7AbHtIxmpTzdWnkbDXqp2t4OqWfbQDa7zJXyVXAP210qwTmYx/Kb4qo0hxLu4P1P4xWV1ssAptTzn7q3Ntow/c6tdBJRYg8Ttfm0Ig4Zbo6Y0zU3slFgXGh4F8pKdew93X/dmXPc0Sk8/i2I9DE=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0","request_id":"8f0f47a61d1c455cada23194be89766e"}, [
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
  '337201ca-d291-4aa3-8991-69072f08319f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:02 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/b651854085864cdf87f6c4de6d10c572","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-0/b651854085864cdf87f6c4de6d10c572","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-0/b651854085864cdf87f6c4de6d10c572","x5t":"rDHixBCjPDVEIGvvMEgRuOERO_g","cer":"MIIDKDCCAhCgAwIBAgIQeTyAiKGUQ1mbbJB9He351DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMTAxWhcNMjEwNzAyMTg0MTAxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCoRd+4sCMBB/yylX9i21Rm+qpSeiki2dDdc79yjqCuRNp25kCtCBBSbbP3hY055oVbnodjrgiaw6gz/wP8AVJcJ1/+wNB86IIveEvZ+v+h7q9h8Wl5iKS6zx0W0piTnPu+m1J8E3vXZHTxfn9gOXdlHRDvEQdsUXn7brDk9vt4RjEASNj/fK2bOTXKzmqhxp/Pxj7s22rjbmmHWXwwrgt1WSj5BzRP8tGRL2b98X/PQ+rfDTWLrkmxjCl3sVaCQgqBvfGbekqxFetuW7xDc/hH9UeA1hwBQShwNCP7WxW4b6YDpFfNVMrXabL5kV1+5Px7/QP0f/QGa5RP0Azzz+wJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTAsHctQT1WsYtrm92IjyjkSJwVdDAdBgNVHQ4EFgQUwLB3LUE9VrGLa5vdiI8o5EicFXQwDQYJKoZIhvcNAQELBQADggEBAFCUBMSjOZyOPQnOAVwTSTb2gE2i7sfworg7bXkZMynjWOmbxt2JzmLjpgqkFT1lg3Pxbpi9umU8LxOyrRDKmxuVEDcGHy+C9nTq09kuqN5w5Uolzs6xP6uOMBCqYDjsKoTIxGU8qLFQImLwekGfW7l8hUEC6JmXlTILUdh/nj7yLZ1R3byCskw21SfgaoGkFxu/SKcxZ/UL8HWBZ/60SalOECfvYXZeXObX7k7A55H1yA4YmgakhWJ4j2EcdDG78CdQ8I3yOvt4Vy8wCddnkN9io0INIXP6XzR1/ERf1c5EyUia+Npw0/9krEOLoSBSrWcs6as1qqGF806pJoa8Zfw=","attributes":{"enabled":true,"nbf":1593714661,"exp":1625251261,"created":1593715261,"updated":1593715261,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715248,"updated":1593715248}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending"}}, [
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
  '31c61f91-9582-40ab-8185-c13ec20df62d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:02 GMT',
  'Content-Length',
  '2620'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending?api-version=7.1-preview&request_id=6cec2e67c8704f539590d7e95db803cf',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '35d8b353-b8c4-4618-b1a7-4517c18d4340',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:03 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  '6ba2173a-28ac-4b75-b00a-ea04d5da841e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:03 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  '1e664971-a1cf-488f-9838-d2bc89b721bc',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:03 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  '1ef93759-8b25-4e53-a45c-6e9b2d3fa127',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:05 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  '3b066fc0-3dad-46d7-8266-4186783946b1',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:07 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  'ebc57995-9775-4d29-a4b1-8c1afcf54c85',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:09 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  '5bca4fcf-39ba-49af-8e90-0a89a1ca4711',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:11 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  '5a9c4b76-28aa-40c4-9c94-fc086ad52449',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:13 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  'bfda9865-1795-4e83-9615-5f70d72b6d31',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:15 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  '6f380501-b640-408c-a11e-d6c716c375e3',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:17 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  '3c0d982d-4d1c-4c87-a045-d392875a774b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:19 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  '5202e010-b3a4-4586-890f-733deb1f879e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:21 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  '837262ce-efc3-4e13-9d70-33e4d4e4ce14',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:23 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  '5f8d58d6-3714-4f85-8fb3-eed57b2b497b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:25 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  'f1bc50f5-dc84-4226-bbcd-136af36caf79',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:27 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  '5a56660c-fef1-498d-9410-562fb42c47ae',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:29 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  'b4ed8120-735e-41c0-9396-b1e1f523dd04',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:32 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  'e64b3f2d-d366-4805-9309-5d0d3709b2b8',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:34 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvnkR+yyoY2YHOysijJZqAcogJgXu6l9f1CfoBGKW3GvGK89rf7LAob05ykTy3V4ObJK8K/AhznPrCfKfsQ9Sf9MZ9FdxXThk62M6g48Nyl4lYxazsKKRMZTg0PNZBAUDFVJtYySpKfKHw3wOvDBzrZ5VssLNbM6cjt0/AeQrxk2sslEw6jvdHlw31alirziw55FAhSBvzR09kBCWSXTSETHl8tbbk6I1/BH+tvtWV5AjSAZxuXKoS1PNBLvypa8SyZM87G1BdbgH/Au6hi2X+CCjWlG+OI0cNn03w8I4lyTrKOFWqDmMbNye8x/y9yspurcY2wcNwTMkHea5wVTf3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAGO2izxIYLGL8QPCCx6dW3OJ8lWN7WcdWSleXWaih4qtcOvhIA4U5Xba6mV9eYdIMPH2vAgu9fhCYvQP9yfYXkEq07F7kQKdhpLJxn7d1fLs2nfJ+Toh6X4A5OdtRNgiBW9mpn+OLmk1zfp9+QosJ/R3US+ts36EyYsxYLV52Sn8vx4T6WPQphPvY+LsuRC7Jc/3CZCMNv/tqBY4Y2J2ZrgwDbtBpXb9AdXAi/jFzvXtB/m8neTUf8eE3Eha2A4+d4mPHUJ87dtUii2UPxzSsSnFfbMnGEaXXVp+3QIEbMLuEftnYWw5AXok/xjGcjWvqm11kxPMjRZtrhMRmddj5U=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1","request_id":"6cec2e67c8704f539590d7e95db803cf"}, [
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
  'f76b2cc5-2fb5-4298-a4cb-3e44962c0e63',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:36 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/6301c17d947c49798a79d2184ba68884","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-1/6301c17d947c49798a79d2184ba68884","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-1/6301c17d947c49798a79d2184ba68884","x5t":"LPNYaNQTdYGFWu1JZ2kEVkGTN6E","cer":"MIIDKDCCAhCgAwIBAgIQE4XYXEWaStutayp2wTYWQDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMTM0WhcNMjEwNzAyMTg0MTM0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+eRH7LKhjZgc7KyKMlmoByiAmBe7qX1/UJ+gEYpbca8Yrz2t/ssChvTnKRPLdXg5skrwr8CHOc+sJ8p+xD1J/0xn0V3FdOGTrYzqDjw3KXiVjFrOwopExlODQ81kEBQMVUm1jJKkp8ofDfA68MHOtnlWyws1szpyO3T8B5CvGTayyUTDqO90eXDfVqWKvOLDnkUCFIG/NHT2QEJZJdNIRMeXy1tuTojX8Ef62+1ZXkCNIBnG5cqhLU80Eu/KlrxLJkzzsbUF1uAf8C7qGLZf4IKNaUb44jRw2fTfDwjiXJOso4VaoOYxs3J7zH/L3Kym6txjbBw3BMyQd5rnBVN/fAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSLcbTw7528mAmEfgjhSl6sF9l8fTAdBgNVHQ4EFgQUi3G08O+dvJgJhH4I4UperBfZfH0wDQYJKoZIhvcNAQELBQADggEBALaBTQVrb2JvyzkOvQIo217beU/TfFsc6BR58Tc37LobERGfTjkeqI/Uf93o0n/Q4jwZgmCWRj3ACx41ODKwaIyiE1OBN/YaSOn4q9SU3kjlubD2OVRKzMcZXHnbL/DNqsRNxX9la0LwAmVuIqf+KXEkh7mPqCduAa5y2om1JotEyUXbr3GwEuOcU4FqrfuVYzm/SmFlCexzKORiKr19VJZukqnhrls8cEcY0PgSEBjTJIBSct3d7oS0lIw90Be6jnbZxZF+PXFpkBlqOvi8ZFUJw/4dwMzDzW0tzVmTV33JLZaHJfogDRjnPZrp1VbYntiTejDUlzUnz+NrW6P72BU=","attributes":{"enabled":true,"nbf":1593714694,"exp":1625251294,"created":1593715294,"updated":1593715294,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715263,"updated":1593715263}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending"}}, [
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
  'f9ac674c-e650-4bf5-9e06-0241acb7cb43',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:36 GMT',
  'Content-Length',
  '2620'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0","deletedDate":1593715296,"scheduledPurgeDate":1601491296,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/b651854085864cdf87f6c4de6d10c572","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-0/b651854085864cdf87f6c4de6d10c572","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-0/b651854085864cdf87f6c4de6d10c572","x5t":"rDHixBCjPDVEIGvvMEgRuOERO_g","cer":"MIIDKDCCAhCgAwIBAgIQeTyAiKGUQ1mbbJB9He351DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMTAxWhcNMjEwNzAyMTg0MTAxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCoRd+4sCMBB/yylX9i21Rm+qpSeiki2dDdc79yjqCuRNp25kCtCBBSbbP3hY055oVbnodjrgiaw6gz/wP8AVJcJ1/+wNB86IIveEvZ+v+h7q9h8Wl5iKS6zx0W0piTnPu+m1J8E3vXZHTxfn9gOXdlHRDvEQdsUXn7brDk9vt4RjEASNj/fK2bOTXKzmqhxp/Pxj7s22rjbmmHWXwwrgt1WSj5BzRP8tGRL2b98X/PQ+rfDTWLrkmxjCl3sVaCQgqBvfGbekqxFetuW7xDc/hH9UeA1hwBQShwNCP7WxW4b6YDpFfNVMrXabL5kV1+5Px7/QP0f/QGa5RP0Azzz+wJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTAsHctQT1WsYtrm92IjyjkSJwVdDAdBgNVHQ4EFgQUwLB3LUE9VrGLa5vdiI8o5EicFXQwDQYJKoZIhvcNAQELBQADggEBAFCUBMSjOZyOPQnOAVwTSTb2gE2i7sfworg7bXkZMynjWOmbxt2JzmLjpgqkFT1lg3Pxbpi9umU8LxOyrRDKmxuVEDcGHy+C9nTq09kuqN5w5Uolzs6xP6uOMBCqYDjsKoTIxGU8qLFQImLwekGfW7l8hUEC6JmXlTILUdh/nj7yLZ1R3byCskw21SfgaoGkFxu/SKcxZ/UL8HWBZ/60SalOECfvYXZeXObX7k7A55H1yA4YmgakhWJ4j2EcdDG78CdQ8I3yOvt4Vy8wCddnkN9io0INIXP6XzR1/ERf1c5EyUia+Npw0/9krEOLoSBSrWcs6as1qqGF806pJoa8Zfw=","attributes":{"enabled":true,"nbf":1593714661,"exp":1625251261,"created":1593715261,"updated":1593715261,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715248,"updated":1593715248}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending"}}, [
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
  '8f45ebb8-c8f2-4324-b76a-536d41940438',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:36 GMT',
  'Content-Length',
  '2826'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1aea1bf4-fe71-43ba-9647-23ca6e376469',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a7e9dc95-8739-4eab-8649-e7951e66056b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '48bab74e-51ad-4c87-ad78-138cba6241e1',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e0e77fa4-03d1-4bf0-a204-63fbdce8b168',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4f07e8da-0995-44f3-916e-c38e6a9c040b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c2e48f21-f510-4bb4-8517-d1c8e87584db',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8fc4ffa9-784f-4f2d-931f-979fb68582d6',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e4d11222-5c26-4a46-b476-be33f1e90ef1',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0","deletedDate":1593715296,"scheduledPurgeDate":1601491296,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/b651854085864cdf87f6c4de6d10c572","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-0/b651854085864cdf87f6c4de6d10c572","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-0/b651854085864cdf87f6c4de6d10c572","x5t":"rDHixBCjPDVEIGvvMEgRuOERO_g","cer":"MIIDKDCCAhCgAwIBAgIQeTyAiKGUQ1mbbJB9He351DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMTAxWhcNMjEwNzAyMTg0MTAxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCoRd+4sCMBB/yylX9i21Rm+qpSeiki2dDdc79yjqCuRNp25kCtCBBSbbP3hY055oVbnodjrgiaw6gz/wP8AVJcJ1/+wNB86IIveEvZ+v+h7q9h8Wl5iKS6zx0W0piTnPu+m1J8E3vXZHTxfn9gOXdlHRDvEQdsUXn7brDk9vt4RjEASNj/fK2bOTXKzmqhxp/Pxj7s22rjbmmHWXwwrgt1WSj5BzRP8tGRL2b98X/PQ+rfDTWLrkmxjCl3sVaCQgqBvfGbekqxFetuW7xDc/hH9UeA1hwBQShwNCP7WxW4b6YDpFfNVMrXabL5kV1+5Px7/QP0f/QGa5RP0Azzz+wJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTAsHctQT1WsYtrm92IjyjkSJwVdDAdBgNVHQ4EFgQUwLB3LUE9VrGLa5vdiI8o5EicFXQwDQYJKoZIhvcNAQELBQADggEBAFCUBMSjOZyOPQnOAVwTSTb2gE2i7sfworg7bXkZMynjWOmbxt2JzmLjpgqkFT1lg3Pxbpi9umU8LxOyrRDKmxuVEDcGHy+C9nTq09kuqN5w5Uolzs6xP6uOMBCqYDjsKoTIxGU8qLFQImLwekGfW7l8hUEC6JmXlTILUdh/nj7yLZ1R3byCskw21SfgaoGkFxu/SKcxZ/UL8HWBZ/60SalOECfvYXZeXObX7k7A55H1yA4YmgakhWJ4j2EcdDG78CdQ8I3yOvt4Vy8wCddnkN9io0INIXP6XzR1/ERf1c5EyUia+Npw0/9krEOLoSBSrWcs6as1qqGF806pJoa8Zfw=","attributes":{"enabled":true,"nbf":1593714661,"exp":1625251261,"created":1593715261,"updated":1593715261,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715248,"updated":1593715248}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending"}}, [
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
  '5c216cf8-8656-4852-9c32-861d4d5a3422',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:50 GMT',
  'Content-Length',
  '2826'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1","deletedDate":1593715311,"scheduledPurgeDate":1601491311,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/6301c17d947c49798a79d2184ba68884","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-1/6301c17d947c49798a79d2184ba68884","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-1/6301c17d947c49798a79d2184ba68884","x5t":"LPNYaNQTdYGFWu1JZ2kEVkGTN6E","cer":"MIIDKDCCAhCgAwIBAgIQE4XYXEWaStutayp2wTYWQDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMTM0WhcNMjEwNzAyMTg0MTM0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+eRH7LKhjZgc7KyKMlmoByiAmBe7qX1/UJ+gEYpbca8Yrz2t/ssChvTnKRPLdXg5skrwr8CHOc+sJ8p+xD1J/0xn0V3FdOGTrYzqDjw3KXiVjFrOwopExlODQ81kEBQMVUm1jJKkp8ofDfA68MHOtnlWyws1szpyO3T8B5CvGTayyUTDqO90eXDfVqWKvOLDnkUCFIG/NHT2QEJZJdNIRMeXy1tuTojX8Ef62+1ZXkCNIBnG5cqhLU80Eu/KlrxLJkzzsbUF1uAf8C7qGLZf4IKNaUb44jRw2fTfDwjiXJOso4VaoOYxs3J7zH/L3Kym6txjbBw3BMyQd5rnBVN/fAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSLcbTw7528mAmEfgjhSl6sF9l8fTAdBgNVHQ4EFgQUi3G08O+dvJgJhH4I4UperBfZfH0wDQYJKoZIhvcNAQELBQADggEBALaBTQVrb2JvyzkOvQIo217beU/TfFsc6BR58Tc37LobERGfTjkeqI/Uf93o0n/Q4jwZgmCWRj3ACx41ODKwaIyiE1OBN/YaSOn4q9SU3kjlubD2OVRKzMcZXHnbL/DNqsRNxX9la0LwAmVuIqf+KXEkh7mPqCduAa5y2om1JotEyUXbr3GwEuOcU4FqrfuVYzm/SmFlCexzKORiKr19VJZukqnhrls8cEcY0PgSEBjTJIBSct3d7oS0lIw90Be6jnbZxZF+PXFpkBlqOvi8ZFUJw/4dwMzDzW0tzVmTV33JLZaHJfogDRjnPZrp1VbYntiTejDUlzUnz+NrW6P72BU=","attributes":{"enabled":true,"nbf":1593714694,"exp":1625251294,"created":1593715294,"updated":1593715294,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715263,"updated":1593715263}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending"}}, [
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
  '9af00c15-1558-4c9a-85e1-c040efc79e7a',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:50 GMT',
  'Content-Length',
  '2826'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '15698182-4392-4b70-b269-500339888a9c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '876273a4-07c8-4169-ac50-9284dd64ac4b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '83e26837-28f7-4b73-a466-8e07655dd3ee',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '937c82cd-d992-4d7f-896c-3bfab3eaf316',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '94418df8-17be-4395-a557-d49efdd9f4a0',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6d3cfcbf-1e2f-44f0-864e-c53975a6ea3c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:41:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f7ead9b9-7cdc-4f86-ae77-909fdc5a9f53',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '17dc3e17-bda3-425a-accf-61f149798c61',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1","deletedDate":1593715311,"scheduledPurgeDate":1601491311,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/6301c17d947c49798a79d2184ba68884","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-1/6301c17d947c49798a79d2184ba68884","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-1/6301c17d947c49798a79d2184ba68884","x5t":"LPNYaNQTdYGFWu1JZ2kEVkGTN6E","cer":"MIIDKDCCAhCgAwIBAgIQE4XYXEWaStutayp2wTYWQDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMTM0WhcNMjEwNzAyMTg0MTM0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+eRH7LKhjZgc7KyKMlmoByiAmBe7qX1/UJ+gEYpbca8Yrz2t/ssChvTnKRPLdXg5skrwr8CHOc+sJ8p+xD1J/0xn0V3FdOGTrYzqDjw3KXiVjFrOwopExlODQ81kEBQMVUm1jJKkp8ofDfA68MHOtnlWyws1szpyO3T8B5CvGTayyUTDqO90eXDfVqWKvOLDnkUCFIG/NHT2QEJZJdNIRMeXy1tuTojX8Ef62+1ZXkCNIBnG5cqhLU80Eu/KlrxLJkzzsbUF1uAf8C7qGLZf4IKNaUb44jRw2fTfDwjiXJOso4VaoOYxs3J7zH/L3Kym6txjbBw3BMyQd5rnBVN/fAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSLcbTw7528mAmEfgjhSl6sF9l8fTAdBgNVHQ4EFgQUi3G08O+dvJgJhH4I4UperBfZfH0wDQYJKoZIhvcNAQELBQADggEBALaBTQVrb2JvyzkOvQIo217beU/TfFsc6BR58Tc37LobERGfTjkeqI/Uf93o0n/Q4jwZgmCWRj3ACx41ODKwaIyiE1OBN/YaSOn4q9SU3kjlubD2OVRKzMcZXHnbL/DNqsRNxX9la0LwAmVuIqf+KXEkh7mPqCduAa5y2om1JotEyUXbr3GwEuOcU4FqrfuVYzm/SmFlCexzKORiKr19VJZukqnhrls8cEcY0PgSEBjTJIBSct3d7oS0lIw90Be6jnbZxZF+PXFpkBlqOvi8ZFUJw/4dwMzDzW0tzVmTV33JLZaHJfogDRjnPZrp1VbYntiTejDUlzUnz+NrW6P72BU=","attributes":{"enabled":true,"nbf":1593714694,"exp":1625251294,"created":1593715294,"updated":1593715294,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715263,"updated":1593715263}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending"}}, [
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
  '8468f523-e8b5-460a-95e1-04367d6cdd0b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:05 GMT',
  'Content-Length',
  '2826'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0","deletedDate":1593715296,"scheduledPurgeDate":1601491296,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0","x5t":"rDHixBCjPDVEIGvvMEgRuOERO_g","attributes":{"enabled":true,"nbf":1593714661,"exp":1625251261,"created":1593715261,"updated":1593715261,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1","deletedDate":1593715311,"scheduledPurgeDate":1601491311,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1","x5t":"LPNYaNQTdYGFWu1JZ2kEVkGTN6E","attributes":{"enabled":true,"nbf":1593714694,"exp":1625251294,"created":1593715294,"updated":1593715294,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":null}, [
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
  'bf779178-c742-477f-ad72-43b8be14b756',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:05 GMT',
  'Content-Length',
  '1117'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
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
  '71c1d89b-34ea-4be9-8f1f-b56141e4b7d4',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
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
  'c211edf8-0650-4374-8389-344d84e7a5a0',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:05 GMT'
]);
