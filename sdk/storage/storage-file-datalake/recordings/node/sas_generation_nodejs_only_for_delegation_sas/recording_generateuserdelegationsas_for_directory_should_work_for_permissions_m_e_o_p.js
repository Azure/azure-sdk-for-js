let nock = require('nock');

module.exports.hash = "eed9fe71278951b4c6b8383c48d8a938";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160258385782703329","directory":"directory160258385813401905","file":"file160258385843006421"},"newDate":{"now":"2020-10-13T10:10:57.185Z","tmr":"2020-10-13T10:10:57.185Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MzU1NywibmJmIjoxNjAyNTgzNTU3LCJleHAiOjE2MDI2NzAyNTcsImFpbyI6IkUyUmdZUEJkN0diOHJuTWRiOHZoZXY0ZEJlYzJBd0E9IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJSWjVVZFJ3V1QwZXVzZzk4SFVNREFBIiwidmVyIjoiMS4wIn0.KKUhhdPaPR8KJFkusilUU9Jn6FA9RT6jJyN5eF_JHyHDhjZA5L3FHH0fOqZEqu9JiPeYPE2yfWvBUVU_PH2eDpYNxA9fHNtoJKQo0KSFoIgwpW4IMm2Xynxm0ROK1lkNRRrb17GHLg0trL1z1GEZZqSrv0yKMJDore9g7DZm6FaISPQVQ6mhPDpeh2sdorJ3-HUts4RLZVUUe5PR0sOZMDYxmzpmFw3hqPCkHM7zUvEOLeh42VhTAEMkNANnQCyfc_fwDbZ2f86-ntBLV7J6Uk1k3iEqhhLml_YPFh8psnUrHUqCEceFY4TXCJH2UQuIBOv1VBTWZj4QrdH2gj59HA"}, [
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
  '75549e45-161c-474f-aeb2-0f7c1d430300',
  'x-ms-ests-server',
  '2.1.11154.7 - EASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhDSHg2ZqhJAhGzU-t5hr7l00ISJAQAAADF0F9cOAAAA; expires=Thu, 12-Nov-2020 10:10:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 10:10:56 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T09:10:57Z</Start><Expiry>2020-10-18T10:10:57Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-13T09:10:57Z</SignedStart><SignedExpiry>2020-10-18T10:10:57Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>kD4QZ+PK6y0ereX8TL+G8B4hFMAjoRjRgh+RB3V+RdM=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56990172-d01e-0067-3e49-a15d5c000000',
  'x-ms-client-request-id',
  'e94368f8-38c0-46b7-8a82-abb1f0e4f9d2',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258385782703329')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:10:57 GMT',
  'ETag',
  '"0x8D86F60477DF2C6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56990182-d01e-0067-4c49-a15d5c000000',
  'x-ms-client-request-id',
  '7396c100-76b8-40e1-8b73-1702b39ff556',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:10:57 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258385782703329/directory160258385813401905')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 10:10:58 GMT',
  'ETag',
  '"0x8D86F6047AC9DD9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0d86afa0-401f-0017-1b49-a1e4ab000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'df0f6488-3cf0-46a9-aa5d-1b2cacac9ff4',
  'Date',
  'Tue, 13 Oct 2020 10:10:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160258385782703329/directory160258385813401905/file160258385843006421')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 10:10:58 GMT',
  'ETag',
  '"0x8D86F6047DE499F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0d86afa2-401f-0017-1d49-a1e4ab000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '45bfd425-ce36-419c-856c-4a7ec4e93a26',
  'Date',
  'Tue, 13 Oct 2020 10:10:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160258385782703329/directory160258385813401905')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 10:10:58 GMT',
  'ETag',
  '"0x8D86F6047AC9DD9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '1ce13278-a083-4d15-8796-de39717793e1',
  'x-ms-group',
  '1ce13278-a083-4d15-8796-de39717793e1',
  'x-ms-permissions',
  'rwxr-x---',
  'x-ms-acl',
  'user::rwx,group::r-x,other::---',
  'x-ms-request-id',
  '0d86afa3-401f-0017-1e49-a1e4ab000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '1915fa9e-4143-41b1-8d2d-c88dc9075e89',
  'Date',
  'Tue, 13 Oct 2020 10:10:58 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160258385782703329/directory160258385813401905')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 10:10:58 GMT',
  'ETag',
  '"0x8D86F6047AC9DD9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'd3b7a0c1-801f-0018-4d49-a192c7000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '2fa749aa-04a1-4d7f-a0b5-b1c10d35b37b',
  'Date',
  'Tue, 13 Oct 2020 10:11:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160258385782703329')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569902a8-d01e-0067-2b49-a15d5c000000',
  'x-ms-client-request-id',
  '43d431cf-52a8-40b6-9004-1080f3b944f5',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:11:01 GMT'
]);
