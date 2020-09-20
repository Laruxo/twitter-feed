import React from "react";
import avatarIcon from "../../assets/avatar.svg";
import twitterLogo from "../../assets/twitter.svg";
import heartIcon from "../../assets/heart.svg";
import filledHeartIcon from "../../assets/heart-filled.svg";
import "./Tweet.css";

interface TweetProps {
  item: TweetType;
  toggleLike: (id: number) => void;
}

function Tweet({ item, toggleLike }: TweetProps) {
  return (
    <li className="tweet">
      <div className="tweet-header">
        <img className="tweet-avatar" src={avatarIcon} alt="avatar" />
        <div className="tweet-account">{item.account}</div>
        <img className="tweet-logo" src={twitterLogo} alt="twitter logo" />
      </div>
      <div className="tweet-content">{item.content}</div>
      <div className="tweet-footer">
        <div className="tweet-date">
          {new Date(item.timestamp).toLocaleString()}
        </div>
        <button
          className={`tweet-like${item.liked ? " active" : ""}`}
          type="button"
          onClick={() => toggleLike(item.timestamp)}
        >
          {item.liked ? (
            <img src={filledHeartIcon} alt="unlike tweet" />
          ) : (
            <img src={heartIcon} alt="like tweet" />
          )}
        </button>
      </div>
    </li>
  );
}

export default Tweet;
