import { Option } from "./interfaces";

/**
 * A collection of string matching algorithms built with React Select in mind.
 */

// Option type from React Select and similar libraries.
type MapOfStrings = { [key: string]: string };

/**
 * Filters React Select options and sorts by similarity to a search filter.
 * Handles partial matches, eg. searching for "Waberg High" will find "Raoul
 * Wallenberg Traditional High School". Case insensitive. Ignores
 * non-alphanumeric characters.
 *
 * @param  options  An unfiltered list of Options.
 * @param? filter  A string to compare against Option labels.
 * @param? substitutions  Strings with multiple spellings or variations that we
 *           expect to match, eg. accented characters or abbreviated words.
 *
 * @return A filtered and sorted array of Options.
 */
export function filterOptions(
  options: Option[],
  filter?: string,
  substitutions?: MapOfStrings
): Option[] {
  // If the filter is blank, return the full list of Options.
  if (!filter) {
    return options;
  }

  const cleanFilter = cleanUpText(filter, substitutions);
  return (
    options
      // Filter out undefined or null Options.
      .filter(({ label, value }) => label != null && value != null)
      // Create a {score, Option} pair for each Option based on its label's
      // similarity to the filter text.
      .map((option) => ({
        option: option,
        score: typeaheadSimilarity(
          cleanUpText(option.label, substitutions),
          cleanFilter
        ),
      }))
      // Only include matches of the entire substring, with a slight
      // affordance for transposition or extra characters.
      .filter((pair) => pair.score >= cleanFilter.length - 2)
      // Sort 'em by order of their score.
      .sort((a, b) => b.score - a.score)
      // …and grab the original Options back from their pairs.
      .map((pair) => pair.option)
  );
}

/**
 * Scores the similarity between two strings by returning the length of the
 * longest common subsequence. Intended for comparing strings of different
 * lengths; eg. when matching a typeahead search input with a school name.

 * Meant for use in an instant search box where results are being fetched
 * as a user is typing.
 *
 * @param  a  The longer string (though, we flip them if it's shorter).
 * @param  b  The shorter string, eg. a typeahead search input.
 *
 * @return The length of the longest common subsequence. Higher scores indicate
 *           closer matches.
 */
export function typeaheadSimilarity(a: string, b: string): number {
  const aLength = a.length;
  const bLength = b.length;
  const table: any[] = [];

  if (!aLength || !bLength) {
    return 0;
  }

  // Ensure `a` isn't shorter than `b`.
  if (aLength < bLength) {
    [a, b] = [b, a];
  }

  // Early exit if `a` includes `b`; these will be scored higher than any
  // other options with the same `b` (filter string), with a preference for
  // shorter `a` strings (option labels).
  if (a.indexOf(b) !== -1) {
    return bLength + 1 / aLength;
  }

  // Initialize the table axes:
  //
  //    0 0 0 0 ... bLength
  //    0
  //    0
  //
  //   ...
  //
  // aLength
  //
  for (let x = 0; x <= aLength; ++x) {
    table[x] = [0];
  }
  for (let y = 0; y <= bLength; ++y) {
    table[0][y] = 0;
  }

  // Populate the rest of the table with a dynamic programming algorithm.
  for (let x = 1; x <= aLength; ++x) {
    for (let y = 1; y <= bLength; ++y) {
      table[x][y] =
        a[x - 1] === b[y - 1]
          ? 1 + table[x - 1][y - 1]
          : Math.max(table[x][y - 1], table[x - 1][y]);
    }
  }

  return table[aLength][bLength];
}

/**
 * Apply string substitutions, remove non-alphanumeric characters, and convert
 * all letters to uppercase.
 *
 * eg. 'Scoil Bhríde Primary School' may become 'SCOILBHRIDEPRIMARYSCHOOL'.
 *
 * @param  input  An unsanitized input string.
 * @param  substitutions  Strings with multiple spellings or variations that we
 *          expect to match, for example accented characters or abbreviated
 *          words.
 *
 * @return The sanitized text.
 */
export function cleanUpText(
  input?: string,
  substitutions?: MapOfStrings
): string {
  if (!input) {
    return "";
  }

  // Uppercase and remove all non-alphanumeric, non-accented characters.
  // Also remove underscores.
  input = input.toUpperCase().replace(/((?=[^\u00E0-\u00FC])\W)|_/g, "");

  if (!substitutions) {
    return input;
  }
  const safeSubstitutions: MapOfStrings = substitutions; // For Flow.

  // Replace all strings in `safeSubstitutions` with their standardized
  // counterparts.
  return Object.keys(safeSubstitutions).reduce((output, substitution) => {
    const unsubbed = new RegExp(substitution, "g");
    return output.replace(unsubbed, safeSubstitutions[substitution]);
  }, input);
}
