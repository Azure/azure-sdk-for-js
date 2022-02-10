let nock = require('nock');

module.exports.hash = "5881c7c991cb625373db43847307ab24";

module.exports.testInfo = {"uniqueName":{"share":"share163947023800807457","dir":"dir163947023826405213","汉字. dest ~!@#$%^&()_+`1234567890-={}[];','":"汉字. dest ~!@#$%^&()_+`1234567890-={}[];','163947023852406276","汉字. source ~!@#$%^&()_+`1234567890-={}[];','":"汉字. source ~!@#$%^&()_+`1234567890-={}[];','163947023852408531"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023800807457')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:58 GMT',
  'ETag',
  '"0x8D9BEDB137641A7"',
  'x-ms-request-id',
  '88abb7f5-601a-0004-2bc3-f00ec4000000',
  'x-ms-client-request-id',
  'cc02b1ba-0eba-4233-ba01-6c48cb3f922d',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023800807457/dir163947023826405213')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:58 GMT',
  'ETag',
  '"0x8D9BEDB139F18A1"',
  'x-ms-request-id',
  '88abb7f7-601a-0004-2cc3-f00ec4000000',
  'x-ms-client-request-id',
  '71d65c33-ec31-4cda-9d3c-77113dae5936',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:58.5944737Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:58.5944737Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:58.5944737Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:23:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023800807457/%E6%B1%89%E5%AD%97.%20source%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27163947023852408531')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:58 GMT',
  'ETag',
  '"0x8D9BEDB13C6502F"',
  'x-ms-request-id',
  '88abb7f8-601a-0004-2dc3-f00ec4000000',
  'x-ms-client-request-id',
  '24957812-0ba8-4d06-a693-53412cc5a2ca',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:58.8514863Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:58.8514863Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:58.8514863Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:23:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947023800807457/%E6%B1%89%E5%AD%97.%20dest%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27163947023852406276')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:59 GMT',
  'ETag',
  '"0x8D9BEDB13ECEBA5"',
  'x-ms-request-id',
  '88abb7f9-601a-0004-2ec3-f00ec4000000',
  'x-ms-client-request-id',
  '7ab5ff85-aaaf-443d-8015-585bc412f096',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:59.1045029Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:58.8514863Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:58.8514863Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:23:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947023800807457/%E6%B1%89%E5%AD%97.%20dest%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27163947023852406276')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:59 GMT',
  'ETag',
  '"0x8D9BEDB13ECEBA5"',
  'x-ms-request-id',
  '88abb7fa-601a-0004-2fc3-f00ec4000000',
  'x-ms-client-request-id',
  'b2f38156-c03d-4899-8ae3-8f005ed00a50',
  'x-ms-version',
  '2021-04-10',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:23:59.1045029Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:58.8514863Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:58.8514863Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:23:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947023800807457/%E6%B1%89%E5%AD%97.%20source%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27163947023852408531')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:88abb7fb-601a-0004-30c3-f00ec4000000\nTime:2021-12-14T08:23:59.5929154Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '88abb7fb-601a-0004-30c3-f00ec4000000',
  'x-ms-client-request-id',
  '76ffa4c3-fd90-4579-8768-caa60befb415',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:23:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163947023800807457')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '88abb7fc-601a-0004-31c3-f00ec4000000',
  'x-ms-client-request-id',
  '709591e1-7b30-45c0-a662-d0202e1c791d',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:59 GMT'
]);
