export function textToColor(text) {
  // Use the md5 hash function to convert the text to a numerical value
  var hash = 0;
  for (var i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Map the numerical value to a range of colors
  var r = (hash & 0xff0000) >> 16;
  var g = (hash & 0x00ff00) >> 8;
  var b = hash & 0x0000ff;
  // Convert the color to a hex value
  var color =
    "#" + ("000000" + ((r << 16) | (g << 8) | b).toString(16)).slice(-6);
  return color;
}
