let nock = require('nock');

module.exports.hash = "1076afcbc9d5de2536c9edafcda6a150";

module.exports.testInfo = {"uniqueName":{"share":"share159826358132703037"},"newDate":{}}

nock('https://sd-fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159826358132703037')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ShareNotFound</Code><Message>The specified share does not exist.\nRequestId:81effdf2-601a-002b-7cfe-79b7b5000000\nTime:2020-08-24T10:06:21.3450455Z</Message></Error>", [
  'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81effdf2-601a-002b-7cfe-79b7b5000000',
  'x-ms-client-request-id',
  '19ad310e-6441-4293-b30f-e80db99757bd',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ShareNotFound',
  'Date',
  'Mon, 24 Aug 2020 10:06:20 GMT'
]);
