let nock = require('nock');

module.exports.hash = "7fcf470916453b6a219308154ca44bec";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165568989711809873","filesystem165568989711809873":"filesystem165568989711809873165568989854501957","file":"file165568989888907242","dir":"dir165568990112108380"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165568989711809873')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 20 Jun 2022 01:51:38 GMT',
  'ETag',
  '"0x8DA525F6A62D579"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '65388b57-201e-0001-7c48-84a9fd000000',
  'x-ms-client-request-id',
  '88e49a70-8138-4473-bd4c-a4b748964d20',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 20 Jun 2022 01:51:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165568989711809873165568989854501957')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 20 Jun 2022 01:51:39 GMT',
  'ETag',
  '"0x8DA525F6A9A3480"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '65388b6c-201e-0001-0c48-84a9fd000000',
  'x-ms-client-request-id',
  'c4517577-ec44-40d2-8844-2321ae6d4a07',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 20 Jun 2022 01:51:38 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165568989711809873165568989854501957/file165568989888907242')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 20 Jun 2022 01:51:41 GMT',
  'ETag',
  '"0x8DA525F6BF436A0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  'b26a1a57-d01f-0048-6248-84eb16000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '20c47685-ae47-41c3-974a-5910c6641ded',
  'Date',
  'Mon, 20 Jun 2022 01:51:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165568989711809873165568989854501957/dir165568990112108380')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 20 Jun 2022 01:51:41 GMT',
  'ETag',
  '"0x8DA525F6C25404B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  'b26a1a58-d01f-0048-6348-84eb16000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  'b60b4f12-3579-4b68-9f1f-1409a537a264',
  'Date',
  'Mon, 20 Jun 2022 01:51:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem165568989711809873165568989854501957')
  .query(true)
  .reply(200, {"paths":[{"EncryptionScope":"test1","contentLength":"0","creationTime":"133001635016097867","etag":"0x8DA525F6C25404B","expiryTime":"0","group":"$superuser","lastModified":"Mon, 20 Jun 2022 01:51:41 GMT","name":"dir165568990112108380","owner":"$superuser","permissions":"rw-r-----"},{"EncryptionScope":"test1","contentLength":"0","creationTime":"133001635012884128","etag":"0x8DA525F6BF436A0","expiryTime":"0","group":"$superuser","lastModified":"Mon, 20 Jun 2022 01:51:41 GMT","name":"file165568989888907242","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b26a1a5b-d01f-0048-6448-84eb16000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '9a60eb8d-8413-43b2-a74e-7fe1052b0663',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 20 Jun 2022 01:51:41 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165568989711809873165568989854501957/file165568989888907242')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  'b26a1a5c-d01f-0048-6548-84eb16000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  'fa53a716-90b8-432b-81e1-e94d78c4bb31',
  'Date',
  'Mon, 20 Jun 2022 01:51:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165568989711809873165568989854501957/dir165568990112108380')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'true',
  'x-ms-request-id',
  'b26a1a5d-d01f-0048-6648-84eb16000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '2f5de24a-0d60-4f28-ab2e-33cf28a04715',
  'Date',
  'Mon, 20 Jun 2022 01:51:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165568989711809873')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '65388d26-201e-0001-1b48-84a9fd000000',
  'x-ms-client-request-id',
  'bab4b305-e58a-4c7c-823b-ee1bcd6332b5',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 20 Jun 2022 01:51:43 GMT'
]);
