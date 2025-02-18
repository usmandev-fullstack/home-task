// ** Type Import
import { LayoutProps } from "@/@core/layouts/types";

// ** Layout Components
import VerticalLayout from "./components/vertical/VerticalLayout";

const Layout = (props: LayoutProps) => {
  // ** Props
  const { hidden, children } = props;

  return <VerticalLayout {...props}>{children}</VerticalLayout>;
};

export default Layout;
