def validate_register(data):
    if not data or 'username' not in data or 'password' not in data:
        return 'Missing username or password'
    if not data['username'].strip():
        return 'Username cannot be empty'
    if len(data['password']) < 6:
        return 'Password must be at least 6 characters'
    return None

def validate_task(data):
    if not data or 'title' not in data:
        return 'Title is required'
    if not data['title'].strip():
        return 'Title cannot be empty'
    return None
