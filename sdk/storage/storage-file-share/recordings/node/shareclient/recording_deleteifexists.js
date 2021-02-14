let nock = require('nock');

module.exports.hash = "e97179d82a50d9d87f011bdafbd816d3";

module.exports.testInfo = {"uniqueName":{"share":"share158978108818205267","share158978108818205267":"share158978108818205267158978108847803646","share1589781088182052673":"share1589781088182052673158978108907107388"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108818205267')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:26 GMT',
  'ETag',
  '"0x8D7FAEF80FD9396"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2677-401a-0012-35d8-2cd9df000000',
  'x-ms-client-request-id',
  '50c45b56-e31d-403a-9225-abe367d527e7',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108818205267158978108847803646')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:26 GMT',
  'ETag',
  '"0x8D7FAEF812B1472"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da267a-401a-0012-37d8-2cd9df000000',
  'x-ms-client-request-id',
  '65306e07-9751-4a86-9400-cc9ecd8d9a26',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978108818205267158978108847803646')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da267c-401a-0012-38d8-2cd9df000000',
  'x-ms-client-request-id',
  '5dac858c-28ee-475b-ba7d-d7dfc6b5c32d',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share1589781088182052673158978108907107388')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ShareNotFound</Code><Message>The specified share does not exist.\nRequestId:b2da267e-401a-0012-39d8-2cd9df000000\nTime:2020-05-18T05:51:27.3350614Z</Message></Error>", [
  'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da267e-401a-0012-39d8-2cd9df000000',
  'x-ms-client-request-id',
  'a3c80b81-8ca9-46e3-b221-f88c8750c8a2',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ShareNotFound',
  'Date',
  'Mon, 18 May 2020 05:51:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978108818205267')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da267f-401a-0012-3ad8-2cd9df000000',
  'x-ms-client-request-id',
  '702686cb-608a-418e-8ea1-e3fb0808adc8',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:27 GMT'
]);
