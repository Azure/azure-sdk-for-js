#!/usr/bin/env python3
"""
Graph public API surface from Python packages.
Outputs JSON with classes, methods, functions, and their signatures.
"""

import ast
import collections
import importlib
import inspect
import json
import sys
import os
import re
import types
from pathlib import Path
from typing import Any
import typing

# Try to import TOML parser (prefer stdlib tomllib in 3.11+, fallback to tomli)
try:
    import tomllib  # Python 3.11+
    _HAS_TOML = True
except ImportError:
    try:
        import tomli as tomllib  # pip install tomli for <3.11
        _HAS_TOML = True
    except ImportError:
        _HAS_TOML = False


# =============================================================================
# Builtin Type Detection
# =============================================================================

def _build_builtins_set() -> frozenset[str]:
    """
    Build the set of Python builtin type names dynamically.

    Only includes truly universal names that are always available without
    imports (builtins module) and standard typing constructs. Types from
    stdlib packages like os, json, http etc. are NOT included — they are
    tracked as dependencies since they carry useful API surface information.
    """
    names: set[str] = set()

    # 1. builtins — all builtin names (types, exceptions, functions)
    import builtins
    names.update(name for name in dir(builtins) if not name.startswith("_"))

    # 2. typing — all public typing constructs
    import typing
    names.update(getattr(typing, "__all__", []))
    # Also grab names that aren't in __all__ but are commonly used in annotations
    names.update(
        name for name in dir(typing)
        if not name.startswith("_") and name[0].isupper()
    )

    # 3. collections.abc — abstract base classes
    import collections.abc
    names.update(
        name for name in dir(collections.abc)
        if not name.startswith("_") and name[0].isupper()
    )

    # 4. abc module
    import abc
    names.update(["ABC", "ABCMeta", "abstractmethod"])

    return frozenset(names)


PYTHON_BUILTINS = _build_builtins_set()

# Packages that are part of Python stdlib (not external dependencies).
# Uses sys.stdlib_module_names (Python 3.10+) for precise, version-aware detection.
# This automatically picks up new stdlib modules (e.g., tomllib in 3.11) and
# correctly excludes removed ones (e.g., distutils in 3.12).
import sys as _sys
PYTHON_STDLIB_PACKAGES: frozenset[str] = _sys.stdlib_module_names


def is_builtin_type(type_name: str) -> bool:
    """Check if a type name is a Python builtin (always available without imports)."""
    # Strip generic parameters (e.g., List[str] -> List)
    base_type = type_name.split("[")[0].strip()
    # Handle qualified names (e.g., typing.List -> List)
    if "." in base_type:
        # Qualified stdlib names (e.g., os.PathLike, json.JSONDecoder) are NOT builtins —
        # they require imports and should be tracked as dependencies.
        return False
    return base_type in PYTHON_BUILTINS


def is_stdlib_package(package_name: str) -> bool:
    """Check if a package is part of Python stdlib."""
    # Handle subpackages (e.g., collections.abc -> collections)
    root_pkg = package_name.split(".")[0]
    return root_pkg in PYTHON_STDLIB_PACKAGES


# =============================================================================
# Type Reference Collection (AST-Based)
# =============================================================================

def collect_types_from_annotation(ann: ast.expr | None, refs: set[str]) -> None:
    """
    Recursively collect type names from an annotation AST node.
    Properly handles:
    - Simple names: int, MyClass
    - Attribute access: module.Type
    - Generic subscripts: List[str], Dict[str, int]
    - Union types: Union[A, B], A | B
    - Optional types: Optional[X]
    """
    if ann is None:
        return

    if isinstance(ann, ast.Name):
        name = ann.id
        if not is_builtin_type(name):
            refs.add(name)

    elif isinstance(ann, ast.Attribute):
        full_name = _get_attribute_name(ann)
        if full_name and not is_builtin_type(full_name):
            refs.add(full_name)

    elif isinstance(ann, ast.Subscript):
        collect_types_from_annotation(ann.value, refs)
        if isinstance(ann.slice, ast.Tuple):
            for elt in ann.slice.elts:
                collect_types_from_annotation(elt, refs)
        else:
            collect_types_from_annotation(ann.slice, refs)

    elif isinstance(ann, ast.BinOp) and isinstance(ann.op, ast.BitOr):
        collect_types_from_annotation(ann.left, refs)
        collect_types_from_annotation(ann.right, refs)

    elif isinstance(ann, ast.Constant):
        if isinstance(ann.value, str):
            try:
                parsed = ast.parse(ann.value, mode='eval')
                collect_types_from_annotation(parsed.body, refs)
            except SyntaxError:
                pass

    elif isinstance(ann, ast.Tuple):
        for elt in ann.elts:
            collect_types_from_annotation(elt, refs)

    elif isinstance(ann, ast.List):
        for elt in ann.elts:
            collect_types_from_annotation(elt, refs)


def _get_attribute_name(node: ast.Attribute) -> str | None:
    """Get the full dotted name from an Attribute node."""
    parts: list[str] = []
    current: ast.expr = node
    while isinstance(current, ast.Attribute):
        parts.append(current.attr)
        current = current.value
    if isinstance(current, ast.Name):
        parts.append(current.id)
        return ".".join(reversed(parts))
    return None


class TypeReferenceCollector:
    """
    Collects type references during engine run using proper AST traversal.
    """
    def __init__(self) -> None:
        self.refs: set[str] = set()
        self.defined_types: set[str] = set()
        self.resolved_packages: dict[str, str] = {}
        self.import_map: dict[str, str] = {}  # simple_name -> module_path

    def add_defined_type(self, name: str) -> None:
        """Register a locally defined type."""
        self.defined_types.add(name.split("[")[0])

    def collect_from_annotation(self, ann: ast.expr | None) -> None:
        """Collect type references from an annotation AST node."""
        collect_types_from_annotation(ann, self.refs)

    def collect_imports(self, tree: ast.Module) -> None:
        """
        Collect import statements from an AST module, including those inside
        TYPE_CHECKING blocks. Builds a mapping from simple names to their
        source module paths (e.g., "HTTPResponse" -> "http.client").
        """
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom):
                if not node.module or node.module == "__future__":
                    continue
                for alias in (node.names or []):
                    name = alias.asname or alias.name
                    if name != "*" and not is_builtin_type(name):
                        self.import_map[name] = node.module
            elif isinstance(node, ast.Import):
                for alias in node.names:
                    name = alias.asname or alias.name
                    if not is_builtin_type(name):
                        self.import_map[name] = alias.name

    def get_external_refs(self) -> set[str]:
        """Get type references that are not locally defined and not builtins."""
        return {
            name for name in self.refs
            if name.split("[")[0] not in self.defined_types and not is_builtin_type(name)
        }

    def resolve_package(self, type_name: str, installed_packages: set[str]) -> str | None:
        """
        Try to resolve the package a type came from.
        Uses import map first, then dotted-name analysis.
        """
        if type_name in self.resolved_packages:
            return self.resolved_packages[type_name]

        # Check import map — deterministic resolution from source imports
        base_name = type_name.split("[")[0]
        if base_name in self.import_map:
            module_path = self.import_map[base_name]
            root_pkg = module_path.split(".")[0]
            if root_pkg in installed_packages:
                self.resolved_packages[type_name] = root_pkg
                return root_pkg

        # Fall back to dotted-name prefix matching
        if "." in type_name:
            parts = type_name.split(".")
            for i in range(len(parts) - 1, 0, -1):
                pkg = ".".join(parts[:i])
                if pkg in installed_packages:
                    self.resolved_packages[type_name] = pkg
                    return pkg

        return None

    def clear(self) -> None:
        """Reset the collector for a new engine run."""
        self.refs.clear()
        self.defined_types.clear()
        self.resolved_packages.clear()
        self.import_map.clear()


# Global collector instance
_type_collector = TypeReferenceCollector()


# =============================================================================
# Entry Point Detection
# =============================================================================

