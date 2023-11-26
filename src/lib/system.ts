export function onSignalExit(...fns) {
  fns.forEach((fn) => {
    process.on('SIGTERM', fn);
    process.on('SIGINT', fn);
  });
}