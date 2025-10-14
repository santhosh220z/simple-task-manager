// Shared utilities for export/import
mmoit g// Shared utilities for export/import
// Cross-platform compatible

const fs = require('fs');
const path = require('path');

function exportToJSON(tasks, filePath) {
  const data = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(filePath, data, 'utf8');
  console.log(`Exported to ${filePath}`);
}

function importFromJSON(filePath) {
  if (!fs.existsSync(filePath)) throw new Error('File not found');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function exportToCSV(tasks, filePath) {
  let csv = 'id,description,done,created_at,updated_at,due_date,reminder_time\n';
  tasks.forEach(task => {
    csv += `${task.id},"${task.description}",${task.done},"${task.created_at}","${task.updated_at}","${task.due_date || ''}","${task.reminder_time || ''}"\n`;
  });
  fs.writeFileSync(filePath, csv, 'utf8');
  console.log(`Exported to ${filePath}`);
}

function importFromCSV(filePath) {
  if (!fs.existsSync(filePath)) throw new Error('File not found');
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split('\n').slice(1);
  return lines.filter(line => line.trim()).map(line => {
    const [id, description, done, created_at, updated_at] = line.split(',');
    return {
      id: parseInt(id),
      description: description.replace(/"/g, ''),
      done: done === 'true',
      created_at: created_at.replace(/"/g, ''),
      updated_at: updated_at.replace(/"/g, '')
    };
  });
}

module.exports = {
  exportToJSON,
  importFromJSON,
  exportToCSV,
  importFromCSV
};
