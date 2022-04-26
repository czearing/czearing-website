import * as React from "react";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import { Card, Header3, Body, CardMedia } from "@cebus/react-components";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from "react-timeago";

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@czearing"
    ).then((res) => res.json())
  );

  return (
    !isLoading && (
      <>
        <Link href={data.items[0].link}>
          <Card style={{ maxWidth: "450px" }} onClick={() => null}>
            <Body>
              <TimeAgo date={data.items[0].pubDate} />
            </Body>
            <Header3 weight="bold">{data.items[0].title}</Header3>
            <CardMedia>
              <img
                src={data.items[0].thumbnail}
                style={{ objectFit: "cover" }}
              />
            </CardMedia>
          </Card>
        </Link>
      </>
    )
  );
};

export default Home;
