let nock = require('nock');

module.exports.hash = "0333719e59c844a2cb33e245a386b9e3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/create')
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
  'westus2',
  'x-ms-request-id',
  '341dbe1c-3f79-431d-851e-e21d68cf38f3',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:14 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
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
  'adc272bc-6494-40ee-b21d-3a5896eff900',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDCgAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:58:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:58:14 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/create', {"policy":{"key_props":{},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArz38dJC/HsEddd+2aDgSmMW5Q4cJ9xC6zYSOjYsgqrJmLKlmTnnb/nt/bpB4BTOSUJV0MRvK8qg+atrRZudJvGbvnrkYs0+01c2wV7aV9rbmUXImXjb+w0u4RgPVGBPlEfVcYTElHoMa5o6ke4OvEQk+vFX4dN+mKPitx5xmyHMWW5k7Df34wha1DPD34XbWMUyD9nY2kmf0REJYenFJ62oNUgLWqHxc4NGaCHhZIQRY0grpe2BV3Dkvs/+lVgeQKYPa5EZLF9B6TraN70k1U2JFUtWjSduK6UNUBVxh57S77JjzHHQtDd+792vgQQnQKFchDILRRZYw88QFbubE4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKJnQq0Jw7z0ID8pnqv8C7bgEIv757lv16CXywkkCCyHYk7Swrs/yJYTPmSkKS0BDr4Ci4PR2dbo5Uw5RPeICHW1LGi9tUaT0N8EalYo7u36dfBGDvGpWTqmeMuSSgFbZkyj4vsv5f5KrbxAlfo6uY+LrseSQBKlZ9yEoKMXO6Wik40z9JdykIHMFGH/cd8oyhVMMBtv+zRp5BOYjv+vqTjtNdBlC0z3oiWrNNcFjAaQvy9W9Ox1GSnt4kN+FzFbhaUAKOaRfSkdIWMorvoasBEUdlJg1Lv6+99NZcfQrUVowggwhRayvqnVr0jjfMVLl0hYjE6c9EpdvimGv7CVcxg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4609e6719e3142ba8183a761223b63b5"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending?api-version=7.2&request_id=4609e6719e3142ba8183a761223b63b5',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7d081911-355d-4ba0-94f5-e971110c56cc',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:14 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArz38dJC/HsEddd+2aDgSmMW5Q4cJ9xC6zYSOjYsgqrJmLKlmTnnb/nt/bpB4BTOSUJV0MRvK8qg+atrRZudJvGbvnrkYs0+01c2wV7aV9rbmUXImXjb+w0u4RgPVGBPlEfVcYTElHoMa5o6ke4OvEQk+vFX4dN+mKPitx5xmyHMWW5k7Df34wha1DPD34XbWMUyD9nY2kmf0REJYenFJ62oNUgLWqHxc4NGaCHhZIQRY0grpe2BV3Dkvs/+lVgeQKYPa5EZLF9B6TraN70k1U2JFUtWjSduK6UNUBVxh57S77JjzHHQtDd+792vgQQnQKFchDILRRZYw88QFbubE4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKJnQq0Jw7z0ID8pnqv8C7bgEIv757lv16CXywkkCCyHYk7Swrs/yJYTPmSkKS0BDr4Ci4PR2dbo5Uw5RPeICHW1LGi9tUaT0N8EalYo7u36dfBGDvGpWTqmeMuSSgFbZkyj4vsv5f5KrbxAlfo6uY+LrseSQBKlZ9yEoKMXO6Wik40z9JdykIHMFGH/cd8oyhVMMBtv+zRp5BOYjv+vqTjtNdBlC0z3oiWrNNcFjAaQvy9W9Ox1GSnt4kN+FzFbhaUAKOaRfSkdIWMorvoasBEUdlJg1Lv6+99NZcfQrUVowggwhRayvqnVr0jjfMVLl0hYjE6c9EpdvimGv7CVcxg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4609e6719e3142ba8183a761223b63b5"}, [
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
  'westus2',
  'x-ms-request-id',
  'efd7daec-315b-4e1b-a465-98d4b1e11ab8',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:14 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArz38dJC/HsEddd+2aDgSmMW5Q4cJ9xC6zYSOjYsgqrJmLKlmTnnb/nt/bpB4BTOSUJV0MRvK8qg+atrRZudJvGbvnrkYs0+01c2wV7aV9rbmUXImXjb+w0u4RgPVGBPlEfVcYTElHoMa5o6ke4OvEQk+vFX4dN+mKPitx5xmyHMWW5k7Df34wha1DPD34XbWMUyD9nY2kmf0REJYenFJ62oNUgLWqHxc4NGaCHhZIQRY0grpe2BV3Dkvs/+lVgeQKYPa5EZLF9B6TraN70k1U2JFUtWjSduK6UNUBVxh57S77JjzHHQtDd+792vgQQnQKFchDILRRZYw88QFbubE4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKJnQq0Jw7z0ID8pnqv8C7bgEIv757lv16CXywkkCCyHYk7Swrs/yJYTPmSkKS0BDr4Ci4PR2dbo5Uw5RPeICHW1LGi9tUaT0N8EalYo7u36dfBGDvGpWTqmeMuSSgFbZkyj4vsv5f5KrbxAlfo6uY+LrseSQBKlZ9yEoKMXO6Wik40z9JdykIHMFGH/cd8oyhVMMBtv+zRp5BOYjv+vqTjtNdBlC0z3oiWrNNcFjAaQvy9W9Ox1GSnt4kN+FzFbhaUAKOaRfSkdIWMorvoasBEUdlJg1Lv6+99NZcfQrUVowggwhRayvqnVr0jjfMVLl0hYjE6c9EpdvimGv7CVcxg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4609e6719e3142ba8183a761223b63b5"}, [
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
  'westus2',
  'x-ms-request-id',
  'c6d016ab-473c-4ffe-add1-27a430746e07',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:14 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArz38dJC/HsEddd+2aDgSmMW5Q4cJ9xC6zYSOjYsgqrJmLKlmTnnb/nt/bpB4BTOSUJV0MRvK8qg+atrRZudJvGbvnrkYs0+01c2wV7aV9rbmUXImXjb+w0u4RgPVGBPlEfVcYTElHoMa5o6ke4OvEQk+vFX4dN+mKPitx5xmyHMWW5k7Df34wha1DPD34XbWMUyD9nY2kmf0REJYenFJ62oNUgLWqHxc4NGaCHhZIQRY0grpe2BV3Dkvs/+lVgeQKYPa5EZLF9B6TraN70k1U2JFUtWjSduK6UNUBVxh57S77JjzHHQtDd+792vgQQnQKFchDILRRZYw88QFbubE4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKJnQq0Jw7z0ID8pnqv8C7bgEIv757lv16CXywkkCCyHYk7Swrs/yJYTPmSkKS0BDr4Ci4PR2dbo5Uw5RPeICHW1LGi9tUaT0N8EalYo7u36dfBGDvGpWTqmeMuSSgFbZkyj4vsv5f5KrbxAlfo6uY+LrseSQBKlZ9yEoKMXO6Wik40z9JdykIHMFGH/cd8oyhVMMBtv+zRp5BOYjv+vqTjtNdBlC0z3oiWrNNcFjAaQvy9W9Ox1GSnt4kN+FzFbhaUAKOaRfSkdIWMorvoasBEUdlJg1Lv6+99NZcfQrUVowggwhRayvqnVr0jjfMVLl0hYjE6c9EpdvimGv7CVcxg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4609e6719e3142ba8183a761223b63b5"}, [
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
  'westus2',
  'x-ms-request-id',
  '5bf55bd1-ed0d-4f33-90c4-ee550a317f04',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:17 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArz38dJC/HsEddd+2aDgSmMW5Q4cJ9xC6zYSOjYsgqrJmLKlmTnnb/nt/bpB4BTOSUJV0MRvK8qg+atrRZudJvGbvnrkYs0+01c2wV7aV9rbmUXImXjb+w0u4RgPVGBPlEfVcYTElHoMa5o6ke4OvEQk+vFX4dN+mKPitx5xmyHMWW5k7Df34wha1DPD34XbWMUyD9nY2kmf0REJYenFJ62oNUgLWqHxc4NGaCHhZIQRY0grpe2BV3Dkvs/+lVgeQKYPa5EZLF9B6TraN70k1U2JFUtWjSduK6UNUBVxh57S77JjzHHQtDd+792vgQQnQKFchDILRRZYw88QFbubE4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKJnQq0Jw7z0ID8pnqv8C7bgEIv757lv16CXywkkCCyHYk7Swrs/yJYTPmSkKS0BDr4Ci4PR2dbo5Uw5RPeICHW1LGi9tUaT0N8EalYo7u36dfBGDvGpWTqmeMuSSgFbZkyj4vsv5f5KrbxAlfo6uY+LrseSQBKlZ9yEoKMXO6Wik40z9JdykIHMFGH/cd8oyhVMMBtv+zRp5BOYjv+vqTjtNdBlC0z3oiWrNNcFjAaQvy9W9Ox1GSnt4kN+FzFbhaUAKOaRfSkdIWMorvoasBEUdlJg1Lv6+99NZcfQrUVowggwhRayvqnVr0jjfMVLl0hYjE6c9EpdvimGv7CVcxg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4609e6719e3142ba8183a761223b63b5"}, [
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
  'westus2',
  'x-ms-request-id',
  'f6181373-d942-4302-bb2f-219e9c7ad4e4',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:19 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArz38dJC/HsEddd+2aDgSmMW5Q4cJ9xC6zYSOjYsgqrJmLKlmTnnb/nt/bpB4BTOSUJV0MRvK8qg+atrRZudJvGbvnrkYs0+01c2wV7aV9rbmUXImXjb+w0u4RgPVGBPlEfVcYTElHoMa5o6ke4OvEQk+vFX4dN+mKPitx5xmyHMWW5k7Df34wha1DPD34XbWMUyD9nY2kmf0REJYenFJ62oNUgLWqHxc4NGaCHhZIQRY0grpe2BV3Dkvs/+lVgeQKYPa5EZLF9B6TraN70k1U2JFUtWjSduK6UNUBVxh57S77JjzHHQtDd+792vgQQnQKFchDILRRZYw88QFbubE4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKJnQq0Jw7z0ID8pnqv8C7bgEIv757lv16CXywkkCCyHYk7Swrs/yJYTPmSkKS0BDr4Ci4PR2dbo5Uw5RPeICHW1LGi9tUaT0N8EalYo7u36dfBGDvGpWTqmeMuSSgFbZkyj4vsv5f5KrbxAlfo6uY+LrseSQBKlZ9yEoKMXO6Wik40z9JdykIHMFGH/cd8oyhVMMBtv+zRp5BOYjv+vqTjtNdBlC0z3oiWrNNcFjAaQvy9W9Ox1GSnt4kN+FzFbhaUAKOaRfSkdIWMorvoasBEUdlJg1Lv6+99NZcfQrUVowggwhRayvqnVr0jjfMVLl0hYjE6c9EpdvimGv7CVcxg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4609e6719e3142ba8183a761223b63b5"}, [
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
  'westus2',
  'x-ms-request-id',
  '1c6f19b5-a5af-40cc-b373-00d8324dd9c0',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:20 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArz38dJC/HsEddd+2aDgSmMW5Q4cJ9xC6zYSOjYsgqrJmLKlmTnnb/nt/bpB4BTOSUJV0MRvK8qg+atrRZudJvGbvnrkYs0+01c2wV7aV9rbmUXImXjb+w0u4RgPVGBPlEfVcYTElHoMa5o6ke4OvEQk+vFX4dN+mKPitx5xmyHMWW5k7Df34wha1DPD34XbWMUyD9nY2kmf0REJYenFJ62oNUgLWqHxc4NGaCHhZIQRY0grpe2BV3Dkvs/+lVgeQKYPa5EZLF9B6TraN70k1U2JFUtWjSduK6UNUBVxh57S77JjzHHQtDd+792vgQQnQKFchDILRRZYw88QFbubE4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKJnQq0Jw7z0ID8pnqv8C7bgEIv757lv16CXywkkCCyHYk7Swrs/yJYTPmSkKS0BDr4Ci4PR2dbo5Uw5RPeICHW1LGi9tUaT0N8EalYo7u36dfBGDvGpWTqmeMuSSgFbZkyj4vsv5f5KrbxAlfo6uY+LrseSQBKlZ9yEoKMXO6Wik40z9JdykIHMFGH/cd8oyhVMMBtv+zRp5BOYjv+vqTjtNdBlC0z3oiWrNNcFjAaQvy9W9Ox1GSnt4kN+FzFbhaUAKOaRfSkdIWMorvoasBEUdlJg1Lv6+99NZcfQrUVowggwhRayvqnVr0jjfMVLl0hYjE6c9EpdvimGv7CVcxg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4609e6719e3142ba8183a761223b63b5"}, [
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
  'westus2',
  'x-ms-request-id',
  '2cdef59e-04e3-48da-ab2b-ddb27d8cdd75',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:22 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArz38dJC/HsEddd+2aDgSmMW5Q4cJ9xC6zYSOjYsgqrJmLKlmTnnb/nt/bpB4BTOSUJV0MRvK8qg+atrRZudJvGbvnrkYs0+01c2wV7aV9rbmUXImXjb+w0u4RgPVGBPlEfVcYTElHoMa5o6ke4OvEQk+vFX4dN+mKPitx5xmyHMWW5k7Df34wha1DPD34XbWMUyD9nY2kmf0REJYenFJ62oNUgLWqHxc4NGaCHhZIQRY0grpe2BV3Dkvs/+lVgeQKYPa5EZLF9B6TraN70k1U2JFUtWjSduK6UNUBVxh57S77JjzHHQtDd+792vgQQnQKFchDILRRZYw88QFbubE4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKJnQq0Jw7z0ID8pnqv8C7bgEIv757lv16CXywkkCCyHYk7Swrs/yJYTPmSkKS0BDr4Ci4PR2dbo5Uw5RPeICHW1LGi9tUaT0N8EalYo7u36dfBGDvGpWTqmeMuSSgFbZkyj4vsv5f5KrbxAlfo6uY+LrseSQBKlZ9yEoKMXO6Wik40z9JdykIHMFGH/cd8oyhVMMBtv+zRp5BOYjv+vqTjtNdBlC0z3oiWrNNcFjAaQvy9W9Ox1GSnt4kN+FzFbhaUAKOaRfSkdIWMorvoasBEUdlJg1Lv6+99NZcfQrUVowggwhRayvqnVr0jjfMVLl0hYjE6c9EpdvimGv7CVcxg=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-","request_id":"4609e6719e3142ba8183a761223b63b5"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '36e210ab-1409-4bfb-995a-729062fe5637',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:24 GMT',
  'Content-Length',
  '1307'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","x5t":"tQwybbgixzWX1Hmzroi5vxwp0Rs","cer":"MIIDKDCCAhCgAwIBAgIQTokzyScIT1iJca3fY801gjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0ODI0WhcNMjIwMjE2MTg1ODI0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCvPfx0kL8ewR1137ZoOBKYxblDhwn3ELrNhI6NiyCqsmYsqWZOedv+e39ukHgFM5JQlXQxG8ryqD5q2tFm50m8Zu+euRizT7TVzbBXtpX2tuZRciZeNv7DS7hGA9UYE+UR9VxhMSUegxrmjqR7g68RCT68Vfh036Yo+K3HnGbIcxZbmTsN/fjCFrUM8PfhdtYxTIP2djaSZ/REQlh6cUnrag1SAtaofFzg0ZoIeFkhBFjSCul7YFXcOS+z/6VWB5Apg9rkRksX0HpOto3vSTVTYkVS1aNJ24rpQ1QFXGHntLvsmPMcdC0N37v3a+BBCdAoVyEMgtFFljDzxAVu5sThAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ3HerF0v+1RFZhIo4XtJu9EnC6eTAdBgNVHQ4EFgQUNx3qxdL/tURWYSKOF7SbvRJwunkwDQYJKoZIhvcNAQELBQADggEBAA7yXB2AdNPyb8EQgddXjZmtiYuKeu82+3RoLH+Vy4veSXk7+IlGR7CxRnC8e3tTRTmMIU87HZLWzrWAtLmBU/+qiPGSlBAxOjU4IOfr4ZRACuBYVIsJccmy5TID6zTRQSYcEnB6FXOLtmLsOxxiILWQxSJXm3kEHRhyS95+ysbaoJpIRH5R71+eXrq9uIT2VxALqhbZONj+bX8ZJszMBhVmDqS5Chtjks0mC/oDo15aFjT9a/G7wYUIY5+0S3D/enclKZbjMTlsBbDC/sl+CFxBHqO56ZzgFCZTnRA59dchXDcnIEmupPT6T5nyn02Idv1IyJf61Fx25KGz90LB15Q=","attributes":{"enabled":true,"nbf":1613501304,"exp":1645037904,"created":1613501904,"updated":1613501904,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501895,"updated":1613501895}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a94fdda2-9c5f-4bd9-ab0d-7449d52202f8',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:24 GMT',
  'Content-Length',
  '2601'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","x5t":"tQwybbgixzWX1Hmzroi5vxwp0Rs","cer":"MIIDKDCCAhCgAwIBAgIQTokzyScIT1iJca3fY801gjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0ODI0WhcNMjIwMjE2MTg1ODI0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCvPfx0kL8ewR1137ZoOBKYxblDhwn3ELrNhI6NiyCqsmYsqWZOedv+e39ukHgFM5JQlXQxG8ryqD5q2tFm50m8Zu+euRizT7TVzbBXtpX2tuZRciZeNv7DS7hGA9UYE+UR9VxhMSUegxrmjqR7g68RCT68Vfh036Yo+K3HnGbIcxZbmTsN/fjCFrUM8PfhdtYxTIP2djaSZ/REQlh6cUnrag1SAtaofFzg0ZoIeFkhBFjSCul7YFXcOS+z/6VWB5Apg9rkRksX0HpOto3vSTVTYkVS1aNJ24rpQ1QFXGHntLvsmPMcdC0N37v3a+BBCdAoVyEMgtFFljDzxAVu5sThAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ3HerF0v+1RFZhIo4XtJu9EnC6eTAdBgNVHQ4EFgQUNx3qxdL/tURWYSKOF7SbvRJwunkwDQYJKoZIhvcNAQELBQADggEBAA7yXB2AdNPyb8EQgddXjZmtiYuKeu82+3RoLH+Vy4veSXk7+IlGR7CxRnC8e3tTRTmMIU87HZLWzrWAtLmBU/+qiPGSlBAxOjU4IOfr4ZRACuBYVIsJccmy5TID6zTRQSYcEnB6FXOLtmLsOxxiILWQxSJXm3kEHRhyS95+ysbaoJpIRH5R71+eXrq9uIT2VxALqhbZONj+bX8ZJszMBhVmDqS5Chtjks0mC/oDo15aFjT9a/G7wYUIY5+0S3D/enclKZbjMTlsBbDC/sl+CFxBHqO56ZzgFCZTnRA59dchXDcnIEmupPT6T5nyn02Idv1IyJf61Fx25KGz90LB15Q=","attributes":{"enabled":true,"nbf":1613501304,"exp":1645037904,"created":1613501904,"updated":1613501904,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501895,"updated":1613501895}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'c043aec2-2fcc-4d72-9035-a2c619bbaefb',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:24 GMT',
  'Content-Length',
  '2601'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/')
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
  'westus2',
  'x-ms-request-id',
  '7554c91a-ec5c-4a6e-b51a-313d2e24b0cb',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:24 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
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
  'fa4689bb-0b3c-4303-a01e-9384739b3500',
  'x-ms-ests-server',
  '2.1.11496.6 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDCwAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:58:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:58:25 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/')
  .query(true)
  .reply(200, {"value":"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvPfx0kL8ewR11\n37ZoOBKYxblDhwn3ELrNhI6NiyCqsmYsqWZOedv+e39ukHgFM5JQlXQxG8ryqD5q\n2tFm50m8Zu+euRizT7TVzbBXtpX2tuZRciZeNv7DS7hGA9UYE+UR9VxhMSUegxrm\njqR7g68RCT68Vfh036Yo+K3HnGbIcxZbmTsN/fjCFrUM8PfhdtYxTIP2djaSZ/RE\nQlh6cUnrag1SAtaofFzg0ZoIeFkhBFjSCul7YFXcOS+z/6VWB5Apg9rkRksX0HpO\nto3vSTVTYkVS1aNJ24rpQ1QFXGHntLvsmPMcdC0N37v3a+BBCdAoVyEMgtFFljDz\nxAVu5sThAgMBAAECggEBAJQV6IFEVA0UGeYi/wyA3c41v8G9moEqpQDJFIGt4RP+\nH3N8TxTfyzT4fY4cDSAwHWN1eDOLjeuSmvRHJw8zQc8wmSritWnJYEIQSAVHKODM\nXELVGHEjPhQgp36a/HcVUMzlL4R+OCTZm2Dbh0lM1SKrUlVqvMNevxX+VzPICd82\nYvxvdTarVHoqj8uHVA+12iPZWw3ayvIGrlde+hRnBy4mkwQvqj+S9F9UEzHPw1JF\nonYCCJPRdn7RdvBOCAdrkjNaiIhJTJc6bsP81qwOXW8Vj9M/2fFedtn1iHR1B5VB\nzHXNhCktjguWYLY2I0WNdDEkJ6rB5HkTQZZ0IXX2VhUCgYEAxURLt2O6/fQeQfHD\nmzgMzG9rb/g7DeCxu+HYi+zPTCZrwg6icnkUm4qIncMdfYYY9gDjX9+Ip0hZouOH\nMIsPaicwcEa6Nes/LJQjqjSnBWjxkZbkXiyBvspvPJYNSMByX7iNNcI3fOQPDUnH\n2goz1YrJZ2G/80DjR4a2MQhGX18CgYEA42r36oGkGSddhXPZuoDiYt8qTKCVho4s\n8YaIPtpHQfgqcpQwYAwCewgid9hqhLE6XPGE4c/TxRQqvbxOpgjVnFiWhtwgsVuE\nucv+SBgA9LVa7i/UpEz3K49JwFiz3U3g7rrbdSLeqjtjVvtN79CcKV/H/jleO91v\nuGoqjx9og78CgYAJGvLnvxm1eRwgbRlbQ8YLdaUe4PVQ2as6gd0t8DtNR4S3y1ci\nM4aI+2b86TGmRpdGW5ojJb04A3Xnt9rYmcKXYsGwnQMhU/9xflD7HT0MWeC0mKNn\n2WQPu2ZRBJgOYJum4WzbK2DGSfyL33jzDn9//sz3EaL7hmY3OfeU4c3lvwKBgGKl\np9ylV5VBqiOVWUC5X3ob67FJhxLS4VPzU25QKNDI4UDKXyGKlBjiMnFiAvKEHhjq\n+wUorWezk8axxDvpYR9snf7pxZSpai1d+3MyVlfPwx3GyapraFwQz6EL2RmKCqQD\nkeaBtayKDlFQuUHpb5PS5GG2aNX2+9s20jc7HI7pAoGBAMG0pLZ2DqOWyx4sLfjL\nyM7sXZb1X1ra30SoHow7JBLa9ix78bgwfbubs7n6/2LUSsJ0AWrvCKr3z45u0UHN\nu7tX56vQlVDPgVGbcqzV4qHoPaMQmbtZLA4KEN1Jq0F+JTaUtE+hE9xItBXy6Xlr\nLyaecOzGGcnajq1a0V/foWxH\n-----END PRIVATE KEY-----\n-----BEGIN CERTIFICATE-----\nMIIDKDCCAhCgAwIBAgIQTokzyScIT1iJca3fY801gjANBgkqhkiG9w0BAQsFADAR\nMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0ODI0WhcNMjIwMjE2MTg1ODI0\nWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK\nAoIBAQCvPfx0kL8ewR1137ZoOBKYxblDhwn3ELrNhI6NiyCqsmYsqWZOedv+e39u\nkHgFM5JQlXQxG8ryqD5q2tFm50m8Zu+euRizT7TVzbBXtpX2tuZRciZeNv7DS7hG\nA9UYE+UR9VxhMSUegxrmjqR7g68RCT68Vfh036Yo+K3HnGbIcxZbmTsN/fjCFrUM\n8PfhdtYxTIP2djaSZ/REQlh6cUnrag1SAtaofFzg0ZoIeFkhBFjSCul7YFXcOS+z\n/6VWB5Apg9rkRksX0HpOto3vSTVTYkVS1aNJ24rpQ1QFXGHntLvsmPMcdC0N37v3\na+BBCdAoVyEMgtFFljDzxAVu5sThAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJ\nBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSME\nGDAWgBQ3HerF0v+1RFZhIo4XtJu9EnC6eTAdBgNVHQ4EFgQUNx3qxdL/tURWYSKO\nF7SbvRJwunkwDQYJKoZIhvcNAQELBQADggEBAA7yXB2AdNPyb8EQgddXjZmtiYuK\neu82+3RoLH+Vy4veSXk7+IlGR7CxRnC8e3tTRTmMIU87HZLWzrWAtLmBU/+qiPGS\nlBAxOjU4IOfr4ZRACuBYVIsJccmy5TID6zTRQSYcEnB6FXOLtmLsOxxiILWQxSJX\nm3kEHRhyS95+ysbaoJpIRH5R71+eXrq9uIT2VxALqhbZONj+bX8ZJszMBhVmDqS5\nChtjks0mC/oDo15aFjT9a/G7wYUIY5+0S3D/enclKZbjMTlsBbDC/sl+CFxBHqO5\n6ZzgFCZTnRA59dchXDcnIEmupPT6T5nyn02Idv1IyJf61Fx25KGz90LB15Q=\n-----END CERTIFICATE-----\n","contentType":"application/x-pem-file","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","managed":true,"attributes":{"enabled":true,"nbf":1613501304,"exp":1645037904,"created":1613501904,"updated":1613501904,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e673ac89-8843-47b1-b9b2-07dd6b1b6996',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:25 GMT',
  'Content-Length',
  '3458'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-","deletedDate":1613501905,"scheduledPurgeDate":1614106705,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","x5t":"tQwybbgixzWX1Hmzroi5vxwp0Rs","cer":"MIIDKDCCAhCgAwIBAgIQTokzyScIT1iJca3fY801gjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0ODI0WhcNMjIwMjE2MTg1ODI0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCvPfx0kL8ewR1137ZoOBKYxblDhwn3ELrNhI6NiyCqsmYsqWZOedv+e39ukHgFM5JQlXQxG8ryqD5q2tFm50m8Zu+euRizT7TVzbBXtpX2tuZRciZeNv7DS7hGA9UYE+UR9VxhMSUegxrmjqR7g68RCT68Vfh036Yo+K3HnGbIcxZbmTsN/fjCFrUM8PfhdtYxTIP2djaSZ/REQlh6cUnrag1SAtaofFzg0ZoIeFkhBFjSCul7YFXcOS+z/6VWB5Apg9rkRksX0HpOto3vSTVTYkVS1aNJ24rpQ1QFXGHntLvsmPMcdC0N37v3a+BBCdAoVyEMgtFFljDzxAVu5sThAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ3HerF0v+1RFZhIo4XtJu9EnC6eTAdBgNVHQ4EFgQUNx3qxdL/tURWYSKOF7SbvRJwunkwDQYJKoZIhvcNAQELBQADggEBAA7yXB2AdNPyb8EQgddXjZmtiYuKeu82+3RoLH+Vy4veSXk7+IlGR7CxRnC8e3tTRTmMIU87HZLWzrWAtLmBU/+qiPGSlBAxOjU4IOfr4ZRACuBYVIsJccmy5TID6zTRQSYcEnB6FXOLtmLsOxxiILWQxSJXm3kEHRhyS95+ysbaoJpIRH5R71+eXrq9uIT2VxALqhbZONj+bX8ZJszMBhVmDqS5Chtjks0mC/oDo15aFjT9a/G7wYUIY5+0S3D/enclKZbjMTlsBbDC/sl+CFxBHqO56ZzgFCZTnRA59dchXDcnIEmupPT6T5nyn02Idv1IyJf61Fx25KGz90LB15Q=","attributes":{"enabled":true,"nbf":1613501304,"exp":1645037904,"created":1613501904,"updated":1613501904,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501895,"updated":1613501895}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '998f7ca5-2cb1-45e2-8e13-1db3d7b05e7b',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:25 GMT',
  'Content-Length',
  '2801'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5c39b319-c9b7-4840-b261-322085a05426',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '1b231349-174f-4e0d-954b-76cbd90c2cdc',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ab95fd2f-b171-400f-ba12-cd7ec149d836',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '27f97759-ea3c-4414-9d8a-e321e139bd88',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0c3ba976-aa51-456f-9ea7-50708ec7a105',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e3453665-b28e-4819-a972-f8d9897c5ce2',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '86323d8e-43da-4d7d-ab84-bda78aa76015',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-","deletedDate":1613501905,"scheduledPurgeDate":1614106705,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/40b8a19b72d24dbeb5185a76ad975a02","x5t":"tQwybbgixzWX1Hmzroi5vxwp0Rs","cer":"MIIDKDCCAhCgAwIBAgIQTokzyScIT1iJca3fY801gjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0ODI0WhcNMjIwMjE2MTg1ODI0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCvPfx0kL8ewR1137ZoOBKYxblDhwn3ELrNhI6NiyCqsmYsqWZOedv+e39ukHgFM5JQlXQxG8ryqD5q2tFm50m8Zu+euRizT7TVzbBXtpX2tuZRciZeNv7DS7hGA9UYE+UR9VxhMSUegxrmjqR7g68RCT68Vfh036Yo+K3HnGbIcxZbmTsN/fjCFrUM8PfhdtYxTIP2djaSZ/REQlh6cUnrag1SAtaofFzg0ZoIeFkhBFjSCul7YFXcOS+z/6VWB5Apg9rkRksX0HpOto3vSTVTYkVS1aNJ24rpQ1QFXGHntLvsmPMcdC0N37v3a+BBCdAoVyEMgtFFljDzxAVu5sThAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ3HerF0v+1RFZhIo4XtJu9EnC6eTAdBgNVHQ4EFgQUNx3qxdL/tURWYSKOF7SbvRJwunkwDQYJKoZIhvcNAQELBQADggEBAA7yXB2AdNPyb8EQgddXjZmtiYuKeu82+3RoLH+Vy4veSXk7+IlGR7CxRnC8e3tTRTmMIU87HZLWzrWAtLmBU/+qiPGSlBAxOjU4IOfr4ZRACuBYVIsJccmy5TID6zTRQSYcEnB6FXOLtmLsOxxiILWQxSJXm3kEHRhyS95+ysbaoJpIRH5R71+eXrq9uIT2VxALqhbZONj+bX8ZJszMBhVmDqS5Chtjks0mC/oDo15aFjT9a/G7wYUIY5+0S3D/enclKZbjMTlsBbDC/sl+CFxBHqO56ZzgFCZTnRA59dchXDcnIEmupPT6T5nyn02Idv1IyJf61Fx25KGz90LB15Q=","attributes":{"enabled":true,"nbf":1613501304,"exp":1645037904,"created":1613501904,"updated":1613501904,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501895,"updated":1613501895}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4729daaf-e780-4f67-8322-f6bfeee01a28',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:37 GMT',
  'Content-Length',
  '2801'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '206aefc8-1891-47e6-98b2-95ff36e14429',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:58:37 GMT'
]);
