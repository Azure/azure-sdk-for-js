let nock = require('nock');

module.exports.hash = "58513e0c39f37daceede07e04a9062d7";

module.exports.testInfo = {"uniqueName":{"container":"container158459900517006636","blob":"blob158459900541003605"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900517006636')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:25 GMT',
  'ETag',
  '"0x8D7CBCE07EC9D40"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e45b1-b01e-0088-58b6-fd3fcb000000',
  'x-ms-client-request-id',
  '733d2bdc-1c46-4c6b-ad25-f1bab95a4d28',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900517006636/blob158459900541003605', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:25 GMT',
  'ETag',
  '"0x8D7CBCE08131040"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4604-b01e-0088-1bb6-fd3fcb000000',
  'x-ms-client-request-id',
  '9f2600f8-24c8-4777-add7-c4d4cd828891',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:25.5393109Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900517006636/blob158459900541003605')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:25 GMT',
  'ETag',
  '"0x8D7CBCE0838EEA8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4655-b01e-0088-57b6-fd3fcb000000',
  'x-ms-client-request-id',
  '4a619f85-b558-43fe-9b50-9e19f35c80dc',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:25.7884877Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459900517006636/blob158459900541003605')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:25 GMT',
  'ETag',
  '"0x8D7CBCE0838EEA8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e46a6-b01e-0088-1cb6-fd3fcb000000',
  'x-ms-client-request-id',
  '94b6e56b-1a4e-4534-8e00-0853c2edb25e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:26.0416662Z',
  'x-ms-snapshot',
  '2020-03-19T06:23:26.0406662Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 19 Mar 2020 06:23:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459900517006636/blob158459900541003605')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4731-b01e-0088-7ab6-fd3fcb000000',
  'x-ms-client-request-id',
  '2dd68f98-6cc4-42e3-bd25-5c2aa3a24021',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 19 Mar 2020 06:23:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459900517006636/blob158459900541003605')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4777-b01e-0088-36b6-fd3fcb000000',
  'x-ms-client-request-id',
  '414f3441-c5c8-423f-9969-321199850025',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459900517006636/blob158459900541003605')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:25 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CBCE0838EEA8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e47cc-b01e-0088-7bb6-fd3fcb000000',
  'x-ms-client-request-id',
  'eb986bff-0e1e-488c-9dd3-022426430a14',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T06:23:26.0416662Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 19 Mar 2020 06:23:25 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459900517006636')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e4835-b01e-0088-55b6-fd3fcb000000',
  'x-ms-client-request-id',
  'c48eb5cb-477d-4c21-9e81-6eeee53c9525',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:26 GMT'
]);
