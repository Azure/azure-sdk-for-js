let nock = require('nock');

module.exports.hash = "8832f9e1f781613f81c74cfc66bb23bc";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165568990335804403","filesystem165568990335804403":"filesystem165568990335804403165568990366508700","file":"file165568990397609806","dir":"dir165568990428805431"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165568990335804403')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 20 Jun 2022 01:51:43 GMT',
  'ETag',
  '"0x8DA525F6D76B119"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '65388dbe-201e-0001-2648-84a9fd000000',
  'x-ms-client-request-id',
  'ac0f3dc6-e885-49ca-87d7-0143bb0677f1',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 20 Jun 2022 01:51:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165568990335804403165568990366508700')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 20 Jun 2022 01:51:44 GMT',
  'ETag',
  '"0x8DA525F6DA6218B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '65388de2-201e-0001-4348-84a9fd000000',
  'x-ms-client-request-id',
  'f136f146-db83-4432-9609-bd159827b421',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 20 Jun 2022 01:51:43 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165568990335804403165568990366508700/file165568990397609806')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 20 Jun 2022 01:51:44 GMT',
  'ETag',
  '"0x8DA525F6DD780CB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  'b26a1a5e-d01f-0048-6748-84eb16000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '633b3806-9e65-4e1a-bdb2-fe03d5c92681',
  'Date',
  'Mon, 20 Jun 2022 01:51:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165568990335804403165568990366508700/dir165568990428805431')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 20 Jun 2022 01:51:44 GMT',
  'ETag',
  '"0x8DA525F6E055286"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  'b26a1a5f-d01f-0048-6848-84eb16000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  'ed7f324f-19f4-4336-be9b-7334e1f3a5e1',
  'Date',
  'Mon, 20 Jun 2022 01:51:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem165568990335804403165568990366508700')
  .query(true)
  .reply(200, {"paths":[{"EncryptionScope":"test1","contentLength":"0","creationTime":"133001635047559814","etag":"0x8DA525F6E055286","expiryTime":"0","group":"$superuser","lastModified":"Mon, 20 Jun 2022 01:51:44 GMT","name":"dir165568990428805431","owner":"$superuser","permissions":"rw-r-----"},{"EncryptionScope":"test1","contentLength":"0","creationTime":"133001635044557003","etag":"0x8DA525F6DD780CB","expiryTime":"0","group":"$superuser","lastModified":"Mon, 20 Jun 2022 01:51:44 GMT","name":"file165568990397609806","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b26a1a60-d01f-0048-6948-84eb16000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '8663354a-e053-4e6d-8594-9740157ac18a',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 20 Jun 2022 01:51:44 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165568990335804403165568990366508700/file165568990397609806')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  'b26a1a61-d01f-0048-6a48-84eb16000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  'a6b14e2a-2fd3-405e-b8cd-7b9d960797bd',
  'Date',
  'Mon, 20 Jun 2022 01:51:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165568990335804403165568990366508700/dir165568990428805431')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  'b26a1a62-d01f-0048-6b48-84eb16000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '7f503164-ff93-4e0e-9734-a368d741d16f',
  'Date',
  'Mon, 20 Jun 2022 01:51:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165568990335804403')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '65388e6a-201e-0001-3348-84a9fd000000',
  'x-ms-client-request-id',
  '58a27388-02d1-40ed-abcd-543a63324da7',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 20 Jun 2022 01:51:45 GMT'
]);
