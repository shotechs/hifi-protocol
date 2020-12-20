/* SPDX-License-Identifier: LGPL-3.0-or-later */
pragma solidity ^0.7.0;

/**
 * @title IChainlinkOperator
 * @author Mainframe
 * @notice Interface mainframe's Chainlink pricefeed operator.
 */
interface IChainlinkOperator {
    /**
     * @notice Get the official price for a symbol.
     * @param symbol The symbol to fetch the price of.
     * @return Price denominated in USD, with 8 decimals.
     */
    function price(string memory symbol) external view returns (uint256);
}
