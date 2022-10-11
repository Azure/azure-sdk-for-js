import {
  Application as TypeDocApplication,
  DefaultTheme,
  Options,
  DefaultThemeRenderContext,
} from "typedoc";
import { toolbar } from "./toolbar.js";

export function loadTheme(app: TypeDocApplication) {
  app.renderer.defineTheme("azureSdk", AzureSdkTheme);
  // app.renderer.hooks.on("")
}

/**
 * The theme context is where all of the partials live for rendering a theme,
 * in addition to some helper functions.
 */
export class AzureSdkThemeContext extends DefaultThemeRenderContext {
  constructor(theme: DefaultTheme, options: Options) {
    super(theme, options);

    this.toolbar = (props) => {
      return toolbar(this, props);
    };
  }
}

export class AzureSdkTheme extends DefaultTheme {
  private _contextCache?: AzureSdkThemeContext;

  override getRenderContext(): AzureSdkThemeContext {
    this._contextCache ||= new AzureSdkThemeContext(this, this.application.options);
    return this._contextCache;
  }
}
