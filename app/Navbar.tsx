"use client";

import { usePathname } from "next/navigation";
// import { FaBug } from "react-icons/fa";
import { SiTask } from "react-icons/si";

import { Box, Flex } from "@radix-ui/themes";

import Link from "next/link";
import classnames from "classnames";

const NavLinks = () => {
  const currentpath = usePathname();
  const navItems = [
    {
      name: "Dashboard",
      link: "/",
    },
    {
      name: "New_Entry",
      link: "/newEntry",
    },
  ];

  return (
    <Flex gap="4" align="center" px="4">
      {navItems.map((item) => (
        <Box key={item.name}>
          <Link
            href={item.link}
            className={classnames({
              "text-gray-600 hover:text-gray-900 transition-colors": true,
              "active:text-gray-900": currentpath === item.link,
            })}
          >
            {item.name}
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

const Navbar = () => {
  return (
    // <Container>
    <nav className="p-2">
      <Flex
        direction="row"
        // gap="6"
        justify="between"
        align="center"
        height="auto"
      >
        <Flex align="center" gap="4">
          <Link href="/">
            <SiTask />
          </Link>
          <NavLinks />
        </Flex>
      </Flex>
    </nav>
    // </Container>
  );
};

export default Navbar;
