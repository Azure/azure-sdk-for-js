let nock = require('nock');

module.exports.hash = "0b07d2158d3dc30decd63a5cbc3f0ed9";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160258385595609680","file":"file160258385626203856"},"newDate":{"now":"2020-10-13T10:10:55.326Z","tmr":"2020-10-13T10:10:55.326Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MzU1NSwibmJmIjoxNjAyNTgzNTU1LCJleHAiOjE2MDI2NzAyNTUsImFpbyI6IkUyUmdZRkE4V05yT1VMYlEyeUZBcE50OFV2TUdBQT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJGck8yYnZ5c3hVU1BXbWZRY25rREFBIiwidmVyIjoiMS4wIn0.Tx36X6NwoFjZMqjIdFNK5Y2TRJqmw4I-L9816l7YYFLjbgNjPrdkcJL97sxJrERXdH1i3fneP1aRxhoMNRdnfRUgYchwrHyXFM4JdyPlVUE4Bn4Taq4lCYgvTZo5pdlTHA5GissywyP-eyRvzOf5FwZNC_9PBJVB_RhAosZetN21Ch_AfgPYoNdlIdgL6xZGyMrh1o1jYs1CgSpqE6KCAcBCd8ZUyosO1z79U0ctpvhOyEQ5CIRkrhpQS0UVeKTaBC4bQmIp3nBQEhQl34Y_vrP1vP_ShocVoVznrtgJC8pP9u7FZ1oLgxvijmV0LOygNlzEtbDmYu3HYFocjwkULg"}, [
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
  '6eb6b316-acfc-44c5-8f5a-67d072790300',
  'x-ms-ests-server',
  '2.1.11154.7 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AiKQAsqtSzdKtMXyfbEpJ6B00ISJAQAAAC50F9cOAAAA; expires=Thu, 12-Nov-2020 10:10:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 10:10:55 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T09:10:55Z</Start><Expiry>2020-10-18T10:10:55Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-13T09:10:55Z</SignedStart><SignedExpiry>2020-10-18T10:10:55Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>pLlSbJStBZMOkPZ7HpOMmVyngquX+M2fLEU7AEc+4Q0=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569900e9-d01e-0067-5149-a15d5c000000',
  'x-ms-client-request-id',
  '3fea65c5-151d-4cd5-9814-f3de7da42bad',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258385595609680')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:10:56 GMT',
  'ETag',
  '"0x8D86F6046608F02"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56990107-d01e-0067-6849-a15d5c000000',
  'x-ms-client-request-id',
  '5ed65d59-5b9c-4a91-99e6-89288284ee6f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:56 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258385595609680/file160258385626203856')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 10:10:56 GMT',
  'ETag',
  '"0x8D86F60468F4D9E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0d86af9e-401f-0017-1a49-a1e4ab000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '78d54d6c-4876-4aff-a099-587e87a0b276',
  'Date',
  'Tue, 13 Oct 2020 10:10:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160258385595609680/file160258385626203856')
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
  'Tue, 13 Oct 2020 10:10:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D86F60468F4D9E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56990127-d01e-0067-0149-a15d5c000000',
  'x-ms-client-request-id',
  '41337885-2db8-465a-a9a1-43b8463fcf1c',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Tue, 13 Oct 2020 10:10:56 GMT',
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
  'Tue, 13 Oct 2020 10:10:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160258385595609680')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5699013e-d01e-0067-1549-a15d5c000000',
  'x-ms-client-request-id',
  '129ec0d2-35bc-4159-abfa-650dc7e6169b',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:57 GMT'
]);
