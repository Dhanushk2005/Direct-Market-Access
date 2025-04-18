from database import Database

class ContractFarmingPlatform:
    def __init__(self):
        self.db = Database()

    def register_user(self, name, role):
        self.db.add_user(name, role)

    def create_contract(self, farmer, buyer, crop, price):
        self.db.add_contract(farmer, buyer, crop, price)

    def view_contracts(self):
        return self.db.get_contracts()
