/**
 * Programming With JavaScript - QAP2
 *
 *      Name: Elliott Butt
 *      Date: March 17, 2024
 */

/*******************************************************************************
 * Problem 1: replace all internal whitespace in a string value with underscore
 * ('_'), and makes it lowercase.
 *
 * We want to be able to convert a string to Lower Snake Case style, so that all
 * leading/trailing whitespace is removed, and any internal spaces, tabs, or dots,
 * are converted to '_' and all letters are lower cased.
 *
 * The snake() function should work like this:
 *
 * snake('abc') --> returns 'abc'
 * snake(' ABC ') --> returns 'abc'
 * snake('ABC') --> returns 'abc'
 * snake('A BC') --> returns 'a_bc'
 * snake(' A bC  ') --> returns 'a_bc'
 * snake('A   BC') --> returns 'a_bc'
 * snake('A.BC') --> returns 'a_bc'
 * snake(' A..  B   C ') --> returns 'a_b_c'
 *
 ******************************************************************************/

function snake(value) {
  let rule1 = /\s+/g;
  let rule2 = /\.+/g;

  let result = value
    .trim()
    .replace(rule1, "_")
    .replace(rule2, "")
    .toLowerCase();

  return result;
}

// console.log(snake(" A bC  "));
// console.log(snake("A   BC"));
// console.log(snake(" A..  B   C "));

/*******************************************************************************
 * Problem 2: create an HTML <video> element for the given url.
 *
 * In HTML, we use markup syntax to indicate how browsers should format elements
 * of a web page.  For example, here is a URL to video:
 *
 * http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4
 *
 * Try navigating to it in your browser.  In order for a web page to know how to
 * interpret this URL (e.g., should we show the text of the URL itself, or use
 * it to load an image? or a video?), we have to use special markup. The <video>
 * tag is how we specify that a URL is to be interpreted as a video, see:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
 *
 * Here is how we might use HTML to markup this video:
 *
 * <video src="http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4" width="500"></video>
 *
 * Our <video> has two attributes:
 *
 * - src: the URL to a video file
 * - width: the width to use (in pixels) when showing the video
 *
 * Write the createVideo() function to accept a URL and width, and return the
 * properly formatted video element.  For example:
 *
 * createVideo('http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4', 500)
 *
 * should return the following string of HTML:
 *
 * '<video src="http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4" width="500"></video>'
 *
 * A <video> can also optionally contain a `controls` attribute, which turns on the play/pause/etc controls. For example:
 *
 * <video src="http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4" width="500" controls></video>
 *
 * In this case, the <video> element should include the user controls.  Therefore,
 * your createVideo() function should also accept a third argument, controls:
 *
 * // No controls
 * createVideo('http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4', 500)
 * // With controls
 * createVideo('http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4', 500, true)
 *
 * The returned <video> HTML string should be formatted as follows:
 *
 * - Remove leading/trailing whitespace from src before you use them
 * - The src and width attribute values should be wrapped in double-quotes (e.g., src="..." width="...")
 * - There should be a single space between the end of one attribute and start of the next (e.g., src="..." width="..." controls)
 * - The width attribute should only be added if a valid integer value (number or string) is included.  Otherwise ignore it.
 *
 * ******************************************************************************/

function createVideo(src, width, controls) {
  let attributs = [];
  let rule = /\.+/g;

  attributs.push(`src="${src.trim()}"`);
  if (rule.test(width) || !parseInt(width)) attributs.push(`width="${width}"`);
  controls && attributs.push("controls");

  let html = `<video ${attributs.join(" ")}></video>`;
  return html;
}

// console.log(createVideo("aa", 10, true));
// console.log(createVideo("bb", 10.5, false));
// console.log(createVideo("cc", "10", false));
// console.log(createVideo("dd", "10.5", true));

