import React, { useEffect, useMemo, useState } from "react";
import Tweet from "./components/Tweet/Tweet";
import Header from "./components/Header/Header";
import useTweets from "./utils/useTweets";

function App() {
  const [showAll, setShowAll] = useState(true);
  const { items, toggleLike, clear } = useTweets();

  const likedCount = useMemo(() => {
    return items.reduce((prev, curr) => prev + (curr.liked ? 1 : 0), 0);
  }, [items]);

  useEffect(() => {
    if (likedCount === 0) {
      setShowAll(true);
    }
  }, [likedCount]);

  const filteredList = useMemo(() => {
    return showAll ? items : items.filter((item) => item.liked);
  }, [items, showAll]);

  return (
    <main>
      <Header
        showAll={showAll}
        setShowAll={setShowAll}
        likedCount={likedCount}
        clear={clear}
      />

      <ul className="tweets-list">
        {filteredList.map((item) => (
          <Tweet key={item.timestamp} item={item} toggleLike={toggleLike} />
        ))}
      </ul>
    </main>
  );
}

export default App;
