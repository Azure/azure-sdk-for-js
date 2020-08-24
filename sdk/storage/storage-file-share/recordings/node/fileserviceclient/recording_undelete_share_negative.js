let nock = require('nock');

module.exports.hash = "1076afcbc9d5de2536c9edafcda6a150";

module.exports.testInfo = {"uniqueName":{"share":"share159825310351507667"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159825310351507667')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ShareNotFound</Code><Message>The specified share does not exist.\nRequestId:4dd4a851-001a-003d-11e5-794162000000\nTime:2020-08-24T07:11:43.4882821Z</Message></Error>", [
  'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd4a851-001a-003d-11e5-794162000000',
  'x-ms-client-request-id',
  'a4296ddd-8f5f-4e25-ad60-fab71832b226',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ShareNotFound',
  'Date',
  'Mon, 24 Aug 2020 07:11:42 GMT'
]);
