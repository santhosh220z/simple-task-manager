# Simple Task Manager TODO

## Completed
- [x] Create project structure (cli/, gui/, db/, shared/)
- [x] Set up root package.json and README.md
- [x] Implement basic CLI with add, list, remove, export, import commands
- [x] Create React GUI with Tailwind CSS
- [x] Set up SQLite schema
- [x] Create shared export/import utilities

## In Progress: Add Reminder Time, Calendar, and Timer Functionality
- [ ] Update db/schema.sql to add due_date and reminder_time fields
- [ ] Update shared/export.js to include new fields in export/import
- [ ] Update cli/index.js to accept due dates/reminders in add command, add timer commands (start, stop, status)
- [ ] Update gui/src/App.js to add due date/reminder inputs, calendar view toggle, timer component
- [ ] Install necessary dependencies (e.g., date picker for GUI, notification libraries)
- [ ] Update TODO.md to reflect new features

## Next Steps
- [ ] Integrate SQLite database in CLI instead of JSON file
- [ ] Add MongoDB sync layer (optional)
- [ ] Enhance GUI with more features (edit tasks, categories)
- [ ] Add notifications and calendar views
- [ ] Implement plugin support
- [ ] Test cross-platform compatibility
- [ ] Add unit tests
- [ ] Update documentation
