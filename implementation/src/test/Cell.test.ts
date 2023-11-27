import { Cell } from "../model/Cell";
import { Spreadsheet } from "../model/Spreadsheet";
import { StringLiteral } from "../model/CellContent/StringLiteral";
import { CellContent } from "../model/Interfaces/ICellContent";

describe("Cell", (): void => {
  let spreadsheet: Spreadsheet;
  beforeEach((): void => {
    spreadsheet = new Spreadsheet([], 25, 25);
  });

  it("should set Content", (): void => {
    spreadsheet.getCell(0, 0).setCellContent(new StringLiteral("con"));
    expect(spreadsheet.getCell(0, 0).getCellContent().getContent()).toBe("con");
  });

  it("should clear Content", (): void => {
    spreadsheet.getCell(0, 0).setCellContent(new StringLiteral("con"));
    spreadsheet.getCell(0, 0).clear();
    expect(spreadsheet.getCell(0, 0).getCellContent().getContent()).toBe("");
  });
});
