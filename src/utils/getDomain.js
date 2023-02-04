const getDomain = (url) => {
  if (url == null || !url.length) return;
  const Url = new URL(url);
  return "(" + Url.hostname.toString() + ")";
};
export default getDomain;
