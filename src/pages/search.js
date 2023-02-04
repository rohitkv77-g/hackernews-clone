import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/newest.module.css";
import axios from "axios";
import Stories from "@/components/Stories";
import Comment from "@/components/Comments";
import getTimeDifference from "@/utils/getTimeDifference";
import getDomain from "@/utils/getDomain";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchOf, setSearchOf] = useState("all");
  const [searchBy, setSearchBy] = useState("popularity");
  const [searchFor, setSearchFor] = useState("0");
  const [page, setPage] = useState(0);
  const [url, setUrl] = useState(`https://hn.algolia.com/api/v1/search`);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getTimestamp = (days) => {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return Math.floor(date.getTime() / 1000);
    };

    if (searchBy === "popularity") {
      if (searchOf === "all")
        setUrl(
          `https://hn.algolia.com/api/v1/search?query=${searchValue}&page=${page}${
            searchFor === "0"
              ? ""
              : `&numericFilters=created_at_i>${getTimestamp(searchFor)}`
          }`
        );
      else
        setUrl(
          `https://hn.algolia.com/api/v1/search?query=${searchValue}&tags=${searchOf}&page=${page}${
            searchFor === "0"
              ? ""
              : `&numericFilters=created_at_i>${getTimestamp(searchFor)}`
          }`
        );
    } else {
      if (searchOf === "all")
        setUrl(
          `https://hn.algolia.com/api/v1/search_by_date?query=${searchValue}&page=${page}${
            searchFor === "0"
              ? ""
              : `&numericFilters=created_at_i>${getTimestamp(searchFor)}`
          }`
        );
      else
        setUrl(
          `https://hn.algolia.com/api/v1/search_by_date?query=${searchValue}&tags=${searchOf}&page=${page}${
            searchFor === "0"
              ? ""
              : `&numericFilters=created_at_i>${getTimestamp(searchFor)}`
          }`
        );
    }
  }, [searchValue, searchOf, searchBy, searchFor, page, url]);
  useEffect(() => {
    const getNews = async () => {
      const data = await axios.get(url);
      setData(data.data.hits);
    };

    getNews();
  }, [url]);
  return (
    <div className="" style={{ backgroundColor: "#F6F6EF" }}>
      <div className={styles.head}>
        <div className="py-2 flex items-center justify-between w-full">
          <div className="flex md:mr-10 mr-1">
            <Image
              src="https://news.ycombinator.com/y18.gif"
              width={60}
              height={8}
              alt="logo"
              className="mx-2 border-2"
            />
            <p className="md:text-2xl text-md md:leading-normal leading-4">
              Search <br /> Hacker News
            </p>
          </div>
          <div className="w-3/5">
            <input
              type="search"
              placeholder="Search stories by title, url or author"
              className="w-full p-4 text-xl rounded-md"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="md:px-10 px-3 md:text-2xl text-sm">Settings</div>
        </div>
      </div>
      <div className="flex mx-4 my-4 items-center">
        <p className="mr-3">Search</p>
        <select
          className="mr-6"
          style={{ height: "2.5rem" }}
          onChange={(e) => setSearchOf(e.target.value)}
        >
          <option value="all" className="p-8">
            All
          </option>
          <option value="story" className="p-2">
            Stories
          </option>
          <option value="comment" className="p-2">
            Comments
          </option>
        </select>
        <p className="mr-3">by</p>
        <select
          className="mr-6"
          style={{ height: "2.5rem" }}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="popularity" className="p-2">
            Popularity
          </option>
          <option value="date" className="p-2">
            Date
          </option>
        </select>
        <p className="mr-3">for</p>
        <select
          className="mr-6"
          style={{ height: "2.5rem" }}
          onChange={(e) => setSearchFor(e.target.value)}
        >
          <option value="0" className="p-2">
            All time
          </option>
          <option value="1" className="p-2">
            Last 24h
          </option>
          <option value="7" className="p-2">
            Past Week
          </option>
          <option value="30" className="p-2">
            Past Month
          </option>
          <option value="365" className="p-2">
            Past Year
          </option>
        </select>
      </div>
      <div className="py-5 w-11/12 md:px-8">
        {data.map((item, index) => {
          if (item.title === null || item.title.length === 0) {
            return (
              <Comment
                key={index}
                author={item.author}
                comment={item.comment_text}
                on={item.story_title}
                created_at={getTimeDifference(item.created_at)}
                points={item.points}
              />
            );
          } else {
            return (
              <Stories
                key={index}
                author={item.author}
                title={item.title}
                url={getDomain(item.url)}
                created_at={getTimeDifference(item.created_at)}
                points={item.points}
                num_comments={item.num_comments}
              />
            );
          }
        })}
        <a
          className="pl-10 text-2xl cursor-pointer hover:text-blue-500"
          onClick={() => setPage(page + 1)}
        >
          More
        </a>
      </div>
      <hr style={{ borderColor: "orange", borderWidth: 2 }} />
      <footer className="flex justify-center p-5 text-xl bg-white w-full">
        <div className="flex justify-evenly items-center w-full md:w-4/5">
          <a className="text-sm lg:text-lg ">About</a>{" "}
          <span className="bg-black h-2 w-2 rounded hidden sm:inline"></span>
          <a className="text-sm lg:text-lg "> Setting</a>{" "}
          <span className="bg-black h-2 w-2 rounded hidden sm:inline"></span>
          <a className="text-sm lg:text-lg "> Help</a>{" "}
          <span className="bg-black h-2 w-2 rounded hidden sm:inline"></span>
          <a className="text-sm lg:text-lg "> API Documentation</a>{" "}
          <span className="bg-black h-2 w-2 rounded hidden sm:inline"></span>
          <a className="text-sm lg:text-lg "> Hacker News</a>{" "}
          <span className="bg-black h-2 w-2 rounded hidden sm:inline"></span>
          <a className="text-sm lg:text-lg "> Fork/Contribute</a>{" "}
          <span className="bg-black h-2 w-2 rounded hidden sm:inline"></span>
          <a className="text-sm lg:text-lg "> Cool Apps</a>
        </div>
      </footer>
    </div>
  );
};

export default Search;
