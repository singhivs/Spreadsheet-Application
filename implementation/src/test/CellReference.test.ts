import { Cell } from "../model/Cell";
import { Spreadsheet } from "../model/Spreadsheet";
import { StringLiteral } from "../model/CellContent/StringLiteral";
import { CellContent } from "../model/Interfaces/ICellContent";
import { CellReference } from "../model/CellContent/CellReference";
import { NumericLiteral } from "../model/CellContent/NumericalLiteral";

describe("Cell reference", (): void => {
  let spreadsheet: Spreadsheet;
  beforeEach((): void => {
    spreadsheet = new Spreadsheet([], 25, 25);
  });

  it("should set cell to cell reference to A1", (): void => {
    spreadsheet.getCell(0, 0).setCellContent(new StringLiteral("a"));
    spreadsheet
      .getCell(0, 2)
      .setCellContent(new CellReference("REF(A1)", spreadsheet));
    expect(spreadsheet.getCell(0, 2).getCellContent().getContent()).toBe("a");
  });

  it("should set cell to cell reference to an empty cell", (): void => {
    spreadsheet
      .getCell(0, 0)
      .setCellContent(new CellReference("REF(A3)", spreadsheet));
    spreadsheet.getCell(0, 0).clear();
    expect(spreadsheet.getCell(0, 0).getCellContent().getContent()).toBe("");
  });

  it("should return the initial user input for the cell reference", (): void => {
    spreadsheet.getCell(0, 1).setCellContent(new NumericLiteral("2"));
    spreadsheet
      .getCell(0, 0)
      .setCellContent(new CellReference("REF(B1)", spreadsheet));
    expect(spreadsheet.getCell(0, 0).getCellContent().getContentString()).toBe(
      "REF(B1)"
    );
  });
});
