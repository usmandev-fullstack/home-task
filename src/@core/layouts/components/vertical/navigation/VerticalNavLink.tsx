// ** React Imports
import { ElementType } from "react";

// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// ** MUI Imports
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled, useTheme } from "@mui/material/styles";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";

// ** Configs Import
import themeConfig from "@/configs/themeConfig";

// ** Types
import { NavLink, NavGroup } from "@/@core/layouts/types";

// ** Custom Components Imports

// ** Util Imports
import { hexToRGBA } from "@/@core/utils/hex-to-rgba";

import UserIcon from "../UserIcon";

interface Props {
  parent?: boolean;
  item: NavLink;
  navHover?: boolean;
  navVisible?: boolean;
  collapsedNavWidth: number;
  navigationBorderWidth: number;
  toggleNavVisibility: () => void;
  isSubToSub?: NavGroup | undefined;
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & {
    component?: ElementType;
    href: string;
    target?: "_blank" | undefined;
  }
>(({ theme }) => ({
  width: "100%",
  marginLeft: theme.spacing(3.5),
  // marginRight: theme.spacing(3.5),
  borderRadius: theme.shape.borderRadius,
  transition: "padding-left .25s ease-in-out, padding-right .25s ease-in-out",
  "&.active": {
    "&, &:hover": {
      boxShadow: `0px 2px 6px ${hexToRGBA(theme.palette.primary.main, 0.48)}`,
      background: `linear-gradient(72.47deg, ${
        theme.direction === "ltr"
          ? theme.palette.primary.main
          : hexToRGBA(theme.palette.primary.main, 0.7)
      } 22.16%, ${
        theme.direction === "ltr"
          ? hexToRGBA(theme.palette.primary.main, 0.7)
          : theme.palette.primary.main
      } 76.47%)`,
      "&.Mui-focusVisible": {
        background: `linear-gradient(72.47deg, ${
          theme.palette.primary.dark
        } 22.16%, ${hexToRGBA(theme.palette.primary.dark, 0.7)} 76.47%)`,
      },
    },
    "& .MuiTypography-root, & svg": {
      color: `${theme.palette.common.white} !important`,
    },
  },
}));

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  justifyContent: "space-between",
  transition: "opacity .25s ease-in-out",
  ...(themeConfig.menuTextTruncate && { overflow: "hidden" }),
}));

