import { expect } from "chai";

export default function shouldBehaveLikeGetGuarantorPool(): void {
  it("retrieves the contract address of the guarantor pool", async function () {
    const guarantorPool = await this.yToken.guarantorPool();
    expect(guarantorPool).to.equal(this.guarantorPool.address);
  });
}
