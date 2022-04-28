import * as React from "react";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import {
  Body,
  Stack,
  CardMedia,
  Divider,
  Input,
  SearchIcon,
  Grid,
  Text,
} from "@cebus/react-components";
import type { InputProps } from "@cebus/react-components";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from "react-timeago";
import { makeStyles } from "@griffel/react";

const useStyles = makeStyles({
  button: {
    cursor: "pointer",
  },
});

const Videos: NextPage = () => {
  const [inputValue, setInputValue] = React.useState("");
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.GOOGLE_API_KEY}&channelId=UC31v1AyV3iRiq3eGRN4l-RQ&&part=snippet,id&order=date&maxResults=50`
    ).then((res) => res.json())
  );
  const styles = useStyles();

  const onChange: InputProps["onChange"] = (_ev, incomingValue) => {
    setInputValue(incomingValue.value);
  };

  const generateVideos = () => {
    return (
      !isLoading &&
      !error &&
      data?.items?.map(
        (item: any) =>
          item?.snippet?.title
            ?.toLowerCase()
            .includes(inputValue.toLowerCase()) &&
          item?.id?.kind === "youtube#video" && (
            <Link
              href={`http://www.youtube.com/watch?v=${item.id.videoId}`}
              passHref
            >
              <Stack vertical className={styles.button}>
                <CardMedia>
                  <Image
                    src={item.snippet.thumbnails.high.url}
                    height="130px"
                    width="250px"
                    objectFit="cover"
                  />
                </CardMedia>
                <div style={{ width: "250px" }}>
                  <Text weight="bold" truncate={2}>
                    {item.snippet.title}
                  </Text>
                  <Body weight="thin">
                    <TimeAgo date={item.snippet.publishedAt} />
                  </Body>
                </div>
              </Stack>
            </Link>
          )
      )
    );
  };

  return (
    <>
      <Input
        value={inputValue}
        onChange={onChange}
        contentBefore={<SearchIcon />}
        placeholder="Search videos"
      />
      <Divider />
      <Grid contentSize={"250px"}>{generateVideos()}</Grid>
    </>
  );
};

export default Videos;
