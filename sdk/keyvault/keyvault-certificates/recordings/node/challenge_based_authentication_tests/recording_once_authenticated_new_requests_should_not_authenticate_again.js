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
  '811b7a76-067f-41a6-bcb4-3d9064444c9d',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:16 GMT'
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
  '9fd2b44e-a85e-4b52-961a-4f81d9161400',
  'x-ms-ests-server',
  '2.1.11397.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ArzjfLH2e9ZFonr5X3aWAl4vZXiDAgAAADMlk9cOAAAA; expires=Sun, 14-Feb-2021 05:55:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 05:55:16 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+pJWSQHrf8TWekYg1w3cYOV+6ceXoB72wmmG3P0A12SqbS0WaVEeSKeUAHTG0PDECFPQvEokXVgC8p5AJo20hd+OTtUfbAbzzY8JkWz/5Je9NoAd3kgijkruSR/djmnfa4uBTfNayQ5iw2tXY6ZMJE8edFnOGgjMkNbAAZOtpfRlqHcrtSjyKhOw7TCIGliQ9SIt7djyo096Ik/LgDqjf5Q+faYvar4Zzs+lKp0z00ghymTpYx+4o8TISNEvlioa0/8M7Qzo+D9lwHCrqy+K4OAYwUSlPksHkXp1iGNPvOTQrABl4mW8SHnK7cgVXmy0AM0odwo4t1vBBzWS64SHQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAMKovs5oD2YyMZRO/mnohZC2So5ao2pFBDF5tHlKDInBlS06v+4XX5zv02NAvCT1KQ/O4A4PzIKFiuFac3sZm6VjUKlIm65dEP/PjxPh6NW9GwrG1RA1KlUr5EOhLZWalTl8BXx4FqFPHIGTNT3AZdmOnMt3DfNRVFQzZt6fGPdBfcb3JbuW3GeWak/N5JV0pIYrwNOD7ZhTTgQlC9y6sFcNjQ8ADjx7cDrpQayIArX5Txr66hv/du5nNlb8t43oFGc4mwmx7ON3qUaVX6lAdtV0DYsP2qAu+NskzuFFwfrzL3cfWgOdQPGzgS/eIvGD/aBKOxJKIkU7yxtAWF5YKYI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"dcd0906d60ec45208d7d8ef9c5913b4c"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending?api-version=7.1&request_id=dcd0906d60ec45208d7d8ef9c5913b4c',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1a520dbe-a123-4839-8433-174080fd1012',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:17 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+pJWSQHrf8TWekYg1w3cYOV+6ceXoB72wmmG3P0A12SqbS0WaVEeSKeUAHTG0PDECFPQvEokXVgC8p5AJo20hd+OTtUfbAbzzY8JkWz/5Je9NoAd3kgijkruSR/djmnfa4uBTfNayQ5iw2tXY6ZMJE8edFnOGgjMkNbAAZOtpfRlqHcrtSjyKhOw7TCIGliQ9SIt7djyo096Ik/LgDqjf5Q+faYvar4Zzs+lKp0z00ghymTpYx+4o8TISNEvlioa0/8M7Qzo+D9lwHCrqy+K4OAYwUSlPksHkXp1iGNPvOTQrABl4mW8SHnK7cgVXmy0AM0odwo4t1vBBzWS64SHQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAMKovs5oD2YyMZRO/mnohZC2So5ao2pFBDF5tHlKDInBlS06v+4XX5zv02NAvCT1KQ/O4A4PzIKFiuFac3sZm6VjUKlIm65dEP/PjxPh6NW9GwrG1RA1KlUr5EOhLZWalTl8BXx4FqFPHIGTNT3AZdmOnMt3DfNRVFQzZt6fGPdBfcb3JbuW3GeWak/N5JV0pIYrwNOD7ZhTTgQlC9y6sFcNjQ8ADjx7cDrpQayIArX5Txr66hv/du5nNlb8t43oFGc4mwmx7ON3qUaVX6lAdtV0DYsP2qAu+NskzuFFwfrzL3cfWgOdQPGzgS/eIvGD/aBKOxJKIkU7yxtAWF5YKYI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"dcd0906d60ec45208d7d8ef9c5913b4c"}, [
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
  'c2387452-8273-4474-9afb-e9bff0322870',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:18 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+pJWSQHrf8TWekYg1w3cYOV+6ceXoB72wmmG3P0A12SqbS0WaVEeSKeUAHTG0PDECFPQvEokXVgC8p5AJo20hd+OTtUfbAbzzY8JkWz/5Je9NoAd3kgijkruSR/djmnfa4uBTfNayQ5iw2tXY6ZMJE8edFnOGgjMkNbAAZOtpfRlqHcrtSjyKhOw7TCIGliQ9SIt7djyo096Ik/LgDqjf5Q+faYvar4Zzs+lKp0z00ghymTpYx+4o8TISNEvlioa0/8M7Qzo+D9lwHCrqy+K4OAYwUSlPksHkXp1iGNPvOTQrABl4mW8SHnK7cgVXmy0AM0odwo4t1vBBzWS64SHQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAMKovs5oD2YyMZRO/mnohZC2So5ao2pFBDF5tHlKDInBlS06v+4XX5zv02NAvCT1KQ/O4A4PzIKFiuFac3sZm6VjUKlIm65dEP/PjxPh6NW9GwrG1RA1KlUr5EOhLZWalTl8BXx4FqFPHIGTNT3AZdmOnMt3DfNRVFQzZt6fGPdBfcb3JbuW3GeWak/N5JV0pIYrwNOD7ZhTTgQlC9y6sFcNjQ8ADjx7cDrpQayIArX5Txr66hv/du5nNlb8t43oFGc4mwmx7ON3qUaVX6lAdtV0DYsP2qAu+NskzuFFwfrzL3cfWgOdQPGzgS/eIvGD/aBKOxJKIkU7yxtAWF5YKYI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"dcd0906d60ec45208d7d8ef9c5913b4c"}, [
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
  'b84c7321-134d-4f4b-99b2-9a6e9984b74e',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:18 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+pJWSQHrf8TWekYg1w3cYOV+6ceXoB72wmmG3P0A12SqbS0WaVEeSKeUAHTG0PDECFPQvEokXVgC8p5AJo20hd+OTtUfbAbzzY8JkWz/5Je9NoAd3kgijkruSR/djmnfa4uBTfNayQ5iw2tXY6ZMJE8edFnOGgjMkNbAAZOtpfRlqHcrtSjyKhOw7TCIGliQ9SIt7djyo096Ik/LgDqjf5Q+faYvar4Zzs+lKp0z00ghymTpYx+4o8TISNEvlioa0/8M7Qzo+D9lwHCrqy+K4OAYwUSlPksHkXp1iGNPvOTQrABl4mW8SHnK7cgVXmy0AM0odwo4t1vBBzWS64SHQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAMKovs5oD2YyMZRO/mnohZC2So5ao2pFBDF5tHlKDInBlS06v+4XX5zv02NAvCT1KQ/O4A4PzIKFiuFac3sZm6VjUKlIm65dEP/PjxPh6NW9GwrG1RA1KlUr5EOhLZWalTl8BXx4FqFPHIGTNT3AZdmOnMt3DfNRVFQzZt6fGPdBfcb3JbuW3GeWak/N5JV0pIYrwNOD7ZhTTgQlC9y6sFcNjQ8ADjx7cDrpQayIArX5Txr66hv/du5nNlb8t43oFGc4mwmx7ON3qUaVX6lAdtV0DYsP2qAu+NskzuFFwfrzL3cfWgOdQPGzgS/eIvGD/aBKOxJKIkU7yxtAWF5YKYI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","request_id":"dcd0906d60ec45208d7d8ef9c5913b4c"}, [
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
  '115b58fa-4135-4d2c-bc24-9841b4b1a91e',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:20 GMT',
  'Content-Length',
  '1387'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/83322364eae3456bb2c646010a4a8e4e","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/83322364eae3456bb2c646010a4a8e4e","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/83322364eae3456bb2c646010a4a8e4e","x5t":"SIxfXBluFnnDkuqpwReD1_mpE6g","cer":"MIIDKDCCAhCgAwIBAgIQWXTDDTNWQzq9oUp1k1kE3zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTE1MDU0NTIwWhcNMjIwMTE1MDU1NTIwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDn6klZJAet/xNZ6RiDXDdxg5X7px5egHvbCaYbc/QDXZKptLRZpUR5Ip5QAdMbQ8MQIU9C8SiRdWALynkAmjbSF345O1R9sBvPNjwmRbP/kl702gB3eSCKOSu5JH92Oad9ri4FN81rJDmLDa1djpkwkTx50Wc4aCMyQ1sABk62l9GWodyu1KPIqE7DtMIgaWJD1Ii3t2PKjT3oiT8uAOqN/lD59pi9qvhnOz6UqnTPTSCHKZOljH7ijxMhI0S+WKhrT/wztDOj4P2XAcKurL4rg4BjBRKU+SweRenWIY0+85NCsAGXiZbxIecrtyBVebLQAzSh3Cji3W8EHNZLrhIdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQvTRcbjouVhlvzjpi2qnl8z0pKjzAdBgNVHQ4EFgQUL00XG46LlYZb846Ytqp5fM9KSo8wDQYJKoZIhvcNAQELBQADggEBADSxiEXSswC5xHyuSVXFZTp8NIlFNwxPkDOEuGvWWrKJwg2JrFxLHWyF5e1YyG+ACFl71lIQ9tVf/xg3zTLN2N6RuAI55GI9EOIuiUmsdmwxQQC3cQu0Jxd7vQpICFJIweanrdogXBwK/nxVyYrLGrJE50EW1otZd3koB1n2BJsa58mJ3UCzF9eqfofSTGiDoU76c8jRLcunKRF+aTDKAeDQHHMDS6jJNmgANdbfanwHd9PSwK+4LcYsg0nFRZhFmhTo9wGP0WX6QZE/RfskJzqjyMIy/dO6o5QNFtBQcJhbNCyfFPkMStLz9B3MU5DstkMkka/13yvkXeGsRZFf5R4=","attributes":{"enabled":true,"nbf":1610689520,"exp":1642226120,"created":1610690120,"updated":1610690120,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610690117,"updated":1610690117}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  '1cf97c31-81cb-4b4a-bc9b-23d3bf214abf',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:20 GMT',
  'Content-Length',
  '2790'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzo8zLExOcJ1uuxmtl3GneGoY4gej5R2OSYSTMBJPS5PJ2LreGCz+2rAlJtZ1eUz94KDesce+LbFNtkg1+lHXH037CGpRM4iWk4seE/IJESIxGSt/g+UK+topOL16xz1E01Fk7pK2dzGZzZAGj64FVtNqlbqqNrgucFSQ7C+Z+rftnxDGXVB9CTNCblJo6uQfXnCoA14Ug0ubi/LTMxlAVGICubZ9xsBFc6Rb12jPiryb7BQG/MTn2EUcIFSeVReyd6u+4qQRssfrK1wBwl+7qIOkAYgrWcX/cKLPKB0O7OJHFdCOsDb9d6OEpqE+uMAqRjoimoldhQ30EjJC5gc0xQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHBhCMM/rt+l8XRsB0JLwiJRLNPA9vpNGiIKUoado5NQr1n0Cbbl4byVEC3N31Psl8lBjqhgW5FzauXPiNxV0qZGdYNXbt0R7FOMMaWVFGw7HYuXh57ENuEy+uT2KiPf0pYx53d9Rm1+t+HT5n+bTJQ0Sy28Jh/wXm8+HNisQmt+HoOwdmQpnnjYY4mtrMzPBiZWzYPckXYlo9nL2cp3eOQ18RZKYd0LOHEqqsuVx5UHiD3k835Vf7SvEFMrH35SR+7DXFh+pk2DCQiN9k6d37RoQBZkWD4BCTVBpoMHzwSVVNf0PtK11XU52U/9lxKG2/aSxRKUC9qGX2UsE9WNEUM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9089dd297f8d4f8b8af1ae9d99c929a8"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending?api-version=7.1&request_id=9089dd297f8d4f8b8af1ae9d99c929a8',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7acb0bbb-faec-4849-9656-1043681dbcce',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:24 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzo8zLExOcJ1uuxmtl3GneGoY4gej5R2OSYSTMBJPS5PJ2LreGCz+2rAlJtZ1eUz94KDesce+LbFNtkg1+lHXH037CGpRM4iWk4seE/IJESIxGSt/g+UK+topOL16xz1E01Fk7pK2dzGZzZAGj64FVtNqlbqqNrgucFSQ7C+Z+rftnxDGXVB9CTNCblJo6uQfXnCoA14Ug0ubi/LTMxlAVGICubZ9xsBFc6Rb12jPiryb7BQG/MTn2EUcIFSeVReyd6u+4qQRssfrK1wBwl+7qIOkAYgrWcX/cKLPKB0O7OJHFdCOsDb9d6OEpqE+uMAqRjoimoldhQ30EjJC5gc0xQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHBhCMM/rt+l8XRsB0JLwiJRLNPA9vpNGiIKUoado5NQr1n0Cbbl4byVEC3N31Psl8lBjqhgW5FzauXPiNxV0qZGdYNXbt0R7FOMMaWVFGw7HYuXh57ENuEy+uT2KiPf0pYx53d9Rm1+t+HT5n+bTJQ0Sy28Jh/wXm8+HNisQmt+HoOwdmQpnnjYY4mtrMzPBiZWzYPckXYlo9nL2cp3eOQ18RZKYd0LOHEqqsuVx5UHiD3k835Vf7SvEFMrH35SR+7DXFh+pk2DCQiN9k6d37RoQBZkWD4BCTVBpoMHzwSVVNf0PtK11XU52U/9lxKG2/aSxRKUC9qGX2UsE9WNEUM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9089dd297f8d4f8b8af1ae9d99c929a8"}, [
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
  'fa55857f-67d9-4692-bd40-b75624408bc4',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:24 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzo8zLExOcJ1uuxmtl3GneGoY4gej5R2OSYSTMBJPS5PJ2LreGCz+2rAlJtZ1eUz94KDesce+LbFNtkg1+lHXH037CGpRM4iWk4seE/IJESIxGSt/g+UK+topOL16xz1E01Fk7pK2dzGZzZAGj64FVtNqlbqqNrgucFSQ7C+Z+rftnxDGXVB9CTNCblJo6uQfXnCoA14Ug0ubi/LTMxlAVGICubZ9xsBFc6Rb12jPiryb7BQG/MTn2EUcIFSeVReyd6u+4qQRssfrK1wBwl+7qIOkAYgrWcX/cKLPKB0O7OJHFdCOsDb9d6OEpqE+uMAqRjoimoldhQ30EjJC5gc0xQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHBhCMM/rt+l8XRsB0JLwiJRLNPA9vpNGiIKUoado5NQr1n0Cbbl4byVEC3N31Psl8lBjqhgW5FzauXPiNxV0qZGdYNXbt0R7FOMMaWVFGw7HYuXh57ENuEy+uT2KiPf0pYx53d9Rm1+t+HT5n+bTJQ0Sy28Jh/wXm8+HNisQmt+HoOwdmQpnnjYY4mtrMzPBiZWzYPckXYlo9nL2cp3eOQ18RZKYd0LOHEqqsuVx5UHiD3k835Vf7SvEFMrH35SR+7DXFh+pk2DCQiN9k6d37RoQBZkWD4BCTVBpoMHzwSVVNf0PtK11XU52U/9lxKG2/aSxRKUC9qGX2UsE9WNEUM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9089dd297f8d4f8b8af1ae9d99c929a8"}, [
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
  '1be5a6d6-e1af-4ee1-ac07-8738307c7e26',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:24 GMT',
  'Content-Length',
  '1380'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzo8zLExOcJ1uuxmtl3GneGoY4gej5R2OSYSTMBJPS5PJ2LreGCz+2rAlJtZ1eUz94KDesce+LbFNtkg1+lHXH037CGpRM4iWk4seE/IJESIxGSt/g+UK+topOL16xz1E01Fk7pK2dzGZzZAGj64FVtNqlbqqNrgucFSQ7C+Z+rftnxDGXVB9CTNCblJo6uQfXnCoA14Ug0ubi/LTMxlAVGICubZ9xsBFc6Rb12jPiryb7BQG/MTn2EUcIFSeVReyd6u+4qQRssfrK1wBwl+7qIOkAYgrWcX/cKLPKB0O7OJHFdCOsDb9d6OEpqE+uMAqRjoimoldhQ30EjJC5gc0xQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHBhCMM/rt+l8XRsB0JLwiJRLNPA9vpNGiIKUoado5NQr1n0Cbbl4byVEC3N31Psl8lBjqhgW5FzauXPiNxV0qZGdYNXbt0R7FOMMaWVFGw7HYuXh57ENuEy+uT2KiPf0pYx53d9Rm1+t+HT5n+bTJQ0Sy28Jh/wXm8+HNisQmt+HoOwdmQpnnjYY4mtrMzPBiZWzYPckXYlo9nL2cp3eOQ18RZKYd0LOHEqqsuVx5UHiD3k835Vf7SvEFMrH35SR+7DXFh+pk2DCQiN9k6d37RoQBZkWD4BCTVBpoMHzwSVVNf0PtK11XU52U/9lxKG2/aSxRKUC9qGX2UsE9WNEUM=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","request_id":"9089dd297f8d4f8b8af1ae9d99c929a8"}, [
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
  '3636f48f-30ca-4487-b44b-6ddcf9969b5c',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:26 GMT',
  'Content-Length',
  '1387'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/fcf31fbfc1bb43258a2aa396de333165","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/fcf31fbfc1bb43258a2aa396de333165","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/fcf31fbfc1bb43258a2aa396de333165","x5t":"wOZ7s3TwaU29hK4pMQK_1zdOpzk","cer":"MIIDKDCCAhCgAwIBAgIQKtCKER3iTJWnWPPRtjzZDzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTE1MDU0NTI1WhcNMjIwMTE1MDU1NTI1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDOjzMsTE5wnW67Ga2Xcad4ahjiB6PlHY5JhJMwEk9Lk8nYut4YLP7asCUm1nV5TP3goN6xx74tsU22SDX6UdcfTfsIalEziJaTix4T8gkRIjEZK3+D5Qr62ik4vXrHPUTTUWTukrZ3MZnNkAaPrgVW02qVuqo2uC5wVJDsL5n6t+2fEMZdUH0JM0JuUmjq5B9ecKgDXhSDS5uL8tMzGUBUYgK5tn3GwEVzpFvXaM+KvJvsFAb8xOfYRRwgVJ5VF7J3q77ipBGyx+srXAHCX7uog6QBiCtZxf9wos8oHQ7s4kcV0I6wNv13o4SmoT64wCpGOiKaiV2FDfQSMkLmBzTFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQNITSOGKjK7APAypkzeNKRKJ5gWTAdBgNVHQ4EFgQUDSE0jhioyuwDwMqZM3jSkSieYFkwDQYJKoZIhvcNAQELBQADggEBAKfsBVaC4FtVrKqiLe15TcMBl4VYZsZY9GhcZoucPtFTQIU+dfFf3jqyNiwZto0FCyXmmb+Kg8T4dIoRIm+owJFvehPiAcEA043+I79yBWRgOcSNZCMvc6mITtAf3M24NaJavw5VtwMsw9zKrY5tlv8SY5DuHLWzk0asUBA4j4wLK5E9fHmuNlDiuzDQWG7OXayu8tou4Cx/kkrjsT6UHh6s5n/UtU/4xAkK+u0cU5WKGgIaSR1mFPn3AT1nj3pPFHFeOMLovjM6MLyyf92uwA7tPasMuDPSoQjJ21WcYt3APvrRZD3xxqrjtHLGlrgzU7AFIvwruPKZWpU7MIwM0Xk=","attributes":{"enabled":true,"nbf":1610689525,"exp":1642226125,"created":1610690125,"updated":1610690125,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610690122,"updated":1610690122}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  '76526257-40cb-483e-ac68-061b465d5df8',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:27 GMT',
  'Content-Length',
  '2790'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1610690128,"scheduledPurgeDate":1618466128,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/83322364eae3456bb2c646010a4a8e4e","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/83322364eae3456bb2c646010a4a8e4e","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/83322364eae3456bb2c646010a4a8e4e","x5t":"SIxfXBluFnnDkuqpwReD1_mpE6g","cer":"MIIDKDCCAhCgAwIBAgIQWXTDDTNWQzq9oUp1k1kE3zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTE1MDU0NTIwWhcNMjIwMTE1MDU1NTIwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDn6klZJAet/xNZ6RiDXDdxg5X7px5egHvbCaYbc/QDXZKptLRZpUR5Ip5QAdMbQ8MQIU9C8SiRdWALynkAmjbSF345O1R9sBvPNjwmRbP/kl702gB3eSCKOSu5JH92Oad9ri4FN81rJDmLDa1djpkwkTx50Wc4aCMyQ1sABk62l9GWodyu1KPIqE7DtMIgaWJD1Ii3t2PKjT3oiT8uAOqN/lD59pi9qvhnOz6UqnTPTSCHKZOljH7ijxMhI0S+WKhrT/wztDOj4P2XAcKurL4rg4BjBRKU+SweRenWIY0+85NCsAGXiZbxIecrtyBVebLQAzSh3Cji3W8EHNZLrhIdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQvTRcbjouVhlvzjpi2qnl8z0pKjzAdBgNVHQ4EFgQUL00XG46LlYZb846Ytqp5fM9KSo8wDQYJKoZIhvcNAQELBQADggEBADSxiEXSswC5xHyuSVXFZTp8NIlFNwxPkDOEuGvWWrKJwg2JrFxLHWyF5e1YyG+ACFl71lIQ9tVf/xg3zTLN2N6RuAI55GI9EOIuiUmsdmwxQQC3cQu0Jxd7vQpICFJIweanrdogXBwK/nxVyYrLGrJE50EW1otZd3koB1n2BJsa58mJ3UCzF9eqfofSTGiDoU76c8jRLcunKRF+aTDKAeDQHHMDS6jJNmgANdbfanwHd9PSwK+4LcYsg0nFRZhFmhTo9wGP0WX6QZE/RfskJzqjyMIy/dO6o5QNFtBQcJhbNCyfFPkMStLz9B3MU5DstkMkka/13yvkXeGsRZFf5R4=","attributes":{"enabled":true,"nbf":1610689520,"exp":1642226120,"created":1610690120,"updated":1610690120,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610690117,"updated":1610690117}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  '244b664b-955a-4bbe-bdf7-7f33be912b18',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:29 GMT',
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
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd44549ec-5701-48ae-bf6e-ab52e8415d70',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:28 GMT'
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
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fcce4d66-5d3f-45d3-b15b-0dbf78fa9d67',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1610690128,"scheduledPurgeDate":1618466128,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/83322364eae3456bb2c646010a4a8e4e","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/83322364eae3456bb2c646010a4a8e4e","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/83322364eae3456bb2c646010a4a8e4e","x5t":"SIxfXBluFnnDkuqpwReD1_mpE6g","cer":"MIIDKDCCAhCgAwIBAgIQWXTDDTNWQzq9oUp1k1kE3zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTE1MDU0NTIwWhcNMjIwMTE1MDU1NTIwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDn6klZJAet/xNZ6RiDXDdxg5X7px5egHvbCaYbc/QDXZKptLRZpUR5Ip5QAdMbQ8MQIU9C8SiRdWALynkAmjbSF345O1R9sBvPNjwmRbP/kl702gB3eSCKOSu5JH92Oad9ri4FN81rJDmLDa1djpkwkTx50Wc4aCMyQ1sABk62l9GWodyu1KPIqE7DtMIgaWJD1Ii3t2PKjT3oiT8uAOqN/lD59pi9qvhnOz6UqnTPTSCHKZOljH7ijxMhI0S+WKhrT/wztDOj4P2XAcKurL4rg4BjBRKU+SweRenWIY0+85NCsAGXiZbxIecrtyBVebLQAzSh3Cji3W8EHNZLrhIdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQvTRcbjouVhlvzjpi2qnl8z0pKjzAdBgNVHQ4EFgQUL00XG46LlYZb846Ytqp5fM9KSo8wDQYJKoZIhvcNAQELBQADggEBADSxiEXSswC5xHyuSVXFZTp8NIlFNwxPkDOEuGvWWrKJwg2JrFxLHWyF5e1YyG+ACFl71lIQ9tVf/xg3zTLN2N6RuAI55GI9EOIuiUmsdmwxQQC3cQu0Jxd7vQpICFJIweanrdogXBwK/nxVyYrLGrJE50EW1otZd3koB1n2BJsa58mJ3UCzF9eqfofSTGiDoU76c8jRLcunKRF+aTDKAeDQHHMDS6jJNmgANdbfanwHd9PSwK+4LcYsg0nFRZhFmhTo9wGP0WX6QZE/RfskJzqjyMIy/dO6o5QNFtBQcJhbNCyfFPkMStLz9B3MU5DstkMkka/13yvkXeGsRZFf5R4=","attributes":{"enabled":true,"nbf":1610689520,"exp":1642226120,"created":1610690120,"updated":1610690120,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610690117,"updated":1610690117}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  '91ae8bce-9207-4d04-871f-d0912b0e1561',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:32 GMT',
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
  '5a36e6d0-b1ca-453a-a04b-e41e2f6c52ca',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1610690133,"scheduledPurgeDate":1618466133,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/fcf31fbfc1bb43258a2aa396de333165","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/fcf31fbfc1bb43258a2aa396de333165","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/fcf31fbfc1bb43258a2aa396de333165","x5t":"wOZ7s3TwaU29hK4pMQK_1zdOpzk","cer":"MIIDKDCCAhCgAwIBAgIQKtCKER3iTJWnWPPRtjzZDzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTE1MDU0NTI1WhcNMjIwMTE1MDU1NTI1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDOjzMsTE5wnW67Ga2Xcad4ahjiB6PlHY5JhJMwEk9Lk8nYut4YLP7asCUm1nV5TP3goN6xx74tsU22SDX6UdcfTfsIalEziJaTix4T8gkRIjEZK3+D5Qr62ik4vXrHPUTTUWTukrZ3MZnNkAaPrgVW02qVuqo2uC5wVJDsL5n6t+2fEMZdUH0JM0JuUmjq5B9ecKgDXhSDS5uL8tMzGUBUYgK5tn3GwEVzpFvXaM+KvJvsFAb8xOfYRRwgVJ5VF7J3q77ipBGyx+srXAHCX7uog6QBiCtZxf9wos8oHQ7s4kcV0I6wNv13o4SmoT64wCpGOiKaiV2FDfQSMkLmBzTFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQNITSOGKjK7APAypkzeNKRKJ5gWTAdBgNVHQ4EFgQUDSE0jhioyuwDwMqZM3jSkSieYFkwDQYJKoZIhvcNAQELBQADggEBAKfsBVaC4FtVrKqiLe15TcMBl4VYZsZY9GhcZoucPtFTQIU+dfFf3jqyNiwZto0FCyXmmb+Kg8T4dIoRIm+owJFvehPiAcEA043+I79yBWRgOcSNZCMvc6mITtAf3M24NaJavw5VtwMsw9zKrY5tlv8SY5DuHLWzk0asUBA4j4wLK5E9fHmuNlDiuzDQWG7OXayu8tou4Cx/kkrjsT6UHh6s5n/UtU/4xAkK+u0cU5WKGgIaSR1mFPn3AT1nj3pPFHFeOMLovjM6MLyyf92uwA7tPasMuDPSoQjJ21WcYt3APvrRZD3xxqrjtHLGlrgzU7AFIvwruPKZWpU7MIwM0Xk=","attributes":{"enabled":true,"nbf":1610689525,"exp":1642226125,"created":1610690125,"updated":1610690125,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610690122,"updated":1610690122}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  'c16e7570-9212-46f6-8556-2084adf583a7',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:33 GMT',
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
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b1ffb462-707e-4089-9275-f314fbae4254',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:33 GMT'
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
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9726d44a-957f-4fd0-827b-62965e50ed33',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:34 GMT'
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
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '47bedb43-eead-49dc-98fa-db7eb27a9ac6',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1610690133,"scheduledPurgeDate":1618466133,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/fcf31fbfc1bb43258a2aa396de333165","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/fcf31fbfc1bb43258a2aa396de333165","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/fcf31fbfc1bb43258a2aa396de333165","x5t":"wOZ7s3TwaU29hK4pMQK_1zdOpzk","cer":"MIIDKDCCAhCgAwIBAgIQKtCKER3iTJWnWPPRtjzZDzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTE1MDU0NTI1WhcNMjIwMTE1MDU1NTI1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDOjzMsTE5wnW67Ga2Xcad4ahjiB6PlHY5JhJMwEk9Lk8nYut4YLP7asCUm1nV5TP3goN6xx74tsU22SDX6UdcfTfsIalEziJaTix4T8gkRIjEZK3+D5Qr62ik4vXrHPUTTUWTukrZ3MZnNkAaPrgVW02qVuqo2uC5wVJDsL5n6t+2fEMZdUH0JM0JuUmjq5B9ecKgDXhSDS5uL8tMzGUBUYgK5tn3GwEVzpFvXaM+KvJvsFAb8xOfYRRwgVJ5VF7J3q77ipBGyx+srXAHCX7uog6QBiCtZxf9wos8oHQ7s4kcV0I6wNv13o4SmoT64wCpGOiKaiV2FDfQSMkLmBzTFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQNITSOGKjK7APAypkzeNKRKJ5gWTAdBgNVHQ4EFgQUDSE0jhioyuwDwMqZM3jSkSieYFkwDQYJKoZIhvcNAQELBQADggEBAKfsBVaC4FtVrKqiLe15TcMBl4VYZsZY9GhcZoucPtFTQIU+dfFf3jqyNiwZto0FCyXmmb+Kg8T4dIoRIm+owJFvehPiAcEA043+I79yBWRgOcSNZCMvc6mITtAf3M24NaJavw5VtwMsw9zKrY5tlv8SY5DuHLWzk0asUBA4j4wLK5E9fHmuNlDiuzDQWG7OXayu8tou4Cx/kkrjsT6UHh6s5n/UtU/4xAkK+u0cU5WKGgIaSR1mFPn3AT1nj3pPFHFeOMLovjM6MLyyf92uwA7tPasMuDPSoQjJ21WcYt3APvrRZD3xxqrjtHLGlrgzU7AFIvwruPKZWpU7MIwM0Xk=","attributes":{"enabled":true,"nbf":1610689525,"exp":1642226125,"created":1610690125,"updated":1610690125,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610690122,"updated":1610690122}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  '08412c68-c92b-4584-b97a-b08110558876',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:38 GMT',
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
  'ec701db7-cd1b-4f92-b168-2ec669a24625',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:40 GMT'
]);
