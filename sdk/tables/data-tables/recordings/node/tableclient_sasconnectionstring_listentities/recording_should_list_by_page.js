let nock = require('nock');

module.exports.hash = "e1e4db7e2b3b1ead247a97667a30445f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.7791241Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-10-15T16:13:10.7791241Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.8101458Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-10-15T16:13:10.8101458Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.1533859Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-10-15T16:13:11.1533859Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.1864094Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-10-15T16:13:11.1864094Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.2194321Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-10-15T16:13:11.2194321Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e463-c002-000d-1fdf-c16eb3000000',
  'x-ms-client-request-id',
  'd8e962e8-1390-4e74-9f40-b27cd66deb9d',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextPartitionKey',
  '1!24!bGlzdEVudGl0aWVzVGVzdA--',
  'x-ms-continuation-NextRowKey',
  '1!4!MTM-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextPartitionKey,x-ms-continuation-NextRowKey,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.2504534Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-10-15T16:13:11.2504534Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.2814751Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-10-15T16:13:11.2814751Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.3235049Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-10-15T16:13:11.3235049Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.3545262Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-10-15T16:13:11.3545262Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.3925528Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-10-15T16:13:11.3925528Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e47e-c002-000d-39df-c16eb3000000',
  'x-ms-client-request-id',
  'f234d488-223e-4ea0-9299-7e8c40788810',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextPartitionKey',
  '1!24!bGlzdEVudGl0aWVzVGVzdA--',
  'x-ms-continuation-NextRowKey',
  '1!4!MTg-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextPartitionKey,x-ms-continuation-NextRowKey,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.4245752Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-10-15T16:13:11.4245752Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.4575987Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-10-15T16:13:11.4575987Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.8421682Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-10-15T16:13:10.8421682Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.8781934Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-10-15T16:13:10.8781934Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.9122172Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-10-15T16:13:10.9122172Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e496-c002-000d-50df-c16eb3000000',
  'x-ms-client-request-id',
  '616c21d7-af3e-4b49-9fe5-ada49526ba1e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextPartitionKey',
  '1!24!bGlzdEVudGl0aWVzVGVzdA--',
  'x-ms-continuation-NextRowKey',
  '1!4!NQ--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextPartitionKey,x-ms-continuation-NextRowKey,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.9432389Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-10-15T16:13:10.9432389Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.0182918Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-10-15T16:13:11.0182918Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.0553173Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-10-15T16:13:11.0553173Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.0933439Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-10-15T16:13:11.0933439Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A11.1233645Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-10-15T16:13:11.1233645Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e4b2-c002-000d-6adf-c16eb3000000',
  'x-ms-client-request-id',
  '0fc523b0-9d19-4121-8fce-80b375e10b8a',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextPartitionKey',
  '1!24!bGlzdEVudGl0aWVzVGVzdA--',
  'x-ms-continuation-NextRowKey',
  '1!12!YmluYXJ5MQ--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextPartitionKey,x-ms-continuation-NextRowKey,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A10.7450999Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2021-10-15T16:13:10.7450999Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e4c6-c002-000d-7ddf-c16eb3000000',
  'x-ms-client-request-id',
  '79064914-47c3-4cbb-ad2c-0a89295220ec',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:11 GMT'
]);
