export const calcCorrectIndex = (index, array) => {
  console.log(index);
  if (index >= array.length) {
    console.log("index>=array");
    index = array.length - 1;
  } else if (index < 0) {
    console.log("index<0");
    index = 0;
  }
  return index;
};
