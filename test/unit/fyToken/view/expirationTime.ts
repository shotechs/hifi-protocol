import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";

import { fyTokenConstants } from "../../../../helpers/constants";

export default function shouldBehaveLikeGetExpirationTime(): void {
  it("retrieves the expiration time", async function () {
    const expirationTime: BigNumber = await this.contracts.fyToken.expirationTime();
    expect(expirationTime).to.equal(fyTokenConstants.expirationTime);
  });
}
