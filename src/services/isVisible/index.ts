import getHeaderHeight from "../GetHeaderHeight/";

//when scrolling, we use different calculations for visiblity
//because we want to move the character before the element completely scrolls off the screen
const isVisible = (elem: HTMLElement, scrolling?: boolean) => {
  //the height of the reddit header that takes up space at the top of the screen
  const headerHeight = getHeaderHeight();

  //viewport position
  const docViewTop = window.scrollY + headerHeight;
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const docViewBottom = docViewTop + windowHeight;

  //element position
  const elemTop = elem.offsetTop;
  var elemBottom = elemTop + elem.offsetHeight;

  //whole element is in the viewport
  const wholeElementVisible =
    elemBottom <= docViewBottom && elemTop > docViewTop;

  if (wholeElementVisible) return true;

  const oneThirdElemHeight = elem.offsetHeight / 3;

  //<= because scrollTo will place the top in line with the viewport
  const elemTopAboveViewportTop = elemTop <= docViewTop;

  const elemBottomBelowViewportBottom = elemBottom > docViewBottom;

  const moreThanTwoThirdsVisible =
    elemBottomBelowViewportBottom &&
    elemTop - docViewTop < 2 * oneThirdElemHeight;

  //part of the top of the element is visible
  const elemTopVisible = scrolling
    ? moreThanTwoThirdsVisible
    : elemBottomBelowViewportBottom && elemTop < docViewBottom;

  //when scrolling, we want more than 1/3rd visible
  const moreThanOneThirdVisible =
    elemTopAboveViewportTop && elemBottom - docViewTop > oneThirdElemHeight;

  //part of the bottom of the element is visible
  const elemBottomVisible = scrolling
    ? moreThanOneThirdVisible
    : //+10 avoids some bugs
      elemTopAboveViewportTop && elemBottom > docViewTop + 10;

  return elemTopVisible || elemBottomVisible;
};

export default isVisible;
