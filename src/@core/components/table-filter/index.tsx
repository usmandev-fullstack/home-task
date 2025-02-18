// ** MUI Imports
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import Icon from "@/@core/components/icon";
import Tab from "@mui/material/Tab";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import { useMediaQuery } from "@mui/material";
import { useDebounceValue } from "@/@core/hooks/useDebounceValue";

export function tabsA11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function capitalize(value: string) {
  if (typeof value === "string") {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return "";
}

const defaultSeletedFilters = {};

interface TableFilterProps {
  title: string;
  iconSize?: number | string;
  iconWeight?: number;
  label: any;
  input?: number | string;
  inputLabel?: any;
  menuItem?: number | string;
  width?: number;
  filterBtn?: any;
  filterTitle?: string;
  isBtn?: any;
  cancelBtn?: any;
  applyBtn?: any;
  handleCreateFunction?: any;
  handleSearch?: any;
  searchFeild?: any;
  handleFilter?: any;
  applyFilters?: any;
  customFilter?: boolean;
  customFilterMenuItems?: [];
  handleCloseFilter?: any;
  plusIcon?: any;
  buttonText?: string;
  customeButtonNode?: React.ReactNode;
  handleCustomeButton?: () => void;
  resetFilters?: () => void;
  customIcon?: any;
}

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 0;

const TableFilter = (props: TableFilterProps) => {
  const [showFilter, setShowFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchDebounced = useDebounceValue({ value: search });

  useEffect(() => {
    if (handleSearch) handleSearch(searchDebounced);
  }, [searchDebounced]);

  const theme = useTheme();
  const [activeIcon, setActiveIcon] = useState("");
  const [sort, setSort] = useState(false);

  const isBelow991px = useMediaQuery("(max-width:991px)");

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
        width: 250,
        color: theme.palette.grey[400],
        // background: interfaceBgColor
      },
    },
  };

  const styles = {
    floatingLabelFocusStyle: {
      color: "grey",
    },
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setShowFilter(!showFilter);
    setOpen(true);
    setSort(!sort);
  };

  // ** Props
  const {
    title,
    iconSize = 16,
    iconWeight = 500,
    label,
    filterBtn,
    filterTitle,
    isBtn = true,
    handleCreateFunction,
    handleSearch,
    cancelBtn,
    applyBtn,
    searchFeild = true,
    plusIcon = true,
    handleFilter,
    applyFilters,
    handleCloseFilter,
    buttonText = "Create" as string,
    customeButtonNode,
    handleCustomeButton,
    resetFilters,
    customFilter,
    customFilterMenuItems,
    customIcon,
  } = props;

  const [selectedFilters, setSelectedFilters] = useState({
    ...defaultSeletedFilters,
  });

  let menuItems: any = [
    // { value: 30, label: 'Other', menuList: ['1', '2', '3'] }
  ];

  if (customFilter) {
    customFilterMenuItems?.forEach((item) => {
      menuItems.push(item);
    });
  }

  const handleClickClose = () => {
    setShowFilter(false);
    // handleCloseFilter()
  };

  const handleReset = () => {
    setShowFilter(false);
    handleCloseFilter();
    setSelectedFilters({ ...defaultSeletedFilters });
    resetFilters && resetFilters();
  };

  return (
    <Card>
      <CardContent
        sx={{
          // gap: 2,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          backgroundColor: (theme) => "black",
          [theme.breakpoints.down("sm")]: {
            display: "grid",
            justifyContent: "center",
          },
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
          width={"100%"}
          mb={4}
        >
          <Typography
            variant="caption"
            sx={{
              marginRight: "10px",
              lineHeight: 1.4375,
              fontSize: "30px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {title}
          </Typography>

          {isBtn && (
            <Button
              sx={{
                px: ".75rem",
                width: "auto",

                "& svg": { mr: 2 },
                background: "#b06100",
              }}
              type="submit"
              variant="primary"
              onClick={handleCreateFunction}
            >
              {customIcon
                ? customIcon
                : plusIcon && (
                    <Icon
                      icon="tabler:plus"
                      fontSize={iconSize}
                      fontWeight={iconWeight}
                    />
                  )}
              <Typography
                variant={"overline"}
                sx={{
                  fontWeight: "500",
                }}
              >
                {buttonText}
              </Typography>
            </Button>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {filterBtn && (
            <Button
              sx={{
                color: theme.palette.primary.light,
                px: ".25rem",
                minWidth: "40px",
                background: `${theme.palette.grey[900]}`,
                borderRadius: "12px",
              }}
              type="submit"
              // variant="outlined"
              onClick={handleClickOpen}
            >
              <FilterListIcon sx={{ color: "white" }} />
              <Typography
                variant="caption"
                sx={{
                  marginRight: "10px",
                  lineHeight: 1.4375,
                  // fontSize: "30px",
                  fontWeight: "400",
                  color: theme.palette.grey[500],
                  ml: 1,
                  mt: 0.3,
                }}
              >
                Filters
              </Typography>
            </Button>
          )}

          <Box>
            <Button
              sx={{
                px: ".75rem",
                width: "auto",
                background: `${theme.palette.grey[900]}`,
                "& svg": { mr: 2 },
                borderRadius: "12px",
                mr: 2,
              }}
              type="submit"
              onClick={() => handleCreateFunction("quick-search")}
            >
              <Typography
                variant={"overline"}
                sx={{
                  fontWeight: "500",
                  color: theme.palette.grey[600],
                }}
              >
                {"Quick Search"}
              </Typography>
            </Button>
            {searchFeild && (
              <TextField
                size="small"
                sx={{
                  width: "340px",
                  height: "40px !important",
                  [theme.breakpoints.down("md")]: {
                    width: "250px",
                  },
                  "& .MuiInputBase-input": {
                    color: `${theme.palette.grey[200]}`,
                    opacity: 1,
                    background: `${theme.palette.grey[900]}`,
                    borderRadius: "12px",
                    border: "1px solid #3b3a3a",
                  },
                }}
                placeholder={"Search"}
                type="Search"
                label={label}
                value={search}
                onChange={(e) => {
                  setSearch(e.currentTarget.value);
                }}
                InputLabelProps={{ sx: styles.floatingLabelFocusStyle }}
                InputProps={{
                  sx: {
                    "& input::placeholder": {
                      color: `${theme.palette.grey[600]}`,
                      opacity: 1,
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "21px",
                    },
                  },
                  // startAdornment: (
                  //   <InputAdornment position="start">
                  //     <IconButton
                  //       edge="start"
                  //       onMouseDown={(e) => e.preventDefault()}
                  //       onClick={() => {}}
                  //     >
                  //       <Icon icon={"tabler:search"} fontSize={20} />
                  //     </IconButton>
                  //   </InputAdornment>
                  // ),
                }}
              />
            )}
          </Box>
        </Box>

        <Box
          sx={{
            gap: 2,
            display: "flex",
            p: 0,
            flexWrap: "wrap",
            [theme.breakpoints.down("md")]: {},
          }}
        ></Box>
      </CardContent>
      <Box>
        {showFilter && (
          <Box
            sx={{
              p: 4,
              backgroundColor: (theme) => theme.palette.grey[500],
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.grey[500],
                }}
              >
                {filterTitle}
              </Typography>
              <IconButton
                onClick={handleClickClose}
                sx={{ "& svg": { fontSize: "20px" } }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            {/* <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={9} md={10}>
                <Grid container spacing={2}>
                  {menuItems.map((item: any) => {
                    const filterName = item?.attributeName || item.label;
                    const selectedValue = selectedFilters[filterName];

                    // Determine whether the selected value is an object (like TrackLeader) or a string (like Grade)
                    const displayValue =
                      typeof selectedValue === "object"
                        ? selectedValue?.label // If it's an object, show the label
                        : selectedValue || ""; // Otherwise, just use the value directly

                    return (
                      <Grid item xs={12} sm={6} key={item.value} sx={{ mb: 4 }}>
                        <FormControl
                          fullWidth
                          id={`select-label-${item.value}`}
                        >
                          <InputLabel
                            sx={{
                              top: "-7px",
                              ...styles.floatingLabelFocusStyle,
                            }}
                            id={`select-label-${item.value}`}
                          >
                            {item.label}
                          </InputLabel>
                          <Select
                            size="small"
                            labelId={`select-label-${item.value}`}
                            id={`select-${item.value}`}
                            label={item.label}
                            MenuProps={MenuProps}
                            multiple={!!item.multiSelector}
                            value={selectedValue?.value || selectedValue || ""} // Handle both object and simple values
                            onChange={(e) => {
                              const newValue = e.target.value;

                              // Determine the correct format for updating the filter
                              const updatedFilter = item.multiSelector
                                ? newValue // For multi-select, handle as array
                                : item.menuList.find(
                                    (menuListItem) =>
                                      menuListItem.value === newValue
                                  ) || newValue; // Find object by value or fallback to the value itself

                              // Update filter and state
                              handleFilter({
                                filterValue: updatedFilter,
                                filterName,
                              });

                              setSelectedFilters((prev) => ({
                                ...prev,
                                [filterName]: updatedFilter,
                              }));
                            }}
                          >
                            {item.menuList.map((menuListItem, index) => (
                              <MenuItem
                                key={index}
                                value={menuListItem.value || menuListItem}
                              >
                                {capitalize(
                                  menuListItem?.label || menuListItem
                                )}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} md={2}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "flex-end",
                    alignItems: "end",
                  }}
                >
                  {cancelBtn && (
                    <Button
                      sx={{
                        borderRadius: "5px",
                        fontWeight: 400,
                        fontSize: "14px",
                        [theme.breakpoints.down("sm")]: { width: "100px" },
                      }}
                      type="submit"
                      variant="outlined"
                      onClick={handleReset}
                    >
                      {`${cancelBtn}`}
                    </Button>
                  )}
                  {applyBtn && (
                    <Button
                      sx={{
                        borderRadius: "5px",
                        fontWeight: 400,
                        fontSize: "14px",
                        [theme.breakpoints.down("sm")]: { width: "100px" },
                      }}
                      onClick={() => {
                        applyFilters();
                        handleClickClose();
                      }}
                      variant="primary"
                    >
                      {`${applyBtn}`}
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default TableFilter;
