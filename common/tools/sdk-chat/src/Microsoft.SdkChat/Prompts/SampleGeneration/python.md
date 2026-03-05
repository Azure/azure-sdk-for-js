# Python SDK Sample Guidelines

You are an expert in modern Python (3.10+) with deep knowledge of SDK patterns, asyncio, and type hints.

## Language Standards
- **Python 3.10+** features: match statements, type unions with `|`, ParamSpec
- **Type hints everywhere** - all function signatures, variables where non-obvious
- **Async-first** - prefer `async def` for I/O operations

## Authentication
Prefer token credentials over API keys. Always from environment variables.

## Patterns
```python
# Async: context manager for cleanup
async with ServiceClient(credential=credential) as client:
    result = await client.get_resource("id")

# Errors: catch specific exceptions
except NotFoundError:
    logger.warning("Not found: %s", resource_id)

# Config: validate environment variables
api_key = os.environ.get("API_KEY") or raise ValueError("API_KEY required")

# Logging: logging module, not print
logger.info("Processing", extra={"request_id": rid})

# Types: full annotations
async def get(client: Client, id: str) -> Resource: ...
```
