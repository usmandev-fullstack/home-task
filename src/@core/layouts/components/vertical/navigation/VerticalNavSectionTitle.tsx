// ** MUI Imports
import { styled } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";
import MuiListSubheader, {
  ListSubheaderProps,
} from "@mui/material/ListSubheader";

// ** Icon Imports
import Icon from "@/@core/components/icon";

// ** Types
import { NavSectionTitle } from "@/@core/layouts/types";

interface Props {
  navHover: boolean;
  item: NavSectionTitle;
  collapsedNavWidth: number;
  navigationBorderWidth: number;
}

// ** Styled Components
const ListSubheader = styled((props: ListSubheaderProps) => (
  <MuiListSubheader component="li" {...props} />
))(({ theme }) => ({
  lineHeight: 1,
  display: "flex",
  position: "static",
  marginTop: theme.spacing(3.5),
  paddingTop: theme.spacing(1.5),
  backgroundColor: "transparent",
  paddingBottom: theme.spacing(1.5),
  transition: "padding-left .25s ease-in-out",
}));

const TypographyHeaderText = styled(Typography)<TypographyProps>({
  fontSize: "0.75rem",
  lineHeight: "normal",
  letterSpacing: "0.21px",
  textTransform: "uppercase",
});

const VerticalNavSectionTitle = (props: Props) => {
  // ** Props
  const { item, navHover, collapsedNavWidth, navigationBorderWidth } = props;

  return (
    <>
      {item?.hide ? null : (
        <ListSubheader
          className="nav-section-title"
          sx={{
            ...(!navHover
              ? {
                  py: 0.5,
                  px: (collapsedNavWidth - navigationBorderWidth - 22) / 8,
                }
              : { px: 7.5, pl: 3.5 }),
            "& .MuiTypography-root, & svg": {
              fontWeight: 600,
              color: (theme: any) => theme.palette.grey[500],
            },
            fontSize: "14px",
            mb: 6,
            mt: 7,
            ml: 2,
          }}
        >
          {!navHover ? (
            <Icon icon="tabler:separator" />
          ) : (
            <TypographyHeaderText noWrap>
              {item.sectionTitle}
            </TypographyHeaderText>
          )}
        </ListSubheader>
      )}
    </>
  );
};

export default VerticalNavSectionTitle;
