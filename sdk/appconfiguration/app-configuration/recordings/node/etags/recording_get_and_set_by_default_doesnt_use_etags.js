let nock = require('nock');

module.exports.hash = "0656b616c78721ec26ad252863f7fe7e";

module.exports.testInfo = {"uniqueName":{"etags":"etags158690901834402936"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158690901834402936', {"key":"etags158690901834402936","value":"some value"})
  .query(true)
  .reply(200, {"etag":"7bjQHoXxaZ5y2mNakff9cKfXQLC","key":"etags158690901834402936","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:39+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'ETag',
  '"7bjQHoXxaZ5y2mNakff9cKfXQLC"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3Mzk1;sn=1897395',
  'x-ms-request-id',
  '21addffe-0ad5-43c1-851d-3dc30797d71d',
  'x-ms-correlation-request-id',
  '21addffe-0ad5-43c1-851d-3dc30797d71d',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/etags158690901834402936')
  .query(true)
  .reply(200, {"etag":"7bjQHoXxaZ5y2mNakff9cKfXQLC","key":"etags158690901834402936","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:39+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'ETag',
  '"7bjQHoXxaZ5y2mNakff9cKfXQLC"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3Mzk1;sn=1897395',
  'x-ms-request-id',
  '8a0f4374-a2bd-420b-b85d-978600b233d4',
  'x-ms-correlation-request-id',
  '8a0f4374-a2bd-420b-b85d-978600b233d4',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158690901834402936', {"key":"etags158690901834402936","label":null,"content_type":null,"value":"some new value!","last_modified":"2020-04-15T00:03:39.000Z","tags":{},"etag":"7bjQHoXxaZ5y2mNakff9cKfXQLC"})
  .query(true)
  .reply(200, {"etag":"q87m7V1BtP49dGNr8ZJi6CEkZvS","key":"etags158690901834402936","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:39+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'ETag',
  '"q87m7V1BtP49dGNr8ZJi6CEkZvS"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3Mzk2;sn=1897396',
  'x-ms-request-id',
  '02436e44-7d96-4a8f-b9a6-a53d7bc72402',
  'x-ms-correlation-request-id',
  '02436e44-7d96-4a8f-b9a6-a53d7bc72402',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"etag":"q87m7V1BtP49dGNr8ZJi6CEkZvS","key":"etags158690901834402936","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:39+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3Mzk2;sn=1897396',
  'x-ms-request-id',
  '18917f13-bffa-424f-b6ca-527c3110188b',
  'x-ms-correlation-request-id',
  '18917f13-bffa-424f-b6ca-527c3110188b',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .delete('/kv/etags158690901834402936')
  .query(true)
  .reply(200, {"etag":"q87m7V1BtP49dGNr8ZJi6CEkZvS","key":"etags158690901834402936","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:39+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'ETag',
  '"q87m7V1BtP49dGNr8ZJi6CEkZvS"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3Mzk3;sn=1897397',
  'x-ms-request-id',
  '1fbcd299-5900-42ce-ac10-9a2a034bd89a',
  'x-ms-correlation-request-id',
  '1fbcd299-5900-42ce-ac10-9a2a034bd89a',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
