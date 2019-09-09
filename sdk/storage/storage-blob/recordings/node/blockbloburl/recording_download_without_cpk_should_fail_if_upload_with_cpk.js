let nock = require('nock');

module.exports.testInfo = {"container":"container156776197021505894","blob":"blob156776197061401401","randomstring":"randomstring156776197061402605"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776197021505894')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:10 GMT',
  'ETag',
  '"0x8D732AC41272CD1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6eebd016-a01e-0051-4895-646a0f000000',
  'x-ms-client-request-id',
  '0087c615-c723-42ba-ad76-25abfe9e1860',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776197021505894/blob156776197061401401', "randomstring156776197061402605")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'F3Tj78mzAp/G1Cf/kPnKcg==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:10 GMT',
  'ETag',
  '"0x8D732AC41652A64"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f554f73-601e-0085-2895-64da5e000000',
  'x-ms-client-request-id',
  'f1d2836a-13ec-4c28-a4db-b57b78940158',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'w8NzfDmzBgo=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Fri, 06 Sep 2019 09:26:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776197021505894/blob156776197061401401')
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobUsesCustomerSpecifiedEncryption</Code><Message>The blob is encrypted with customer specified encryption, but it was not provided in the request.\nRequestId:514b5d40-201e-0122-0c95-64cc91000000\nTime:2019-09-06T09:26:11.3090840Z</Message></Error>", [ 'Content-Length',
  '301',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '514b5d40-201e-0122-0c95-64cc91000000',
  'x-ms-client-request-id',
  'fd0bb4f6-4c01-4905-a40b-506278a1560c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:26:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776197021505894')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '964810f2-e01e-0050-7e95-6435d3000000',
  'x-ms-client-request-id',
  '7ba29839-c600-4dde-ae6c-88ab9fa23da1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:10 GMT',
  'Connection',
  'close' ]);

