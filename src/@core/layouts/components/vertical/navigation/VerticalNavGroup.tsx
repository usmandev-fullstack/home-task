// ** React Imports
import { useEffect, Fragment } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled, useTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";

// ** Third Party Imports
import clsx from "clsx";

// ** Icon Imports
import Icon from "@/@core/components/icon";

// ** Configs Import
import themeConfig from "@/configs/themeConfig";

// ** Utils
import { hasActiveChild, removeChildren } from "@/@core/layouts/utils";

// ** Type Import
import { NavGroup, LayoutProps } from "@/@core/layouts/types";

// ** Custom Components Imports
import VerticalNavItems from "./VerticalNavItems";
import UserIcon from "../UserIcon";

interface Props {
  item: NavGroup;
  navHover: boolean;
  parent?: NavGroup;
  navVisible?: boolean;
  groupActive: string[];
  collapsedNavWidth: number;
  currentActiveGroup: string[];
  navigationBorderWidth: number;
  isSubToSub?: NavGroup | undefined;
  setGroupActive: (values: string[]) => void;
  setCurrentActiveGroup: (items: string[]) => void;
}

const MenuItemTextWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0),
  justifyContent: "space-between",
  transition: "opacity .25s ease-in-out",
  ...(themeConfig.menuTextTruncate && { overflow: "hidden" }),
}));