/*******************************************************************************
 * Problem 3: extract Date from date string
 *
 * A date string is expected to be formatted as follows:
 *
 * YYYY-MM-DD
 *
 * Meaning, Year (4 digits), Month (2 digits), Day (2 digits).
 *
 * January 1, 2021 would therefore be the following date string:
 *
 * 2021-01-01
 *
 * Similarly, September 29, 2021 would be:
 *
 * 2021-09-29
 *
 * Write a function, parseDateString() that accepts a date string of the format
 * specified above, and returns a JavaScript Date object, set to the correct day.
 * In your solution, you are encouraged to use the following Date methods:
 *
 * - setFullYear()
 * - setMonth()
 * - setDate()
 *
 * To help developers using your function, you are asked to provide detailed error
 * messages when the date string is formatted incorrectly.  We will use the `throw`
 * statement to throw an Error object when a particular value is not what we expect, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
 *
 * For example: parseDateString('01-01-01') should fail, because the year is
 * not 4 digits.
 *
 * Similarly, parseDateString('2021-1-01') should fail because
 * the day is not 2 digits, and parseDateString('2021-01-1') should fail because
 * the month is not 2 digits.
 *
 * Also, a totally invalid date string should also
 * cause an exception to be thrown, for example parseDateString(null) or
 * parseDateString("this is totally wrong").
 *
 ******************************************************************************/

function parseDateString(value) {
  let rule = /\d{4}-\d{2}-\d{2}/;

  if (!rule.test(value)) throw new Error("not a valid date format");

  let [year, month, day] = value.split("-");
  let date = new Date();

  date.setDate(parseInt(day));
  date.setMonth(parseInt(month) - 1);
  date.setYear(parseInt(year));

  return date;
}

// let date1 = parseDateString("2024-01-01");
// let date2 = parseDateString("1975-04-27");
// let date3 = parseDateString("2006-09-15");
// let date4 = parseDateString("1999-12-31");
// let date5 = parseDateString("this is not valid");

/*******************************************************************************
 * Problem 4: convert Date to date string with specified format.
 *
 * As above, a date string is expected to be formatted as follows:
 *
 * YYYY-MM-DD
 *
 * Meaning, Year (4 digits), Month (2 digits), Day (2 digits).
 *
 * Write a function, toDateString() that accepts a Date object, and returns a
 * date string formatted according to the specification above. Make sure your
 * day and month values are padded with a leading '0' if necessary (e.g., 03 vs. 3).
 *
 * In your solution, you are encouraged to use the following Date methods:
 *
 * - setFullYear()
 * - setMonth()
 * - setDate()
 *
 * NOTE: it should be possible to use parseDateString() from the previous question
 * and toDateString() to reverse each other. For example:
 *
 * toDateString(parseDateString('2021-01-29)) should return '2021-01-29'
 *
 * If an invalid Date is passed, throw an Error object with an appropriate error message.
 * HINT: use try/catch, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
 *
 ******************************************************************************/

function toDateString(value) {
  try {
    let year = `${value.getFullYear()}`;
    let month = `${value.getMonth() + 1}`;
    let day = `${value.getDate()}`;

    month.length < 2 ? (month = `0${month}`) : (month = month);
    day.length < 2 ? (day = `0${day}`) : (day = day);

    let dateString = `${year}-${month}-${day}`;
    return dateString;
  } catch (error) {
    return new Error("not a valid date");
  }
}

// console.log(toDateString("test"));
// console.log(toDateString(date2));
// console.log(toDateString(date3));
// console.log(toDateString(date4));

/*******************************************************************************
 * Problem 5: parse a geographic coordinate
 *
 * Coordinates are defined as numeric, decimal values of Longitude and Latitude.
 * A example, let's suppose the Keyin College St.John's campus is located at:
 *
 * Longitude: -77.4369 (negative number means West)
 * Latitude: 42.9755 (positive number means North)
 *
 * A dataset includes thousands of geographic coordinates, stored as strings.
 * However, over the years, different authors have used slightly different formats.
 * All of the following are valid and need to be parsed:
 *
 * 1. "42.9755,-77.4369" NOTE: no space
 * 4. "[-77.4369, 42.9755]" NOTE: the space, as well as lat/lng values are reversed
 *
 * Valid Longitude values are decimal numbers between -180 and 180.
 *
 * Valid Latitude values are decimal numbers between -90 and 90.
 *
 * Parse the value and reformat it into the form: "(lat, lng)"
 *
 ******************************************************************************/

