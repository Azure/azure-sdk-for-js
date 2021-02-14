let nock = require('nock');

module.exports.hash = "687c424a81d7038365e254ba266ae4d2";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160258385407003300","file":"file160258385437501972"},"newDate":{"now":"2020-10-13T10:10:53.291Z","tmr":"2020-10-13T10:10:53.291Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MzU1MywibmJmIjoxNjAyNTgzNTUzLCJleHAiOjE2MDI2NzAyNTMsImFpbyI6IkUyUmdZRWdNazF6Nm5uK2xFL3Q3L29JNERxZDVBQT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJKc1FSZnhSd2FVLTA2TDJKZmNnREFBIiwidmVyIjoiMS4wIn0.Mf-n_p25FbnRqcHkCPdQF9rq3qVYbGAvRuyRGYjdza17uw4W4IzWZasl-84_kQ9agn7KlkJtMjvb24aSn6sGC6u162XAEciP8uHe9vRWqFg2gKhYwUh-5AcV-CysklQ0ALoUDrlAR2EQnwoj7cnxYcm0_MXNeM20NW3St9_zDVQZ1-b9_WMDooB4oC_76TdrdOx3S4X7d_b4UnNUgsKJoXy7b-ihuLBDRxDZ5VkeWid-Vhn9YsUFXYFUhZrzD95ZMNMKH_OCZDQL5LiNY5ibXFQG9_q9lkiOCw6jLRN-vLjhcRTOnyQZUBsQn22ds-oNcmjkQFhjGsVwnIf0ZnS9Sw"}, [
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
  '7f11c426-7014-4f69-b4e8-bd897dc80300',
  'x-ms-ests-server',
  '2.1.11154.7 - EASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aht9afRjrH9Jnwk9UB5l-Gx00ISJAQAAACx0F9cOAAAA; expires=Thu, 12-Nov-2020 10:10:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 10:10:52 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T09:10:53Z</Start><Expiry>2020-10-18T10:10:53Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-13T09:10:53Z</SignedStart><SignedExpiry>2020-10-18T10:10:53Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>2waOdPZTIZCTFt5ZaOy2Qs1xXb53dUPUQARkNSNimfI=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5699000a-d01e-0067-3049-a15d5c000000',
  'x-ms-client-request-id',
  '9091f8b8-a3cb-41cd-bebe-763a25a6899e',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258385407003300')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:10:54 GMT',
  'ETag',
  '"0x8D86F6045409284"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56990038-d01e-0067-4d49-a15d5c000000',
  'x-ms-client-request-id',
  '2e5135c6-036b-4f6e-a89d-9e2df0da3d5a',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:54 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258385407003300/file160258385437501972')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 10:10:54 GMT',
  'ETag',
  '"0x8D86F6045711464"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0d86af9d-401f-0017-1949-a1e4ab000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '852db7ca-c7dd-4b98-9896-db56d9566985',
  'Date',
  'Tue, 13 Oct 2020 10:10:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160258385407003300/file160258385437501972')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '0',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:10:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D86F6045711464"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5699006d-d01e-0067-7349-a15d5c000000',
  'x-ms-client-request-id',
  'df6ef126-8bc4-4018-aa2c-032402314afa',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Tue, 13 Oct 2020 10:10:54 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Tue, 13 Oct 2020 10:10:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160258385407003300')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569900a9-d01e-0067-2149-a15d5c000000',
  'x-ms-client-request-id',
  'fb509560-eb5d-4bc7-94cb-edc14130bf51',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:55 GMT'
]);
