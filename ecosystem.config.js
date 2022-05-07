module.exports = {
  apps: [
    {
      name: 'benfords-lottery',
      script: 'dist/main.js',
      instances: 1,
      exec_mode: 'cluster',
      exec_interpreter: 'node',
    },
  ],
};
