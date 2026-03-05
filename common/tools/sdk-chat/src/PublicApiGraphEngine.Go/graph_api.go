//go:build ignore

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"go/ast"
	"go/doc"
	"go/importer"
	"go/parser"
	"go/token"
	"go/types"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strings"
	"time"
	"unicode"
)

// =============================================================================
// API Models
// =============================================================================

type ApiIndex struct {
	Package      string           `json:"package"`
	Packages     []PackageApi     `json:"packages"`
	Dependencies []DependencyInfo `json:"dependencies,omitempty"`
}

type PackageApi struct {
	Name       string      `json:"name"`
	Doc        string      `json:"doc,omitempty"`
	Structs    []StructApi `json:"structs,omitempty"`
	Interfaces []IfaceApi  `json:"interfaces,omitempty"`
	Functions  []FuncApi   `json:"functions,omitempty"`
	Types      []TypeApi   `json:"types,omitempty"`
	Constants  []ConstApi  `json:"constants,omitempty"`
	Variables  []VarApi    `json:"variables,omitempty"`
}

type DependencyInfo struct {
	Package    string      `json:"package"`
	IsStdlib   bool        `json:"isStdlib,omitempty"`
	Structs    []StructApi `json:"structs,omitempty"`
	Interfaces []IfaceApi  `json:"interfaces,omitempty"`
	Types      []TypeApi   `json:"types,omitempty"`
}

type StructApi struct {
	Name           string     `json:"name"`
	Doc            string     `json:"doc,omitempty"`
	IsDeprecated   bool       `json:"deprecated,omitempty"`
	DeprecatedMsg  string     `json:"deprecatedMsg,omitempty"`
	TypeParams     []string   `json:"typeParams,omitempty"`
	Embeds         []string   `json:"embeds,omitempty"`
	Fields         []FieldApi `json:"fields,omitempty"`
	Methods        []FuncApi  `json:"methods,omitempty"`
	EntryPoint     bool       `json:"entryPoint,omitempty"`
	ReExportedFrom string     `json:"reExportedFrom,omitempty"`
}

type IfaceApi struct {
	Name           string    `json:"name"`
	Doc            string    `json:"doc,omitempty"`
	IsDeprecated   bool      `json:"deprecated,omitempty"`
	DeprecatedMsg  string    `json:"deprecatedMsg,omitempty"`
	Embeds         []string  `json:"embeds,omitempty"`
	Methods        []FuncApi `json:"methods,omitempty"`
	EntryPoint     bool      `json:"entryPoint,omitempty"`
	ReExportedFrom string    `json:"reExportedFrom,omitempty"`
}

type FuncApi struct {
	Name           string   `json:"name"`
	EntryPoint     bool     `json:"entryPoint,omitempty"`
	ReExportedFrom string   `json:"reExportedFrom,omitempty"`
	TypeParams     []string `json:"typeParams,omitempty"`
	Params         []ParameterInfo `json:"params,omitempty"`
	Results        []ResultInfo `json:"results,omitempty"`
	Sig            string   `json:"sig"`
	Ret            string   `json:"ret,omitempty"`
	Doc            string   `json:"doc,omitempty"`
	IsMethod       bool     `json:"method,omitempty"`
	Receiver       string   `json:"recv,omitempty"`
	IsDeprecated   bool     `json:"deprecated,omitempty"`
	DeprecatedMsg  string   `json:"deprecatedMsg,omitempty"`
}

type ParameterInfo struct {
	Name       string `json:"name,omitempty"`
	Type       string `json:"type"`
	IsVariadic bool   `json:"variadic,omitempty"`
}

type ResultInfo struct {
	Name string `json:"name,omitempty"`
	Type string `json:"type"`
}

type FieldApi struct {
	Name          string `json:"name"`
	Type          string `json:"type"`
	Tag           string `json:"tag,omitempty"`
	Doc           string `json:"doc,omitempty"`
	IsDeprecated  bool   `json:"deprecated,omitempty"`
	DeprecatedMsg string `json:"deprecatedMsg,omitempty"`
}

type TypeApi struct {
	Name           string `json:"name"`
	Type           string `json:"type"`
	Doc            string `json:"doc,omitempty"`
	IsDeprecated   bool   `json:"deprecated,omitempty"`
	DeprecatedMsg  string `json:"deprecatedMsg,omitempty"`
	ReExportedFrom string `json:"reExportedFrom,omitempty"`
}

type ConstApi struct {
	Name          string `json:"name"`
	Type          string `json:"type,omitempty"`
	Value         string `json:"value,omitempty"`
	Doc           string `json:"doc,omitempty"`
	IsDeprecated  bool   `json:"deprecated,omitempty"`
	DeprecatedMsg string `json:"deprecatedMsg,omitempty"`
}

type VarApi struct {
	Name          string `json:"name"`
	Type          string `json:"type"`
	Doc           string `json:"doc,omitempty"`
	IsDeprecated  bool   `json:"deprecated,omitempty"`
	DeprecatedMsg string `json:"deprecatedMsg,omitempty"`
}

// =============================================================================
// Builtin Type Detection (dynamic, version-aware)
// =============================================================================

// goBuiltinTypes is populated from go/types.Universe at init time, ensuring
// it stays current with the Go version used to compile this binary.
var goBuiltinTypes map[string]bool

// goStdlibTopLevel maps top-level stdlib directory names (e.g., "net", "io",
// "crypto"). Discovered dynamically from GOROOT/src at init time.
var goStdlibTopLevel map[string]bool

func init() {
	// Populate builtin types from the compiler's own Universe scope.
	// This includes all predeclared types (bool, int, string, error, any, ...)
	// and automatically picks up additions in newer Go versions.
	goBuiltinTypes = make(map[string]bool)
	for _, name := range types.Universe.Names() {
		goBuiltinTypes[name] = true
	}

	// Discover stdlib top-level packages from GOROOT/src.
	goStdlibTopLevel = discoverStdlibTopLevel()
}

// discoverStdlibTopLevel scans GOROOT/src to find all top-level stdlib
// directory names. Returns nil if Go is not on PATH (e.g., precompiled
// binary running without Go installed).
func discoverStdlibTopLevel() map[string]bool {
	out, err := exec.Command("go", "env", "GOROOT").Output()
	if err != nil {
		return nil
	}
	goroot := strings.TrimSpace(string(out))
	if goroot == "" {
		return nil
	}
	entries, err := os.ReadDir(filepath.Join(goroot, "src"))
	if err != nil {
		return nil
	}
	result := make(map[string]bool)
	for _, entry := range entries {
		name := entry.Name()
		if entry.IsDir() && !strings.HasPrefix(name, ".") && !strings.HasPrefix(name, "_") &&
			name != "vendor" && name != "testdata" && name != "cmd" {
			result[name] = true
		}
	}
	if len(result) > 10 { // sanity check
		return result
	}
	return nil
}

func isBuiltinType(typeName string) bool {
	// Remove pointer, slice, map prefixes
	typeName = strings.TrimPrefix(typeName, "*")
	typeName = strings.TrimPrefix(typeName, "[]")
	if strings.HasPrefix(typeName, "map[") {
		// Parse map key and value types instead of blanket builtin
		inner := typeName[4:] // skip "map["
		depth := 1
		keyEnd := -1
		for i := 0; i < len(inner); i++ {
			if inner[i] == '[' {
				depth++
			} else if inner[i] == ']' {
				depth--
				if depth == 0 {
					keyEnd = i
					break
				}
			}
		}
		if keyEnd >= 0 {
			key := inner[:keyEnd]
			val := ""
			if keyEnd+1 < len(inner) {
				val = inner[keyEnd+1:]
			}
			return isBuiltinType(key) && (val == "" || isBuiltinType(val))
		}
		return true // malformed, treat as builtin
	}

	// Check if it's a Go universe type (e.g., "error")
	// Stdlib package references like "context.Context" and "io.Writer" are NOT builtins —
	// they are external types that should be tracked as dependencies.
	if strings.Contains(typeName, ".") {
		return false
	}

	return goBuiltinTypes[typeName]
}

// isStdlibPackage checks whether a package path or import alias belongs to
// the Go standard library.
//
// For full import paths (e.g., "net/http", "github.com/foo/bar"): uses the
// canonical Go convention that stdlib paths never have a dot in the first
// path element, while module paths always do.
//
// For bare aliases (e.g., "http", "context"): checks against the stdlib
// top-level directory names discovered from GOROOT. Falls back to the
// dot-check convention when GOROOT is unavailable.
func isStdlibPackage(pkgPath string) bool {
	if pkgPath == "" {
		return false
	}

	// Split into first path element
	firstElement := pkgPath
	if i := strings.IndexByte(pkgPath, '/'); i >= 0 {
		firstElement = pkgPath[:i]
	}

	// External packages always have a dot in the first element (domain-based)
	if strings.Contains(firstElement, ".") {
		return false
	}

	// Use GOROOT-discovered names when available (handles aliases precisely)
	if goStdlibTopLevel != nil {
		return goStdlibTopLevel[firstElement]
	}

	// Fallback: no dots in first element → stdlib by Go convention.
	// Correct for full import paths; may have rare false positives for aliases,
	// but in practice Go import aliases match stdlib package names.
	return true
}

