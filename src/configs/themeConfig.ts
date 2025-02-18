// ** Types
import {
  Skin,
  Mode,
  ContentWidth,
  VerticalNavToggle,
} from "@/@core/layouts/types";

type ThemeConfig = {
  skin: Skin;
  mode: Mode;
  navHidden: boolean;
  templateName: string;
  navCollapsed: boolean;
  routingLoader: boolean;
  disableRipple: boolean;
  navigationSize: number;
  navSubItemIcon: string;
  menuTextTruncate: boolean;
  contentWidth: ContentWidth;
  disableCustomizer: boolean;
  responsiveFontSizes: boolean;
  collapsedNavigationSize: number;
  layout: "vertical";
  verticalNavToggleType: VerticalNavToggle;
  afterVerticalNavMenuContentPosition: "fixed" | "static";
  beforeVerticalNavMenuContentPosition: "fixed" | "static";
  toastPosition:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  projectName: string;
};

const themeConfig: ThemeConfig = {
  // ** Layout Configs
  templateName: "Vuexy" /* App Name */,
  layout: "vertical" /* vertical | horizontal */,
  mode: "light" as Mode /* light | dark | semi-dark /*! Note: semi-dark value will only work for Vertical Layout */,
  skin: "default" /* default | bordered */,
  contentWidth: "boxed" /* full | boxed */,

  // ** Routing Configs
  routingLoader: true /* true | false */,

  // ** Navigation (Menu) Configs
  navHidden: false /* true | false */,
  menuTextTruncate: true /* true | false */,
  navSubItemIcon: "" /* Icon */,
  verticalNavToggleType:
    "accordion" /* accordion | collapse /*! Note: This is for Vertical navigation menu only */,
  navCollapsed:
    false /* true | false /*! Note: This is for Vertical navigation menu only */,
  navigationSize: 309 /* Number in px(Pixels) /*! Note: This is for Vertical navigation menu only */,
  collapsedNavigationSize: 82 /* Number in px(Pixels) /*! Note: This is for Vertical navigation menu only */,
  afterVerticalNavMenuContentPosition: "fixed" /* fixed | static */,
  beforeVerticalNavMenuContentPosition: "fixed" /* fixed | static */,

  // ** Other Configs
  responsiveFontSizes: true /* true | false */,
  disableRipple: false /* true | false */,
  disableCustomizer: false /* true | false */,
  toastPosition:
    "top-right" /* top-left | top-center | top-right | bottom-left | bottom-center | bottom-right */,
  projectName: "Admin Panel",
};

export default themeConfig;
