import 'dotenv/config';
const u = process.env.MONGODB_URI || '';
const m = u.match(/^mongodb(?:\+srv)?:\/\/([^:]+):(.*)@([^@]+)$/);
if (!m) { console.log('URI missing or wrong format'); process.exit(); }
const [, user, pass, rest] = m;
console.log('user:', user);
console.log('password length:', pass.length);
console.log('special chars:', /[^A-Za-z0-9]/.test(pass) ? 'YES (problem)' : 'no');
console.log('host/db:', rest);
console.log('placeholder left:', /[<>]/.test(u));
console.log('quotes/spaces:', /["'\s]/.test(u));
