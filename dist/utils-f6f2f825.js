function resolveURL(relPath) {
  const src = document.querySelector('script[src*=pb-components]');
  if (src) {
    return new URL(relPath, src.src).href;
  }
  return new URL(relPath, window.location.href).href;
}

export { resolveURL as r };
//# sourceMappingURL=utils-f6f2f825.js.map
