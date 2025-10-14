#!/usr/bin/env node

// Simple Task Manager CLI
// Minimal, import-free Node.js implementation

const fs = require('fs');
const path = require('path');
const { exportToJSON, importFromJSON, exportToCSV, importFromCSV } = require('../shared/export');

// Basic argument parsing
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log('Simple Task Manager CLI');
  console.log('Usage: stm <command> [options]');
  console.log('Commands: add, list, remove, export, import, timer');
  process.exit(0);
}

let tasks = [];
const tasksFile = path.join(__dirname, '..', 'tasks.json');
let timerStart = null;

function loadTasks() {
  if (fs.existsSync(tasksFile)) {
    tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
  }
}

function saveTasks() {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

function addTask(description, dueDate, reminderTime) {
  loadTasks();
  const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const task = { id, description, done: false };
  if (dueDate) task.due_date = dueDate;
  if (reminderTime) task.reminder_time = reminderTime;
  tasks.push(task);
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
    console.log(`${task.id}. [${task.done ? 'x' : ' '}] ${task.description}${task.due_date ? ` (Due: ${task.due_date})` : ''}${task.reminder_time ? ` (Reminder: ${task.reminder_time})` : ''}`);
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
  const fileName = `tasks.${format}`;
  const filePath = path.join(process.cwd(), fileName);
  if (format === 'json') {
    exportToJSON(tasks, filePath);
  } else if (format === 'csv') {
    exportToCSV(tasks, filePath);
  } else {
    console.log('Unsupported format. Use json or csv.');
  }
}

function importTasks(file) {
  try {
    if (file.endsWith('.json')) {
      tasks = importFromJSON(file);
    } else if (file.endsWith('.csv')) {
      tasks = importFromCSV(file);
    } else {
      console.log('Unsupported file format. Please use .json or .csv');
      return;
    }
    saveTasks();
    console.log('Tasks imported.');
  } catch (e) {
    console.log('Error importing tasks:', e.message);
  }
}

function startTimer() {
  timerStart = Date.now();
  console.log('Timer started.');
}

function stopTimer() {
  if (!timerStart) {
    console.log('No timer running.');
    return;
  }
  const elapsed = Math.floor((Date.now() - timerStart) / 1000);
  console.log(`Timer stopped. Elapsed time: ${elapsed} seconds.`);
  timerStart = null;
}

function timerStatus() {
  if (!timerStart) {
    console.log('No timer running.');
    return;
  }
  const elapsed = Math.floor((Date.now() - timerStart) / 1000);
  console.log(`Timer running. Elapsed time: ${elapsed} seconds.`);
}

switch (command) {
  case 'add':
    const taskArgs = args.slice(1);
    const description = taskArgs[0];
    const dueDate = taskArgs.find(arg => arg.startsWith('--due='))?.split('=')[1];
    const reminderTime = taskArgs.find(arg => arg.startsWith('--reminder='))?.split('=')[1];
    if (!description) {
      console.log('Usage: stm add <task description> [--due=YYYY-MM-DD] [--reminder=YYYY-MM-DDTHH:MM]');
      process.exit(1);
    }
    addTask(description, dueDate, reminderTime);
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
  case 'timer':
    const timerCmd = args[1];
    if (timerCmd === 'start') {
      startTimer();
    } else if (timerCmd === 'stop') {
      stopTimer();
    } else if (timerCmd === 'status') {
      timerStatus();
    } else {
      console.log('Usage: stm timer <start|stop|status>');
    }
    break;
  default:
    console.log('Unknown command:', command);
    process.exit(1);
}
