import * as React from "react";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import {
  Card,
  Header3,
  Body,
  Stack,
  CardMedia,
  Divider,
  Input,
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
              <Card style={{ maxWidth: "450px" }} onClick={() => null}>
                <Body>
                  <TimeAgo date={item.pubDate} />
                </Body>
                <Header3 weight="bold">{item.title}</Header3>
                <CardMedia>
                  <Image
                    src={item.thumbnail}
                    height="220px"
                    width="450px"
                    objectFit="cover"
                  />
                </CardMedia>
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
      {generateMediumArticles()}
    </>
  );
};

export default Articles;
