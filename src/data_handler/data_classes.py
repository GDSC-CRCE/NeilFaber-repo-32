import datetime
import sqlite3

database = "database.db"


class ProductsHandler:
    def __init__(self):
        self.conn = sqlite3.connect(database, check_same_thread=False)
        self.cursor = self.conn.cursor()
        self.name = "products"

    def create_table(self):
        sql = f"""CREATE TABLE IF NOT EXISTS {self.name} (
        product_id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        name TEXT,
        description TEXT,
        life_cycle TEXT,
        imageUrl TEXT,
        price INT,
        co2print REAL,
        envimp REAL
        )"""
        self.cursor.execute(sql)
        self.conn.commit()
        print("Products table created successfully.")

    def retrieve_data(self, category=None, name=None, id=None, co2print=None, envimp=None, ):
        sql = "SELECT * FROM products"
        where_clause = []
        values = []
        if category:
            where_clause.append("category = ?")
            values.append(category)
        if name:
            where_clause.append("name = ?")
            values.append(name)
        if id:
            where_clause.append("product_id = ?")
            values.append(id)
        if co2print:
            where_clause.append("co2print = ?")
            values.append(co2print)
        if envimp:
            where_clause.append("envimp = ?")
            values.append(envimp)

        if where_clause:
            sql += " WHERE " + " AND ".join(where_clause)
        self.cursor.execute(sql, tuple(values))
        rows = self.cursor.fetchall()
        return rows

    def retrieve_optional_data(self, category=None, name=None, id=None, co2print=None, envimp=None, ):
        sql = "SELECT * FROM products"
        where_clause = []
        values = []
        if category:
            where_clause.append("category = ?")
            values.append(category)
        if name:
            where_clause.append("name = ?")
            values.append(name)
        if id:
            where_clause.append("product_id = ?")
            values.append(id)
        if co2print:
            where_clause.append("co2print = ?")
            values.append(co2print)
        if envimp:
            where_clause.append("envimp = ?")
            values.append(envimp)

        if where_clause:
            sql += " WHERE " + " OR ".join(where_clause)
        self.cursor.execute(sql, tuple(values))
        rows = self.cursor.fetchall()
        return rows

    def create_data(self, category, name, description, life_cycle, imageUrl, price, co2print, envimp):
        sql = "INSERT INTO products (category, name, description, life_cycle, imageUrl,price, co2print, envimp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        values = (category, name, description, life_cycle,
                  imageUrl, price, co2print, envimp)
        self.cursor.execute(sql, values)
        self.conn.commit()
        print("Data inserted successfully.")

    def delete_data(self, category=None, name=None, id=None, co2print=None, envimp=None):
        sql = "DELETE FROM products"
        where_clause = []
        if category:
            where_clause.append("category = ?")
        if name:
            where_clause.append("name = ?")
        if id:
            where_clause.append("id = ?")
        if co2print:
            where_clause.append("co2print = ?")
        if envimp:
            where_clause.append("envimp = ?")

        if where_clause:
            sql += " WHERE " + " AND ".join(where_clause)

        values = (category, name, id, co2print, envimp)
        self.cursor.execute(sql, values)
        self.conn.commit()
        print("Data deleted successfully.")

    def update_data(self, product_id, category=None, name=None, description=None, life_cycle=None, imageUrl=None, price=None, co2print=None, envimp=None):
        sql = "UPDATE products SET"
        update_set = []
        if category:
            update_set.append("category = ?")
        if name:
            update_set.append("name = ?")
        if description:
            update_set.append("description = ?")
        if life_cycle:
            update_set.append("life_cycle = ?")
        if imageUrl:
            update_set.append("imageUrl = ?")
        if price:
            update_set.append("price = ?")
        if co2print:
            update_set.append("co2print = ?")
        if envimp:
            update_set.append("envimp = ?")

        if update_set:
            sql += " " + ", ".join(update_set) + " WHERE id = ?"

        values = (category, name, description, co2print,
                  imageUrl, envimp, product_id)
        self.cursor.execute(sql, values)
        self.conn.commit()
        print("Data updated successfully.")

    def close_connection(self):
        self.conn.close()


class UsersHandler:
    def __init__(self):
        self.conn = sqlite3.connect(database, check_same_thread=False)
        self.cursor = self.conn.cursor()

    # ... (other functions)

    def create_table(self):
        sql = """
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT,
                last_name TEXT,
                bonus INT,
                bio TEXT,
                phone TEXT,
                email TEXT,
                image BLOB,
                password TEXT,
                shipping_address TEXT,
                dob DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """
        self.cursor.execute(sql)
        self.conn.commit()
        print("Users table created successfully.")

    def create_user(self, first_name, last_name, bio, phone, email, image, password, shipping_address, dob):
        created_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        sql = """
            INSERT INTO users (first_name, last_name, bonus, bio, phone, email, image, password, shipping_address, dob, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        values = (first_name, last_name, 0, bio, phone, email, image,
                  password, shipping_address, dob, created_at)
        self.cursor.execute(sql, values)
        self.conn.commit()
        print("User created successfully.")

    def retrieve_user(self, user_id=None, first_name=None, last_name=None, password=None, email=None, phone=None):
        sql = "SELECT * FROM users"
        where_clause = []
        values = []
        if user_id:
            where_clause.append("user_id = ?")
            values.append(user_id)
        if first_name:
            where_clause.append("first_name = ?")
            values.append(first_name)
        if first_name:
            where_clause.append("first_name = ?")
            values.append(first_name)
        if last_name:
            where_clause.append("last_name = ?")
            values.append(last_name)
        if password:
            where_clause.append("password = ?")
            values.append(password)
        if email:
            where_clause.append("email = ?")
            values.append(email)
        if phone:
            where_clause.append("phone = ?")
            values.append(phone)

        if where_clause:
            sql += " WHERE " + " AND ".join(where_clause)

        self.cursor.execute(sql, values)
        user_data = self.cursor.fetchone()
        if user_data:
            return user_data
        else:
            return None

    def update_user(self, user_id, first_name=None, bonus=None, last_name=None, bio=None, phone=None, email=None, image=None, password=None, shipping_address=None, dob=None):
        sql = "UPDATE users SET"
        update_set = []
        if first_name:
            update_set.append("first_name = ?")
        if last_name:
            update_set.append("last_name = ?")
        if bonus:
            update_set.append("bonus = ?")
        if bio:
            update_set.append("bio = ?")
        if phone:
            update_set.append("phone = ?")
        if email:
            update_set.append("email = ?")
        if image:
            update_set.append("image = ?")
        if password:
            update_set.append("password = ?")
        if shipping_address:
            update_set.append("shipping_address = ?")
        if dob:
            update_set.append("dob = ?")

        if update_set:
            sql += " " + ", ".join(update_set) + " WHERE user_id = ?"

        values = (first_name, last_name, bonus, bio, phone, email,
                  image, password, shipping_address, dob, user_id)
        self.cursor.execute(sql, values)
        self.conn.commit()
        print("User updated successfully.")

    def delete_user(self, user_id):
        sql = "DELETE FROM users WHERE user_id = ?"
        self.cursor.execute(sql, (user_id,))
        self.conn.commit()
        print("User deleted successfully.")


def createDataBase():
    ProductsHandler().create_table()
    UsersHandler().create_table()
