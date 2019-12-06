process.env.PORT = process.env.PORT || 3000;

// Vencimiento del token
process.env.CAD_TOKEN = 60 * 60 * 24 * 30;

//firma del token
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';