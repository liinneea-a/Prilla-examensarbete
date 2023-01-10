import * as React from "react";
import renderer from "react-test-renderer";
import Tabbar from "../Tabbar";

it("should contain two text tags", () => {
  const tabb = renderer.create(<Tabbar />);
  const instance = tabb.root;
  const trending = instance.findByProps({ testID: "trending" });
  const popular = tabb.root.findByProps({ testID: "popular" });
  expect(trending.props.children).toBe("Trendande sorter");
  expect(popular.props.children).toBe("Toppbetyg");
  expect(tabb).toMatchSnapshot();
});