def resolve_entry_point_symbols(root_path: Path, package_name: str) -> tuple[set[str], dict[str, str]]:
    """
    Resolve the public API entry points from package configuration.

    Entry points are determined by:
    1. __all__ in __init__.py (explicit exports)
    2. Re-exported symbols from __init__.py (from X import Y)

    Returns:
        Tuple of (entry_symbols, external_reexports)
        - entry_symbols: set of all exported symbol names
        - external_reexports: dict mapping symbol name to external package name
    """
    entry_symbols: set[str] = set()
    external_reexports: dict[str, str] = {}

    init_file = find_main_init_file(root_path, package_name)
    if init_file:
        all_exports = extract_all_from_init(init_file)
        if all_exports:
            entry_symbols.update(all_exports)

        local_reexports, ext_reexports = extract_reexports_from_init(init_file)
        entry_symbols.update(local_reexports)
        entry_symbols.update(ext_reexports.keys())
        external_reexports.update(ext_reexports)

    return entry_symbols, external_reexports


def find_main_init_file(root_path: Path, package_name: str) -> Path | None:
    """Find the main package __init__.py file."""
    pkg_dir_name = package_name.replace('-', '_').replace('.', '/')

    search_paths = [
        root_path / pkg_dir_name / "__init__.py",
        root_path / "src" / pkg_dir_name / "__init__.py",
        root_path / package_name / "__init__.py",
        root_path / "src" / package_name / "__init__.py",
    ]

    for path in search_paths:
        if path.exists():
            return path

    # Fallback: find first __init__.py in non-test directory
    for init in sorted(root_path.rglob("__init__.py"), key=lambda p: len(str(p))):
        path_str = str(init).lower()
        if not any(x in path_str for x in ['test', 'venv', '.venv', '__pycache__', 'site-packages']):
            return init

    return None


def extract_all_from_init(init_path: Path) -> list[str]:
    """Extract __all__ list from __init__.py."""
    try:
        code = init_path.read_text(encoding='utf-8')
        tree = ast.parse(code)
    except (SyntaxError, UnicodeDecodeError):
        return []

    for node in ast.iter_child_nodes(tree):
        if isinstance(node, ast.Assign):
            for target in node.targets:
                if isinstance(target, ast.Name) and target.id == '__all__':
                    if isinstance(node.value, ast.List):
                        return [
                            elt.value for elt in node.value.elts
                            if isinstance(elt, ast.Constant) and isinstance(elt.value, str)
                        ]
    return []


def extract_reexports_from_init(init_path: Path) -> tuple[set[str], dict[str, str]]:
    """
    Extract re-exported symbols from __init__.py.

    Handles:
    - from .module import Class
    - from .module import Class as Alias
    - from external_package import ExternalClass

    Returns:
        Tuple of (local_symbols, external_reexports)
    """
    try:
        code = init_path.read_text(encoding='utf-8')
        tree = ast.parse(code)
    except (SyntaxError, UnicodeDecodeError):
        return set(), {}

    local_symbols: set[str] = set()
    external_reexports: dict[str, str] = {}

    for node in ast.iter_child_nodes(tree):
        if isinstance(node, ast.ImportFrom):
            module = node.module or ""
            is_relative = node.level > 0
            is_external = not is_relative and module and not module.startswith('.')

            if is_external:
                # Use the full module path as the re-export source.
                # We can't reliably map import paths to distribution package
                # names from AST alone (e.g., PIL → Pillow, dateutil →
                # python-dateutil), so we report what we know: the module path.
                base_pkg = module

            for alias in node.names:
                if alias.name == '*':
                    continue
                exported_name = alias.asname if alias.asname else alias.name
                if is_external:
                    external_reexports[exported_name] = base_pkg
                else:
                    local_symbols.add(exported_name)

    return local_symbols, external_reexports


# =============================================================================
# Core Engine Functions
# =============================================================================

def get_docstring(node: ast.AST) -> str | None:
    """Extract first line of docstring."""
    doc = ast.get_docstring(node)
    if not doc:
        return None
    first_line = doc.split('\n')[0].strip()
    return first_line[:150] + '...' if len(first_line) > 150 else first_line

def format_annotation(ann: ast.expr | None) -> str | None:
    """Convert annotation AST to string."""
    if ann is None:
        return None
    return ast.unparse(ann)

def extract_parameters(node: ast.FunctionDef | ast.AsyncFunctionDef) -> list[dict[str, Any]]:
    """Extract structured parameter information."""
    args_obj = node.args
    params: list[dict[str, Any]] = []

    positional = list(getattr(args_obj, "posonlyargs", [])) + list(args_obj.args)
    positional_defaults = list(args_obj.defaults)
    default_start = len(positional) - len(positional_defaults)

    for i, arg in enumerate(positional):
        param: dict[str, Any] = {
            "name": arg.arg,
            "kind": "positional",
        }
        if arg.annotation:
            param["type"] = ast.unparse(arg.annotation)
        if i >= default_start and positional_defaults:
            default_expr = positional_defaults[i - default_start]
            if default_expr is not None:
                param["default"] = ast.unparse(default_expr)
        params.append(param)

    if args_obj.vararg:
        vararg = args_obj.vararg
        param: dict[str, Any] = {
            "name": vararg.arg,
            "kind": "var_positional",
        }
        if vararg.annotation:
            param["type"] = ast.unparse(vararg.annotation)
        params.append(param)

    for kw_arg, kw_default in zip(args_obj.kwonlyargs, args_obj.kw_defaults):
        param = {
            "name": kw_arg.arg,
            "kind": "keyword_only",
        }
        if kw_arg.annotation:
            param["type"] = ast.unparse(kw_arg.annotation)
        if kw_default is not None:
            param["default"] = ast.unparse(kw_default)
        params.append(param)

    if args_obj.kwarg:
        kwarg = args_obj.kwarg
        param = {
            "name": kwarg.arg,
            "kind": "var_keyword",
        }
        if kwarg.annotation:
            param["type"] = ast.unparse(kwarg.annotation)
        params.append(param)

    return params

def get_deprecation_info(node: ast.AST) -> tuple[bool, str | None]:
    """Extract deprecation info from decorators (PEP 702 and common patterns)."""
    decorators = getattr(node, "decorator_list", [])
    for dec in decorators:
        if isinstance(dec, ast.Name) and dec.id == "deprecated":
            return True, None
        if isinstance(dec, ast.Attribute) and dec.attr == "deprecated":
            return True, None
        if isinstance(dec, ast.Call):
            func = dec.func
            if (isinstance(func, ast.Name) and func.id == "deprecated") or (
                isinstance(func, ast.Attribute) and func.attr == "deprecated"
            ):
                if dec.args and isinstance(dec.args[0], ast.Constant) and isinstance(dec.args[0].value, str):
                    return True, dec.args[0].value
                return True, None
    return False, None

def extract_function(
    node: ast.FunctionDef | ast.AsyncFunctionDef,
    entry_point_symbols: set[str] | None = None,
    external_reexports: dict[str, str] | None = None
) -> dict[str, Any]:
    """Extract function/method info and collect type references."""
    args = []
    for arg in node.args.args:
        arg_str = arg.arg
        if arg.annotation:
            arg_str += f": {ast.unparse(arg.annotation)}"
            _type_collector.collect_from_annotation(arg.annotation)
        args.append(arg_str)

    # Handle *args, **kwargs
    if node.args.vararg:
        va = node.args.vararg
        va_str = f"*{va.arg}"
        if va.annotation:
            va_str += f": {ast.unparse(va.annotation)}"
            _type_collector.collect_from_annotation(va.annotation)
        args.append(va_str)
    if node.args.kwarg:
        kw = node.args.kwarg
        kw_str = f"**{kw.arg}"
        if kw.annotation:
            kw_str += f": {ast.unparse(kw.annotation)}"
            _type_collector.collect_from_annotation(kw.annotation)
        args.append(kw_str)

    sig = ", ".join(args)

    result: dict[str, Any] = {
        "name": node.name,
        "sig": sig,
    }

    params = extract_parameters(node)
    if params:
        result["params"] = params

    ret = format_annotation(node.returns)
    if ret:
        result["ret"] = ret
        _type_collector.collect_from_annotation(node.returns)

    doc = get_docstring(node)
    if doc:
        result["doc"] = doc

    if isinstance(node, ast.AsyncFunctionDef):
        result["async"] = True

    is_deprecated, deprecated_msg = get_deprecation_info(node)
    if is_deprecated:
        result["deprecated"] = True
    if deprecated_msg:
        result["deprecatedMsg"] = deprecated_msg

    # Mark as entry point if in the exported symbols
    if entry_point_symbols and node.name in entry_point_symbols:
        result["entryPoint"] = True

    # Mark if re-exported from external package
    if external_reexports and node.name in external_reexports:
        result["reExportedFrom"] = external_reexports[node.name]

    # Check decorators
    for dec in node.decorator_list:
        if isinstance(dec, ast.Name):
            if dec.id == "classmethod":
                result["classmethod"] = True
            elif dec.id == "staticmethod":
                result["staticmethod"] = True
            elif dec.id == "property":
                result["property"] = True

    return result

