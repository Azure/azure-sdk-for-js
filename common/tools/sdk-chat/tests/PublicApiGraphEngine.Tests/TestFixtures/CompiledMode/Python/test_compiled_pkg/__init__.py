# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

"""
Test package demonstrating scenarios where source-based engine fails.

SOURCE LIMITATION: The __all__ list below is computed dynamically at runtime.
The AST parser sees `__all__ = _build_all()` but cannot evaluate _build_all()
because it doesn't execute code — it just parses syntax trees. So it cannot
determine which symbols are public.

COMPILED (inspect): importlib.import_module() executes this code, then
getattr(mod, '__all__') returns the resolved list ["ServiceClient", "ServiceConfig",
"ServiceError"]. 100% accurate public API.
"""

from __future__ import annotations

import sys
from typing import TYPE_CHECKING

# Dynamic __all__ — AST parser cannot evaluate this
def _build_all():
    """Build the public API list dynamically."""
    names = ["ServiceClient", "ServiceConfig", "ServiceError"]
    # In real SDKs, this might be conditional on platform or version
    if sys.version_info >= (3, 10):
        names.append("ServiceAsyncClient")
    return names

__all__ = _build_all()

if TYPE_CHECKING:
    # SOURCE LIMITATION: Types imported under TYPE_CHECKING are used in
    # annotations but are never actually imported at runtime in the source.
    # The AST parser sees the string annotation "HttpResponse" but cannot
    # resolve it to its source package because the import is guarded.
    #
    # COMPILED (inspect): typing.get_type_hints() resolves forward references
    # and TYPE_CHECKING imports at runtime, giving the fully qualified type.
    from http.client import HTTPResponse

    # SOURCE LIMITATION: External pip package not installed. The AST parser
    # sees this import but cannot resolve the types to the package without
    # it being installed in the environment.
    from some_http_lib import HttpClient


class ServiceConfig:
    """Configuration for the service client.

    SOURCE LIMITATION: The __init__ parameter annotations use string-form
    annotations (from __future__ import annotations). The AST parser sees
    raw strings, not resolved types. For example, "int | None" is a string,
    not a Union type.

    COMPILED (inspect): typing.get_type_hints() resolves these to actual
    type objects: int | None, str, etc.
    """

    def __init__(
        self,
        endpoint: str,
        timeout: int | None = None,
        max_retries: int = 3,
        http_client: HttpClient | None = None,
    ) -> None:
        self.endpoint = endpoint
        self.timeout = timeout
        self.max_retries = max_retries
        self.http_client = http_client


class ServiceError(Exception):
    """Error raised by the service client.

    SOURCE LIMITATION: The AST parser sees `Exception` as the base class
    string but cannot verify it's from builtins vs a local class. The
    compiled engine uses type.__mro__ to definitively classify this
    as an error type.
    """

    def __init__(self, message: str, status_code: int) -> None:
        super().__init__(message)
        self.status_code = status_code


class ServiceClient:
    """Main service client.

    Demonstrates multiple source-parsing limitations.
    """

    def __init__(self, config: ServiceConfig) -> None:
        self._config = config

    def get_resource(self, resource_id: str) -> dict[str, object]:
        """Get a resource by ID.

        SOURCE LIMITATION: The return type `dict[str, object]` is parsed as
        a string by AST. The AST parser cannot verify that `dict` and `object`
        are builtins vs locally-defined types.

        COMPILED: inspect.signature() returns the actual type objects.
        """
        return {"id": resource_id}

    def get_response(self, url: str) -> HTTPResponse:
        """Get an HTTP response.

        SOURCE LIMITATION: HTTPResponse is imported under TYPE_CHECKING.
        The AST parser either:
        1. Doesn't see the import at all (if it skips TYPE_CHECKING blocks), or
        2. Sees the string "HTTPResponse" but cannot resolve it to http.client

        COMPILED: typing.get_type_hints() resolves the forward reference
        to http.client.HTTPResponse. The dependency is accurately attributed.
        """
        raise NotImplementedError

    @property
    def endpoint(self) -> str:
        """The service endpoint."""
        return self._config.endpoint

    @classmethod
    def from_connection_string(cls, conn_str: str) -> ServiceClient:
        """Create a client from a connection string.

        SOURCE LIMITATION: The return type annotation "ServiceClient" is a
        forward reference (string). AST sees it literally. The compiled
        engine resolves it to the actual class.
        """
        return cls(ServiceConfig(endpoint=conn_str))


class ServiceAsyncClient:
    """Async version of the service client.

    SOURCE LIMITATION: This class is conditionally included in __all__
    (only on Python >= 3.10). The AST engine cannot determine this
    because it cannot evaluate the _build_all() function.

    COMPILED: If running on Python >= 3.10, inspect sees this in __all__.
    If not, it's excluded. Either way, the result is runtime-accurate.
    """

    async def get_resource(self, resource_id: str) -> dict[str, object]:
        """Get a resource asynchronously."""
        return {"id": resource_id}