func main() {
	args := os.Args[1:]

	if len(args) < 1 {
		fmt.Fprintln(os.Stderr, "Usage: go run graph_api.go <path> [--json] [--stub] [--pretty]")
		fmt.Fprintln(os.Stderr, "       go run graph_api.go --usage <api_json_file> <samples_path>")
		os.Exit(1)
	}

	// Scan for flags (position-independent, like Python/Java/TypeScript engines)
	hasFlag := func(name string) bool {
		for _, a := range args {
			if a == "--"+name || a == "-"+name {
				return true
			}
		}
		return false
	}
	flagValue := func(name string) string {
		for i, a := range args {
			if (a == "--"+name || a == "-"+name) && i+1 < len(args) {
				return args[i+1]
			}
		}
		return ""
	}

	// Collect positional args (skip flags and their values)
	usageFile := flagValue("usage")
	var positional []string
	for i := 0; i < len(args); i++ {
		a := args[i]
		if a == "--usage" || a == "-usage" {
			i++ // skip the value
			continue
		}
		if strings.HasPrefix(a, "--") || strings.HasPrefix(a, "-") {
			continue
		}
		positional = append(positional, a)
	}

	// Handle --usage mode
	if usageFile != "" {
		if len(positional) < 1 {
			fmt.Fprintln(os.Stderr, "Usage: go run graph_api.go --usage <api_json_file> <samples_path>")
			os.Exit(1)
		}
		analyzeUsage(usageFile, positional[0])
		return
	}

	if len(positional) < 1 {
		fmt.Fprintln(os.Stderr, "Usage: go run graph_api.go <path> [--json] [--stub] [--pretty]")
		fmt.Fprintln(os.Stderr, "       go run graph_api.go --usage <api_json_file> <samples_path>")
		os.Exit(1)
	}

	outputJson := hasFlag("json")
	outputStub := hasFlag("stub")
	pretty := hasFlag("pretty")

	rootPath := positional[0]
	if !outputJson && !outputStub {
		outputStub = true
	}

	api, err := extractPackage(rootPath)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}

	if outputJson {
		var output []byte
		if pretty {
			output, _ = json.MarshalIndent(api, "", "  ")
		} else {
			output, _ = json.Marshal(api)
		}
		fmt.Println(string(output))
	} else {
		fmt.Println(formatStubs(api))
	}
}

// ===== Usage Analysis Types =====
type UsageResult struct {
	FileCount int           `json:"fileCount"`
	Covered   []CoveredOp   `json:"covered"`
	Uncovered []UncoveredOp `json:"uncovered"`
	Patterns  []string      `json:"patterns"`
}

type CoveredOp struct {
	Client string `json:"client"`
	Method string `json:"method"`
	File   string `json:"file"`
	Line   int    `json:"line"`
}

type UncoveredOp struct {
	Client string `json:"client"`
	Method string `json:"method"`
	Sig    string `json:"sig"`
}

// ===== Usage Analysis =====
func analyzeUsage(apiJsonFile, samplesPath string) {
	// Load API index (read from stdin when path is "-")
	var apiData []byte
	var err error
	if apiJsonFile == "-" {
		apiData, err = io.ReadAll(os.Stdin)
	} else {
		apiData, err = os.ReadFile(apiJsonFile)
	}
	if err != nil {
		fmt.Fprintln(os.Stderr, "Error reading API file:", err)
		os.Exit(1)
	}

	var apiIndex ApiIndex
	if err := json.Unmarshal(apiData, &apiIndex); err != nil {
		fmt.Fprintln(os.Stderr, "Error parsing API JSON:", err)
		os.Exit(1)
	}

	allStructs := []StructApi{}
	allInterfaces := []IfaceApi{}
	allTypeNames := make(map[string]bool)
	for _, pkg := range apiIndex.Packages {
		for _, s := range pkg.Structs {
			allStructs = append(allStructs, s)
			allTypeNames[s.Name] = true
		}
		for _, iface := range pkg.Interfaces {
			allInterfaces = append(allInterfaces, iface)
			allTypeNames[iface.Name] = true
		}
	}

	interfaceMethods := make(map[string]map[string]bool)
	for _, iface := range allInterfaces {
		methods := make(map[string]bool)
		for _, m := range iface.Methods {
			methods[m.Name] = true
		}
		if len(methods) > 0 {
			interfaceMethods[iface.Name] = methods
		}
	}

	interfaceImplementers := make(map[string][]StructApi)
	for ifaceName, methods := range interfaceMethods {
		for _, s := range allStructs {
			structMethods := make(map[string]bool)
			for _, m := range s.Methods {
				structMethods[m.Name] = true
			}
			implements := true
			for methodName := range methods {
				if !structMethods[methodName] {
					implements = false
					break
				}
			}
			if implements {
				interfaceImplementers[ifaceName] = append(interfaceImplementers[ifaceName], s)
			}
		}
	}

	references := make(map[string]map[string]bool)
	for _, s := range allStructs {
		references[s.Name] = getReferencedTypes(s, allTypeNames)
	}
	for _, iface := range allInterfaces {
		references[iface.Name] = getReferencedTypesForInterface(iface, allTypeNames)
	}

	referencedBy := make(map[string]int)
	for typeName, refs := range references {
		for ref := range refs {
			if ref != typeName { // Skip self-references
				referencedBy[ref] = referencedBy[ref] + 1
			}
		}
	}

	operationTypes := make(map[string]bool)
	for _, s := range allStructs {
		if len(s.Methods) > 0 {
			operationTypes[s.Name] = true
		}
	}
	for _, iface := range allInterfaces {
		if len(iface.Methods) > 0 {
			operationTypes[iface.Name] = true
		}
	}

	rootStructs := []StructApi{}
	for _, s := range allStructs {
		_, isReferenced := referencedBy[s.Name]
		refs := references[s.Name]
		referencesOperations := false
		for ref := range refs {
			if operationTypes[ref] {
				referencesOperations = true
				break
			}
		}
		// Root types: entry points (from package exports) with methods, or unreferenced types with operations
		if (s.EntryPoint && len(s.Methods) > 0) || (!isReferenced && (len(s.Methods) > 0 || referencesOperations)) {
			rootStructs = append(rootStructs, s)
		}
	}

	if len(rootStructs) == 0 {
		for _, s := range allStructs {
			refs := references[s.Name]
			referencesOperations := false
			for ref := range refs {
				if operationTypes[ref] {
					referencesOperations = true
					break
				}
			}
			if len(s.Methods) > 0 || referencesOperations {
				rootStructs = append(rootStructs, s)
			}
		}
	}

	reachable := make(map[string]bool)
	queue := []string{}
	for _, s := range rootStructs {
		if !reachable[s.Name] {
			reachable[s.Name] = true
			queue = append(queue, s.Name)
		}
	}

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		if refs, ok := references[current]; ok {
			for ref := range refs {
				if !reachable[ref] {
					reachable[ref] = true
					queue = append(queue, ref)
				}
			}
		}

		for _, impl := range interfaceImplementers[current] {
			if !reachable[impl.Name] {
				reachable[impl.Name] = true
				queue = append(queue, impl.Name)
			}
		}
	}

	usageStructs := []StructApi{}
	allReachableStructs := []StructApi{}
	for _, s := range allStructs {
		if reachable[s.Name] {
			allReachableStructs = append(allReachableStructs, s)
			if len(s.Methods) > 0 {
				usageStructs = append(usageStructs, s)
			}
		}
	}

	usageInterfaces := []IfaceApi{}
	for _, iface := range allInterfaces {
		if reachable[iface.Name] && len(iface.Methods) > 0 {
			usageInterfaces = append(usageInterfaces, iface)
		}
	}

	// Build client methods map
	clientMethods := make(map[string]map[string]string) // client -> method -> signature
	for _, s := range usageStructs {
		methods := make(map[string]string)
		for _, m := range s.Methods {
			methods[m.Name] = m.Sig
		}
		if len(methods) > 0 {
			if _, exists := clientMethods[s.Name]; !exists {
				clientMethods[s.Name] = methods
			}
		}
	}

	for _, iface := range usageInterfaces {
		methods := make(map[string]string)
		for _, m := range iface.Methods {
			methods[m.Name] = m.Sig
		}
		if len(methods) > 0 {
			if _, exists := clientMethods[iface.Name]; !exists {
				clientMethods[iface.Name] = methods
			}
		}
	}

	if len(clientMethods) == 0 {
		result := UsageResult{FileCount: 0, Covered: []CoveredOp{}, Uncovered: []UncoveredOp{}, Patterns: []string{}}
		output, _ := json.Marshal(result)
		fmt.Println(string(output))
		return
	}

	// Build set of known client type names for local type inference
	clientNames := make(map[string]bool)
	for name := range clientMethods {
		clientNames[name] = true
	}

	// Expand clientNames to include container types — structs that
	// have fields pointing to client types (e.g., EmptyClient with Widgets field)
	for _, s := range allReachableStructs {
		if clientNames[s.Name] {
			continue
		}
		for _, f := range s.Fields {
			fieldType := strings.TrimPrefix(f.Type, "*")
			if clientNames[fieldType] {
				clientNames[s.Name] = true
				break
			}
		}
	}

	// Build method and function return type maps from API data for precise factory/getter resolution
	methodReturnTypeMap := buildMethodReturnTypeMap(usageStructs, usageInterfaces, clientNames)
	functionReturnTypeMap := buildFunctionReturnTypeMap(&apiIndex, clientNames)
	fieldTypeMap := buildFieldTypeMap(allReachableStructs, clientNames)

	// Find Go files in samples path
	absPath, _ := filepath.Abs(samplesPath)
	var goFiles []string
	filepath.Walk(absPath, func(path string, info os.FileInfo, err error) error {
		if err != nil || info.IsDir() {
			return nil
		}
		if strings.HasSuffix(path, ".go") && !strings.HasSuffix(path, "_test.go") {
			goFiles = append(goFiles, path)
		}
		return nil
	})

	covered := []CoveredOp{}
	seenOps := make(map[string]bool)
	patterns := make(map[string]bool)

	fset := token.NewFileSet()
	for _, file := range goFiles {
		src, err := os.ReadFile(file)
		if err != nil {
			continue
		}

		f, err := parser.ParseFile(fset, file, src, parser.ParseComments)
		if err != nil {
			continue
		}

		relPath, _ := filepath.Rel(absPath, file)

		// Build variable → client type map for this file
		varTypes := buildVarTypeMap(f, clientNames, methodReturnTypeMap, functionReturnTypeMap, fieldTypeMap)

		// Walk AST looking for method calls - resolve receiver type via var tracking first
		ast.Inspect(f, func(n ast.Node) bool {
			call, ok := n.(*ast.CallExpr)
			if !ok {
				return true
			}

			// Check for selector expression: receiver.Method()
			sel, ok := call.Fun.(*ast.SelectorExpr)
			if !ok {
				return true
			}

			methodName := sel.Sel.Name

			// Strategy 1: Resolve receiver type from local variable tracking
			var resolvedClient string
			if ident, ok := sel.X.(*ast.Ident); ok {
				if varType, exists := varTypes[ident.Name]; exists {
					if methods, ok := clientMethods[varType]; ok {
						if _, hasMethod := methods[methodName]; hasMethod {
							resolvedClient = varType
						}
					}
				}
			}

			// Strategy 1b: Chained call — receiver.GetSubClient().Method()
			if resolvedClient == "" {
				if innerCall, ok := sel.X.(*ast.CallExpr); ok {
					if innerSel, ok := innerCall.Fun.(*ast.SelectorExpr); ok {
						innerMethodName := innerSel.Sel.Name

						// Static factory: ClientType.Create().Method()
						if ident, ok := innerSel.X.(*ast.Ident); ok && clientNames[ident.Name] {
							staticKey := ident.Name + "." + innerMethodName
							if retType, exists := methodReturnTypeMap[staticKey]; exists {
								if methods, ok := clientMethods[retType]; ok {
									if _, hasMethod := methods[methodName]; hasMethod {
										resolvedClient = retType
									}
								}
							}
						}

						// Instance method: service.GetSubClient().Method()
						if resolvedClient == "" {
							if ident, ok := innerSel.X.(*ast.Ident); ok {
								if receiverType, exists := varTypes[ident.Name]; exists {
									methodKey := receiverType + "." + innerMethodName
									if retType, exists := methodReturnTypeMap[methodKey]; exists {
										if methods, ok := clientMethods[retType]; ok {
											if _, hasMethod := methods[methodName]; hasMethod {
												resolvedClient = retType
											}
										}
									}
								}
							}
						}
					}
				}
			}

			// Strategy 1c: Field access — receiver.Field.Method()
			if resolvedClient == "" {
				if innerSel, ok := sel.X.(*ast.SelectorExpr); ok {
					if ident, ok := innerSel.X.(*ast.Ident); ok {
						if receiverType, exists := varTypes[ident.Name]; exists {
							fieldKey := receiverType + "." + innerSel.Sel.Name
							if fieldType, exists := fieldTypeMap[fieldKey]; exists {
								if methods, ok := clientMethods[fieldType]; ok {
									if _, hasMethod := methods[methodName]; hasMethod {
										resolvedClient = fieldType
									}
								}
							}
						}
					}
				}
			}

			if resolvedClient != "" {
				key := resolvedClient + "." + methodName
				if !seenOps[key] {
					seenOps[key] = true
					pos := fset.Position(call.Pos())
					covered = append(covered, CoveredOp{
						Client: resolvedClient,
						Method: methodName,
						File:   relPath,
						Line:   pos.Line,
					})
				}
			}

			return true
		})

		// Detect patterns using purely structural AST analysis — no keyword matching
		ast.Inspect(f, func(n ast.Node) bool {
			switch n.(type) {
			case *ast.DeferStmt:
				patterns["defer-cleanup"] = true
			case *ast.GoStmt:
				patterns["goroutine"] = true
			case *ast.SelectStmt:
				patterns["channel-select"] = true
			}
			return true
		})
	}

	// Build bidirectional interface ↔ struct mapping for coverage cross-referencing
	ifaceToImplNames := make(map[string][]string)
	implToIfaceNames := make(map[string][]string)
	for ifaceName, impls := range interfaceImplementers {
		for _, impl := range impls {
			ifaceToImplNames[ifaceName] = append(ifaceToImplNames[ifaceName], impl.Name)
			implToIfaceNames[impl.Name] = append(implToIfaceNames[impl.Name], ifaceName)
		}
	}

	// Build uncovered list with interface/implementation cross-referencing
	uncovered := []UncoveredOp{}
	for clientName, methods := range clientMethods {
		for method, sig := range methods {
			key := clientName + "." + method
			if seenOps[key] {
				continue
			}

			// Check if covered through an interface/implementation relationship
			coveredViaRelated := false

			// If this is an implementation, check if any of its interfaces has the method covered
			for _, ifaceName := range implToIfaceNames[clientName] {
				if seenOps[ifaceName+"."+method] {
					coveredViaRelated = true
					break
				}
			}

			// If this is an interface, check if any implementation has the method covered
			if !coveredViaRelated {
				for _, implName := range ifaceToImplNames[clientName] {
					if seenOps[implName+"."+method] {
						coveredViaRelated = true
						break
					}
				}
			}

			if !coveredViaRelated {
				uncovered = append(uncovered, UncoveredOp{
					Client: clientName,
					Method: method,
					Sig:    sig,
				})
			}
		}
	}

	// Convert patterns map to slice
	patternList := []string{}
	for p := range patterns {
		patternList = append(patternList, p)
	}
	sort.Strings(patternList)

	result := UsageResult{
		FileCount: len(goFiles),
		Covered:   covered,
		Uncovered: uncovered,
		Patterns:  patternList,
	}

	output, _ := json.Marshal(result)
	fmt.Println(string(output))
}

