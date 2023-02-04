const Comment = (props) => {
  const { index, author, comment, on, created_at, points } = props;
  return (
    <div className="flex my-4 text-2xl">
      <div className="ml-5">
        <div className="text-lg text-gray-400">
          {points === null ? 0 : points} point{points > 1 ? "s" : ""} | {author}{" "}
          | {created_at} | parent | on: {on}
        </div>
        <div className="mt-2 text-xl">
          <span dangerouslySetInnerHTML={{ __html: comment }}></span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
