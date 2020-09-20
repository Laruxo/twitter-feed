import React, { Dispatch } from "react";
import "./Header.css";

interface HeaderProps {
  showAll: boolean;
  setShowAll: Dispatch<boolean>;
  likedCount: number;
  clear: () => void;
}

function Header({ showAll, setShowAll, likedCount, clear }: HeaderProps) {
  return (
    <header className="header">
      <button
        className="header-link"
        type="button"
        onClick={() => setShowAll(true)}
        disabled={showAll}
      >
        All Tweets
      </button>
      {likedCount > 0 && (
        <button
          className="header-link"
          type="button"
          onClick={() => setShowAll(false)}
          disabled={!showAll}
        >
          Liked Tweets
          <span className="badge">{likedCount}</span>
        </button>
      )}
      <div className="spacer" />
      <button className="header-link danger" type="button" onClick={clear}>
        Clear
      </button>
    </header>
  );
}

export default Header;
