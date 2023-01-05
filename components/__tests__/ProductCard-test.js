// import * as React from "react";
// import renderer from "react-test-renderer";
// import { ProductCard } from "../ProductCard";

// jest.mock("@react-navigation/native", () => {
//   return {
//     useNavigation: () => ({
//       navigate: jest.fn(),
//     }),
//   };
// });

// it("should contain product information", () => {
//   const card = renderer.create(<ProductCard />);
//   const instance = tabb.root;
//   const navigation = instance.findByProps({ testID: "navigation" });
//   const name = instance.findByProps({ testID: "name" });
//   const description = instance.findByProps({ testID: "description" });
//   const rating = instance.findByProps({ testID: "rating" });
//   expect(navigation).toContain("product.name");
//   expect(name.instance.findByProps({ testID: "name" }).props.children).toBe(
//     "product.name"
//   );
//   expect(
//     description.instance.findByProps({ testID: "description" }).props.children
//   ).toBe("product.description");
//   expect(rating.instance.findByProps({ testID: "rating" }).props.children).toBe(
//     "product.rating"
//   );
//   expect(card).toMatchSnapshot();
// });
