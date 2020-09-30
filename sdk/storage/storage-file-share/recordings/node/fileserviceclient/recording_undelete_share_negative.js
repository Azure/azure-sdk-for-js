let nock = require('nock');

module.exports.hash = "befb49d5f82063be1628ed2b34f0a070";

module.exports.testInfo = {"uniqueName":{"share":"share159833757028600651"},"newDate":{}}

nock('https://sd-fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159833757028600651')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ShareNotFound</Code><Message>The specified share does not exist.\nRequestId:def68e88-501a-0020-69aa-7a4cde000000\nTime:2020-08-25T06:39:30.2810780Z</Message></Error>", [
  'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'def68e88-501a-0020-69aa-7a4cde000000',
  'x-ms-client-request-id',
  '9e559064-201a-4ea5-8cff-21ae53bc2fe2',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ShareNotFound',
  'Date',
  'Tue, 25 Aug 2020 06:39:29 GMT'
]);
