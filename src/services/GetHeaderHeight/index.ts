//reddit has a header element at the top of the page
//it takes up some space
const getHeaderHeight = () =>
  [...document.getElementsByTagName("header")][0]?.offsetHeight;

export default getHeaderHeight;
