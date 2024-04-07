import React from "react";

export default function Button({meal}) {
  return (
    <button>
      <a href={meal.strYoutube || "#"}>Watch on YouTuBe</a>
    </button>
  );
}