def extract_class(
    node: ast.ClassDef,
    entry_point_symbols: set[str] | None = None,
    external_reexports: dict[str, str] | None = None
) -> dict[str, Any]:
    """Extract class info and collect type references."""
    bases = []
    for b in node.bases:
        if isinstance(b, (ast.Name, ast.Attribute, ast.Subscript)):
            bases.append(ast.unparse(b))
            _type_collector.collect_from_annotation(b)

    result: dict[str, Any] = {
        "name": node.name,
    }

    # Register this class as a defined type
    _type_collector.add_defined_type(node.name)

    if bases:
        result["base"] = ", ".join(bases)

    doc = get_docstring(node)
    if doc:
        result["doc"] = doc

    is_deprecated, deprecated_msg = get_deprecation_info(node)
    if is_deprecated:
        result["deprecated"] = True
    if deprecated_msg:
        result["deprecatedMsg"] = deprecated_msg

    # Mark as entry point if in the exported symbols
    if entry_point_symbols and node.name in entry_point_symbols:
        result["entryPoint"] = True

    # Mark if re-exported from external package
    if external_reexports and node.name in external_reexports:
        result["reExportedFrom"] = external_reexports[node.name]

    methods = []
    properties = []

    # Collect @overload-decorated signatures so we emit those instead of
    # the generic implementation signature (which is often just *args/**kwargs).
    overload_map: dict[str, list[dict[str, Any]]] = {}

    def _is_overload_decorated(func_node: ast.FunctionDef | ast.AsyncFunctionDef) -> bool:
        for dec in func_node.decorator_list:
            if isinstance(dec, ast.Name) and dec.id == "overload":
                return True
            if isinstance(dec, ast.Attribute) and dec.attr == "overload":
                return True
        return False

    for item in node.body:
        if isinstance(item, (ast.FunctionDef, ast.AsyncFunctionDef)):
            # Skip private (single underscore) but keep dunder methods
            if item.name.startswith('_') and not item.name.startswith('__'):
                continue
            # Skip private dunders (double underscore not ending with double)
            if item.name.startswith('__') and not item.name.endswith('__'):
                continue

            if _is_overload_decorated(item):
                func_info = extract_function(item)
                overload_map.setdefault(item.name, []).append(func_info)
                continue

            func_info = extract_function(item)
            if func_info.get("property"):
                del func_info["property"]
                # Use ret annotation first (most precise), fall back to sig parsing
                prop_type = func_info.get("ret")
                if not prop_type:
                    sig = func_info.get("sig", "")
                    prop_type = sig.split(" -> ")[-1] if " -> " in sig else None
                prop_info = {"name": func_info["name"], "type": prop_type, "doc": func_info.get("doc")}
                if func_info.get("deprecated"):
                    prop_info["deprecated"] = True
                if func_info.get("deprecatedMsg"):
                    prop_info["deprecatedMsg"] = func_info.get("deprecatedMsg")
                properties.append(prop_info)
            else:
                # If we have @overload signatures for this method, emit those
                # instead of the (typically generic *args/**kwargs) implementation.
                if item.name in overload_map:
                    overloads = overload_map.pop(item.name)
                    # Carry over docstring from implementation if overloads lack one
                    impl_doc = func_info.get("doc")
                    for ol in overloads:
                        if not ol.get("doc") and impl_doc:
                            ol["doc"] = impl_doc
                        ol["overload"] = True
                        methods.append(ol)
                else:
                    methods.append(func_info)

    # Append any remaining @overload signatures that had no implementation body
    for overloads in overload_map.values():
        for ol in overloads:
            ol["overload"] = True
            methods.append(ol)

    if methods:
        result["methods"] = methods
    if properties:
        result["properties"] = properties

    return result

def extract_module(
    file_path: Path,
    root_path: Path,
    entry_point_symbols: set[str] | None = None,
    external_reexports: dict[str, str] | None = None
) -> dict[str, Any]:
    """Extract module info."""
    try:
        code = file_path.read_text(encoding='utf-8')
        tree = ast.parse(code)
    except (SyntaxError, UnicodeDecodeError):
        return {}

    # Collect imports from this module (including TYPE_CHECKING blocks)
    _type_collector.collect_imports(tree)

    # Calculate module name
    rel_path = file_path.relative_to(root_path)
    module_name = str(rel_path).replace('/', '.').replace('\\', '.').replace('.py', '')
    if module_name.endswith('.__init__'):
        module_name = module_name[:-9]

    classes = []
    functions = []
    overload_map: dict[str, list[dict[str, Any]]] = {}

    def _is_overload_decorated(func_node: ast.FunctionDef | ast.AsyncFunctionDef) -> bool:
        for dec in func_node.decorator_list:
            if isinstance(dec, ast.Name) and dec.id == "overload":
                return True
            if isinstance(dec, ast.Attribute) and dec.attr == "overload":
                return True
        return False

    for node in ast.iter_child_nodes(tree):
        if isinstance(node, ast.ClassDef):
            if not node.name.startswith('_'):
                classes.append(extract_class(node, entry_point_symbols, external_reexports))
        elif isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            if not node.name.startswith('_'):
                if _is_overload_decorated(node):
                    func_info = extract_function(node, entry_point_symbols, external_reexports)
                    overload_map.setdefault(node.name, []).append(func_info)
                else:
                    func_info = extract_function(node, entry_point_symbols, external_reexports)
                    if node.name in overload_map:
                        overloads = overload_map.pop(node.name)
                        impl_doc = func_info.get("doc")
                        for ol in overloads:
                            if not ol.get("doc") and impl_doc:
                                ol["doc"] = impl_doc
                            ol["overload"] = True
                            functions.append(ol)
                    else:
                        functions.append(func_info)

    # Append any remaining @overload signatures without implementation
    for overloads in overload_map.values():
        for ol in overloads:
            ol["overload"] = True
            functions.append(ol)

    if not classes and not functions:
        return {}

    result: dict[str, Any] = {"name": module_name}
    if classes:
        result["classes"] = classes
    if functions:
        result["functions"] = functions

    return result

def find_package_name(root_path: Path) -> str:
    """Detect package name from pyproject.toml, setup.py, or directory structure."""
    # Check pyproject.toml
    pyproject = root_path / "pyproject.toml"
    if pyproject.exists():
        # Use proper TOML parser if available (handles multiline strings, escape sequences, etc.)
        if _HAS_TOML:
            try:
                with open(pyproject, "rb") as f:
                    data = tomllib.load(f)
                # Try [project].name (PEP 621) first
                name = data.get("project", {}).get("name")
                if name:
                    return name
                # Fall back to [tool.poetry].name
                name = data.get("tool", {}).get("poetry", {}).get("name")
                if name:
                    return name
                # Fall back to [tool.flit.metadata].module
                name = data.get("tool", {}).get("flit", {}).get("metadata", {}).get("module")
                if name:
                    return name
            except Exception:
                pass  # Fall through to regex fallback

        # Regex fallback (less robust but works without TOML dependencies)
        try:
            content = pyproject.read_text(encoding='utf-8')
            match = re.search(r'name\s*=\s*["\']([^"\']+)["\']', content)
            if match:
                return match.group(1)
        except Exception:
            pass

    # Check setup.py
    setup_py = root_path / "setup.py"
    if setup_py.exists():
        try:
            content = setup_py.read_text(encoding='utf-8')
            match = re.search(r'name\s*=\s*["\']([^"\']+)["\']', content)
            if match:
                return match.group(1)
        except Exception:
            pass

    # Find first package with __init__.py
    for init in sorted(root_path.rglob("__init__.py"), key=lambda p: len(str(p))):
        if "test" not in str(init).lower() and "_generated" not in str(init):
            return init.parent.name

    return root_path.name

