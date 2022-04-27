import * as React from "react";
import type { NextPage } from "next";
import {
  Body,
  Header1,
  Display,
  Divider,
  Card,
  CardHeader,
  Stack,
  Avatar,
  SubHeadline,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
  Link as LinkComponent,
  Tab,
  TabList,
  MailIcon,
  GithubIcon,
  SoundCloudIcon,
  ITunesIcon,
  SpotifyIcon,
  YoutubeIcon,
  MediumIcon,
} from "@cebus/react-components";
import Link from "next/link";

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] = React.useState("1");

  const onTabChange = (ev: any, data: any) => {
    setSelectedTab(data.value);
  };

  return (
    <>
      <Display>Hello world</Display>
      <Divider />
      <Stack
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
        }}
      >
        <Card style={{ minWidth: "300px", height: "300px" }}>
          <CardHeader header={<Header1>About me</Header1>} />
          <Avatar
            name="Caleb Zearing"
            image={{ src: "/image/me.png", alt: "Icon of Caleb Zearing" }}
            style={{ width: "112px", height: "112px", fontSize: "40px" }}
          />
          <SubHeadline>
            Hi my name is Caleb. I am a software engineer with a passion for
            developing apps, tooling, and infrastructure. I also enjoy creating
            music and art in my free time.
          </SubHeadline>
        </Card>

        <Card style={{ height: "300px" }}>
          <CardHeader header={<Header1>Contact information</Header1>} />
          <Stack>
            <TabList
              selectedValue={selectedTab}
              onTabSelect={onTabChange}
              vertical
            >
              <Tab value="1">Main</Tab>
              <Tab value="2">Socials</Tab>
              <Tab value="3">Music</Tab>
              <Tab value="4">Tutorials</Tab>
            </TabList>
            <Stack vertical>
              {selectedTab === "1" && (
                <>
                  <Stack verticalAlignment="center" style={{ width: "200px" }}>
                    <MailIcon />
                    <Body>czearing@outlook.com</Body>
                  </Stack>
                  <Stack verticalAlignment="center" style={{ width: "200px" }}>
                    <GithubIcon />
                    <Link href="https://github.com/czearing" passHref>
                      <LinkComponent>czearing</LinkComponent>
                    </Link>
                  </Stack>
                  <Stack verticalAlignment="center" style={{ width: "200px" }}>
                    <LinkedinIcon />
                    <Link
                      href="https://www.linkedin.com/in/caleb-zearing/"
                      passHref
                    >
                      <LinkComponent>caleb-zearing</LinkComponent>
                    </Link>
                  </Stack>
                </>
              )}
              {selectedTab === "2" && (
                <>
                  <Stack verticalAlignment="center" style={{ width: "200px" }}>
                    <TwitterIcon />
                    <Link href="https://twitter.com/czearing_" passHref>
                      <LinkComponent>@czearing_</LinkComponent>
                    </Link>
                  </Stack>
                  <Stack verticalAlignment="center" style={{ width: "200px" }}>
                    <InstagramIcon />
                    <Link
                      href="https://www.instagram.com/calebzmusic/"
                      passHref
                    >
                      <LinkComponent>calebzmusic</LinkComponent>
                    </Link>
                  </Stack>
                </>
              )}
              {selectedTab === "3" && (
                <>
                  <Stack verticalAlignment="center" style={{ width: "200px" }}>
                    <SoundCloudIcon />
                    <Link href="https://soundcloud.com/caleb_z" passHref>
                      <LinkComponent>caleb_z</LinkComponent>
                    </Link>
                  </Stack>
                  <Stack verticalAlignment="center" style={{ width: "200px" }}>
                    <SpotifyIcon />
                    <Link
                      href="https://open.spotify.com/artist/564lyz9Wk0PY0XT6P6pnCk?si=FLjgmlIOSDit6HcBw5Feww&nd=1"
                      passHref
                    >
                      <LinkComponent>CalebZ</LinkComponent>
                    </Link>
                  </Stack>
                  <Stack verticalAlignment="center" style={{ width: "200px" }}>
                    <ITunesIcon />
                    <Link
                      href="https://music.apple.com/us/artist/calebz/1566040977"
                      passHref
                    >
                      <LinkComponent>CalebZ</LinkComponent>
                    </Link>
                  </Stack>
                </>
              )}
              {selectedTab === "4" && (
                <>
                  <Stack verticalAlignment="center" style={{ width: "200px" }}>
                    <YoutubeIcon />
                    <Link href="https://www.youtube.com/c/CalebZaudio" passHref>
                      <LinkComponent>Caleb Z</LinkComponent>
                    </Link>
                  </Stack>
                  <Stack verticalAlignment="center" style={{ width: "200px" }}>
                    <MediumIcon />
                    <Link href="https://medium.com/@czearing" passHref>
                      <LinkComponent>@czearing</LinkComponent>
                    </Link>
                  </Stack>
                </>
              )}
            </Stack>
          </Stack>
        </Card>
      </Stack>
      {/* <Divider />
      <Stack horizontalAlignment="center" vertical grow>
        <Header1>My Projects</Header1>
        <Stack>
          <Card onClick={() => null}>
            <CardMedia>
              <Header1
                color="white"
                style={{ position: "absolute", zIndex: "1", padding: "10px" }}
              >
                Cebus
              </Header1>
              <Image src="/image/cebus.svg" width="250px" height="250px" />
            </CardMedia>
          </Card>
          <Card onClick={() => null}>
            <CardMedia>
              <Header1
                color="white"
                style={{ position: "absolute", zIndex: "1", padding: "10px" }}
              >
                Bounty Bay
              </Header1>
              <Image src="/image/bountyBay.svg" width="250px" height="250px" />
            </CardMedia>
          </Card>
        </Stack>
      </Stack> */}
    </>
  );
};

export default Home;
