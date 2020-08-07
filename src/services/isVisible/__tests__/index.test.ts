import getHeaderHeight from "../../GetHeaderHeight";
import isVisible from "../index";

jest.mock("../../GetHeaderHeight", () => jest.fn(() => 25));

it("tells you if an element is not visible", () => {
  const mockElement = document.createElement("div");
  const visible = isVisible(mockElement);
  expect(getHeaderHeight).toHaveBeenCalled();

  expect(visible).toBe(false);
});

it("tells you if an element is visible", () => {
  const mockElement = document.createElement("div");
  document.body.appendChild(mockElement);
  mockElement.innerText = "Hello World";
  mockElement.style.top = "400px";
  const visible = isVisible(mockElement);

  expect(visible).toBe(true);
});
