"""
Sample Python package for testing API graphing.
"""

from typing import Optional, Dict, List, AsyncIterator
from dataclasses import dataclass
from datetime import datetime
from enum import Enum


class ResultStatus(Enum):
    """Result status enumeration."""
    SUCCESS = "success"
    FAILED = "failed"
    PENDING = "pending"


@dataclass
class Resource:
    """Represents a resource."""
    id: str
    name: str
    tags: Optional[Dict[str, str]] = None
    created_at: Optional[datetime] = None


@dataclass
class ResourceCreateOptions:
    """Options for creating a resource."""
    name: str
    tags: Optional[Dict[str, str]] = None


class SampleClientOptions:
    """Options for configuring SampleClient."""

    def __init__(
        self,
        retry_count: int = 3,
        timeout: float = 30.0,
        api_version: str = "2024-01-01"
    ) -> None:
        """Initialize client options."""
        self.retry_count = retry_count
        self.timeout = timeout
        self.api_version = api_version


class SampleClient:
    """A sample client for testing API graphing.

    Demonstrates public API patterns for Python SDK.
    """

    def __init__(
        self,
        endpoint: str,
        credential: Optional[object] = None,
        **kwargs
    ) -> None:
        """Create a new SampleClient instance.

        Args:
            endpoint: The service endpoint URL.
            credential: Optional authentication credential.
            **kwargs: Additional options passed to SampleClientOptions.
        """
        self.endpoint = endpoint
        self._credential = credential
        self._options = SampleClientOptions(**kwargs)
        self._widgets = WidgetClient(self)

    def __enter__(self) -> "SampleClient":
        """Enter context manager."""
        return self

    def __exit__(self, *args) -> None:
        """Exit context manager."""
        self.close()

    def close(self) -> None:
        """Close the client and release resources."""
        pass

    def widgets(self) -> "WidgetClient":
        """Get the widgets subclient."""
        return self._widgets

    def get_resource(
        self,
        resource_id: str,
        *,
        timeout: Optional[float] = None
    ) -> Resource:
        """Get a resource by ID.

        Args:
            resource_id: The unique resource identifier.
            timeout: Optional timeout override.

        Returns:
            The resource object.

        Raises:
            ResourceNotFoundError: If resource doesn't exist.
        """
        return Resource(id=resource_id, name="Test")

    async def get_resource_async(
        self,
        resource_id: str,
        *,
        timeout: Optional[float] = None
    ) -> Resource:
        """Get a resource by ID asynchronously.

        Args:
            resource_id: The unique resource identifier.
            timeout: Optional timeout override.

        Returns:
            The resource object.
        """
        return Resource(id=resource_id, name="Test")

    def list_resources(
        self,
        filter: Optional[str] = None,
        max_results: int = 100
    ) -> List[Resource]:
        """List all resources.

        Args:
            filter: Optional OData filter expression.
            max_results: Maximum number of results to return.

        Returns:
            List of resources.
        """
        return []

    async def list_resources_async(
        self,
        filter: Optional[str] = None
    ) -> AsyncIterator[Resource]:
        """List all resources asynchronously.

        Yields:
            Resource objects.
        """
        yield Resource(id="1", name="Test")

    def create_resource(
        self,
        options: ResourceCreateOptions
    ) -> Resource:
        """Create a new resource.

        Args:
            options: Creation options including name and tags.

        Returns:
            The created resource.
        """
        return Resource(id="new", name=options.name, tags=options.tags)

    def delete_resource(self, resource_id: str) -> None:
        """Delete a resource.

        Args:
            resource_id: The resource to delete.
        """
        pass

    @classmethod
    def from_connection_string(
        cls,
        connection_string: str,
        **kwargs
    ) -> "SampleClient":
        """Create client from connection string.

        Args:
            connection_string: The connection string.
            **kwargs: Additional options.

        Returns:
            A new SampleClient instance.
        """
        # Parse connection string
        return cls(endpoint="https://example.com", **kwargs)

    @staticmethod
    def parse_resource_id(resource_id: str) -> Dict[str, str]:
        """Parse a resource ID into components.

        Args:
            resource_id: The resource ID to parse.

        Returns:
            Dictionary of ID components.
        """
        return {"id": resource_id}


class WidgetClient:
    """Subclient for widget operations."""

    def __init__(self, parent: SampleClient) -> None:
        self._parent = parent

    def list_widgets(self) -> List[str]:
        """List widgets."""
        return [self._parent.endpoint]


class EmptyClient:
    """Client with no methods, only subclient properties."""

    @property
    def widgets(self) -> WidgetClient:
        """Get the widgets subclient."""
        return WidgetClient(SampleClient("https://example.com"))


class RecommendationsClientBase:
    """Base class for recommendations operations."""


class RecommendationsClientImpl(RecommendationsClientBase):
    """Implementation for recommendations operations."""

    def __init__(self, parent: SampleClient) -> None:
        self._parent = parent

    def list_recommendations(self) -> List[str]:
        """List recommendations."""
        return [f"{self._parent.endpoint}/recommendations"]


class InterfaceClient:
    """Client with interface-typed subclient."""

    @property
    def recommendations(self) -> RecommendationsClientBase:
        """Get the recommendations subclient."""
        return RecommendationsClientImpl(SampleClient("https://example.com"))


def create_default_client(endpoint: str) -> SampleClient:
    """Factory function to create a client with defaults.

    Args:
        endpoint: The service endpoint.

    Returns:
        A configured SampleClient.
    """
    return SampleClient(endpoint)


async def batch_get_resources(
    client: SampleClient,
    ids: List[str]
) -> List[Resource]:
    """Get multiple resources in batch.

    Args:
        client: The client to use.
        ids: List of resource IDs.

    Returns:
        List of resources.
    """
    return [await client.get_resource_async(id) for id in ids]
