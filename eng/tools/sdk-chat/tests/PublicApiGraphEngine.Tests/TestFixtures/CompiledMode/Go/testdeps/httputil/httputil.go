package httputil

import "context"

type Request struct {
	Method string
	Path   string
}

type Response struct {
	StatusCode int
	Body       []byte
}

type TransportConfig struct {
	Endpoint string
	Timeout  int
}

type RoundTripper interface {
	RoundTrip(ctx context.Context, req *Request) (*Response, error)
}

type Handler interface {
	Handle(ctx context.Context, req *Request) (*Response, error)
}
