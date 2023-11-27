const { expect } = require("chai");
import { Cell } from "../model/Cell";
import { NumericLiteral } from "../model/CellContent/NumericalLiteral";
import { RangeExpression } from "../model/CellContent/RangeExpression";
import { StringLiteral } from "../model/CellContent/StringLiteral";
import { Spreadsheet } from "../model/Spreadsheet";

describe("Range expression within spreadsheet", () => {
  it("should update a range expression when adding a row", () => {
    // Create a sample spreadsheet
    const cells = [
      [
        new Cell(new StringLiteral("A1"), 0, 0),
        new Cell(new StringLiteral("B1"), 0, 1),
      ],
      [
        new Cell(new StringLiteral("A2"), 1, 0),
        new Cell(new StringLiteral(""), 1, 1),
      ],
    ];
    const maxRow = 5;
    const maxCol = 5;
    const spreadsheet = new Spreadsheet(cells, maxRow, maxCol);

    // Update a cell with a range expression
    spreadsheet.setCell(1, 1, new RangeExpression("SUM(A1:B1)", spreadsheet));
    console.log(spreadsheet.getCell(1, 0));
    console.log(spreadsheet.getCell(1, 1));
    expect(spreadsheet.getCell(1, 1).getCellContent().getContent()).to.equal(
      "0"
    );

    // Update the spreadsheet by adding a row at index 1
    spreadsheet.addRow(1);
    console.log(spreadsheet.getCell(1, 0));
    console.log(spreadsheet.getCell(2, 1));

    // Verify that the range expression is updated correctly
    expect(spreadsheet.getCell(2, 1).getCellContent().getContent()).to.equal(
      "0"
    );
  });
});

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
