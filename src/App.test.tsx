import React from "react";
import { render, fireEvent, getByRole, queryByAltText } from "@testing-library/react";
import App from "./App";
import useTweets from "./utils/useTweets";
// TODO find out how to mock rxjs objects, so useTweets could be tested

jest.mock("./utils/useTweets");
const mockUseTweets = useTweets as jest.Mock;
const mockData = {
  items: [
    {
      account: "account 1",
      timestamp: Date.now(),
      content: "content 1",
      liked: false,
    },
    {
      account: "account 2",
      timestamp: Date.now() + 1,
      content: "content 2",
      liked: true,
    },
  ],
  toggleLike: jest.fn(),
  clear: jest.fn(),
};
mockUseTweets.mockReturnValue(mockData);

describe("App", () => {
  it("should tweets list", function () {
    const component = render(<App />);
    expect(component.queryAllByRole("listitem")).toHaveLength(2);
  });

  it("should toggle between all and liked tweets", function () {
    const component = render(<App />);

    fireEvent.click(component.getByText("Liked Tweets"));
    const liked = component.queryAllByRole("listitem");
    expect(liked).toHaveLength(1);

    expect(queryByAltText(liked[0], 'unlike tweet')).toBeTruthy();
    fireEvent.click(component.getByText("All Tweets"))
    expect(component.queryAllByRole("listitem")).toHaveLength(2);
  });

  it("should be possible to like tweets", function () {
    const component = render(<App />);
    const tweets = component.queryAllByRole("listitem");
    fireEvent.click(getByRole(tweets[0], "button"));
    expect(mockData.toggleLike).toHaveBeenCalledWith(
      mockData.items[0].timestamp
    );
  });

  it("should display number of liked tweets", function () {
    const component = render(<App />);
    const button = component.queryByText("Liked Tweets");
    expect(button?.textContent).toContain('1');
  });

  it("should be possible to clear tweets", function () {
    const component = render(<App />);
    fireEvent.click(component.getByText("Clear"), "button");
    expect(mockData.clear).toHaveBeenCalled();
  });
});
