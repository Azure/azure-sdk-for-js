let nock = require('nock');

module.exports.hash = "8f96742aa7f5f2c3fbf2ae2881ac6ebc";

module.exports.testInfo = {"uniqueName":{"container":"container158977895191804446","container2":"container2158977895359500682"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158977895191804446')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:15:51 GMT',
  'ETag',
  '"0x8D7FAEA884EF299"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '809198b4-101e-0052-37d3-2cdee7000000',
  'x-ms-client-request-id',
  'a0621908-73be-4777-8916-8053776f29ed',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:15:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158977895191804446')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ContainerAlreadyExists</Code><Message>The specified container already exists.\nRequestId:8091998e-101e-0052-7cd3-2cdee7000000\nTime:2020-05-18T05:15:51.5483295Z</Message></Error>", [
  'Content-Length',
  '230',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8091998e-101e-0052-7cd3-2cdee7000000',
  'x-ms-client-request-id',
  'e684fde9-78bf-4850-a7f2-6bdd3d7b44b5',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ContainerAlreadyExists',
  'Date',
  'Mon, 18 May 2020 05:15:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container2158977895359500682')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:15:51 GMT',
  'ETag',
  '"0x8D7FAEA88AD506A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80919a5f-101e-0052-3bd3-2cdee7000000',
  'x-ms-client-request-id',
  '6acd8757-a34e-47c9-ac2e-cac79ed3a581',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:15:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container2158977895359500682')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80919b5a-101e-0052-1fd3-2cdee7000000',
  'x-ms-client-request-id',
  'c809a7d3-468e-4b85-8420-f27265beb7a1',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:15:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158977895191804446')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80919c1f-101e-0052-44d3-2cdee7000000',
  'x-ms-client-request-id',
  '7a566973-d4dc-4802-87f5-e8d7fe6511d1',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:15:52 GMT'
]);
