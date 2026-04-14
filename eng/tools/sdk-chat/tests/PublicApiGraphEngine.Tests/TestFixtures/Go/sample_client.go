package sample

// Package sample provides a sample client for testing API graphing.
// Demonstrates public API patterns for Go SDK.

import (
	"context"
	"time"
)

// ResultStatus represents the status of an operation.
type ResultStatus string

const (
	// ResultStatusSuccess indicates the operation succeeded.
	ResultStatusSuccess ResultStatus = "success"
	// ResultStatusFailed indicates the operation failed.
	ResultStatusFailed ResultStatus = "failed"
	// ResultStatusPending indicates the operation is pending.
	ResultStatusPending ResultStatus = "pending"
)

// Resource represents a resource.
type Resource struct {
	// ID is the resource identifier.
	ID string
	// Name is the resource name.
	Name string
	// Tags are optional key-value pairs.
	Tags map[string]string
	// CreatedAt is the creation timestamp.
	CreatedAt time.Time
}

// ResourceCreateOptions contains options for creating a resource.
type ResourceCreateOptions struct {
	// Name is the resource name.
	Name string
	// Tags are optional key-value pairs.
	Tags map[string]string
}

// SampleClientOptions contains options for configuring SampleClient.
type SampleClientOptions struct {
	// RetryCount is the number of retries. Default: 3.
	RetryCount int
	// Timeout is the operation timeout. Default: 30s.
	Timeout time.Duration
	// APIVersion is the API version. Default: "2024-01-01".
	APIVersion string
}

// SampleClient is a client for interacting with the sample service.
// It provides methods for CRUD operations on resources.
type SampleClient struct {
	endpoint string
	options  SampleClientOptions
	Widgets  *WidgetsClient
}

// NewSampleClient creates a new SampleClient instance.
// endpoint is the service endpoint URL.
// options are optional client configuration settings.
func NewSampleClient(endpoint string, options *SampleClientOptions) (*SampleClient, error) {
	opts := SampleClientOptions{
		RetryCount: 3,
		Timeout:    30 * time.Second,
		APIVersion: "2024-01-01",
	}
	if options != nil {
		if options.RetryCount > 0 {
			opts.RetryCount = options.RetryCount
		}
		if options.Timeout > 0 {
			opts.Timeout = options.Timeout
		}
		if options.APIVersion != "" {
			opts.APIVersion = options.APIVersion
		}
	}
	client := &SampleClient{
		endpoint: endpoint,
		options:  opts,
	}
	client.Widgets = &WidgetsClient{parent: client}
	return client, nil
}

// Endpoint returns the service endpoint.
func (c *SampleClient) Endpoint() string {
	return c.endpoint
}

// GetResource retrieves a resource by ID.
// ctx is the context for cancellation.
// resourceID is the resource identifier.
// Returns the resource or an error.
func (c *SampleClient) GetResource(ctx context.Context, resourceID string) (*Resource, error) {
	return &Resource{
		ID:        resourceID,
		Name:      "Test",
		CreatedAt: time.Now(),
	}, nil
}

// ListResources returns all resources.
// ctx is the context for cancellation.
// filter is an optional OData filter expression.
// Returns a slice of resources or an error.
func (c *SampleClient) ListResources(ctx context.Context, filter string) ([]*Resource, error) {
	return []*Resource{}, nil
}

// CreateResource creates a new resource.
// ctx is the context for cancellation.
// options contains the resource creation parameters.
// Returns the created resource or an error.
func (c *SampleClient) CreateResource(ctx context.Context, options ResourceCreateOptions) (*Resource, error) {
	return &Resource{
		ID:        "new",
		Name:      options.Name,
		Tags:      options.Tags,
		CreatedAt: time.Now(),
	}, nil
}

// DeleteResource deletes a resource.
// ctx is the context for cancellation.
// resourceID is the resource to delete.
// Returns an error if deletion fails.
func (c *SampleClient) DeleteResource(ctx context.Context, resourceID string) error {
	return nil
}

// UpdateResource updates an existing resource.
// ctx is the context for cancellation.
// resourceID is the resource ID.
// resource contains the updated resource data.
// Returns the updated resource or an error.
func (c *SampleClient) UpdateResource(ctx context.Context, resourceID string, resource Resource) (*Resource, error) {
	resource.ID = resourceID
	return &resource, nil
}

// Close releases any resources held by the client.
func (c *SampleClient) Close() error {
	return nil
}

// WidgetsClient provides widget operations.
type WidgetsClient struct {
	parent *SampleClient
}

