import * as React from "react";

export default function EventCard() {
  return (
    <>
      <a className="cursor-pointer flex justify-center mb-3" href="#">
        <div className="bg-gray-100 w-full md:w-1/3 h-52 mx-6 flex flex-col justify-between p-4 hover:shadow-md">
          <div className="w-full flex justify-between">
            <p className="text-sm font-semibold text-red-400">
              20 Dec 2020, 07:00 am
            </p>
            <p className="text-sm font-semibold text-red-400">Free Event</p>
          </div>

          <h1 className="font-black text-lg tracking-wide">
            The quick brown fox jumps over the lazy dog
          </h1>

          <div className="text-sm text-gray-500 font-normal max-h-14 leading-7 block overflow-ellipsis overflow-hidden break-words">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>

          <div className="w-full flex items-center">
            <svg
              className="w-3 h-3 fill-current text-gray-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                clip-rule="evenodd"
              />
            </svg>
            <p className="text-gray-500 font-normal text-sm">John Doe</p>
          </div>
        </div>
      </a>
    </>
  );
}
