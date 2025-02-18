// ** React Imports
import { ReactNode, useEffect } from "react";

// ** MUI Imports
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Navigation Imports
import Layout from "./Layout";
import VerticalNavItems from "./components/vertical/navigation/VerticalNavItems";
import { Box } from "@mui/material";

interface Props {
  children: ReactNode;
  contentHeightFixed?: boolean;
}

const UserLayout = ({ children, contentHeightFixed }: Props) => {
  const hidden = false; //useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  useEffect(() => {
    // ** Get Body Tag
    const element = window.document.body;
    // ** Remove all classes from Body on mount
    element.classList.remove("dark-layout");
  }, []);

  return (
    <Box sx={{ background: "#070708" }}>
      <Layout
        hidden={hidden}
        contentHeightFixed={contentHeightFixed}
        verticalLayoutProps={{
          navMenu: {
            navItems: VerticalNavItems(),

            // Uncomment the below line when using server-side menu in vertical layout and comment the above line
            // navItems: verticalMenuItems
          },
        }}
      >
        {children}
      </Layout>
    </Box>
  );
};

export default UserLayout;
