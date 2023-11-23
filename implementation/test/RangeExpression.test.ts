import { Spreadsheet } from "../src/model/Spreadsheet";
import { RangeExpression } from "../src/model/CellContent/RangeExpression";
import { NumericLiteral } from "../src/model/CellContent/NumericalLiteral";
import { expect } from "chai";

describe("RangeExpression", () => {
  it("should construct a RangeExpression instance", () => {
    const spreadsheet = new Spreadsheet([], 10, 10);
    const rangeExpression = new RangeExpression("SUM(A1:B2)", spreadsheet);

    expect(rangeExpression).to.be.an.instanceOf(RangeExpression);
  });

  it("should throw an error for an invalid cell reference", () => {
    const spreadsheet = new Spreadsheet([], 10, 10);

    // Invalid cell reference
    const invalidRange = "SUM(InvalidCell)";
    expect(() =>
      new RangeExpression(invalidRange, spreadsheet).getContent()
    ).to.throw("Invalid cell reference.");
  });

  it("should evaluate the SUM function correctly", () => {
    const spreadsheet = new Spreadsheet([], 10, 10);

    // Create cells with values for testing
    spreadsheet.setCell(0, 0, new NumericLiteral("2"));
    spreadsheet.setCell(1, 0, new NumericLiteral("3"));
    spreadsheet.setCell(0, 1, new NumericLiteral("4"));
    spreadsheet.setCell(1, 1, new NumericLiteral("5"));

    const rangeExpression = new RangeExpression("SUM(A1:B2)", spreadsheet);
    const result = rangeExpression.getContent();

    expect(result).to.equal("14");
  });

  it("should evaluate the AVERAGE function correctly", () => {
    const spreadsheet = new Spreadsheet([], 10, 10);

    // Create cells with values for testing
    spreadsheet.setCell(0, 0, new NumericLiteral("2"));
    spreadsheet.setCell(1, 0, new NumericLiteral("3"));
    spreadsheet.setCell(0, 1, new NumericLiteral("4"));
    spreadsheet.setCell(1, 1, new NumericLiteral("5"));

    const rangeExpression = new RangeExpression("AVERAGE(A1:B2)", spreadsheet);
    const result = rangeExpression.getContent();

    expect(result).to.equal("3.5");
  });

  it("should handle an unsupported operation", () => {
    const spreadsheet = new Spreadsheet([], 10, 10);

    // Unsupported operation
    const unsupportedOperation = "MAX(A1:B2)";
    const rangeExpression = new RangeExpression(
      unsupportedOperation,
      spreadsheet
    );

    expect(() => rangeExpression.getContent()).to.throw(
      "Unsupported operation."
    );
  });

  it("should evaluate the AVERAGE function correctly", () => {
    const spreadsheet = new Spreadsheet([], 10, 10);

    // Create cells with values for testing
    spreadsheet.setCell(0, 0, new NumericLiteral("1"));
    spreadsheet.setCell(1, 0, new NumericLiteral("2"));
    spreadsheet.setCell(0, 1, new NumericLiteral("3"));
    spreadsheet.setCell(1, 1, new NumericLiteral("4"));

    const rangeExpression = new RangeExpression("AVERAGE(A1:B2)", spreadsheet);
    const result = rangeExpression.getContent();
    expect(result).to.equal("2.5");
  });
});
