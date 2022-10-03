let nock = require('nock');

module.exports.hash = "66adaceb231b274d32766add9cd22d95";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164856847239109499","file":"file164856847417403554"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164856847239109499')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 29 Mar 2022 15:41:14 GMT',
  'ETag',
  '"0x8DA119A8EA816B0"',
  'x-ms-request-id',
  '07e84a81-601e-0004-6683-430ec4000000',
  'x-ms-client-request-id',
  '8e3f08b0-c358-4fc1-a33d-96a983e97200',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 29 Mar 2022 15:41:14 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164856847239109499/file164856847417403554')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 29 Mar 2022 15:41:15 GMT',
  'ETag',
  '"0x8DA119A8F941E07"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f129cd6-a01f-0003-2d83-431608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '5ea8a540-6059-4a3d-bf85-59d60706d4f0',
  'Date',
  'Tue, 29 Mar 2022 15:41:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164856847239109499/file164856847417403554', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f129cd7-a01f-0003-2e83-431608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '3a4d698b-09b8-4dd0-b9fb-4a41249789a1',
  'Date',
  'Tue, 29 Mar 2022 15:41:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164856847239109499/file164856847417403554')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 29 Mar 2022 15:41:16 GMT',
  'ETag',
  '"0x8DA119A8FE6E8C3"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f129cd8-a01f-0003-2f83-431608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'd2598064-f0d4-4635-b068-8c36ef7034c3',
  'Date',
  'Tue, 29 Mar 2022 15:41:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem164856847239109499/file164856847417403554')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 29 Mar 2022 15:41:16 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA119A8FE6E8C3"',
  'x-ms-request-id',
  '07e84a85-601e-0004-6783-430ec4000000',
  'x-ms-client-request-id',
  '34cac0b1-2eb7-4235-be64-02c7d685342d',
  'x-ms-version',
  '2021-04-10',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 29 Mar 2022 15:41:15 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 29 Mar 2022 15:41:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164856847239109499')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '07e84a86-601e-0004-6883-430ec4000000',
  'x-ms-client-request-id',
  '1745c3f7-d0cf-402e-b635-4bda7f460a0a',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 29 Mar 2022 15:41:16 GMT'
]);