func getReferencedTypes(s StructApi, allTypeNames map[string]bool) map[string]bool {
	refs := make(map[string]bool)

	// Tokenize all method signatures and return types
	tokens := make(map[string]bool)
	for _, m := range s.Methods {
		tokenizeInto(m.Sig, tokens)
		if m.Ret != "" {
			tokenizeInto(m.Ret, tokens)
		}
	}

	for _, f := range s.Fields {
		tokenizeInto(f.Type, tokens)
	}

	// Intersect with known type names
	for token := range tokens {
		if allTypeNames[token] {
			refs[token] = true
		}
	}

	return refs
}

func getReferencedTypesForInterface(i IfaceApi, allTypeNames map[string]bool) map[string]bool {
	refs := make(map[string]bool)

	tokens := make(map[string]bool)
	for _, m := range i.Methods {
		tokenizeInto(m.Sig, tokens)
		if m.Ret != "" {
			tokenizeInto(m.Ret, tokens)
		}
	}

	for token := range tokens {
		if allTypeNames[token] {
			refs[token] = true
		}
	}

	return refs
}

// tokenizeInto graphs identifier tokens (runs of letters, digits, underscores)
// from a signature string and adds them to the tokens map.
func tokenizeInto(sig string, tokens map[string]bool) {
	start := -1
	for i, ch := range sig {
		isIdChar := (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') ||
			(ch >= '0' && ch <= '9') || ch == '_'
		if isIdChar && start < 0 {
			start = i
		} else if !isIdChar && start >= 0 {
			tokens[sig[start:i]] = true
			start = -1
		}
	}
	if start >= 0 {
		tokens[sig[start:]] = true
	}
}

// =============================================================================
// Variable Tracking — API-data-driven type resolution
// =============================================================================

// unwrapGoReturnType strips pointer, slice, and multi-return from Go return types.
// E.g., "*BlobClient" → "BlobClient", "(*BlobClient, error)" → "BlobClient"
func unwrapGoReturnType(ret string) string {
	// Handle multi-return: "(Type, error)" → "Type"
	ret = strings.TrimSpace(ret)
	if strings.HasPrefix(ret, "(") && strings.HasSuffix(ret, ")") {
		inner := ret[1 : len(ret)-1]
		parts := strings.Split(inner, ",")
		if len(parts) > 0 {
			ret = strings.TrimSpace(parts[0])
		}
	}
	// Strip pointer and slice prefixes
	ret = strings.TrimPrefix(ret, "*")
	ret = strings.TrimPrefix(ret, "[]")
	ret = strings.TrimPrefix(ret, "*")
	// Strip generic type args
	if idx := strings.Index(ret, "["); idx > 0 {
		ret = ret[:idx]
	}
	return ret
}

// buildMethodReturnTypeMap builds a map of "OwnerType.MethodName" → return type
// from API method data, only for methods that return a known client type.
func buildMethodReturnTypeMap(structs []StructApi, ifaces []IfaceApi, clientNames map[string]bool) map[string]string {
	m := make(map[string]string)
	for _, s := range structs {
		for _, method := range s.Methods {
			if method.Ret != "" {
				retType := unwrapGoReturnType(method.Ret)
				if clientNames[retType] {
					m[s.Name+"."+method.Name] = retType
				}
			}
		}
	}
	for _, iface := range ifaces {
		for _, method := range iface.Methods {
			if method.Ret != "" {
				retType := unwrapGoReturnType(method.Ret)
				if clientNames[retType] {
					m[iface.Name+"."+method.Name] = retType
				}
			}
		}
	}
	return m
}

// buildFunctionReturnTypeMap builds a map of "FunctionName" → return type
// from API function data, only for functions that return a known client type.
func buildFunctionReturnTypeMap(api *ApiIndex, clientNames map[string]bool) map[string]string {
	m := make(map[string]string)
	for _, pkg := range api.Packages {
		for _, fn := range pkg.Functions {
			if fn.Ret != "" {
				retType := unwrapGoReturnType(fn.Ret)
				if clientNames[retType] {
					m[fn.Name] = retType
				}
			}
		}
	}
	return m
}

// buildFieldTypeMap builds a map of "OwnerType.FieldName" → client type
// from API field data, for fields whose type is a known client type.
func buildFieldTypeMap(structs []StructApi, clientNames map[string]bool) map[string]string {
	m := make(map[string]string)
	for _, s := range structs {
		for _, f := range s.Fields {
			fieldType := strings.TrimPrefix(f.Type, "*")
			fieldType = strings.TrimPrefix(fieldType, "[]")
			if idx := strings.Index(fieldType, "["); idx > 0 {
				fieldType = fieldType[:idx]
			}
			if clientNames[fieldType] {
				m[s.Name+"."+f.Name] = fieldType
			}
		}
	}
	return m
}

// buildVarTypeMap walks a Go AST file and builds a variable → client type map.
//
// Tracks patterns:
//   - client := NewBlobClient(...)       → client maps to BlobClient (constructor via function return type map)
//   - client := svc.GetBlobClient(...)   → client maps to BlobClient (method return type map)
//   - var client BlobClient              → client maps to BlobClient (type annotation)
//   - client := svc.BlobField            → client maps to BlobClient (field type map)
//
// All type resolution is driven by API index data — no name-based heuristics.
func buildVarTypeMap(f *ast.File, clientNames map[string]bool, methodRetMap, funcRetMap, fieldTypeMap map[string]string) map[string]string {
	varTypes := make(map[string]string)

	ast.Inspect(f, func(n ast.Node) bool {
		switch node := n.(type) {
		case *ast.GenDecl:
			// Handle: var client BlobClient
			for _, spec := range node.Specs {
				vs, ok := spec.(*ast.ValueSpec)
				if !ok {
					continue
				}
				// Type annotation: var client BlobClient
				if vs.Type != nil {
					typeName := unwrapGoReturnType(formatExpr(vs.Type))
					if clientNames[typeName] {
						for _, name := range vs.Names {
							varTypes[name.Name] = typeName
						}
						continue
					}
				}
				// Initializer: var client = NewBlobClient(...)
				if len(vs.Values) > 0 && len(vs.Names) > 0 {
					for i, val := range vs.Values {
						if i >= len(vs.Names) {
							break
						}
						resolved := resolveExprType(val, clientNames, varTypes, methodRetMap, funcRetMap, fieldTypeMap)
						if resolved != "" {
							varTypes[vs.Names[i].Name] = resolved
						}
					}
				}
			}

		case *ast.AssignStmt:
			// Handle: client := NewBlobClient(...) or client = svc.GetBlobClient(...)
			for i, rhs := range node.Rhs {
				if i >= len(node.Lhs) {
					break
				}
				ident, ok := node.Lhs[i].(*ast.Ident)
				if !ok {
					continue
				}
				resolved := resolveExprType(rhs, clientNames, varTypes, methodRetMap, funcRetMap, fieldTypeMap)
				if resolved != "" {
					varTypes[ident.Name] = resolved
				}
			}
		}
		return true
	})

	return varTypes
}

// resolveExprType resolves the client type of an expression using API data.
func resolveExprType(expr ast.Expr, clientNames map[string]bool, varTypes, methodRetMap, funcRetMap, fieldTypeMap map[string]string) string {
	switch e := expr.(type) {
	case *ast.CallExpr:
		// Function call: NewBlobClient(...)
		if ident, ok := e.Fun.(*ast.Ident); ok {
			if retType, exists := funcRetMap[ident.Name]; exists {
				return retType
			}
		}
		// Method call: svc.GetBlobClient(...)
		if sel, ok := e.Fun.(*ast.SelectorExpr); ok {
			methodName := sel.Sel.Name
			if ident, ok := sel.X.(*ast.Ident); ok {
				// Static factory: ClientType.Create(...)
				if clientNames[ident.Name] {
					staticKey := ident.Name + "." + methodName
					if retType, exists := methodRetMap[staticKey]; exists {
						return retType
					}
				}
				// Instance method: service.GetSubClient(...)
				if receiverType, exists := varTypes[ident.Name]; exists {
					methodKey := receiverType + "." + methodName
					if retType, exists := methodRetMap[methodKey]; exists {
						return retType
					}
				}
			}
		}

	case *ast.UnaryExpr:
		// Address-of: &BlobClient{} or dereference
		if e.Op.String() == "&" {
			return resolveExprType(e.X, clientNames, varTypes, methodRetMap, funcRetMap, fieldTypeMap)
		}

	case *ast.CompositeLit:
		// Struct literal: BlobClient{...}
		if e.Type != nil {
			typeName := unwrapGoReturnType(formatExpr(e.Type))
			if clientNames[typeName] {
				return typeName
			}
		}

	case *ast.SelectorExpr:
		// Field access: svc.BlobField
		if ident, ok := e.X.(*ast.Ident); ok {
			if receiverType, exists := varTypes[ident.Name]; exists {
				fieldKey := receiverType + "." + e.Sel.Name
				if fieldType, exists := fieldTypeMap[fieldKey]; exists {
					return fieldType
				}
			}
		}

	case *ast.Ident:
		// Direct identifier reference to a known client type
		if clientNames[e.Name] {
			return e.Name
		}
	}
	return ""
}

func extractPackage(rootPath string) (*ApiIndex, error) {
	absPath, err := filepath.Abs(rootPath)
	if err != nil {
		return nil, err
	}

	packageName := detectPackageName(absPath)
	packages := make(map[string]*PackageApi)

	// Create a fresh engine context for this engine run
	ctx := newEngineContext(absPath)

	// Find all Go packages
	fset := token.NewFileSet()
	pkgDirs := make(map[string]bool)

	filepath.Walk(absPath, func(path string, info os.FileInfo, err error) error {
		if err != nil || info.IsDir() {
			return nil
		}
		if strings.HasSuffix(path, ".go") && !strings.HasSuffix(path, "_test.go") {
			pkgDirs[filepath.Dir(path)] = true
		}
		return nil
	})

	for dir := range pkgDirs {
		// Skip internal, vendor, etc
		relDir, _ := filepath.Rel(absPath, dir)
		if strings.Contains(relDir, "internal") || strings.Contains(relDir, "vendor") ||
			strings.Contains(relDir, "testdata") || strings.Contains(relDir, "examples") ||
			strings.Contains(relDir, "testdeps") {
			continue
		}

		pkgs, err := parser.ParseDir(fset, dir, func(fi os.FileInfo) bool {
			return !strings.HasSuffix(fi.Name(), "_test.go")
		}, parser.ParseComments)
		if err != nil {
			continue
		}

		// Collect import mappings from all files in the package
		for _, astPkg := range pkgs {
			for _, file := range astPkg.Files {
				collectImports(ctx, file)
			}
		}

		for pkgName, astPkg := range pkgs {
			if strings.HasSuffix(pkgName, "_test") {
				continue
			}

			docPkg := doc.New(astPkg, dir, doc.AllDecls)

			pkgApi := extractPkg(ctx, docPkg, fset)
			enrichPackageWithTypeChecker(ctx, fset, pkgName, astPkg, pkgApi)
			pkgApi.Name = relDir
			if pkgApi.Name == "" || pkgApi.Name == "." {
				pkgApi.Name = pkgName
			}

			if len(pkgApi.Structs) > 0 || len(pkgApi.Interfaces) > 0 ||
				len(pkgApi.Functions) > 0 || len(pkgApi.Types) > 0 ||
				len(pkgApi.Constants) > 0 || len(pkgApi.Variables) > 0 {
				packages[pkgApi.Name] = pkgApi
			}
		}
	}

	enrichExternalPackagesFromSources(ctx)
	for _, pkgApi := range packages {
		applyEmbeddedMethodPromotion(ctx, pkgApi)
	}

	// Mark entry points: types in the root package are the primary entry points
	// The root package is the one whose relDir is "." or empty (directly in the
	// module root), matching how Go users import the module.
	for _, pkgApi := range packages {
		if pkgApi.Name == "." || pkgApi.Name == "" || pkgApi.Name == filepath.Base(absPath) {
			for i := range pkgApi.Structs {
				pkgApi.Structs[i].EntryPoint = true
			}
			for i := range pkgApi.Interfaces {
				pkgApi.Interfaces[i].EntryPoint = true
			}
			for i := range pkgApi.Functions {
				pkgApi.Functions[i].EntryPoint = true
			}
		}
	}

	// Sort packages by name
	var sortedPkgs []PackageApi
	for _, p := range packages {
		sortedPkgs = append(sortedPkgs, *p)
	}
	sort.Slice(sortedPkgs, func(i, j int) bool {
		return sortedPkgs[i].Name < sortedPkgs[j].Name
	})

	api := &ApiIndex{
		Package:  packageName,
		Packages: sortedPkgs,
	}

	// Resolve transitive dependencies
	deps := resolveTransitiveDependencies(ctx)
	if len(deps) > 0 {
		api.Dependencies = deps
	}

	return api, nil
}

// =============================================================================
// Transitive Dependency Resolution (AST-Based)
// =============================================================================

// TypeReferenceCollector collects type references from AST expressions
type TypeReferenceCollector struct {
	refs            map[string]bool
	definedTypes    map[string]bool
	interfaceEmbeds map[string]bool // types seen as interface embeds (definitionally interfaces)
}

func NewTypeReferenceCollector() *TypeReferenceCollector {
	return &TypeReferenceCollector{
		refs:            make(map[string]bool),
		definedTypes:    make(map[string]bool),
		interfaceEmbeds: make(map[string]bool),
	}
}

func (c *TypeReferenceCollector) AddDefinedType(name string) {
	c.definedTypes[name] = true
}

// AddInterfaceEmbed records a type seen as an embedded type in an interface definition.
// In Go, interface embeds are definitionally interfaces.
func (c *TypeReferenceCollector) AddInterfaceEmbed(expr ast.Expr) {
	if expr == nil {
		return
	}
	switch e := expr.(type) {
	case *ast.Ident:
		if isExported(e.Name) && !isBuiltinType(e.Name) {
			c.interfaceEmbeds[e.Name] = true
		}
	case *ast.SelectorExpr:
		if ident, ok := e.X.(*ast.Ident); ok {
			c.interfaceEmbeds[ident.Name+"."+e.Sel.Name] = true
		}
	}
	// Also collect as a regular reference
	c.CollectFromExpr(expr)
}

// IsKnownInterface returns true if the type was seen as an interface embed.
func (c *TypeReferenceCollector) IsKnownInterface(typeName string) bool {
	return c.interfaceEmbeds[typeName]
}

// CollectFromExpr walks an AST expression and collects all type references.
// This is a rigorous AST-based approach that properly handles:
// - Identifiers: MyType
// - Selectors: pkg.Type
// - Pointers: *Type
// - Slices: []Type
// - Maps: map[Key]Value
// - Generics: Type[Arg]
// - Function types: func(A) B
func (c *TypeReferenceCollector) CollectFromExpr(expr ast.Expr) {
	if expr == nil {
		return
	}
	switch e := expr.(type) {
	case *ast.Ident:
		// Simple type name like "MyType"
		if isExported(e.Name) && !isBuiltinType(e.Name) {
			c.refs[e.Name] = true
		}
	case *ast.SelectorExpr:
		// Qualified name like "pkg.Type"
		if ident, ok := e.X.(*ast.Ident); ok {
			fullName := ident.Name + "." + e.Sel.Name
			if !isBuiltinType(fullName) {
				c.refs[fullName] = true
			}
		}
	case *ast.StarExpr:
		// Pointer type like *Type
		c.CollectFromExpr(e.X)
	case *ast.ArrayType:
		// Slice/array type like []Type
		c.CollectFromExpr(e.Elt)
	case *ast.MapType:
		// Map type like map[Key]Value
		c.CollectFromExpr(e.Key)
		c.CollectFromExpr(e.Value)
	case *ast.ChanType:
		// Channel type like chan Type
		c.CollectFromExpr(e.Value)
	case *ast.FuncType:
		// Function type like func(A) B
		if e.Params != nil {
			for _, field := range e.Params.List {
				c.CollectFromExpr(field.Type)
			}
		}
		if e.Results != nil {
			for _, field := range e.Results.List {
				c.CollectFromExpr(field.Type)
			}
		}
	case *ast.IndexExpr:
		// Generic type like Type[Arg]
		c.CollectFromExpr(e.X)
		c.CollectFromExpr(e.Index)
	case *ast.IndexListExpr:
		// Multi-parameter generic like Type[A, B]
		c.CollectFromExpr(e.X)
		for _, idx := range e.Indices {
			c.CollectFromExpr(idx)
		}
	case *ast.Ellipsis:
		// Variadic like ...Type
		c.CollectFromExpr(e.Elt)
	case *ast.InterfaceType:
		// interface{} - no types to collect
	case *ast.StructType:
		// Anonymous struct type
		if e.Fields != nil {
			for _, field := range e.Fields.List {
				c.CollectFromExpr(field.Type)
			}
		}
	}
}

// CollectFromFieldList collects type references from a list of fields (params, results).
func (c *TypeReferenceCollector) CollectFromFieldList(fl *ast.FieldList) {
	if fl == nil {
		return
	}
	for _, field := range fl.List {
		c.CollectFromExpr(field.Type)
	}
}

// GetExternalRefs returns type references that are not locally defined.
func (c *TypeReferenceCollector) GetExternalRefs() map[string]bool {
	result := make(map[string]bool)
	for typeName := range c.refs {
		baseName := typeName
		if strings.Contains(typeName, ".") {
			parts := strings.SplitN(typeName, ".", 2)
			baseName = parts[1]
		}
		if !c.definedTypes[baseName] && !isBuiltinType(typeName) {
			result[typeName] = true
		}
	}
	return result
}

// engineContext holds per-engine mutable state, eliminating global variables.
// A fresh context is created for each extractPackage call.
type engineContext struct {
	typeCollector      *TypeReferenceCollector
	importMap          map[string]string
	externalTypeKinds  map[string]string
	externalTypeMethods map[string][]FuncApi
	projectRoot        string
}

func newEngineContext(projectRoot string) *engineContext {
	return &engineContext{
		typeCollector:       NewTypeReferenceCollector(),
		importMap:           make(map[string]string),
		externalTypeKinds:   make(map[string]string),
		externalTypeMethods: make(map[string][]FuncApi),
		projectRoot:         projectRoot,
	}
}

// collectImports graphs import alias -> path mappings from a Go file's AST.
// This enables rigorous resolution of package aliases to their full import paths.
func collectImports(ctx *engineContext, file *ast.File) {
	for _, imp := range file.Imports {
		// Get the import path (strip quotes)
		importPath := strings.Trim(imp.Path.Value, "\"")

		// Determine the alias used in code
		var alias string
		if imp.Name != nil {
			// Explicit alias: import foo "github.com/example/pkg"
			alias = imp.Name.Name
			if alias == "_" || alias == "." {
				continue // blank import or dot import, skip
			}
		} else {
			// Default alias is the last path component
			parts := strings.Split(importPath, "/")
			alias = parts[len(parts)-1]
		}

		// Map alias to full path (later imports override earlier ones, which is correct Go behavior)
		ctx.importMap[alias] = importPath
	}
}

func collectTypeReferences(ctx *engineContext) map[string]bool {
	// Use the AST-collected references instead
	return ctx.typeCollector.GetExternalRefs()
}

func resolveTransitiveDependencies(ctx *engineContext) []DependencyInfo {
	refs := collectTypeReferences(ctx)
	if len(refs) == 0 {
		return nil
	}

	// Group external types by their resolved import path
	depTypes := make(map[string][]string) // full import path -> type names

	for typeName := range refs {
		if strings.Contains(typeName, ".") {
			parts := strings.SplitN(typeName, ".", 2)
			pkgAlias := parts[0]
			typeBaseName := parts[1]

			// Resolve alias to full import path using collected imports
			fullPath := pkgAlias
			if resolved, ok := ctx.importMap[pkgAlias]; ok {
				fullPath = resolved
			}

			depTypes[fullPath] = append(depTypes[fullPath], typeBaseName)
		}
	}

	// Convert to DependencyInfo list, classifying known interface embeds
	var deps []DependencyInfo
	for pkgPath, types := range depTypes {
		dep := DependencyInfo{Package: pkgPath, IsStdlib: isStdlibPackage(pkgPath)}
		for _, t := range types {
			// Check if this type was seen as an interface embed (qualified name)
			qualifiedName := ""
			if resolved, ok := ctx.importMap[pkgPath]; ok {
				_ = resolved // pkgPath is already resolved
			}
			// Try matching with the original alias from the import map
			for alias, fullPath := range ctx.importMap {
				if fullPath == pkgPath {
					qualifiedName = alias + "." + t
					break
				}
			}
			if qualifiedName == "" {
				qualifiedName = pkgPath + "." + t
			}

			kind := ctx.externalTypeKinds[pkgPath+"."+t]
			if kind == "interface" || ctx.typeCollector.IsKnownInterface(qualifiedName) {
				dep.Interfaces = append(dep.Interfaces, IfaceApi{Name: t})
			} else if kind == "struct" {
				dep.Structs = append(dep.Structs, StructApi{Name: t})
			} else {
				dep.Types = append(dep.Types, TypeApi{Name: t})
			}
		}
		deps = append(deps, dep)
	}

	// Sort by package name
	sort.Slice(deps, func(i, j int) bool {
		return deps[i].Package < deps[j].Package
	})

	return deps
}

func extractPkg(ctx *engineContext, pkg *doc.Package, fset *token.FileSet) *PackageApi {
	api := &PackageApi{
		Doc: firstLine(pkg.Doc),
	}

	// Types (structs and interfaces)
	for _, t := range pkg.Types {
		if !isExported(t.Name) {
			continue
		}

		// Add type-associated functions (constructors like NewXxx) to top-level functions
		for _, f := range t.Funcs {
			if !isExported(f.Name) {
				continue
			}
			api.Functions = append(api.Functions, extractFunc(ctx, f.Decl, f.Doc))
		} 

		// Add type-associated constants to top-level constants
		for _, c := range t.Consts {
			for _, spec := range c.Decl.Specs {
				vs, ok := spec.(*ast.ValueSpec)
				if !ok {
					continue
				}
				for i, name := range vs.Names {
					if !isExported(name.Name) {
						continue
					}
					cv := ConstApi{
						Name: name.Name,
						Doc:  firstLine(c.Doc),
						Type: t.Name, // Type from the associated type
					}
					if isDeprecated, deprecatedMsg := deprecationFromDoc(cv.Doc); isDeprecated {
						cv.IsDeprecated = true
						cv.DeprecatedMsg = deprecatedMsg
					}
					if vs.Type != nil {
						cv.Type = formatExpr(vs.Type)
					}
					if i < len(vs.Values) {
						cv.Value = formatExpr(vs.Values[i])
					}
					api.Constants = append(api.Constants, cv)
				}
			}
		}

		for _, spec := range t.Decl.Specs {
			ts, ok := spec.(*ast.TypeSpec)
			if !ok {
				continue
			}

			switch st := ts.Type.(type) {
			case *ast.StructType:
				s := extractStruct(ctx, t, st)
				s.TypeParams = extractTypeParams(ts.TypeParams)
				api.Structs = append(api.Structs, s)

			case *ast.InterfaceType:
				i := extractInterface(ctx, t, st)
				api.Interfaces = append(api.Interfaces, i)

			default:
				// Type alias - collect type reference and register as defined
				ctx.typeCollector.AddDefinedType(t.Name)
				ctx.typeCollector.CollectFromExpr(ts.Type)
				typeApi := TypeApi{
					Name: t.Name,
					Type: formatExpr(ts.Type),
					Doc:  firstLine(t.Doc),
				}
				if isDeprecated, deprecatedMsg := deprecationFromDoc(typeApi.Doc); isDeprecated {
					typeApi.IsDeprecated = true
					typeApi.DeprecatedMsg = deprecatedMsg
				}
				api.Types = append(api.Types, typeApi)
			}
		}
	}

	// Functions
	for _, f := range pkg.Funcs {
		if !isExported(f.Name) {
			continue
		}
		api.Functions = append(api.Functions, extractFunc(ctx, f.Decl, f.Doc))
	}

	// Constants
	for _, c := range pkg.Consts {
		for _, spec := range c.Decl.Specs {
			vs, ok := spec.(*ast.ValueSpec)
			if !ok {
				continue
			}
			for i, name := range vs.Names {
				if !isExported(name.Name) {
					continue
				}
				cv := ConstApi{
					Name: name.Name,
					Doc:  firstLine(c.Doc),
				}
				if isDeprecated, deprecatedMsg := deprecationFromDoc(cv.Doc); isDeprecated {
					cv.IsDeprecated = true
					cv.DeprecatedMsg = deprecatedMsg
				}
				if vs.Type != nil {
					cv.Type = formatExpr(vs.Type)
				}
				if i < len(vs.Values) {
					cv.Value = formatExpr(vs.Values[i])
				}
				api.Constants = append(api.Constants, cv)
			}
		}
	}

	// Variables
	for _, v := range pkg.Vars {
		for _, spec := range v.Decl.Specs {
			vs, ok := spec.(*ast.ValueSpec)
			if !ok {
				continue
			}
			for _, name := range vs.Names {
				if !isExported(name.Name) {
					continue
				}
				vv := VarApi{
					Name: name.Name,
					Doc:  firstLine(v.Doc),
				}
				if isDeprecated, deprecatedMsg := deprecationFromDoc(vv.Doc); isDeprecated {
					vv.IsDeprecated = true
					vv.DeprecatedMsg = deprecatedMsg
				}
				if vs.Type != nil {
					vv.Type = formatExpr(vs.Type)
				}
				api.Variables = append(api.Variables, vv)
			}
		}
	}

	return api
}

func enrichPackageWithTypeChecker(ctx *engineContext, fset *token.FileSet, pkgName string, astPkg *ast.Package, api *PackageApi) {
	if ctx == nil || fset == nil || astPkg == nil || api == nil {
		return
	}

	files := make([]*ast.File, 0, len(astPkg.Files))
	fileNames := make([]string, 0, len(astPkg.Files))
	for fileName := range astPkg.Files {
		fileNames = append(fileNames, fileName)
	}
	sort.Strings(fileNames)
	for _, fileName := range fileNames {
		files = append(files, astPkg.Files[fileName])
	}

	config := types.Config{
		Importer: importer.Default(),
		Error:    func(error) {},
	}

	typedPkg, err := config.Check(pkgName, fset, files, nil)
	if err != nil && typedPkg == nil {
		return
	}
	if typedPkg == nil {
		return
	}

	importsByPath := make(map[string]*types.Package)
	for _, imported := range typedPkg.Imports() {
		importsByPath[imported.Path()] = imported
	}

	for _, structInfo := range api.Structs {
		obj := typedPkg.Scope().Lookup(structInfo.Name)
		typeName, ok := obj.(*types.TypeName)
		if !ok {
			continue
		}
		named, ok := typeName.Type().(*types.Named)
		if !ok {
			continue
		}

		methodSet := types.NewMethodSet(types.NewPointer(named))
		for methodIndex := 0; methodIndex < methodSet.Len(); methodIndex++ {
			selection := methodSet.At(methodIndex)
			methodObj, ok := selection.Obj().(*types.Func)
			if !ok || !methodObj.Exported() {
				continue
			}

			signature, ok := methodObj.Type().(*types.Signature)
			if !ok {
				continue
			}

			params, results, sig, ret := signatureToApiShapes(signature)
			method := FuncApi{
				Name:     methodObj.Name(),
				IsMethod: true,
				Receiver: structInfo.Name,
				Params:   params,
				Results:  results,
				Sig:      sig,
				Ret:      ret,
			}

			for structIndex := range api.Structs {
				if api.Structs[structIndex].Name != structInfo.Name {
					continue
				}
				if !goMethodExists(api.Structs[structIndex].Methods, method) {
					api.Structs[structIndex].Methods = append(api.Structs[structIndex].Methods, method)
				}
				break
			}
		}
	}

	refs := ctx.typeCollector.GetExternalRefs()
	for typeName := range refs {
		parts := strings.SplitN(typeName, ".", 2)
		if len(parts) != 2 {
			continue
		}

		alias, symbol := parts[0], parts[1]
		importPath, ok := ctx.importMap[alias]
		if !ok {
			continue
		}

		importedPkg, ok := importsByPath[importPath]
		if !ok {
			continue
		}

		obj := importedPkg.Scope().Lookup(symbol)
		if obj == nil {
			continue
		}

		underlying := obj.Type().Underlying()
		switch underlying.(type) {
		case *types.Interface:
			ctx.externalTypeKinds[importPath+"."+symbol] = "interface"
		case *types.Struct:
			ctx.externalTypeKinds[importPath+"."+symbol] = "struct"
		}
	}
}

func signatureToApiShapes(sig *types.Signature) ([]ParameterInfo, []ResultInfo, string, string) {
	qualifier := func(pkg *types.Package) string {
		if pkg == nil {
			return ""
		}
		return pkg.Name()
	}

	params := []ParameterInfo{}
	paramParts := []string{}
	if sig.Params() != nil {
		for i := 0; i < sig.Params().Len(); i++ {
			param := sig.Params().At(i)
			typeName := types.TypeString(param.Type(), qualifier)
			isVariadic := sig.Variadic() && i == sig.Params().Len()-1
			if isVariadic {
				typeName = strings.Replace(typeName, "[]", "...", 1)
			}

			params = append(params, ParameterInfo{
				Name:       param.Name(),
				Type:       typeName,
				IsVariadic: isVariadic,
			})
			paramParts = append(paramParts, typeName)
		}
	}

	results := []ResultInfo{}
	resultParts := []string{}
	if sig.Results() != nil {
		for i := 0; i < sig.Results().Len(); i++ {
			result := sig.Results().At(i)
			typeName := types.TypeString(result.Type(), qualifier)
			results = append(results, ResultInfo{Name: result.Name(), Type: typeName})
			resultParts = append(resultParts, typeName)
		}
	}

	sigText := strings.Join(paramParts, ", ")
	retText := strings.Join(resultParts, ", ")
	return params, results, sigText, retText
}

func goMethodExists(existing []FuncApi, candidate FuncApi) bool {
	for _, method := range existing {
		if method.Name == candidate.Name && method.Sig == candidate.Sig && method.Ret == candidate.Ret {
			return true
		}
	}
	return false
}

func enrichExternalPackagesFromSources(ctx *engineContext) {
	if ctx == nil || len(ctx.importMap) == 0 {
		return
	}

	uniqueImportPaths := make(map[string]bool)
	for _, importPath := range ctx.importMap {
		if importPath == "" || isStdlibPackage(importPath) {
			continue
		}
		uniqueImportPaths[importPath] = true
	}

	for importPath := range uniqueImportPaths {
		dir := resolveGoPackageDir(ctx.projectRoot, importPath)
		if dir == "" {
			continue
		}

		enrichExternalPackageFromDir(ctx, importPath, dir)
	}
}

func resolveGoPackageDir(projectRoot string, importPath string) string {
	if projectRoot == "" || importPath == "" {
		return ""
	}

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	cmd := exec.CommandContext(ctx, "go", "list", "-f", "{{.Dir}}", importPath)
	cmd.Dir = projectRoot
	out, err := cmd.Output()
	if err != nil {
		return ""
	}

	return strings.TrimSpace(string(out))
}

func enrichExternalPackageFromDir(ctx *engineContext, importPath string, dir string) {
	fset := token.NewFileSet()
	pkgs, err := parser.ParseDir(fset, dir, func(fi os.FileInfo) bool {
		name := fi.Name()
		return strings.HasSuffix(name, ".go") && !strings.HasSuffix(name, "_test.go")
	}, parser.ParseComments)
	if err != nil || len(pkgs) == 0 {
		return
	}

	for _, astPkg := range pkgs {
		docPkg := doc.New(astPkg, dir, doc.AllDecls)

		exportedStructs := make(map[string]bool)
		exportedInterfaces := make(map[string]bool)

		for _, t := range docPkg.Types {
			if !isExported(t.Name) {
				continue
			}

			for _, spec := range t.Decl.Specs {
				ts, ok := spec.(*ast.TypeSpec)
				if !ok || !isExported(ts.Name.Name) {
					continue
				}

				typeKey := importPath + "." + ts.Name.Name
				switch typed := ts.Type.(type) {
				case *ast.InterfaceType:
					ctx.externalTypeKinds[typeKey] = "interface"
					exportedInterfaces[ts.Name.Name] = true
					ctx.externalTypeMethods[typeKey] = append(ctx.externalTypeMethods[typeKey], extractInterfaceMethods(typed)...)
				case *ast.StructType:
					ctx.externalTypeKinds[typeKey] = "struct"
					exportedStructs[ts.Name.Name] = true
				}
			}
		}

		for _, t := range docPkg.Types {
			if !isExported(t.Name) || !exportedStructs[t.Name] {
				continue
			}

			typeKey := importPath + "." + t.Name
			for _, method := range t.Methods {
				if !isExported(method.Name) {
					continue
				}
				fn := extractFuncShallow(method.Decl, method.Doc)
				fn.IsMethod = true
				fn.Receiver = t.Name
				if !goMethodExists(ctx.externalTypeMethods[typeKey], fn) {
					ctx.externalTypeMethods[typeKey] = append(ctx.externalTypeMethods[typeKey], fn)
				}
			}
		}
	}
}

func extractInterfaceMethods(it *ast.InterfaceType) []FuncApi {
	if it == nil || it.Methods == nil {
		return nil
	}

	methods := []FuncApi{}
	for _, field := range it.Methods.List {
		if len(field.Names) == 0 {
			continue
		}
		for _, name := range field.Names {
			if !isExported(name.Name) {
				continue
			}
			ft, ok := field.Type.(*ast.FuncType)
			if !ok {
				continue
			}
			methods = append(methods, FuncApi{
				Name:    name.Name,
				Params:  extractParamInfos(ft.Params),
				Results: engineResultInfos(ft.Results),
				Sig:     formatParams(ft.Params),
				Ret:     formatResults(ft.Results),
			})
		}
	}

	return methods
}

func extractFuncShallow(decl *ast.FuncDecl, docStr string) FuncApi {
	f := FuncApi{
		Name:       decl.Name.Name,
		Params:     extractParamInfos(decl.Type.Params),
		Results:    engineResultInfos(decl.Type.Results),
		Sig:        formatParams(decl.Type.Params),
		Ret:        formatResults(decl.Type.Results),
		Doc:        firstLine(docStr),
		TypeParams: extractTypeParams(decl.Type.TypeParams),
	}
	if isDeprecated, deprecatedMsg := deprecationFromDoc(f.Doc); isDeprecated {
		f.IsDeprecated = true
		f.DeprecatedMsg = deprecatedMsg
	}

	if decl.Recv != nil && len(decl.Recv.List) > 0 {
		f.IsMethod = true
		f.Receiver = formatExpr(decl.Recv.List[0].Type)
	}

	return f
}

func applyEmbeddedMethodPromotion(ctx *engineContext, api *PackageApi) {
	if api == nil || len(api.Structs) == 0 {
		return
	}

	structMethods := make(map[string][]FuncApi)
	for _, st := range api.Structs {
		promotable := make([]FuncApi, 0, len(st.Methods))
		for _, method := range st.Methods {
			if method.IsMethod {
				promotable = append(promotable, method)
			}
		}
		structMethods[st.Name] = promotable
	}

	interfaceMethods := make(map[string][]FuncApi)
	for _, iface := range api.Interfaces {
		interfaceMethods[iface.Name] = iface.Methods
	}

	for index := range api.Structs {
		st := &api.Structs[index]
		if len(st.Embeds) == 0 {
			continue
		}

		existing := make(map[string]bool)
		for _, method := range st.Methods {
			existing[method.Name+"|"+method.Sig+"|"+method.Ret] = true
		}

		for _, embed := range st.Embeds {
			embeddedName := normalizeEmbeddedTypeName(embed)
			if embeddedName == "" || embeddedName == st.Name {
				continue
			}

			if methods, ok := structMethods[embeddedName]; ok {
				for _, method := range methods {
					key := method.Name + "|" + method.Sig + "|" + method.Ret
					if existing[key] {
						continue
					}
					st.Methods = append(st.Methods, method)
					existing[key] = true
				}
			}

			if methods, ok := interfaceMethods[embeddedName]; ok {
				for _, method := range methods {
					key := method.Name + "|" + method.Sig + "|" + method.Ret
					if existing[key] {
						continue
					}
					st.Methods = append(st.Methods, method)
					existing[key] = true
				}
			}

			if ctx != nil {
				externalKey := externalTypeLookupKey(ctx, embed)
				if methods, ok := ctx.externalTypeMethods[externalKey]; ok {
					for _, method := range methods {
						key := method.Name + "|" + method.Sig + "|" + method.Ret
						if existing[key] {
							continue
						}
						st.Methods = append(st.Methods, method)
						existing[key] = true
					}
				}
			}
		}
	}
}

func externalTypeLookupKey(ctx *engineContext, embed string) string {
	if ctx == nil {
		return ""
	}

	trimmed := strings.TrimSpace(embed)
	for strings.HasPrefix(trimmed, "*") {
		trimmed = strings.TrimPrefix(trimmed, "*")
	}

	if idx := strings.Index(trimmed, "["); idx >= 0 {
		trimmed = trimmed[:idx]
	}

	parts := strings.SplitN(trimmed, ".", 2)
	if len(parts) != 2 {
		return ""
	}

	alias, typeName := parts[0], parts[1]
	importPath := ctx.importMap[alias]
	if importPath == "" {
		return ""
	}

	return importPath + "." + typeName
}

func normalizeEmbeddedTypeName(embed string) string {
	trimmed := strings.TrimSpace(embed)
	for strings.HasPrefix(trimmed, "*") {
		trimmed = strings.TrimPrefix(trimmed, "*")
	}

	if idx := strings.Index(trimmed, "["); idx >= 0 {
		trimmed = trimmed[:idx]
	}

	if idx := strings.LastIndex(trimmed, "."); idx >= 0 {
		trimmed = trimmed[idx+1:]
	}

	return strings.TrimSpace(trimmed)
}

func extractStruct(ctx *engineContext, t *doc.Type, st *ast.StructType) StructApi {
	s := StructApi{
		Name: t.Name,
		Doc:  firstLine(t.Doc),
	}
	if isDeprecated, deprecatedMsg := deprecationFromDoc(s.Doc); isDeprecated {
		s.IsDeprecated = true
		s.DeprecatedMsg = deprecatedMsg
	}

	// Register as defined type
	ctx.typeCollector.AddDefinedType(t.Name)

	// Fields
	for _, field := range st.Fields.List {
		// Collect type references from AST
		ctx.typeCollector.CollectFromExpr(field.Type)

		if len(field.Names) == 0 {
			// Embedded struct/interface (Go composition)
			s.Embeds = append(s.Embeds, formatExpr(field.Type))
			continue
		}
		for _, name := range field.Names {
			if !isExported(name.Name) {
				continue
			}
			f := FieldApi{
				Name: name.Name,
				Type: formatExpr(field.Type),
			}
			if isDeprecated, deprecatedMsg := deprecationFromDoc(firstLine(field.Doc.Text())); isDeprecated {
				f.IsDeprecated = true
				f.DeprecatedMsg = deprecatedMsg
			}
			if field.Tag != nil {
				f.Tag = field.Tag.Value
			}
			s.Fields = append(s.Fields, f)
		}
	}

	// Methods
	for _, m := range t.Methods {
		if !isExported(m.Name) {
			continue
		}
		s.Methods = append(s.Methods, extractFunc(ctx, m.Decl, m.Doc))
	}

	// Constructor functions (like NewSampleClient)
	for _, f := range t.Funcs {
		if !isExported(f.Name) {
			continue
		}
		fn := extractFunc(ctx, f.Decl, f.Doc)
		fn.IsMethod = false // These are constructors, not methods
		s.Methods = append(s.Methods, fn)
	}

	return s
}

func extractInterface(ctx *engineContext, t *doc.Type, it *ast.InterfaceType) IfaceApi {
	i := IfaceApi{
		Name: t.Name,
		Doc:  firstLine(t.Doc),
	}
	if isDeprecated, deprecatedMsg := deprecationFromDoc(i.Doc); isDeprecated {
		i.IsDeprecated = true
		i.DeprecatedMsg = deprecatedMsg
	}

	// Register as defined type
	ctx.typeCollector.AddDefinedType(t.Name)

	for _, m := range it.Methods.List {
		if len(m.Names) == 0 {
			// Embedded interface (Go interface composition) — track as known interface
			ctx.typeCollector.AddInterfaceEmbed(m.Type)
			i.Embeds = append(i.Embeds, formatExpr(m.Type))
			continue
		}
		for _, name := range m.Names {
			if !isExported(name.Name) {
				continue
			}
			ft, ok := m.Type.(*ast.FuncType)
			if !ok {
				continue
			}
			// Collect type references from method params and results
			ctx.typeCollector.CollectFromFieldList(ft.Params)
			ctx.typeCollector.CollectFromFieldList(ft.Results)

			i.Methods = append(i.Methods, FuncApi{
				Name: name.Name,
				Params: extractParamInfos(ft.Params),
				Results: engineResultInfos(ft.Results),
				Sig:  formatParams(ft.Params),
				Ret:  formatResults(ft.Results),
			})
		}
	}

	return i
}

func extractFunc(ctx *engineContext, decl *ast.FuncDecl, docStr string) FuncApi {
	// Collect type references from params and results
	ctx.typeCollector.CollectFromFieldList(decl.Type.Params)
	ctx.typeCollector.CollectFromFieldList(decl.Type.Results)

	f := FuncApi{
		Name:       decl.Name.Name,
		Params:     extractParamInfos(decl.Type.Params),
		Results:    engineResultInfos(decl.Type.Results),
		Sig:        formatParams(decl.Type.Params),
		Ret:        formatResults(decl.Type.Results),
		Doc:        firstLine(docStr),
		TypeParams: extractTypeParams(decl.Type.TypeParams),
	}
	if isDeprecated, deprecatedMsg := deprecationFromDoc(f.Doc); isDeprecated {
		f.IsDeprecated = true
		f.DeprecatedMsg = deprecatedMsg
	}

	if decl.Recv != nil && len(decl.Recv.List) > 0 {
		f.IsMethod = true
		f.Receiver = formatExpr(decl.Recv.List[0].Type)
		// Collect receiver type reference
		ctx.typeCollector.CollectFromFieldList(decl.Recv)
	}

	return f
}

// extractTypeParams graphs type parameter names and constraints from a TypeParamList (Go 1.18+).
func extractTypeParams(tpl *ast.FieldList) []string {
	if tpl == nil || len(tpl.List) == 0 {
		return nil
	}
	var params []string
	for _, field := range tpl.List {
		constraint := formatExpr(field.Type)
		for _, name := range field.Names {
			if constraint != "" {
				params = append(params, name.Name+" "+constraint)
			} else {
				params = append(params, name.Name)
			}
		}
	}
	return params
}

func extractParamInfos(fl *ast.FieldList) []ParameterInfo {
	if fl == nil || len(fl.List) == 0 {
		return nil
	}
	params := []ParameterInfo{}
	for _, field := range fl.List {
		typeStr := formatExpr(field.Type)
		isVariadic := false
		if _, ok := field.Type.(*ast.Ellipsis); ok {
			isVariadic = true
		}
		if len(field.Names) == 0 {
			params = append(params, ParameterInfo{Type: typeStr, IsVariadic: isVariadic})
			continue
		}
		for _, name := range field.Names {
			params = append(params, ParameterInfo{Name: name.Name, Type: typeStr, IsVariadic: isVariadic})
		}
	}
	return params
}

func engineResultInfos(fl *ast.FieldList) []ResultInfo {
	if fl == nil || len(fl.List) == 0 {
		return nil
	}
	results := []ResultInfo{}
	for _, field := range fl.List {
		typeStr := formatExpr(field.Type)
		if len(field.Names) == 0 {
			results = append(results, ResultInfo{Type: typeStr})
			continue
		}
		for _, name := range field.Names {
			results = append(results, ResultInfo{Name: name.Name, Type: typeStr})
		}
	}
	return results
}

func formatParams(fl *ast.FieldList) string {
	if fl == nil {
		return ""
	}
	var parts []string
	for _, p := range fl.List {
		typeStr := formatExpr(p.Type)
		if len(p.Names) == 0 {
			parts = append(parts, typeStr)
		} else {
			for _, name := range p.Names {
				parts = append(parts, name.Name+" "+typeStr)
			}
		}
	}
	return strings.Join(parts, ", ")
}

func formatResults(fl *ast.FieldList) string {
	if fl == nil || len(fl.List) == 0 {
		return ""
	}
	var parts []string
	for _, r := range fl.List {
		parts = append(parts, formatExpr(r.Type))
	}
	if len(parts) == 1 {
		return parts[0]
	}
	return "(" + strings.Join(parts, ", ") + ")"
}

func formatExpr(expr ast.Expr) string {
	if expr == nil {
		return ""
	}
	switch e := expr.(type) {
	case *ast.Ident:
		return e.Name
	case *ast.StarExpr:
		return "*" + formatExpr(e.X)
	case *ast.ArrayType:
		return "[]" + formatExpr(e.Elt)
	case *ast.MapType:
		return "map[" + formatExpr(e.Key) + "]" + formatExpr(e.Value)
	case *ast.SelectorExpr:
		return formatExpr(e.X) + "." + e.Sel.Name
	case *ast.InterfaceType:
		return "interface{}"
	case *ast.ChanType:
		return "chan " + formatExpr(e.Value)
	case *ast.FuncType:
		return "func(" + formatParams(e.Params) + ") " + formatResults(e.Results)
	case *ast.Ellipsis:
		return "..." + formatExpr(e.Elt)
	case *ast.BasicLit:
		return e.Value
	case *ast.IndexExpr:
		return formatExpr(e.X) + "[" + formatExpr(e.Index) + "]"
	case *ast.IndexListExpr:
		var indices []string
		for _, idx := range e.Indices {
			indices = append(indices, formatExpr(idx))
		}
		return formatExpr(e.X) + "[" + strings.Join(indices, ", ") + "]"
	default:
		return fmt.Sprintf("%T", expr)
	}
}

func firstLine(s string) string {
	s = strings.TrimSpace(s)
	if s == "" {
		return ""
	}
	lines := strings.SplitN(s, "\n", 2)
	line := strings.TrimSpace(lines[0])
	if len(line) > 120 {
		line = line[:117] + "..."
	}
	return line
}

func deprecationFromDoc(doc string) (bool, string) {
	if doc == "" {
		return false, ""
	}
	trimmed := strings.TrimSpace(doc)
	if strings.HasPrefix(trimmed, "Deprecated:") {
		message := strings.TrimSpace(strings.TrimPrefix(trimmed, "Deprecated:"))
		return true, message
	}
	return false, ""
}

func isExported(name string) bool {
	if name == "" {
		return false
	}
	r := []rune(name)[0]
	return unicode.IsUpper(r)
}

func detectPackageName(rootPath string) string {
	// Check go.mod
	gomod := filepath.Join(rootPath, "go.mod")
	if data, err := os.ReadFile(gomod); err == nil {
		lines := strings.Split(string(data), "\n")
		for _, line := range lines {
			if strings.HasPrefix(line, "module ") {
				return strings.TrimSpace(strings.TrimPrefix(line, "module "))
			}
		}
	}
	return filepath.Base(rootPath)
}

func formatStubs(api *ApiIndex) string {
	var sb strings.Builder
	sb.WriteString(fmt.Sprintf("// %s - Public API Surface\n", api.Package))
	sb.WriteString("// Graphed by PublicApiGraphEngine.Go\n\n")

	for _, pkg := range api.Packages {
		sb.WriteString(fmt.Sprintf("// Package: %s\n", pkg.Name))
		if pkg.Doc != "" {
			sb.WriteString(fmt.Sprintf("// %s\n", pkg.Doc))
		}
		sb.WriteString("\n")

		// Constants
		for _, c := range pkg.Constants {
			if c.Doc != "" {
				sb.WriteString(fmt.Sprintf("// %s\n", c.Doc))
			}
			if c.Type != "" {
				sb.WriteString(fmt.Sprintf("const %s %s = %s\n", c.Name, c.Type, c.Value))
			} else {
				sb.WriteString(fmt.Sprintf("const %s = %s\n", c.Name, c.Value))
			}
		}
		if len(pkg.Constants) > 0 {
			sb.WriteString("\n")
		}

		// Variables
		for _, v := range pkg.Variables {
			if v.Doc != "" {
				sb.WriteString(fmt.Sprintf("// %s\n", v.Doc))
			}
			sb.WriteString(fmt.Sprintf("var %s %s\n", v.Name, v.Type))
		}
		if len(pkg.Variables) > 0 {
			sb.WriteString("\n")
		}

		// Types
		for _, t := range pkg.Types {
			if t.Doc != "" {
				sb.WriteString(fmt.Sprintf("// %s\n", t.Doc))
			}
			sb.WriteString(fmt.Sprintf("type %s = %s\n", t.Name, t.Type))
		}
		if len(pkg.Types) > 0 {
			sb.WriteString("\n")
		}

		// Interfaces
		for _, i := range pkg.Interfaces {
			if i.Doc != "" {
				sb.WriteString(fmt.Sprintf("// %s\n", i.Doc))
			}
			sb.WriteString(fmt.Sprintf("type %s interface {\n", i.Name))
			for _, m := range i.Methods {
				ret := ""
				if m.Ret != "" {
					ret = " " + m.Ret
				}
				sb.WriteString(fmt.Sprintf("    %s(%s)%s\n", m.Name, m.Sig, ret))
			}
			sb.WriteString("}\n\n")
		}

		// Structs
		for _, s := range pkg.Structs {
			if s.Doc != "" {
				sb.WriteString(fmt.Sprintf("// %s\n", s.Doc))
			}
			sb.WriteString(fmt.Sprintf("type %s struct {\n", s.Name))
			for _, f := range s.Fields {
				sb.WriteString(fmt.Sprintf("    %s %s\n", f.Name, f.Type))
			}
			sb.WriteString("}\n")
			for _, m := range s.Methods {
				ret := ""
				if m.Ret != "" {
					ret = " " + m.Ret
				}
				sb.WriteString(fmt.Sprintf("func (%s) %s(%s)%s\n", m.Receiver, m.Name, m.Sig, ret))
			}
			sb.WriteString("\n")
		}

		// Functions
		for _, f := range pkg.Functions {
			if f.Doc != "" {
				sb.WriteString(fmt.Sprintf("// %s\n", f.Doc))
			}
			ret := ""
			if f.Ret != "" {
				ret = " " + f.Ret
			}
			sb.WriteString(fmt.Sprintf("func %s(%s)%s\n", f.Name, f.Sig, ret))
		}
		if len(pkg.Functions) > 0 {
			sb.WriteString("\n")
		}
	}

	return sb.String()
}
