let nock = require('nock');

module.exports.hash = "1a94f7c9c0bd71eda42aefcf9866dc21";

module.exports.testInfo = {"uniqueName":{"etags":"etags158700189282103051"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158700189282103051', {"key":"etags158700189282103051","value":"some value"})
  .query(true)
  .reply(200, {"etag":"z7JKrSDyxHD6T1yl4FgRL08sqZp","key":"etags158700189282103051","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:32 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'ETag',
  '"z7JKrSDyxHD6T1yl4FgRL08sqZp"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODA3;sn=1904807',
  'x-ms-request-id',
  'c2e44652-f245-4f45-b26f-fcf9e291b429',
  'x-ms-correlation-request-id',
  'c2e44652-f245-4f45-b26f-fcf9e291b429',
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
  .get('/kv/etags158700189282103051')
  .query(true)
  .reply(200, {"etag":"z7JKrSDyxHD6T1yl4FgRL08sqZp","key":"etags158700189282103051","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'ETag',
  '"z7JKrSDyxHD6T1yl4FgRL08sqZp"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODA3;sn=1904807',
  'x-ms-request-id',
  '1826deb3-ff17-45b8-95a0-cabfe10b370a',
  'x-ms-correlation-request-id',
  '1826deb3-ff17-45b8-95a0-cabfe10b370a',
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
  .put('/kv/etags158700189282103051', {"key":"etags158700189282103051","label":null,"content_type":null,"value":"some new value!","last_modified":"2020-04-16T01:51:33.000Z","tags":{},"etag":"z7JKrSDyxHD6T1yl4FgRL08sqZp"})
  .query(true)
  .reply(200, {"etag":"2YCAr5OneSEUOLSPpE8nmGEayvv","key":"etags158700189282103051","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'ETag',
  '"2YCAr5OneSEUOLSPpE8nmGEayvv"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODA4;sn=1904808',
  'x-ms-request-id',
  '07b1fb12-5c65-4223-8327-786213508877',
  'x-ms-correlation-request-id',
  '07b1fb12-5c65-4223-8327-786213508877',
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
  .put('/kv/etags158700189282103051', {"key":"etags158700189282103051","label":null,"content_type":null,"value":"some new value!","last_modified":"2020-04-16T01:51:33.000Z","tags":{},"etag":"bogus"})
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'f74457d8-c683-43b7-ac04-31ba851312c4',
  'x-ms-correlation-request-id',
  'f74457d8-c683-43b7-ac04-31ba851312c4',
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
  .reply(200, {"items":[{"etag":"2YCAr5OneSEUOLSPpE8nmGEayvv","key":"etags158700189282103051","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:33+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODA4;sn=1904808',
  'x-ms-request-id',
  '09246f38-331f-443b-b5c2-2c05653cdcb4',
  'x-ms-correlation-request-id',
  '09246f38-331f-443b-b5c2-2c05653cdcb4',
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
  .delete('/kv/etags158700189282103051')
  .query(true)
  .reply(200, {"etag":"2YCAr5OneSEUOLSPpE8nmGEayvv","key":"etags158700189282103051","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'ETag',
  '"2YCAr5OneSEUOLSPpE8nmGEayvv"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODA5;sn=1904809',
  'x-ms-request-id',
  'c9a6b5fa-f865-4c14-9546-cc80b932c296',
  'x-ms-correlation-request-id',
  'c9a6b5fa-f865-4c14-9546-cc80b932c296',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
