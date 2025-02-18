import { Fragment, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
// ** MUI Imports
import { useTheme } from "@mui/material/styles";
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  FormControl,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Grid,
  Select,
  Chip,
  MenuItem,
  Checkbox,
  Pagination,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import CloseIcon from "@mui/icons-material/Close";
// ** Types
import { Typography } from "@mui/material";
import ChooseFile from "@/@core/components/chooseFile";
import {
  selectFieldMenuProps,
  selectFieldStyleProps,
  selectFieldSxProps,
} from "@/@core/components/muiComponentsStyles/selectField";
import { styled } from "@mui/material/styles";
import { searchData } from "@/mockData/searchItems";

interface FormData {
  description: string;
}

interface DialogProps {
  handleClose: () => void;
  id?: any;
  openParent: boolean;
  handleSubmit?: any;
  errorParent?: any;
  setOpenParent?: any;
  inputValue?: any;
  width?: any;
}

const schema = yup.object().shape({
  description: yup.string().trim().required("Description is required"),
});

const Img = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {},
}));

const QuickSearch = (props: DialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { openParent, setOpenParent, id, width = 771.48 } = props;
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const [imageParent, setImageParent] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("description", "");
    clearErrors();
  }, [open]);

  const handleClose = () => {
    reset();
    setOpen(false);
    setOpenParent(false);
  };

  const onSubmit = (data: FormData) => {
    handleClose();
    setOpenParent(false);
  };

  const styles = {
    floatingLabelFocusStyle: {
      color: theme.palette.grey[500],
    },
  };

  const main = {
    "& .Mui-selected": {
      bgcolor: "black !Important",
      color: "white",
      border: "1px solid " + theme.palette.grey[800],
      borderRadius: "5px",
    },
    "& .MuiPaginationItem-root": {
      bgcolor: "black",
      color: "white",
    },
  };

  return (
    <Fragment>
      <Dialog
        maxWidth={false}
        PaperProps={{
          style: {
            width: "1000px",
            background: "#262626",
            border: "1px solid orange",
            borderRadius: "10px",
          },
        }}
        open={openParent}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          sx={{
            py: ".75rem",
            pb: "0",
            pr: "3rem",
            color: "white",
            fontWeight: "500px",
            fontSize: "22px",
          }}
          variant="h5"
          id="responsive-dialog-title"
        >
          {id ? "Edit" : "Asset Quick Search"}
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            borderRadius: "6px",
          }}
        >
          <CloseIcon style={{ color: "white" }} />
        </IconButton>
        <form>
          <DialogContent sx={{ mt: 0, pt: 0 }}>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                sx={{
                  color: theme.palette.primary.light,
                  px: ".25rem",
                  minWidth: "40px",
                  background: `${theme.palette.grey[800]}`,
                  borderRadius: "8px",
                }}
                type="submit"
                // variant="outlined"
                onClick={() => {}}
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

              <Box>
                <Button
                  sx={{
                    color: theme.palette.primary.light,
                    px: ".25rem",
                    py: 1,
                    minWidth: "40px",
                    background: `${theme.palette.grey[200]}`,
                    borderRadius: "8px",
                  }}
                  type="submit"
                  // variant="outlined"
                  onClick={() => {}}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      marginRight: "10px",
                      lineHeight: 1.4375,
                      fontWeight: "bold",
                      color: theme.palette.grey[900],
                      ml: 1,
                      mt: 0.3,
                    }}
                  >
                    Images
                  </Typography>
                </Button>
                <Button
                  sx={{
                    color: theme.palette.primary.light,
                    px: ".25rem",
                    py: 1,
                    minWidth: "40px",
                    // background: `${theme.palette.grey[200]}`,
                    borderRadius: "8px",
                  }}
                  type="submit"
                  // variant="outlined"
                  onClick={() => {}}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      marginRight: "10px",
                      lineHeight: 1.4375,
                      fontWeight: "bold",
                      color: theme.palette.grey[600],
                      ml: 1,
                      mt: 0.3,
                    }}
                  >
                    Videos
                  </Typography>
                </Button>
                <Button
                  sx={{
                    color: theme.palette.primary.light,
                    px: ".25rem",
                    py: 1,
                    minWidth: "40px",
                    // background: `${theme.palette.grey[200]}`,
                    borderRadius: "8px",
                  }}
                  type="submit"
                  // variant="outlined"
                  onClick={() => {}}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      marginRight: "10px",
                      lineHeight: 1.4375,
                      fontWeight: "bold",
                      color: theme.palette.grey[600],
                      ml: 1,
                      mt: 0.3,
                    }}
                  >
                    PDFs
                  </Typography>
                </Button>
                <Button
                  sx={{
                    color: theme.palette.primary.light,
                    px: ".25rem",
                    py: 1,
                    minWidth: "40px",
                    // background: `${theme.palette.grey[200]}`,
                    borderRadius: "8px",
                  }}
                  type="submit"
                  // variant="outlined"
                  onClick={() => {}}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      marginRight: "10px",
                      lineHeight: 1.4375,
                      fontWeight: "bold",
                      color: theme.palette.grey[600],
                      ml: 1,
                      mt: 0.3,
                    }}
                  >
                    MP4
                  </Typography>
                </Button>
              </Box>
            </Box>
            <Grid
              container
              display={"flex"}
              justifyContent={"center"}
              maxWidth={"60em"}
              maxHeight={"25em"}
              sx={{
                overflowY: "scroll",
                mt: 4,
              }}
            >
              {searchData?.map((i) => (
                <Grid
                  xs={2}
                  sx={{
                    m: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Img
                      height={100}
                      width={133}
                      sx={{
                        borderRadius: "8px",
                      }}
                      src="/icons/DemoImage.png"
                      alt="upload-icon"
                      style={{ marginBottom: 2, marginRight: 6 }}
                    ></Img>
                    <Box
                      sx={{
                        left: "-40px",
                        position: "relative",
                        top: "0px",
                      }}
                    >
                      <Checkbox
                        color="primary"
                        inputProps={{
                          "aria-labelledby": "mk",
                        }}
                        style={{
                          color: theme.palette.grey[200],
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        left: "-80px",
                        position: "relative",
                        bottom: "-75px",
                        borderRadius: "5px",
                        background: "white",
                        maxHeight: "20px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "13px",
                          pt: 0.2,
                        }}
                      >
                        {"MOV"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: "5px",
                      maxHeight: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "13px",
                        pt: 0.2,
                        color: "white",
                      }}
                    >
                      {i.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <Pagination
                count={Math.ceil(Number(100) / Number(10)) || 0}
                page={Number(1)}
                defaultPage={Number(1)}
                color={"standard"}
                shape="rounded"
                variant="outlined"
                sx={main}
              />
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              py: "1rem",
              px: "2rem",
              borderTop: `1px solid ${theme.palette.grey.A200}`,
            }}
          >
            <Button
              onClick={handleSubmit(onSubmit)}
              sx={{
                // width: "50px",
                fontSize: "14px",
                fontWeight: "bolder",
                // lineHeight: "19.6px",
                color: "black",
                background: "#d45602",
                borderRadius: "8px",
              }}
              disableElevation
              disabled={loading}
            >
              {"Add to challenge"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default QuickSearch;
