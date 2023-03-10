import React, { useState, useRef, useEffect } from "react";
import { submitComment } from "../services";
const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false),
    [localStorage, setLocalStorage] = useState(null),
    [showSuccessMessage, setShowSuccessMessage] = useState(false),
    commentEl = useRef(),
    nameEl = useRef(),
    emailEl = useRef(),
    storeDataEl = useRef();

  // useEffect(() => {
  //   nameEl.current.value = window.localStorage.getItem("name");
  //   emailEl.current.value = window.localStorage.getItem("email");
  // }, []);

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;
   
      if (!comment || !name || !email) {
        setError(true);
        return;
      }

      const commentObj = {
        name,
        email,
        comment,
        slug,
      };

      if (storeData) {
        window.localStorage.setItem("name", name);
        window.localStorage.setItem("email", email);
      } else {
        window.localStorage.removeItem("name", name);
        window.localStorage.removeItem("email", email);
      }
    

    submitComment(commentObj).then(() => {
      setShowSuccessMessage(ture);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rouded-lg pb-12 p-10  mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focis:ting-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="Comment"
          id=""
          placeholder="Comment"
        ></textarea>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          className="py-4 px-4 outline-none w-full rounded-lg focis:ting-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="Name"
          id=""
          placeholder="Name"
        />
        <input
          type="email"
          ref={nameEl}
          className="py-4 px-4 outline-none w-full rounded-lg focis:ting-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="Email"
          id=""
          placeholder="Email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="">
          <input
            type="checkbox"
            ref={storeDataEl}
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            htmlFor="storeData"
            className="text-gray-500 cursor-pointer ml-4"
          >
            Sabe My Email and Name next Time
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All Fields are Required</p>}
      <div className="mt-8">
        <button
          type="button"
          // onClick={handleCommentSubmission}
          className="transition duration-500 ease bg-pink-600 hover:bg-indigo-900 inline-block px-10 py-4 text-lg rounded-full text-white "
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500"></span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
