import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { makeStyles, styled, useTheme } from "@mui/material/styles";
import Style from "../table/TableComponent.module.scss";
// import makeStyles from '@mui/styles'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

interface Params {
  totalCount: number;
  perpage: number;
  handleChangePageNum: any;
  pagenum: number;
  handleChangeRowsPerPageParent: any;
  perPageOptions?: string[];
}
const SelectField = styled(Select)({
  "& #demo-simple-select-autowidth": {
    paddingRight: 4,
    paddingLeft: "1em",
  },
});

const Paginations = ({
  totalCount,
  perpage,
  handleChangePageNum,
  pagenum,
  handleChangeRowsPerPageParent,
  perPageOptions = ["10", "15", "25"],
}: Params) => {
  const theme = useTheme();
  const [perpage2, setPerPage2] = useState<any>(10);

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

  useEffect(() => {
    if (!(perpage == 10 || perpage == 15 || perpage == 25)) {
      setPerPage2(0);
    } else {
      setPerPage2(perpage);
    }
  }, [perpage]);

  const handleChange = (item: any) => {
    if (item == 0) {
      setPerPage2(item);
      handleChangeRowsPerPageParent(Number(totalCount));
    } else {
      setPerPage2(item);
      handleChangeRowsPerPageParent(item);
    }
  };

  return (
    <div
      className={`${Style.customStyle} mt-3 w-100`}
      style={{
        paddingInline: "1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className={`mr-3 ${Style.styleSum}`}>
        {/* <span
          className={`d-flex align-items-center ${Style.paginationBottom}`}
          style={{ flexDirection: "row", justifyContent: "left" }}
        >
          <span
            className={`${Style.paginationDisplayBottom}`}
            style={{
              fontSize: theme.typography.subtitle2.fontSize as any,
            }}
          >
            {"Show"}
          </span>
          <FormControl
            variant="standard"
            sx={{ m: 0, minWidth: "3em" }}
            className={Style.aligncen}
          >
            <InputLabel
              id="demo-simple-select-autowidth-label"
              style={{ fontSize: "12px" }}
              disableAnimation={true}
              sx={{ p: 0 }}
              shrink={false}
            ></InputLabel>
            <SelectField
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={Number(totalCount) == perpage ? 0 : perpage}
              style={{
                border: "1px solid #c7c7c7",
                borderRadius: 5,
                background: theme.palette.background as any,
                marginTop: 0,
                marginLeft: 15,
                minWidth: "6em",
                // maxWidth: '5em',
                paddingRight: lang === "ar" ? "2rem" : "4px",
              }}
              onChange={(e) => handleChange(Number(e.target.value as string))}
              disableUnderline
              IconComponent={(props) => <ExpandMoreIcon {...props} />}
            >
              <MenuItem value={0}>All ({Number(totalCount) || 0})</MenuItem>
              {perPageOptions.map((option) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </SelectField>
          </FormControl>
        </span> */}
        <div className={Style.styleSum2}>
          <Pagination
            count={Math.ceil(Number(totalCount) / Number(perpage)) || 0}
            onChange={handleChangePageNum}
            page={Number(pagenum)}
            defaultPage={Number(pagenum)}
            color={"standard"}
            shape="rounded"
            variant="outlined"
            sx={main}
            // classes={{}}
            // sx={{ background: theme.palette.grey[900] }}
          />
        </div>
      </div>
    </div>
  );
};
export default Paginations;
