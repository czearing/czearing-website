import * as React from "react";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import { Card, Header3, Body, CardMedia } from "@cebus/react-components";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from "react-timeago";

const Articles: NextPage = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@czearing"
    ).then((res) => res.json())
  );

  const generateMediumArticles = () => {
    return (
      !isLoading &&
      !error &&
      data.items.map((item: any) => (
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
                layout="fill"
              />
            </CardMedia>
          </Card>
        </Link>
      ))
    );
  };

  return generateMediumArticles();
};

export default Articles;
