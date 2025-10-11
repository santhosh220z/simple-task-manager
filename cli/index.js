#!/usr/bin/env node

// Simple Task Manager CLI
// Minimal, import-free Node.js implementation

const fs = require('fs');
const path = require('path');

// Basic argument parsing
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log('Simple Task Manager CLI');
  console.log('Usage: stm <command> [options]');
  console.log('Commands: add, list, remove, export, import');
  process.exit(0);
}

switch (command) {
  case 'add':
    const task = args.slice(1).join(' ');
    if (!task) {
      console.log('Usage: stm add <task description>');
      process.exit(1);
    }
    addTask(task);
    break;
  case 'list':
    listTasks();
    break;
  case 'remove':
    const id = args[1];
    if (!id) {
      console.log('Usage: stm remove <id>');
      process.exit(1);
    }
    removeTask(id);
    break;
  case 'export':
    const format = args[1] || 'json';
    exportTasks(format);
    break;
  case 'import':
    const file = args[1];
    if (!file) {
      console.log('Usage: stm import <file>');
      process.exit(1);
    }
    importTasks(file);
    break;
  default:
    console.log('Unknown command:', command);
    process.exit(1);
}

// Simple in-memory storage (replace with DB later)
let tasks = [];
const tasksFile = path.join(__dirname, '..', 'tasks.json');

function loadTasks() {
  if (fs.existsSync(tasksFile)) {
    tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
  }
}

function saveTasks() {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

function addTask(description) {
  loadTasks();
  const id = tasks.length + 1;
  tasks.push({ id, description, done: false });
  saveTasks();
  console.log(`Task added: ${description}`);
}

function listTasks() {
  loadTasks();
  if (tasks.length === 0) {
    console.log('No tasks found.');
    return;
  }
  tasks.forEach(task => {
    console.log(`${task.id}. [${task.done ? 'x' : ' '}] ${task.description}`);
  });
}

function removeTask(id) {
  loadTasks();
  const index = tasks.findIndex(t => t.id == id);
  if (index === -1) {
    console.log('Task not found.');
    return;
  }
  const removed = tasks.splice(index, 1);
  saveTasks();
  console.log(`Task removed: ${removed[0].description}`);
}

function exportTasks(format) {
  loadTasks();
  if (format === 'json') {
    console.log(JSON.stringify(tasks, null, 2));
  } else if (format === 'csv') {
    console.log('id,description,done');
    tasks.forEach(task => {
      console.log(`${task.id},"${task.description}",${task.done}`);
    });
  } else {
    console.log('Unsupported format. Use json or csv.');
  }
}

function importTasks(file) {
  if (!fs.existsSync(file)) {
    console.log('File not found.');
    return;
  }
  const data = fs.readFileSync(file, 'utf8');
  try {
    if (file.endsWith('.json')) {
      tasks = JSON.parse(data);
    } else if (file.endsWith('.csv')) {
      // Simple CSV parse
      const lines = data.split('\n').slice(1);
      tasks = lines.map(line => {
        const [id, description, done] = line.split(',');
        return { id: parseInt(id), description: description.replace(/"/g, ''), done: done === 'true' };
      });
    }
    saveTasks();
    console.log('Tasks imported.');
  } catch (e) {
    console.log('Error importing tasks:', e.message);
  }
}
