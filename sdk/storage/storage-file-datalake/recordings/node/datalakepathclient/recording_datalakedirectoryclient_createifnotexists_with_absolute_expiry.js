let nock = require('nock');

module.exports.hash = "2c9f312e242b78ea9cf4bcc82496cf4b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383029521508391","file":"file165383029548308086","testdir":"testdir165383029629201827"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383029521508391')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:18:15 GMT',
  'ETag',
  '"0x8DA4175B0AA9D3A"',
  'x-ms-request-id',
  '84b4a827-a01e-0003-7d5e-731608000000',
  'x-ms-client-request-id',
  'd7629f1d-708b-4b73-8c94-4bbc6945ecc6',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:14 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383029521508391/file165383029548308086')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:16 GMT',
  'ETag',
  '"0x8DA4175B0D67F84"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6de-a01f-0003-0e5e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'ff6d0ece-1926-4877-8b98-8ee38d74b96a',
  'Date',
  'Sun, 29 May 2022 13:18:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383029521508391/file165383029548308086', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd91df6df-a01f-0003-0f5e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '15604fe4-acad-4a26-b48e-a50f8606c497',
  'Date',
  'Sun, 29 May 2022 13:18:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383029521508391/file165383029548308086')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:18:16 GMT',
  'ETag',
  '"0x8DA4175B1299911"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd91df6e0-a01f-0003-105e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'fc98bfcb-0892-4055-b679-d571b93a8e90',
  'Date',
  'Sun, 29 May 2022 13:18:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383029521508391/testdir165383029629201827')
  .query(true)
  .reply(400, {"error":{"code":"ExpiryNotSupportedForDirectory","message":"Set Expiry is not supported for a directory\nRequestId:d91df6e1-a01f-0003-115e-731608000000\nTime:2022-05-29T13:18:16.8057798Z"}}, [
  'Content-Length',
  '190',
  'Content-Type',
  'application/json;charset=utf-8',
  'x-ms-error-code',
  'ExpiryNotSupportedForDirectory',
  'x-ms-request-id',
  'd91df6e1-a01f-0003-115e-731608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '90f7e087-6e4f-413a-a168-2fa7e928dea8',
  'Date',
  'Sun, 29 May 2022 13:18:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383029521508391')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a829-a01e-0003-7e5e-731608000000',
  'x-ms-client-request-id',
  '2e4ed0c6-39fb-420a-adde-950e96d372e4',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:18:17 GMT'
]);
