# Notice

Only update these tests if you really know what you're doing. 

These tests are here in their near original form to serve as our backwards compatibility tests. They are tests which only test user facing functionality. Non-customer facing API tests are not tested for backwards compatibility.

These tests should only be updated to address bugs that would have affected the legacy behavior or to add additional coverage that we've avoided breaking changes on the legacy APIs.

They are kept in vanilla JS to reduce risk of breaking change.