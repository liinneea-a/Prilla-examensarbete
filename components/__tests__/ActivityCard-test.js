import * as React from "react";
import renderer from "react-test-renderer";
import { string } from "yup";
import { ActivityCard } from "../ActivityCard";

const review = {
  photo: string,
  id: string,
};

it("should contain a placeholder and author name be to undefined", () => {
  const card = renderer.create(<ActivityCard />);
  const instance = card.root;
  const placeholder = instance.findByProps({ testID: "placeholder" });
  const author = card.root.findByProps({ testID: "author" });
  expect(placeholder.props.children).toMatch("User Pic");
  expect(author.props.children).toBeUndefined();
});