def extract_package(root_path: Path) -> dict[str, Any]:
    """Extract entire package API."""
    package_name = find_package_name(root_path)

    # Clear the type collector for this engine run
    _type_collector.clear()

    # Resolve entry point symbols and external re-exports from package configuration
    entry_point_symbols, external_reexports = resolve_entry_point_symbols(root_path, package_name)

    modules = []
    for py_file in sorted(root_path.rglob("*.py")):
        # Skip tests, caches, venvs, and build artifacts
        path_str = str(py_file)
        # Allow TestFixtures (used for testing engines themselves)
        if 'TestFixtures' not in path_str and any(skip in path_str for skip in [
            '__pycache__',
            'venv', '.venv',
            'test_', '_test.py', '/tests/', '\\tests\\',
            '.tox', '.nox',
            'site-packages',
            '/build/', '\\build\\',
            '/dist/', '\\dist\\',
            '.eggs', '.egg-info',
            'node_modules'
        ]):
            continue
        # Skip private modules except __init__
        if py_file.name.startswith('_') and py_file.name != '__init__.py':
            continue

        module = extract_module(py_file, root_path, entry_point_symbols, external_reexports)
        if module:
            modules.append(module)

    result: dict[str, Any] = {
        "package": package_name,
        "modules": modules
    }

    # Resolve transitive dependencies
    dependencies = resolve_transitive_dependencies(result, root_path)
    if dependencies:
        result["dependencies"] = dependencies

    return result


# =============================================================================
# Transitive Dependency Resolution
# =============================================================================

def find_installed_packages(root_path: Path) -> dict[str, Path]:
    """Find installed packages in site-packages or venv."""
    packages: dict[str, Path] = {}

    search_paths = [
        root_path / "venv" / "lib",
        root_path / ".venv" / "lib",
    ]

    # Also check system site-packages via sys.path
    for path in sys.path:
        if "site-packages" in path:
            search_paths.append(Path(path))

    for search_path in search_paths:
        if not search_path.exists():
            continue

        site_packages_paths = list(search_path.glob("**/site-packages"))
        for site_packages in site_packages_paths:
            if not site_packages.is_dir():
                continue

            for item in site_packages.iterdir():
                if item.is_dir() and not item.name.startswith(('_', '.')):
                    if (item / "__init__.py").exists() or (item / "__init__.pyi").exists():
                        pkg_name = item.name
                        if pkg_name not in packages:
                            packages[pkg_name] = item

    return packages


def extract_type_from_package(type_name: str, package_path: Path) -> dict[str, Any] | None:
    """Try to extract a type definition from a package."""
    for pattern in ["**/*.pyi", "**/*.py"]:
        for file_path in package_path.glob(pattern):
            if file_path.name.startswith('_') and file_path.name != '__init__.py' and file_path.name != '__init__.pyi':
                continue

            try:
                code = file_path.read_text(encoding='utf-8')
                tree = ast.parse(code)
            except (SyntaxError, UnicodeDecodeError):
                continue

            for node in ast.iter_child_nodes(tree):
                if isinstance(node, ast.ClassDef) and node.name == type_name:
                    return extract_class(node)

    return None


def resolve_transitive_dependencies(api: dict[str, Any], root_path: Path) -> list[dict[str, Any]]:
    """
    Resolve types referenced in the API that come from external packages.
    Uses import map for deterministic resolution, then falls back to
    installed package scanning.
    """
    external_refs = _type_collector.get_external_refs()

    if not external_refs:
        return []

    installed_packages = find_installed_packages(root_path)
    installed_package_names = set(installed_packages.keys())

    dependencies: dict[str, dict[str, Any]] = {}

    for type_name in external_refs:
        pkg_name = _type_collector.resolve_package(type_name, installed_package_names)

        if pkg_name and pkg_name in installed_packages:
            pkg_path = installed_packages[pkg_name]
            type_info = extract_type_from_package(type_name.split(".")[-1], pkg_path)
            if type_info:
                if pkg_name not in dependencies:
                    dependencies[pkg_name] = {"package": pkg_name, "isStdlib": is_stdlib_package(pkg_name), "classes": []}
                dependencies[pkg_name]["classes"].append(type_info)
                continue

        # Fall back to searching all installed packages
        found = False
        for pkg_name_search, pkg_path in installed_packages.items():
            type_info = extract_type_from_package(type_name.split(".")[-1], pkg_path)
            if type_info:
                if pkg_name_search not in dependencies:
                    dependencies[pkg_name_search] = {"package": pkg_name_search, "isStdlib": is_stdlib_package(pkg_name_search), "classes": []}
                dependencies[pkg_name_search]["classes"].append(type_info)
                found = True
                break

        # If still unresolved, use import map to record dependency without type details.
        # Skip stdlib packages — they are tracked via isStdlib flag only when their
        # types can be fully resolved from installed packages.
        if not found:
            base_name = type_name.split("[")[0]
            if base_name in _type_collector.import_map:
                module_path = _type_collector.import_map[base_name]
                root_pkg = module_path.split(".")[0]
                if not is_stdlib_package(root_pkg) and root_pkg not in dependencies:
                    dependencies[root_pkg] = {"package": root_pkg, "isStdlib": False}

    result = []
    for dep_info in dependencies.values():
        if not dep_info.get("classes"):
            dep_info.pop("classes", None)
        result.append(dep_info)

    return sorted(result, key=lambda d: d["package"])


# =============================================================================
# Stub Formatting
# =============================================================================

def format_python_stubs(api: dict[str, Any]) -> str:
    """Format as Python stub syntax."""
    lines = [
        f"# {api['package']} - Public API Surface",
        f"# Graphed by PublicApiGraphEngine.Python",
        "",
    ]

    for module in api.get("modules", []):
        lines.append(f"# Module: {module['name']}")
        lines.append("")

        for func in module.get("functions", []):
            if func.get("doc"):
                lines.append(f'"""{func["doc"]}"""')
            if func.get("overload"):
                lines.append("@overload")
            async_prefix = "async " if func.get("async") else ""
            ret_type = f' -> {func["ret"]}' if func.get("ret") else ""
            lines.append(f'{async_prefix}def {func["name"]}({func["sig"]}){ret_type}: ...')
            lines.append("")

        for cls in module.get("classes", []):
            base = f'({cls["base"]})' if cls.get("base") else ""
            lines.append(f'class {cls["name"]}{base}:')
            if cls.get("doc"):
                lines.append(f'    """{cls["doc"]}"""')

            for prop in cls.get("properties", []):
                type_hint = f": {prop['type']}" if prop.get("type") else ""
                lines.append(f'    {prop["name"]}{type_hint}')

            for method in cls.get("methods", []):
                if method.get("doc"):
                    lines.append(f'    """{method["doc"]}"""')
                decorators = []
                if method.get("overload"):
                    decorators.append("@overload")
                if method.get("classmethod"):
                    decorators.append("@classmethod")
                if method.get("staticmethod"):
                    decorators.append("@staticmethod")
                for dec in decorators:
                    lines.append(f'    {dec}')
                async_prefix = "async " if method.get("async") else ""
                ret_type = f' -> {method["ret"]}' if method.get("ret") else ""
                lines.append(f'    {async_prefix}def {method["name"]}({method["sig"]}){ret_type}: ...')

            if not cls.get("methods") and not cls.get("properties"):
                lines.append("    ...")
            lines.append("")

    # Add dependency types section
    dependencies = api.get("dependencies", [])
    if dependencies:
        lines.append("")
        lines.append("# " + "=" * 77)
        lines.append("# Dependency Types (from external packages)")
        lines.append("# " + "=" * 77)
        lines.append("")

        for dep in dependencies:
            pkg_name = dep.get("package", "unknown")
            if dep.get("isStdlib", False):
                continue
            lines.append(f"# From: {pkg_name}")
            lines.append("")

            for cls in dep.get("classes", []):
                base = f'({cls["base"]})' if cls.get("base") else ""
                lines.append(f'class {cls["name"]}{base}:')
                if cls.get("doc"):
                    lines.append(f'    """{cls["doc"]}"""')

                for prop in cls.get("properties", []):
                    type_hint = f": {prop['type']}" if prop.get("type") else ""
                    lines.append(f'    {prop["name"]}{type_hint}')

                for method in cls.get("methods", []):
                    if method.get("doc"):
                        lines.append(f'    """{method["doc"]}"""')
                    decorators = []
                    if method.get("overload"):
                        decorators.append("@overload")
                    if method.get("classmethod"):
                        decorators.append("@classmethod")
                    if method.get("staticmethod"):
                        decorators.append("@staticmethod")
                    for dec in decorators:
                        lines.append(f'    {dec}')
                    async_prefix = "async " if method.get("async") else ""
                    ret_type = f' -> {method["ret"]}' if method.get("ret") else ""
                    lines.append(f'    {async_prefix}def {method["name"]}({method["sig"]}){ret_type}: ...')

                if not cls.get("methods") and not cls.get("properties"):
                    lines.append("    ...")
                lines.append("")

    return "\n".join(lines)


