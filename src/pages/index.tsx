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
import { makeStyles } from "@griffel/react";
import Link from "next/link";

const useStyles = makeStyles({
  contactLink: {
    // minWidth: "181px",
    // width: "182px",
  },
  cardContainer: {
    maxWidth: "500px",
    height: "calc(100% - 30px)",
  },
});

const Home: NextPage = () => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = React.useState("1");

  const onTabChange = (ev: any, data: any) => {
    setSelectedTab(data.value);
  };

  return (
    <>
      <Display>Hello world</Display>
      <Divider />

      <Stack
        horizontalAlignment="center"
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, max-content))",
        }}
      >
        <Card className={styles.cardContainer}>
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
        <Card style={{ maxWidth: "500px", height: "calc(100% - 30px)" }}>
          <CardHeader header={<Header1>Contact information</Header1>} />
          <Stack wrap={false}>
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

            <Stack vertical wrap={false}>
              {selectedTab === "1" && (
                <>
                  <Stack
                    verticalAlignment="center"
                    className={styles.contactLink}
                  >
                    <MailIcon />
                    <Body>czearing@outlook.com</Body>
                  </Stack>
                  <Stack
                    verticalAlignment="center"
                    className={styles.contactLink}
                  >
                    <GithubIcon />
                    <Link href="https://github.com/czearing" passHref>
                      <LinkComponent>Github</LinkComponent>
                    </Link>
                  </Stack>
                  <Stack
                    verticalAlignment="center"
                    className={styles.contactLink}
                  >
                    <LinkedinIcon />
                    <Link
                      href="https://www.linkedin.com/in/caleb-zearing/"
                      passHref
                    >
                      <LinkComponent>Linkedin</LinkComponent>
                    </Link>
                  </Stack>
                </>
              )}
              {selectedTab === "2" && (
                <>
                  <Stack
                    verticalAlignment="center"
                    className={styles.contactLink}
                  >
                    <TwitterIcon />
                    <Link href="https://twitter.com/czearing_" passHref>
                      <LinkComponent>Twitter</LinkComponent>
                    </Link>
                  </Stack>
                  <Stack
                    verticalAlignment="center"
                    className={styles.contactLink}
                  >
                    <InstagramIcon />
                    <Link
                      href="https://www.instagram.com/calebzmusic/"
                      passHref
                    >
                      <LinkComponent>Instagram</LinkComponent>
                    </Link>
                  </Stack>
                </>
              )}
              {selectedTab === "3" && (
                <>
                  <Stack
                    verticalAlignment="center"
                    className={styles.contactLink}
                  >
                    <SoundCloudIcon />
                    <Link href="https://soundcloud.com/caleb_z" passHref>
                      <LinkComponent>Soundcloud</LinkComponent>
                    </Link>
                  </Stack>
                  <Stack
                    verticalAlignment="center"
                    className={styles.contactLink}
                  >
                    <SpotifyIcon />
                    <Link
                      href="https://open.spotify.com/artist/564lyz9Wk0PY0XT6P6pnCk?si=FLjgmlIOSDit6HcBw5Feww&nd=1"
                      passHref
                    >
                      <LinkComponent>Spotify</LinkComponent>
                    </Link>
                  </Stack>
                  <Stack
                    verticalAlignment="center"
                    className={styles.contactLink}
                  >
                    <ITunesIcon />
                    <Link
                      href="https://music.apple.com/us/artist/calebz/1566040977"
                      passHref
                    >
                      <LinkComponent>iTunes</LinkComponent>
                    </Link>
                  </Stack>
                </>
              )}
              {selectedTab === "4" && (
                <>
                  <Stack
                    verticalAlignment="center"
                    className={styles.contactLink}
                  >
                    <YoutubeIcon />
                    <Link href="https://www.youtube.com/c/CalebZaudio" passHref>
                      <LinkComponent>Youtube</LinkComponent>
                    </Link>
                  </Stack>
                  <Stack
                    verticalAlignment="center"
                    className={styles.contactLink}
                  >
                    <MediumIcon />
                    <Link href="https://medium.com/@czearing" passHref>
                      <LinkComponent>Medium</LinkComponent>
                    </Link>
                  </Stack>
                </>
              )}
              <Stack verticalAlignment="center" style={{ opacity: "0" }}>
                <MailIcon />
                <Body>czearing@outlook.com</Body>
              </Stack>
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
