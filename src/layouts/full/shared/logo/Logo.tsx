import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block"
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image
        style={{ marginTop: 40, marginLeft: 10 }}
        src="/images/logos/dash.png"
        alt="logo"
        height={30}
        width={155}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
