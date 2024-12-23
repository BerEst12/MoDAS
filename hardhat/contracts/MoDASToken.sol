// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MoDASToken is ERC20, Ownable {
    uint256 public maxSupply = 10000000 * 10 ** decimals(); // 10 millones max
    uint256 public maxTxAmount;
    mapping(address => bool) public isExcludedFromLimit;
    mapping(address => uint256) public lockedUntil;
    
    constructor(address initialOwner) 
        ERC20("MoDAS Token", "MODAS") 
        Ownable(initialOwner)
    {
        isExcludedFromLimit[msg.sender] = true;
        _mint(msg.sender, 1000000 * 10 ** decimals());
        maxTxAmount = totalSupply() / 100; // 1% del suministro total
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= maxSupply, "Excede suministro maximo");
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    function setMaxTxAmount(uint256 amount) public onlyOwner {
        maxTxAmount = amount;
    }
    
    function excludeFromLimit(address account, bool excluded) public onlyOwner {
        isExcludedFromLimit[account] = excluded;
    }
    
    function lockTokens(address account, uint256 unlockTime) public onlyOwner {
        require(unlockTime > block.timestamp, "Tiempo de desbloqueo invalido");
        lockedUntil[account] = unlockTime;
    }
    
    function _update(address from, address to, uint256 amount)
        internal
        virtual
        override
    {
        if (from != address(0)) { // Skip checks for minting
            require(block.timestamp >= lockedUntil[from], "Tokens bloqueados");
            if (!isExcludedFromLimit[from] && !isExcludedFromLimit[to]) {
                require(amount <= maxTxAmount, "Transferencia excede limite maximo");
            }
        }
        super._update(from, to, amount);
    }
} 