// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Package sdk demonstrates scenarios where source-based engine fails.
//
// SOURCE LIMITATION: The go/parser-based engine parses syntax trees without
// type checking. It records type references as strings and uses import statements
// to attribute packages. This fails for several scenarios demonstrated here.
//
// COMPILED: The go/packages-based engine runs the full Go type checker,
// giving exact type information for every symbol.
package sdk

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
)

// Client is the main service client.
//
// SOURCE LIMITATION: The embedded *http.Client is detected by the source
// parser via import tracking. But the parser cannot verify that http.Client
// satisfies any particular interface, or determine the full method set
// inherited through embedding.
//
// COMPILED: go/packages resolves the full method set of the struct, including
// all promoted methods from embedded types. The type checker can verify
// interface satisfaction (e.g., Client implements io.Closer via http.Client.CloseIdleConnections).
type Client struct {
	// Endpoint is the service URL.
	Endpoint string
	// Embedded *http.Client promotes its methods onto Client.
	*http.Client
}

// NewClient creates a new service client.
//
// SOURCE LIMITATION: The return type "(*Client, error)" is parsed syntactically.
// The parser knows "error" is a builtin via types.Universe, but cannot verify
// that the returned *Client has a specific method set or satisfies interfaces.
//
// COMPILED: The type checker resolves *Client's full type, including the fact
// that *Client has the method set {GetResource, ListResources, Close, Do, ...}
// from the embedded http.Client.
func NewClient(endpoint string) (*Client, error) {
	return &Client{
		Endpoint: endpoint,
		Client:   &http.Client{},
	}, nil
}

// Resource represents a service resource.
type Resource struct {
	// ID is the resource identifier.
	ID string `json:"id"`
	// Name is the display name.
	Name string `json:"name"`
	// Data is arbitrary JSON data.
	//
	// SOURCE LIMITATION: json.RawMessage is detected as a reference to
	// "encoding/json" via import aliasing, but the source parser records it
	// as the string "json.RawMessage". It cannot determine that json.RawMessage
	// is actually defined as `type RawMessage []byte` — a named byte slice.
	//
	// COMPILED: The type checker resolves json.RawMessage to its underlying
	// type []byte and knows it implements json.Marshaler and json.Unmarshaler.
	Data json.RawMessage `json:"data,omitempty"`
}

// GetResource retrieves a resource by ID.
//
// SOURCE LIMITATION: The context.Context parameter type is resolved via import
// tracking to "context". But the parser cannot verify that context.Context is
// an interface (not a struct), or that it requires specific methods
// (Deadline, Done, Err, Value).
//
// COMPILED: types.Interface from the type checker gives the exact method set
// of context.Context, and can verify that any concrete type satisfies it.
func (c *Client) GetResource(ctx context.Context, id string) (*Resource, error) {
	return &Resource{ID: id}, nil
}

// ListResources lists resources, writing them to the provided writer.
//
// SOURCE LIMITATION: io.Writer is an interface. The source parser detects it
// via import tracking but cannot resolve its method set (Write(p []byte) (n int, err error)).
// If code assigns an *os.File to an io.Writer parameter, the parser cannot
// verify this is type-safe.
//
// COMPILED: The type checker fully resolves io.Writer's method set and can
// verify any concrete type satisfies it.
func (c *Client) ListResources(ctx context.Context, w io.Writer) error {
	return nil
}

// Pair is a generic type with a constraint.
//
// SOURCE LIMITATION: The source parser graphs the type parameter syntax
// [K comparable, V any] as a raw string. It cannot:
// 1. Verify "comparable" is a built-in constraint (not a user-defined interface)
// 2. Verify "any" is the empty interface alias
// 3. Determine that Pair[string, int] is a valid instantiation but
//    Pair[[]byte, int] is not ([]byte is not comparable)
//
// COMPILED: types.TypeParam gives the exact constraint via Constraint().
// The type checker can validate instantiations.
type Pair[K comparable, V any] struct {
	// Key is the pair key.
	Key K
	// Value is the pair value.
	Value V
}

// ResponseHandler is a function type that processes HTTP responses.
//
// SOURCE LIMITATION: The source parser records this as a named function type
// with parameter types as strings ("*http.Response", "error"). It cannot
// verify the relationship between http.Response fields and the handler's
// expected behavior.
//
// COMPILED: The type checker fully resolves http.Response as a struct with
// fields like StatusCode int, Header http.Header, Body io.ReadCloser, etc.
type ResponseHandler func(resp *http.Response) error

// Doer is an interface satisfied by *http.Client.
//
// SOURCE LIMITATION: The source parser records the interface methods as
// string signatures. It cannot verify that *http.Client satisfies this
// interface (which requires Do(*http.Request) (*http.Response, error)).
//
// COMPILED: types.Implements(httpClientType, doerType) returns true,
// confirming the structural typing relationship.
type Doer interface {
	Do(req *http.Request) (*http.Response, error)
}