# =============================================================================
# Usage Analysis
# =============================================================================

def analyze_usage(samples_path: Path, api: dict[str, Any]) -> dict[str, Any]:
    """
    Analyze sample files to find which API operations are used.
    Uses AST-based variable tracking and API return type maps for precise
    receiver resolution — no name-based heuristics.
    """
    # Build set of client methods from API using graph-based reachability
    all_classes: list[dict[str, Any]] = []
    all_type_names: set[str] = set()
    for module in api.get("modules", []):
        for cls in module.get("classes", []):
            all_classes.append(cls)
            all_type_names.add(cls.get("name", "").split("[")[0])

    # Build type reference graph
    references: dict[str, set[str]] = {}
    for cls in all_classes:
        name = cls.get("name", "").split("[")[0]
        references[name] = get_referenced_types(cls, all_type_names)

    referenced_by: dict[str, int] = {}
    for refs in references.values():
        for ref in refs:
            referenced_by[ref] = referenced_by.get(ref, 0) + 1

    operation_types: set[str] = set()
    for cls in all_classes:
        if cls.get("methods"):
            operation_types.add(cls.get("name", "").split("[")[0])

    # Root classes are determined structurally:
    # 1. Classes marked as entry points (exported from __init__.py) with methods
    # 2. Classes not referenced by any other API type that have methods or reference operation types
    root_classes = [
        cls for cls in all_classes
        if (cls.get("entryPoint") and cls.get("methods")) or (
            cls.get("name", "").split("[")[0] not in referenced_by and (
                cls.get("methods") or
                any(ref in operation_types for ref in references.get(cls.get("name", "").split("[")[0], set()))
            )
        )
    ]

    if not root_classes:
        root_classes = [
            cls for cls in all_classes
            if cls.get("methods") or
               any(ref in operation_types for ref in references.get(cls.get("name", "").split("[")[0], set()))
        ]

    # BFS reachability from root classes
    derived_by_base: dict[str, list[dict[str, Any]]] = {}
    for cls in all_classes:
        base_name = cls.get("base")
        if not base_name:
            continue
        base_key = base_name.split("[")[0]
        derived_by_base.setdefault(base_key, []).append(cls)

    reachable: set[str] = set()
    queue: collections.deque[str] = collections.deque()

    for cls in root_classes:
        name = cls.get("name", "").split("[")[0]
        if name not in reachable:
            reachable.add(name)
            queue.append(name)

    while queue:
        current = queue.popleft()
        current_cls = next(
            (cls for cls in all_classes if cls.get("name", "").split("[")[0] == current),
            None,
        )
        if not current_cls:
            continue

        for ref in references.get(current, set()):
            if ref not in reachable:
                reachable.add(ref)
                queue.append(ref)

        for child in derived_by_base.get(current, []):
            child_name = child.get("name", "").split("[")[0]
            if child_name and child_name not in reachable:
                reachable.add(child_name)
                queue.append(child_name)

    usage_classes = [
        cls for cls in all_classes
        if cls.get("name", "").split("[")[0] in reachable and cls.get("methods")
    ]

    client_methods: dict[str, set[str]] = {}
    for cls in usage_classes:
        name = cls.get("name", "")
        methods = {m["name"] for m in cls.get("methods", [])}
        if methods:
            client_methods[name] = methods

    if not client_methods:
        return {"fileCount": 0, "covered": [], "uncovered": [], "patterns": []}

    # Build set of known client type names for type inference
    client_names = set(client_methods.keys())

    # Build return type maps from API data for precise resolution
    method_return_type_map = _build_method_return_type_map(api, client_methods)
    function_return_type_map = _build_function_return_type_map(api, client_methods)
    property_type_map = _build_property_type_map(api, client_methods)

    # Build inheritance relationships for Strategy 2 disambiguation:
    # maps each class to its set of base classes that are also client types.
    _class_bases: dict[str, set[str]] = {}
    for module in api.get("modules", []):
        for cls in module.get("classes", []):
            name = cls.get("name", "")
            base_str = cls.get("base", "")
            if name in client_methods and base_str:
                bases = {b.strip() for b in base_str.split(",") if b.strip() in client_methods}
                if bases:
                    _class_bases[name] = bases

    covered: list[dict[str, Any]] = []
    seen_ops: set[str] = set()
    patterns: set[str] = set()
    file_count = 0

    # Find all Python files in samples
    for py_file in samples_path.rglob("*.py"):
        path_parts = py_file.parts
        if any(part in ('__pycache__', 'venv', '.venv') for part in path_parts):
            continue
        filename = py_file.name
        if filename.startswith('test_') or filename.endswith('_test.py'):
            continue

        file_count += 1
        try:
            code = py_file.read_text(encoding='utf-8')
            tree = ast.parse(code)
        except (SyntaxError, UnicodeDecodeError):
            continue

        rel_path = str(py_file.relative_to(samples_path))

        # Build variable → client type map for this file
        var_types = _build_var_type_map(tree, client_names, method_return_type_map,
                                        function_return_type_map, property_type_map)

        # Use AST to find method calls with precise receiver resolution
        for node in ast.walk(tree):
            if isinstance(node, ast.Call):
                method_name, line = extract_call_info(node)
                if not method_name:
                    continue

                # Strategy 1: Resolve receiver type from variable tracking
                resolved_client = _resolve_receiver_type(
                    node, var_types, client_names,
                    method_return_type_map, function_return_type_map
                )
                if resolved_client and resolved_client in client_methods:
                    methods = client_methods[resolved_client]
                    if method_name in methods:
                        key = f"{resolved_client}.{method_name}"
                        if key not in seen_ops:
                            seen_ops.add(key)
                            covered.append({
                                "client": resolved_client,
                                "method": method_name,
                                "file": rel_path,
                                "line": getattr(node, 'lineno', 0)
                            })
                        continue

                # Strategy 2: Fall back to global method name matching
                # Only match if the method name is unique to a single client type,
                # or all candidates share an inheritance chain (inherited method).
                # (avoids false positives for common names like send, get, list)
                candidates = [
                    cn for cn, methods in client_methods.items()
                    if method_name in methods
                ]
                if len(candidates) == 1:
                    client_name = candidates[0]
                elif len(candidates) > 1:
                    # When multiple candidates exist, check if they form a
                    # single inheritance chain. A candidate is a "root" if none
                    # of its bases are also in the candidate set.
                    candidates_set = set(candidates)
                    roots = [
                        c for c in candidates
                        if not (_class_bases.get(c, set()) & candidates_set)
                    ]
                    client_name = roots[0] if len(roots) == 1 else None
                else:
                    client_name = None

                if client_name is not None:
                    key = f"{client_name}.{method_name}"
                    if key not in seen_ops:
                        seen_ops.add(key)
                        covered.append({
                            "client": client_name,
                            "method": method_name,
                            "file": rel_path,
                            "line": getattr(node, 'lineno', 0)
                        })

        # Detect patterns using AST
        detect_patterns_ast(tree, patterns)

    # Build base-class ↔ subclass mapping for cross-referencing coverage
    base_to_subclasses: dict[str, list[str]] = {}
    subclass_to_bases: dict[str, list[str]] = {}
    for module in api.get("modules", []):
        for cls in module.get("classes", []):
            name = cls.get("name", "")
            base_str = cls.get("base", "")
            if base_str:
                for base in (b.strip() for b in base_str.split(",")):
                    if base and base in client_methods:
                        base_to_subclasses.setdefault(base, []).append(name)
                        subclass_to_bases.setdefault(name, []).append(base)

    # Build uncovered list
    uncovered: list[dict[str, str]] = []
    for client_name, methods in client_methods.items():
        for method in methods:
            key = f"{client_name}.{method}"
            if key in seen_ops:
                continue

            # Check if covered through a base/subclass relationship
            covered_via_related = False
            if client_name in subclass_to_bases:
                covered_via_related = any(
                    f"{base}.{method}" in seen_ops
                    for base in subclass_to_bases[client_name]
                )
            if not covered_via_related and client_name in base_to_subclasses:
                covered_via_related = any(
                    f"{sub}.{method}" in seen_ops
                    for sub in base_to_subclasses[client_name]
                )

            if not covered_via_related:
                uncovered.append({
                    "client": client_name,
                    "method": method,
                    "sig": f"{method}(...)"
                })

    return {
        "fileCount": file_count,
        "covered": covered,
        "uncovered": uncovered,
        "patterns": sorted(patterns)
    }


