import "@typespec/http";

using TypeSpec.Http;
@service({
    title: "Widget Service",
    version: "1.0.0",
})
namespace WidgetService;

model Widget {
    @doc("The UUID of this widget. This is generated automatically by the service.")
    id: string;
    @doc("The weight of the widget. This is an int32, but must be greater than zero.")
    weight: int32;
    @doc("The color of the widget.")
    color: "red" | "blue";
}

model CreateWidget {
    @doc("The weight of the widget. This is an int32, but must be greater than zero.")
    weight: int32;
    @doc("The color of the widget.")
    color: "red" | "blue";
}

model UpdateWidget {
    @doc("The UUID of this widget. This is generated automatically by the service.")
    @path
    id: string;
    @doc("The weight of the widget. This is an int32, but must be greater than zero.")
    weight?: int32;
    @doc("The color of the widget.")
    color?: "red" | "blue";
}

model AnalyzeResult {
    summary: string;
}

@error
model WidgetError {
    @doc("The HTTP error code.")
    code: int32;
    @doc("A human-readable message describing the error.")
    message: string;
}

@route("/widgets")
@tag("Widgets")
interface Widgets {
    @doc("""
     * List all widgets in the system. This operation is not paginated, and returns a simple array of widgets.
     *
     * It does not accept any options or parameters.
""")

    @get listWidgets(): Widget[] | WidgetError;

    @doc("Get a widget by ID.")
    @get getWidget(@path id: string): Widget | WidgetError;

    @doc("""
     * Create a new widget.
     *
     * The widget ID is not required during creation, as it is automatically set by the server. Providing an ID will
     * result in an error.
""")

    @post createWidget(...CreateWidget): {
        @statusCode code: 201;
        @body widget: Widget;
    } | WidgetError;

    @doc("""
     * Update the contents of the widget. The widget ID is required in the input, but cannot be changed. All other fields
     * are optional and will be updated within the widget if provided.
""")

    @patch updateWidget(...UpdateWidget): Widget | WidgetError;

    @doc("Delete a widget by ID.")
    @delete deleteWidget(@path id: string): {
        @statusCode code: 204;
    } | WidgetError;

    @doc("Analyze a widget. The only guarantee is that this method will return a string containing the results of the analysis.")
    @route("{id}/analyze") @post analyzeWidget(
        @path id: string
    ): AnalyzeResult | WidgetError;
}
