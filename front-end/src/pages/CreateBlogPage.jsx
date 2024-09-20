import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateBlogMutation } from "../features/blogs/blogsAPI";
import { blogInputValidation } from "../utility/InputValidations";
import { showToast } from "../utility/toast";
const CreateBlogPage = ({ handler }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [isFormModified, setIsModified] = useState(false);
  const [createBlog, { data }] = useCreateBlogMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(blogInputValidation),
  });

  const handleFileUpload = () => {
    document.querySelector("input[name=thumbnail]").click();
  };

  const handleFileChange = (event) => {
    setIsModified(true);
    const file = event.target.files[0];

    setError("thumbnail", "");
    if (file) {
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        setError("thumbnail", {
          type: "manual",
          message: "Only images are allowed",
        });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setError("thumbnail", {
          type: "manual",
          message: "The file is too large",
        });
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedFile("");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (isFormModified) {
      const confirmDiscard = window.confirm(
        "You have unsaved changes. Do you really want to discard them?"
      );
      if (confirmDiscard) {
        handler();
      }
    } else {
      handler();
    }
  };

  const createBlogSubmit = (formData) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("tags", formData.tags);

    if (selectedFile) {
      data.append("thumbnail", selectedFile);
    }

    try {
      showToast("blog created successfully!", "success");
      createBlog(data);
      reset();
      handler();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className=" mt-20 fixed left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50 ">
      <section>
        <div className="container relative full mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10 ">
          <form
            method="POST"
            className="createBlog"
            onSubmit={handleSubmit(createBlogSubmit)}
            onChange={() => setIsModified(true)}
          >
            <div
              className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4"
              onClick={handleFileUpload}
            >
              <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                {filePreview ? (
                  <img
                    src={filePreview}
                    alt=""
                    className="h-[150px] w-screen object-cover"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>

                    <p>Upload Your Image</p>
                  </>
                )}
              </div>

              <input
                type="file"
                hidden
                {...register("thumbnail")}
                onChange={handleFileChange}
              />
              {errors?.thumbnail && (
                <p className="text-red-500">{errors?.thumbnail?.message}</p>
              )}
            </div>

            <div className="mb-6">
              <input
                type="text"
                id="title"
                className="text-xl "
                name="title"
                {...register("title")}
                placeholder="Enter your blog title"
              />
            </div>
            {errors?.title && (
              <p className="text-red-500">{errors?.title?.message}</p>
            )}
            <div className="mb-6">
              <input
                type="text"
                id="tags"
                name="tags"
                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                {...register("tags")}
              />
              {errors?.tags && (
                <p className="text-red-500">{errors?.tags?.message}</p>
              )}
            </div>

            <div className="mb-6">
              <textarea
                id="content"
                name="content"
                placeholder="Write your blog content"
                rows="8"
                {...register("content")}
              ></textarea>
              {errors?.content && (
                <p className="text-red-500">{errors?.content?.message}</p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Create Blog
              </button>
              <button
                className="bg-sky-400 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateBlogPage;