# =============================================================================
# Usage Analysis Helpers
# =============================================================================

def _tokenize_identifiers(text: str) -> set[str]:
    """Tokenize a string into identifier tokens (split on non-alphanumeric/underscore).

    This prevents substring false positives like 'Policy' matching inside 'PolicyList'.
    """
    import re
    return set(re.findall(r'[A-Za-z_]\w*', text))


def get_referenced_types(cls: dict[str, Any], all_type_names: set[str]) -> set[str]:
    """Get all type names referenced by a class (base, methods, properties)."""
    refs: set[str] = set()

    base = cls.get("base")
    if base:
        base_name = base.split("[")[0]
        if base_name in all_type_names:
            refs.add(base_name)

    for method in cls.get("methods", []) or []:
        sig = method.get("sig", "")
        ret = method.get("ret", "")
        tokens = _tokenize_identifiers(sig) | _tokenize_identifiers(ret)
        refs.update(tokens & all_type_names)

    for prop in cls.get("properties", []) or []:
        ptype = prop.get("type") or ""
        tokens = _tokenize_identifiers(ptype)
        refs.update(tokens & all_type_names)

    return refs


def extract_call_info(node: ast.Call) -> tuple[str | None, int]:
    """Extract method name from a Call node using AST."""
    if isinstance(node.func, ast.Attribute):
        return node.func.attr, getattr(node, 'lineno', 0)
    return None, 0


def _unwrap_async_return_type(ret_type: str) -> str:
    """Unwrap async wrapper types: Awaitable[X] → X, Coroutine[..., X] → X."""
    for wrapper in ("Awaitable", "Coroutine", "AsyncIterator", "AsyncIterable"):
        if ret_type.startswith(wrapper + "[") and ret_type.endswith("]"):
            inner = ret_type[len(wrapper) + 1:-1]
            if wrapper == "Coroutine":
                parts = inner.rsplit(",", 1)
                if len(parts) == 2:
                    return parts[1].strip()
            return inner
    return ret_type


def _build_method_return_type_map(api: dict[str, Any], client_methods: dict[str, set[str]]) -> dict[str, str]:
    """Build (ClassName.method_name) → ReturnType map from API method return types."""
    result: dict[str, str] = {}
    for module in api.get("modules", []):
        for cls in module.get("classes", []):
            cls_name = cls.get("name", "")
            for method in cls.get("methods", []):
                ret = method.get("ret")
                if ret:
                    unwrapped = _unwrap_async_return_type(ret).split("[")[0].strip()
                    if unwrapped in client_methods:
                        result[f"{cls_name}.{method['name']}"] = unwrapped
    return result


def _build_function_return_type_map(api: dict[str, Any], client_methods: dict[str, set[str]]) -> dict[str, str]:
    """Build function_name → ReturnType map from API function return types."""
    result: dict[str, str] = {}
    for module in api.get("modules", []):
        for func in module.get("functions", []):
            ret = func.get("ret")
            if ret:
                unwrapped = _unwrap_async_return_type(ret).split("[")[0].strip()
                if unwrapped in client_methods:
                    result[func["name"]] = unwrapped
    return result


def _build_property_type_map(api: dict[str, Any], client_methods: dict[str, set[str]]) -> dict[str, str]:
    """Build (ClassName.prop_name) → ReturnType map from API property types."""
    result: dict[str, str] = {}
    for module in api.get("modules", []):
        for cls in module.get("classes", []):
            cls_name = cls.get("name", "")
            for prop in cls.get("properties", []):
                prop_type = prop.get("type")
                if prop_type:
                    base_type = prop_type.split("[")[0].strip()
                    if base_type in client_methods:
                        result[f"{cls_name}.{prop['name']}"] = base_type
    return result


def _build_var_type_map(
    tree: ast.AST,
    client_names: set[str],
    method_return_type_map: dict[str, str],
    function_return_type_map: dict[str, str],
    property_type_map: dict[str, str]
) -> dict[str, str]:
    """
    Walk a Python AST and track variable-to-client-type mappings.
    All type resolution is driven by API index data — no name-based heuristics.

    Patterns tracked:
      - client = ChatClient(...)             → ChatClient
      - client: ChatClient = ...             → ChatClient
      - client = SomeClient.from_config(...) → SomeClient
      - self.client = ChatClient(...)        → self.client maps to ChatClient
      - client = service.get_chat_client()   → via method return type map
      - client = create_chat_client()        → via function return type map
      - sub = client.sub_client              → via property type map
    """
    var_types: dict[str, str] = {}

    for node in ast.walk(tree):
        # Handle: client = ChatClient(...) or client = service.method()
        if isinstance(node, ast.Assign):
            rhs_type = _infer_type_from_expr(node.value, client_names, var_types,
                                              method_return_type_map, function_return_type_map,
                                              property_type_map)
            if rhs_type:
                for target in node.targets:
                    _assign_var_type(target, rhs_type, var_types)

        # Handle: client: ChatClient = ... (annotated assignment)
        elif isinstance(node, ast.AnnAssign) and node.target:
            ann_type = _extract_client_type_from_annotation(node.annotation, client_names)
            if ann_type:
                _assign_var_type(node.target, ann_type, var_types)
            elif node.value:
                rhs_type = _infer_type_from_expr(node.value, client_names, var_types,
                                                  method_return_type_map, function_return_type_map,
                                                  property_type_map)
                if rhs_type:
                    _assign_var_type(node.target, rhs_type, var_types)

    return var_types


def _assign_var_type(target: ast.AST, type_name: str, var_types: dict[str, str]) -> None:
    """Assign a type to a variable target (Name or Attribute)."""
    if isinstance(target, ast.Name):
        var_types[target.id] = type_name
    elif isinstance(target, ast.Attribute):
        key = f"{_expr_to_str(target.value)}.{target.attr}"
        var_types[key] = type_name