// ListWidgets lists widgets.
func (w *WidgetsClient) ListWidgets(ctx context.Context) ([]string, error) {
	return []string{w.parent.endpoint}, nil
}

// EmptyClient has no methods, only a subclient field.
type EmptyClient struct {
	Widgets *WidgetsClient
}

// NewEmptyClient creates a new EmptyClient.
func NewEmptyClient(endpoint string) *EmptyClient {
	parent, _ := NewSampleClient(endpoint, nil)
	return &EmptyClient{Widgets: &WidgetsClient{parent: parent}}
}

// RecommendationsClient defines the interface for recommendations operations.
type RecommendationsClient interface {
	// ListRecommendations lists recommendations.
	ListRecommendations(ctx context.Context) ([]string, error)
}

// RecommendationsClientImpl is the implementation of RecommendationsClient.
type RecommendationsClientImpl struct {
	parent *SampleClient
}

// ListRecommendations lists recommendations.
func (r *RecommendationsClientImpl) ListRecommendations(ctx context.Context) ([]string, error) {
	return []string{r.parent.endpoint + "/recommendations"}, nil
}

// InterfaceClient has an interface-typed subclient.
type InterfaceClient struct {
	Recommendations RecommendationsClient
}

// NewInterfaceClient creates a new InterfaceClient.
func NewInterfaceClient(endpoint string) *InterfaceClient {
	parent, _ := NewSampleClient(endpoint, nil)
	return &InterfaceClient{Recommendations: &RecommendationsClientImpl{parent: parent}}
}

// ResourceOperations defines the interface for resource operations.
type ResourceOperations interface {
	// Get retrieves a resource by ID.
	Get(ctx context.Context, id string) (*Resource, error)
	// Delete removes a resource.
	Delete(ctx context.Context, id string) error
	// Update modifies an existing resource.
	Update(ctx context.Context, id string, resource Resource) (*Resource, error)
}

// Result is a generic result wrapper.
type Result[T any] struct {
	// Value contains the result value if successful.
	Value T
	// Status indicates the result status.
	Status ResultStatus
	// Error contains the error message if failed.
	Error string
}

// NewSuccessResult creates a success result.
func NewSuccessResult[T any](value T) Result[T] {
	return Result[T]{Value: value, Status: ResultStatusSuccess}
}

// NewFailureResult creates a failure result.
func NewFailureResult[T any](err string) Result[T] {
	return Result[T]{Status: ResultStatusFailed, Error: err}
}

// CreateDefaultClient creates a client with default options.
// endpoint is the service endpoint.
// Returns a configured SampleClient.
func CreateDefaultClient(endpoint string) (*SampleClient, error) {
	return NewSampleClient(endpoint, nil)
}

// BatchGetResources retrieves multiple resources.
// ctx is the context for cancellation.
// client is the client to use.
// ids is a slice of resource IDs.
// Returns a slice of resources or an error.
func BatchGetResources(ctx context.Context, client *SampleClient, ids []string) ([]*Resource, error) {
	results := make([]*Resource, 0, len(ids))
	for _, id := range ids {
		r, err := client.GetResource(ctx, id)
		if err != nil {
			return nil, err
		}
		results = append(results, r)
	}
	return results, nil
}

// --- Embedding examples ---

// BaseModel provides common fields for all models.
type BaseModel struct {
	// ID is the unique identifier.
	ID string
	// ETag is the entity version tag for optimistic concurrency.
	ETag string
}

// AuditInfo provides audit tracking fields.
type AuditInfo struct {
	// CreatedBy is the identity that created the resource.
	CreatedBy string
	// ModifiedBy is the identity that last modified the resource.
	ModifiedBy string
}

// TrackedResource embeds both BaseModel and AuditInfo for composition.
type TrackedResource struct {
	BaseModel
	AuditInfo
	// DisplayName is the user-facing name.
	DisplayName string
}

// Reader defines read operations.
type Reader interface {
	// Read reads data.
	Read(ctx context.Context, id string) ([]byte, error)
}

// Writer defines write operations.
type Writer interface {
	// Write writes data.
	Write(ctx context.Context, id string, data []byte) error
}

// ReadWriter composes Reader and Writer via interface embedding.
type ReadWriter interface {
	Reader
	Writer
}

// Closer defines a Close method.
type Closer interface {
	// Close releases resources.
	Close() error
}

// ReadWriteCloser composes ReadWriter and Closer.
type ReadWriteCloser interface {
	ReadWriter
	Closer
}
