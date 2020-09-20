import { useEffect, useState } from "react";
import { tweets } from "./api";

export default function useTweets() {
  const [items, setItems] = useState<TweetType[]>([]);

  useEffect(() => {
    const subscription = tweets.subscribe((tweet) => {
      setItems((prev) =>
        [tweet, ...prev].sort((a, b) => b.timestamp - a.timestamp)
      );
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const oldTweetTime = Date.now() - 30000;
        return prev.filter(
          (item) => item.liked || item.timestamp > oldTweetTime
        );
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function toggleLike(id: number) {
    setItems((prev) => {
      const ind = prev.findIndex((i) => i.timestamp === id);
      if (ind !== -1) {
        const newItem = { ...prev[ind], liked: !prev[ind].liked };
        return [...prev.slice(0, ind), newItem, ...prev.slice(ind + 1)];
      }
      return prev;
    });
  }

  function clear() {
    setItems([]);
  }

  return { items, toggleLike, clear };
}
