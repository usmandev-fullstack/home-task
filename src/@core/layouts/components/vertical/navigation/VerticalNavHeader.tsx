// ** Next Import
import Link from "next/link";

// ** MUI Imports
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";

// ** Type Import
import { LayoutProps } from "@/@core/layouts/types";

// ** Custom Icon Import
import Icon from "@/@core/components/icon";

// ** Configs
import themeConfig from "@/configs/themeConfig";

interface Props {
  navHover: boolean;
  collapsedNavWidth: number;
  hidden: LayoutProps["hidden"];
  navigationBorderWidth: number;
  toggleNavVisibility: () => void;
  navMenuBranding?: LayoutProps["verticalLayoutProps"]["navMenu"]["branding"];
  menuLockedIcon?: LayoutProps["verticalLayoutProps"]["navMenu"]["lockedIcon"];
  menuUnlockedIcon?: LayoutProps["verticalLayoutProps"]["navMenu"]["unlockedIcon"];
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: theme.spacing(4.5),
  transition: "padding .25s ease-in-out",
  minHeight: theme.mixins.toolbar.minHeight,
}));

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const {
    hidden,
    navHover,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon,
  } = props;

  // ** Hooks & Vars
  const theme = useTheme();

  const menuCollapsedStyles = !navHover ? { opacity: 0 } : { opacity: 1 };

  // console.log('mk:', navCollapsed && !navHover)

  const menuHeaderPaddingLeft = () => {
    if (!navHover) {
      if (userNavMenuBranding) {
        return 0;
      } else {
        return 1.5;
        //(collapsedNavWidth - navigationBorderWidth - 32) / 8
      }
    } else {
      return 4.5;
    }
  };

  const conditionalColors = () => {
    return {
      "& .MuiTypography-root, & .MuiIconButton-root": {
        color: "customColors.sideBarText",
      },
    };
  };

  const MenuUnlockedIcon = () =>
    userMenuUnlockedIcon || <Icon icon="tabler:circle" />;

  const Img = styled("img")(({ theme }) => ({}));

  return (
    <MenuHeaderWrapper
      className="nav-header"
      sx={{ mt: 9, pl: menuHeaderPaddingLeft(), ...conditionalColors() }}
    >
      {userNavMenuBranding ? userNavMenuBranding(props) : null}

      {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{
            p: 0,
            backgroundColor: "transparent !important",
            color: `${theme.palette.text.secondary} !important`,
          }}
        >
          <Icon icon="tabler:x" fontSize="1.25rem" />
        </IconButton>
      ) : userMenuLockedIcon === null &&
        userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={
            () => {}
            // saveSettings({ ...settings, navCollapsed: !navCollapsed })
          }
          sx={{
            p: 0,
            backgroundColor: "transparent !important",
            "& svg": {
              fontSize: "1.25rem",
              ...menuCollapsedStyles,
              transition: "opacity .25s ease-in-out",
            },
          }}
        >
          {MenuUnlockedIcon()}
        </IconButton>
      )}
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;
