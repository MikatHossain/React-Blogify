const FavoriteItem = ({ favourite }) => {
  const { title, tags } = favourite || {};
  return (
    <li>
      <h3 className="text-white font-medium hover:text-slate-300 transition-all cursor-pointer ">
        {title}
      </h3>
      <div className="flex gap-2 text-slate-400 flex-wrap">
        {tags?.split(" ").map((tag, i) => (
          <p key={i}>{tag}</p>
        ))}
      </div>
    </li>
  );
};

export default FavoriteItem;
