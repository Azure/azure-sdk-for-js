let nock = require('nock');

module.exports.hash = "8609c0c4423e90b301f2f5cf86773f72";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create')
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
  'a158e470-0986-4f7e-9b48-57d0f5015ed1',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:11 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  '38830701-3aa5-4215-b281-bad09de22700',
  'x-ms-ests-server',
  '2.1.11397.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aj5HhJdnOklPvRgMTzhNnFE_aSJHAQAAABNEkdcOAAAA; expires=Fri, 12-Feb-2021 19:42:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 13 Jan 2021 19:42:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwoB1MB4so1Sg+DGPm0vuJ89mR05unrXUI+2ldN83WJyDn08mzX5Gk0XS/fqd9C0R5K0us7ltsnDBz1pgi5z5p77ckO33qzmt+Lh1pwU13leRAYJqG5kTs9bEYKqGrCEXVupNTZffR638FQkEvQuqh+FlZDlXRU1yVqD0i7rDDaUHgsl/sczUcb06D/H5Y3fe3oI1oc2E/qw5XftKdO0CyhJfbyZ/4SwqFSPSQps57lRbmzcGOl8IsFEjGv7cW5tock003r0z9MNHlon9OFVSWiaY2FXwF2OljuFi8Wsvlz3AndbkGLT01eoSV18L5mG9gqPtNLWBTaRD4AZORLUJhQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALe0eITg5Vrl79CfYc1jk+5bT3oXEl85x4D30ElBN8FGXIT+mCXJFUEV44LLBh+4w8DEG3HO/gOBu8xbux2QsNwWdMtuglRQJgIH6Vk79kKz3fZyzm5Au/A4Bj1d6+GcQ7VW9J2b2nsbtzsTyL3tOuFx+d5iNBjHgQtbByN9SsQpC3nHUDzCo/S9xjyrcimZ5+fZIsEpnT0eqnrw4cefWivO33I1U6DaVmqFaDn0+c3GD2zweByQD5KnFMeRGLfXRoUsshE0AZUhwOijX06Ad1oIEWKOztpFld5D+79bnI3VFNQECEzesanS+8usB2m8TGBDAP7M1suLLSSv/AzmA78=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"0e4f3e116dca43b3a2ce9fd0ddc000a8"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending?api-version=7.1&request_id=0e4f3e116dca43b3a2ce9fd0ddc000a8',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4ac92d3d-b306-4614-afca-5e7de8c6eea5',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:12 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwoB1MB4so1Sg+DGPm0vuJ89mR05unrXUI+2ldN83WJyDn08mzX5Gk0XS/fqd9C0R5K0us7ltsnDBz1pgi5z5p77ckO33qzmt+Lh1pwU13leRAYJqG5kTs9bEYKqGrCEXVupNTZffR638FQkEvQuqh+FlZDlXRU1yVqD0i7rDDaUHgsl/sczUcb06D/H5Y3fe3oI1oc2E/qw5XftKdO0CyhJfbyZ/4SwqFSPSQps57lRbmzcGOl8IsFEjGv7cW5tock003r0z9MNHlon9OFVSWiaY2FXwF2OljuFi8Wsvlz3AndbkGLT01eoSV18L5mG9gqPtNLWBTaRD4AZORLUJhQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALe0eITg5Vrl79CfYc1jk+5bT3oXEl85x4D30ElBN8FGXIT+mCXJFUEV44LLBh+4w8DEG3HO/gOBu8xbux2QsNwWdMtuglRQJgIH6Vk79kKz3fZyzm5Au/A4Bj1d6+GcQ7VW9J2b2nsbtzsTyL3tOuFx+d5iNBjHgQtbByN9SsQpC3nHUDzCo/S9xjyrcimZ5+fZIsEpnT0eqnrw4cefWivO33I1U6DaVmqFaDn0+c3GD2zweByQD5KnFMeRGLfXRoUsshE0AZUhwOijX06Ad1oIEWKOztpFld5D+79bnI3VFNQECEzesanS+8usB2m8TGBDAP7M1suLLSSv/AzmA78=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"0e4f3e116dca43b3a2ce9fd0ddc000a8"}, [
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
  'b95088f1-e085-4356-bab8-8289b284a028',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:12 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwoB1MB4so1Sg+DGPm0vuJ89mR05unrXUI+2ldN83WJyDn08mzX5Gk0XS/fqd9C0R5K0us7ltsnDBz1pgi5z5p77ckO33qzmt+Lh1pwU13leRAYJqG5kTs9bEYKqGrCEXVupNTZffR638FQkEvQuqh+FlZDlXRU1yVqD0i7rDDaUHgsl/sczUcb06D/H5Y3fe3oI1oc2E/qw5XftKdO0CyhJfbyZ/4SwqFSPSQps57lRbmzcGOl8IsFEjGv7cW5tock003r0z9MNHlon9OFVSWiaY2FXwF2OljuFi8Wsvlz3AndbkGLT01eoSV18L5mG9gqPtNLWBTaRD4AZORLUJhQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALe0eITg5Vrl79CfYc1jk+5bT3oXEl85x4D30ElBN8FGXIT+mCXJFUEV44LLBh+4w8DEG3HO/gOBu8xbux2QsNwWdMtuglRQJgIH6Vk79kKz3fZyzm5Au/A4Bj1d6+GcQ7VW9J2b2nsbtzsTyL3tOuFx+d5iNBjHgQtbByN9SsQpC3nHUDzCo/S9xjyrcimZ5+fZIsEpnT0eqnrw4cefWivO33I1U6DaVmqFaDn0+c3GD2zweByQD5KnFMeRGLfXRoUsshE0AZUhwOijX06Ad1oIEWKOztpFld5D+79bnI3VFNQECEzesanS+8usB2m8TGBDAP7M1suLLSSv/AzmA78=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"0e4f3e116dca43b3a2ce9fd0ddc000a8"}, [
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
  'c0cafa18-4930-4f52-a24e-be9fc6929966',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:12 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwoB1MB4so1Sg+DGPm0vuJ89mR05unrXUI+2ldN83WJyDn08mzX5Gk0XS/fqd9C0R5K0us7ltsnDBz1pgi5z5p77ckO33qzmt+Lh1pwU13leRAYJqG5kTs9bEYKqGrCEXVupNTZffR638FQkEvQuqh+FlZDlXRU1yVqD0i7rDDaUHgsl/sczUcb06D/H5Y3fe3oI1oc2E/qw5XftKdO0CyhJfbyZ/4SwqFSPSQps57lRbmzcGOl8IsFEjGv7cW5tock003r0z9MNHlon9OFVSWiaY2FXwF2OljuFi8Wsvlz3AndbkGLT01eoSV18L5mG9gqPtNLWBTaRD4AZORLUJhQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALe0eITg5Vrl79CfYc1jk+5bT3oXEl85x4D30ElBN8FGXIT+mCXJFUEV44LLBh+4w8DEG3HO/gOBu8xbux2QsNwWdMtuglRQJgIH6Vk79kKz3fZyzm5Au/A4Bj1d6+GcQ7VW9J2b2nsbtzsTyL3tOuFx+d5iNBjHgQtbByN9SsQpC3nHUDzCo/S9xjyrcimZ5+fZIsEpnT0eqnrw4cefWivO33I1U6DaVmqFaDn0+c3GD2zweByQD5KnFMeRGLfXRoUsshE0AZUhwOijX06Ad1oIEWKOztpFld5D+79bnI3VFNQECEzesanS+8usB2m8TGBDAP7M1suLLSSv/AzmA78=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"0e4f3e116dca43b3a2ce9fd0ddc000a8"}, [
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
  'ca553d21-d000-4341-ab32-2ef622c18f1e',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:14 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwoB1MB4so1Sg+DGPm0vuJ89mR05unrXUI+2ldN83WJyDn08mzX5Gk0XS/fqd9C0R5K0us7ltsnDBz1pgi5z5p77ckO33qzmt+Lh1pwU13leRAYJqG5kTs9bEYKqGrCEXVupNTZffR638FQkEvQuqh+FlZDlXRU1yVqD0i7rDDaUHgsl/sczUcb06D/H5Y3fe3oI1oc2E/qw5XftKdO0CyhJfbyZ/4SwqFSPSQps57lRbmzcGOl8IsFEjGv7cW5tock003r0z9MNHlon9OFVSWiaY2FXwF2OljuFi8Wsvlz3AndbkGLT01eoSV18L5mG9gqPtNLWBTaRD4AZORLUJhQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALe0eITg5Vrl79CfYc1jk+5bT3oXEl85x4D30ElBN8FGXIT+mCXJFUEV44LLBh+4w8DEG3HO/gOBu8xbux2QsNwWdMtuglRQJgIH6Vk79kKz3fZyzm5Au/A4Bj1d6+GcQ7VW9J2b2nsbtzsTyL3tOuFx+d5iNBjHgQtbByN9SsQpC3nHUDzCo/S9xjyrcimZ5+fZIsEpnT0eqnrw4cefWivO33I1U6DaVmqFaDn0+c3GD2zweByQD5KnFMeRGLfXRoUsshE0AZUhwOijX06Ad1oIEWKOztpFld5D+79bnI3VFNQECEzesanS+8usB2m8TGBDAP7M1suLLSSv/AzmA78=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","request_id":"0e4f3e116dca43b3a2ce9fd0ddc000a8"}, [
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
  '5a36216c-875b-4e97-a47d-9cabbc1ac8a8',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:17 GMT',
  'Content-Length',
  '1387'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/086f6afece584b118c8648d2465fc9de","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/086f6afece584b118c8648d2465fc9de","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/086f6afece584b118c8648d2465fc9de","x5t":"u0Va8dd3CuzM37ygsHSB4-mV5B8","cer":"MIIDKDCCAhCgAwIBAgIQSWvycv+WTr+RJV1Xm1FEgzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTEzMTkzMjE2WhcNMjIwMTEzMTk0MjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDCgHUwHiyjVKD4MY+bS+4nz2ZHTm6etdQj7aV03zdYnIOfTybNfkaTRdL9+p30LRHkrS6zuW2ycMHPWmCLnPmnvtyQ7ferOa34uHWnBTXeV5EBgmobmROz1sRgqoasIRdW6k1Nl99HrfwVCQS9C6qH4WVkOVdFTXJWoPSLusMNpQeCyX+xzNRxvToP8fljd97egjWhzYT+rDld+0p07QLKEl9vJn/hLCoVI9JCmznuVFubNwY6XwiwUSMa/txbm2hyTTTevTP0w0eWif04VVJaJpjYVfAXY6WO4WLxay+XPcCd1uQYtPTV6hJXXwvmYb2Co+00tYFNpEPgBk5EtQmFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSpoGzsmnyUV/evlY/NLMEq1tZWTzAdBgNVHQ4EFgQUqaBs7Jp8lFf3r5WPzSzBKtbWVk8wDQYJKoZIhvcNAQELBQADggEBAFzRI2vINEmSNR8t1sGZWMgh8uPPBAFHOA+ZIMoYKt+2pLVlrTLxgIDvFuCNDRw/qypS3RQfZiMgow63AmbcQZHujFAqYmveJ6ZdOlctuyqaZK6PP2x+XI2lPgeiVCUY1Hx2hCU8S5RX0abHHD5q7/gdzC9r6arYUawwVjTbDDuTgJGZ6mQFXn7GUk1EDdOFe7LMNAkNrpn5jFUpA2Qn9SW9AcCeZvS46FBP6cBkgH+ChJgiilKbek51ZZ7A4DwCtoCgXJ7ltQ0/pilso5wJKw0DRwQwiz0Z/pnDjqQj+vrGYisTaeKExaI5AB3JgdnJfWLSaxfnPIJH3WOnFr1X13Y=","attributes":{"enabled":true,"nbf":1610566336,"exp":1642102936,"created":1610566936,"updated":1610566936,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610566932,"updated":1610566932}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  '75d9bab1-ccec-47d6-87bc-1f68d1e6314c',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:17 GMT',
  'Content-Length',
  '2790'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsvd1TXtzEuXOHIyO9kKHUnmkiR3ki4akjrnFwbqT0f6eQdJOdbOsWBSbFCUpOLCFn4ChuTEQNnC/tPMmPR/AWz9n4mHv24ZOLUmaQVTgUc0RlTFZp0Pz2eMkJMTDpZX1wmAakSWGMmSdd8pVYeQR+p543pNBJgo/wznyHvxA91kENKClICar//j9xlg2Re6YUp7/hKsZrhpYiBwDriFD5HNnQrC5rw3ziXFFbcmt13rRnrVME85xQmhiMXQ2dup6qRHOz9+kIHwzQIIMi7uxtL+suBE8zggrkJx/MYxrSLMJ+Bj1eJ45SSEHRN2eAte3frNAhEdr7MIRihpybSLALQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGTQ/39O/kqULnXkoLzXOsVCn3b210MVqDoAxCL5C1hP4ElDOyrwRVVV5DACmpL5EwFC3HfLpuFbAufgWw/7rW81xYSyhcTWIfMA/psUOyhL7qp3qEI5tMTl0etYU9wKk+pxZOMoTfUsdZ+Wsa0AVwfQM8yojvXgKWV1lbk9kO6T4Dk/HuRX3xp+yp0ThrRVxPSbd2tUZ5tEXPv6IOPQorwLjW4Fi4pQtODvnumT1rfDBPSaYmM4n1mYhAchxARu+WLh8ywXL0rRz6hTTzxjnp8YTtwf/B0zI819zqcyWFLw8w4lBM6VssF2kXT6cu7EwpRZHox7M2KxUhWM0BBeay8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a03b8c5bc21949059df501398a2a9828"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending?api-version=7.1&request_id=a03b8c5bc21949059df501398a2a9828',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '990d68de-f0ce-412d-a61d-8f272fad106a',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:18 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsvd1TXtzEuXOHIyO9kKHUnmkiR3ki4akjrnFwbqT0f6eQdJOdbOsWBSbFCUpOLCFn4ChuTEQNnC/tPMmPR/AWz9n4mHv24ZOLUmaQVTgUc0RlTFZp0Pz2eMkJMTDpZX1wmAakSWGMmSdd8pVYeQR+p543pNBJgo/wznyHvxA91kENKClICar//j9xlg2Re6YUp7/hKsZrhpYiBwDriFD5HNnQrC5rw3ziXFFbcmt13rRnrVME85xQmhiMXQ2dup6qRHOz9+kIHwzQIIMi7uxtL+suBE8zggrkJx/MYxrSLMJ+Bj1eJ45SSEHRN2eAte3frNAhEdr7MIRihpybSLALQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGTQ/39O/kqULnXkoLzXOsVCn3b210MVqDoAxCL5C1hP4ElDOyrwRVVV5DACmpL5EwFC3HfLpuFbAufgWw/7rW81xYSyhcTWIfMA/psUOyhL7qp3qEI5tMTl0etYU9wKk+pxZOMoTfUsdZ+Wsa0AVwfQM8yojvXgKWV1lbk9kO6T4Dk/HuRX3xp+yp0ThrRVxPSbd2tUZ5tEXPv6IOPQorwLjW4Fi4pQtODvnumT1rfDBPSaYmM4n1mYhAchxARu+WLh8ywXL0rRz6hTTzxjnp8YTtwf/B0zI819zqcyWFLw8w4lBM6VssF2kXT6cu7EwpRZHox7M2KxUhWM0BBeay8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a03b8c5bc21949059df501398a2a9828"}, [
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
  '5679c80f-b83e-47f9-b60b-cfa3e8d4c1b3',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:18 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsvd1TXtzEuXOHIyO9kKHUnmkiR3ki4akjrnFwbqT0f6eQdJOdbOsWBSbFCUpOLCFn4ChuTEQNnC/tPMmPR/AWz9n4mHv24ZOLUmaQVTgUc0RlTFZp0Pz2eMkJMTDpZX1wmAakSWGMmSdd8pVYeQR+p543pNBJgo/wznyHvxA91kENKClICar//j9xlg2Re6YUp7/hKsZrhpYiBwDriFD5HNnQrC5rw3ziXFFbcmt13rRnrVME85xQmhiMXQ2dup6qRHOz9+kIHwzQIIMi7uxtL+suBE8zggrkJx/MYxrSLMJ+Bj1eJ45SSEHRN2eAte3frNAhEdr7MIRihpybSLALQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGTQ/39O/kqULnXkoLzXOsVCn3b210MVqDoAxCL5C1hP4ElDOyrwRVVV5DACmpL5EwFC3HfLpuFbAufgWw/7rW81xYSyhcTWIfMA/psUOyhL7qp3qEI5tMTl0etYU9wKk+pxZOMoTfUsdZ+Wsa0AVwfQM8yojvXgKWV1lbk9kO6T4Dk/HuRX3xp+yp0ThrRVxPSbd2tUZ5tEXPv6IOPQorwLjW4Fi4pQtODvnumT1rfDBPSaYmM4n1mYhAchxARu+WLh8ywXL0rRz6hTTzxjnp8YTtwf/B0zI819zqcyWFLw8w4lBM6VssF2kXT6cu7EwpRZHox7M2KxUhWM0BBeay8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a03b8c5bc21949059df501398a2a9828"}, [
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
  '25768875-0e41-42aa-9943-855f51bb3b0e',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:18 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsvd1TXtzEuXOHIyO9kKHUnmkiR3ki4akjrnFwbqT0f6eQdJOdbOsWBSbFCUpOLCFn4ChuTEQNnC/tPMmPR/AWz9n4mHv24ZOLUmaQVTgUc0RlTFZp0Pz2eMkJMTDpZX1wmAakSWGMmSdd8pVYeQR+p543pNBJgo/wznyHvxA91kENKClICar//j9xlg2Re6YUp7/hKsZrhpYiBwDriFD5HNnQrC5rw3ziXFFbcmt13rRnrVME85xQmhiMXQ2dup6qRHOz9+kIHwzQIIMi7uxtL+suBE8zggrkJx/MYxrSLMJ+Bj1eJ45SSEHRN2eAte3frNAhEdr7MIRihpybSLALQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGTQ/39O/kqULnXkoLzXOsVCn3b210MVqDoAxCL5C1hP4ElDOyrwRVVV5DACmpL5EwFC3HfLpuFbAufgWw/7rW81xYSyhcTWIfMA/psUOyhL7qp3qEI5tMTl0etYU9wKk+pxZOMoTfUsdZ+Wsa0AVwfQM8yojvXgKWV1lbk9kO6T4Dk/HuRX3xp+yp0ThrRVxPSbd2tUZ5tEXPv6IOPQorwLjW4Fi4pQtODvnumT1rfDBPSaYmM4n1mYhAchxARu+WLh8ywXL0rRz6hTTzxjnp8YTtwf/B0zI819zqcyWFLw8w4lBM6VssF2kXT6cu7EwpRZHox7M2KxUhWM0BBeay8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a03b8c5bc21949059df501398a2a9828"}, [
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
  '5f413c78-d255-4c08-ae90-ee8b214cfc51',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:20 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsvd1TXtzEuXOHIyO9kKHUnmkiR3ki4akjrnFwbqT0f6eQdJOdbOsWBSbFCUpOLCFn4ChuTEQNnC/tPMmPR/AWz9n4mHv24ZOLUmaQVTgUc0RlTFZp0Pz2eMkJMTDpZX1wmAakSWGMmSdd8pVYeQR+p543pNBJgo/wznyHvxA91kENKClICar//j9xlg2Re6YUp7/hKsZrhpYiBwDriFD5HNnQrC5rw3ziXFFbcmt13rRnrVME85xQmhiMXQ2dup6qRHOz9+kIHwzQIIMi7uxtL+suBE8zggrkJx/MYxrSLMJ+Bj1eJ45SSEHRN2eAte3frNAhEdr7MIRihpybSLALQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGTQ/39O/kqULnXkoLzXOsVCn3b210MVqDoAxCL5C1hP4ElDOyrwRVVV5DACmpL5EwFC3HfLpuFbAufgWw/7rW81xYSyhcTWIfMA/psUOyhL7qp3qEI5tMTl0etYU9wKk+pxZOMoTfUsdZ+Wsa0AVwfQM8yojvXgKWV1lbk9kO6T4Dk/HuRX3xp+yp0ThrRVxPSbd2tUZ5tEXPv6IOPQorwLjW4Fi4pQtODvnumT1rfDBPSaYmM4n1mYhAchxARu+WLh8ywXL0rRz6hTTzxjnp8YTtwf/B0zI819zqcyWFLw8w4lBM6VssF2kXT6cu7EwpRZHox7M2KxUhWM0BBeay8=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","request_id":"a03b8c5bc21949059df501398a2a9828"}, [
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
  '42557992-75f1-4fda-8400-dee32a7fc24f',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:23 GMT',
  'Content-Length',
  '1387'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/387100b447ae46c9a6ec82597fce96b0","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/387100b447ae46c9a6ec82597fce96b0","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/387100b447ae46c9a6ec82597fce96b0","x5t":"-OfeqnlXn_er09iU1Ezw4PlbDPo","cer":"MIIDKDCCAhCgAwIBAgIQKZutfpE5Sdq3EuETzKpekDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTEzMTkzMjIyWhcNMjIwMTEzMTk0MjIyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCy93VNe3MS5c4cjI72QodSeaSJHeSLhqSOucXBupPR/p5B0k51s6xYFJsUJSk4sIWfgKG5MRA2cL+08yY9H8BbP2fiYe/bhk4tSZpBVOBRzRGVMVmnQ/PZ4yQkxMOllfXCYBqRJYYyZJ13ylVh5BH6nnjek0EmCj/DOfIe/ED3WQQ0oKUgJqv/+P3GWDZF7phSnv+EqxmuGliIHAOuIUPkc2dCsLmvDfOJcUVtya3XetGetUwTznFCaGIxdDZ26nqpEc7P36QgfDNAggyLu7G0v6y4ETzOCCuQnH8xjGtIswn4GPV4njlJIQdE3Z4C17d+s0CER2vswhGKGnJtIsAtAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQDarPPmXBLj5TyV+eCWWFCvRkWuTAdBgNVHQ4EFgQUA2qzz5lwS4+U8lfngllhQr0ZFrkwDQYJKoZIhvcNAQELBQADggEBAE3HrXa/jC1MC4EaiQeIN/tk72QDcnATa+909WpWBg3D1X9IDRRNY3xuOJ/JDaxQxmKTPdGdomhiONq8NadLDztuDDtEZFcb5Xg3ghDCv7XauXDfq/Ptq9x6+LzfbtD6nd8mqoiR/WAZiKsViYCFoPpHpZkM5BWuP8vBreLykiIljGUQbj7YZJeCtNwNs4SYl+H7nzaSbJoYXbt9UhutkokL9cSg2FpBGMXVvQ2wzlndt1oICS0giHqqhFnE9euwgf/lOWY6rzN4tTIHOwCAbXw3SkForn2TQDiUf/SRH3grtXme2xlRphC86FrbZjBV9js38HEFrhkDDRM8UwbwAFg=","attributes":{"enabled":true,"nbf":1610566342,"exp":1642102942,"created":1610566942,"updated":1610566942,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610566938,"updated":1610566938}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  'b61a6ca6-fffe-473b-b2fa-b87a54d5610a',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:23 GMT',
  'Content-Length',
  '2790'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1610566944,"scheduledPurgeDate":1618342944,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/086f6afece584b118c8648d2465fc9de","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/086f6afece584b118c8648d2465fc9de","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/086f6afece584b118c8648d2465fc9de","x5t":"u0Va8dd3CuzM37ygsHSB4-mV5B8","cer":"MIIDKDCCAhCgAwIBAgIQSWvycv+WTr+RJV1Xm1FEgzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTEzMTkzMjE2WhcNMjIwMTEzMTk0MjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDCgHUwHiyjVKD4MY+bS+4nz2ZHTm6etdQj7aV03zdYnIOfTybNfkaTRdL9+p30LRHkrS6zuW2ycMHPWmCLnPmnvtyQ7ferOa34uHWnBTXeV5EBgmobmROz1sRgqoasIRdW6k1Nl99HrfwVCQS9C6qH4WVkOVdFTXJWoPSLusMNpQeCyX+xzNRxvToP8fljd97egjWhzYT+rDld+0p07QLKEl9vJn/hLCoVI9JCmznuVFubNwY6XwiwUSMa/txbm2hyTTTevTP0w0eWif04VVJaJpjYVfAXY6WO4WLxay+XPcCd1uQYtPTV6hJXXwvmYb2Co+00tYFNpEPgBk5EtQmFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSpoGzsmnyUV/evlY/NLMEq1tZWTzAdBgNVHQ4EFgQUqaBs7Jp8lFf3r5WPzSzBKtbWVk8wDQYJKoZIhvcNAQELBQADggEBAFzRI2vINEmSNR8t1sGZWMgh8uPPBAFHOA+ZIMoYKt+2pLVlrTLxgIDvFuCNDRw/qypS3RQfZiMgow63AmbcQZHujFAqYmveJ6ZdOlctuyqaZK6PP2x+XI2lPgeiVCUY1Hx2hCU8S5RX0abHHD5q7/gdzC9r6arYUawwVjTbDDuTgJGZ6mQFXn7GUk1EDdOFe7LMNAkNrpn5jFUpA2Qn9SW9AcCeZvS46FBP6cBkgH+ChJgiilKbek51ZZ7A4DwCtoCgXJ7ltQ0/pilso5wJKw0DRwQwiz0Z/pnDjqQj+vrGYisTaeKExaI5AB3JgdnJfWLSaxfnPIJH3WOnFr1X13Y=","attributes":{"enabled":true,"nbf":1610566336,"exp":1642102936,"created":1610566936,"updated":1610566936,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610566932,"updated":1610566932}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  '122c928c-99fe-4554-a95e-4e37f194f667',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:23 GMT',
  'Content-Length',
  '3030'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '952058df-8866-47a1-bfd5-018ed53d447c',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a1c2d302-8d32-4f63-b49b-0b1248431f99',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b214b2dc-915c-494c-bf88-c679b83dbc03',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a2e83abb-1175-4f4d-be7d-2786f8d52984',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1610566944,"scheduledPurgeDate":1618342944,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/086f6afece584b118c8648d2465fc9de","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/086f6afece584b118c8648d2465fc9de","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/086f6afece584b118c8648d2465fc9de","x5t":"u0Va8dd3CuzM37ygsHSB4-mV5B8","cer":"MIIDKDCCAhCgAwIBAgIQSWvycv+WTr+RJV1Xm1FEgzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTEzMTkzMjE2WhcNMjIwMTEzMTk0MjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDCgHUwHiyjVKD4MY+bS+4nz2ZHTm6etdQj7aV03zdYnIOfTybNfkaTRdL9+p30LRHkrS6zuW2ycMHPWmCLnPmnvtyQ7ferOa34uHWnBTXeV5EBgmobmROz1sRgqoasIRdW6k1Nl99HrfwVCQS9C6qH4WVkOVdFTXJWoPSLusMNpQeCyX+xzNRxvToP8fljd97egjWhzYT+rDld+0p07QLKEl9vJn/hLCoVI9JCmznuVFubNwY6XwiwUSMa/txbm2hyTTTevTP0w0eWif04VVJaJpjYVfAXY6WO4WLxay+XPcCd1uQYtPTV6hJXXwvmYb2Co+00tYFNpEPgBk5EtQmFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSpoGzsmnyUV/evlY/NLMEq1tZWTzAdBgNVHQ4EFgQUqaBs7Jp8lFf3r5WPzSzBKtbWVk8wDQYJKoZIhvcNAQELBQADggEBAFzRI2vINEmSNR8t1sGZWMgh8uPPBAFHOA+ZIMoYKt+2pLVlrTLxgIDvFuCNDRw/qypS3RQfZiMgow63AmbcQZHujFAqYmveJ6ZdOlctuyqaZK6PP2x+XI2lPgeiVCUY1Hx2hCU8S5RX0abHHD5q7/gdzC9r6arYUawwVjTbDDuTgJGZ6mQFXn7GUk1EDdOFe7LMNAkNrpn5jFUpA2Qn9SW9AcCeZvS46FBP6cBkgH+ChJgiilKbek51ZZ7A4DwCtoCgXJ7ltQ0/pilso5wJKw0DRwQwiz0Z/pnDjqQj+vrGYisTaeKExaI5AB3JgdnJfWLSaxfnPIJH3WOnFr1X13Y=","attributes":{"enabled":true,"nbf":1610566336,"exp":1642102936,"created":1610566936,"updated":1610566936,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610566932,"updated":1610566932}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  '981fcec1-7a81-469e-9e9e-5e632546c78c',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:30 GMT',
  'Content-Length',
  '3030'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
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
  '745d10c4-fe87-4787-91b8-b3eca455603d',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1610566950,"scheduledPurgeDate":1618342950,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/387100b447ae46c9a6ec82597fce96b0","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/387100b447ae46c9a6ec82597fce96b0","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/387100b447ae46c9a6ec82597fce96b0","x5t":"-OfeqnlXn_er09iU1Ezw4PlbDPo","cer":"MIIDKDCCAhCgAwIBAgIQKZutfpE5Sdq3EuETzKpekDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTEzMTkzMjIyWhcNMjIwMTEzMTk0MjIyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCy93VNe3MS5c4cjI72QodSeaSJHeSLhqSOucXBupPR/p5B0k51s6xYFJsUJSk4sIWfgKG5MRA2cL+08yY9H8BbP2fiYe/bhk4tSZpBVOBRzRGVMVmnQ/PZ4yQkxMOllfXCYBqRJYYyZJ13ylVh5BH6nnjek0EmCj/DOfIe/ED3WQQ0oKUgJqv/+P3GWDZF7phSnv+EqxmuGliIHAOuIUPkc2dCsLmvDfOJcUVtya3XetGetUwTznFCaGIxdDZ26nqpEc7P36QgfDNAggyLu7G0v6y4ETzOCCuQnH8xjGtIswn4GPV4njlJIQdE3Z4C17d+s0CER2vswhGKGnJtIsAtAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQDarPPmXBLj5TyV+eCWWFCvRkWuTAdBgNVHQ4EFgQUA2qzz5lwS4+U8lfngllhQr0ZFrkwDQYJKoZIhvcNAQELBQADggEBAE3HrXa/jC1MC4EaiQeIN/tk72QDcnATa+909WpWBg3D1X9IDRRNY3xuOJ/JDaxQxmKTPdGdomhiONq8NadLDztuDDtEZFcb5Xg3ghDCv7XauXDfq/Ptq9x6+LzfbtD6nd8mqoiR/WAZiKsViYCFoPpHpZkM5BWuP8vBreLykiIljGUQbj7YZJeCtNwNs4SYl+H7nzaSbJoYXbt9UhutkokL9cSg2FpBGMXVvQ2wzlndt1oICS0giHqqhFnE9euwgf/lOWY6rzN4tTIHOwCAbXw3SkForn2TQDiUf/SRH3grtXme2xlRphC86FrbZjBV9js38HEFrhkDDRM8UwbwAFg=","attributes":{"enabled":true,"nbf":1610566342,"exp":1642102942,"created":1610566942,"updated":1610566942,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610566938,"updated":1610566938}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  'dd97442f-ee37-49cb-a236-e1ec18f224c2',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:30 GMT',
  'Content-Length',
  '3030'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '17b52c68-fa51-46fa-84b6-259f914d3c2c',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7a6d4d32-7faf-4388-bd87-a75e881c06ee',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'df5c0ac4-fa77-4d4b-9b08-2edc3fabccef',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1610566950,"scheduledPurgeDate":1618342950,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/387100b447ae46c9a6ec82597fce96b0","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/387100b447ae46c9a6ec82597fce96b0","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/387100b447ae46c9a6ec82597fce96b0","x5t":"-OfeqnlXn_er09iU1Ezw4PlbDPo","cer":"MIIDKDCCAhCgAwIBAgIQKZutfpE5Sdq3EuETzKpekDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTEzMTkzMjIyWhcNMjIwMTEzMTk0MjIyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCy93VNe3MS5c4cjI72QodSeaSJHeSLhqSOucXBupPR/p5B0k51s6xYFJsUJSk4sIWfgKG5MRA2cL+08yY9H8BbP2fiYe/bhk4tSZpBVOBRzRGVMVmnQ/PZ4yQkxMOllfXCYBqRJYYyZJ13ylVh5BH6nnjek0EmCj/DOfIe/ED3WQQ0oKUgJqv/+P3GWDZF7phSnv+EqxmuGliIHAOuIUPkc2dCsLmvDfOJcUVtya3XetGetUwTznFCaGIxdDZ26nqpEc7P36QgfDNAggyLu7G0v6y4ETzOCCuQnH8xjGtIswn4GPV4njlJIQdE3Z4C17d+s0CER2vswhGKGnJtIsAtAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQDarPPmXBLj5TyV+eCWWFCvRkWuTAdBgNVHQ4EFgQUA2qzz5lwS4+U8lfngllhQr0ZFrkwDQYJKoZIhvcNAQELBQADggEBAE3HrXa/jC1MC4EaiQeIN/tk72QDcnATa+909WpWBg3D1X9IDRRNY3xuOJ/JDaxQxmKTPdGdomhiONq8NadLDztuDDtEZFcb5Xg3ghDCv7XauXDfq/Ptq9x6+LzfbtD6nd8mqoiR/WAZiKsViYCFoPpHpZkM5BWuP8vBreLykiIljGUQbj7YZJeCtNwNs4SYl+H7nzaSbJoYXbt9UhutkokL9cSg2FpBGMXVvQ2wzlndt1oICS0giHqqhFnE9euwgf/lOWY6rzN4tTIHOwCAbXw3SkForn2TQDiUf/SRH3grtXme2xlRphC86FrbZjBV9js38HEFrhkDDRM8UwbwAFg=","attributes":{"enabled":true,"nbf":1610566342,"exp":1642102942,"created":1610566942,"updated":1610566942,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610566938,"updated":1610566938}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  'e7f7fb7f-1fc8-40d7-99a0-6f82a1a5fc3d',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:34 GMT',
  'Content-Length',
  '3030'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
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
  'cc14577e-4d1b-48f8-86f8-58a653a296dd',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:34 GMT'
]);
