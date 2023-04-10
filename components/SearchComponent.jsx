import Link from "next/link";
import React, { useEffect, useState } from "react";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query) {
      fetch(`http://localhost:5000/api/search?term=${query}`)
        .then((res) => res.json())
        .then((res) => {
          setResults(res);
        });
    } else setResults([]);
  }, [query]);

  return (
    <div className="relative ">
      <div class="w-48">
        <div class="relative flex items-center  h-12  focus-within:shadow-sm border rounded-full bg-white overflow-hidden">
          <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            value={query}
            onChange={handleInputChange}
            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search.."
          />
        </div>
      </div>

      <div className="flex justify-center ">
        {results.length > 0 && query.length > 0 && (
          <div className="lg:w-[400px] absolute z-10 top-full mt-2 w-full rounded-md shadow-xl  bg-white divide-y divide-gray-200 ">
            {results.slice(0, 5).map((result) => (
              <Link key={result._id} href={`/product/${result._id}`}>
                <div key={result._id} className="p-3">
                  <div className="flex justify-start items-center">
                    <img src={result.thumb} className="h-16 w-16" alt="" />
                    <div className="ml-2">
                      <h2 className="text-md font-medium">{result.title}</h2>
                      <p className="text-[13px]">
                        {" "}
                        Price:{" "}
                        <span className="text-green-600">
                          &#8356;{result.price}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
