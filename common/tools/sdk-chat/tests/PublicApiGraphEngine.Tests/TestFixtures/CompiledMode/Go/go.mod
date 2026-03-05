module github.com/test/compiled-sdk

go 1.21

require github.com/someorg/httputil v0.0.0

replace github.com/someorg/httputil => ./testdeps/httputil
