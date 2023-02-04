import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "@/styles/newest.module.css";

// Utils
import getTimeDifference from "@/utils/getTimeDifference";
import getDomain from "@/utils/getDomain";

//Components
import ListItem from "@/components/ListItem";

const Newest = () => {
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getNews = async () => {
      const data = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?page=${page}&tags=story`
      );
      setNewsData(data.data.hits);
    };

    getNews();
  }, [page]);

  return (
    <div className="" style={{ backgroundColor: "#F6F6EF" }}>
      <div className={styles.head}>
        <div className={`flex py-2 flex items-center`}>
          <div className="flex mr-10">
            <Image
              src="https://news.ycombinator.com/y18.gif"
              width={30}
              height={20}
              alt="logo"
              className="mx-2 border-2"
            />
            <p className="text-3xl font-bold">Hacker News</p>
          </div>
          <div className="flex">
            <a href="#" className={styles.links} style={{ color: "#fff" }}>
              new
            </a>
            <a href="#" className={styles.links}>
              past
            </a>
            <a href="#" className={styles.links}>
              comments
            </a>
            <a href="#" className={styles.links}>
              ask
            </a>
            <a href="#" className={styles.links}>
              show
            </a>
            <a href="#" className={styles.links}>
              jobs
            </a>
            <a href="#" className={styles.links} style={{ border: "none" }}>
              submit
            </a>
          </div>
        </div>
        <div className="px-10 text-2xl">login</div>
      </div>
      <div className="py-5">
        {newsData.map((item, index) => {
          return (
            <ListItem
              key={index}
              index={page * 20 + index}
              author={item.author}
              title={item.title}
              url={getDomain(item.url)}
              created_at={getTimeDifference(item.created_at)}
              points={item.points}
              num_comments={item.num_comments}
            />
          );
        })}
        <a
          className="pl-10 text-2xl cursor-pointer hover:text-blue-500"
          onClick={() => setPage(page + 1)}
        >
          More
        </a>
      </div>
      <hr style={{ borderColor: "orange", borderWidth: 2 }} />
      <footer className="flex flex-col w-full items-center py-5 text-xl bg-white">
        <div className="flex justify-evenly items-center w-full md:w-4/5">
          <a className="text-sm lg:text-lg">Guidelines</a> |
          <a className="text-sm lg:text-lg"> FAQ</a> |
          <a className="text-sm lg:text-lg"> Lists</a> |
          <a className="text-sm lg:text-lg"> API</a> |
          <a className="text-sm lg:text-lg"> Security</a> |
          <a className="text-sm lg:text-lg"> Legal</a> |
          <a className="text-sm lg:text-lg"> Apply to YC</a> |{" "}
          <a className="text-sm lg:text-lg">Contact</a>
        </div>
        <div className="flex justify-center py-5">
          Search:
          <input
            type="text"
            className="border-2 ml-2 border-black rounded-md"
          />
        </div>
      </footer>
    </div>
  );
};

export default Newest;