function normalizeCoord(value) {
  // wasn't sure about the wording/objective of this one
  // reached out for clarification but didn't hear back
  // did not account for the swapped values as I think that was the typo/mistake

  let rule = /(-?\d*?\.\d*)/g;
  let [lat, lng] = value.match(rule);

  if (lat < -180 || lat > 180)
    throw new Error("lat must be between -180 and 180");

  if (lng < -90 || lng > 90) throw new Error("lng must be between -90 and 90");

  return `(${lat}, ${lng})`;
}

let coord1 = normalizeCoord("42.9755,-77.4369");
let coord2 = normalizeCoord("[-77.4369, 45.9755]");

/*******************************************************************************
 * Problem 6: format any number of coordinates as a list in a string
 *
 * You are asked to format geographic lat, lng coordinates in a list using your
 * normalizeCoord() function from problem 5.
 *
 * Where normalizeCoord() takes a single geographic coord, the formatCoords()
 * function takes a list of any number of geographic coordinates, parses them,
 * filters out any invalid coords, and creates a list.
 *
 * For example: given the following coords, "42.9755,-77.4369" and "[-62.1234, 42.9755]",
 * a new list would be created of the following form "((42.9755, -77.4369), (42.9755, -62.1234))".
 *
 * Notice how the list has been enclosed in an extra set of (...) braces, and each
 * formatted geographic coordinate is separated by a comma and space.
 *
 * The formatCoords() function can take any number of arguments, but they must all
 * be strings.  If any of the values can't be parsed by normalizeCoord() (i.e., if
 * an Error is thrown), skip the value.  For example:
 *
 * formatCoords("42.9755,-77.4369", "[-62.1234, 42.9755]", "300,-9000") should return
 * "((42.9755, -77.4369), (42.9755, -62.1234))" and skip the invalid coordinate.
 *

 ******************************************************************************/

function formatCoords(...values) {
  let coords = [];

  values.forEach((value) => {
    try {
      coords.push(normalizeCoord(value));
    } catch (error) {
      return;
    }
  });

  let result = `(${coords.join(", ")})`;
  return result;
}

console.log(formatCoords("42.9755,-77.4369", "[-62.1234, 42.9755]"));
console.log(
  formatCoords("42.9755,-77.4369", "[-62.1234, 42.9755]", "300,-9000"),
);

/*******************************************************************************
 * Problem 7: determine MIME type from filename extension
 *
 * Web browsers and servers exchange streams of bytes, which must be interpreted
 * by the receiver based on their type.  For example, an HTML web page is
 * plain text, while a JPG image is a binary sequence.
 *
 * The Content-Type header contains information about a resource's MIME type, see:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
 *
 * The MIME type is made-up of a `type` and a `subtype` separated by a `/` character.
 * The type is general, for example, 'text' or 'video'.  The subtype is more
 * specific, indicating the specific type of text, image, video, etc.  See:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 *
 * A number of common types are used in web development:
 *
 * mimeFromFilename('/User/Documents/readme.txt') --> returns 'text/plain'
 *
 * your mimefromfilename() function should support all of the following extensions
 * with and without the leading '.':
 *
 * - .html, .htm --> text/html
 * - .css --> text/css
 * - .js --> text/javascript
 * - .jpg, .jpeg --> image/jpeg
 * - .gif --> image/gif
 * - .bmp --> image/bmp
 * - .ico, .cur --> image/x-icon
 * - .png --> image/png
 * - .svg --> image/svg+xml
 * - .webp --> image/webp
 * - .mp3 --> audio/mp3
 * - .wav --> audio/wav
 * - .mp4 --> video/mp4
 * - .webm --> video/webm
 * - .json --> application/json
 * - .mpeg --> video/mpeg
 * - .csv --> text/csv
 * - .ttf --> font/ttf
 * - .woff --> font/woff
 * - .zip --> application/zip
 * - .avi --> video/x-msvideo
 *
 *
 * note: any other extension should use the `application/octet-stream` mime type,
 * to indicate that it is an unknown stream of bytes (e.g., binary file). you should
 * also use `application/octet-stream` if the file has no extension.
 *

 ******************************************************************************/

