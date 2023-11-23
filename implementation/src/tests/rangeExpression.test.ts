const { expect } = require("chai");
import { Cell } from "../model/Cell";
import { RangeExpression } from "../model/CellContent/RangeExpression";
import { StringLiteral } from "../model/CellContent/StringLiteral";
import { Spreadsheet } from "../model/Spreadsheet";

// Import the Spreadsheet class (assuming it's exported from './Spreadsheet')

describe("Spreadsheet", () => {
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

    // // Retrieve the updated range expression from the cell
    // const updatedContent = spreadsheet.getContent(spreadsheet.getCell(1, 0));

    // Verify that the range expression is updated correctly
    expect(spreadsheet.getCell(2, 1).getCellContent().getContent()).to.equal(
      "0"
    );
  });

  // Add more test cases for the updateRangeExpression method
});
