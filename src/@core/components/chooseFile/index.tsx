/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
// import { toast } from 'react-toastify'
import { formatBytes, formatBytesWithoutDM } from "./utils";
import Style from "./ChooseFile.module.scss";
// import useColor from '../hooks/useColor'
// import { defaultThemeColor } from '../utils/colors_values'
// import { useTranslation } from 'react-multi-lang'
// import useCompanyLanguage from '../hooks/language'
import { AppDispatch, RootState } from "@/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import toast from "react-hot-toast";
import { FILE_UPLOAD_LIMITS } from "./fileUploadLimits";
// import ViewIcon from '@mui/icons-material/View';
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

const $ = require("jquery");

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 9,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#14276F" : "#14276F",
  },
}));

interface ChooseFileProps {
  id?: string;
  size: string;
  fileTypes: string;
  loading: boolean;
  errors: any;
  folderName: string | null;
  setValue: any;
  imageName: string;
  clearErrors: any;
  acceptedImageTypesArray: any;
  setImageParent: any;
  maxFileSizeinBytes: number;
  setImageParentDisplayable?: any;
  clearFile?: any;
  text?: any;
  rightPart?: any;
  maxWidth?: any;
  alreadyImg?: any;
  alreadyImgText?: any;
  shouldShowProgress?: any;
}