function mimeFromFilename(filename) {
  let [_, ext] = filename.split(".");
  let mime;

  switch (ext) {
    case "html":
    case "htm":
      mime = "text/html";
      break;

    case "css":
      mime = "text/css";
      break;

    case "js":
      mime = "text/javascript";
      break;

    case "jpg":
    case "jpeg":
      mime = "image/jpeg";
      break;

    case "gif":
      mime = "image/gif";
      break;

    case "bmp":
      mime = "image/bmp";
      break;

    case "ico":
    case "cur":
      mime = "image/x-icon";
      break;

    case "png":
      mime = "image/png";
      break;

    case "svg":
      mime = "image/svg-xml";
      break;

    case "webp":
      mime = "image/webp";
      break;

    case "mp3":
      mime = "audio/mp3";
      break;

    case "wav":
      mime = "audio/wav";
      break;

    case "mp4":
      mime = "video/mp4";
      break;

    case "webm":
      mime = "video/webm";
      break;

    case "json":
      mime = "application/json";
      break;

    case "mpeg":
      mime = "video/mpeg";
      break;

    case "csv":
      mime = "text/csv";
      break;

    case "ttf":
      mime = "font/csv";
      break;

    case "woff":
      mime = "font/woff";
      break;

    case "zip":
      mime = "application/zip";
      break;

    case "avi":
      mime = "video/x-msvideo";
      break;

    default:
      mime = "application/octet-stream";
      break;
  }

  return mime;
}

// console.log(mimeFromFilename("/user/documents/readme.html"));
// console.log(mimeFromFilename("/user/documents/readme.webp"));
// console.log(mimeFromFilename("/user/documents/readme"));
// console.log(mimeFromFilename("/user/documents/readme.exe"));

/*******************************************************************************
 * problem 8, part 1: generate license text and link from license code.
 *
 * images, videos, and other resources on the web are governed by copyright.
 * everything you find on the web is copyright to its creator automatically, and
 * you cannot reuse it unless you are granted a license to do so.
 *
 * different licenses exist to allow creators to share their work. for example,
 * the creative commons licenses are a popular way to allow people to reuse
 * copyright material, see https://creativecommons.org/licenses/.
 *
 * below is a list of license codes, and the associated license text explaining the code:
 *
 * cc-by: creative commons attribution license
 * cc-by-nc: creative commons attribution-noncommercial license
 * cc-by-sa: creative commons attribution-sharealike license
 * cc-by-nd: creative commons attribution-noderivs license
 * cc-by-nc-sa: creative commons attribution-noncommercial-sharealike license
 * cc-by-nc-nd: creative commons attribution-noncommercial-noderivs license
 *
 * note: any other licensecode should use the url https://choosealicense.com/no-permission/
 * and the explanation text, "all rights reserved"
 *
 * write a function, generatelicenselink(), which takes a license code, and returns
 * an html link to the appropriate license url, and including the explanation text.
 *
 * for example:
 *
 * generatelicenselink('cc-by-nc') should return the following html string:
 *
 * '<a href="https://creativecommons.org/licenses/by-nc/4.0/">creative commons attribution-noncommercial license</a>'
 *
 * the url is generated based on the license code:
 *
 * - remove the `cc-` prefix
 * - convert to lower case
 * - place formatted license code within url https://creativecommons.org/licenses/[...here]/4.0/
 *
 * your generatelicenselink() function should also accept an optional second argument,
 * `targetblank`.  if `targetblank` is true, add ` target="_blank"` to your link
 * so that the url opens in a blank tab/window.
 *
 * you can read more about html links at https://developer.mozilla.org/en-us/docs/web/html/element/a
 *
 ******************************************************************************/

