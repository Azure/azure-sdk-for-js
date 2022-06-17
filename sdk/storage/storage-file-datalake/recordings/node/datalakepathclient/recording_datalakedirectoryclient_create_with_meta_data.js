let nock = require('nock');

module.exports.hash = "60673109fa143ee9895a1994b7f79195";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165383027161604124","file":"file165383027189402210","testdir":"testdir165383027270700933"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383027161604124')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:52 GMT',
  'ETag',
  '"0x8DA4175A29B1C48"',
  'x-ms-request-id',
  '84b4a7f2-a01e-0003-595e-731608000000',
  'x-ms-client-request-id',
  '8eff772a-123b-42e9-8be0-103b2b534d99',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:51 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383027161604124/file165383027189402210')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:52 GMT',
  'ETag',
  '"0x8DA4175A2C990B9"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6f7-201f-0006-115e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'bcce9351-e210-45a0-8f23-39a4049f1bd4',
  'Date',
  'Sun, 29 May 2022 13:17:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383027161604124/file165383027189402210', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6f8-201f-0006-125e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '9e1121e0-3303-4bd8-9947-fa120a24c0c9',
  'Date',
  'Sun, 29 May 2022 13:17:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165383027161604124/file165383027189402210')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:52 GMT',
  'ETag',
  '"0x8DA4175A31B03DA"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '34a0c6f9-201f-0006-135e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '27c4e8c0-e0a8-4fc5-b041-fb39759d392b',
  'Date',
  'Sun, 29 May 2022 13:17:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165383027161604124/testdir165383027270700933')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 29 May 2022 13:17:53 GMT',
  'ETag',
  '"0x8DA4175A341E8EA"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '34a0c6fa-201f-0006-145e-7303a9000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '8211c6df-9c59-4919-8e2b-64ea4043c5db',
  'Date',
  'Sun, 29 May 2022 13:17:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165383027161604124/testdir165383027270700933')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 29 May 2022 13:17:53 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA4175A341E8EA"',
  'x-ms-request-id',
  '84b4a7f4-a01e-0003-5a5e-731608000000',
  'x-ms-client-request-id',
  'b375e7fd-4e80-49ce-b322-3519f3648e43',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Sun, 29 May 2022 13:17:53 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x---',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-a,x-ms-meta-b,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 29 May 2022 13:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165383027161604124')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '84b4a7f5-a01e-0003-5b5e-731608000000',
  'x-ms-client-request-id',
  'e74eb3a9-ed7e-4968-a49a-da60625a38a0',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Sun, 29 May 2022 13:17:52 GMT'
]);
