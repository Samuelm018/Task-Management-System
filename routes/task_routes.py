from flask import Blueprint, request, jsonify
from database import db
from models.task import Task
from utils.jwt_utils import token_required
from utils.validators import validate_task

task_bp = Blueprint('tasks', __name__, url_prefix='/tasks')

@task_bp.route('', methods=['GET'])
@token_required
def get_tasks(current_user):
    tasks = Task.query.filter_by(user_id=current_user.id).all()
    return jsonify([task.to_dict() for task in tasks])

@task_bp.route('', methods=['POST'])
@token_required
def create_task(current_user):
    data = request.get_json()
    error = validate_task(data)
    if error:
        return jsonify({'error': error}), 400
    
    task = Task(title=data['title'], 
                description=data.get('description', ''),
                user_id=current_user.id)
    db.session.add(task)
    db.session.commit()
    
    return jsonify(task.to_dict()), 201

@task_bp.route('/<int:id>', methods=['PUT'])
@token_required
def update_task(current_user, id):
    task = Task.query.filter_by(id=id, user_id=current_user.id).first()
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    data = request.get_json()
    if 'title' in data:
        if not data['title'].strip():
            return jsonify({'error': 'Title cannot be empty'}), 400
        task.title = data['title']
    
    if 'description' in data:
        task.description = data['description']
        
    if 'status' in data:
        task.status = data['status']
        
    db.session.commit()
    return jsonify(task.to_dict())

@task_bp.route('/<int:id>', methods=['DELETE'])
@token_required
def delete_task(current_user, id):
    task = Task.query.filter_by(id=id, user_id=current_user.id).first()
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'})