function generateLicenseLink(licenseCode, targetBlank) {
  // created using this method rather than document.createElement('a')
  // since the other method doesn't run via nodejs
  let rule = /((CC)-(BY))(-(NC)?(SA)?(ND)?)?(-(ND)?(SA)?)?/g;
  let rule1 = /^(CC)-?/g;
  let rule2 = /(\w+)/g;

  if (!rule.test(licenseCode)) {
    let target = ` target="_blank"`;
    if (!targetBlank) target = "";
    let link = `<a href="https://choosealicense.com/no-permission/"${target}>All Rights Reserved</a>`;
    return link;
  }

  let code = licenseCode.replace(rule1, "").toLowerCase();
  let components = code.match(rule2);

  let textComps = [];

  components.forEach((component) => {
    textComps.push(getText(component));
  });

  function getText(component) {
    let result;

    switch (component) {
      case "by":
        result = "Attribution";
        break;
      case "nc":
        result = "NonCommercial";
        break;
      case "sa":
        result = "ShareAlike";
        break;
      case "nd":
        result = "NoDerivs";
        break;
      default:
        break;
    }

    return result;
  }

  let innerText = `Creative Commons ${textComps.join("-")} License`;
  let href = `https://creativecommons.org/licenses/${code}/4.0/`;
  let target = ` target="_blank"`;

  if (!targetBlank) target = "";

  let link = `<a href="${href}"${target}>${innerText}</a>`;
  return link;
}

// console.log(generateLicenseLink("CC-BY"));
// console.log(generateLicenseLink("CC"));
// console.log(generateLicenseLink("CC-BY-NC"));
// console.log(generateLicenseLink("CC-BY-SA", true));
// console.log(generateLicenseLink("CC-BY-ND"));
// console.log(generateLicenseLink("CC-BY-NC-SA", true));
// console.log(generateLicenseLink("CC-BY-NC-ND"));

/*******************************************************************************
 * Problem 9 Part 1: convert a value to a Boolean (true or false)
 *
 * A dataset contains fields that indicate a value is true or false.  However,
 * users have entered data in various formats and languages (English and French)
 * over the years, and the data is a mess. For example, the dataset contains all
 * of the following values:
 *
 * Yes, yes, YES, Y, Oui, oui, OUI, O, t, TRUE, true, True, vrai, V, VRAI, 1, 2, ...any positive number
 * No, no, NO, Non, non, NON, N, n, f, FALSE, false, False, FAUX, faux, Faux, 0, -1, -2, ...any negative number
 *
 * Write a function pureBool() which takes a String, Number, or Boolean,
 * and attempts to convert it into a pure Boolean value, according to these rules:
 *
 * 1. If the value is already a Boolean (true or false) return the value without conversion
 * 2. If the value is one of the "true" type values, return `true` (Boolean)
 * 3. If the value is one of the "false" type values, return `false` (Boolean)
 * 4. If the value is none of the "true" or "false" values, throw an error with the error
 * message, 'invalid value'.
 *
 ******************************************************************************/

function pureBool(value) {
  let result;

  if (typeof value === "boolean") {
    result = value;
  }

  if (typeof value === "number") {
    value > 0 ? (result = true) : (result = false);
  }

  if (typeof value === "string") {
    let rule1 = /[yovt]/g;
    let rule2 = /[nf]/g;

    if (rule1.test(value[0].toLowerCase())) {
      result = true;
    } else if (rule2.test(value[0].toLowerCase())) {
      result = false;
    } else {
      throw new Error(value + " is an invalid value");
    }
  }

  return result;
}

// eval to true
// console.log(pureBool(true));
// console.log(pureBool(10));
// console.log(pureBool("VRAI"));
// console.log(pureBool("oui"));
// console.log(pureBool("TRUE"));

// eval to false
// console.log(pureBool(false));
// console.log(pureBool(-38));
// console.log(pureBool("f"));
// console.log(pureBool("faux"));
// console.log(pureBool("NON"));
// console.log(pureBool("no"));

/*******************************************************************************
 * Problem 9 Part 2: checking for all True or all False values in a normalized list
 *
 * Using your pureBool() function above, create three new functions to check
 * if a list of arguments are all "true", partially "true", or all "false" values:
 *
 * every('Y', 'yes', 1) --> returns true
 * any('Y', 'no', 1) --> returns true
 * none('Y', 'invalid', 1) --> returns false
 *
 * Use try/catch syntax to avoid having your functions throw errors when pureBool()
 * throws on invalid data.
 ******************************************************************************/

