let nock = require('nock');

module.exports.hash = "31a883320f98b70c3182f3e09cc26543";

module.exports.testInfo = {"uniqueName":{"container":"container159352260585709135","blob":"blob159352260634505839"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159352260585709135')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Jun 2020 13:10:05 GMT',
  'ETag',
  '"0x8D81CF6E83001DA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0559bb06-101e-001a-68df-4e2c7f000000',
  'x-ms-client-request-id',
  'c0279a80-642b-49e6-961d-823261d18fa2',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 30 Jun 2020 13:10:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159352260585709135/blob159352260634505839', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 30 Jun 2020 13:10:06 GMT',
  'ETag',
  '"0x8D81CF6E870472B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0559bb82-101e-001a-54df-4e2c7f000000',
  'x-ms-client-request-id',
  '207f691d-b2c3-4053-95e9-3871372ce5be',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-30T13:10:06.0130091Z',
  'Date',
  'Tue, 30 Jun 2020 13:10:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159352260585709135/blob159352260634505839', "100,200,300,400\n150,250,350,450\n")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'v9C7YWQTetukQaGSOQcgRQ==',
  'Last-Modified',
  'Tue, 30 Jun 2020 13:10:06 GMT',
  'ETag',
  '"0x8D81CF6E8BCEE9B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0559bbce-101e-001a-1adf-4e2c7f000000',
  'x-ms-client-request-id',
  '24e1695c-d822-4e83-be43-3d5af8d7cc43',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'gema9E3+zEY=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-30T13:10:06.5163691Z',
  'Date',
  'Tue, 30 Jun 2020 13:10:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/container159352260585709135/blob159352260634505839', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><QueryType>SQL</QueryType><Expression>select * from BlobStorage</Expression></QueryRequest>")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:0559bc3a-101e-001a-7bdf-4e2c7f000000\nTime:2020-06-30T13:10:07.1288960Z</Message><HeaderName>x-ms-lease-id</HeaderName><HeaderValue>invalid</HeaderValue></Error>", [
  'Content-Length',
  '327',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'x-ms-request-id',
  '0559bc3a-101e-001a-7bdf-4e2c7f000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ed7976a7-7fcc-46ee-b997-257675f7694b',
  'Date',
  'Tue, 30 Jun 2020 13:10:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159352260585709135')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0559bcbe-101e-001a-7adf-4e2c7f000000',
  'x-ms-client-request-id',
  '764fe400-3781-44dc-afb9-1957cf8130de',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 30 Jun 2020 13:10:08 GMT'
]);
