let nock = require('nock');

module.exports.hash = "51b87575a1e39e6a79f06ed69efc3cef";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canabortcreatingacertificate-/create')
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
  '71c2f226-b5e0-4df1-99df-c6b08c8ad29a',
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
  'Tue, 16 Feb 2021 18:56:54 GMT'
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
  'f1040ff4-2c98-408b-84da-6da18e9bf500',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDBAAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:56:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:56:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canabortcreatingacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApOfaQZfyRd7sAvN86L8PJHLPXebyGrs9X20eox2cCLlB01/PQxs3KKBxIrzPlg/1axnQuAugq4buyO04Coj09RCL6UgPSs9qwRrdUmjC2re8y6lCIqeteNyAQyS+7JdxFQve568bAEt+fHU4s5dD974xk2nhMxpAv289fCQIub8xBQIjVotas/PrMV52RyVdu/o8U+WT65SFrT9EymzLHkujFLgGheji5iVhy4/zOBhbbI2XxgXY67UcMGSFJAqrqBEQeqzpqlFasRktD2XjEAMThGqiaPs6ChAVxekqU9SBzN4KhVEOJcCI7/NegfTAds741LdVrFZPKf7wj+Ot1QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAADxkUp1+oQvH36SJpPLqrkD7+KwU73Bf3bFkIDPBzzJmEMoyegWsgN31Qr0fvNvRH6tEzaXZKgB97igYIa6XXtYuT+NYw4egjRtLn+HgsNnVcUaCX2ssQTedXUaQihYpeaFRPl+9LwEmhOlxWQklwxTOqvnFBXkGNSYKMTJzltiGXCmALr+utokMsP1BZDfC3tajFAFcj/P7j2BdX6r1kYArbYfh+/J+HaPhPtPmSunZTzx8qvIsBzlVgRw2xjpvqGv0ZDIUb5C+cDpPGDy9Uji2RndGObRJy0pAfv7l8JzsvaFvH3tRuze4i5JiuZI/5X0ZfK2BEyCvhx3aLeLQRQ=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"377b2be49f264a3a8b6336653c3582f1"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-/pending?api-version=7.2&request_id=377b2be49f264a3a8b6336653c3582f1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5598424e-130c-4288-b0be-215910b6705e',
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
  'Tue, 16 Feb 2021 18:56:55 GMT',
  'Content-Length',
  '1332'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canabortcreatingacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApOfaQZfyRd7sAvN86L8PJHLPXebyGrs9X20eox2cCLlB01/PQxs3KKBxIrzPlg/1axnQuAugq4buyO04Coj09RCL6UgPSs9qwRrdUmjC2re8y6lCIqeteNyAQyS+7JdxFQve568bAEt+fHU4s5dD974xk2nhMxpAv289fCQIub8xBQIjVotas/PrMV52RyVdu/o8U+WT65SFrT9EymzLHkujFLgGheji5iVhy4/zOBhbbI2XxgXY67UcMGSFJAqrqBEQeqzpqlFasRktD2XjEAMThGqiaPs6ChAVxekqU9SBzN4KhVEOJcCI7/NegfTAds741LdVrFZPKf7wj+Ot1QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAADxkUp1+oQvH36SJpPLqrkD7+KwU73Bf3bFkIDPBzzJmEMoyegWsgN31Qr0fvNvRH6tEzaXZKgB97igYIa6XXtYuT+NYw4egjRtLn+HgsNnVcUaCX2ssQTedXUaQihYpeaFRPl+9LwEmhOlxWQklwxTOqvnFBXkGNSYKMTJzltiGXCmALr+utokMsP1BZDfC3tajFAFcj/P7j2BdX6r1kYArbYfh+/J+HaPhPtPmSunZTzx8qvIsBzlVgRw2xjpvqGv0ZDIUb5C+cDpPGDy9Uji2RndGObRJy0pAfv7l8JzsvaFvH3tRuze4i5JiuZI/5X0ZfK2BEyCvhx3aLeLQRQ=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"377b2be49f264a3a8b6336653c3582f1"}, [
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
  '59f666d4-4af8-42a0-9b5a-98a072459725',
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
  'Tue, 16 Feb 2021 18:56:55 GMT',
  'Content-Length',
  '1332'
]);