def _extract_client_type_from_annotation(ann: ast.AST, client_names: set[str]) -> str | None:
    """Extract a client type name from a type annotation."""
    if isinstance(ann, ast.Name) and ann.id in client_names:
        return ann.id
    if isinstance(ann, ast.Attribute):
        if ann.attr in client_names:
            return ann.attr
    return None


def _infer_type_from_expr(
    expr: ast.AST,
    client_names: set[str],
    var_types: dict[str, str],
    method_return_type_map: dict[str, str],
    function_return_type_map: dict[str, str],
    property_type_map: dict[str, str]
) -> str | None:
    """
    Infer client type from RHS of an assignment using API data only.

    Handles:
      - ChatClient(...)            → ChatClient (constructor)
      - module.ChatClient(...)     → ChatClient (qualified constructor)
      - ChatClient.from_config()   → ChatClient (class method factory)
      - create_chat_client(...)    → via function return type map
      - service.get_chat_client()  → via method return type map
      - client.sub_prop            → via property type map
    """
    # Property access: client.sub_prop
    if isinstance(expr, ast.Attribute) and isinstance(expr.value, (ast.Name, ast.Attribute)):
        if isinstance(expr.value, ast.Name):
            receiver_type = var_types.get(expr.value.id)
        else:
            receiver_type = var_types.get(_expr_to_str(expr.value))
        if receiver_type:
            prop_key = f"{receiver_type}.{expr.attr}"
            prop_type = property_type_map.get(prop_key)
            if prop_type:
                return prop_type
        return None

    if not isinstance(expr, ast.Call):
        return None

    func = expr.func

    # Direct constructor: ChatClient(...)
    if isinstance(func, ast.Name):
        if func.id in client_names:
            return func.id
        # Function call: create_chat_client() → via function return type map
        return function_return_type_map.get(func.id)

    # Qualified access: module.ChatClient(...) or service.method(...)
    if isinstance(func, ast.Attribute):
        # Constructor: module.ChatClient(...)
        if func.attr in client_names:
            return func.attr
        # Class method factory: ChatClient.from_config(...)
        if isinstance(func.value, ast.Name) and func.value.id in client_names:
            return func.value.id
        # Instance method: service.get_chat_client() → via method return type map
        if isinstance(func.value, ast.Name):
            receiver_type = var_types.get(func.value.id)
            if receiver_type:
                method_key = f"{receiver_type}.{func.attr}"
                ret_type = method_return_type_map.get(method_key)
                if ret_type:
                    return ret_type

    return None


def _expr_to_str(expr: ast.AST) -> str:
    """Convert a simple expression to a string for use as map key."""
    if isinstance(expr, ast.Name):
        return expr.id
    if isinstance(expr, ast.Attribute):
        return f"{_expr_to_str(expr.value)}.{expr.attr}"
    return "?"


def _resolve_receiver_type(
    node: ast.Call,
    var_types: dict[str, str],
    client_names: set[str],
    method_return_type_map: dict[str, str],
    function_return_type_map: dict[str, str]
) -> str | None:
    """
    Resolve the client type for a method call receiver using the var-type map
    and API return type data.

    For client.send(), looks up 'client' in var_types.
    For self.client.send(), looks up 'self.client' in var_types.
    For get_client().send(), looks up function return type from API data.
    """
    if not isinstance(node.func, ast.Attribute):
        return None

    receiver = node.func.value

    # Simple variable: client.send()
    if isinstance(receiver, ast.Name):
        return var_types.get(receiver.id)

    # Attribute access: self.client.send()
    if isinstance(receiver, ast.Attribute):
        key = f"{_expr_to_str(receiver.value)}.{receiver.attr}"
        resolved = var_types.get(key)
        if resolved:
            return resolved
        return var_types.get(receiver.attr)

    # Chained call: get_client().send() — resolve from API return type data
    if isinstance(receiver, ast.Call):
        func = receiver.func
        # Standalone function: create_client().send()
        if isinstance(func, ast.Name):
            return function_return_type_map.get(func.id)
        # Method call: service.get_client().send()
        if isinstance(func, ast.Attribute) and isinstance(func.value, ast.Name):
            receiver_type = var_types.get(func.value.id)
            if receiver_type:
                method_key = f"{receiver_type}.{func.attr}"
                return method_return_type_map.get(method_key)

    return None


def detect_patterns_ast(tree: ast.AST, patterns: set[str]) -> None:
    """Detect usage patterns using purely structural AST analysis.

    Only reports patterns that are provable from AST node types —
    no keyword substring matching.
    """
    has_async = False
    has_error_handling = False
    has_streaming = False

    for node in ast.walk(tree):
        if not has_async and isinstance(node, (ast.Await, ast.AsyncWith, ast.AsyncFor)):
            patterns.add("async")
            has_async = True
        if not has_error_handling and isinstance(node, ast.Try):
            patterns.add("error-handling")
            has_error_handling = True
        if not has_streaming and isinstance(node, ast.AsyncFor):
            patterns.add("streaming")
            has_streaming = True
        if has_async and has_error_handling and has_streaming:
            break


def _iter_annotation_runtime_types(annotation: Any) -> list[Any]:
    """Flatten a typing annotation into runtime type objects where possible."""
    if annotation is inspect.Parameter.empty or annotation is None:
        return []

    if isinstance(annotation, str):
        return []

    origin = typing.get_origin(annotation)
    if origin is not None:
        collected: list[Any] = []
        collected.extend(_iter_annotation_runtime_types(origin))
        for arg in typing.get_args(annotation):
            collected.extend(_iter_annotation_runtime_types(arg))
        return collected

    return [annotation]


def _qualify_string_annotation(annotation: str, import_map: dict[str, str] | None = None) -> str:
    if not import_map:
        return annotation

    def _replace(match: re.Match[str]) -> str:
        token = match.group(0)
        module_name = import_map.get(token)
        if not module_name:
            return token
        return f"{module_name}.{token}"

    return re.sub(r"\b[A-Za-z_]\w*\b", _replace, annotation)


def _annotation_to_string(annotation: Any, import_map: dict[str, str] | None = None) -> str:
    if annotation is inspect.Parameter.empty:
        return "Any"
    if isinstance(annotation, str):
        return _qualify_string_annotation(annotation, import_map)

    origin = typing.get_origin(annotation)
    if origin is not None:
        args = typing.get_args(annotation)

        if origin in (typing.Union, types.UnionType):
            if not args:
                return "Any"
            rendered = [_annotation_to_string(arg, import_map) for arg in args]
            return " | ".join(rendered)

        origin_name = _annotation_to_string(origin, import_map)
        if args:
            rendered_args = ", ".join(_annotation_to_string(arg, import_map) for arg in args)
            return f"{origin_name}[{rendered_args}]"
        return origin_name

    try:
        qualname = getattr(annotation, "__qualname__", getattr(annotation, "__name__", None))
        if not qualname:
            return str(annotation).replace("typing.", "")

        module_name = getattr(annotation, "__module__", None)
        if not module_name or module_name in ("builtins", "typing", "collections.abc"):
            return qualname

        return f"{module_name}.{qualname}"
    except Exception:
        return "Any"


def _module_root(name: str) -> str:
    return name.split(".")[0]


def _build_runtime_import_map(module: Any) -> dict[str, str]:
    """Build simple-name -> module-path map from a module's source file imports."""
    module_file = getattr(module, "__file__", None)
    if not module_file:
        return {}

    module_path = Path(module_file)
    if not module_path.exists() or module_path.suffix != ".py":
        return {}

    try:
        source = module_path.read_text(encoding="utf-8")
        tree = ast.parse(source)
    except Exception:
        return {}

    import_map: dict[str, str] = {}
    for node in ast.walk(tree):
        if isinstance(node, ast.ImportFrom):
            if not node.module or node.module == "__future__":
                continue
            for alias in node.names:
                if alias.name == "*":
                    continue
                local_name = alias.asname or alias.name
                import_map[local_name] = node.module
        elif isinstance(node, ast.Import):
            for alias in node.names:
                local_name = alias.asname or alias.name.split(".")[0]
                import_map[local_name] = alias.name

    return import_map


