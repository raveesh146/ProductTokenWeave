#![no_std]
#![no_main]

use stylus_sdk::{
    alloy_primitives::U256,
    prelude::*,
    storage::{StorageMap, StorageType},
};

#[derive(Default, StorageType)]
pub struct ProductDetails {
    pub name: String,
    pub category: String,
    pub description: String,
}

#[storage]
pub struct ProductToken {
    product_metadata: StorageMap<U256, ProductDetails>,
    balances: StorageMap<U256, StorageMap<Address, u64>>,
}

#[external]
impl ProductToken {
    pub fn new() -> Self {
        Self {
            product_metadata: StorageMap::default(),
            balances: StorageMap::default(),
        }
    }

    pub fn mint(&mut self, token_id: U256, to: Address, amount: u64, details: ProductDetails) {
        self.product_metadata.insert(token_id, details);
        let mut balances = self.balances.entry(token_id).or_default();
        *balances.entry(to).or_insert(0) += amount;
        stylus_sdk::msg::emit("TokenMinted", (token_id, to, amount));
    }

    pub fn balance_of(&self, account: Address, token_id: U256) -> u64 {
        self.balances.get(token_id).and_then(|b| b.get(&account)).unwrap_or(0)
    }

    pub fn transfer(&mut self, from: Address, to: Address, token_id: U256, amount: u64) {
        let balances = self.balances.get_mut(token_id).expect("Token ID not found");
        let sender_balance = balances.get_mut(&from).expect("Sender has no tokens");
        assert!(*sender_balance >= amount, "Insufficient balance");

        *sender_balance -= amount;
        *balances.entry(to).or_insert(0) += amount;

        stylus_sdk::msg::emit("TokenTransferred", (from, to, token_id, amount));
    }
}
