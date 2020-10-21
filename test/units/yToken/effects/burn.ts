import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";

import { YTokenErrors } from "../../../../helpers/errors";
import { TokenAmounts } from "../../../../helpers/constants";

export default function shouldBehaveLikeSetVaultDebt(): void {
  const burnAmount: BigNumber = TokenAmounts.OneHundred;

  describe("when the caller is not the yToken contract", function () {
    it("reverts", async function () {
      await expect(
        this.contracts.yToken.connect(this.signers.raider).burn(this.accounts.borrower, burnAmount),
      ).to.be.revertedWith(YTokenErrors.BurnNotAuthorized);
    });
  });
}