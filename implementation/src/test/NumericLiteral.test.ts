import { Cell } from "../model/Cell";
import { Spreadsheet } from "../model/Spreadsheet";
import { NumericLiteral } from "../model/CellContent/NumericalLiteral";

describe("Numeric Literal", (): void => {
  let spreadsheet: Spreadsheet;
  beforeEach((): void => {
    spreadsheet = new Spreadsheet([], 25, 25);
  });

  it("should get number", (): void => {
    spreadsheet.getCell(0, 0).setCellContent(new NumericLiteral("12"));
    expect(spreadsheet.getCell(0, 0).getCellContent().getContent()).toBe("12");
  });
});
