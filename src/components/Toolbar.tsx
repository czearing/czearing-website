import React from "react";
import {
  Toolbar as CebusToolbar,
  ToolbarButton,
  Text,
  Stack,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemRadio,
  ColorIcon,
} from "@cebus/react-components";
import Link from "next/link";
import type { MenuProps } from "@cebus/react-components";
import { useAppContext } from "../context";

const useAppContextSelectors = () => {
  const setTheme = useAppContext((context) => context.setTheme);
  const findTheme = useAppContext((context) => context.findTheme);

  return {
    setTheme,
    findTheme,
  };
};

export const Toolbar = () => {
  const appContext = useAppContextSelectors();
  const userTheme = localStorage.getItem("theme") || "Light";

  const [checkedValues, setCheckedValues] = React.useState<
    Record<string, string[]>
  >({
    theme: [userTheme],
  });

  const onChange: MenuProps["onCheckedValueChange"] = (
    ev,
    { name, checkedItems }
  ) => {
    setCheckedValues({ [name]: checkedItems });
    localStorage.setItem("theme", checkedItems[0]);
  };

  React.useEffect(() => {
    appContext.setTheme(appContext.findTheme(userTheme));
  }, [appContext, userTheme]);

  return (
    <CebusToolbar>
      <Stack wrap={false} verticalAlignment="center">
        <Link href="/" passHref>
          <a style={{ textDecoration: "none" }}>
            <Text color="white" size={500} weight="bold" nowrap>
              czearing
            </Text>
          </a>
        </Link>
      </Stack>
      <Stack grow />
      {/* <Link href="music" passHref>
        <ToolbarButton as="a">Art</ToolbarButton>
      </Link>
      <Link href="music" passHref>
        <ToolbarButton as="a">Music</ToolbarButton>
      </Link> */}

      <Link href="videos" passHref>
        <ToolbarButton as="a">Videos</ToolbarButton>
      </Link>
      <Link href="articles" passHref>
        <ToolbarButton as="a">Articles</ToolbarButton>
      </Link>
      <Menu inline>
        <MenuTrigger>
          <ToolbarButton>
            <ColorIcon color="inherit" />
          </ToolbarButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuPopover>
              <MenuList
                checkedValues={checkedValues}
                onCheckedValueChange={onChange}
              >
                <MenuItemRadio name="theme" value="System">
                  System Default
                </MenuItemRadio>
                <MenuItemRadio name="theme" value="Light">
                  Light Mode
                </MenuItemRadio>
                <MenuItemRadio name="theme" value="Dark">
                  Dark Mode
                </MenuItemRadio>
              </MenuList>
            </MenuPopover>
          </MenuList>
        </MenuPopover>
      </Menu>
    </CebusToolbar>
  );
};
