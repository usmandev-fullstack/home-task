// ** Type Imports
import { ReactNode } from "react";
import { Theme, SxProps, PaletteMode } from "@mui/material";
import { SwipeableDrawerProps } from "@mui/material/SwipeableDrawer";

export type Layout = "vertical";

export type Skin = "default" | "bordered";

export type Mode = PaletteMode | "semi-dark";

export type ContentWidth = "full" | "boxed";

export type VerticalNavToggle = "accordion" | "collapse";

export type NavSectionTitle = {
  action?: string;
  subject?: string;
  sectionTitle: string;
  item?: boolean;
};

export type NavGroup = {
  hide?: boolean;
  icon?: string;
  size?: string;
  mid?: string;
  isSvg?: boolean;
  fontsize?: string;
  sub?: boolean;
  title: string;
  action?: string;
  subject?: string;
  badgeContent?: string;
  children?: (NavGroup | NavLink)[];
  badgeColor?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";
};

export type NavLink = {
  first?: boolean;
  hide?: boolean;
  icon?: string;
  size?: string;
  isSvg?: any;
  outer?: boolean;
  fontsize?: string;
  mid?: string;
  sub?: boolean;
  isActive?: boolean;
  path?: string;
  title: string;
  action?: string;
  subject?: string;
  disabled?: boolean;
  badgeContent?: string;
  externalLink?: boolean;
  openInNewTab?: boolean;
  badgeColor?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";
};

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[];

export type FooterProps = {
  sx?: SxProps<Theme>;
  content?: (props?: any) => ReactNode;
};

export type VerticalLayoutProps = {
  navMenu: {
    lockedIcon?: ReactNode;
    unlockedIcon?: ReactNode;
    navItems?: VerticalNavItemsType;
    content?: (props?: any) => ReactNode;
    branding?: (props?: any) => ReactNode;
    afterContent?: (props?: any) => ReactNode;
    beforeContent?: (props?: any) => ReactNode;
    componentProps?: Omit<SwipeableDrawerProps, "open" | "onOpen" | "onClose">;
  };
};

export type LayoutProps = {
  hidden: boolean;
  children: ReactNode;
  footerProps?: FooterProps;
  contentHeightFixed?: boolean;
  scrollToTop?: (props?: any) => ReactNode;
  verticalLayoutProps: VerticalLayoutProps;
};
