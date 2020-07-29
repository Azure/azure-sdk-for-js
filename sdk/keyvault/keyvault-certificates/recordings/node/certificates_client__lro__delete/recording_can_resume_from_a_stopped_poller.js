let nock = require('nock');

module.exports.hash = "6f92988a1d5ba43e80e2c17ceb6ebc85";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/create')
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
  'd649c865-7a0d-41f9-aebb-f4ccfbcab22f',
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
  'Thu, 02 Jul 2020 18:42:52 GMT'
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
  'd8689d6b-a3dd-43ca-b2bb-538090e54a00',
  'x-ms-ests-server',
  '2.1.10761.15 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AlyDPwuUm3ZIo_Qdd7uYX7c_aSJHAQAAAK0hkNYOAAAA; expires=Sat, 01-Aug-2020 18:42:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 02 Jul 2020 18:42:52 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6gGEfi38xYFOfUzVP1Uhxquu7E7WlXnZl0ULfR1WRaPu/kHyw2409AcXfTVHLfeJL13xq/DnVWF67KeoNzdeY1MmmCRiOhkYEXwYH0t/yD8ATPuUZOCndpAfTIw/JeQKcvCjzyuQ9W0g7Q9QUeSAjdzMSR9sd56gAAzIza0y9bTn4bbx1Iuk3Hwsj3LBuff0egnk2yXCa470b4njRquHE2PLe8nR2shQEQiwG70s7aYefpfls9X+RpeKkfYdF+osObh+WvjYC6MsgKhxDgQ+4nVjfZCHC0U4O7CLEH3UYYL7R8ouBP98OVjKAtGcoiAoU2vewW1MC+9Z8Pz2wtVcxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFVAFZg4XPbo3OkwfN/B+K+qiryyT/uuTgGs5HH/lQfDgZXtMsX49bHUVzGcKwrQofBrOG/XONpXeLr0OefMc2SfC58gCnjj2ReitCCPTh8Tk7n4NI265fyb/V+OUG82JwR4QxaPL8apkz091WCtCsSzqW+GcM8NAK4VNhQA93VrZcLlkgCfcTHJkk3ooIwTr1Fn8ZkSqVibcy8ssHjb2GJc1OZw6ovUq5QPpkQi5IvjnpVG7M65laAoqqHL27xgViU8sn1y5NqBV8ZBB16K5Vh+sFF4fWhNJ07tgyd3YHsgDqkqhd1pEOuzrPM4X2+b8Sc5W2MPG/G/NgcLnbs8jKg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"da6195252fae49eeb4164b2227b7a39a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending?api-version=7.1-preview&request_id=da6195252fae49eeb4164b2227b7a39a',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4bdbc15a-5bf3-492e-94d8-a7c17098ad2f',
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
  'Thu, 02 Jul 2020 18:42:54 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6gGEfi38xYFOfUzVP1Uhxquu7E7WlXnZl0ULfR1WRaPu/kHyw2409AcXfTVHLfeJL13xq/DnVWF67KeoNzdeY1MmmCRiOhkYEXwYH0t/yD8ATPuUZOCndpAfTIw/JeQKcvCjzyuQ9W0g7Q9QUeSAjdzMSR9sd56gAAzIza0y9bTn4bbx1Iuk3Hwsj3LBuff0egnk2yXCa470b4njRquHE2PLe8nR2shQEQiwG70s7aYefpfls9X+RpeKkfYdF+osObh+WvjYC6MsgKhxDgQ+4nVjfZCHC0U4O7CLEH3UYYL7R8ouBP98OVjKAtGcoiAoU2vewW1MC+9Z8Pz2wtVcxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFVAFZg4XPbo3OkwfN/B+K+qiryyT/uuTgGs5HH/lQfDgZXtMsX49bHUVzGcKwrQofBrOG/XONpXeLr0OefMc2SfC58gCnjj2ReitCCPTh8Tk7n4NI265fyb/V+OUG82JwR4QxaPL8apkz091WCtCsSzqW+GcM8NAK4VNhQA93VrZcLlkgCfcTHJkk3ooIwTr1Fn8ZkSqVibcy8ssHjb2GJc1OZw6ovUq5QPpkQi5IvjnpVG7M65laAoqqHL27xgViU8sn1y5NqBV8ZBB16K5Vh+sFF4fWhNJ07tgyd3YHsgDqkqhd1pEOuzrPM4X2+b8Sc5W2MPG/G/NgcLnbs8jKg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"da6195252fae49eeb4164b2227b7a39a"}, [
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
  'b0ebfd5a-a174-4db0-950f-06807aea88a1',
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
  'Thu, 02 Jul 2020 18:42:54 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6gGEfi38xYFOfUzVP1Uhxquu7E7WlXnZl0ULfR1WRaPu/kHyw2409AcXfTVHLfeJL13xq/DnVWF67KeoNzdeY1MmmCRiOhkYEXwYH0t/yD8ATPuUZOCndpAfTIw/JeQKcvCjzyuQ9W0g7Q9QUeSAjdzMSR9sd56gAAzIza0y9bTn4bbx1Iuk3Hwsj3LBuff0egnk2yXCa470b4njRquHE2PLe8nR2shQEQiwG70s7aYefpfls9X+RpeKkfYdF+osObh+WvjYC6MsgKhxDgQ+4nVjfZCHC0U4O7CLEH3UYYL7R8ouBP98OVjKAtGcoiAoU2vewW1MC+9Z8Pz2wtVcxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFVAFZg4XPbo3OkwfN/B+K+qiryyT/uuTgGs5HH/lQfDgZXtMsX49bHUVzGcKwrQofBrOG/XONpXeLr0OefMc2SfC58gCnjj2ReitCCPTh8Tk7n4NI265fyb/V+OUG82JwR4QxaPL8apkz091WCtCsSzqW+GcM8NAK4VNhQA93VrZcLlkgCfcTHJkk3ooIwTr1Fn8ZkSqVibcy8ssHjb2GJc1OZw6ovUq5QPpkQi5IvjnpVG7M65laAoqqHL27xgViU8sn1y5NqBV8ZBB16K5Vh+sFF4fWhNJ07tgyd3YHsgDqkqhd1pEOuzrPM4X2+b8Sc5W2MPG/G/NgcLnbs8jKg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"da6195252fae49eeb4164b2227b7a39a"}, [
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
  '336d9051-1ba5-4ddc-a98b-420f98de15af',
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
  'Thu, 02 Jul 2020 18:42:54 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6gGEfi38xYFOfUzVP1Uhxquu7E7WlXnZl0ULfR1WRaPu/kHyw2409AcXfTVHLfeJL13xq/DnVWF67KeoNzdeY1MmmCRiOhkYEXwYH0t/yD8ATPuUZOCndpAfTIw/JeQKcvCjzyuQ9W0g7Q9QUeSAjdzMSR9sd56gAAzIza0y9bTn4bbx1Iuk3Hwsj3LBuff0egnk2yXCa470b4njRquHE2PLe8nR2shQEQiwG70s7aYefpfls9X+RpeKkfYdF+osObh+WvjYC6MsgKhxDgQ+4nVjfZCHC0U4O7CLEH3UYYL7R8ouBP98OVjKAtGcoiAoU2vewW1MC+9Z8Pz2wtVcxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFVAFZg4XPbo3OkwfN/B+K+qiryyT/uuTgGs5HH/lQfDgZXtMsX49bHUVzGcKwrQofBrOG/XONpXeLr0OefMc2SfC58gCnjj2ReitCCPTh8Tk7n4NI265fyb/V+OUG82JwR4QxaPL8apkz091WCtCsSzqW+GcM8NAK4VNhQA93VrZcLlkgCfcTHJkk3ooIwTr1Fn8ZkSqVibcy8ssHjb2GJc1OZw6ovUq5QPpkQi5IvjnpVG7M65laAoqqHL27xgViU8sn1y5NqBV8ZBB16K5Vh+sFF4fWhNJ07tgyd3YHsgDqkqhd1pEOuzrPM4X2+b8Sc5W2MPG/G/NgcLnbs8jKg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"da6195252fae49eeb4164b2227b7a39a"}, [
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
  'ac033d80-2eca-4b96-9f8c-dd26a1138196',
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
  'Thu, 02 Jul 2020 18:42:56 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6gGEfi38xYFOfUzVP1Uhxquu7E7WlXnZl0ULfR1WRaPu/kHyw2409AcXfTVHLfeJL13xq/DnVWF67KeoNzdeY1MmmCRiOhkYEXwYH0t/yD8ATPuUZOCndpAfTIw/JeQKcvCjzyuQ9W0g7Q9QUeSAjdzMSR9sd56gAAzIza0y9bTn4bbx1Iuk3Hwsj3LBuff0egnk2yXCa470b4njRquHE2PLe8nR2shQEQiwG70s7aYefpfls9X+RpeKkfYdF+osObh+WvjYC6MsgKhxDgQ+4nVjfZCHC0U4O7CLEH3UYYL7R8ouBP98OVjKAtGcoiAoU2vewW1MC+9Z8Pz2wtVcxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFVAFZg4XPbo3OkwfN/B+K+qiryyT/uuTgGs5HH/lQfDgZXtMsX49bHUVzGcKwrQofBrOG/XONpXeLr0OefMc2SfC58gCnjj2ReitCCPTh8Tk7n4NI265fyb/V+OUG82JwR4QxaPL8apkz091WCtCsSzqW+GcM8NAK4VNhQA93VrZcLlkgCfcTHJkk3ooIwTr1Fn8ZkSqVibcy8ssHjb2GJc1OZw6ovUq5QPpkQi5IvjnpVG7M65laAoqqHL27xgViU8sn1y5NqBV8ZBB16K5Vh+sFF4fWhNJ07tgyd3YHsgDqkqhd1pEOuzrPM4X2+b8Sc5W2MPG/G/NgcLnbs8jKg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"da6195252fae49eeb4164b2227b7a39a"}, [
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
  '46cdfb3f-6e01-4ec9-b6d1-3f6fda46914c',
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
  'Thu, 02 Jul 2020 18:42:58 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6gGEfi38xYFOfUzVP1Uhxquu7E7WlXnZl0ULfR1WRaPu/kHyw2409AcXfTVHLfeJL13xq/DnVWF67KeoNzdeY1MmmCRiOhkYEXwYH0t/yD8ATPuUZOCndpAfTIw/JeQKcvCjzyuQ9W0g7Q9QUeSAjdzMSR9sd56gAAzIza0y9bTn4bbx1Iuk3Hwsj3LBuff0egnk2yXCa470b4njRquHE2PLe8nR2shQEQiwG70s7aYefpfls9X+RpeKkfYdF+osObh+WvjYC6MsgKhxDgQ+4nVjfZCHC0U4O7CLEH3UYYL7R8ouBP98OVjKAtGcoiAoU2vewW1MC+9Z8Pz2wtVcxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFVAFZg4XPbo3OkwfN/B+K+qiryyT/uuTgGs5HH/lQfDgZXtMsX49bHUVzGcKwrQofBrOG/XONpXeLr0OefMc2SfC58gCnjj2ReitCCPTh8Tk7n4NI265fyb/V+OUG82JwR4QxaPL8apkz091WCtCsSzqW+GcM8NAK4VNhQA93VrZcLlkgCfcTHJkk3ooIwTr1Fn8ZkSqVibcy8ssHjb2GJc1OZw6ovUq5QPpkQi5IvjnpVG7M65laAoqqHL27xgViU8sn1y5NqBV8ZBB16K5Vh+sFF4fWhNJ07tgyd3YHsgDqkqhd1pEOuzrPM4X2+b8Sc5W2MPG/G/NgcLnbs8jKg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"da6195252fae49eeb4164b2227b7a39a"}, [
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
  '4530a4c6-6ce3-43ed-848f-de3143c34e43',
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
  'Thu, 02 Jul 2020 18:43:00 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6gGEfi38xYFOfUzVP1Uhxquu7E7WlXnZl0ULfR1WRaPu/kHyw2409AcXfTVHLfeJL13xq/DnVWF67KeoNzdeY1MmmCRiOhkYEXwYH0t/yD8ATPuUZOCndpAfTIw/JeQKcvCjzyuQ9W0g7Q9QUeSAjdzMSR9sd56gAAzIza0y9bTn4bbx1Iuk3Hwsj3LBuff0egnk2yXCa470b4njRquHE2PLe8nR2shQEQiwG70s7aYefpfls9X+RpeKkfYdF+osObh+WvjYC6MsgKhxDgQ+4nVjfZCHC0U4O7CLEH3UYYL7R8ouBP98OVjKAtGcoiAoU2vewW1MC+9Z8Pz2wtVcxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFVAFZg4XPbo3OkwfN/B+K+qiryyT/uuTgGs5HH/lQfDgZXtMsX49bHUVzGcKwrQofBrOG/XONpXeLr0OefMc2SfC58gCnjj2ReitCCPTh8Tk7n4NI265fyb/V+OUG82JwR4QxaPL8apkz091WCtCsSzqW+GcM8NAK4VNhQA93VrZcLlkgCfcTHJkk3ooIwTr1Fn8ZkSqVibcy8ssHjb2GJc1OZw6ovUq5QPpkQi5IvjnpVG7M65laAoqqHL27xgViU8sn1y5NqBV8ZBB16K5Vh+sFF4fWhNJ07tgyd3YHsgDqkqhd1pEOuzrPM4X2+b8Sc5W2MPG/G/NgcLnbs8jKg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"da6195252fae49eeb4164b2227b7a39a"}, [
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
  '802577ca-c9c2-458f-be24-ff0f8e5bf30e',
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
  'Thu, 02 Jul 2020 18:43:02 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6gGEfi38xYFOfUzVP1Uhxquu7E7WlXnZl0ULfR1WRaPu/kHyw2409AcXfTVHLfeJL13xq/DnVWF67KeoNzdeY1MmmCRiOhkYEXwYH0t/yD8ATPuUZOCndpAfTIw/JeQKcvCjzyuQ9W0g7Q9QUeSAjdzMSR9sd56gAAzIza0y9bTn4bbx1Iuk3Hwsj3LBuff0egnk2yXCa470b4njRquHE2PLe8nR2shQEQiwG70s7aYefpfls9X+RpeKkfYdF+osObh+WvjYC6MsgKhxDgQ+4nVjfZCHC0U4O7CLEH3UYYL7R8ouBP98OVjKAtGcoiAoU2vewW1MC+9Z8Pz2wtVcxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFVAFZg4XPbo3OkwfN/B+K+qiryyT/uuTgGs5HH/lQfDgZXtMsX49bHUVzGcKwrQofBrOG/XONpXeLr0OefMc2SfC58gCnjj2ReitCCPTh8Tk7n4NI265fyb/V+OUG82JwR4QxaPL8apkz091WCtCsSzqW+GcM8NAK4VNhQA93VrZcLlkgCfcTHJkk3ooIwTr1Fn8ZkSqVibcy8ssHjb2GJc1OZw6ovUq5QPpkQi5IvjnpVG7M65laAoqqHL27xgViU8sn1y5NqBV8ZBB16K5Vh+sFF4fWhNJ07tgyd3YHsgDqkqhd1pEOuzrPM4X2+b8Sc5W2MPG/G/NgcLnbs8jKg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"da6195252fae49eeb4164b2227b7a39a"}, [
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
  '246855d4-4bfd-4601-bcc6-b59ee0d0844c',
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
  'Thu, 02 Jul 2020 18:43:04 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6gGEfi38xYFOfUzVP1Uhxquu7E7WlXnZl0ULfR1WRaPu/kHyw2409AcXfTVHLfeJL13xq/DnVWF67KeoNzdeY1MmmCRiOhkYEXwYH0t/yD8ATPuUZOCndpAfTIw/JeQKcvCjzyuQ9W0g7Q9QUeSAjdzMSR9sd56gAAzIza0y9bTn4bbx1Iuk3Hwsj3LBuff0egnk2yXCa470b4njRquHE2PLe8nR2shQEQiwG70s7aYefpfls9X+RpeKkfYdF+osObh+WvjYC6MsgKhxDgQ+4nVjfZCHC0U4O7CLEH3UYYL7R8ouBP98OVjKAtGcoiAoU2vewW1MC+9Z8Pz2wtVcxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFVAFZg4XPbo3OkwfN/B+K+qiryyT/uuTgGs5HH/lQfDgZXtMsX49bHUVzGcKwrQofBrOG/XONpXeLr0OefMc2SfC58gCnjj2ReitCCPTh8Tk7n4NI265fyb/V+OUG82JwR4QxaPL8apkz091WCtCsSzqW+GcM8NAK4VNhQA93VrZcLlkgCfcTHJkk3ooIwTr1Fn8ZkSqVibcy8ssHjb2GJc1OZw6ovUq5QPpkQi5IvjnpVG7M65laAoqqHL27xgViU8sn1y5NqBV8ZBB16K5Vh+sFF4fWhNJ07tgyd3YHsgDqkqhd1pEOuzrPM4X2+b8Sc5W2MPG/G/NgcLnbs8jKg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"da6195252fae49eeb4164b2227b7a39a"}, [
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
  'b157e1bd-618f-4080-97f1-2770c4fe1198',
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
  'Thu, 02 Jul 2020 18:43:06 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6gGEfi38xYFOfUzVP1Uhxquu7E7WlXnZl0ULfR1WRaPu/kHyw2409AcXfTVHLfeJL13xq/DnVWF67KeoNzdeY1MmmCRiOhkYEXwYH0t/yD8ATPuUZOCndpAfTIw/JeQKcvCjzyuQ9W0g7Q9QUeSAjdzMSR9sd56gAAzIza0y9bTn4bbx1Iuk3Hwsj3LBuff0egnk2yXCa470b4njRquHE2PLe8nR2shQEQiwG70s7aYefpfls9X+RpeKkfYdF+osObh+WvjYC6MsgKhxDgQ+4nVjfZCHC0U4O7CLEH3UYYL7R8ouBP98OVjKAtGcoiAoU2vewW1MC+9Z8Pz2wtVcxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFVAFZg4XPbo3OkwfN/B+K+qiryyT/uuTgGs5HH/lQfDgZXtMsX49bHUVzGcKwrQofBrOG/XONpXeLr0OefMc2SfC58gCnjj2ReitCCPTh8Tk7n4NI265fyb/V+OUG82JwR4QxaPL8apkz091WCtCsSzqW+GcM8NAK4VNhQA93VrZcLlkgCfcTHJkk3ooIwTr1Fn8ZkSqVibcy8ssHjb2GJc1OZw6ovUq5QPpkQi5IvjnpVG7M65laAoqqHL27xgViU8sn1y5NqBV8ZBB16K5Vh+sFF4fWhNJ07tgyd3YHsgDqkqhd1pEOuzrPM4X2+b8Sc5W2MPG/G/NgcLnbs8jKg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"da6195252fae49eeb4164b2227b7a39a"}, [
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
  '7fa2cbca-0163-487f-82e0-72dc52e413c5',
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
  'Thu, 02 Jul 2020 18:43:08 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6gGEfi38xYFOfUzVP1Uhxquu7E7WlXnZl0ULfR1WRaPu/kHyw2409AcXfTVHLfeJL13xq/DnVWF67KeoNzdeY1MmmCRiOhkYEXwYH0t/yD8ATPuUZOCndpAfTIw/JeQKcvCjzyuQ9W0g7Q9QUeSAjdzMSR9sd56gAAzIza0y9bTn4bbx1Iuk3Hwsj3LBuff0egnk2yXCa470b4njRquHE2PLe8nR2shQEQiwG70s7aYefpfls9X+RpeKkfYdF+osObh+WvjYC6MsgKhxDgQ+4nVjfZCHC0U4O7CLEH3UYYL7R8ouBP98OVjKAtGcoiAoU2vewW1MC+9Z8Pz2wtVcxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFVAFZg4XPbo3OkwfN/B+K+qiryyT/uuTgGs5HH/lQfDgZXtMsX49bHUVzGcKwrQofBrOG/XONpXeLr0OefMc2SfC58gCnjj2ReitCCPTh8Tk7n4NI265fyb/V+OUG82JwR4QxaPL8apkz091WCtCsSzqW+GcM8NAK4VNhQA93VrZcLlkgCfcTHJkk3ooIwTr1Fn8ZkSqVibcy8ssHjb2GJc1OZw6ovUq5QPpkQi5IvjnpVG7M65laAoqqHL27xgViU8sn1y5NqBV8ZBB16K5Vh+sFF4fWhNJ07tgyd3YHsgDqkqhd1pEOuzrPM4X2+b8Sc5W2MPG/G/NgcLnbs8jKg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"da6195252fae49eeb4164b2227b7a39a"}, [
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
  'f3896d1d-437e-4d02-a62f-3ec51969be02',
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
  'Thu, 02 Jul 2020 18:43:10 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6gGEfi38xYFOfUzVP1Uhxquu7E7WlXnZl0ULfR1WRaPu/kHyw2409AcXfTVHLfeJL13xq/DnVWF67KeoNzdeY1MmmCRiOhkYEXwYH0t/yD8ATPuUZOCndpAfTIw/JeQKcvCjzyuQ9W0g7Q9QUeSAjdzMSR9sd56gAAzIza0y9bTn4bbx1Iuk3Hwsj3LBuff0egnk2yXCa470b4njRquHE2PLe8nR2shQEQiwG70s7aYefpfls9X+RpeKkfYdF+osObh+WvjYC6MsgKhxDgQ+4nVjfZCHC0U4O7CLEH3UYYL7R8ouBP98OVjKAtGcoiAoU2vewW1MC+9Z8Pz2wtVcxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFVAFZg4XPbo3OkwfN/B+K+qiryyT/uuTgGs5HH/lQfDgZXtMsX49bHUVzGcKwrQofBrOG/XONpXeLr0OefMc2SfC58gCnjj2ReitCCPTh8Tk7n4NI265fyb/V+OUG82JwR4QxaPL8apkz091WCtCsSzqW+GcM8NAK4VNhQA93VrZcLlkgCfcTHJkk3ooIwTr1Fn8ZkSqVibcy8ssHjb2GJc1OZw6ovUq5QPpkQi5IvjnpVG7M65laAoqqHL27xgViU8sn1y5NqBV8ZBB16K5Vh+sFF4fWhNJ07tgyd3YHsgDqkqhd1pEOuzrPM4X2+b8Sc5W2MPG/G/NgcLnbs8jKg=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-","request_id":"da6195252fae49eeb4164b2227b7a39a"}, [
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
  'c34f10cc-6866-4758-bf7a-93593a010560',
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
  'Thu, 02 Jul 2020 18:43:13 GMT',
  'Content-Length',
  '1317'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/68461a7bf7594ec1a90dd5db6361897e","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canresumefromastoppedpoller-/68461a7bf7594ec1a90dd5db6361897e","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canresumefromastoppedpoller-/68461a7bf7594ec1a90dd5db6361897e","x5t":"BNdNUlMLfcS9aSTbCVgOmioScw0","cer":"MIIDKDCCAhCgAwIBAgIQYQH+lXwnTlGoL94X+lJzFTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMzEyWhcNMjEwNzAyMTg0MzEyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDqAYR+LfzFgU59TNU/VSHGq67sTtaVedmXRQt9HVZFo+7+QfLDbjT0Bxd9NUct94kvXfGr8OdVYXrsp6g3N15jUyaYJGI6GRgRfBgfS3/IPwBM+5Rk4Kd2kB9MjD8l5Apy8KPPK5D1bSDtD1BR5ICN3MxJH2x3nqAADMjNrTL1tOfhtvHUi6TcfCyPcsG59/R6CeTbJcJrjvRvieNGq4cTY8t7ydHayFARCLAbvSztph5+l+Wz1f5Gl4qR9h0X6iw5uH5a+NgLoyyAqHEOBD7idWN9kIcLRTg7sIsQfdRhgvtHyi4E/3w5WMoC0ZyiIChTa97BbUwL71nw/PbC1VzFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR2Yy6hXwH38BiCxabcs3IOdz3iXDAdBgNVHQ4EFgQUdmMuoV8B9/AYgsWm3LNyDnc94lwwDQYJKoZIhvcNAQELBQADggEBADsBvl8Uf2Ha3L4Ou8Pr/570iM9W27w7BLW1s+nrO13suRz0OTs/OHggbYBPs5qUtd4W0Mq9RmvasdFdQH8Bry39aJ02JKoXmiIXddqQARoZd73Nyfr0hac3qiwta+JoPG5YEqex3qw1rE8rL4nglv9avo+Ue3EgJaZsCqYTE4orn6f6VGBPep3YZtNwLIig22tOOHVZedvPrfedhhDAKIaA7y+1zeCWFtxlWQWG53cXKNgaufxfKlA1tDljI1nb5KFJTDMDgMMcfPSUH92sDJr8SK5cG5Tc/cRPOZ0nrIg6nhnRliWRieeMAUfFHM7h22f4ZpFsPx1cq/wH7+9mUYg=","attributes":{"enabled":true,"nbf":1593714792,"exp":1625251392,"created":1593715392,"updated":1593715392,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715374,"updated":1593715374}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '189ad395-85a2-43f0-ad1a-ab2fd7a23e64',
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
  'Thu, 02 Jul 2020 18:43:13 GMT',
  'Content-Length',
  '2615'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-","deletedDate":1593715393,"scheduledPurgeDate":1601491393,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/68461a7bf7594ec1a90dd5db6361897e","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canresumefromastoppedpoller-/68461a7bf7594ec1a90dd5db6361897e","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canresumefromastoppedpoller-/68461a7bf7594ec1a90dd5db6361897e","x5t":"BNdNUlMLfcS9aSTbCVgOmioScw0","cer":"MIIDKDCCAhCgAwIBAgIQYQH+lXwnTlGoL94X+lJzFTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMzEyWhcNMjEwNzAyMTg0MzEyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDqAYR+LfzFgU59TNU/VSHGq67sTtaVedmXRQt9HVZFo+7+QfLDbjT0Bxd9NUct94kvXfGr8OdVYXrsp6g3N15jUyaYJGI6GRgRfBgfS3/IPwBM+5Rk4Kd2kB9MjD8l5Apy8KPPK5D1bSDtD1BR5ICN3MxJH2x3nqAADMjNrTL1tOfhtvHUi6TcfCyPcsG59/R6CeTbJcJrjvRvieNGq4cTY8t7ydHayFARCLAbvSztph5+l+Wz1f5Gl4qR9h0X6iw5uH5a+NgLoyyAqHEOBD7idWN9kIcLRTg7sIsQfdRhgvtHyi4E/3w5WMoC0ZyiIChTa97BbUwL71nw/PbC1VzFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR2Yy6hXwH38BiCxabcs3IOdz3iXDAdBgNVHQ4EFgQUdmMuoV8B9/AYgsWm3LNyDnc94lwwDQYJKoZIhvcNAQELBQADggEBADsBvl8Uf2Ha3L4Ou8Pr/570iM9W27w7BLW1s+nrO13suRz0OTs/OHggbYBPs5qUtd4W0Mq9RmvasdFdQH8Bry39aJ02JKoXmiIXddqQARoZd73Nyfr0hac3qiwta+JoPG5YEqex3qw1rE8rL4nglv9avo+Ue3EgJaZsCqYTE4orn6f6VGBPep3YZtNwLIig22tOOHVZedvPrfedhhDAKIaA7y+1zeCWFtxlWQWG53cXKNgaufxfKlA1tDljI1nb5KFJTDMDgMMcfPSUH92sDJr8SK5cG5Tc/cRPOZ0nrIg6nhnRliWRieeMAUfFHM7h22f4ZpFsPx1cq/wH7+9mUYg=","attributes":{"enabled":true,"nbf":1593714792,"exp":1625251392,"created":1593715392,"updated":1593715392,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715374,"updated":1593715374}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'e0122103-ade3-46e9-84b0-58002617d745',
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
  'Thu, 02 Jul 2020 18:43:13 GMT',
  'Content-Length',
  '2820'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f47efa2f-ec11-4f23-89ee-986b83399f42',
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
  'Thu, 02 Jul 2020 18:43:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b1b1509a-8ce4-44af-bcf1-93a74952b865',
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
  'Thu, 02 Jul 2020 18:43:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'eea1eb20-9408-4b09-8205-19b60de6966a',
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
  'Thu, 02 Jul 2020 18:43:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a58ec216-3e70-406a-b79a-ad2e04987321',
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
  'Thu, 02 Jul 2020 18:43:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5d1a7a30-016a-466b-a3a4-2cadd7a7d9b1',
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
  'Thu, 02 Jul 2020 18:43:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1079c06e-ad15-4a6f-b6b6-a0c8e105119e',
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
  'Thu, 02 Jul 2020 18:43:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cbb5cdee-e152-4eb3-a5cd-e7ca275f74ea',
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
  'Thu, 02 Jul 2020 18:43:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '094f98b9-9042-459f-8810-9a70e431a0b4',
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
  'Thu, 02 Jul 2020 18:43:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a468d52f-332d-478a-9a1b-6c3fdbc3c562',
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
  'Thu, 02 Jul 2020 18:43:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7704b01b-714a-4715-b45d-6b83c801f19d',
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
  'Thu, 02 Jul 2020 18:43:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0e718a0b-4e75-4c50-9b6d-ee924c266965',
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
  'Thu, 02 Jul 2020 18:43:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd088f32a-0b13-4a0e-947b-4f01cd495f3a',
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
  'Thu, 02 Jul 2020 18:43:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dd7e3fb6-d4b0-4fea-9fdd-43b7f9b2083a',
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
  'Thu, 02 Jul 2020 18:43:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b04cc061-f366-4a6d-b95f-b9243cef962c',
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
  'Thu, 02 Jul 2020 18:43:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fbfb23c7-34b8-415e-8297-2938f9d596f7',
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
  'Thu, 02 Jul 2020 18:43:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-","deletedDate":1593715393,"scheduledPurgeDate":1601491393,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/68461a7bf7594ec1a90dd5db6361897e","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canresumefromastoppedpoller-/68461a7bf7594ec1a90dd5db6361897e","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canresumefromastoppedpoller-/68461a7bf7594ec1a90dd5db6361897e","x5t":"BNdNUlMLfcS9aSTbCVgOmioScw0","cer":"MIIDKDCCAhCgAwIBAgIQYQH+lXwnTlGoL94X+lJzFTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMzEyWhcNMjEwNzAyMTg0MzEyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDqAYR+LfzFgU59TNU/VSHGq67sTtaVedmXRQt9HVZFo+7+QfLDbjT0Bxd9NUct94kvXfGr8OdVYXrsp6g3N15jUyaYJGI6GRgRfBgfS3/IPwBM+5Rk4Kd2kB9MjD8l5Apy8KPPK5D1bSDtD1BR5ICN3MxJH2x3nqAADMjNrTL1tOfhtvHUi6TcfCyPcsG59/R6CeTbJcJrjvRvieNGq4cTY8t7ydHayFARCLAbvSztph5+l+Wz1f5Gl4qR9h0X6iw5uH5a+NgLoyyAqHEOBD7idWN9kIcLRTg7sIsQfdRhgvtHyi4E/3w5WMoC0ZyiIChTa97BbUwL71nw/PbC1VzFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR2Yy6hXwH38BiCxabcs3IOdz3iXDAdBgNVHQ4EFgQUdmMuoV8B9/AYgsWm3LNyDnc94lwwDQYJKoZIhvcNAQELBQADggEBADsBvl8Uf2Ha3L4Ou8Pr/570iM9W27w7BLW1s+nrO13suRz0OTs/OHggbYBPs5qUtd4W0Mq9RmvasdFdQH8Bry39aJ02JKoXmiIXddqQARoZd73Nyfr0hac3qiwta+JoPG5YEqex3qw1rE8rL4nglv9avo+Ue3EgJaZsCqYTE4orn6f6VGBPep3YZtNwLIig22tOOHVZedvPrfedhhDAKIaA7y+1zeCWFtxlWQWG53cXKNgaufxfKlA1tDljI1nb5KFJTDMDgMMcfPSUH92sDJr8SK5cG5Tc/cRPOZ0nrIg6nhnRliWRieeMAUfFHM7h22f4ZpFsPx1cq/wH7+9mUYg=","attributes":{"enabled":true,"nbf":1593714792,"exp":1625251392,"created":1593715392,"updated":1593715392,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715374,"updated":1593715374}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '4b0d38d8-6e6f-4869-8259-e7cf7aa87257',
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
  'Thu, 02 Jul 2020 18:43:37 GMT',
  'Content-Length',
  '2820'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-","deletedDate":1593715393,"scheduledPurgeDate":1601491393,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/68461a7bf7594ec1a90dd5db6361897e","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canresumefromastoppedpoller-/68461a7bf7594ec1a90dd5db6361897e","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canresumefromastoppedpoller-/68461a7bf7594ec1a90dd5db6361897e","x5t":"BNdNUlMLfcS9aSTbCVgOmioScw0","cer":"MIIDKDCCAhCgAwIBAgIQYQH+lXwnTlGoL94X+lJzFTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMzEyWhcNMjEwNzAyMTg0MzEyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDqAYR+LfzFgU59TNU/VSHGq67sTtaVedmXRQt9HVZFo+7+QfLDbjT0Bxd9NUct94kvXfGr8OdVYXrsp6g3N15jUyaYJGI6GRgRfBgfS3/IPwBM+5Rk4Kd2kB9MjD8l5Apy8KPPK5D1bSDtD1BR5ICN3MxJH2x3nqAADMjNrTL1tOfhtvHUi6TcfCyPcsG59/R6CeTbJcJrjvRvieNGq4cTY8t7ydHayFARCLAbvSztph5+l+Wz1f5Gl4qR9h0X6iw5uH5a+NgLoyyAqHEOBD7idWN9kIcLRTg7sIsQfdRhgvtHyi4E/3w5WMoC0ZyiIChTa97BbUwL71nw/PbC1VzFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR2Yy6hXwH38BiCxabcs3IOdz3iXDAdBgNVHQ4EFgQUdmMuoV8B9/AYgsWm3LNyDnc94lwwDQYJKoZIhvcNAQELBQADggEBADsBvl8Uf2Ha3L4Ou8Pr/570iM9W27w7BLW1s+nrO13suRz0OTs/OHggbYBPs5qUtd4W0Mq9RmvasdFdQH8Bry39aJ02JKoXmiIXddqQARoZd73Nyfr0hac3qiwta+JoPG5YEqex3qw1rE8rL4nglv9avo+Ue3EgJaZsCqYTE4orn6f6VGBPep3YZtNwLIig22tOOHVZedvPrfedhhDAKIaA7y+1zeCWFtxlWQWG53cXKNgaufxfKlA1tDljI1nb5KFJTDMDgMMcfPSUH92sDJr8SK5cG5Tc/cRPOZ0nrIg6nhnRliWRieeMAUfFHM7h22f4ZpFsPx1cq/wH7+9mUYg=","attributes":{"enabled":true,"nbf":1593714792,"exp":1625251392,"created":1593715392,"updated":1593715392,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715374,"updated":1593715374}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'abd25f73-94cf-461e-97d6-6ae121094843',
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
  'Thu, 02 Jul 2020 18:43:38 GMT',
  'Content-Length',
  '2820'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
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
  '7c69469b-20ca-4c03-be39-8f1de0722d8d',
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
  'Thu, 02 Jul 2020 18:43:37 GMT'
]);
