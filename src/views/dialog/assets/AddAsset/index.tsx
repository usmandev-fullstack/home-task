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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// ** Types
import { Typography } from "@mui/material";
import ChooseFile from "@/@core/components/chooseFile";
import {
  selectFieldMenuProps,
  selectFieldStyleProps,
  selectFieldSxProps,
} from "@/@core/components/muiComponentsStyles/selectField";

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

const AddAsset = (props: DialogProps) => {
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

  return (
    <Fragment>
      <Dialog
        maxWidth={false}
        PaperProps={{
          style: {
            width: width,
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
          {id ? "Edit" : "Upload"}
        </DialogTitle>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.grey[100],
            mb: 0,
            ml: 3,
            fontSize: "18px",
          }}
        >
          {"Assets"}
        </Typography>
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
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.grey[400],
                mb: 0,
                fontWeight: "100px",
                fontSize: "14px",
              }}
            >
              {"Upload Supporting Media"}
            </Typography>
            <ChooseFile
              size="small"
              folderName={"university"} // folder name on api-docs
              maxFileSizeinBytes={5242880} // 5mb
              fileTypes="image/jpg, image/jpeg, image/png"
              loading={loading}
              errors={errors}
              setValue={setValue}
              imageName={`he3y`}
              clearErrors={clearErrors}
              acceptedImageTypesArray={["image/jpg", "image/jpeg", "image/png"]}
              setImageParent={setImageParent}
              id={"1"}
              shouldShowProgress={false}
              text={"Browse"}
              setImageParentDisplayable={setImageParent}
              rightPart={true}
              maxWidth={""}
            ></ChooseFile>
            <ChooseFile
              size="small"
              folderName={"university"} // folder name on api-docs
              maxFileSizeinBytes={5242880} // 5mb
              fileTypes="image/jpg, image/jpeg, image/png"
              loading={loading}
              errors={errors}
              setValue={setValue}
              imageName={`he2y`}
              clearErrors={clearErrors}
              acceptedImageTypesArray={["image/jpg", "image/jpeg", "image/png"]}
              setImageParent={setImageParent}
              id={"2"}
              shouldShowProgress={false}
              text={"Browse"}
              setImageParentDisplayable={setImageParent}
              rightPart={true}
              maxWidth={""}
            ></ChooseFile>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                my: 3,
              }}
            >
              <Button
                onClick={handleSubmit(onSubmit)}
                sx={{
                  width: "110px",
                  fontSize: "14px",
                  fontWeight: "500px",
                  // lineHeight: "19.6px",
                  color: "black",
                  background: "#d45602",
                  borderRadius: "8px",
                }}
                disableElevation
                disabled={loading}
              >
                {"Add Asset"}
              </Button>
            </Box>
            <ChooseFile
              size="small"
              folderName={"university"} // folder name on api-docs
              maxFileSizeinBytes={5242880} // 5mb
              fileTypes="image/jpg, image/jpeg, image/png"
              loading={loading}
              errors={errors}
              setValue={setValue}
              imageName={`hey`}
              clearErrors={clearErrors}
              acceptedImageTypesArray={["image/jpg", "image/jpeg", "image/png"]}
              setImageParent={setImageParent}
              id={"3"}
              shouldShowProgress={false}
              text={"Browse"}
              setImageParentDisplayable={setImageParent}
              rightPart={true}
              maxWidth={""}
            ></ChooseFile>
            <ChooseFile
              size="small"
              folderName={"university"} // folder name on api-docs
              maxFileSizeinBytes={5242880} // 5mb
              fileTypes="image/jpg, image/jpeg, image/png"
              loading={loading}
              errors={errors}
              setValue={setValue}
              imageName={`he2y3`}
              clearErrors={clearErrors}
              acceptedImageTypesArray={["image/jpg", "image/jpeg", "image/png"]}
              setImageParent={setImageParent}
              id={"4"}
              shouldShowProgress={true}
              text={"Browse"}
              setImageParentDisplayable={setImageParent}
              rightPart={true}
              maxWidth={""}
            ></ChooseFile>

            <Grid
              container
              spacing={2}
              gap={2}
              display={"flex"}
              flexDirection={"row"}
            >
              <Grid item xs={6}>
                <TextField
                  size="small"
                  variant={"filled"}
                  fullWidth
                  type="text"
                  placeholder={"Name"}
                  label={"Name"}
                  sx={{
                    mt: 3,
                    borderRadius: "12px",
                    color: theme.palette.grey[200],
                    background: theme.palette.grey[800],
                  }}
                  // error={!!errors.name}
                  // helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={5.7}>
                <Select
                  sx={{
                    ...selectFieldSxProps(),
                    mt: 3,
                    height: "45px",
                    borderRadius: "12px",
                  }}
                  size="small"
                  MenuProps={selectFieldMenuProps()}
                  style={selectFieldStyleProps()}
                  fullWidth
                  placeholder="Select"
                  displayEmpty
                  inputProps={{ "aria-label": "QuestionType" }}
                  renderValue={(selected) =>
                    selected ? (
                      <Chip
                        key={selected}
                        label={
                          selected.charAt(0).toUpperCase() + selected.slice(1)
                        }
                      />
                    ) : (
                      <span style={{ color: "hsl(0, 0%, 50%)" }}>Select</span>
                    )
                  }
                >
                  <MenuItem sx={{ fontSize: "14px" }} value="MULTI">
                    {"Multiple Option"}
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value="SHORT">
                    {"Short Answer"}
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value="LONG">
                    {"Long Answer"}
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  variant={"filled"}
                  fullWidth
                  type="text"
                  placeholder={"Info"}
                  label={"Info"}
                  multiline
                  minRows={3}
                  sx={{
                    borderRadius: "12px",
                    color: theme.palette.grey[200],
                    background: theme.palette.grey[800],
                  }}
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
                  }}
                  // error={!!errors.name}
                  // helperText={errors.name?.message}
                />
              </Grid>
            </Grid>

            <Button
              onClick={() => {}}
              sx={{
                mt: 3,
                width: "100%",
                fontSize: "14px",
                fontWeight: "bolder",
                py: "10px",
                // lineHeight: "19.6px",
                color: "white",
                border: "1px solid rgba(212, 86, 2,0.8)",
                background: "rgba(212, 86, 2,0.1)",
                borderRadius: "8px",
              }}
              disableElevation
              disabled={loading}
            >
              {"Upload Media"}
            </Button>
          </DialogContent>
          <DialogActions
            sx={{
              py: "1rem",
              px: "2rem",
              borderTop: `1px solid ${theme.palette.grey.A200}`,
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                width: "70px",
                fontSize: "12px",
                fontWeight: "bolder",
                // lineHeight: "19.6px",
                color: theme.palette.grey[300],
                background: "#363535",
                border: "1px solid grey",
                borderRadius: "8px",
              }}
              disableElevation
              disabled={loading}
            >
              {"Cancel"}
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              sx={{
                width: "50px",
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
              {"Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default AddAsset;
