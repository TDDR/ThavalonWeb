use lazy_static::lazy_static;
use mongodb::{options::ClientOptions, Client, Database};
use std::sync::RwLock;

mod accounts;
pub use self::accounts::*;

const MONGO_HOST: &str = "mongodb://admin:secret@database:27017";
const THAVALON_DB: &str = "thavalon_db";

lazy_static! {
    static ref CLIENT_MANAGER: MongoClientManager = MongoClientManager::new();
}

/// Manages a MongoDB connection so we can share one connection.
/// Lazily initializes the connection the first time it's needed.
struct MongoClientManager {
    client: RwLock<Option<Client>>,
}

impl MongoClientManager {
    /// Creates a new uninitialized MongoClientMananger.
    fn new() -> MongoClientManager {
        MongoClientManager {
            client: RwLock::new(None),
        }
    }

    /// Creates a new MongoDB connection and stores it for future use.
    async fn init(&self) {
        let client_options = ClientOptions::parse(MONGO_HOST).await.unwrap();
        let client =
            Client::with_options(client_options).expect("Failed to create a MongoDB client.");
        let mut locked_client = self
            .client
            .write()
            .expect("Failed to initialize the Mongo Client Manager.");
        locked_client.replace(client);
    }

    /// Gets a MongoDB database using the existing client. Creates a client if needed.
    ///
    /// # Arguments
    ///
    /// * `database_name` - Name of the MongoDB database to fetch.
    ///
    /// # Returns
    ///
    /// * A `Database` to the specified MongoDB database
    async fn get_database(&self, database_name: &str) -> Database {
        let is_initialized;
        {
            is_initialized = self
                .client
                .read()
                .expect("Could not acquire a read lock for the Mongo connection.")
                .is_some();
        }
        if !is_initialized {
            self.init().await;
        }
        let locked_client = self
            .client
            .read()
            .expect("Could not acquire a read lock for the Mongo connection.");
        locked_client.as_ref().unwrap().database(database_name)
    }
}

/// Gets a MongoDB client connection.
/// Since the database is on the same cluster (?), failing here should cause a crash.
async fn get_db_client() -> Database {
    CLIENT_MANAGER.get_database(THAVALON_DB).await
}
