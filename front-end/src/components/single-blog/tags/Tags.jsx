const Tags = ({ tags }) => {
  const tagsList = tags.split(",");

  return (
    <ul className="tags">
      {tagsList.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
};

export default Tags;
