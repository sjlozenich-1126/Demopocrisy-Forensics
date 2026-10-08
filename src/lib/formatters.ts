/**
 * Formats strings into publication-grade Title Case:
 * - Capitalizes the first letter of each word
 * - Keeps minor conjunctions/prepositions lowercase (unless first or last word)
 * - Preserves standard legal, medical, and procedural acronyms (RCW, SPOG, CSF, V2K, COVID, etc.)
 */
export function formatTitleCase(str: string): string {
  if (!str) return '';

  const minorWords = new Set([
    'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'in', 'of', 'over', 'with', 'into', 'vs', 'vs.'
  ]);

  const acronyms = new Set([
    'RCW', 'SPOG', 'CSF', 'V2K', 'COVID', 'COVID-19', 'PCR', 'WA', 'USA', 'U.S.', 'D.C.', 'SPD', 'SAO', 'FOH', 'FTA-ABS', 'VDRL', 'CrR', 'DOB', 'IV', 'BID', 'HMC', 'DSHS', 'OFMHS', 'FOIA'
  ]);

  const words = str.trim().split(/\s+/);

  return words.map((word, index) => {
    // Check if word matches known acronym
    const cleanWordUpper = word.replace(/[^a-zA-Z0-9-]/g, '').toUpperCase();
    if (acronyms.has(cleanWordUpper)) {
      const prefixMatch = word.match(/^([^a-zA-Z0-9-]*)/);
      const prefix = prefixMatch ? prefixMatch[1] : '';
      const punctuationMatch = word.match(/([^a-zA-Z0-9-]*)$/);
      const trailing = punctuationMatch ? punctuationMatch[1] : '';
      return prefix + cleanWordUpper + trailing;
    }

    // If word contains a hyphen (e.g. "Five-Year", "Single-Family")
    if (word.includes('-')) {
      return word.split('-').map((part, pIdx) => {
        if (!part) return part;
        if (pIdx > 0 && minorWords.has(part.toLowerCase())) {
          return part.toLowerCase();
        }
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      }).join('-');
    }

    if (word.toLowerCase() === 'w/o') {
      return 'w/o';
    }

    const lower = word.toLowerCase();
    // Minor word handling
    if (index !== 0 && index !== words.length - 1 && minorWords.has(lower)) {
      return lower;
    }

    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join(' ');
}
