# Ethereum Block Explorer

**Description:**

The Ethereum Block Explorer is a web application designed to explore and interact with the Ethereum blockchain. This tool provides users with access to Ethereum's latest block information, transaction details, and account balance lookup functionality.

**Usage:**

To start the application, follow these steps:

1. Install dependencies:
   
   ```shell
   pnpm install
   ```

2. Run the application in development mode:

   ```shell
   pnpm run dev
   ```

Upon loading, the Ethereum Block Explorer retrieves information about the latest block from the Ethereum Mainnet and displays its details.

**Features:**

- **Latest Block Information:** The application automatically fetches and displays information about the latest block on the Ethereum Mainnet upon loading.

- **Get Transactions:** Users can click the "Get Transactions" button to retrieve details about all the transactions within the currently loaded block.

- **Get New Block:** Clicking the "Get New Block" button allows users to fetch and display information about the most recent block on the Ethereum Mainnet.

- **Account Balance Lookup:** The search bar on the right side of the application provides the capability to look up the balance (in WEI) of any Ethereum account.

**TODO:**

- [ ] **Enhance User Interface:** Improve the user interface for a more intuitive and visually appealing experience.

- [ ] **Explore Multiple Blocks:** Extend the application's capabilities to explore multiple blocks and transactions, not just the latest one.

- [ ] **Search by Transaction:** Implement the ability to search for specific transactions based on criteria such as sender, recipient, or transaction hash.

- [ ] **Display Token Balances:** Include the ability to view token balances associated with Ethereum accounts.

- [ ] **Error Handling:** Enhance error handling to gracefully handle network issues or API-related errors.

The Ethereum Block Explorer project provides a useful tool for Ethereum blockchain enthusiasts to explore the latest block, transactions, and account balances. Further development and feature additions can make it even more versatile and informative for users interested in Ethereum blockchain data.
