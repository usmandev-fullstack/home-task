// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

// ** Icon Imports
import Icon from "@/@core/components/icon";

// ** Theme Config Import
import themeConfig from "@/configs/themeConfig";

// ** Type Import
import { LayoutProps } from "@/@core/layouts/types";

// import Customizer from 'src/@core/components/customizer'
import Navigation from "./navigation";

const VerticalLayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
});

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const ContentWrapper = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: theme.spacing(6),
  paddingTop: 0,
  transition: "padding .25s ease-in-out",
}));

const VerticalLayout = (props: LayoutProps) => {
  // ** Props
  const {
    hidden,
    children,
    scrollToTop,
    footerProps,
    contentHeightFixed,
    verticalLayoutProps,
  } = props;

  // ** Vars
  const navigationBorderWidth = 0;
  const { navigationSize, disableCustomizer, collapsedNavigationSize } =
    themeConfig;
  const navWidth = navigationSize;
  const collapsedNavWidth = collapsedNavigationSize;

  // ** States
  const [navVisible, setNavVisible] = useState<boolean>(false);

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible);

  return (
    <>
      <VerticalLayoutWrapper className="layout-wrapper">
        {/* Navigation Menu */}
        <Box
          sx={{
            background: "#2b2b2b",
          }}
        >
          <Navigation
            navWidth={navWidth}
            navVisible={navVisible}
            setNavVisible={setNavVisible}
            collapsedNavWidth={collapsedNavWidth}
            toggleNavVisibility={toggleNavVisibility}
            navigationBorderWidth={navigationBorderWidth}
            navMenuContent={verticalLayoutProps.navMenu.content}
            navMenuBranding={verticalLayoutProps.navMenu.branding}
            menuLockedIcon={verticalLayoutProps.navMenu.lockedIcon}
            verticalNavItems={verticalLayoutProps.navMenu.navItems}
            navMenuProps={verticalLayoutProps.navMenu.componentProps}
            menuUnlockedIcon={verticalLayoutProps.navMenu.unlockedIcon}
            afterNavMenuContent={verticalLayoutProps.navMenu.afterContent}
            beforeNavMenuContent={verticalLayoutProps.navMenu.beforeContent}
            {...props}
          />
        </Box>
        <MainContentWrapper
          className="layout-content-wrapper"
          sx={{ ...(contentHeightFixed && { maxHeight: "100vh" }) }}
        >
          {/* Content */}
          <ContentWrapper
            className="layout-page-content"
            sx={{
              ...(contentHeightFixed && {
                overflow: "hidden",
                "& > :first-of-type": { height: "100%" },
              }),
            }}
          >
            {children}
          </ContentWrapper>
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {/* Customizer */}
      {disableCustomizer || hidden ? null : null}
    </>
  );
};

export default VerticalLayout;