const VerticalNavLink = ({
  item,
  parent,
  navHover,
  navVisible,
  isSubToSub,
  collapsedNavWidth,
  toggleNavVisibility,
  navigationBorderWidth,
}: Props) => {
  // ** Hooks
  const theme = useTheme();
  const router = useRouter();

  const icon = (parent && item.icon) || item.icon;
  const { size, sub, mid, fontsize, isActive, outer, isSvg, first } = item;
  //!item.icon ? themeConfig.navSubItemIcon :
  const conditionalColors = () => {
    return {
      "&:hover": {
        backgroundColor: isActive ? `#2e2e2e` : `#191a19`,
      },
      "& .MuiTypography-root, & svg": {
        color: "#FAFAFA",
      },
    };
  };

  const isNavLinkActive = () => {
    if (
      router.pathname === item.path
      // || handleURLQueries(router, item.path)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {item?.hide ? null : (
        <ListItem
          disablePadding
          className="nav-link"
          disabled={item.disabled || false}
          sx={{
            px: "0 !important",
            ml: sub ? 1 : outer ? 0 : 0,
            mt: outer
              ? 0
              : mid == "first" && !sub
              ? 0
              : mid == "all" && !sub
              ? 0
              : 0,
            mb: mid == "last" && !sub ? 0 : 0,
            width: sub ? `calc(100%)` : outer ? `calc(100%)` : `calc(100%)`,
          }}
          style={{
            marginTop: first ? "3em" : "0",
          }}
        >
          <MenuNavLink
            component={Link}
            {...(item.disabled && { tabIndex: -1 })}
            className={isNavLinkActive() ? "active" : ""}
            href={item.path === undefined ? "/" : `${item.path}`}
            {...(item.openInNewTab ? { target: "_blank" } : null)}
            onClick={(e: any) => {
              if (item.path === undefined) {
                e.preventDefault();
                e.stopPropagation();
              }
              if (navVisible) {
                toggleNavVisibility();
              }
            }}
            sx={{
              px: sub
                ? !navHover
                  ? (collapsedNavWidth - navigationBorderWidth - 22 - 28) / 8
                  : 4
                : 0,
              background: "#0f0f0f",
              borderLeft: `2px solid
               ${outer && isActive ? "orange" : "#4a4d52"}`,
              py: outer ? 1.4 : 1.6,
              ml: sub ? 2 : outer ? 0 : 0,

              borderTopLeftRadius:
                mid == "first" && !sub
                  ? "0px"
                  : mid == "first"
                  ? 0
                  : outer
                  ? "0px"
                  : 0,
              borderTopRightRadius:
                mid == "first" && !sub
                  ? "0px"
                  : mid == "first"
                  ? 0
                  : outer
                  ? "0px"
                  : 0,
              borderBottomRightRadius: mid == "last" ? "0px" : 0,
              borderBottomLeftRadius: mid == "last" ? "0px" : 0,
              borderRadius:
                !sub && isActive ? "0px" : mid == "all" ? "0px" : "",
              mr: outer ? 0 : 0,

              ...conditionalColors(),
              ...(item.disabled
                ? { pointerEvents: "none" }
                : { cursor: "pointer" }),
            }}
          >
            {sub ? null : (
              <ListItemIcon
                sx={{
                  pl: sub ? (icon ? 6 : outer && item.icon ? 6 : 3) : 2,
                  pr: sub ? 0 : 2,
                  transition: "margin .25s ease-in-out",
                  ...(!navHover ? { mr: 0 } : { mr: 2 }),
                  ...(parent
                    ? { ml: outer ? 0 : sub ? 0 : 1.5, mr: outer ? 0 : 3.5 }
                    : {}), // This line should be after (navCollapsed && !navHover) condition for proper styling
                  "& svg": {
                    fontSize: size ? size : "0.625rem",
                    ...(!parent ? { fontSize: size ? size : "1.375rem" } : {}),
                    ...(parent && item.icon
                      ? { fontSize: size ? size : "0.875rem" }
                      : {}),
                  },
                }}
              >
                {isSvg ? (
                  <img src={icon as any} width={"18px"} height={"18px"}></img>
                ) : icon ? (
                  <UserIcon
                    icon={icon as string}
                    style={{ color: sub ? "rgba(54, 140, 190, 1)" : "" }}
                  />
                ) : outer && item.icon ? (
                  <UserIcon
                    icon={item.icon as string}
                    style={{ color: sub ? "rgba(54, 140, 190, 1)" : "" }}
                  />
                ) : (
                  <Box sx={{ px: 0, ml: 0 }} />
                )}
              </ListItemIcon>
            )}

            <MenuItemTextMetaWrapper
              sx={{
                mr: "2em",
                mt: 0.5,
                ...(isSubToSub
                  ? { ml: icon ? (sub ? 0 : 3) : 2 }
                  : { ml: sub ? 2 : 0 }),
                ...(!navHover ? { opacity: 1 } : { opacity: 1 }),
              }}
            >
              <Typography
                {...((themeConfig.menuTextTruncate ||
                  (!themeConfig.menuTextTruncate && !navHover)) && {
                  noWrap: true,
                })}
                sx={{
                  fontSize: fontsize ? fontsize : "2rem",
                }}
              >
                {item.title}
              </Typography>
              {item.badgeContent ? (
                <Chip
                  label={item.badgeContent}
                  color={item.badgeColor || "primary"}
                  sx={{
                    color: "#0f0f0f",
                    background: "orange",
                    height: 20,
                    fontWeight: 500,
                    "& .MuiChip-label": {
                      pr: 1.5,
                      pl: 1.3,
                      textTransform: "capitalize",
                    },
                  }}
                />
              ) : null}
            </MenuItemTextMetaWrapper>
          </MenuNavLink>
        </ListItem>
      )}
    </>
  );
};

export default VerticalNavLink;
