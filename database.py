import sqlite3

class Database:
    def __init__(self):
        self.conn = sqlite3.connect("contract_farming.db", check_same_thread=False)
        self.create_tables()

    def create_tables(self):
        with self.conn:
            self.conn.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT UNIQUE,
                    role TEXT CHECK(role IN ('farmer', 'buyer'))
                )
            """)
            self.conn.execute("""
                CREATE TABLE IF NOT EXISTS contracts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    farmer_id INTEGER,
                    buyer_id INTEGER,
                    crop TEXT,
                    price TEXT,
                    FOREIGN KEY (farmer_id) REFERENCES users(id),
                    FOREIGN KEY (buyer_id) REFERENCES users(id)
                )
            """)

    def add_user(self, name, role):
        try:
            with self.conn:
                self.conn.execute("INSERT INTO users (name, role) VALUES (?, ?)", (name, role))
                print(f"{name} registered as {role}.")
        except sqlite3.IntegrityError:
            print(f"User '{name}' already exists.")

    def get_user_id(self, name, role):
        cur = self.conn.cursor()
        cur.execute("SELECT id FROM users WHERE name = ? AND role = ?", (name, role))
        result = cur.fetchone()
        return result[0] if result else None

    def add_contract(self, farmer, buyer, crop, price):
        farmer_id = self.get_user_id(farmer, "farmer")
        buyer_id = self.get_user_id(buyer, "buyer")

        if not farmer_id:
            print("Farmer not found!")
            return
        if not buyer_id:
            print("Buyer not found!")
            return

        with self.conn:
            self.conn.execute("INSERT INTO contracts (farmer_id, buyer_id, crop, price) VALUES (?, ?, ?, ?)", 
                             (farmer_id, buyer_id, crop, price))
            print(f"Contract created: {farmer} sells {crop} to {buyer} at {price}.")

    def get_contracts(self):
        cur = self.conn.cursor()
        cur.execute("""
            SELECT users1.name AS farmer, users2.name AS buyer, contracts.crop, contracts.price 
            FROM contracts
            JOIN users AS users1 ON contracts.farmer_id = users1.id
            JOIN users AS users2 ON contracts.buyer_id = users2.id
        """)
        return cur.fetchall()
