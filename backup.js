const { exec } = require("child_process");

const command = `"C:\\mongodb-database-tools-windows-x86_64-100.12.0\\bin\\mongodump.exe" --db=portfolio --out=C:\\backup`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Backup failed: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ Error Output: ${stderr}`);
    return;
  }
  console.log(`✅ Backup successful:\n${stdout}`);
});
