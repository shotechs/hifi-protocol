import { expect } from "chai";

export default function shouldBehaveLikeFintrollerGetter(): void {
  it("retrieves the contract address of the fintroller", async function () {
    const fintroller = await this.yToken.fintroller();
    expect(fintroller).to.equal(this.fintroller.address);
  });
}
