# eTokenDividendCalculator

## Overview
eToken Dividend Calculator which outputs a list of eCash addresses that are holding the specified eToken and their eligible dividend based on the chosen distribution ratio.
* **eToken ID** refers to the ID of the token you want to look up
* **Total XEC For Distribution** refers to how much XEC you want to airdrop in total
* **XEC Distribution ratio** refers to whether you want each token holder to receive an amount of XEC based on how many of your tokens they hold (pro rata), or evenly across everyone (equal)
* **Block Height Cutoff** refers to the block height where the eligible recipients will end.

## Instructions

1. Fill in the eToken ID, total XEC dividend and distribution ratio
2. If you simply want the latest block height, just grab from the [Bitcoin ABC Explorer](https://explorer.bitcoinabc.org)
3. Click on Generate Recipients, this will take up to 15 seconds to query the blockchain
4. When the results are displayed, click on Copy To Clipboard to copy results to memory
![](https://github.com/ethanmackie/eTokenDividendCalculator/blob/main/img/screenshot.PNG)

5. Open your ElectrumABC wallet and goto Tools -> Pay To Many
![](https://github.com/ethanmackie/eTokenDividendCalculator/blob/main/img/screenshot2.PNG)

6. Paste the results from clipboard into the Pay To field
7. Double check the total amount to be sent and click Send to execute dividend distribution.
![](https://github.com/ethanmackie/eTokenDividendCalculator/blob/main/img/screenshot3.png)
