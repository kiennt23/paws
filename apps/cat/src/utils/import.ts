export const importAll = (r: __WebpackModuleApi.RequireContext) => {
  let images: Record<string, string> = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
