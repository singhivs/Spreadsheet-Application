import { Cell } from "../model/Cell";
import { Spreadsheet } from "../model/Spreadsheet";
import { StringLiteral } from "../model/CellContent/StringLiteral";
import { DataRepresentation } from "../model/DataRepresentation";
import { NumericLiteral } from "../model/CellContent/NumericalLiteral";

describe("Data representation", (): void => {
  let spreadsheet: Spreadsheet;
  beforeEach((): void => {
    spreadsheet = new Spreadsheet([], 25, 25);
    spreadsheet.getCell(0, 0).setCellContent(new NumericLiteral("1"));
    spreadsheet.getCell(0, 1).setCellContent(new NumericLiteral("2"));
    spreadsheet.getCell(0, 3).setCellContent(new NumericLiteral("4"));
    spreadsheet.getCell(0, 4).setCellContent(new NumericLiteral("8"));
    spreadsheet.getCell(1, 0).setCellContent(new NumericLiteral("3"));
    spreadsheet.getCell(2, 0).setCellContent(new NumericLiteral("6"));
    spreadsheet.getCell(3, 0).setCellContent(new NumericLiteral("9"));
  });

  it("should get data vertically", (): void => {
    const dataRep = new DataRepresentation("A1", "E1", spreadsheet);
    expect(dataRep.getData()).toStrictEqual([1, 2, 4, 8]);
  });
  it("should get data horizontally", (): void => {
    const dataRep = new DataRepresentation("A1", "A4", spreadsheet);
    expect(dataRep.getData()).toStrictEqual([1, 3, 6, 9]);
  });
});
