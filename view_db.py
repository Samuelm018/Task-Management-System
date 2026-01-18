from app import app, db
from models.user import User
from models.task import Task

def view_data():
    with app.app_context():
        print("\n=== USERS ===")
        users = User.query.all()
        if not users:
            print("No users found.")
        for u in users:
            print(f"ID: {u.id} | Username: {u.username}")

        print("\n=== TASKS ===")
        tasks = Task.query.all()
        if not tasks:
            print("No tasks found.")
        for t in tasks:
            print(f"ID: {t.id} | User: {t.user_id} | Title: {t.title} | Status: {t.status}")

if __name__ == "__main__":
    view_data()
