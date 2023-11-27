import { CellContent } from "../Interfaces/ICellContent";
import { Parser } from "hot-formula-parser";
import { CellReference } from "./CellReference";
import { RangeExpression } from "./RangeExpression";
import { Spreadsheet } from "../Spreadsheet";

// create a parser object
const parser = new Parser();

// define a type for the result of the parser
type Parsed = number | string | boolean | null;

/*
 * CellContent that represents a formula.
 */
export class Formula implements CellContent {
 private parsed_val: Parsed; // the parsed result of the formula
 private val: string; // the formula in a string format
 private spreadsheet: Spreadsheet; // reference to the spreadsheet object where the formula exists

 /**
  * Constructor to initialize the formula with the given value.
  */
 public constructor(val: string, spreadsheet: Spreadsheet) {
  this.val = val; // the initial string that holds the formula
  this.parsed_val = null; // the result of the formula
  this.spreadsheet = spreadsheet; // the spreadshseet object where the formula exists
 }

 /**
  * Function to compute and replace range expressions and cell references in the formula
  * string.
  * @returns the formula string after the range expressions and cell references were replaced
  */
 private computeRangeExpressionsAndCellReferences(): string {
  let computedVal = this.val;

  // regular expression to match range expressions
  const rangeExpressionRegex = /SUM\([^)]+\)|AVERAGE\([^)]+\)/g;

  // regular expression to match cell references
  const cellReferenceRegex = /REF\([^)]+\)/g;

  // replace all range expressions with their computed values
  computedVal = computedVal.replace(rangeExpressionRegex, (match) => {
   const rangeExpression = new RangeExpression(match, this.spreadsheet);
   return rangeExpression.getContent();
  });

  // replace all cell references with their computed values
  computedVal = computedVal.replace(cellReferenceRegex, (match) => {
   const cellReference = new CellReference(match, this.spreadsheet);
   return cellReference.getContent();
  });

  // return the string after all range expressions and cell references where replaced
  return computedVal;
 }

 /**
  * Function to compute and replace range expressions and cell references in the formula
  * string.
  * @returns the formula string after the range expressions and cell references were replaced
  */
 private computeStringConcatenation(computedVal: string): void {
  // regular expression to match string concatenation (e.g., "a" + "b")
  const stringConcatenationRegex = /"([^"]+)" \+ "([^"]+)"/g;

  // replace all string concatenations with the CONCATENATE function that the parser recognizes
  computedVal = computedVal.replace(
   stringConcatenationRegex,
   (match, str1, str2) => {
    return `CONCATENATE('${str1}', '${str2}')`;
   }
  );
 }

 /**
  * Function that parses the formula and stores the result in parsed_val.
  */
 parse(): void {
  // replace all range expressions and cell references in the formula
  let computedVal = this.computeRangeExpressionsAndCellReferences();

  // handle string concatenation
  this.computeStringConcatenation(computedVal);

  // parse the computed formula (excluding the equal sign)
  let result = parser.parse(computedVal);

  // if the parsing fails, throw an error
  if (result.error) {
   throw new Error(result.error);
  }

  // store the parsed result
  this.parsed_val = result.result;
 }

 /**
  * Function that gets the parsed result of the formula.
  * @returns the parsed result of the formula
  */
 getResult(): Parsed {
  return this.parsed_val;
 }

 /*
  * Returns the content of the cell in string form (the result of the formula).
  */
 public getContent(): string {
  return this.parsed_val?.toString() || "";
 }

 /**
  * Function that gets the original formula string.
  * @returns the original formula string
  */
 public getContentString(): string {
  return this.val;
 }

 /*
  * Changes the value of the cell to the given newval argument.
  */
 public setContent(newval: string): void {
  this.val = newval;
 }
}
