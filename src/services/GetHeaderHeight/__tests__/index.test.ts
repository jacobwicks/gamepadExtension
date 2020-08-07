import getHeaderHeight from "../index";

const originalOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "offsetHeight"
);
const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "offsetWidth"
);

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
    configurable: true,
    value: 25,
  });
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    value: 500,
  });
});

afterAll(() => {
  Object.defineProperty(
    HTMLElement.prototype,
    "offsetHeight",
    //@ts-ignore
    originalOffsetHeight
  );
  Object.defineProperty(
    HTMLElement.prototype,
    "offsetWidth",
    //@ts-ignore
    originalOffsetWidth
  );
});

it("finds the header height", () => {
  //spy on getElementsByTagName
  //so we can return a header element
  let spy = jest.spyOn(document, "getElementsByTagName");

  //create a header
  const mockHeader = document.createElement("header");
  mockHeader.style.height = "25px";

  //create an HTMLCollection that includes the header
  var docFragment = document.createDocumentFragment();
  docFragment.appendChild(mockHeader);
  var mockHTMLCollection = docFragment.children;

  //set the return value
  spy.mockReturnValue(mockHTMLCollection);

  const headerHeight = getHeaderHeight();
  expect(headerHeight).toEqual(25);
});
