let nock = require('nock');

module.exports.hash = "89c02adcefa8cfbd0c30ffd7ecf1b9bd";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158977960906408084","filesystem158977960906408084":"filesystem158977960906408084158977960937306987"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977960906408084')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:26:47 GMT',
  'ETag',
  '"0x8D7FAEC0F5CDD31"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4bdb84-a01e-002b-60d4-2c3126000000',
  'x-ms-client-request-id',
  '4ff67a02-50ad-47e1-8130-cf405eb5ed88',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158977960906408084158977960937306987')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ContainerNotFound</Code><Message>The specified container does not exist.\nRequestId:dc4bdc35-a01e-002b-02d4-2c3126000000\nTime:2020-05-18T05:26:47.6287116Z</Message></Error>", [
  'Content-Length',
  '225',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4bdc35-a01e-002b-02d4-2c3126000000',
  'x-ms-client-request-id',
  '6efbbfbb-6911-4ee1-877e-5b5e9b0671f9',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ContainerNotFound',
  'Date',
  'Mon, 18 May 2020 05:26:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977960906408084158977960937306987')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:26:47 GMT',
  'ETag',
  '"0x8D7FAEC0FB82FD2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4bdcbd-a01e-002b-7cd4-2c3126000000',
  'x-ms-client-request-id',
  '885c5736-4127-4782-964c-5afc78f653bb',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158977960906408084158977960937306987')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4bdd75-a01e-002b-24d4-2c3126000000',
  'x-ms-client-request-id',
  '6dbd449c-804c-4518-99b6-05554e219398',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158977960906408084')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4bde30-a01e-002b-4bd4-2c3126000000',
  'x-ms-client-request-id',
  'f1043536-e432-4db0-ab4b-8eceb05c3375',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:48 GMT'
]);
