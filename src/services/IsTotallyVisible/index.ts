import getHeaderHeight from "../GetHeaderHeight";

const isTotallyVisible = (elem: HTMLElement) => {
  const headerHeight = getHeaderHeight();
  //viewport
  const docViewTop = window.scrollY + headerHeight;

  console.log("docViewTop", docViewTop);

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  console.log("windowHeight", windowHeight);

  const docViewBottom = docViewTop + windowHeight;
  console.log("docViewBottom", docViewBottom);

  //element position
  const elemTop = elem.offsetTop;
  var elemBottom = elemTop + elem.offsetHeight;

  console.log(
    `elemTop ${elemTop} elemBottom ${elemBottom} elem height ${elem.offsetHeight}`
  );

  //whole element is in the viewport
  const wholeElementVisible =
    elemBottom <= docViewBottom && elemTop > docViewTop;

  return wholeElementVisible;
};

export default isTotallyVisible;
