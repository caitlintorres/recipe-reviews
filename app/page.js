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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto p-4 shadow-lg bg-white rounded">
        <h1 className="text-2xl font-bold mb-4">Add Recipe Review</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="link" className="block font-medium mb-1">
              Recipe Link
            </label>
            <input
              id="link"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Rating: {rating}/10
            </label>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Attributes</label>
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Save Review
          </button>
        </div>
      </div>

      <div className="mt-8 max-w-lg mx-auto space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="shadow-md p-4 bg-white rounded border border-gray-200"
          >
            <a
              href={rev.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {rev.link}
            </a>
            <p className="mt-2 text-sm text-gray-600">⭐ {rev.rating}/10</p>
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