function every(...values) {
  try {
    for (let i = 0; i < values.length; i++) {
      if (!pureBool(values[i])) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function any(...values) {
  try {
    for (let i = 0; i < values.length; i++) {
      if (pureBool(values[i])) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function none(...values) {
  try {
    for (let i = 0; i < values.length; i++) {
      if (pureBool(values[i])) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// console.log("1.", every("yes", "Y", 1, "vrai"));
// console.log("2.", every(true, -2, "y", "oui"));
// console.log("3.", every("SOMETHINGELSE", 1, "y", "oui"));
//
// console.log("4.", any("non", "F", 1, false));
// console.log("5.", any(false, -2, "NO", "faux"));
// console.log("6.", any(false, -2, "invalid", "faux"));
//
// console.log("7.", none("non", "F", 1, false));
// console.log("8.", none(false, -2, "NO", "faux"));
// console.log("9.", none(false, -2, "HELLO", "faux"));

/*******************************************************************************
 * Problem 10 - build a URL
 *
 * Querying the iNaturalist Web API (https://api.inaturalist.org/v2/observations)
 * for data involves formatting a URL in a particular way.  As we know might know, a URL can contain optional name=value pairs. For reference: read query strings on web :)
 *
 * For example:
 *
 *   https://www.store.com/search?q=dog includes q=dog
 *
 *   https://www.store.com?_encoding=UTF8&node=18521080011 includes
 *   both _encoding=UTF8 and also node=18521080011, separated by &
 *
 * We will write a buildUrl() function to build a URL for the iNaturalist API
 * based on arguments passed by the caller.
 *
 * The buildUrl() function accepts the following arguments:
 *
 * - query: a URI encoded search string, for example "butterfly" or "Horse-chestnut"
 * - order: a string indicating sort order, with possible values of `ascending` or `descending`
 * - count: a number from 1 to 50, indicating how many results to return per page
 * - license: a string indicating which items to return (e.g., which license they use). Possible
 *   values include: none, any, cc-by, cc-by-nc, cc-by-sa, cc-by-nd, cc-by-nc-sa, cc-by-nc-nd
 *
 * Write an implementation of buildUrl() that accepts arguments for all of the above
 * parameters, validates them (e.g., count must be between 1 and 50, etc), and returns
 * a properly formatted URL.
 *
 * For example:
 *
 * buildUrl('Monarch Butterfly', 'ascending', 25, 'cc-by') would return the following URL:
 *
 * https://api.inaturalist.org/v2/observations?query='Monarch%20Butterfly'&count=25&order=ascending&license=cc-by
 *
 * NOTE: if any of the values passed to buildUrl() are invalid, an Error should be thrown.
 *
 * NOTE: make sure you properly encode the query value, since URLs can't contain
 * spaces or other special characters. HINT: use the encodeURIComponent() function
 * to do this, see:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 *
 * The following might be the parameters
 *
 *  "query" the query to use. Must be properly URI encoded
 * "order" the sort order to use, must be one of `ascending` or `descending`
 * "count" the number of results per page, must be 1-50
 * "license" the license to use, must be one of none, any, cc-by, cc-by-nc, cc-by-sa, cc-by-nd, cc-by-nc-sa, cc-by-nc-nd
 *
 ******************************************************************************/

function buildUrl(query, order, count, license) {
  if (typeof query !== "string") {
    throw new Error("Must be a string");
  }

  if (order !== "ascending" && order !== "descending") {
    throw new Error("Order must be 'ascending' or 'descending'");
  }

  if (count < 1 || count > 50) {
    throw new Error("Count must be between 1 and 50");
  }

  const licenses = [
    "none",
    "any",
    "cc-by",
    "cc-by-nc",
    "cc-by-sa",
    "cc-by-nd",
    "cc-by-nc-sa",
    "cc-by-nc-nd",
  ];

  if (!licenses.includes(license)) {
    throw new Error("License must be a valid licence code, 'none', or 'any'");
  }

  let url0 = `https://api.inaturalist.org/v2/observations?`;
  let url1 = `query='${encodeURIComponent(query)}'`;
  let url2 = `&order=${order}`;
  let url3 = `&count=${count}`;
  let url4 = `&license=${license}`;

  let url = `${url0}${url1}${url2}${url3}${url4}`;
  return url;
}

// console.log(buildUrl("Monarch Butterfly", "ascending", 35, "cc-by"));
// console.log(buildUrl("otter", "descending", 50, "any"));
