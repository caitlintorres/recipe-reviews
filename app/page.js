"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import { supabase } from "@/lib/supabaseClient";

export default function RecipeReviewApp() {
  const [link, setLink] = useState("");
  const [rating, setRating] = useState(5);
  const [attributes, setAttributes] = useState([]);
  const [reviews, setReviews] = useState([]);

  const ATTR_OPTIONS = [
    { label: "Healthy", value: "Healthy" },
    { label: "Quick", value: "Quick" },
    { label: "Kid-friendly", value: "Kid-friendly" },
    { label: "Budget", value: "Budget" },
    { label: "Special Occasion", value: "Special Occasion" },
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setReviews(data);
  }

  async function addReview() {
    if (!link) return;
    const { error } = await supabase.from("reviews").insert([
      { link, rating, attributes },
    ]);
    if (!error) {
      setLink("");
      setRating(5);
      setAttributes([]);
      fetchReviews();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Recipe Reviews
        </h1>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Recipe Link
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="https://..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Rating: {rating}/10
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Attributes
            </label>
            <Select
              isMulti
              options={ATTR_OPTIONS}
              value={ATTR_OPTIONS.filter((o) => attributes.includes(o.value))}
              onChange={(vals) =>
                setAttributes(vals ? vals.map((v) => v.value) : [])
              }
              placeholder="Pick attributes..."
              className="text-sm"
            />
          </div>

          <button
            onClick={addReview}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Review
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="max-w-2xl mx-auto mt-10 space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <a
              href={rev.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline break-words"
            >
              {rev.link}
            </a>
            <p className="mt-2 text-gray-700">⭐ Rating: {rev.rating}/10</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {rev.attributes?.map((attr) => (
                <span
                  key={attr}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {attr}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
