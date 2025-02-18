/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import {
  CircularProgress,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
// import { RootState } from '../../store/store'
import Style from "./TableComponent.module.scss";
import Paginations from "../pagination";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { RootState } from "@/store";

interface IDataTableColumn {
  id: string;
  name: string;
  enableSort?: boolean;
  align?: "center" | "inherit" | "justify" | "left" | "right";
  disablePadding: "checkbox" | "normal" | "none";
  numeric?: boolean;
}

interface IDataTableHeadProps {
  isCheckbox: boolean;
  isTopCheckbox?: boolean;
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columns: IDataTableColumn[];
  order: Order;
  orderBy: keyof any;
  rowCount: number;
  rowsScroll?: any;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => void;
  isSingleSelectRowOnly?: any;
}

interface IDataTableProps {
  rows: any[];
  isCheckboxes?: boolean;
  columnData?: IDataTableColumn[];
  selectedRowsPerPage: string;
  totalRecordCount: number;
  pagenum: number;
  handleChangePageParent: any;
  handleChangeRowsPerPageParent: any;
  bulkDelete?: any;
  selectedCheckBox?: any[];
  setSelectedCheckBox?: any;
  bottomButtonsComponent?: any;
  isTopCheckbox?: any;
  displayForceBottomComponent?: any;
  isSelectedRowsOnly?: any;
  isSingleSelectRowOnly?: any;
  disabledCheckboxes?: any;
  hideBottomRow?: boolean;
  boxShadow?: boolean;
  rowsScroll?: any;
  minHeight?: any;
  order2?: any;
  orderBy2?: any;
  setOrderByParent?: any;
  setOrderParent?: any;
  showLoader?: any;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead: React.FC<IDataTableHeadProps> = ({
  isCheckbox,
  order,
  orderBy,
  numSelected,
  rowCount,
  onSelectAllClick,
  onRequestSort,
  columns,
  rowsScroll,
  isTopCheckbox = true,
  isSingleSelectRowOnly = false,
}): JSX.Element => {
  const theme = useTheme();
  const createSortHandler =
    (property: keyof any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const arabicFonts = {
    fontFamily: "dmSans",
  };

  return (
    <TableHead
      style={{
        ...arabicFonts,
        display: rowsScroll ? "table" : "",
        tableLayout: rowsScroll ? "fixed" : "unset",
        width: rowsScroll ? "100%" : "",
        border: `1px solid #3b3a3a`,

        // borderRight: `1px solid #3b3a3a`,
        // borderTop: `1px solid #3b3a3a`,
        borderRadius: "15px",
        background: "#1c1c1c",
      }}
    >
      <TableRow
        style={{
          ...arabicFonts,
          borderRadius: 5,
        }}
      >
        {isCheckbox && (
          <TableCell
            style={{
              fontFamily: "dmSans",
              borderBottom: `1px solid #3b3a3a`,
            }}
            padding="checkbox"
          >
            {isTopCheckbox && isSingleSelectRowOnly === false && (
              <Checkbox
                className={Style.headerCheck}
                color="primary"
                style={{
                  color: "grey",
                }}
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            )}
          </TableCell>
        )}
        {columns.map((headCell, i) => (
          <TableCell
            sx={{
              p: 2,
            }}
            // onClick={createSortHandler(headCell.id)}
            key={headCell.id}
            className={Style.theader}
            style={{
              color: "#343a40",
              fontSize: 12,
              fontWeight: 600,
              lineHeight: "1.375rem",
              borderBottom: `1px solid #3b3a3a`,
            }}
            align={headCell.align ? headCell.align : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* headCell.enableSort  */}
            {false ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                // onClick={createSortHandler(headCell.id)}
                IconComponent={
                  orderBy === headCell.id ? ArrowDropDown : ArrowDropUp
                }
                sx={{ pr: headCell.align === "center" ? 0 : 0 }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    textTransform: "none",
                    lineHeight: 1.385,
                    fontWeight: 500,
                    color: "grey" as any,
                  }}
                >
                  {headCell.name}
                </Typography>

                <Box sx={{ pr: headCell.align === "center" ? 1 : 3 }}></Box>
                {headCell.enableSort ? null : orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography
                variant="subtitle2"
                sx={{
                  textTransform: "none",
                  lineHeight: 1.385,
                  color: "grey" as any,
                }}
              >
                {headCell.name}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const DataTable: React.FC<IDataTableProps> = ({
  columnData,
  rows,
  isCheckboxes = true,
  selectedRowsPerPage,
  pagenum,
  totalRecordCount,
  handleChangePageParent,
  handleChangeRowsPerPageParent,
  bulkDelete,
  selectedCheckBox = [],
  setSelectedCheckBox,
  bottomButtonsComponent,
  isTopCheckbox = true,
  displayForceBottomComponent = false,
  isSelectedRowsOnly = false,
  isSingleSelectRowOnly = false,
  disabledCheckboxes = [],
  hideBottomRow = false,
  boxShadow = false,
  rowsScroll = false,
  minHeight,
  order2,
  orderBy2,
  setOrderByParent,
  setOrderParent,
  showLoader = true,
}): JSX.Element => {
  const theme = useTheme();

  let internalColumnData: IDataTableColumn[] = [
    {
      id: "",
      name: "",
      disablePadding: "checkbox",
      numeric: false,
      align: "inherit",
      enableSort: false,
    },
  ];
  if (!columnData) {
    if (rows.length) {
      internalColumnData.length = 0;
      Object.keys(rows[0]).map((key) => {
        internalColumnData.push({
          id: String(key),
          name: String(key),
          disablePadding: "checkbox",
          numeric: false,
          align: "inherit",
          enableSort: false,
        });
      });
    }
  } else {
    internalColumnData = columnData;
  }
  const isLoading = useSelector((state: RootState) => state.loading.loading);

  const [order, setOrder] = React.useState<Order>(order2 || "asc");
  const [orderBy, setOrderBy] = React.useState<keyof any>(orderBy2 || "");
  const [showRecordNotFound, setShowRecordNotFound] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);

  useEffect(() => {
    if (setOrderParent) setOrderParent(order);
    if (setOrderByParent) setOrderByParent(orderBy);
  }, [orderBy, order]);

  useEffect(() => {
    if (isLoading == false) {
      setTimeout(() => {
        setShowRecordNotFound(true);
      }, 3000);
    } else {
      setShowRecordNotFound(false);
    }
  }, [isLoading]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelectedCheckBox(newSelected);
      return;
    }
    setSelectedCheckBox([]);
  };

  const handleClick = (event: any, id: any) => {
    if (event.target.checked) {
      if (isSingleSelectRowOnly) {
        setSelectedCheckBox([id]);
      } else {
        setSelectedCheckBox([
          ...(selectedCheckBox?.map((r: any) => r) ?? []),
          id,
        ]);
      }
    } else {
      if (isSingleSelectRowOnly) {
        setSelectedCheckBox([]);
      } else {
        setSelectedCheckBox(
          selectedCheckBox?.filter(function (val) {
            return val !== id;
          })
        );
      }
    }
  };

  const isSelected = (id: any) => selectedCheckBox?.indexOf(id) !== -1;
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsNotFound(false);
      }, 3400);
    } else {
      setTimeout(() => {
        setIsNotFound(true);
      }, 3500);
    }
  }, [isLoading]);

  return (
    <React.Fragment style={{ borderRadius: "15px" }}>
      <div className={Style.dataTableStart} style={{ borderRadius: "15px" }}>
        <div className={Style.root} style={{ borderRadius: "15px" }}>
          <Paper
            className={`${Style.paper}`}
            sx={{
              boxShadow: boxShadow ? "unset" : "",
              borderRadius: "15px",
            }}
          >
            <TableContainer
              sx={{
                borderRadius: "15px",

                // borderTop: "1px solid rgba(226, 226, 226, 1)",
              }}
            >
              <Table
                className={Style.table}
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
                sx={{
                  mb: 0,
                  border: `1px solid #3b3a3a`,
                  tableLayout: rowsScroll ? "fixed" : "",
                  "& .MuiTableRow-root:hover": {
                    backgroundColor: `${
                      theme.palette.background.default as any
                    }8D`,
                  },
                }}
              >
                <EnhancedTableHead
                  isCheckbox={isCheckboxes}
                  columns={internalColumnData}
                  numSelected={selectedCheckBox?.length || 0}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  rowsScroll={rowsScroll}
                  isTopCheckbox={isTopCheckbox}
                  isSingleSelectRowOnly={isSingleSelectRowOnly}
                />
                <TableBody
                  style={{
                    // display: "block",
                    // height: "12.5em",
                    // overflow: "auto",
                    display: rowsScroll ? "table-caption" : "",
                    height: rowsScroll
                      ? minHeight
                        ? minHeight
                        : "12.5em"
                      : "",
                    captionSide: rowsScroll ? "revert" : "unset",
                    overflow: rowsScroll ? "auto" : "",
                    background: "#1c1c1c",
                  }}
                >
                  {isLoading && showLoader ? (
                    <TableRow
                      // hover
                      tabIndex={-1}
                      sx={{
                        // cursor: 'pointer',
                        width: rowsScroll ? "100%" : "",
                        display: rowsScroll ? "" : "",
                        tableLayout: rowsScroll ? "fixed" : "",
                      }}
                    >
                      <TableCell
                        colSpan={
                          isCheckboxes
                            ? Number(columnData?.length) + 1
                            : columnData?.length
                        }
                        className="text-center"
                        style={{
                          display: "table-cell",
                          textAlign: "center",
                          border: `1px solid #3b3a3a`,
                        }}
                      >
                        <CircularProgress size="2rem" color="primary" />
                      </TableCell>
                    </TableRow>
                  ) : rows.length > 0 ? (
                    stableSort(rows, getComparator(order, orderBy)).map(
                      (row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        const columnsValues = Object.keys(row).map(
                          (key: string, index1) => {
                            if (key == "id") {
                              return;
                            } else {
                              let sort = columnData?.find(
                                (item) => item.id === key
                              )?.enableSort;
                              let align = columnData?.find(
                                (item) => item.id === key
                              )?.align;
                              let padding = columnData?.find(
                                (item) => item.id === key
                              )?.disablePadding;
                              return (
                                <TableCell
                                  key={`key-${index}-${index1} `}
                                  align={align ? align : "left"}
                                  style={{
                                    direction: "ltr",
                                    color: "grey" as any,
                                    borderBottom: `1px solid #3b3a3a`,
                                    paddingLeft:
                                      padding == "normal"
                                        ? "4em"
                                        : padding == "checkbox"
                                        ? "1.5em"
                                        : "1em",
                                  }}
                                >
                                  <span
                                    style={{
                                      left:
                                        align == "center" && sort
                                          ? "-1.2em"
                                          : "",
                                      position:
                                        align == "center" && sort
                                          ? "relative"
                                          : "unset",
                                      // wordBreak: 'break-all'
                                    }}
                                  >
                                    {row[key]}
                                  </span>
                                </TableCell>
                              );
                            }
                          }
                        );

                        return (
                          <TableRow
                            // hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={`key-${index}`}
                            selected={isItemSelected}
                            sx={{
                              // cursor: 'pointer',
                              width: rowsScroll ? "100%" : "",
                              display: rowsScroll ? "table" : "",
                              tableLayout: rowsScroll ? "fixed" : "",
                            }}
                          >
                            {isCheckboxes && (
                              <TableCell
                                padding="checkbox"
                                onClick={(event) => {
                                  if (
                                    disabledCheckboxes.find(
                                      (r: any) =>
                                        r ==
                                        rows?.find(
                                          (item: any) => item.id === row.id
                                        )?.id
                                    )
                                  ) {
                                  } else handleClick(event, row.id);
                                }}
                                style={{
                                  borderBottom: `1px solid #3b3a3a`,
                                }}
                              >
                                {isSingleSelectRowOnly ? (
                                  <Radio
                                    className={Style.headerCheck}
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                  />
                                ) : (
                                  <Checkbox
                                    className={Style.headerCheck}
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                    style={{
                                      color: "grey",
                                    }}
                                    disabled={
                                      Boolean(
                                        disabledCheckboxes.find(
                                          (r: any) =>
                                            r ==
                                            rows?.find(
                                              (item: any) => item.id === row.id
                                            )?.id
                                        )
                                      ) || false
                                    }
                                  />
                                )}
                              </TableCell>
                            )}
                            {columnsValues}
                          </TableRow>
                        );
                      }
                    )
                  ) : rows.length == 0 && !isLoading && isNotFound ? (
                    <TableRow
                      // hover
                      tabIndex={-1}
                      sx={{
                        // cursor: 'pointer',
                        width: rowsScroll ? "100%" : "",
                        display: rowsScroll ? "" : "",
                        tableLayout: rowsScroll ? "fixed" : "",
                      }}
                    >
                      <TableCell
                        align="center"
                        colSpan={
                          isCheckboxes
                            ? Number(columnData?.length) + 1
                            : columnData?.length
                        }
                        className={`text-center align-middle ${Style.fadinAnimation}`}
                        sx={{
                          display: "table-cell",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                        style={{
                          color: "grey",
                          border: `1px solid #3b3a3a`,
                        }}
                      >
                        <Box sx={{ my: 12 }}>
                          <Typography
                            component="div"
                            variant="body7"
                            sx={{ my: 6 }}
                            textAlign="center"
                          >
                            {(isNotFound && "Record not found") || " "}
                          </Typography>
                          <Box>
                            <img src="/icons/no-record.svg" alt="no-record" />
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow
                      // hover
                      tabIndex={-1}
                      sx={{
                        // cursor: 'pointer',
                        width: rowsScroll ? "100%" : "",
                        display: rowsScroll ? "table-row" : "",
                        tableLayout: rowsScroll ? "fixed" : "",
                      }}
                    >
                      <TableCell
                        colSpan={
                          isCheckboxes
                            ? Number(columnData?.length) + 1
                            : columnData?.length
                        }
                        className={`text-center align-middle`}
                        style={{
                          display: "table-cell",
                          textAlign: "center",
                          border: `1px solid #3b3a3a`,
                        }}
                      >
                        {showLoader && (
                          <CircularProgress size="2rem" color="primary" />
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {((selectedCheckBox && selectedCheckBox?.length > 0) ||
            displayForceBottomComponent) &&
            bottomButtonsComponent && (
              <span
                tabIndex={-1}
                key={`key-${7887878778}`}
                // className={`${Style.fadinAnimation}`}
                style={{
                  cursor: "pointer",
                  background:
                    "linear-gradient(white 0%, white 50%, #eaeaea 100%, #eaeaea 100%)",
                }}
              >
                <span>{bottomButtonsComponent}</span>
              </span>
            )}
          {!hideBottomRow && rows.length > 0 && (
            <div
              className={isSelectedRowsOnly === true ? "d-none" : ""}
              style={{
                marginTop: "1em",
              }}
            >
              <Paginations
                totalCount={Number(totalRecordCount)}
                perpage={Number(selectedRowsPerPage)}
                handleChangePageNum={handleChangePageParent}
                pagenum={Number(pagenum)}
                handleChangeRowsPerPageParent={handleChangeRowsPerPageParent}
              />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(DataTable);
