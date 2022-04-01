const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6bnNjZXFwa25zbnZ5dnJtZXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5NzEzOTksImV4cCI6MTk2MzU0NzM5OX0.0rQxsYTXfd8cbn-mlX01dpPccunID0HFXDu7koSZ5Ms';
const SUPABASE_URL = 'https://lznsceqpknsnvyvrmexq.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


export async function fetchSpaEvents(){
  const response = await client
    .from('spa_events')
    .select(`
    *,
    spa_guests (*)`
    );
  return response.body;
}

export async function createSpaGuest(guest){
  const response = await client
    .from('spa_guests')
    .insert(guest);

  return response;
}


export async function deleteSpaGuest(id){
  const response = await client
    .from('spa_guests')
    .delete()
    .match({ id: id })
    .single();

  return response;
}


export function getUser() {
  return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
  const user = getUser();

  if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
  if (getUser()) {
    location.replace('./spa-events');
  }
}

export async function signupUser(email, password) {
  const response = await client.auth.signUp({ email, password });

  return response.user;
}

export async function signInUser(email, password) {
  const response = await client.auth.signIn({ email, password });

  return response.user;
}

export async function logout() {
  await client.auth.signOut();

  return (window.location.href = '../');
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