def extract_package_inspect(import_name: str) -> dict[str, Any]:
    module = importlib.import_module(import_name)
    package_root = _module_root(import_name)
    runtime_import_map = _build_runtime_import_map(module)

    exported_names = getattr(module, "__all__", None)
    if not exported_names:
        # When __all__ is absent, filter dir(module) to only include objects that
        # were defined in this package (not re-exported stdlib/third-party symbols).
        exported_names = []
        for name in dir(module):
            if name.startswith("_"):
                continue
            obj = getattr(module, name, None)
            if obj is None:
                continue
            obj_module = getattr(obj, "__module__", None)
            if obj_module is not None and not obj_module.startswith(package_root):
                continue
            exported_names.append(name)

    classes: list[dict[str, Any]] = []
    functions: list[dict[str, Any]] = []
    dependencies: dict[str, dict[str, Any]] = {}

    def track_dependency(type_obj: Any) -> None:
        if isinstance(type_obj, str):
            for token in re.findall(r"\b[A-Za-z_]\w*\b", type_obj):
                mod = runtime_import_map.get(token)
                if not mod:
                    continue
                root = _module_root(mod)
                if root in ("builtins", "typing", package_root):
                    continue
                if root not in dependencies:
                    dependencies[root] = {"package": root, "classes": [], "functions": []}
                if not any(c.get("name") == token for c in dependencies[root]["classes"]):
                    dependencies[root]["classes"].append({"name": token})
            return

        for runtime_type in _iter_annotation_runtime_types(type_obj):
            mod = getattr(runtime_type, "__module__", None)
            if not mod:
                continue
            root = _module_root(mod)
            if root in ("builtins", "typing", package_root):
                continue
            if root not in dependencies:
                dependencies[root] = {"package": root, "classes": [], "functions": []}
            name = getattr(runtime_type, "__name__", None)
            if name and not any(c.get("name") == name for c in dependencies[root]["classes"]):
                dependencies[root]["classes"].append({"name": name})

    for name in exported_names:
        try:
            obj = getattr(module, name)
        except Exception:
            continue

        if inspect.isclass(obj):
            method_infos: list[dict[str, Any]] = []
            property_infos: list[dict[str, Any]] = []

            for method_name, method_obj in inspect.getmembers(obj):
                if method_name.startswith("_"):
                    continue

                if isinstance(getattr(obj, method_name, None), property):
                    property_infos.append({
                        "name": method_name,
                        "type": "Any",
                        "doc": inspect.getdoc(method_obj),
                    })
                    continue

                if not (inspect.isfunction(method_obj) or inspect.ismethod(method_obj) or inspect.ismethoddescriptor(method_obj)):
                    continue

                try:
                    signature = inspect.signature(method_obj)
                except (TypeError, ValueError):
                    continue

                try:
                    hints = typing.get_type_hints(method_obj)
                except Exception:
                    hints = {}

                params: list[dict[str, Any]] = []
                for parameter in signature.parameters.values():
                    annotation = hints.get(parameter.name, parameter.annotation)
                    annotation_name = _annotation_to_string(annotation, runtime_import_map)
                    track_dependency(annotation)
                    default = None
                    if parameter.default is not inspect.Parameter.empty:
                        default = repr(parameter.default)
                    params.append({
                        "name": parameter.name,
                        "type": annotation_name,
                        "default": default,
                        "kind": str(parameter.kind).split(".")[-1].lower(),
                    })

                return_annotation = hints.get("return", signature.return_annotation)
                track_dependency(return_annotation)
                return_type = _annotation_to_string(return_annotation, runtime_import_map)
                param_sig = ", ".join(f"{p['name']}: {p['type']}" for p in params)
                method_infos.append({
                    "name": method_name,
                    "sig": f"{method_name}({param_sig}) -> {return_type}",
                    "params": params,
                    "doc": inspect.getdoc(method_obj),
                    "ret": return_type,
                    "async": inspect.iscoroutinefunction(method_obj),
                })

            base = None
            if obj.__base__ and obj.__base__ is not object:
                base = f"{obj.__base__.__module__}.{obj.__base__.__name__}" if getattr(obj.__base__, "__module__", None) else obj.__base__.__name__
                track_dependency(obj.__base__)

            classes.append({
                "name": name,
                "base": base,
                "doc": inspect.getdoc(obj),
                "methods": method_infos,
                "properties": property_infos,
                "entryPoint": True,
            })
        elif inspect.isfunction(obj):
            try:
                signature = inspect.signature(obj)
            except (TypeError, ValueError):
                continue

            try:
                hints = typing.get_type_hints(obj)
            except Exception:
                hints = {}

            func_params: list[dict[str, Any]] = []
            for parameter in signature.parameters.values():
                annotation = hints.get(parameter.name, parameter.annotation)
                track_dependency(annotation)
                annotation_name = _annotation_to_string(annotation, runtime_import_map)
                default = None
                if parameter.default is not inspect.Parameter.empty:
                    default = repr(parameter.default)
                func_params.append({
                    "name": parameter.name,
                    "type": annotation_name,
                    "default": default,
                    "kind": str(parameter.kind).split(".")[-1].lower(),
                })

            return_annotation = hints.get("return", signature.return_annotation)
            track_dependency(return_annotation)
            return_type = _annotation_to_string(return_annotation, runtime_import_map)
            param_sig = ", ".join(f"{p['name']}: {p['type']}" for p in func_params)
            functions.append({
                "name": name,
                "sig": f"{name}({param_sig}) -> {return_type}",
                "params": func_params,
                "doc": inspect.getdoc(obj),
                "ret": return_type,
                "async": inspect.iscoroutinefunction(obj),
                "entryPoint": True,
            })

    dependencies_list = list(dependencies.values())
    for dep in dependencies_list:
        if not dep["classes"]:
            dep.pop("classes", None)
        if not dep["functions"]:
            dep.pop("functions", None)

    return {
        "package": import_name,
        "modules": [{
            "name": import_name,
            "classes": classes,
            "functions": functions,
        }],
        "dependencies": dependencies_list if dependencies_list else None,
    }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python graph_api.py <path> [--json] [--stub] [--usage <api_json> <samples_path>]", file=sys.stderr)
        sys.exit(1)

    # Check for usage analysis mode
    if "--usage" in sys.argv:
        usage_idx = sys.argv.index("--usage")
        if len(sys.argv) < usage_idx + 3:
            print("Usage: --usage requires <api_json_path> <samples_path>", file=sys.stderr)
            sys.exit(1)
        api_json_path = sys.argv[usage_idx + 1]
        samples_path = Path(sys.argv[usage_idx + 2])

        # Load API index (read from stdin when path is '-')
        if api_json_path == '-':
            api = json.load(sys.stdin)
        else:
            with open(api_json_path, 'r') as f:
                api = json.load(f)

        # Analyze usage
        usage = analyze_usage(samples_path, api)
        print(json.dumps(usage, indent=2))
        sys.exit(0)

    mode = "ast"
    import_name = None
    if "--mode" in sys.argv:
        mode_idx = sys.argv.index("--mode")
        if len(sys.argv) > mode_idx + 1:
            mode = sys.argv[mode_idx + 1].strip().lower()
    if "--import-name" in sys.argv:
        import_name_idx = sys.argv.index("--import-name")
        if len(sys.argv) > import_name_idx + 1:
            import_name = sys.argv[import_name_idx + 1].strip()

    root = Path(sys.argv[1]).resolve()
    output_json = "--json" in sys.argv
    output_stub = "--stub" in sys.argv or not output_json

    if mode == "inspect":
        if not import_name:
            print("--mode inspect requires --import-name <package>", file=sys.stderr)
            sys.exit(1)
        try:
            api = extract_package_inspect(import_name)
        except Exception as ex:
            print(f"inspect mode failed: {ex}", file=sys.stderr)
            sys.exit(1)
    else:
        api = extract_package(root)

    if output_json:
        print(json.dumps(api, indent=2))
    elif output_stub:
        print(format_python_stubs(api))
