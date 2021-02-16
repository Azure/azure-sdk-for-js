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
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0111fe97-5e86-4d51-a917-ec2b0ef0bc4e',
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
  'Tue, 16 Feb 2021 19:04:48 GMT'
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
  'c05d864a-9034-450c-a8c7-74ed3ac2eb00',
  'x-ms-ests-server',
  '2.1.11496.5 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEQAAAE0NvtcOAAAA; expires=Thu, 18-Mar-2021 19:04:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:04:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmiwljDBgBHJozsUVU7LJq8e23lrERZo/6M3aY7Dq4L+NSOR0Wqv/oBjwBNQCSuxizeAQHffxRI9ozkBxj9j9wxmK/5WUg2ljDhL/ZGDSbtkK3BbhY6w9AzdUKBfrGHAID1OuDojpyb3WftM2SmPIETH0NMNEDbXFwwfoVQfhZp6fiXQLsXrG0w7LXhVUdt2vcCxuYXX5dPUBwQYNugqqO9Y2lGwf515SxFDwRQkwd4bvfL7zxdSNhVd7j6msgje22swSAdACEHLP8Xrb6l+KrCKZrkL3+VlASRZIp7DT2zE/TrAVwtua7MuXlv+ezRLyt7z7qnOjeuzWso1FgyfLkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIVGECcelctgwFL8XBZ0FDu/S5seRwLPHJUKdDWoipQxa5bNRZmgBmp2LpLj2Qp6b32AKKMzud99LGoPUVqAPJ1r5oUI86KErcERXOFsILYIvVR6lEBq+B5RTQFJ+DhuCKd5nuJ9m/5SF1jlwmhj2U9fEOhW8D8GJdQyNzoAj/YQEh/nP18BPO5FIC5Ia93btKNSDhwA2/UUdRsTrC66VD6pn3iZVnsMMLvfBhlrAi9kOi2rOYeI5517Ss0aPLC1ptIyTdSX4aZQKId/HqXkc5oTbtu7RxJSD0pHYd1u9+k1xUl9OXdhkdhMJoiX72YI0ieEsIBx8HQ6P1IwBJPPsR4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6c4292d7fd14fbba451c20565c51378"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending?api-version=7.2&request_id=f6c4292d7fd14fbba451c20565c51378',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'fff2ca2f-dd59-45f9-932d-c1402ed7f2cb',
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
  'Tue, 16 Feb 2021 19:04:48 GMT',
  'Content-Length',
  '1392'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmiwljDBgBHJozsUVU7LJq8e23lrERZo/6M3aY7Dq4L+NSOR0Wqv/oBjwBNQCSuxizeAQHffxRI9ozkBxj9j9wxmK/5WUg2ljDhL/ZGDSbtkK3BbhY6w9AzdUKBfrGHAID1OuDojpyb3WftM2SmPIETH0NMNEDbXFwwfoVQfhZp6fiXQLsXrG0w7LXhVUdt2vcCxuYXX5dPUBwQYNugqqO9Y2lGwf515SxFDwRQkwd4bvfL7zxdSNhVd7j6msgje22swSAdACEHLP8Xrb6l+KrCKZrkL3+VlASRZIp7DT2zE/TrAVwtua7MuXlv+ezRLyt7z7qnOjeuzWso1FgyfLkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIVGECcelctgwFL8XBZ0FDu/S5seRwLPHJUKdDWoipQxa5bNRZmgBmp2LpLj2Qp6b32AKKMzud99LGoPUVqAPJ1r5oUI86KErcERXOFsILYIvVR6lEBq+B5RTQFJ+DhuCKd5nuJ9m/5SF1jlwmhj2U9fEOhW8D8GJdQyNzoAj/YQEh/nP18BPO5FIC5Ia93btKNSDhwA2/UUdRsTrC66VD6pn3iZVnsMMLvfBhlrAi9kOi2rOYeI5517Ss0aPLC1ptIyTdSX4aZQKId/HqXkc5oTbtu7RxJSD0pHYd1u9+k1xUl9OXdhkdhMJoiX72YI0ieEsIBx8HQ6P1IwBJPPsR4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6c4292d7fd14fbba451c20565c51378"}, [
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
  'b6cd6336-7b88-43d9-b364-7b39359b6e42',
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
  'Tue, 16 Feb 2021 19:04:48 GMT',
  'Content-Length',
  '1392'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/bbd61b154d38441f85bfa8bfa18ce5e0","attributes":{"enabled":false,"nbf":1613501688,"exp":1645038288,"created":1613502288,"updated":1613502288,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502288,"updated":1613502288}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending"}}, [
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
  '5fbe0e77-e8b4-45cd-b4b4-d4e880ddab65',
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
  'Tue, 16 Feb 2021 19:04:48 GMT',
  'Content-Length',
  '1316'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmiwljDBgBHJozsUVU7LJq8e23lrERZo/6M3aY7Dq4L+NSOR0Wqv/oBjwBNQCSuxizeAQHffxRI9ozkBxj9j9wxmK/5WUg2ljDhL/ZGDSbtkK3BbhY6w9AzdUKBfrGHAID1OuDojpyb3WftM2SmPIETH0NMNEDbXFwwfoVQfhZp6fiXQLsXrG0w7LXhVUdt2vcCxuYXX5dPUBwQYNugqqO9Y2lGwf515SxFDwRQkwd4bvfL7zxdSNhVd7j6msgje22swSAdACEHLP8Xrb6l+KrCKZrkL3+VlASRZIp7DT2zE/TrAVwtua7MuXlv+ezRLyt7z7qnOjeuzWso1FgyfLkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIVGECcelctgwFL8XBZ0FDu/S5seRwLPHJUKdDWoipQxa5bNRZmgBmp2LpLj2Qp6b32AKKMzud99LGoPUVqAPJ1r5oUI86KErcERXOFsILYIvVR6lEBq+B5RTQFJ+DhuCKd5nuJ9m/5SF1jlwmhj2U9fEOhW8D8GJdQyNzoAj/YQEh/nP18BPO5FIC5Ia93btKNSDhwA2/UUdRsTrC66VD6pn3iZVnsMMLvfBhlrAi9kOi2rOYeI5517Ss0aPLC1ptIyTdSX4aZQKId/HqXkc5oTbtu7RxJSD0pHYd1u9+k1xUl9OXdhkdhMJoiX72YI0ieEsIBx8HQ6P1IwBJPPsR4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6c4292d7fd14fbba451c20565c51378"}, [
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
  'eda33e1a-a9ed-4ebb-a00e-b5e71c864c1c',
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
  'Tue, 16 Feb 2021 19:04:49 GMT',
  'Content-Length',
  '1392'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmiwljDBgBHJozsUVU7LJq8e23lrERZo/6M3aY7Dq4L+NSOR0Wqv/oBjwBNQCSuxizeAQHffxRI9ozkBxj9j9wxmK/5WUg2ljDhL/ZGDSbtkK3BbhY6w9AzdUKBfrGHAID1OuDojpyb3WftM2SmPIETH0NMNEDbXFwwfoVQfhZp6fiXQLsXrG0w7LXhVUdt2vcCxuYXX5dPUBwQYNugqqO9Y2lGwf515SxFDwRQkwd4bvfL7zxdSNhVd7j6msgje22swSAdACEHLP8Xrb6l+KrCKZrkL3+VlASRZIp7DT2zE/TrAVwtua7MuXlv+ezRLyt7z7qnOjeuzWso1FgyfLkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIVGECcelctgwFL8XBZ0FDu/S5seRwLPHJUKdDWoipQxa5bNRZmgBmp2LpLj2Qp6b32AKKMzud99LGoPUVqAPJ1r5oUI86KErcERXOFsILYIvVR6lEBq+B5RTQFJ+DhuCKd5nuJ9m/5SF1jlwmhj2U9fEOhW8D8GJdQyNzoAj/YQEh/nP18BPO5FIC5Ia93btKNSDhwA2/UUdRsTrC66VD6pn3iZVnsMMLvfBhlrAi9kOi2rOYeI5517Ss0aPLC1ptIyTdSX4aZQKId/HqXkc5oTbtu7RxJSD0pHYd1u9+k1xUl9OXdhkdhMJoiX72YI0ieEsIBx8HQ6P1IwBJPPsR4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6c4292d7fd14fbba451c20565c51378"}, [
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
  '99481d00-77ae-4e0c-839d-bf4f4a669755',
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
  'Tue, 16 Feb 2021 19:04:48 GMT',
  'Content-Length',
  '1392'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmiwljDBgBHJozsUVU7LJq8e23lrERZo/6M3aY7Dq4L+NSOR0Wqv/oBjwBNQCSuxizeAQHffxRI9ozkBxj9j9wxmK/5WUg2ljDhL/ZGDSbtkK3BbhY6w9AzdUKBfrGHAID1OuDojpyb3WftM2SmPIETH0NMNEDbXFwwfoVQfhZp6fiXQLsXrG0w7LXhVUdt2vcCxuYXX5dPUBwQYNugqqO9Y2lGwf515SxFDwRQkwd4bvfL7zxdSNhVd7j6msgje22swSAdACEHLP8Xrb6l+KrCKZrkL3+VlASRZIp7DT2zE/TrAVwtua7MuXlv+ezRLyt7z7qnOjeuzWso1FgyfLkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIVGECcelctgwFL8XBZ0FDu/S5seRwLPHJUKdDWoipQxa5bNRZmgBmp2LpLj2Qp6b32AKKMzud99LGoPUVqAPJ1r5oUI86KErcERXOFsILYIvVR6lEBq+B5RTQFJ+DhuCKd5nuJ9m/5SF1jlwmhj2U9fEOhW8D8GJdQyNzoAj/YQEh/nP18BPO5FIC5Ia93btKNSDhwA2/UUdRsTrC66VD6pn3iZVnsMMLvfBhlrAi9kOi2rOYeI5517Ss0aPLC1ptIyTdSX4aZQKId/HqXkc5oTbtu7RxJSD0pHYd1u9+k1xUl9OXdhkdhMJoiX72YI0ieEsIBx8HQ6P1IwBJPPsR4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6c4292d7fd14fbba451c20565c51378"}, [
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
  '44151cac-9fb5-4aab-9210-11a81690d0e0',
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
  'Tue, 16 Feb 2021 19:04:51 GMT',
  'Content-Length',
  '1392'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmiwljDBgBHJozsUVU7LJq8e23lrERZo/6M3aY7Dq4L+NSOR0Wqv/oBjwBNQCSuxizeAQHffxRI9ozkBxj9j9wxmK/5WUg2ljDhL/ZGDSbtkK3BbhY6w9AzdUKBfrGHAID1OuDojpyb3WftM2SmPIETH0NMNEDbXFwwfoVQfhZp6fiXQLsXrG0w7LXhVUdt2vcCxuYXX5dPUBwQYNugqqO9Y2lGwf515SxFDwRQkwd4bvfL7zxdSNhVd7j6msgje22swSAdACEHLP8Xrb6l+KrCKZrkL3+VlASRZIp7DT2zE/TrAVwtua7MuXlv+ezRLyt7z7qnOjeuzWso1FgyfLkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIVGECcelctgwFL8XBZ0FDu/S5seRwLPHJUKdDWoipQxa5bNRZmgBmp2LpLj2Qp6b32AKKMzud99LGoPUVqAPJ1r5oUI86KErcERXOFsILYIvVR6lEBq+B5RTQFJ+DhuCKd5nuJ9m/5SF1jlwmhj2U9fEOhW8D8GJdQyNzoAj/YQEh/nP18BPO5FIC5Ia93btKNSDhwA2/UUdRsTrC66VD6pn3iZVnsMMLvfBhlrAi9kOi2rOYeI5517Ss0aPLC1ptIyTdSX4aZQKId/HqXkc5oTbtu7RxJSD0pHYd1u9+k1xUl9OXdhkdhMJoiX72YI0ieEsIBx8HQ6P1IwBJPPsR4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6c4292d7fd14fbba451c20565c51378"}, [
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
  '405dfcbe-1508-46a3-8413-127c302ed19c',
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
  'Tue, 16 Feb 2021 19:04:52 GMT',
  'Content-Length',
  '1392'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmiwljDBgBHJozsUVU7LJq8e23lrERZo/6M3aY7Dq4L+NSOR0Wqv/oBjwBNQCSuxizeAQHffxRI9ozkBxj9j9wxmK/5WUg2ljDhL/ZGDSbtkK3BbhY6w9AzdUKBfrGHAID1OuDojpyb3WftM2SmPIETH0NMNEDbXFwwfoVQfhZp6fiXQLsXrG0w7LXhVUdt2vcCxuYXX5dPUBwQYNugqqO9Y2lGwf515SxFDwRQkwd4bvfL7zxdSNhVd7j6msgje22swSAdACEHLP8Xrb6l+KrCKZrkL3+VlASRZIp7DT2zE/TrAVwtua7MuXlv+ezRLyt7z7qnOjeuzWso1FgyfLkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIVGECcelctgwFL8XBZ0FDu/S5seRwLPHJUKdDWoipQxa5bNRZmgBmp2LpLj2Qp6b32AKKMzud99LGoPUVqAPJ1r5oUI86KErcERXOFsILYIvVR6lEBq+B5RTQFJ+DhuCKd5nuJ9m/5SF1jlwmhj2U9fEOhW8D8GJdQyNzoAj/YQEh/nP18BPO5FIC5Ia93btKNSDhwA2/UUdRsTrC66VD6pn3iZVnsMMLvfBhlrAi9kOi2rOYeI5517Ss0aPLC1ptIyTdSX4aZQKId/HqXkc5oTbtu7RxJSD0pHYd1u9+k1xUl9OXdhkdhMJoiX72YI0ieEsIBx8HQ6P1IwBJPPsR4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6c4292d7fd14fbba451c20565c51378"}, [
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
  'b9b6ba0d-2ac7-40cb-817d-db07fade4410',
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
  'Tue, 16 Feb 2021 19:04:54 GMT',
  'Content-Length',
  '1392'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmiwljDBgBHJozsUVU7LJq8e23lrERZo/6M3aY7Dq4L+NSOR0Wqv/oBjwBNQCSuxizeAQHffxRI9ozkBxj9j9wxmK/5WUg2ljDhL/ZGDSbtkK3BbhY6w9AzdUKBfrGHAID1OuDojpyb3WftM2SmPIETH0NMNEDbXFwwfoVQfhZp6fiXQLsXrG0w7LXhVUdt2vcCxuYXX5dPUBwQYNugqqO9Y2lGwf515SxFDwRQkwd4bvfL7zxdSNhVd7j6msgje22swSAdACEHLP8Xrb6l+KrCKZrkL3+VlASRZIp7DT2zE/TrAVwtua7MuXlv+ezRLyt7z7qnOjeuzWso1FgyfLkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIVGECcelctgwFL8XBZ0FDu/S5seRwLPHJUKdDWoipQxa5bNRZmgBmp2LpLj2Qp6b32AKKMzud99LGoPUVqAPJ1r5oUI86KErcERXOFsILYIvVR6lEBq+B5RTQFJ+DhuCKd5nuJ9m/5SF1jlwmhj2U9fEOhW8D8GJdQyNzoAj/YQEh/nP18BPO5FIC5Ia93btKNSDhwA2/UUdRsTrC66VD6pn3iZVnsMMLvfBhlrAi9kOi2rOYeI5517Ss0aPLC1ptIyTdSX4aZQKId/HqXkc5oTbtu7RxJSD0pHYd1u9+k1xUl9OXdhkdhMJoiX72YI0ieEsIBx8HQ6P1IwBJPPsR4=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-","request_id":"f6c4292d7fd14fbba451c20565c51378"}, [
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
  'e9f43e88-b9c1-4866-b881-08f40c567d24',
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
  'Tue, 16 Feb 2021 19:04:57 GMT',
  'Content-Length',
  '1411'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/23c1991b389e4482b42005e8049a2c34","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/23c1991b389e4482b42005e8049a2c34","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/23c1991b389e4482b42005e8049a2c34","x5t":"wdBeJy036kmOCmojHHQUOGRz168","cer":"MIIDKDCCAhCgAwIBAgIQRWDubsZaQA2LpIxTgjMktTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NDU2WhcNMjIwMjE2MTkwNDU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCaLCWMMGAEcmjOxRVTssmrx7beWsRFmj/ozdpjsOrgv41I5HRaq/+gGPAE1AJK7GLN4BAd9/FEj2jOQHGP2P3DGYr/lZSDaWMOEv9kYNJu2QrcFuFjrD0DN1QoF+sYcAgPU64OiOnJvdZ+0zZKY8gRMfQ0w0QNtcXDB+hVB+Fmnp+JdAuxesbTDsteFVR23a9wLG5hdfl09QHBBg26Cqo71jaUbB/nXlLEUPBFCTB3hu98vvPF1I2FV3uPqayCN7bazBIB0AIQcs/xetvqX4qsIpmuQvf5WUBJFkinsNPbMT9OsBXC25rsy5eW/57NEvK3vPuqc6N67NayjUWDJ8uRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTVznH422FSckA6+jXJ1fV5HUp2QDAdBgNVHQ4EFgQU1c5x+NthUnJAOvo1ydX1eR1KdkAwDQYJKoZIhvcNAQELBQADggEBAIR4Y9kq55uU96nmjXs8fqMfYrwC+AP4X3N3l8/w1lIt5FJt4S5NJo+3TWFNGrWh/bqOgaErJ+zehz1YcO1zwnkTreaKrjKBCJfk3PQnsEglqPEd9jpKh4joummuIAI0yRKTODit8I38UoUi9YfpO63fiqY8Qf6hJCWdBQ5S8ooWR+kVoZEFHSDVcN0S6jnaIvLPIcn3/6RhDBcxISMOp9jkxAydqpuq5E3HQu1Rin1U1A4WUgCY6VxrqyY87lkTCYSUJXhowcZbOAx5qjO1njdBYfmsi1Qe5CjeZ4vkI6n70LuJ3zakQ4NnvyfiXt/6LPniaKe76j3fz47qCHVUNzw=","attributes":{"enabled":true,"nbf":1613501696,"exp":1645038296,"created":1613502296,"updated":1613502296,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502288,"updated":1613502288}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending"}}, [
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
  'd5885220-d770-44a7-bffc-f208cf024e7c',
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
  'Tue, 16 Feb 2021 19:04:56 GMT',
  'Content-Length',
  '2859'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-","deletedDate":1613502297,"scheduledPurgeDate":1614107097,"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/23c1991b389e4482b42005e8049a2c34","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/23c1991b389e4482b42005e8049a2c34","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/23c1991b389e4482b42005e8049a2c34","x5t":"wdBeJy036kmOCmojHHQUOGRz168","cer":"MIIDKDCCAhCgAwIBAgIQRWDubsZaQA2LpIxTgjMktTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NDU2WhcNMjIwMjE2MTkwNDU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCaLCWMMGAEcmjOxRVTssmrx7beWsRFmj/ozdpjsOrgv41I5HRaq/+gGPAE1AJK7GLN4BAd9/FEj2jOQHGP2P3DGYr/lZSDaWMOEv9kYNJu2QrcFuFjrD0DN1QoF+sYcAgPU64OiOnJvdZ+0zZKY8gRMfQ0w0QNtcXDB+hVB+Fmnp+JdAuxesbTDsteFVR23a9wLG5hdfl09QHBBg26Cqo71jaUbB/nXlLEUPBFCTB3hu98vvPF1I2FV3uPqayCN7bazBIB0AIQcs/xetvqX4qsIpmuQvf5WUBJFkinsNPbMT9OsBXC25rsy5eW/57NEvK3vPuqc6N67NayjUWDJ8uRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTVznH422FSckA6+jXJ1fV5HUp2QDAdBgNVHQ4EFgQU1c5x+NthUnJAOvo1ydX1eR1KdkAwDQYJKoZIhvcNAQELBQADggEBAIR4Y9kq55uU96nmjXs8fqMfYrwC+AP4X3N3l8/w1lIt5FJt4S5NJo+3TWFNGrWh/bqOgaErJ+zehz1YcO1zwnkTreaKrjKBCJfk3PQnsEglqPEd9jpKh4joummuIAI0yRKTODit8I38UoUi9YfpO63fiqY8Qf6hJCWdBQ5S8ooWR+kVoZEFHSDVcN0S6jnaIvLPIcn3/6RhDBcxISMOp9jkxAydqpuq5E3HQu1Rin1U1A4WUgCY6VxrqyY87lkTCYSUJXhowcZbOAx5qjO1njdBYfmsi1Qe5CjeZ4vkI6n70LuJ3zakQ4NnvyfiXt/6LPniaKe76j3fz47qCHVUNzw=","attributes":{"enabled":true,"nbf":1613501696,"exp":1645038296,"created":1613502296,"updated":1613502296,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502288,"updated":1613502288}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending"}}, [
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
  '476d2b9e-e638-47c3-927f-5a0938bf56ef',
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
  'Tue, 16 Feb 2021 19:04:57 GMT',
  'Content-Length',
  '3111'
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
  '209',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '15adc645-94e2-4892-a7cd-33b983552183',
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
  'Tue, 16 Feb 2021 19:04:56 GMT'
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
  '209',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3effab1f-13bf-4b96-ac17-b84dcb6bc192',
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
  'Tue, 16 Feb 2021 19:04:57 GMT'
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
  '209',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'df774d04-1717-4ebe-8c06-0a558d8431b1',
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
  'Tue, 16 Feb 2021 19:04:58 GMT'
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
  '209',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f8456260-1642-4f4c-9791-1c7211ae3d44',
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
  'Tue, 16 Feb 2021 19:05:01 GMT'
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
  '209',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6769ddf4-a642-4a05-8597-42e923fefbd7',
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
  'Tue, 16 Feb 2021 19:05:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-","deletedDate":1613502297,"scheduledPurgeDate":1614107097,"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/23c1991b389e4482b42005e8049a2c34","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/23c1991b389e4482b42005e8049a2c34","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/23c1991b389e4482b42005e8049a2c34","x5t":"wdBeJy036kmOCmojHHQUOGRz168","cer":"MIIDKDCCAhCgAwIBAgIQRWDubsZaQA2LpIxTgjMktTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NDU2WhcNMjIwMjE2MTkwNDU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCaLCWMMGAEcmjOxRVTssmrx7beWsRFmj/ozdpjsOrgv41I5HRaq/+gGPAE1AJK7GLN4BAd9/FEj2jOQHGP2P3DGYr/lZSDaWMOEv9kYNJu2QrcFuFjrD0DN1QoF+sYcAgPU64OiOnJvdZ+0zZKY8gRMfQ0w0QNtcXDB+hVB+Fmnp+JdAuxesbTDsteFVR23a9wLG5hdfl09QHBBg26Cqo71jaUbB/nXlLEUPBFCTB3hu98vvPF1I2FV3uPqayCN7bazBIB0AIQcs/xetvqX4qsIpmuQvf5WUBJFkinsNPbMT9OsBXC25rsy5eW/57NEvK3vPuqc6N67NayjUWDJ8uRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTVznH422FSckA6+jXJ1fV5HUp2QDAdBgNVHQ4EFgQU1c5x+NthUnJAOvo1ydX1eR1KdkAwDQYJKoZIhvcNAQELBQADggEBAIR4Y9kq55uU96nmjXs8fqMfYrwC+AP4X3N3l8/w1lIt5FJt4S5NJo+3TWFNGrWh/bqOgaErJ+zehz1YcO1zwnkTreaKrjKBCJfk3PQnsEglqPEd9jpKh4joummuIAI0yRKTODit8I38UoUi9YfpO63fiqY8Qf6hJCWdBQ5S8ooWR+kVoZEFHSDVcN0S6jnaIvLPIcn3/6RhDBcxISMOp9jkxAydqpuq5E3HQu1Rin1U1A4WUgCY6VxrqyY87lkTCYSUJXhowcZbOAx5qjO1njdBYfmsi1Qe5CjeZ4vkI6n70LuJ3zakQ4NnvyfiXt/6LPniaKe76j3fz47qCHVUNzw=","attributes":{"enabled":true,"nbf":1613501696,"exp":1645038296,"created":1613502296,"updated":1613502296,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502288,"updated":1613502288}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending"}}, [
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
  'c750a4c6-3843-4623-aaf9-4c075badda6f',
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
  'Tue, 16 Feb 2021 19:05:05 GMT',
  'Content-Length',
  '3111'
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
  'westus2',
  'x-ms-request-id',
  '1aff84cc-5b75-4b80-adf3-656c2f946523',
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
  'Tue, 16 Feb 2021 19:05:06 GMT'
]);
