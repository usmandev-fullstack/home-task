// ** React Imports
import React, { useEffect, useState } from "react";

// ** MUI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
// ** Layout Import
// import TableFilter from "src/@core/components/table-filter";

// ** Demo Imports
import Table from "@/@core/components/table";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useDispatch } from "react-redux";
import { duration, IconButton, MenuItem } from "@mui/material";
import Style from "./styles.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import EditIcon from "@mui/icons-material/Edit";
// import ViewIcon from '@mui/icons-material/View';
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { setPage, deleteAsset, setAsset } from "@/store/apps/assets";
import toast from "react-hot-toast";
import { setErr, setSuccess } from "@/store/apps/alertMessge";
import { ToggleOff, ToggleOn, VisibilityOutlined } from "@mui/icons-material";
import { assets } from "@/mockData/assets";
import TableFilter from "@/@core/components/table-filter";
import AddAsset from "@/views/dialog/assets/AddAsset";
import QuickSearch from "@/views/dialog/assets/QuickSearch";

const Img = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {},
}));

const Assets = () => {
  // ** Hooks
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [searchTable, setSearchTable] = useState("");
  const [list, setList] = useState([]);
  const [selectedCheckBox, setSelectedCheckBox] = React.useState<any[]>([]);

  const [rows, setRows] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [id, setID] = useState("");
  const [singleRowData, setSingleRowData] = useState<any>();

  const [addDialog, setAddDialog] = useState(false);
  const [quickSearchDialog, setQuickSearchDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const page = useSelector((state: RootState) => state.assets.page);
  const [itemPerPage, setItemPerPage] = useState<number>(15);

  const dataList = useSelector((state: RootState) => state.assets.asset);
  const alertMessge: any = useSelector((state: RootState) => state.alerts);

  useEffect(() => {
    if (id) {
      setOpenDialog(true);
      handleClose();
    }
  }, [id]);

  useEffect(() => {
    if (!openDialog) handleClose();
    setID("");
  }, [openDialog]);

  useEffect(() => {
    if (alertMessge?.error) {
      toast.error(String(alertMessge?.error));
      dispatch(setErr(null));
    }
    if (alertMessge?.success) {
      toast.success(String(alertMessge?.success));
      dispatch(setSuccess(null));
      setOpen(false);
    }
  }, [alertMessge]);

  useEffect(() => {
    dispatch(setPage(1));
  }, []);

  useEffect(() => {
    dispatch(setAsset(assets));
  }, [dispatch, page, searchTable]);

  useEffect(() => {
    let data: any = dataList.results;
    if (Object.keys(dataList).length == 0) {
      setRows([]);
    } else setRows(data);
  }, [dataList]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setSelectedCheckBox([]);
    dispatch(setPage(page));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setAddDialog(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setSingleRowData(row);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleRowAction = (row: any, action: string) => {
    if (action == "edit") {
      setEditDialog(true);
      setID(row?.id);
    }

    if (action === "delete") {
      // dispatch(deleteAsset(row?.id as any));
    }

    handleClose();
  };

  const modifyRows = () => {
    let f_rows: any = [];
    rows?.forEach(
      (
        r: {
          id: string;
          name: string;
          info: string;
          category: any;
          format: string;
          size: string;
          color: string;
        },
        i: number
      ) => {
        f_rows = [
          ...f_rows,
          {
            id: r?.id,
            name: (
              <Box
                display={"flex"}
                flexDirection={"row"}
                sx={{
                  maxWidth: "25em",
                }}
              >
                <Box
                  sx={{
                    minWidth: "45px",
                    height: "45px",
                    background: "#3b3a3a",
                    borderRadius: "4px",
                    mr: 2,
                  }}
                ></Box>
                <Box display="flex" flexDirection={"column"}>
                  <Typography
                    sx={{
                      color: "white",
                    }}
                  >{`${r?.name}`}</Typography>
                  <Typography
                    variant={"subtitle2"}
                  >{`#${r?.color}`}</Typography>
                </Box>
              </Box>
            ),
            info: <div style={{ maxWidth: "40em" }}>{r?.info}</div>,
            category: <div>{r?.category}</div>,
            format: <div>{r?.format}</div>,
            size: <div>{r?.size}MB</div>,
            actions: (
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"row"}
                minWidth={"10em"}
              >
                <IconButton
                  sx={{
                    m: 0.5,
                    p: 0,
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <VisibilityOutlined
                    sx={{
                      color: theme.palette.grey[600],
                    }}
                    fontSize="small"
                  />
                </IconButton>
                <IconButton
                  sx={{
                    m: 0.5,
                    p: 0,
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <DeleteIcon
                    fontSize="small"
                    sx={{ color: theme.palette.grey[600] }}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    m: 0.5,
                    p: 0,
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <EditIcon
                    sx={{
                      color: theme.palette.grey[600],
                    }}
                    fontSize="small"
                  />
                </IconButton>
              </Box>
            ),
          },
        ];
      }
    );

    setList(f_rows);
  };

  useEffect(() => {
    modifyRows();
  }, [rows, anchorEl]);

  console.log("Dd:", dataList);
  return (
    <>
      <AddAsset
        openParent={addDialog}
        handleClose={() => {
          setAddDialog(false);
          handleClose();
        }}
        setOpenParent={setAddDialog}
        id={singleRowData?.id}
        handleSubmit={() => {
          handleRowAction(singleRowData, "view");
          setAddDialog(false);
        }}
      ></AddAsset>

      <QuickSearch
        openParent={quickSearchDialog}
        handleClose={() => {
          setQuickSearchDialog(false);
          handleClose();
        }}
        setOpenParent={setQuickSearchDialog}
        id={singleRowData?.id}
        handleSubmit={() => {
          handleRowAction(singleRowData, "quick-search");
          setQuickSearchDialog(false);
        }}
      ></QuickSearch>

      <Box
        sx={{
          // backgroundColor: "background.paper",
          mt: 5,
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{
            // p: 5,
            height: "100%",
            borderRadius: "15px",
          }}
        >
          <Box sx={{ width: "100%", borderRadius: "15px" }}>
            <TableFilter
              title={"Assets"}
              buttonText={"Upload"}
              filterBtn={true}
              searchFeild={true}
              isBtn={true}
              customIcon={
                <Img
                  height={20}
                  width={20}
                  src="/icons/upload.svg"
                  alt="upload-icon"
                  style={{ marginBottom: 2, marginRight: 6 }}
                />
              }
              handleCreateFunction={(abc: any) => {
                if (abc == "quick-search") {
                  setQuickSearchDialog(true);
                } else setAddDialog(true);
              }}
              handleSearch={(e: any) => {
                dispatch(setPage(1));
                setSearchTable(e);
              }}
              handleFilter={({ filterValue, filterName }: any) => {}}
              applyFilters={() => {}}
            />

            <Table
              columnData={[
                {
                  id: "name",
                  name: "Name & ID",
                  enableSort: true,
                  align: "left",
                  disablePadding: "checkbox",
                },
                {
                  id: "info",
                  name: `Info`,
                  enableSort: true,
                  align: "left",
                  disablePadding: "none",
                },
                {
                  id: "category",
                  name: `Category`,
                  enableSort: true,
                  align: "left",
                  disablePadding: "none",
                },
                {
                  id: "format",
                  name: `Format`,
                  enableSort: true,
                  align: "left",
                  disablePadding: "none",
                },
                {
                  id: "size",
                  name: `Size`,
                  enableSort: true,
                  align: "left",
                  disablePadding: "none",
                },
                {
                  id: "actions",
                  name: "Actions",
                  enableSort: false,
                  align: "center",
                  disablePadding: "none",
                },
              ]}
              rows={list.slice((page - 1) * itemPerPage, page * itemPerPage)}
              isCheckboxes={true}
              selectedRowsPerPage={itemPerPage?.toString()}
              totalRecordCount={Number(dataList.count)}
              handleChangePageParent={handleChangePage}
              pagenum={Number(page)}
              handleChangeRowsPerPageParent={() => {}}
              bulkDelete={() => {}}
              selectedCheckBox={selectedCheckBox}
              setSelectedCheckBox={setSelectedCheckBox}
            />
            <Box
              sx={{
                mt: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Assets;
