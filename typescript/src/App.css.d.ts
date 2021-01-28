declare namespace AppCssNamespace {
  export interface IAppCss {
    App: string;
    "App-header": string;
    "App-link": string;
    "App-logo": string;
    "App-logo-spin": string;
    menu: string;
    "menu-head": string;
    "menu-list": string;
    menu_item: string;
    opener: string;
    "side-bar": string;
    "side-bar-inner": string;
    wrap: string;
  }
}

declare const AppCssModule: AppCssNamespace.IAppCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppCssNamespace.IAppCss;
};

export = AppCssModule;
