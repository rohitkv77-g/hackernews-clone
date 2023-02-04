const Stories = (props) => {
  const { index, author, title, url, created_at, points, num_comments } = props;
  return (
    <div className="flex my-4 text-2xl">
      <div className="ml-5">
        <div className="">
          {title}
          <span className="text-gray-400 px-2">{url}</span>
        </div>
        <div className="text-lg text-gray-400 mt-2">
          {points} point{points > 1 ? "s" : ""} | {author} | {created_at} |
          <a>
            {num_comments > 0
              ? `${num_comments} ${num_comments > 1 ? "comments" : "comment"}`
              : "discuss"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Stories;
