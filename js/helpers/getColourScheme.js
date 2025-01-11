export function getColorScheme(index) {
  const schemes = [
    { colour: "pink", btnColour: "darkRed" },
    { colour: "darkBlue", btnColour: "blue" },
    { colour: "blue", btnColour: "darkBlue" },
    { colour: "default", btnColour: "default" },
  ];
  return schemes[index % 4];
}
