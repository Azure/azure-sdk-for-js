let nock = require('nock');

module.exports.hash = "49431c138ecffcaccd598ee952bd3503";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestSASConnectionStringnode0"},{"TableName":"ListTableTestSASConnectionStringnode1"},{"TableName":"ListTableTestSASConnectionStringnode10"},{"TableName":"ListTableTestSASConnectionStringnode11"},{"TableName":"ListTableTestSASConnectionStringnode12"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef307-9002-001e-5f4b-5d5b52000000',
  'x-ms-client-request-id',
  '10334f45-e462-47e1-a13d-f29bff158b37',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!76!bGlzdHRhYmxldGVzdHNhc2Nvbm5lY3Rpb25zdHJpbmdub2RlMTMBMDFkNzVkNGI4YjI4M2FiMg--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 16:21:47 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestSASConnectionStringnode13"},{"TableName":"ListTableTestSASConnectionStringnode14"},{"TableName":"ListTableTestSASConnectionStringnode15"},{"TableName":"ListTableTestSASConnectionStringnode16"},{"TableName":"ListTableTestSASConnectionStringnode17"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef319-9002-001e-704b-5d5b52000000',
  'x-ms-client-request-id',
  '271cdecf-7b95-4f5a-bcf5-2ae5d931c5ae',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!76!bGlzdHRhYmxldGVzdHNhc2Nvbm5lY3Rpb25zdHJpbmdub2RlMTgBMDFkNzVkNGI4YjQ5ODQ1Nw--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 16:21:47 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestSASConnectionStringnode18"},{"TableName":"ListTableTestSASConnectionStringnode19"},{"TableName":"ListTableTestSASConnectionStringnode2"},{"TableName":"ListTableTestSASConnectionStringnode3"},{"TableName":"ListTableTestSASConnectionStringnode4"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef322-9002-001e-794b-5d5b52000000',
  'x-ms-client-request-id',
  'ae74ab6b-2a44-4c7e-b634-e2db40e38042',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!72!bGlzdHRhYmxldGVzdHNhc2Nvbm5lY3Rpb25zdHJpbmdub2RlNQEwMWQ3NWQ0YjhhZmIyZjIz',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 16:21:47 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestSASConnectionStringnode5"},{"TableName":"ListTableTestSASConnectionStringnode6"},{"TableName":"ListTableTestSASConnectionStringnode7"},{"TableName":"ListTableTestSASConnectionStringnode8"},{"TableName":"ListTableTestSASConnectionStringnode9"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef327-9002-001e-7e4b-5d5b52000000',
  'x-ms-client-request-id',
  '737c59c0-bfac-488f-a840-c20c40b2fb59',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!52!bmV3dGFibGUxNjIzMjA0NTcwMDEyATAxZDc1Y2Q0N2JmOTBhYjA-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 16:21:47 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef32b-9002-001e-024b-5d5b52000000',
  'x-ms-client-request-id',
  '6baa8ae7-6dc2-4c6f-9619-f756cb057bc1',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 16:21:47 GMT'
]);
