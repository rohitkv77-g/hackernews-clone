const ListItem = (props) => {
  const { index, author, title, url, created_at, points, num_comments } = props;
  return (
    <div className="flex my-4 text-2xl">
      <div className="text-gray-400 w-10 text-right">{index + 1}.</div>
      <div className="ml-5">
        <div className="">
          {title}
          <span className="text-gray-400 px-2">{url}</span>
        </div>
        <div className="text-xl text-gray-400">
          {points} point{points > 1 ? "s" : ""} by {author} {created_at}|{" "}
          <a>hide</a> |<a> past</a> |
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

export default ListItem;
