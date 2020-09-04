import { BigNumber } from "@ethersproject/bignumber";
import { MockContract } from "ethereum-waffle";
import { Signer } from "@ethersproject/abstract-signer";
import { waffle } from "@nomiclabs/buidler";

import FintrollerArtifact from "../../artifacts/Fintroller.json";
import RedemptionPoolArtifact from "../../artifacts/RedemptionPool.json";
import YTokenArtifact from "../../artifacts/YToken.json";

import { DefaultBlockGasLimit } from "./constants";
import { Fintroller } from "../../typechain/Fintroller";
import { RedemptionPool } from "../../typechain/RedemptionPool";
import { YToken } from "../../typechain/YToken";

import {
  deployStubCollateral,
  deployStubGuarantorPool,
  deployStubFintroller,
  deployStubOracle,
  deployStubRedemptionPool,
  deployStubYToken,
  deployStubUnderlying,
} from "./stubs";

const { deployContract } = waffle;

export async function fintrollerFixture(
  signers: Signer[],
): Promise<{ fintroller: Fintroller; oracle: MockContract; yToken: MockContract }> {
  const deployer: Signer = signers[0];
  const fintroller: Fintroller = ((await deployContract(signers[0], FintrollerArtifact, [])) as unknown) as Fintroller;
  const oracle: MockContract = await deployStubOracle(deployer);
  const yToken: MockContract = await deployStubYToken(deployer);
  return { fintroller, oracle, yToken };
}

export async function redemptionPoolFixture(
  signers: Signer[],
): Promise<{ redemptionPool: RedemptionPool; yToken: MockContract }> {
  const deployer: Signer = signers[0];
  const yToken: MockContract = await deployStubYToken(deployer);
  const redemptionPool: RedemptionPool = ((await deployContract(signers[0], RedemptionPoolArtifact, [
    yToken.address,
  ])) as unknown) as RedemptionPool;
  return { redemptionPool, yToken };
}

export async function yTokenFixture(
  signers: Signer[],
): Promise<{
  collateral: MockContract;
  fintroller: MockContract;
  guarantorPool: MockContract;
  oracle: MockContract;
  redemptionPool: MockContract;
  underlying: MockContract;
  yToken: YToken;
}> {
  const deployer: Signer = signers[0];

  /* TODO: handle the case when the oracle isn't set. */
  const fintroller: MockContract = await deployStubFintroller(deployer);
  const oracle: MockContract = await deployStubOracle(deployer);
  await fintroller.mock.oracle.returns(oracle.address);

  const underlying: MockContract = await deployStubUnderlying(deployer);
  const collateral: MockContract = await deployStubCollateral(deployer);
  const guarantorPool: MockContract = await deployStubGuarantorPool(deployer);
  const redemptionPool: MockContract = await deployStubRedemptionPool(deployer);

  const name: string = "DAI/ETH (2021-01-01)";
  const symbol: string = "yDAI-JAN21";
  const decimals: BigNumber = BigNumber.from(18);
  /* December 31, 2020 at 23:59:59 */
  const expirationTime: BigNumber = BigNumber.from(1609459199);

  const yToken: YToken = ((await deployContract(
    deployer,
    YTokenArtifact,
    [
      name,
      symbol,
      decimals,
      fintroller.address,
      underlying.address,
      collateral.address,
      guarantorPool.address,
      redemptionPool.address,
      expirationTime,
    ],
    { gasLimit: DefaultBlockGasLimit },
  )) as unknown) as YToken;

  return { collateral, fintroller, guarantorPool, oracle, redemptionPool, underlying, yToken };
}