const VerticalNavGroup = (props: Props) => {
  // ** Props
  const {
    item,
    parent,
    navHover,
    navVisible,
    isSubToSub,
    groupActive,
    setGroupActive,
    collapsedNavWidth,
    currentActiveGroup,
    setCurrentActiveGroup,
    navigationBorderWidth,
  } = props;

  // ** Hooks & Vars
  const theme = useTheme();
  const router = useRouter();
  const { size, sub, fontsize, isSvg, mid, hide } = item;
  const currentURL = router.asPath;

  let verticalNavToggleType = "collapse";

  // ** Accordion menu group open toggle
  const toggleActiveGroup = (item: NavGroup, parent: NavGroup | undefined) => {
    let openGroup = groupActive;

    // ** If Group is already open and clicked, close the group
    if (openGroup.includes(item.title)) {
      openGroup.splice(openGroup.indexOf(item.title), 1);

      // If clicked Group has open group children, Also remove those children to close those groups
      if (item.children) {
        removeChildren(item.children, openGroup, currentActiveGroup);
      }
    } else if (parent) {
      // ** If Group clicked is the child of an open group, first remove all the open groups under that parent
      if (parent.children) {
        removeChildren(parent.children, openGroup, currentActiveGroup);
      }

      // ** After removing all the open groups under that parent, add the clicked group to open group array
      if (!openGroup.includes(item.title)) {
        openGroup.push(item.title);
      }
    } else {
      // ** If clicked on another group that is not active or open, create openGroup array from scratch

      // ** Empty Open Group array
      openGroup = [];

      // ** push Current Active Group To Open Group array
      if (currentActiveGroup.every((elem) => groupActive.includes(elem))) {
        openGroup.push(...currentActiveGroup);
      }

      // ** Push current clicked group item to Open Group array
      if (!openGroup.includes(item.title)) {
        openGroup.push(item.title);
      }
    }
    setGroupActive([...openGroup]);
  };

  // ** Menu Group Click
  const handleGroupClick = () => {
    const openGroup = groupActive;
    if (verticalNavToggleType === "collapse") {
      if (openGroup.includes(item.title)) {
        openGroup.splice(openGroup.indexOf(item.title), 1);
      } else {
        openGroup.push(item.title);
      }
      setGroupActive([...openGroup]);
    } else {
      toggleActiveGroup(item, parent);
    }
  };

  useEffect(() => {
    if (hasActiveChild(item, currentURL)) {
      if (!groupActive.includes(item.title)) groupActive.push(item.title);
    } else {
      const index = groupActive.indexOf(item.title);
      if (index > -1) groupActive.splice(index, 1);
    }
    setGroupActive([...groupActive]);
    setCurrentActiveGroup([...groupActive]);

    // Empty Active Group When Menu is collapsed and not hovered, to fix issue route change
    // if ( && !navHover) {
    //   setGroupActive([]);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useEffect(() => {
    // if (navCollapsed && !navHover) {
    //   setGroupActive([]);
    // }

    if (navHover || groupActive.length === 0) {
      setGroupActive([...currentActiveGroup]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navHover]);

  useEffect(() => {
    if (groupActive.length === 0) {
      setGroupActive([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navHover]);

  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon;

  console.log("mcm", icon);
  const menuGroupCollapsedStyles = !navHover ? { opacity: 1 } : { opacity: 1 };

  const conditionalColors = () => {
    return {
      "& .MuiButtonBase-root": {
        backgroundColor: "green",
      },
      "&:hover": {
        backgroundColor: sub ? `rgba(52, 89, 137, 0.5)` : `#2e2e2e`,
      },
      "& .MuiTypography-root, & :not(.menu-item-meta) > svg": {
        color: "#FFFFFF",
      },
      "&.Mui-selected": {
        backgroundColor: sub ? "#2e2e2e" : "#2e2e2e",
        "&:hover": {
          backgroundColor: sub ? `rgba(52, 89, 137, 0.7)` : `#191a19`,
        },
        "& .MuiTypography-root, & :not(.menu-item-meta) > svg": {
          color: "#FFFFFF",
        },
        "& .menu-item-meta > svg": {
          color: "#FFFFFF",
        },
      },
    };
  };

  return (
    <>
      {hide ? null : (
        <Fragment>
          <ListItem
            disablePadding
            className="nav-group"
            onClick={handleGroupClick}
            sx={{
              display: "block",
              mt: mid == "first" ? 0 : sub ? 0 : 0,
              px: "0 !important",
              flexDirection: "column",
            }}
          >
            <ListItemButton
              className={clsx({
                "Mui-selected":
                  groupActive.includes(item.title) ||
                  currentActiveGroup.includes(item.title),
              })}
              sx={{
                py: 1.7,
                // mr: 6,
                ml: sub ? 3 : 0,
                borderRadius:
                  groupActive.includes(item.title) ||
                  currentActiveGroup.includes(item.title)
                    ? ""
                    : "",
                borderLeft:
                  groupActive.includes(item.title) ||
                  currentActiveGroup.includes(item.title)
                    ? "2px solid orange"
                    : "2px solid #4a4d52",
                borderTopLeftRadius: mid == "last" ? "6px" : "",
                borderTopRightRadius: mid == "last" ? "6px" : "",
                borderBottomRightRadius: mid == "last" ? "6px" : "",
                borderBottomLeftRadius: mid == "last" ? "6px" : "",
                background: sub ? "#0f0f0f" : "#0f0f0f",
                ...conditionalColors(),
                width: sub
                  ? `calc(100%)`
                  : // - ${theme.spacing(3.5 * 2)})`
                    `calc(100%)`,
                transition:
                  "padding-left .25s ease-in-out, padding-right .25s ease-in-out",
                pr: !navHover
                  ? (collapsedNavWidth - navigationBorderWidth - 22 - 28) / 8
                  : 4,
                "&.Mui-selected.Mui-focusVisible": {
                  backgroundColor: sub ? "#345989" : "#2e2e2e",
                  "&:hover": {
                    backgroundColor: sub ? "#345989" : "#yellow",
                  },
                },
                // backgroundColor: sub ? '#345989' : '#368CBE'
              }}
            >
              {
                <ListItemIcon
                  sx={{
                    transition: "margin .25s ease-in-out",
                    // fontSize: size ? size : '0.625rem',
                    ...(parent && !navHover ? {} : { mr: sub ? 2 : 0 }),
                    ...(!navHover ? { mr: 0 } : {}), // this condition should come after (parent && navCollapsed && !navHover) condition for proper styling
                    ...(parent && item.children ? { ml: 0, mr: 0 } : {}),
                    minWidth: "30px",
                  }}
                >
                  {!icon ? null : icon && isSvg ? (
                    <img src={icon} width={"18px"} height={"18px"}></img>
                  ) : icon ? (
                    <UserIcon
                      icon={icon as string}
                      {...(parent && {})}
                      style={{
                        fontSize: size ? size : "0.625rem",
                      }}
                    />
                  ) : null}
                </ListItemIcon>
              }
              <MenuItemTextWrapper
                sx={{
                  ...menuGroupCollapsedStyles,
                  ...(isSubToSub ? { ml: 2 } : {}),
                }}
              >
                <Typography
                  {...((themeConfig.menuTextTruncate ||
                    (!themeConfig.menuTextTruncate && !navHover)) && {
                    noWrap: true,
                  })}
                  style={{
                    color: "white",
                  }}
                  sx={{
                    fontSize: fontsize ? fontsize : "1rem",
                    fontWeight: 400,
                    ml: sub ? 0.4 : isSvg || !isSubToSub ? 1 : 0,
                  }}
                >
                  {item.title}
                </Typography>
                <Box
                  className="menu-item-meta"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "& svg": {
                      transition: "transform .25s ease-in-out",
                      color: "text.disabled",
                      ...(groupActive.includes(item.title) && {
                        transform: "rotate(90deg)",
                      }),
                    },
                  }}
                >
                  {item.badgeContent ? (
                    <Chip
                      label={item.badgeContent}
                      color={item.badgeColor || "primary"}
                      sx={{
                        mr: 1,
                        height: 20,
                        fontWeight: 500,

                        "& .MuiChip-label": {
                          px: 1.5,
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  ) : null}
                  <Icon
                    fontSize="1.125rem"
                    color="white"
                    style={{
                      color: "white",
                      marginRight: sub ? "24px" : "0px",
                    }}
                    icon={"tabler:chevron-right"}
                  />
                </Box>
              </MenuItemTextWrapper>
            </ListItemButton>
            <Collapse
              component="ul"
              onClick={(e) => e.stopPropagation()}
              in={groupActive.includes(item.title)}
              sx={{
                pl: 0,
                width: "100%",
                ...menuGroupCollapsedStyles,
                transition: "all 0.25s ease-in-out",
                pb: 0,
              }}
            >
              <VerticalNavItems
                {...props}
                parent={item}
                navVisible={navVisible}
                verticalNavItems={item.children}
                isSubToSub={parent && item.children ? item : undefined}
              />
            </Collapse>
          </ListItem>
        </Fragment>
      )}
    </>
  );
};

export default VerticalNavGroup;
