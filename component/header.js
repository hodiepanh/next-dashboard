import header from "../styles/Header.module.css";
import { Text } from "@nextui-org/react";
const Header = ({ children }) => {
  return (
    <div className={header.root}>
      <div className={header.toolbar}>
        <Text h1 className={header.title}>
          Next dashboard
        </Text>
      </div>
      <main className={header.main}>{children}</main>
    </div>
  );
};

export default Header;
