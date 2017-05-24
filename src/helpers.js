/*
**  Common usage functions
*/

/* Format name */
export function FormatName(rawName) {
  return (
    rawName.toLowerCase()
      .replace('-', ' ')
      .replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
      })
  )
}

/* Get ID from SRC */
export function GetId(url) {
  if (url !== null && url !== undefined) {
    return url.split("/").slice(-2)[0];
  } else {
    return null;
  }
}
