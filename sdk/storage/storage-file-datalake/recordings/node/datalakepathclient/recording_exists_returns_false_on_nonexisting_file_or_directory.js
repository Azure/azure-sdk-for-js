let nock = require('nock');

module.exports.hash = "6c802beb498c53d2993fd44c05d6a315";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158377020885200167","file":"file158377020889304312","newFile":"newFile158377020897300190","newDirectory":"newDirectory158377020899406140"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158377020885200167')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Mar 2020 16:10:08 GMT',
  'ETag',
  '"0x8D7C44456C27308"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8991cae-001e-0069-1e2d-f61a32000000',
  'x-ms-client-request-id',
  'f5bf2905-9d51-44da-a29a-240e61f7c444',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 09 Mar 2020 16:10:08 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158377020885200167/file158377020889304312')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 09 Mar 2020 16:10:08 GMT',
  'ETag',
  '"0x8D7C44456CA0779"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c2e47249-601f-001f-022d-f69e8e000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'd511b704-ec90-486d-b8db-6005f03273d0',
  'Date',
  'Mon, 09 Mar 2020 16:10:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158377020885200167/file158377020889304312', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'c2e4724a-601f-001f-032d-f69e8e000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'ebb6eac9-0fff-4785-9418-08c0c0d980bf',
  'Date',
  'Mon, 09 Mar 2020 16:10:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem158377020885200167/file158377020889304312')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 09 Mar 2020 16:10:08 GMT',
  'ETag',
  '"0x8D7C44456D0A86D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'c2e4724b-601f-001f-042d-f69e8e000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  '3c01cbc0-011a-40c2-a855-64a1749276f0',
  'Date',
  'Mon, 09 Mar 2020 16:10:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem158377020885200167/newFile158377020897300190')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8991d35-001e-0069-172d-f61a32000000',
  'x-ms-client-request-id',
  '3b791065-38dd-43bd-ae34-6fd222bb03f5',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 09 Mar 2020 16:10:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem158377020885200167/newDirectory158377020899406140')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8991d4b-001e-0069-2d2d-f61a32000000',
  'x-ms-client-request-id',
  'bb078a5b-82b1-4c9a-a51f-fd64a8c637c9',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 09 Mar 2020 16:10:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158377020885200167')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8991db7-001e-0069-112d-f61a32000000',
  'x-ms-client-request-id',
  '54d566f6-bf46-4dff-ab02-cd6d7ac4fb3f',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 09 Mar 2020 16:10:08 GMT'
]);
