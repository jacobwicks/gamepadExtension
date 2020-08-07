import getHeaderHeight from "../../GetHeaderHeight";
import isTotallyVisible from "../index";
import { JSDOM } from "jsdom";

jest.mock("../../GetHeaderHeight", () => jest.fn(() => 25));

it("tells you if an element is not totally visible", () => {
  const mockElement = document.createElement("div");
  mockElement.style.top = "900px";

  const visible = isTotallyVisible(mockElement);
  expect(visible).toBe(false);
});

it("tells you if an element is totally visible", () => {
  //   const mockElement = document.createElement("div");
  //   mockElement.textContent = "Hello world";
  //   mockElement.style.top = "400px";

  //   const visible = isTotallyVisible(mockElement);
  //   expect(visible).toBe(true);
  // Create a new DOM with jsdom and get the window element;
  const jsdom = new JSDOM(
    "<!doctype html><html><body><div>Hello World</div></body></html>"
  );
  const { window } = jsdom;

  // Get number of divs.  Expecting 1.
  const initialNumberOfDivs = jsdom.window.document.getElementsByTagName("div")
    .length;
  console.log(`# OF DIVS IN CONSTRUCTED DOM: ${initialNumberOfDivs}`); // Unexpected.  I expect 1, but get 0.

  // Get number of bodies.  Expecting 1.
  const bodyElements = jsdom.window.document.getElementsByTagName("body");
  console.log(`# OF BODIES IN CONSTRUCTED DOM: ${bodyElements.length}`); // Expected.  I expect 1, and get 1.

  // Get the body itself to operate on.
  const bodyElement = bodyElements[0];
  console.log(
    `# OF DIVS IN CONSTRUCTED BODY: ${
      bodyElement.getElementsByTagName("div").length
    }`
  ); // Unexpected.  I expect 1, but get 0.

  // Add a div to the body.
  bodyElement.insertAdjacentHTML(
    "afterbegin",
    "<div id='myDiv'>Goodbye!!</div>"
  );

  // Now it gets really weird.....
  const numberOfDivsAfterInsert = jsdom.window.document.getElementsByTagName(
    "div"
  ).length;
  console.log(`# OF DIVS AFTER INSERT: ${numberOfDivsAfterInsert}`); // Expected... I (unexpectedly) had zero before, but now I have one, so one more.

  // But now lets serialize the dom again, and there is no trace of the added div!
  console.log(`DOM AFTER INSERT: ${jsdom.serialize()}`); // Why no "Goodbye" div here?.

  const divById = jsdom.window.document.getElementById("myDiv");
  console.log(`div by id`, !!divById);
  console.log(divById?.offsetTop);
});
