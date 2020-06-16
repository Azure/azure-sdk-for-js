let nock = require('nock');

module.exports.hash = "de1ed5242bebc0c085f969ddc1486386";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159299254439403398","file":"file159299254594100472"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159299254439403398')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:45 GMT',
  'ETag',
  '"0x8D81824C3C7C8D7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e038c9-a01e-0007-490d-4a49ca000000',
  'x-ms-client-request-id',
  'd5ee2979-c506-412f-93ae-75c0e7cf0024',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 24 Jun 2020 09:55:45 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159299254439403398/file159299254594100472')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:47 GMT',
  'ETag',
  '"0x8D81824C4B7A0DF"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f8e55b5-501f-0003-690d-4ac4cd000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '8ede6eeb-edc0-416e-a9c9-c7460d70a766',
  'Date',
  'Wed, 24 Jun 2020 09:55:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159299254439403398/file159299254594100472', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6f8e55bb-501f-0003-6f0d-4ac4cd000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '9c370921-6e24-4587-93bb-9fe701baa41e',
  'Date',
  'Wed, 24 Jun 2020 09:55:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159299254439403398/file159299254594100472')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:48 GMT',
  'ETag',
  '"0x8D81824C5576AFC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '6f8e55c3-501f-0003-700d-4ac4cd000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '7d6cab88-2231-487b-b040-b512fa3c0e7c',
  'Date',
  'Wed, 24 Jun 2020 09:55:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159299254439403398/file159299254594100472')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 09:55:48 GMT',
  'ETag',
  '"0x8D81824C5576AFC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e039d8-a01e-0007-1f0d-4a49ca000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'a9331e1b-818a-41c7-b8cb-1f2e6355e02e',
  'Date',
  'Wed, 24 Jun 2020 09:55:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem159299254439403398/file159299254594100472')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e03a3a-a01e-0007-6f0d-4a49ca000000',
  'x-ms-client-request-id',
  'bd867b0d-504a-4d8f-bac4-6acf493f478a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 24 Jun 2020 09:55:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159299254439403398')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e03a5e-a01e-0007-0b0d-4a49ca000000',
  'x-ms-client-request-id',
  'f953a6a0-8863-4f31-823c-4cd1328dfa90',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 24 Jun 2020 09:55:50 GMT'
]);
