import { useTheme } from "@mui/material";

export const selectFieldSxProps = () => {
  const theme = useTheme();
  return {
    height: "48px",
    "& .MuiChip-root": {
      background: theme.palette.grey[400],
      color: theme.palette.grey[800],
    },
  };
};

export const selectFieldStyleProps = () => {
  const theme = useTheme();
  return {
    color: theme.palette.grey[400],
    background: theme.palette.grey[800],
  };
};

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 0;

export const selectFieldMenuProps = () => {
  const theme = useTheme();

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
        width: 250,
        color: theme.palette.grey[400],
      },
    },
  };
  return {
    ...MenuProps,
    sx: {
      "&& .MuiPopover-paper": {
        color: theme.palette.grey[400],
        background: theme.palette.grey[800],
      },
      "&& .Mui-selected": {
        color: theme.palette.grey[400],
        background: theme.palette.grey[800],
      },
      "&& .Mui-selected:hover": {
        color: "black",
        background: "skyblue",
      },
    },
  };
};
