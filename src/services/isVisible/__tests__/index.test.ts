import getHeaderHeight from "../../GetHeaderHeight";
import isVisible from "../index";

it("tells you if an elemnet is visible", () => {
  const getHeaderHeight = jest.fn(() => 25);

  const mockElement = document.createElement("div");
  const elementVisibility = isVisible(mockElement);
  expect(getHeaderHeight).toHaveBeenCalled();
});