function ChooseFile({
  id,
  size,
  text,
  fileTypes,
  loading,
  errors,
  setValue,
  imageName,
  folderName,
  clearErrors,
  acceptedImageTypesArray,
  setImageParent,
  maxFileSizeinBytes: propMaxFileSizeInBytes,
  setImageParentDisplayable,
  clearFile = false,
  rightPart,
  maxWidth,
  alreadyImg,
  alreadyImgText,
  shouldShowProgress,
}: ChooseFileProps) {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageBase64, setSelectedImageBase64] = useState<any>();
  const [image, setImage] = useState<any>();
  const [fileSize, setFileSize] = useState<any>(0);
  const [fileSizeBytes, setFileSizeBytes] = useState<any>(0);
  const [fileName, setFileName] = useState<any>("");
  const [fileType, setFileType] = useState<any>("");
  // const [progress, setProgress2] = useState<any>()
  const [imageup, setImageUp] = useState(0);
  const [sizeProgress, setSizeProgress] = useState(0);
  const theme = useTheme();

  const dispatch = useDispatch<AppDispatch>();

  const uploaderProgress = 50;
  const progress = {
    loaded: 80,
    total: 100,
  };
  // const progressInfo = useSelector((state: RootState) => state.progress.progress)

  let maxFileSizeinBytes = FILE_UPLOAD_LIMITS.ADMIN_ROLE_LIMIT; // 5MB

  if (!!propMaxFileSizeInBytes) {
    // give priorty of file size coming from prop
    maxFileSizeinBytes = propMaxFileSizeInBytes;
  }

  useEffect(() => {
    if (alreadyImg) {
      setImage(alreadyImg);
      if (fileName) {
      } else setFileName(alreadyImgText);
    }
  }, [alreadyImg]);

  $(document).ready(function () {
    $("#OpenImgUpload" + id || "").unbind("click");
    $("#OpenImgUpload" + id || "").click(function (event: any) {
      $("#file" + id || "").click();
    });
    $("#file" + id || "").click(function (event: any) {
      event.stopPropagation();
    });
  });

  useEffect(() => {
    let input: any = document?.getElementById("file" + id || "");
    if (clearFile) {
      try {
        input.value = "";
        setImage(null);
      } catch (e) {}
      $("#OpenImgUpload" + id)
        .val("")
        .change();
      $("#file" + id)
        .val("")
        .change();
    }
  }, [clearFile]);

  const uploadPic = (file: any) => {};

  const readURL = (input: any) => {
    input = document?.getElementById("file" + id || "");
    if (input.files && input.files[0]) {
      let file = input.files[0];
      const fileType = file["type"] || "." + file?.name.split(".").pop();
      const validImageTypes = acceptedImageTypesArray;
      if (
        !(acceptedImageTypesArray == "*.*") &&
        !validImageTypes.includes(fileType)
      ) {
        toast.error(String("Please select valid image file"));
        setTimeout(() => {
          setImage(null);
          setSelectedImageBase64("");
          setSelectedImage("");
          setImageParent("");
          if (setImageParentDisplayable) setImageParentDisplayable("");
        }, 1000);
      } else if (file.size > maxFileSizeinBytes) {
        if (file.type === "application/zip") {
          toast.error(
            String(
              "Please select zip file having size less than " +
                formatBytes(maxFileSizeinBytes).toLocaleUpperCase()
            )
          );
        } else {
          toast.error(
            String(
              "Please select image having size less than " +
                formatBytes(maxFileSizeinBytes).toLocaleUpperCase()
            )
          );
        }
        setTimeout(() => {
          setImage(null);
          setSelectedImageBase64("");
          setSelectedImage("");
          setImageParent("");
          if (setImageParentDisplayable) setImageParentDisplayable("");
        }, 1000);
      } else {
        if (input.files && input.files[0]) {
          setFileName(file.name);
          setFileType(
            fileType.split("/").length >= 2 ? fileType.split("/")[1] : ""
          );
          setFileSize(formatBytes(file.size));
          setFileSizeBytes(file.size);
          let reader: { onload: any; readAsDataURL: any } = new FileReader();
          reader.onload = function (e: { target: { result: string } }) {
            setSelectedImageBase64({
              ...selectedImageBase64,
              image: input.files[0],
              imagename: input.files[0].name,
            });
            setImageParent({
              ...selectedImageBase64,
              image: input.files[0],
              imagename: input.files[0].name,
            });
            if (input.files[0]) {
              uploadPic(input.files[0]);
            }
            if (setImageParentDisplayable)
              setImageParentDisplayable(
                URL.createObjectURL(input.files && input.files[0])
              );
            $("#blah").attr("src", e?.target?.result).width(142).height(142);
          };
          reader.readAsDataURL(input.files[0]);
        }
      }
    }
  };

  const [i, setI] = useState(0);

  React.useEffect(() => {
    // setProgress2({ progress: 0, loaded: 0 })

    if (loading) {
      if (window.navigator.onLine) {
        // if (progress) {
        //   setProgress2(progressInfo)
        // }
        //   const timer = setInterval(() => {
        //     // setProgress((oldProgress) => {
        //     //   if (oldProgress === 100) {
        //     //     return 100;
        //     //   }
        //     //   const diff = Math.random() * 100;
        //     //   return Math.min(oldProgress + diff, 100);
        //     // });
        //     setSizeProgress((sizeOldProgress) => {
        //       if (sizeOldProgress === fileSizeBytes) {
        //         return fileSizeBytes;
        //       }
        //       setProgress(Math.abs(sizeOldProgress / fileSizeBytes) * 100);
        //       const diff = 300000;
        //       return Math.min(Number(sizeOldProgress + diff), fileSizeBytes);
        //     });
        //   }, 500);
        //   return () => {
        //     clearInterval(timer);
        //   };
      } else {
        toast.error(
          String(
            "You are offline! Please connect to the internet and refresh page"
          )
        );
      }
    } else {
      // setProgress2({ progress: 0, loaded: 0 })
      // dispatch(setProgress({ progress: 0, loaded: 0 }));
      setSizeProgress(0);
    }
  }, [loading]);
  // }, [loading, progressInfo])

  // const shouldShowProgress = 50;

  return (
    <div
      className="mx-0 px-0"
      style={{
        maxWidth: maxWidth,
        borderRadius: "15px",
        background: theme.palette.grey[800],
      }}
    >
      <div
        id={"OpenImgUpload" + id || ""}
        className={`${Style.minWidth} ${Style.choosefileCover}`}
        style={{
          border: errors[imageName]
            ? "1px solid red"
            : "1px solid rgba(0, 0, 0, 0.23)",
          borderRadius: "15px",
        }}
      >
        <span
          style={{
            display: "flex",
            background: theme.palette.grey[800],
            // background: theme.palette.customColors.tableHeaderBg,
            color: theme.palette.grey[500],
            borderRadius: "15px",
          }}
        >
          {rightPart && (
            <div
              className={`${Style.choosenFileText}`}
              style={{
                alignItems: image ? "" : "center",
                // marginTop: loading ? '0.5em' : image ? '0.1em' : '0',
                width: "75%",
                cursor: "pointer",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
                // border: `0px solid ${theme.palette.grey[500]}`,
                borderRight: "none",
                color: theme.palette.grey[500],
                background: theme.palette.grey[800],
                borderRadius: "15px",
              }}
            >
              <IconButton
                sx={{
                  m: 0.5,
                  p: 0,
                  display: "flex",
                  gap: "8px",
                  // alignItems: "center",
                }}
              >
                <InsertDriveFileOutlinedIcon
                  fontSize="small"
                  sx={{ color: theme.palette.grey[400] }}
                />
              </IconButton>
              {image ? (
                <div
                  className={`${loading ? "" : "d-flex align-items-center"} ${
                    Style.innertextTop
                  }`}
                >
                  <div
                    className={`row col-lg-11 px-0 mx-0 ${Style.maxWidth} ${Style.chooseInnerText}`}
                    style={{
                      height: "5em",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ width: "90%", pl: 0, ml: 0 }}>
                      <Box sx={{}}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: theme.palette.grey[500],
                          }}
                          className={`${Style.logohead}  d-flex justify-content-start ${Style.fileNameCover} ${Style.maxWidth}`}
                          style={{
                            minWidth: size == "large" ? "35em" : "",
                            fontFamily: "Inter,sans-serif",
                            color: "#828282",
                            fontSize: "15px",
                            wordBreak: "break-word",
                          }}
                        >
                          {fileName && size == "large" && fileName.length > 60
                            ? fileName.slice(0, 60) + "... ." + fileType
                            : fileName &&
                              size == "small" &&
                              fileName.length > 25
                            ? fileName.slice(0, 25) + "... ." + fileType
                            : fileName}
                        </Typography>
                      </Box>

                      {
                        <span>
                          <span
                            className="row col-lg-12 row-lg-4 mx-0 px-0"
                            style={{
                              display: "flex",
                              // justifyContent: "space-between",
                            }}
                          >
                            <span
                              className={`${Style.bottomProgressMB} col-lg-6 justify-content-start ${Style.textLeft}`}
                            >
                              {!shouldShowProgress
                                ? formatBytesWithoutDM(100)
                                : formatBytesWithoutDM(progress?.loaded)}
                            </span>
                            {" - "}
                            <span
                              className={`${Style.bottomProgressMB} col-lg-6 ${Style.textRight}`}
                            >
                              {" "}
                              {(
                                Math.round(
                                  ((!shouldShowProgress
                                    ? 100
                                    : progress?.loaded) *
                                    100) /
                                    progress?.total
                                ) || 0
                              ).toFixed(0)}
                              {"% uploaded"}
                            </span>
                          </span>
                        </span>
                      }
                    </Box>
                  </div>
                </div>
              ) : (
                <span
                  style={{
                    fontFamily: "Inter,sans-serif",
                    color: "#828282",
                    fontSize: "15px",
                  }}
                >
                  {"No file chosen"}
                </span>
              )}
            </div>
          )}
          <div
            className={`${Style.chooseFile} w-25`}
            style={{
              color: theme.palette.grey[800],
              background:
                shouldShowProgress && image ? theme.palette.grey[900] : "",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
            }}
          >
            {/* {text} */}
            {image ? (
              shouldShowProgress ? (
                <CircularProgress
                  variant="determinate"
                  value={
                    Math.round((progress?.loaded * 100) / progress?.total) || 0
                  }
                  color="orange"
                  style={{
                    color: "orange",
                  }}
                />
              ) : (
                <Box display={"flex"} justifyContent={"center"}>
                  <IconButton
                    sx={{
                      m: 0.5,
                      p: 0,
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <DeleteIcon fontSize="small" sx={{ color: "red" }} />
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
                    <CheckBoxOutlinedIcon
                      fontSize="small"
                      sx={{ color: theme.palette.grey[400] }}
                    />
                  </IconButton>
                </Box>
              )
            ) : null}
          </div>
        </span>
      </div>

      <input
        id={"file" + id || ""}
        type="file"
        className={`${Style.inputfields} ${Style.fieldFont} ${
          errors.file_name ? "is-invalid" : ""
        }`}
        accept={fileTypes}
        onChange={(e) => {
          readURL(e);
          setImage(e.target.value);
          setImageParent(e.target.value);
          setSelectedImage(e.target.value);
          setValue(imageName, e.target.value);
          clearErrors(imageName);
        }}
        style={{
          position: "absolute",
          top: 0,
          width: 20,
          opacity: 0,
          borderRadius: "15px",
          background: theme.palette.grey[100],
          color: theme.palette.grey[400],
          outline: "borderColorInput",
          border: "1px solid borderColorInput",
        }}
      ></input>
    </div>
  );
}
export default ChooseFile;
