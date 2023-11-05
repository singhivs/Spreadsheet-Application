import { Cell } from "./Cell";
import { RangeExpression } from "./model/CellContent/RangeExpression";
import { StringLiteral } from "./model/CellContent/StringLiteral";
import { CellContent } from "./model/Interfaces/ICellContent";
import { Spreadsheet } from "./SpreadSheet";


describe('Spreadsheet setcell Functionality', () => {
  let spreadsheet: Spreadsheet;

  beforeEach(() => {
    // Setup  spreadsheet with some initial data for each test
    spreadsheet = new Spreadsheet(5, 5);
  });

  it('should set the content of a cell', () => {
    const row = 0;
    const col = 0;
    const content: CellContent = new StringLiteral('Test Content');

    spreadsheet.setCell(row, col, content);

    // Retrieve the cell and check if its content matches the set value
    const cell = spreadsheet.getCell(row, col);
    expect(cell.getCellContent()).toBe(content);
  });

  // it('should update range expressions when adding a row', () => {
  //   // Set content with a range expression in a cell
  //   const row = 0;
  //   const col = 0;
  //   const rangeExpression: CellContent = new RangeExpression('SUM(A1:B2)', spreadsheet);
  //   spreadsheet.setCell(row, col, rangeExpression);
  
  //   // Add a new row at index 1
  //   spreadsheet.addRow(1);

  //   console.log(spreadsheet)

  //   // Check if the range expression is updated in the cell
  //   const updatedCell = spreadsheet.getCell(0, 0);
  //   expect(updatedCell.getCellContent()).toBeInstanceOf(RangeExpression);
  //   expect(updatedCell.getCellContent()).toBe('A2:B3'); // Update this expectation as per your implementation
  // });
});

