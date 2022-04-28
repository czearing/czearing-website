import * as React from "react";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import {
  Card,
  Body,
  Stack,
  CardMedia,
  Divider,
  Input,
  Text,
  Grid,
  SearchIcon,
} from "@cebus/react-components";
import type { InputProps } from "@cebus/react-components";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from "react-timeago";

const Articles: NextPage = () => {
  const [inputValue, setInputValue] = React.useState("");
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@czearing"
    ).then((res) => res.json())
  );

  const onChange: InputProps["onChange"] = (_ev, incomingValue) => {
    setInputValue(incomingValue.value);
  };

  const generateMediumArticles = () => {
    return (
      !isLoading &&
      !error &&
      data?.items?.map(
        (item: any) =>
          item?.title?.toLowerCase().includes(inputValue.toLowerCase()) && (
            <Link href={item.link} passHref>
              <Card style={{ width: "350px" }} onClick={() => null}>
                <Text weight="bold" truncate={2} style={{ height: "45px" }}>
                  {item.title}
                </Text>
                <CardMedia>
                  <Image
                    src={item.thumbnail}
                    height="130px"
                    width="250px"
                    objectFit="cover"
                  />
                </CardMedia>
                <Body weight="thin">
                  <TimeAgo date={item.pubDate} />
                </Body>

                <Stack>
                  {item.categories.map((category: string) => (
                    <Body>{category}</Body>
                  ))}
                </Stack>
              </Card>
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
        placeholder="Search articles"
      />
      <Divider />
      <Grid contentSize="350px" horizontalAlignment="center">
        {generateMediumArticles()}
      </Grid>
    </>
  );
};

export default Articles;
