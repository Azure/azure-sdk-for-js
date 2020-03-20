let nock = require('nock');

module.exports.hash = "ee99fdab9f827965e4e47d0a2601ab44";

module.exports.testInfo = {"uniqueName":{"container":"container158472280465409921","blob":"blob158472280609502441"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158472280465409921')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Mar 2020 16:46:45 GMT',
  'ETag',
  '"0x8D7CCEE46E331F1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1a967b8-101e-0017-01d7-fe73c9000000',
  'x-ms-client-request-id',
  'f721189a-d6ef-4df6-9fe6-2b21a1307c52',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 20 Mar 2020 16:46:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158472280465409921/blob158472280609502441', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 20 Mar 2020 16:46:46 GMT',
  'ETag',
  '"0x8D7CCEE472896F8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1a96a28-101e-0017-52d7-fe73c9000000',
  'x-ms-client-request-id',
  '8a4c75f1-19dc-47f3-8381-f222ddb3abe0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-20T16:46:46.4339704Z',
  'Date',
  'Fri, 20 Mar 2020 16:46:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158472280465409921/blob158472280609502441')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 20 Mar 2020 16:46:47 GMT',
  'ETag',
  '"0x8D7CCEE4784352E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1a96d02-101e-0017-15d7-fe73c9000000',
  'x-ms-client-request-id',
  'd71eaff1-7630-4231-bbe0-b454c62a09e9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-20T16:46:47.0363987Z',
  'Date',
  'Fri, 20 Mar 2020 16:46:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158472280465409921/blob158472280609502441')
  .query(true)
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 20 Mar 2020 16:46:46 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CCEE472896F8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1a96ff6-101e-0017-6bd7-fe73c9000000',
  'x-ms-client-request-id',
  'c6eaa16f-2569-42f8-9e9d-3f5a9d988993',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-20T16:46:46.4339704Z',
  'x-ms-creation-time',
  'Fri, 20 Mar 2020 16:46:46 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 20 Mar 2020 16:46:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158472280465409921/blob158472280609502441')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 20 Mar 2020 16:46:47 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CCEE4784352E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1a971c9-101e-0017-2cd7-fe73c9000000',
  'x-ms-client-request-id',
  'd90e48e3-ddab-434e-b534-8221de450a60',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-20T16:46:47.0363987Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Fri, 20 Mar 2020 16:46:47 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 20 Mar 2020 16:46:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158472280465409921/blob158472280609502441')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 20 Mar 2020 16:46:46 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CCEE472896F8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1a9736b-101e-0017-34d7-fe73c9000000',
  'x-ms-client-request-id',
  'f071747b-cb9d-4732-80ac-c32e733cf8fc',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-20T16:46:46.4339704Z',
  'x-ms-creation-time',
  'Fri, 20 Mar 2020 16:46:46 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 20 Mar 2020 16:46:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158472280465409921/blob158472280609502441')
  .query(true)
  .reply(206, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-10/11',
  'Last-Modified',
  'Fri, 20 Mar 2020 16:46:46 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CCEE472896F8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1a97501-101e-0017-3cd7-fe73c9000000',
  'x-ms-client-request-id',
  'a08075b3-d079-412c-98b3-7b22caedaeaf',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-20T16:46:46.4339704Z',
  'x-ms-creation-time',
  'Fri, 20 Mar 2020 16:46:46 GMT',
  'x-ms-blob-content-md5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-content-md5,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 20 Mar 2020 16:46:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158472280465409921')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1a97758-101e-0017-7cd7-fe73c9000000',
  'x-ms-client-request-id',
  '4b1fa8c1-90b0-4fc0-8035-176a2ff695c0',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 20 Mar 2020 16:46:48 GMT'
]);
