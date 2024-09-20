const Error = ({ msg, className }) => {
  return (
    <div className=" flex h-full justify-center items-center  ">
      <p className={`${className} text-slate-400`}>{msg}</p>
    </div>
  );
};

export default Error;
