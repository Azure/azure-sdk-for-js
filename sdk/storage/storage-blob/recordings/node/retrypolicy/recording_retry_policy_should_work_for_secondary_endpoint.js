let nock = require('nock');

module.exports.testInfo = {"container":"container156776205955909114"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776205955909114')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:27:39 GMT',
  'ETag',
  '"0x8D732AC7666AB03"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '06225376-401e-0156-7d95-64f861000000',
  'x-ms-client-request-id',
  '4a3a0ea9-836b-406d-a9be-c0a2205287a9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount-secondary.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776205955909114')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ContainerNotFound</Code><Message>The specified container does not exist.\nRequestId:5404cfb1-101e-00b3-5195-641189000000\nTime:2019-09-06T09:27:40.2680777Z</Message></Error>", [ 'Content-Length',
  '225',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5404cfb1-101e-00b3-5195-641189000000',
  'x-ms-client-request-id',
  '763359b8-64c1-4dc4-a04f-1207e0f8d9a5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'ContainerNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:27:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776205955909114')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f64561fb-801e-0114-5395-6441e1000000',
  'x-ms-client-request-id',
  'a7335be8-aee7-4059-b97a-3be90e5ecbf8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:40 GMT',
  'Connection',
  'close' ]);

