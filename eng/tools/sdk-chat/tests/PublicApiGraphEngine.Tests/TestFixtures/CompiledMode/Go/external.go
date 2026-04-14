// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

package sdk

import "github.com/someorg/httputil"

// ServiceTransport embeds an external interface type.
// The source parser records the embedding but cannot determine that
// httputil.RoundTripper is an interface, nor can it enumerate
// the methods that RoundTripper promotes into ServiceTransport.
type ServiceTransport struct {
	httputil.RoundTripper
	retryCount int
}

// NewServiceTransport references an external struct type as a parameter.
// The source parser cannot determine that httputil.TransportConfig is a struct.
func NewServiceTransport(config httputil.TransportConfig) *ServiceTransport {
	return &ServiceTransport{retryCount: 3}
}

// ServiceMiddleware uses external interface types in a function type definition.
// The source parser sees the type references but cannot classify them.
type ServiceMiddleware func(httputil.Handler) httputil.Handler
